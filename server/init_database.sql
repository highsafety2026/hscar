-- Create Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  points INTEGER DEFAULT 0,
  push_token TEXT,
  platform TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  last_login TEXT DEFAULT (datetime('now'))
);

-- Create Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  car_model TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (phone) REFERENCES users(phone)
);

-- Create Points Transactions table
CREATE TABLE IF NOT EXISTS points_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL,
  points INTEGER NOT NULL,
  action TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (phone) REFERENCES users(phone)
);

-- Create Maintenance Reminders table
CREATE TABLE IF NOT EXISTS maintenance_reminders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (phone) REFERENCES users(phone)
);

-- Create Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data TEXT,
  read INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (phone) REFERENCES users(phone)
);

-- Create Rewards Redeemed table
CREATE TABLE IF NOT EXISTS rewards_redeemed (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL,
  reward_id INTEGER NOT NULL,
  reward_name TEXT NOT NULL,
  points_used INTEGER NOT NULL,
  code TEXT UNIQUE NOT NULL,
  used INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (phone) REFERENCES users(phone)
);

-- Create Daily Offers table
CREATE TABLE IF NOT EXISTS offers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  discount INTEGER NOT NULL,
  valid_until TEXT NOT NULL,
  image_url TEXT,
  active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_appointments_phone ON appointments(phone);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_notifications_phone ON notifications(phone);
CREATE INDEX IF NOT EXISTS idx_maintenance_phone ON maintenance_reminders(phone);
CREATE INDEX IF NOT EXISTS idx_points_phone ON points_transactions(phone);
