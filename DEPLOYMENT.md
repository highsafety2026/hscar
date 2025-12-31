# 🚀 دليل النشر - High Safety Car Inspection

## خيارات النشر المتاحة

### 1. Vercel (موصى به - مجاني) ⭐

**المميزات:**
- مجاني للمشاريع الشخصية
- CDN عالمي سريع
- SSL تلقائي
- دعم React/Vite ممتاز

**خطوات النشر:**

```bash
# 1. تثبيت Vercel CLI
npm i -g vercel

# 2. بناء المشروع
cd client
npm run build
cd ..

# 3. النشر
vercel --prod
```

**ملاحظة:** ستحتاج لنشر السيرفر بشكل منفصل (انظر الخيار 2 للسيرفر)

---

### 2. Railway (موصى به للسيرفر) 🚂

**المميزات:**
- مجاني مع $5 شهرياً
- دعم Node.js كامل
- قاعدة بيانات PostgreSQL مجانية
- CI/CD تلقائي

**خطوات النشر:**

1. **سجل على Railway**: https://railway.app
2. **أنشئ مشروع جديد** → "Deploy from GitHub"
3. **اربط الـ Repository**
4. **أضف المتغيرات البيئية:**
   ```
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_password
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   AI_INTEGRATIONS_OPENAI_API_KEY=sk-...
   PORT=3001
   NODE_ENV=production
   ```
5. **تعيين الأوامر:**
   - Build Command: `npm install && cd client && npm install && npm run build`
   - Start Command: `npm start`

---

### 3. Render (بديل مجاني جيد) 🎨

**المميزات:**
- خطة مجانية متاحة
- دعم Static Sites + Web Services
- SSL مجاني
- Auto-deploy من Git

**خطوات النشر:**

#### الواجهة (Static Site):
1. اذهب إلى https://render.com
2. New → Static Site
3. اختر repository
4. إعدادات:
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/dist`

#### السيرفر (Web Service):
1. New → Web Service
2. اختر repository
3. إعدادات:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. أضف Environment Variables

---

### 4. Netlify (للواجهة فقط) 🌐

**خطوات النشر:**

```bash
# 1. تثبيت Netlify CLI
npm i -g netlify-cli

# 2. بناء المشروع
cd client
npm run build

# 3. النشر
netlify deploy --prod --dir=dist
```

---

### 5. Heroku (تقليدي لكن موثوق) 🐳

**خطوات النشر:**

```bash
# 1. تثبيت Heroku CLI
# من https://devcenter.heroku.com/articles/heroku-cli

# 2. تسجيل الدخول
heroku login

# 3. إنشاء تطبيق
heroku create high-safety-app

# 4. إضافة PostgreSQL (اختياري)
heroku addons:create heroku-postgresql:hobby-dev

# 5. إعداد المتغيرات
heroku config:set ADMIN_USERNAME=admin
heroku config:set ADMIN_PASSWORD=your_password
heroku config:set STRIPE_SECRET_KEY=sk_live_...
# ... باقي المتغيرات

# 6. النشر
git push heroku main
```

**ملف Procfile** (أنشئه في المجلد الرئيسي):
```
web: npm start
```

---

### 6. VPS (للمحترفين) 💻

**مقدمو الخدمة:**
- DigitalOcean (من $5/شهر)
- AWS EC2
- Google Cloud
- Azure

**خطوات التثبيت على Ubuntu:**

```bash
# 1. الاتصال بالسيرفر
ssh root@your-server-ip

# 2. تحديث النظام
apt update && apt upgrade -y

# 3. تثبيت Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# 4. تثبيت Nginx
apt install -y nginx

# 5. استنساخ المشروع
git clone https://github.com/your-username/high-safety.git
cd high-safety

# 6. تثبيت التبعيات
npm install
cd client && npm install && npm run build && cd ..

# 7. إنشاء ملف .env
nano .env
# أضف المتغيرات...

# 8. تثبيت PM2
npm install -g pm2

# 9. تشغيل التطبيق
pm2 start server/index.js --name high-safety
pm2 startup
pm2 save

# 10. إعداد Nginx
nano /etc/nginx/sites-available/high-safety
```

**ملف Nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# تفعيل الموقع
ln -s /etc/nginx/sites-available/high-safety /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# تثبيت SSL (Let's Encrypt)
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

---

## 🔐 قبل النشر - Checklist

### ✅ الأمان
- [ ] تغيير كلمة مرور الأدمن الافتراضية
- [ ] تعيين متغيرات البيئة بشكل آمن
- [ ] استخدام مفاتيح Stripe الإنتاجية
- [ ] تفعيل HTTPS
- [ ] تحديث جميع التبعيات

### ✅ الأداء
- [ ] بناء المشروع للإنتاج (`npm run build`)
- [ ] تفعيل Compression
- [ ] تحسين الصور
- [ ] تفعيل CDN

### ✅ قاعدة البيانات
- [ ] أخذ نسخة احتياطية
- [ ] اختبار الاتصال
- [ ] إعداد PostgreSQL (للمشاريع الكبيرة)

### ✅ اختبار
- [ ] اختبار جميع الصفحات
- [ ] اختبار الحجز والدفع
- [ ] اختبار لوحة التحكم
- [ ] اختبار على أجهزة مختلفة

---

## 🌍 إعداد النطاق (Domain)

### شراء نطاق:
- Namecheap
- GoDaddy
- Google Domains

### ربط النطاق:

**Vercel/Netlify:**
```
1. اذهب إلى Settings → Domains
2. أضف النطاق
3. أضف DNS Records في مزود النطاق:
   A Record: @ → IP من Vercel
   CNAME: www → your-app.vercel.app
```

**Railway/Render:**
```
1. اذهب إلى Settings → Custom Domain
2. أضف CNAME Record:
   CNAME: your-domain.com → your-app.up.railway.app
```

---

## 📊 مراقبة الأداء

### أدوات مجانية:
- **Google Analytics**: لتحليل الزيارات
- **Sentry**: لتتبع الأخطاء
- **UptimeRobot**: لمراقبة التوفر

### إضافة Google Analytics:

في `client/index.html`:
```html
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

---

## 🔄 CI/CD (اختياري)

### GitHub Actions

أنشئ `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        npm install
        cd client && npm install
    
    - name: Build
      run: cd client && npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🆘 استكشاف الأخطاء

### المشاكل الشائعة:

**1. خطأ في بناء المشروع:**
```bash
# حذف node_modules وإعادة التثبيت
rm -rf node_modules client/node_modules
npm install
cd client && npm install
```

**2. خطأ في الاتصال بقاعدة البيانات:**
- تحقق من `DATABASE_URL`
- تأكد من تشغيل PostgreSQL

**3. خطأ Stripe:**
- تحقق من المفاتيح
- تأكد من تفعيل Webhook

**4. خطأ CORS:**
```javascript
// في server/index.js
app.use(cors({
  origin: ['https://your-domain.com'],
  credentials: true
}));
```

---

## 💡 نصائح إضافية

1. **استخدم CDN** للصور والملفات الثابتة
2. **فعّل Caching** لتحسين الأداء
3. **راقب الأخطاء** باستمرار
4. **احفظ نسخ احتياطية** دورية
5. **حدّث التبعيات** بانتظام

---

## 📞 الدعم

إذا واجهت أي مشاكل:
1. تحقق من [Issues](https://github.com/your-username/high-safety/issues)
2. افتح Issue جديد
3. راسلنا على info@highsafety.ae

---

**حظاً موفقاً في النشر! 🚀**
