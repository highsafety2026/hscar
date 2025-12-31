# 🚗 High Safety International - Car Inspection Center

<div align="center">

![High Safety Logo](client/public/images/logo.png)

**مركز فحص السيارات الأكثر تطوراً في الإمارات**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)

[English](#english) | [العربية](#arabic)

</div>

---

## <a id="arabic"></a> 🌟 نظرة عامة

منصة متكاملة لحجز وإدارة فحوصات السيارات مع واجهة مستخدم عصرية، دعم متعدد اللغات، ونظام دفع آمن.

### ✨ المميزات الرئيسية

#### 🎯 للعملاء
- **حجز ذكي**: نظام حجز مواعيد تفاعلي مع 5 خطوات سهلة
- **باقات متنوعة**: 4 أنواع فحص لكل فئات السيارات (صالون، SUV، كلاسيك، فاخرة، VIP)
- **تقييم السيارة بالذكاء الاصطناعي**: تقييم فوري لقيمة السيارة
- **تقارير تفاعلية**: عرض تفصيلي لنتائج الفحص مع صور
- **شات بوت ذكي**: مساعد AI للإجابة على الاستفسارات
- **دفع مرن**: خيار الدفع الإلكتروني (خصم 5%) أو كاش

#### 👨‍💼 لوحة التحكم
- **إدارة الحجوزات**: عرض وتعديل جميع الحجوزات
- **إدارة التقارير**: إنشاء وتحديث تقارير الفحص
- **إحصائيات شاملة**: تتبع الأداء والإيرادات
- **Terminal Shell**: للمطورين والصيانة المتقدمة

#### 🌍 دعم متعدد اللغات
- العربية 🇦🇪
- English 🇬🇧
- اردو 🇵🇰
- فارسی 🇮🇷

### 💳 نظام الدفع
- **Stripe Integration**: بوابة دفع آمنة
- **خصم 5%**: عند الدفع الإلكتروني
- **دفع كاش**: خيار الدفع عند الوصول

---

## 🚀 التثبيت والتشغيل

### المتطلبات الأساسية

```bash
Node.js >= 18.x
npm >= 9.x
```

### 1️⃣ استنساخ المشروع

```bash
git clone https://github.com/your-username/high-safety.git
cd high-safety
```

### 2️⃣ تثبيت التبعيات

```bash
# تثبيت تبعيات السيرفر
npm install

# تثبيت تبعيات الواجهة
cd client
npm install
cd ..
```

### 3️⃣ إعداد متغيرات البيئة

أنشئ ملف `.env` في المجلد الرئيسي:

```env
# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# OpenAI Configuration
AI_INTEGRATIONS_OPENAI_BASE_URL=https://api.openai.com/v1
AI_INTEGRATIONS_OPENAI_API_KEY=sk-your_openai_api_key

# Database (Optional for PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/highsafety

# Server Configuration
PORT=3001
NODE_ENV=production
```

### 4️⃣ إعداد قاعدة البيانات

```bash
# SQLite (افتراضي - يتم إنشاؤها تلقائياً)
node server/database-setup.js

# أو للـ PostgreSQL (اختياري)
# تأكد من تعيين DATABASE_URL أولاً
```

### 5️⃣ تشغيل المشروع

#### التطوير (Development)

```bash
# Windows
start.bat

# أو يدوياً
npm run dev
```

- السيرفر: `http://localhost:3001`
- الواجهة: `http://localhost:5173`

#### الإنتاج (Production)

```bash
# بناء الواجهة
cd client
npm run build
cd ..

# تشغيل السيرفر
npm start
```

---

## 📁 هيكل المشروع

```
high-safety/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/      # مكونات قابلة لإعادة الاستخدام
│   │   ├── pages/          # صفحات التطبيق
│   │   ├── i18n/           # ملفات الترجمة
│   │   ├── assets/         # الصور والملفات الثابتة
│   │   └── styles/         # ملفات CSS
│   └── public/             # ملفات عامة
│
├── server/                  # Node.js Backend
│   ├── index.js            # نقطة البداية
│   ├── database-setup.js   # إعداد قاعدة البيانات
│   ├── db-operations.js    # عمليات قاعدة البيانات
│   └── stripeClient.js     # تكامل Stripe
│
├── uploads/                # ملفات التحميل
├── .env.example            # مثال لمتغيرات البيئة
├── .gitignore             # ملفات مستثناة من Git
├── package.json           # تبعيات المشروع
└── start.bat              # سكريبت تشغيل Windows
```

---

## 🔐 الأمان

### ✅ إجراءات الأمان المطبقة

- ✅ **متغيرات البيئة**: جميع البيانات الحساسة في `.env`
- ✅ **تشفير كلمات المرور**: SHA256 hashing
- ✅ **HTTPS**: دعم SSL/TLS
- ✅ **CORS**: تكوين محدد للمصادر المسموحة
- ✅ **Prepared Statements**: حماية من SQL Injection
- ✅ **Stripe PCI Compliant**: دفع آمن معتمد

### ⚠️ توصيات أمنية إضافية

1. **غيّر كلمة المرور الافتراضية** فوراً
2. **استخدم HTTPS** في الإنتاج
3. **فعّل Rate Limiting** لمنع الهجمات
4. **قم بتحديث التبعيات** بانتظام
5. **استخدم bcrypt** بدلاً من SHA256 (موجود لكن غير مفعّل)

```bash
npm audit fix
```

---

## 🎨 واجهة المستخدم

### صفحات التطبيق

- **الرئيسية**: عرض تقديمي للخدمات
- **الخدمات**: تفاصيل باقات الفحص
- **الحجز**: نظام حجز من 5 خطوات
- **البحث عن التقرير**: استرجاع التقارير
- **لوحة التحكم**: إدارة شاملة

### تصميم متجاوب

- 📱 Mobile First Design
- 💻 Desktop Optimized
- 🎯 Touch Friendly
- 🌙 دعم RTL للغة العربية

---

## 🔧 API Endpoints

### العام
```
GET  /                      - الصفحة الرئيسية
GET  /api/slots             - الأوقات المتاحة
POST /api/bookings          - إنشاء حجز جديد
GET  /api/report/:code      - البحث عن تقرير
POST /api/valuation         - تقييم السيارة
```

### الدفع
```
POST /api/create-checkout-session  - إنشاء جلسة دفع
POST /api/stripe/webhook           - Stripe webhook
```

### لوحة التحكم (مصادقة مطلوبة)
```
POST /api/admin/login       - تسجيل دخول
POST /api/admin/logout      - تسجيل خروج
GET  /api/admin/bookings    - جميع الحجوزات
GET  /api/admin/reports     - جميع التقارير
POST /api/admin/shell       - تنفيذ أوامر
```

---

## 🚀 النشر

### Vercel (موصى به للواجهة)

```bash
cd client
npm run build
vercel --prod
```

### Heroku (للسيرفر)

```bash
heroku create high-safety-app
git push heroku main
heroku config:set NODE_ENV=production
```

### Railway / Render

1. ربط repository من GitHub
2. إضافة متغيرات البيئة
3. تعيين Build Command: `npm install && cd client && npm install && npm run build`
4. تعيين Start Command: `npm start`

### Replit

المشروع جاهز للتشغيل على Replit مباشرة:
- يدعم Stripe Connector
- Auto-restart
- Built-in Database

---

## 🛠️ التطوير

### إضافة لغة جديدة

1. افتح `client/src/i18n/translations.js`
2. أضف اللغة الجديدة:

```javascript
export const translations = {
  // ... existing languages
  fr: {
    home: 'Accueil',
    services: 'Services',
    // ...
  }
}
```

### تخصيص الألوان

الألوان الرئيسية في `client/src/styles/index.css`:

```css
:root {
  --primary-color: #0B1F3A;
  --secondary-color: #C89D2A;
  --accent-color: #4285F4;
}
```

### إضافة باقة فحص جديدة

في `client/src/pages/Booking.jsx`:

```javascript
const serviceTypes = [
  // ... existing services
  { 
    id: 'premium', 
    icon: <Star size={22} />, 
    title: 'فحص بريميوم', 
    titleEn: 'Premium Inspection', 
    color: '#9C27B0' 
  }
]
```

---

## 📊 قاعدة البيانات

### SQLite (افتراضي)

- ملف: `server/highsafety.db`
- خفيف وسريع
- مناسب للمشاريع الصغيرة والمتوسطة

### PostgreSQL (اختياري)

- للمشاريع الكبيرة
- دعم متقدم للبيانات
- يتطلب تعيين `DATABASE_URL`

### الجداول الرئيسية

- `bookings` - الحجوزات
- `reports` - تقارير الفحص
- `valuations` - تقييمات السيارات
- `ratings` - تقييمات العملاء
- `payments` - المدفوعات

---

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:

1. Fork المشروع
2. إنشاء branch للميزة الجديدة
3. Commit التغييرات
4. Push إلى Branch
5. فتح Pull Request

---

## 📝 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE)

---

## 📞 التواصل

- **WhatsApp**: [+971 XX XXX XXXX](https://wa.me/971xxxxxxxxx)
- **البريد الإلكتروني**: info@highsafety.ae
- **الموقع**: [www.highsafety.ae](https://highsafety.ae)

---

## 🙏 شكر وتقدير

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Stripe](https://stripe.com/)
- [OpenAI](https://openai.com/)
- [Three.js](https://threejs.org/)
- [Lucide Icons](https://lucide.dev/)

---

<div align="center">

**صُنع بـ ❤️ في الإمارات العربية المتحدة 🇦🇪**

⭐ إذا أعجبك المشروع، لا تنسَ إضافة نجمة!

</div>

---

## <a id="english"></a> 🌟 Overview (English)

A comprehensive platform for booking and managing car inspections with a modern user interface, multilingual support, and secure payment system.

### Key Features

- 🚗 Smart booking system with 5 easy steps
- 🤖 AI-powered car valuation
- 📊 Interactive inspection reports
- 💬 AI chatbot assistant
- 💳 Flexible payment (Electronic 5% discount / Cash)
- 🌍 Multi-language support (Arabic, English, Urdu, Farsi)
- 👨‍💼 Comprehensive admin dashboard

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/high-safety.git

# Install dependencies
npm install
cd client && npm install && cd ..

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

### Tech Stack

**Frontend:**
- React 18
- Vite
- Lucide Icons
- Three.js

**Backend:**
- Node.js / Express
- SQLite / PostgreSQL
- Stripe Payment
- OpenAI Integration

### Security Score: 55/100

**Implemented:**
- ✅ Environment variables
- ✅ Password hashing
- ✅ HTTPS support
- ✅ Prepared statements

**Recommended:**
- ⚠️ Add Rate Limiting
- ⚠️ Use bcrypt instead of SHA256
- ⚠️ Implement Helmet.js
- ⚠️ Remove shell command execution

### License

MIT License - see [LICENSE](LICENSE) file for details

---

<div align="center">

**Made with ❤️ in UAE 🇦🇪**

</div>
