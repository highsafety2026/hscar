const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
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
const ADMIN_PASSWORD_HASH = crypto.createHash('sha256').update('admin123').digest('hex');

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

app.post('/api/bookings', (req, res) => {
  const db = loadDB();
  const booking = { id: uuidv4(), ...req.body, createdAt: new Date().toISOString(), status: 'pending' };
  db.bookings.push(booking);
  saveDB(db);
  res.json({ success: true, booking });
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

app.post('/api/reports', authMiddleware, upload.single('file'), (req, res) => {
  const db = loadDB();
  const report = {
    id: uuidv4(),
    phone: req.body.phone,
    customerName: req.body.customerName,
    filename: req.file.filename,
    originalName: req.file.originalname,
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

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
