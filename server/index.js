const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const OpenAI = require('openai');
const pdfParse = require('pdf-parse');
const { Pool } = require('pg');

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const app = express();
const PORT = process.env.PORT || 3001;

let stripeInitialized = false;
let stripeSync = null;

async function getStripeCredentials() {
  if (process.env.STRIPE_SECRET_KEY) {
    return {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_live_51SctoOHuBpZxKcikD6zpLOEegmjHMqZ7wYv9eyuxHnCF1EqUhLroV2AbgccvRNxUBNaeYNaZZJ9PIy3541DVNfSZ00Dzv6KFfc',
      secretKey: process.env.STRIPE_SECRET_KEY,
    };
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? 'depl ' + process.env.WEB_REPL_RENEWAL
      : null;

  if (!xReplitToken || !hostname) {
    return null;
  }

  const isProduction = process.env.REPLIT_DEPLOYMENT === '1';
  const targetEnvironment = isProduction ? 'production' : 'development';

  const url = new URL(`https://${hostname}/api/v2/connection`);
  url.searchParams.set('include_secrets', 'true');
  url.searchParams.set('connector_names', 'stripe');
  url.searchParams.set('environment', targetEnvironment);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    });

    const data = await response.json();
    const connectionSettings = data.items?.[0];

    if (!connectionSettings?.settings?.publishable || !connectionSettings?.settings?.secret) {
      return null;
    }

    return {
      publishableKey: connectionSettings.settings.publishable,
      secretKey: connectionSettings.settings.secret,
    };
  } catch (error) {
    console.error('Error fetching Stripe credentials:', error);
    return null;
  }
}

async function initStripe() {
  if (stripeInitialized) return;
  
  const credentials = await getStripeCredentials();
  if (!credentials) {
    console.log('Stripe not configured - skipping initialization');
    return;
  }

  try {
    const { runMigrations, StripeSync } = await import('stripe-replit-sync');
    
    console.log('Initializing Stripe schema...');
    await runMigrations({ 
      databaseUrl: process.env.DATABASE_URL,
      schema: 'stripe'
    });
    console.log('Stripe schema ready');

    stripeSync = new StripeSync({
      poolConfig: {
        connectionString: process.env.DATABASE_URL,
        max: 2,
      },
      stripeSecretKey: credentials.secretKey,
    });

    const webhookBaseUrl = `https://${process.env.REPLIT_DOMAINS?.split(',')[0]}`;
    if (webhookBaseUrl && webhookBaseUrl !== 'https://undefined') {
      console.log('Setting up managed webhook...');
      try {
        const result = await stripeSync.findOrCreateManagedWebhook(
          `${webhookBaseUrl}/api/stripe/webhook`,
          {
            enabled_events: ['checkout.session.completed', 'payment_intent.succeeded', 'payment_intent.payment_failed'],
            description: 'Managed webhook for High Safety payment processing',
          }
        );
        if (result && result.uuid) {
          webhookUuid = result.uuid;
          console.log(`Webhook configured with UUID: ${webhookUuid}`);
        }
        if (result && result.webhook) {
          console.log(`Webhook URL: ${result.webhook.url}`);
        }
      } catch (webhookError) {
        console.log('Webhook setup skipped:', webhookError.message);
      }
    }

    stripeSync.syncBackfill()
      .then(() => console.log('Stripe data synced'))
      .catch((err) => console.error('Error syncing Stripe data:', err));

    stripeInitialized = true;
    console.log('Stripe initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
  }
}

function generateReportCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'HS-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

async function initPaymentsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        customer_email VARCHAR(255),
        amount INTEGER NOT NULL,
        currency VARCHAR(10) DEFAULT 'aed',
        service_type VARCHAR(100),
        booking_id VARCHAR(100),
        report_code VARCHAR(20),
        stripe_payment_intent_id VARCHAR(255),
        stripe_checkout_session_id VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    await pool.query(`ALTER TABLE payments ADD COLUMN IF NOT EXISTS report_code VARCHAR(20)`);
    console.log('Payments table ready');
  } catch (error) {
    console.error('Error creating payments table:', error);
  }
}

initStripe();
initPaymentsTable();

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

let webhookUuid = null;

