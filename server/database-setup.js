const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'highsafety.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

function setupDatabase() {
  try {
    console.log('🔧 إعداد قاعدة البيانات...');

    // جدول الحجوزات
    db.exec(`
      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        customer_email TEXT,
        car_type TEXT NOT NULL,
        car_model TEXT NOT NULL,
        car_year TEXT NOT NULL,
        vin TEXT,
        plate_number TEXT,
        service_type TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        notes TEXT,
        payment_status TEXT DEFAULT 'pending',
        payment_amount INTEGER,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `);
    console.log('✅ جدول الحجوزات جاهز');

    // جدول التقارير
    db.exec(`
      CREATE TABLE IF NOT EXISTS reports (
        id TEXT PRIMARY KEY,
        report_code TEXT UNIQUE NOT NULL,
        booking_id TEXT,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        customer_email TEXT,
        car_type TEXT NOT NULL,
        car_model TEXT NOT NULL,
        car_year TEXT NOT NULL,
        vin TEXT,
        plate_number TEXT,
        mileage INTEGER,
        inspection_date TEXT NOT NULL,
        inspector_name TEXT,
        overall_condition TEXT,
        defects TEXT DEFAULT '[]',
        images TEXT DEFAULT '[]',
        videos TEXT DEFAULT '[]',
        recommendations TEXT,
        total_score INTEGER,
        pdf_path TEXT,
        qr_code TEXT,
        status TEXT DEFAULT 'draft',
        filename TEXT,
        original_name TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (booking_id) REFERENCES bookings(id)
      )
    `);
    console.log('✅ جدول التقارير جاهز');

    // جدول التقييمات
    db.exec(`
      CREATE TABLE IF NOT EXISTS valuations (
        id TEXT PRIMARY KEY,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        customer_email TEXT,
        car_brand TEXT NOT NULL,
        car_model TEXT NOT NULL,
        car_year TEXT NOT NULL,
        mileage INTEGER NOT NULL,
        condition TEXT NOT NULL,
        accident_history TEXT,
        service_history TEXT,
        estimated_value_min INTEGER,
        estimated_value_max INTEGER,
        valuation_details TEXT,
        images TEXT DEFAULT '[]',
        pdf_path TEXT,
        status TEXT DEFAULT 'pending',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `);
    console.log('✅ جدول التقييمات جاهز');

    // جدول التقييمات (Ratings)
    db.exec(`
      CREATE TABLE IF NOT EXISTS ratings (
        id TEXT PRIMARY KEY,
        report_code TEXT,
        booking_id TEXT,
        customer_name TEXT,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        feedback TEXT,
        service_type TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `);
    console.log('✅ جدول التقييمات جاهز');

    // جدول رموز OTP
    db.exec(`
      CREATE TABLE IF NOT EXISTS otp_codes (
        phone TEXT PRIMARY KEY,
        code TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `);
    console.log('✅ جدول رموز OTP جاهز');

    // جدول الجلسات
    db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY,
        user_type TEXT NOT NULL,
        username TEXT,
        expires_at TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `);
    console.log('✅ جدول الجلسات جاهز');

    // جدول الإعدادات
    db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `);
    console.log('✅ جدول الإعدادات جاهز');

    // جدول المدفوعات (Payments)
    db.exec(`
      CREATE TABLE IF NOT EXISTS payments (
        id TEXT PRIMARY KEY,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        customer_email TEXT,
        amount INTEGER NOT NULL,
        currency TEXT DEFAULT 'aed',
        service_type TEXT,
        booking_id TEXT,
        report_code TEXT,
        stripe_payment_intent_id TEXT,
        stripe_checkout_session_id TEXT,
        status TEXT DEFAULT 'pending',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `);
    console.log('✅ جدول المدفوعات جاهز');

    // إضافة indexes لتحسين الأداء
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date, time);
      CREATE INDEX IF NOT EXISTS idx_bookings_phone ON bookings(customer_phone);
      CREATE INDEX IF NOT EXISTS idx_reports_code ON reports(report_code);
      CREATE INDEX IF NOT EXISTS idx_reports_date ON reports(inspection_date);
      CREATE INDEX IF NOT EXISTS idx_valuations_phone ON valuations(customer_phone);
      CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
    `);
    console.log('✅ الـ Indexes جاهزة');

    // نقل البيانات من database.json إن وجدت
    const oldDbPath = path.join(__dirname, 'database.json');
    
    if (fs.existsSync(oldDbPath)) {
      console.log('📦 نقل البيانات من database.json...');
      const oldData = JSON.parse(fs.readFileSync(oldDbPath, 'utf8'));
      
      const insertBooking = db.prepare(`
        INSERT OR IGNORE INTO bookings (
          id, customer_name, customer_phone, customer_email, car_type, car_model, car_year,
          vin, plate_number, service_type, date, time, status, notes, payment_status, payment_amount
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const insertReport = db.prepare(`
        INSERT OR IGNORE INTO reports (
          id, report_code, customer_name, customer_phone, customer_email,
          car_type, car_model, car_year, vin, plate_number, inspection_date,
          overall_condition, defects, images, status, filename, original_name
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const insertValuation = db.prepare(`
        INSERT OR IGNORE INTO valuations (
          id, customer_name, customer_phone, customer_email,
          car_brand, car_model, car_year, mileage, condition,
          estimated_value_min, estimated_value_max, status, images
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const insertRating = db.prepare(`
        INSERT OR IGNORE INTO ratings (
          id, report_code, customer_name, rating, feedback, service_type
        ) VALUES (?, ?, ?, ?, ?, ?)
      `);

      // نقل الحجوزات
      if (oldData.bookings && oldData.bookings.length > 0) {
        const migrateBookings = db.transaction((bookings) => {
          for (const booking of bookings) {
            insertBooking.run(
              booking.id || require('crypto').randomUUID(),
              booking.customerName, booking.customerPhone, booking.customerEmail,
              booking.carType, booking.carModel, booking.carYear,
              booking.vin, booking.plateNumber, booking.serviceType,
              booking.preferredDate || booking.date, booking.preferredTime || booking.time,
              booking.status || 'pending', booking.notes,
              booking.paymentStatus || 'pending', booking.paymentAmount
            );
          }
        });
        migrateBookings(oldData.bookings);
        console.log(`✅ تم نقل ${oldData.bookings.length} حجز`);
      }

      // نقل التقارير
      if (oldData.reports && oldData.reports.length > 0) {
        const migrateReports = db.transaction((reports) => {
          for (const report of reports) {
            insertReport.run(
              report.id || require('crypto').randomUUID(),
              report.code || report.reportCode, report.customerName, report.phone, report.customerEmail,
              report.carType, report.carModel, report.carYear,
              report.vin, report.plateNumber, report.inspectionDate || new Date().toISOString(),
              report.overallCondition, JSON.stringify(report.defects || []),
              JSON.stringify(report.images || []), report.status || 'draft',
              report.filename, report.originalName
            );
          }
        });
        migrateReports(oldData.reports);
        console.log(`✅ تم نقل ${oldData.reports.length} تقرير`);
      }

      // نقل التقييمات
      if (oldData.valuations && oldData.valuations.length > 0) {
        const migrateValuations = db.transaction((valuations) => {
          for (const val of valuations) {
            insertValuation.run(
              val.id || require('crypto').randomUUID(),
              val.customerName, val.phone, val.customerEmail,
              val.model, val.model, val.year, val.mileage, val.condition,
              val.estimatedValueMin, val.estimatedValueMax, val.status || 'pending',
              JSON.stringify(val.images || [])
            );
          }
        });
        migrateValuations(oldData.valuations);
        console.log(`✅ تم نقل ${oldData.valuations.length} تقييم`);
      }

      // نقل Ratings
      if (oldData.ratings && oldData.ratings.length > 0) {
        const migrateRatings = db.transaction((ratings) => {
          for (const rating of ratings) {
            insertRating.run(
              rating.id || require('crypto').randomUUID(),
              rating.reportCode, rating.name, rating.stars,
              rating.comment, rating.serviceType
            );
          }
        });
        migrateRatings(oldData.ratings);
        console.log(`✅ تم نقل ${oldData.ratings.length} تقييم عميل`);
      }

      // عمل نسخة احتياطية من database.json
      const backupPath = oldDbPath + '.backup';
      fs.renameSync(oldDbPath, backupPath);
      console.log(`✅ تم نقل database.json إلى ${backupPath}`);
    }

    console.log('✅ تم إعداد قاعدة البيانات بنجاح!');
    console.log(`📁 موقع قاعدة البيانات: ${dbPath}`);
  } catch (error) {
    console.error('❌ خطأ في إعداد قاعدة البيانات:', error);
    throw error;
  }
}

if (require.main === module) {
  try {
    setupDatabase();
    console.log('✅ تم الانتهاء');
    process.exit(0);
  } catch (error) {
    console.error('❌ فشل الإعداد:', error);
    process.exit(1);
  }
}

module.exports = { setupDatabase, db };
