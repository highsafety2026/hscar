# 🚨 خطوات بناء APK - دليل كامل

## المشكلة: ملف APK غير موجود

السبب: **Java غير مثبت** على جهازك! 

---

## ✅ الحل: تثبيت Java وبناء APK

### الطريقة 1️⃣: تثبيت Java يدوياً (الأسهل)

#### الخطوة 1: تحميل Java
1. افتح المتصفح وروح على:
   ```
   https://www.oracle.com/java/technologies/downloads/#jdk17-windows
   ```

2. حمّل **Windows x64 Installer** (حجمه ~150 MB)

3. افتح الملف وثبته:
   - اضغط Next → Next → Install
   - انتظر حتى ينتهي التثبيت
   - اضغط Close

#### الخطوة 2: تحقق من التثبيت
افتح PowerShell جديد واكتب:
```bash
java -version
```

يجب أن ترى: `java version "17.0.x"`

#### الخطوة 3: بناء APK
```bash
cd c:\Users\Dell\Videos\HS\client
npm run build
npx cap sync android
cd android
.\gradlew.bat assembleDebug
```

⏱️ **أول مرة هياخد 5-10 دقائق** (بينزل المكتبات)

#### الخطوة 4: مكان الملف
```
c:\Users\Dell\Videos\HS\client\android\app\build\outputs\apk\debug\app-debug.apk
```

---

### الطريقة 2️⃣: استخدام Android Studio (الأفضل)

#### لو Java مش عايز يتثبت، استخدم Android Studio:

1. **حمل Android Studio:**
   ```
   https://developer.android.com/studio
   ```

2. **ثبته** - هو هيجي معاه Java جاهز!

3. **افتح المشروع:**
   ```bash
   cd c:\Users\Dell\Videos\HS\client
   npm run android
   ```

4. **في Android Studio:**
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - انتظر حتى ينتهي البناء
   - اضغط على "locate" لتجد الملف

5. **الملف موجود في:**
   ```
   client\android\app\build\outputs\apk\debug\app-debug.apk
   ```

---

### الطريقة 3️⃣: تثبيت عبر Chocolatey

إذا عندك Chocolatey مثبت:
```bash
choco install openjdk17 -y
```

---

## 🔍 تأكد من التثبيت الصحيح

### بعد تثبيت Java، جرب:
```bash
# تحقق من Java
java -version

# يجب أن يظهر:
# java version "17.0.x"

# تحقق من JAVA_HOME
echo $env:JAVA_HOME
```

---

## 🛠️ بناء APK خطوة بخطوة

### إذا Java شغال، نفذ الأوامر دي:

```bash
# 1. اذهب لمجلد المشروع
cd c:\Users\Dell\Videos\HS\client

# 2. ابنِ المشروع
npm run build

# 3. زامن مع Android
npx cap sync android

# 4. اذهب لمجلد Android
cd android

# 5. ابنِ APK
.\gradlew.bat assembleDebug

# 6. الملف موجود في:
# android\app\build\outputs\apk\debug\app-debug.apk
```

---

## ⚡ اختصار سريع

بعد تثبيت Java، استخدم الأمر المختصر:
```bash
cd c:\Users\Dell\Videos\HS\client
npm run build:apk
```

هذا سيبني كل شيء تلقائياً!

---

## 📱 بعد الحصول على APK

### طريقة 1: نقل عبر USB
```
1. وصل الموبايل بالكمبيوتر
2. انسخ app-debug.apk
3. الصقه في Downloads على الموبايل
4. افتح الملف من File Manager
5. اضغط Install
```

### طريقة 2: رفع على Drive
```
1. ارفع app-debug.apk على Google Drive
2. افتح Drive من الموبايل
3. حمّل الملف
4. افتحه واضغط Install
```

### طريقة 3: عبر WhatsApp
```
1. ابعت الملف لنفسك على WhatsApp
2. حمّله من الموبايل
3. افتحه واضغط Install
```

---

## ❌ مشاكل شائعة وحلولها

### مشكلة: "JAVA_HOME is not set"
**الحل:**
```bash
# ابحث عن مسار Java
dir "C:\Program Files\Java"

# ضع المسار في المتغيرات
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

# جرب مرة أخرى
java -version
```

### مشكلة: "gradlew: command not found"
**الحل:**
```bash
# تأكد أنك في مجلد android
cd c:\Users\Dell\Videos\HS\client\android

# استخدم .bat في Windows
.\gradlew.bat assembleDebug
```

### مشكلة: "SDK not found"
**الحل:**
- ثبت Android Studio
- افتح SDK Manager
- ثبت Android SDK Platform 33
- ثبت Build Tools 33.0.0

---

## 🎯 الخلاصة

**لبناء APK تحتاج:**
1. ✅ Java JDK 17+
2. ✅ Android SDK (يجي مع Android Studio)
3. ✅ المشروع مبني (npm run build)
4. ✅ تنفيذ gradlew assembleDebug

**الطريقة الأسهل:**
- ثبت Android Studio (يجي معاه كل حاجة!)
- افتح المشروع: `npm run android`
- Build → Build APK

---

## 📞 محتاج مساعدة؟

إذا واجهت مشكلة:
1. تأكد من تثبيت Java: `java -version`
2. جرب Android Studio بدل Command Line
3. شوف الأخطاء في Terminal وابعثها

---

**بالتوفيق! 🚀**