app.post('/api/stripe/webhook/:uuid?', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'];
  if (!signature) {
    return res.status(400).json({ error: 'Missing stripe-signature' });
  }

  try {
    const sig = Array.isArray(signature) ? signature[0] : signature;
    const uuid = req.params.uuid || webhookUuid;
    
    if (stripeSync && uuid) {
      await stripeSync.processWebhook(req.body, sig, uuid);
    }

    const event = JSON.parse(req.body.toString());
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await pool.query(
        `UPDATE payments SET status = 'completed', stripe_payment_intent_id = $1, updated_at = NOW() 
         WHERE stripe_checkout_session_id = $2`,
        [session.payment_intent, session.id]
      );
      console.log('Payment completed:', session.id);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(400).json({ error: 'Webhook processing error' });
  }
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

const DB_PATH = path.join(__dirname, 'database.json');
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = crypto.createHash('sha256').update('safa').digest('hex');

const UAE_CAR_PRICES = {
  'LAND CRUISER': { '2024': { min: 280000, max: 380000 }, '2023': { min: 250000, max: 340000 }, '2022': { min: 220000, max: 300000 }, '2021': { min: 190000, max: 260000 }, '2020': { min: 160000, max: 220000 }, '2019': { min: 140000, max: 190000 }, '2018': { min: 120000, max: 165000 }, '2017': { min: 105000, max: 145000 }, '2016': { min: 90000, max: 125000 }, '2015': { min: 75000, max: 110000 } },
  'PATROL': { '2024': { min: 260000, max: 350000 }, '2023': { min: 230000, max: 310000 }, '2022': { min: 200000, max: 270000 }, '2021': { min: 175000, max: 235000 }, '2020': { min: 150000, max: 200000 }, '2019': { min: 130000, max: 175000 }, '2018': { min: 110000, max: 150000 }, '2017': { min: 95000, max: 130000 }, '2016': { min: 80000, max: 115000 } },
  'CAMRY': { '2024': { min: 110000, max: 145000 }, '2023': { min: 95000, max: 125000 }, '2022': { min: 82000, max: 108000 }, '2021': { min: 70000, max: 92000 }, '2020': { min: 60000, max: 80000 }, '2019': { min: 52000, max: 70000 }, '2018': { min: 45000, max: 60000 }, '2017': { min: 38000, max: 52000 }, '2016': { min: 32000, max: 45000 } },
  'ACCORD': { '2024': { min: 105000, max: 140000 }, '2023': { min: 90000, max: 120000 }, '2022': { min: 78000, max: 102000 }, '2021': { min: 65000, max: 88000 }, '2020': { min: 55000, max: 75000 }, '2019': { min: 48000, max: 65000 }, '2018': { min: 40000, max: 55000 }, '2017': { min: 35000, max: 48000 }, '2016': { min: 30000, max: 42000 } },
  'ALTIMA': { '2024': { min: 95000, max: 125000 }, '2023': { min: 82000, max: 108000 }, '2022': { min: 70000, max: 92000 }, '2021': { min: 60000, max: 78000 }, '2020': { min: 50000, max: 68000 }, '2019': { min: 42000, max: 58000 }, '2018': { min: 35000, max: 50000 }, '2017': { min: 30000, max: 42000 }, '2016': { min: 25000, max: 36000 } },
  'LEXUS': { '2024': { min: 200000, max: 450000 }, '2023': { min: 175000, max: 400000 }, '2022': { min: 150000, max: 350000 }, '2021': { min: 130000, max: 300000 }, '2020': { min: 110000, max: 260000 }, '2019': { min: 95000, max: 220000 }, '2018': { min: 80000, max: 185000 }, '2017': { min: 68000, max: 155000 }, '2016': { min: 58000, max: 130000 } },
  'BMW': { '2024': { min: 180000, max: 500000 }, '2023': { min: 155000, max: 430000 }, '2022': { min: 130000, max: 370000 }, '2021': { min: 110000, max: 310000 }, '2020': { min: 95000, max: 260000 }, '2019': { min: 80000, max: 220000 }, '2018': { min: 68000, max: 185000 }, '2017': { min: 55000, max: 155000 }, '2016': { min: 45000, max: 125000 } },
  'MERCEDES': { '2024': { min: 190000, max: 550000 }, '2023': { min: 165000, max: 480000 }, '2022': { min: 140000, max: 410000 }, '2021': { min: 120000, max: 350000 }, '2020': { min: 100000, max: 290000 }, '2019': { min: 85000, max: 245000 }, '2018': { min: 72000, max: 200000 }, '2017': { min: 60000, max: 165000 }, '2016': { min: 50000, max: 135000 } },
  'AUDI': { '2024': { min: 175000, max: 480000 }, '2023': { min: 150000, max: 410000 }, '2022': { min: 125000, max: 350000 }, '2021': { min: 105000, max: 295000 }, '2020': { min: 90000, max: 250000 }, '2019': { min: 75000, max: 210000 }, '2018': { min: 62000, max: 175000 }, '2017': { min: 52000, max: 145000 }, '2016': { min: 42000, max: 120000 } },
  'PORSCHE': { '2024': { min: 350000, max: 800000 }, '2023': { min: 310000, max: 720000 }, '2022': { min: 270000, max: 640000 }, '2021': { min: 235000, max: 560000 }, '2020': { min: 200000, max: 490000 }, '2019': { min: 175000, max: 420000 }, '2018': { min: 150000, max: 360000 }, '2017': { min: 130000, max: 310000 }, '2016': { min: 110000, max: 265000 } },
  'RANGE ROVER': { '2024': { min: 380000, max: 650000 }, '2023': { min: 340000, max: 580000 }, '2022': { min: 300000, max: 510000 }, '2021': { min: 260000, max: 450000 }, '2020': { min: 225000, max: 390000 }, '2019': { min: 195000, max: 340000 }, '2018': { min: 170000, max: 295000 }, '2017': { min: 145000, max: 250000 }, '2016': { min: 125000, max: 215000 } },
  'GMC': { '2024': { min: 180000, max: 320000 }, '2023': { min: 155000, max: 280000 }, '2022': { min: 135000, max: 245000 }, '2021': { min: 115000, max: 210000 }, '2020': { min: 100000, max: 180000 }, '2019': { min: 85000, max: 155000 }, '2018': { min: 72000, max: 135000 }, '2017': { min: 62000, max: 115000 }, '2016': { min: 52000, max: 98000 } },
  'CHEVROLET': { '2024': { min: 85000, max: 200000 }, '2023': { min: 72000, max: 175000 }, '2022': { min: 62000, max: 150000 }, '2021': { min: 52000, max: 130000 }, '2020': { min: 45000, max: 110000 }, '2019': { min: 38000, max: 95000 }, '2018': { min: 32000, max: 80000 }, '2017': { min: 27000, max: 68000 }, '2016': { min: 23000, max: 58000 } },
  'FORD': { '2024': { min: 95000, max: 250000 }, '2023': { min: 82000, max: 220000 }, '2022': { min: 70000, max: 190000 }, '2021': { min: 60000, max: 160000 }, '2020': { min: 52000, max: 140000 }, '2019': { min: 45000, max: 120000 }, '2018': { min: 38000, max: 100000 }, '2017': { min: 32000, max: 85000 }, '2016': { min: 28000, max: 72000 } },
  'KIA': { '2024': { min: 75000, max: 140000 }, '2023': { min: 65000, max: 120000 }, '2022': { min: 55000, max: 102000 }, '2021': { min: 47000, max: 88000 }, '2020': { min: 40000, max: 75000 }, '2019': { min: 34000, max: 65000 }, '2018': { min: 28000, max: 55000 }, '2017': { min: 24000, max: 47000 }, '2016': { min: 20000, max: 40000 } },
  'HYUNDAI': { '2024': { min: 72000, max: 135000 }, '2023': { min: 62000, max: 115000 }, '2022': { min: 53000, max: 98000 }, '2021': { min: 45000, max: 85000 }, '2020': { min: 38000, max: 72000 }, '2019': { min: 32000, max: 62000 }, '2018': { min: 27000, max: 53000 }, '2017': { min: 23000, max: 45000 }, '2016': { min: 19000, max: 38000 } },
  'MITSUBISHI': { '2024': { min: 70000, max: 160000 }, '2023': { min: 60000, max: 140000 }, '2022': { min: 52000, max: 120000 }, '2021': { min: 44000, max: 102000 }, '2020': { min: 38000, max: 88000 }, '2019': { min: 32000, max: 75000 }, '2018': { min: 27000, max: 64000 }, '2017': { min: 23000, max: 55000 }, '2016': { min: 19000, max: 47000 } },
  'MAZDA': { '2024': { min: 85000, max: 145000 }, '2023': { min: 73000, max: 125000 }, '2022': { min: 63000, max: 108000 }, '2021': { min: 54000, max: 93000 }, '2020': { min: 46000, max: 80000 }, '2019': { min: 39000, max: 68000 }, '2018': { min: 33000, max: 58000 }, '2017': { min: 28000, max: 50000 }, '2016': { min: 24000, max: 42000 } },
  'INFINITI': { '2024': { min: 140000, max: 280000 }, '2023': { min: 120000, max: 245000 }, '2022': { min: 102000, max: 210000 }, '2021': { min: 88000, max: 180000 }, '2020': { min: 75000, max: 155000 }, '2019': { min: 64000, max: 135000 }, '2018': { min: 55000, max: 115000 }, '2017': { min: 47000, max: 98000 }, '2016': { min: 40000, max: 85000 } },
  'VOLKSWAGEN': { '2024': { min: 90000, max: 180000 }, '2023': { min: 78000, max: 155000 }, '2022': { min: 67000, max: 135000 }, '2021': { min: 57000, max: 115000 }, '2020': { min: 48000, max: 98000 }, '2019': { min: 41000, max: 85000 }, '2018': { min: 35000, max: 72000 }, '2017': { min: 30000, max: 62000 }, '2016': { min: 25000, max: 53000 } }
};

function loadDB() {
  if (!fs.existsSync(DB_PATH)) {
    const initial = { bookings: [], reports: [], valuations: [], ratings: [], otpCodes: {}, sessions: {} };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'غير مصرح' });
  }
  const db = loadDB();
  const session = db.sessions[token];
  if (!session || session.expires < Date.now()) {
    return res.status(401).json({ error: 'جلسة منتهية' });
  }
  next();
}

