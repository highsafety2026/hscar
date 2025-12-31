const { db } = require('./database-setup');
const { randomUUID } = require('crypto');

// Helper function to convert camelCase to snake_case
function toSnakeCase(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

// Bookings operations
function createBooking(bookingData) {
  const id = randomUUID();
  const stmt = db.prepare(`
    INSERT INTO bookings (
      id, customer_name, customer_phone, customer_email,
      car_type, car_model, car_year, vin, plate_number,
      service_type, date, time, status, notes, payment_status, payment_amount
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(
    id,
    bookingData.customerName, bookingData.customerPhone, bookingData.customerEmail,
    bookingData.carType, bookingData.carModel, bookingData.carYear,
    bookingData.vin, bookingData.plateNumber, bookingData.serviceType,
    bookingData.preferredDate, bookingData.preferredTime,
    'pending', bookingData.notes, 'pending', bookingData.paymentAmount
  );
  
  return db.prepare('SELECT * FROM bookings WHERE id = ?').get(id);
}

function getAllBookings() {
  return db.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all();
}

function getBookingById(id) {
  return db.prepare('SELECT * FROM bookings WHERE id = ?').get(id);
}

function updateBooking(id, updates) {
  const fields = [];
  const values = [];

  Object.keys(updates).forEach(key => {
    if (updates[key] !== undefined) {
      const dbKey = toSnakeCase(key);
      fields.push(`${dbKey} = ?`);
      values.push(updates[key]);
    }
  });

  if (fields.length === 0) return getBookingById(id);

  fields.push('updated_at = datetime("now")');
  values.push(id);

  const query = `UPDATE bookings SET ${fields.join(', ')} WHERE id = ?`;
  db.prepare(query).run(...values);
  
  return getBookingById(id);
}

function deleteBooking(id) {
  db.prepare('DELETE FROM bookings WHERE id = ?').run(id);
  return true;
}

function checkBookingConflict(date, time, excludeId = null) {
  let query = `SELECT * FROM bookings WHERE date = ? AND time = ? AND status != 'cancelled'`;
  const params = [date, time];
  
  if (excludeId) {
    query += ` AND id != ?`;
    params.push(excludeId);
  }
  
  return db.prepare(query).get(...params);
}

function getBookedSlots(date) {
  const results = db.prepare(
    `SELECT time FROM bookings WHERE date = ? AND status != 'cancelled'`
  ).all(date);
  return results.map(row => row.time);
}

// Reports operations
function createReport(reportData) {
  const id = randomUUID();
  const stmt = db.prepare(`
    INSERT INTO reports (
      id, report_code, customer_name, customer_phone, customer_email,
      car_type, car_model, car_year, vin, plate_number,
      inspection_date, overall_condition, defects, images, status, filename, original_name
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(
    id,
    reportData.code, reportData.customerName, reportData.phone, reportData.customerEmail,
    reportData.carType, reportData.carModel, reportData.carYear,
    reportData.vin, reportData.plateNumber,
    reportData.inspectionDate || new Date().toISOString(),
    reportData.overallCondition,
    JSON.stringify(reportData.defects || []),
    JSON.stringify(reportData.images || []),
    reportData.status || 'draft',
    reportData.filename, reportData.originalName
  );
  
  return db.prepare('SELECT * FROM reports WHERE id = ?').get(id);
}

function getAllReports() {
  return db.prepare('SELECT * FROM reports ORDER BY created_at DESC').all();
}

function getReportByCode(code) {
  return db.prepare('SELECT * FROM reports WHERE UPPER(report_code) = UPPER(?)').get(code);
}

function getReportByPhone(phone) {
  return db.prepare(
    'SELECT * FROM reports WHERE customer_phone = ? ORDER BY created_at DESC LIMIT 1'
  ).get(phone);
}

function updateReport(id, updates) {
  const fields = [];
  const values = [];

  Object.keys(updates).forEach(key => {
    if (updates[key] !== undefined) {
      const dbKey = toSnakeCase(key);
      if (['defects', 'images'].includes(dbKey)) {
        fields.push(`${dbKey} = ?`);
        values.push(JSON.stringify(updates[key]));
      } else {
        fields.push(`${dbKey} = ?`);
        values.push(updates[key]);
      }
    }
  });

  if (fields.length === 0) return db.prepare('SELECT * FROM reports WHERE id = ?').get(id);

  fields.push('updated_at = datetime("now")');
  values.push(id);

  const query = `UPDATE reports SET ${fields.join(', ')} WHERE id = ?`;
  db.prepare(query).run(...values);
  
  return db.prepare('SELECT * FROM reports WHERE id = ?').get(id);
}

function deleteReport(id) {
  db.prepare('DELETE FROM reports WHERE id = ?').run(id);
  return true;
}

// Valuations operations
function createValuation(valuationData) {
  const id = randomUUID();
  const stmt = db.prepare(`
    INSERT INTO valuations (
      id, customer_name, customer_phone, customer_email,
      car_brand, car_model, car_year, mileage, condition,
      accident_history, service_history, images, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(
    id,
    valuationData.customerName, valuationData.phone, valuationData.customerEmail,
    valuationData.model, valuationData.model, valuationData.year,
    valuationData.mileage, valuationData.condition,
    valuationData.accidentHistory, valuationData.serviceHistory,
    JSON.stringify(valuationData.images || []), 'pending'
  );
  
  return db.prepare('SELECT * FROM valuations WHERE id = ?').get(id);
}

function getAllValuations() {
  return db.prepare('SELECT * FROM valuations ORDER BY created_at DESC').all();
}

function getValuationByPhone(phone) {
  return db.prepare(
    'SELECT * FROM valuations WHERE customer_phone = ? AND status = ? LIMIT 1'
  ).get(phone, 'completed');
}

function updateValuation(id, updates) {
  const fields = [];
  const values = [];

  Object.keys(updates).forEach(key => {
    if (updates[key] !== undefined) {
      const dbKey = toSnakeCase(key);
      if (dbKey === 'images') {
        fields.push(`${dbKey} = ?`);
        values.push(JSON.stringify(updates[key]));
      } else {
        fields.push(`${dbKey} = ?`);
        values.push(updates[key]);
      }
    }
  });

  if (fields.length === 0) return db.prepare('SELECT * FROM valuations WHERE id = ?').get(id);

  fields.push('updated_at = datetime("now")');
  values.push(id);

  const query = `UPDATE valuations SET ${fields.join(', ')} WHERE id = ?`;
  db.prepare(query).run(...values);
  
  return db.prepare('SELECT * FROM valuations WHERE id = ?').get(id);
}

function deleteValuation(id) {
  db.prepare('DELETE FROM valuations WHERE id = ?').run(id);
  return true;
}

// Ratings operations
function createRating(ratingData) {
  const id = randomUUID();
  const stmt = db.prepare(`
    INSERT INTO ratings (
      id, report_code, customer_name, rating, feedback, service_type
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(
    id,
    ratingData.reportCode, ratingData.name || 'عميل',
    ratingData.stars, ratingData.comment, ratingData.serviceType
  );
  
  return db.prepare('SELECT * FROM ratings WHERE id = ?').get(id);
}

function getAllRatings() {
  return db.prepare('SELECT * FROM ratings ORDER BY created_at DESC LIMIT 10').all();
}

function getRatingsStats() {
  const result = db.prepare(`
    SELECT COUNT(*) as count, AVG(rating) as average
    FROM ratings
  `).get();
  
  return {
    count: result.count,
    average: Math.round((result.average || 0) * 10) / 10
  };
}

function deleteRating(id) {
  db.prepare('DELETE FROM ratings WHERE id = ?').run(id);
  return true;
}

// OTP operations
function saveOTP(phone, code, expiresIn = 5 * 60 * 1000) {
  const expiresAt = new Date(Date.now() + expiresIn).toISOString();
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO otp_codes (phone, code, expires_at)
    VALUES (?, ?, ?)
  `);
  stmt.run(phone, code, expiresAt);
  return true;
}

function verifyOTP(phone, code) {
  const result = db.prepare(
    'SELECT * FROM otp_codes WHERE phone = ? AND code = ? AND datetime(expires_at) > datetime("now")'
  ).get(phone, code);
  
  if (result) {
    db.prepare('DELETE FROM otp_codes WHERE phone = ?').run(phone);
    return true;
  }
  return false;
}

// Session operations
function createSession(token, userData, expiresIn = 24 * 60 * 60 * 1000) {
  const expiresAt = new Date(Date.now() + expiresIn).toISOString();
  const stmt = db.prepare(`
    INSERT INTO sessions (token, user_type, username, expires_at)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(token, userData.userType || 'admin', userData.username, expiresAt);
  return token;
}

function getSession(token) {
  return db.prepare(
    'SELECT * FROM sessions WHERE token = ? AND datetime(expires_at) > datetime("now")'
  ).get(token);
}

function deleteSession(token) {
  db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
  return true;
}

// Cleanup expired sessions and OTPs
function cleanupExpired() {
  db.prepare('DELETE FROM sessions WHERE datetime(expires_at) < datetime("now")').run();
  db.prepare('DELETE FROM otp_codes WHERE datetime(expires_at) < datetime("now")').run();
}

// Run cleanup every hour
setInterval(cleanupExpired, 60 * 60 * 1000);

module.exports = {
  // Bookings
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  checkBookingConflict,
  getBookedSlots,
  
  // Reports
  createReport,
  getAllReports,
  getReportByCode,
  getReportByPhone,
  updateReport,
  deleteReport,
  
  // Valuations
  createValuation,
  getAllValuations,
  getValuationByPhone,
  updateValuation,
  deleteValuation,
  
  // Ratings
  createRating,
  getAllRatings,
  getRatingsStats,
  deleteRating,
  
  // OTP
  saveOTP,
  verifyOTP,
  
  // Sessions
  createSession,
  getSession,
  deleteSession,
  
  // Cleanup
  cleanupExpired
};
