# 🚀 خطوات رفع المشروع على GitHub

## الطريقة السريعة (للمبتدئين)

### 1️⃣ إنشاء Repository على GitHub

1. اذهب إلى https://github.com/new
2. ضع اسم المشروع: `high-safety-car-inspection`
3. اختر `Private` أو `Public`
4. **لا** تضع علامة على "Add a README"
5. اضغط `Create repository`

### 2️⃣ رفع المشروع من الكمبيوتر

افتح PowerShell في مجلد المشروع وشغّل الأوامر التالية:

```powershell
# 1. تهيئة Git (إذا لم يكن مهيأ)
git init

# 2. إضافة جميع الملفات
git add .

# 3. عمل Commit
git commit -m "Initial commit: High Safety Car Inspection Platform"

# 4. تعيين الـ branch الرئيسي
git branch -M main

# 5. ربط بـ GitHub (غيّر YOUR-USERNAME باسمك)
git remote add origin https://github.com/YOUR-USERNAME/high-safety-car-inspection.git

# 6. رفع الملفات
git push -u origin main
```

**ملاحظة:** عند السؤال عن Username وPassword، استخدم:
- Username: اسم المستخدم على GitHub
- Password: Personal Access Token (ليس كلمة المرور العادية)

### 3️⃣ إنشاء Personal Access Token

إذا طُلب منك Password:

1. اذهب إلى https://github.com/settings/tokens
2. اضغط `Generate new token` → `Generate new token (classic)`
3. ضع اسم للـ token: `High Safety Deployment`
4. اختر المدة: `90 days` أو `No expiration`
5. اختر `repo` (كل الخيارات تحته)
6. اضغط `Generate token`
7. **انسخ الـ token فوراً** (لن يظهر مرة أخرى!)
8. استخدمه كـ Password عند الـ push

---

## الطريقة باستخدام GitHub Desktop (الأسهل)

### 1️⃣ تحميل GitHub Desktop

- رابط التحميل: https://desktop.github.com/

### 2️⃣ تسجيل الدخول

1. افتح GitHub Desktop
2. File → Options → Sign in
3. سجل دخولك بحساب GitHub

### 3️⃣ إضافة المشروع

1. File → Add Local Repository
2. اختر مجلد المشروع: `C:\Users\Dell\Videos\HS`
3. إذا قال "not a git repository"، اضغط `Initialize Git Repository`

### 4️⃣ Commit التغييرات

1. في الجانب الأيسر، سترى جميع الملفات
2. ضع عنوان الـ Commit: `Initial commit`
3. اضغط `Commit to main`

### 5️⃣ النشر على GitHub

1. اضغط `Publish repository`
2. اختر الاسم: `high-safety-car-inspection`
3. اختر Private أو Public
4. اضغط `Publish Repository`

✅ **تم! المشروع الآن على GitHub**

---

## التحديثات المستقبلية

عند عمل تعديلات على المشروع:

```powershell
# 1. إضافة الملفات المعدلة
git add .

# 2. عمل Commit
git commit -m "Update: وصف التعديل"

# 3. رفع التحديث
git push
```

أو عبر GitHub Desktop:
1. الملفات المعدلة ستظهر تلقائياً
2. اكتب وصف التعديل
3. Commit to main
4. Push origin

---

## ⚠️ ملاحظات مهمة قبل الرفع

### ✅ تحقق من هذه النقاط:

```powershell
# 1. تأكد من وجود .gitignore
dir .gitignore

# 2. تأكد من أن .env غير موجود في Git
git status | Select-String ".env"
# يجب ألا يظهر شيء

# 3. تأكد من أن node_modules غير موجود
git status | Select-String "node_modules"
# يجب ألا يظهر شيء

# 4. شغّل فحص الجاهزية
node check-deployment.js
```

### ❌ لا ترفع هذه الملفات أبداً:

- ❌ `.env` (يحتوي على كلمات المرور!)
- ❌ `node_modules/` (كبير جداً)
- ❌ `*.db` (قاعدة البيانات)
- ❌ `uploads/` (ملفات المستخدمين)

---

## 🔗 ربط المشروع بخدمات النشر

### Vercel (للواجهة)

```powershell
# 1. تثبيت Vercel CLI
npm i -g vercel

# 2. تسجيل الدخول
vercel login

# 3. ربط المشروع
vercel link

# 4. نشر
vercel --prod
```

### Railway (للسيرفر)

1. اذهب إلى https://railway.app
2. اضغط `New Project`
3. اختر `Deploy from GitHub repo`
4. اختر `high-safety-car-inspection`
5. أضف Environment Variables من `.env.example`

---

## 🆘 حل المشاكل الشائعة

### "repository not found"
```powershell
# تحقق من رابط الـ repository
git remote -v

# إذا كان خاطئ، غيّره
git remote set-url origin https://github.com/YOUR-USERNAME/high-safety-car-inspection.git
```

### "Permission denied"
- استخدم Personal Access Token بدلاً من كلمة المرور

### "large files"
```powershell
# إذا كان الملف كبير جداً
# أضفه للـ .gitignore ثم:
git rm --cached path/to/large/file
git commit -m "Remove large file"
```

### "uncommitted changes"
```powershell
# حفظ التغييرات أولاً
git add .
git commit -m "Save changes"
git push
```

---

## 📱 التحديث من أجهزة أخرى

إذا أردت العمل من كمبيوتر آخر:

```powershell
# 1. استنساخ المشروع
git clone https://github.com/YOUR-USERNAME/high-safety-car-inspection.git

# 2. الدخول للمجلد
cd high-safety-car-inspection

# 3. تثبيت التبعيات
npm install
cd client && npm install && cd ..

# 4. إنشاء .env
copy .env.example .env
# ثم عدّل القيم

# 5. تشغيل المشروع
npm run dev
```

---

## ✅ Checklist النهائي

قبل الـ Push:

- [ ] ملف `.env` غير موجود في Git
- [ ] ملف `.gitignore` محدث
- [ ] `README.md` موجود
- [ ] كلمة المرور الافتراضية تم تغييرها
- [ ] لا توجد بيانات حساسة في الكود
- [ ] المشروع يعمل محلياً بدون أخطاء
- [ ] تم عمل `git add .`
- [ ] تم عمل `git commit`
- [ ] جاهز للـ `git push`

---

## 🎉 بعد الرفع

الآن يمكنك:

1. ✅ مشاركة رابط المشروع
2. ✅ النشر على Vercel/Railway
3. ✅ دعوة مطورين آخرين للمساهمة
4. ✅ تفعيل GitHub Actions
5. ✅ إضافة Issues و Projects

---

**رابط المشروع سيكون:**
```
https://github.com/YOUR-USERNAME/high-safety-car-inspection
```

**حظاً موفقاً! 🚀**