function checkBookingConflict(date, time, excludeId = null) {
  const db = loadDB();
  return db.bookings.find(b => 
    b.date === date && 
    b.time === time && 
    b.id !== excludeId &&
    b.status !== 'cancelled'
  );
}

app.post('/api/bookings', (req, res) => {
  const db = loadDB();
  const { preferredDate, preferredTime } = req.body;
  
  const conflict = db.bookings.find(b => 
    b.preferredDate === preferredDate && 
    b.preferredTime === preferredTime && 
    b.status !== 'cancelled'
  );
  
  if (conflict) {
    return res.status(409).json({ 
      success: false, 
      conflict: true,
      message: 'هذا الموعد محجوز بالفعل. يرجى اختيار موعد آخر.' 
    });
  }
  
  const bookingId = 'HS-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
  const booking = { 
    id: uuidv4(), 
    bookingId,
    ...req.body, 
    createdAt: new Date().toISOString(), 
    status: 'pending' 
  };
  db.bookings.push(booking);
  saveDB(db);
  res.json({ success: true, booking, bookingId });
});

app.post('/api/bookings/check-availability', (req, res) => {
  const { date, time } = req.body;
  const conflict = checkBookingConflict(date, time);
  res.json({ available: !conflict });
});

app.get('/api/slots', (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.json({ bookedSlots: [] });
  }
  const db = loadDB();
  const bookedSlots = db.bookings
    .filter(b => b.preferredDate === date && b.status !== 'cancelled')
    .map(b => b.preferredTime);
  res.json({ bookedSlots });
});

