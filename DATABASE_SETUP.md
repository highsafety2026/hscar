# إعداد قاعدة بيانات High Safety

## متطلبات التشغيل

1. **تثبيت PostgreSQL**
   - Windows: https://www.postgresql.org/download/windows/
   - أثناء التثبيت، احفظ كلمة المرور الخاصة بـ postgres

2. **إنشاء قاعدة البيانات**
   ```bash
   # افتح PowerShell أو CMD
   createdb -U postgres highsafety
   ```

3. **تحديث ملف .env**
   ```env
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/highsafety
   ```
   استبدل `YOUR_PASSWORD` بكلمة المرور الخاصة بـ postgres

## التشغيل

### طريقة 1: استخدام السكريبت (Windows)
```bash
start.bat
```

### طريقة 2: يدوياً
```bash
# 1. إعداد قاعدة البيانات
node server/database-setup.js

# 2. تشغيل المشروع
npm run dev
```

## التشغيل على استضافة خارجية

### 1. Heroku
```bash
# أضف PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# اربط قاعدة البيانات (تلقائياً يضيف DATABASE_URL)
git push heroku main
```

### 2. Railway.app
1. اربط مشروعك من GitHub
2. أضف PostgreSQL من Marketplace
3. سيتم إضافة DATABASE_URL تلقائياً

### 3. Render.com
1. أنشئ PostgreSQL database
2. أنشئ Web Service
3. أضف DATABASE_URL من إعدادات قاعدة البيانات

## ملاحظات مهمة

- ✅ جميع البيانات محفوظة في PostgreSQL
- ✅ يعمل محلياً وعلى الاستضافة الخارجية
- ✅ تم نقل البيانات من database.json تلقائياً
- ✅ يمكن حذف database.json بعد التأكد من نقل البيانات

## استكشاف الأخطاء

### خطأ: Cannot connect to database
```bash
# تحقق من أن PostgreSQL يعمل
# Windows:
services.msc  # ابحث عن postgresql-x64-XX

# أو شغله يدوياً:
pg_ctl -D "C:\Program Files\PostgreSQL\XX\data" start
```

### خطأ: Database does not exist
```bash
createdb -U postgres highsafety
```

### خطأ: Authentication failed
تأكد من كلمة المرور الصحيحة في DATABASE_URL
