const Database = require('better-sqlite3');
const db = new Database('./database.db');

const stmt = db.prepare(`
  INSERT INTO offers (title_ar, title_en, description_ar, description_en, discount, valid_until, active)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

// إضافة عرضين
stmt.run(
  'عرض الفحص الشامل', 
  'Full Inspection Offer', 
  'خصم 20% على الفحص الشامل - عرض لفترة محدودة!', 
  '20% discount on full inspection - Limited time!', 
  20, 
  '2026-12-31', 
  1
);

stmt.run(
  'عرض الموسم', 
  'Seasonal Offer', 
  'احصل على خصم 15% على أي نوع فحص', 
  'Get 15% discount on any inspection type', 
  15, 
  '2026-06-30', 
  1
);

console.log('\n✅ تم إضافة عرضين تجريبيين بنجاح!');
console.log('\n🔄 ارجع للمتصفح واعمل Refresh (F5) عشان تشوف قسم العروض!');

db.close();