const QRCode = require('qrcode');

app.get('/api/booking-qr', async (req, res) => {
  try {
    const domain = process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000';
    const bookingUrl = `https://${domain}/booking`;
    const qrCode = await QRCode.toDataURL(bookingUrl, {
      width: 200,
      margin: 2,
      color: {
        dark: '#0B1F3A',
        light: '#FFFFFF'
      }
    });
    res.json({ qrCode, url: bookingUrl });
  } catch (error) {
    console.error('QR Code error:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

app.get('/api/bookings', authMiddleware, (req, res) => {
  const db = loadDB();
  res.json(db.bookings);
});

app.patch('/api/bookings/:id', authMiddleware, (req, res) => {
  const db = loadDB();
  const index = db.bookings.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Booking not found' });
  db.bookings[index] = { ...db.bookings[index], ...req.body };
  saveDB(db);
  res.json({ success: true, booking: db.bookings[index] });
});

app.delete('/api/bookings/:id', authMiddleware, (req, res) => {
  const db = loadDB();
  db.bookings = db.bookings.filter(b => b.id !== req.params.id);
  saveDB(db);
  res.json({ success: true });
});

function generateReportCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const reportUpload = multer({ storage }).fields([
  { name: 'file', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]);

app.post('/api/reports', authMiddleware, reportUpload, (req, res) => {
  const db = loadDB();
  let code = req.body.code || generateReportCode();
  while (db.reports.find(r => r.code === code)) {
    code = generateReportCode();
  }
  
  const images = req.files['images'] ? req.files['images'].map(f => f.filename) : [];
  const pdfFile = req.files['file'] ? req.files['file'][0] : null;
  
  const report = {
    id: uuidv4(),
    code: code.toUpperCase(),
    phone: req.body.phone,
    customerName: req.body.customerName,
    filename: pdfFile ? pdfFile.filename : null,
    originalName: pdfFile ? pdfFile.originalname : null,
    images: images,
    createdAt: new Date().toISOString()
  };
  db.reports.push(report);
  saveDB(db);
  res.json({ success: true, report });
});

app.get('/api/reports', authMiddleware, (req, res) => {
  const db = loadDB();
  res.json(db.reports);
});

app.delete('/api/reports/:id', authMiddleware, (req, res) => {
  const db = loadDB();
  const report = db.reports.find(r => r.id === req.params.id);
  if (report) {
    const filePath = path.join(__dirname, '../uploads', report.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
  db.reports = db.reports.filter(r => r.id !== req.params.id);
  saveDB(db);
  res.json({ success: true });
});

app.post('/api/reports/check', (req, res) => {
  const { phone } = req.body;
  const db = loadDB();
  const report = db.reports.find(r => r.phone === phone);
  if (report) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    db.otpCodes[phone] = { code: otp, expires: Date.now() + 5 * 60 * 1000 };
    saveDB(db);
    console.log(`OTP for ${phone}: ${otp}`);
    res.json({ 
      found: true, 
      message: 'تم إرسال رمز التحقق',
      demoOtp: otp
    });
  } else {
    res.json({ found: false, message: 'التقرير لم يتم رفعه بعد' });
  }
});

app.post('/api/reports/verify', (req, res) => {
  const { phone, otp } = req.body;
  const db = loadDB();
  const stored = db.otpCodes[phone];
  if (stored && stored.code === otp && stored.expires > Date.now()) {
    const report = db.reports.find(r => r.phone === phone);
    delete db.otpCodes[phone];
    saveDB(db);
    res.json({ success: true, report });
  } else {
    res.json({ success: false, message: 'رمز التحقق غير صحيح أو منتهي الصلاحية' });
  }
});

app.post('/api/reports/find-by-code', (req, res) => {
  const { code } = req.body;
  if (!code || code.trim().length === 0) {
    return res.json({ success: false, message: 'يرجى إدخال الكود' });
  }
  const db = loadDB();
  const report = db.reports.find(r => r.code && r.code.toUpperCase() === code.trim().toUpperCase());
  if (report) {
    res.json({ success: true, report });
  } else {
    res.json({ success: false, message: 'لم يتم العثور على تقرير بهذا الكود' });
  }
});

app.post('/api/valuations', upload.array('images', 10), (req, res) => {
  const db = loadDB();
  const valuation = {
    id: uuidv4(),
    model: req.body.model,
    year: req.body.year,
    phone: req.body.phone,
    images: req.files.map(f => f.filename),
    status: 'pending',
    estimatedPrice: null,
    createdAt: new Date().toISOString()
  };
  db.valuations.push(valuation);
  saveDB(db);
  res.json({ success: true, valuation });
});

app.get('/api/valuations', authMiddleware, (req, res) => {
  const db = loadDB();
  res.json(db.valuations);
});

app.get('/api/valuations/check/:phone', (req, res) => {
  const db = loadDB();
  const valuation = db.valuations.find(v => v.phone === req.params.phone && v.status === 'completed');
  if (valuation) {
    res.json({ found: true, valuation });
  } else {
    res.json({ found: false, message: 'لا يوجد تقييم مكتمل لهذا الرقم' });
  }
});

app.patch('/api/valuations/:id', authMiddleware, (req, res) => {
  const db = loadDB();
  const index = db.valuations.findIndex(v => v.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Valuation not found' });
  db.valuations[index] = { ...db.valuations[index], ...req.body };
  saveDB(db);
  res.json({ success: true, valuation: db.valuations[index] });
});

app.delete('/api/valuations/:id', authMiddleware, (req, res) => {
  const db = loadDB();
  const valuation = db.valuations.find(v => v.id === req.params.id);
  if (valuation) {
    valuation.images.forEach(img => {
      const filePath = path.join(__dirname, '../uploads', img);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });
  }
  db.valuations = db.valuations.filter(v => v.id !== req.params.id);
  saveDB(db);
  res.json({ success: true });
});

app.post('/api/ratings', (req, res) => {
  const { stars, name, comment } = req.body;
  if (!stars || stars < 1 || stars > 5) {
    return res.status(400).json({ error: 'التقييم يجب أن يكون من 1 إلى 5 نجوم' });
  }
  const db = loadDB();
  if (!db.ratings) db.ratings = [];
  const rating = {
    id: uuidv4(),
    stars: parseInt(stars),
    name: name || 'عميل',
    comment: comment ? comment.substring(0, 200) : '',
    createdAt: new Date().toISOString()
  };
  db.ratings.push(rating);
  saveDB(db);
  res.json({ success: true, rating });
});

app.get('/api/ratings', (req, res) => {
  const db = loadDB();
  const ratings = db.ratings || [];
  const count = ratings.length;
  const average = count > 0 ? ratings.reduce((sum, r) => sum + r.stars, 0) / count : 0;
  res.json({ 
    ratings: ratings.slice(-10).reverse(),
    stats: { count, average: Math.round(average * 10) / 10 }
  });
});

app.delete('/api/ratings/:id', authMiddleware, (req, res) => {
  const db = loadDB();
  db.ratings = (db.ratings || []).filter(r => r.id !== req.params.id);
  saveDB(db);
  res.json({ success: true });
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
  
  if (username === ADMIN_USERNAME && passwordHash === ADMIN_PASSWORD_HASH) {
    const db = loadDB();
    const token = generateToken();
    db.sessions[token] = { expires: Date.now() + 24 * 60 * 60 * 1000 };
    saveDB(db);
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'بيانات الدخول غير صحيحة' });
  }
});

app.post('/api/admin/logout', authMiddleware, (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const db = loadDB();
  delete db.sessions[token];
  saveDB(db);
  res.json({ success: true });
});

app.post('/api/chat/analyze-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ reply: 'لم يتم رفع أي ملف.' });
    }

    console.log('PDF file received:', req.file.originalname, req.file.path);
    
    let pdfText = '';
    let pdfImages = [];
    
    try {
      const pdfBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(pdfBuffer);
      pdfText = pdfData.text;
      console.log('PDF text extracted, length:', pdfText.length);
    } catch (parseErr) {
      console.error('PDF parse error:', parseErr.message);
    }

    let useVision = false;
    try {
      const { pdf } = await import('pdf-to-img');
      const pdfBuffer = fs.readFileSync(req.file.path);
      const pages = await pdf(pdfBuffer, { scale: 2 });
      let pageCount = 0;
      for await (const page of pages) {
        if (pageCount < 3) {
          const base64Image = page.toString('base64');
          pdfImages.push(`data:image/png;base64,${base64Image}`);
          pageCount++;
        }
      }
      useVision = pdfImages.length > 0;
      console.log('PDF converted to images:', pdfImages.length, 'pages');
    } catch (imgErr) {
      console.error('PDF to image error:', imgErr.message);
    }

    try {
      fs.unlinkSync(req.file.path);
    } catch (e) {
      console.error('Error deleting file:', e.message);
    }

    const pricesJson = JSON.stringify(UAE_CAR_PRICES);

    const analysisPrompt = `أنت خبير في تقييم السيارات في السوق الإماراتي. قم بتحليل تقرير فحص السيارة المرفق واستخرج:
1. نوع السيارة (الماركة والموديل)
2. سنة الصنع
3. قراءة العداد (الكيلومترات)
4. جميع العيوب والمشاكل المذكورة في التقرير بالتفصيل

اقرأ كل النصوص والجداول والمربعات بعناية فائقة.

ثم قم بتقدير سعر السيارة في السوق الإماراتي بناءً على:
- الحالة العامة للسيارة
- العيوب المذكورة وتأثيرها على السعر
- قراءة العداد

أسعار السيارات المرجعية في السوق الإماراتي (بالدرهم):
${pricesJson}

${!useVision && pdfText ? `نص تقرير الفحص:\n${pdfText}` : ''}

قدم الرد بالتنسيق التالي:
📋 **معلومات السيارة:**
- الماركة والموديل: [...]
- سنة الصنع: [...]
- قراءة العداد: [...]
- رقم الشاصي (إن وجد): [...]

🔧 **نتائج الفحص:**
✅ الأجزاء السليمة: [...]
⚠️ الأجزاء التي تحتاج صيانة: [...]
❌ العيوب الخطيرة: [...]

💰 **تقدير السعر في السوق الإماراتي:**
- السعر الأساسي للسيارة: [...] درهم
- الخصم بسبب العيوب: [...] درهم ([...]%)
- السعر النهائي المتوقع: [...] - [...] درهم

📝 **توصيات:**
[نصائح للمشتري أو البائع]

للمزيد من التفاصيل أو لحجز موعد فحص، تواصل معنا عبر واتساب: +971 54 220 6000`;

    let messages;
    if (useVision) {
      const imageContents = pdfImages.map(img => ({
        type: 'image_url',
        image_url: { url: img, detail: 'high' }
      }));
      messages = [
        { role: 'system', content: 'أنت خبير في تقييم السيارات ومحلل تقارير فحص السيارات في السوق الإماراتي. اقرأ جميع النصوص والجداول في الصور بدقة عالية وقدم تحليلاً شاملاً بالعربية.' },
        { role: 'user', content: [
          { type: 'text', text: analysisPrompt },
          ...imageContents
        ]}
      ];
    } else {
      messages = [
        { role: 'system', content: 'أنت خبير في تقييم السيارات ومحلل تقارير فحص السيارات في السوق الإماراتي. قدم تحليلاً دقيقاً ومفيداً بالعربية.' },
        { role: 'user', content: analysisPrompt }
      ];
    }

    const completion = await openai.chat.completions.create({
      model: useVision ? 'gpt-4o' : 'gpt-4o-mini',
      messages: messages,
      max_tokens: 2000,
      temperature: 0.3
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('PDF analysis error:', error);
    res.status(500).json({ reply: 'عذراً، حدث خطأ في تحليل الملف. يرجى التأكد من صحة ملف PDF والمحاولة مرة أخرى.' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    
    const systemPrompt = `أنت المساعد الذكي لمركز "الأمان العالي الدولي للفحص الفني للسيارات" في الإمارات العربية المتحدة.

معلومات المركز:
- الاسم: الأمان العالي الدولي للفحص الفني للسيارات
- واتساب: +971 54 220 6000
- البريد: highsafety2021@gmail.com

خدمات الفحص المتاحة:
1. الفحص الشامل (Full Inspection): فحص كامل للسيارة يشمل جميع الأنظمة - 350 درهم
2. الفحص الميكانيكي: فحص المحرك وناقل الحركة والفرامل والتعليق - 200 درهم
3. فحص متنوع: فحوصات إضافية حسب الطلب
4. الفحص الأساسي: فحص سريع للأجزاء الرئيسية - 150 درهم

مميزات المركز:
- أحدث الأجهزة والتقنيات العالمية
- فريق متخصص من الخبراء
- تقارير مفصلة وشاملة بصيغة PDF
- سرعة في الإنجاز
- خدمة تقييم أسعار السيارات

خدمة التقارير:
- يمكن تحميل التقرير من الموقع
- يتم إرسال رمز OTP للتحقق
- التقارير متاحة بصيغة PDF

خدمة حجز المواعيد عبر المساعد الذكي:
إذا أراد العميل حجز موعد، اطلب منه المعلومات التالية:
1. الاسم الكامل
2. رقم الهاتف
3. نوع السيارة (الماركة والموديل)
4. نوع الفحص المطلوب
5. التاريخ المفضل
6. الوقت المفضل

عندما يقدم العميل جميع المعلومات، قم بتأكيد الحجز بصيغة JSON في نهاية ردك:
[BOOKING_REQUEST]{"name":"اسم العميل","phone":"رقم الهاتف","carModel":"نوع السيارة","serviceType":"نوع الفحص","date":"التاريخ بصيغة YYYY-MM-DD","time":"الوقت"}[/BOOKING_REQUEST]

قواعد الرد:
- رد بالعربية فقط
- كن ودوداً ومهنياً
- قدم معلومات دقيقة ومختصرة
- شجع العملاء على الحجز أو التواصل`;

    const conversationMessages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-10).map(m => ({ role: m.role, content: m.content }))
    ];
    
    if (history.length === 0 || history[history.length - 1]?.content !== message) {
      conversationMessages.push({ role: 'user', content: message });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: conversationMessages,
      max_tokens: 800,
      temperature: 0.7
    });

    let reply = completion.choices[0].message.content;

    const bookingRequestMatch = reply.match(/\[BOOKING_REQUEST\](.*?)\[\/BOOKING_REQUEST\]/s);
    if (bookingRequestMatch) {
      try {
        const bookingData = JSON.parse(bookingRequestMatch[1]);
        
        const conflict = checkBookingConflict(bookingData.date, bookingData.time);
        
        if (conflict) {
          reply = reply.replace(/\[BOOKING_REQUEST\].*?\[\/BOOKING_REQUEST\]/s, '');
          reply += `\n\n⚠️ **عذراً، هذا الموعد محجوز بالفعل!**\nالتاريخ: ${bookingData.date}\nالوقت: ${bookingData.time}\n\nيرجى اختيار موعد آخر. هل تريد اقتراح موعد بديل؟`;
        } else {
          const db = loadDB();
          const booking = {
            id: uuidv4(),
            name: bookingData.name,
            phone: bookingData.phone,
            carModel: bookingData.carModel,
            serviceType: bookingData.serviceType,
            date: bookingData.date,
            time: bookingData.time,
            createdAt: new Date().toISOString(),
            status: 'pending',
            source: 'ai_assistant'
          };
          db.bookings.push(booking);
          saveDB(db);
          
          reply = reply.replace(/\[BOOKING_REQUEST\].*?\[\/BOOKING_REQUEST\]/s, '');
          reply += `\n\n✅ **تم تأكيد الحجز بنجاح!**\n📋 رقم الحجز: ${booking.id.substring(0, 8).toUpperCase()}\n👤 الاسم: ${bookingData.name}\n📱 الهاتف: ${bookingData.phone}\n🚗 السيارة: ${bookingData.carModel}\n🔧 نوع الفحص: ${bookingData.serviceType}\n📅 التاريخ: ${bookingData.date}\n⏰ الوقت: ${bookingData.time}\n\nسيتم التواصل معك لتأكيد الموعد. شكراً لاختيارك مركز الأمان العالي!`;
        }
      } catch (parseError) {
        console.error('Booking parse error:', parseError);
        reply = reply.replace(/\[BOOKING_REQUEST\].*?\[\/BOOKING_REQUEST\]/s, '');
      }
    }

    res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ reply: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل معنا عبر الواتساب: +971 54 220 6000' });
  }
});

app.get('/api/stripe/config', async (req, res) => {
  try {
    const credentials = await getStripeCredentials();
    if (!credentials) {
      return res.status(503).json({ error: 'Stripe not configured' });
    }
    res.json({ publishableKey: credentials.publishableKey });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get Stripe config' });
  }
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { customerName, customerPhone, customerEmail, amount, serviceType, bookingId } = req.body;

    if (!customerName || !customerPhone || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const credentials = await getStripeCredentials();
    if (!credentials) {
      return res.status(503).json({ error: 'Stripe not configured' });
    }

    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(credentials.secretKey, { apiVersion: '2023-10-16' });

    const baseUrl = `https://${process.env.REPLIT_DOMAINS?.split(',')[0]}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'aed',
          product_data: {
            name: serviceType || 'خدمة الفحص الفني',
            description: `فحص فني للسيارات - ${customerName}`,
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/payment/cancel`,
      customer_email: customerEmail || undefined,
      metadata: {
        customerName,
        customerPhone,
        serviceType: serviceType || '',
        bookingId: bookingId || '',
      },
    });

    const reportCode = generateReportCode();
    
    await pool.query(
      `INSERT INTO payments (customer_name, customer_phone, customer_email, amount, service_type, booking_id, stripe_checkout_session_id, report_code, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')`,
      [customerName, customerPhone, customerEmail || null, amount, serviceType || null, bookingId || null, session.id, reportCode]
    );

    res.json({ url: session.url, sessionId: session.id, reportCode });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

app.get('/api/payment/verify/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const credentials = await getStripeCredentials();
    if (!credentials) {
      return res.status(503).json({ error: 'Stripe not configured' });
    }

    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(credentials.secretKey, { apiVersion: '2023-10-16' });

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      await pool.query(
        `UPDATE payments SET status = 'completed', updated_at = NOW() 
         WHERE stripe_checkout_session_id = $1`,
        [sessionId]
      );
    }

    const paymentResult = await pool.query(
      'SELECT report_code FROM payments WHERE stripe_checkout_session_id = $1',
      [sessionId]
    );
    const reportCode = paymentResult.rows[0]?.report_code;

    res.json({
      status: session.payment_status,
      customerName: session.metadata?.customerName,
      amount: session.amount_total / 100,
      currency: session.currency,
      reportCode: reportCode,
    });
  } catch (error) {
    console.error('Payment verify error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

app.get('/api/payments', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM payments ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
