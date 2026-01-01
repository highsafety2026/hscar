# 📱 دليل تشغيل التطبيق على الموبايل

## الطريقة 1️⃣: تثبيت APK مباشرة على الهاتف (الأسهل)

### الخطوات:

#### 1. تثبيت Java
قبل كل شيء، تحتاج Java للبناء:
- حمل JDK 17 من: https://www.oracle.com/java/technologies/downloads/#jdk17-windows
- أو استخدم: `winget install Microsoft.OpenJDK.17`

#### 2. بناء APK
```bash
cd client
npm run build
npx cap sync android
cd android
./gradlew assembleDebug
```

#### 3. مكان ملف APK
بعد البناء، الملف موجود في:
```
client/android/app/build/outputs/apk/debug/app-debug.apk
```

#### 4. نقل الملف للموبايل
- انسخ الملف `app-debug.apk` 
- انقله لهاتفك عن طريق USB أو Google Drive أو WhatsApp
- افتح الملف على الهاتف
- اضغط "Install" (قد تحتاج تفعيل "Unknown Sources" في الإعدادات)

---

## الطريقة 2️⃣: استخدام Android Studio (الطريقة الأسهل والأسرع! ⭐)

### الخطوات بالتفصيل:

#### 📥 الخطوة 1: تحميل وتثبيت Android Studio

1. **التحميل**:
   - روح على: https://developer.android.com/studio
   - اضغط على "Download Android Studio"
   - الملف حجمه حوالي 1 GB

2. **التثبيت**:
   - افتح الملف `android-studio-xxx.exe`
   - اضغط Next → Next → Install
   - ⏱️ هياخد حوالي 10-15 دقيقة
   - بعد ما يخلص، اضغط Finish

3. **التشغيل لأول مرة**:
   - هيفتح معاك Setup Wizard
   - اختر "Standard" installation
   - اختر Theme (فاتح أو غامق) - حسب ذوقك
   - اضغط Next واستنى التحميلات تخلص (Android SDK, Emulator, etc.)
   - ⏱️ ده كمان هياخد 10-20 دقيقة حسب النت

#### 🔧 الخطوة 2: فتح المشروع

**الطريقة الأولى (من Terminal):**
```bash
cd c:\Users\Dell\Videos\HS\client
npm run build
npx cap sync android
npm run android
```
ده هيفتح Android Studio تلقائياً بالمشروع!

**الطريقة الثانية (من Android Studio نفسه):**
1. افتح Android Studio
2. اختر "Open"
3. روح على: `c:\Users\Dell\Videos\HS\client\android`
4. اختر المجلد ده واضغط OK
5. استنى شوية لحد ما يعمل Gradle Sync (أول مرة هياخد وقت)

#### 📱 الخطوة 3: تجهيز الموبايل للتطوير

**في موبايلك (Android):**

1. **تفعيل خيارات المطورين:**
   - افتح الإعدادات Settings
   - روح على "حول الهاتف" About Phone
   - دور على "رقم الإصدار" Build Number أو "رقم البناء"
   - اضغط عليه **7 مرات متتالية** 
   - هيظهرلك "أنت الآن مطور!" 🎉

2. **تفعيل USB Debugging:**
   - ارجع للإعدادات الرئيسية
   - هتلاقي خيار جديد: "خيارات المطورين" Developer Options
   - افتحه
   - فعّل "تصحيح USB" USB Debugging
   - اضغط OK على رسالة التحذير

3. **توصيل الموبايل بالكمبيوتر:**
   - وصل موبايلك بكابل USB **أصلي** (مهم!)
   - على الموبايل هيظهرلك إشعار:
     - اختار "نقل الملفات" File Transfer أو "MTP"
     - **مش** Charging only
   - هيظهرلك رسالة "Allow USB debugging?"
     - ✅ فعّل "Always allow from this computer"
     - اضغط OK

4. **التأكد من التوصيل:**
   ```bash
   # في Terminal:
   cd c:\Users\Dell\Videos\HS\client\android
   adb devices
   ```
   لو شفت اسم جهازك ظاهر، يبقى تمام! ✅

#### ▶️ الخطوة 4: تشغيل التطبيق على موبايلك

**في Android Studio:**

1. **اختيار الجهاز:**
   - فوق في الشريط، هتلاقي قائمة منسدلة
   - هتلاقي فيها اسم موبايلك (مثلاً: "Samsung Galaxy A52")
   - لو مش ظاهر:
     - اضغط على القائمة
     - اختر "Troubleshoot Device Connections"
     - اتبع الخطوات

2. **تشغيل التطبيق:**
   - اضغط على زر ▶️ الأخضر (Run)
   - أو اضغط Shift+F10
   - استنى شوية... 🕐

3. **أول مرة هياخد وقت:**
   - هيعمل Build للمشروع (2-5 دقائق أول مرة)
   - هيحمل المكتبات اللازمة
   - هينقل الملفات للموبايل
   - هيثبت التطبيق تلقائي

4. **النتيجة:**
   - التطبيق هيفتح على موبايلك تلقائياً! 🎉
   - هتلاقيه كمان في App Drawer
   - تقدر تستخدمه عادي زي أي تطبيق

#### 🔄 الخطوات القادمة (لو غيرت في الكود):

```bash
cd c:\Users\Dell\Videos\HS\client
npm run build
npx cap sync android
```
بعدين ارجع لـ Android Studio واضغط ▶️ Run تاني

---

### 💡 نصائح مهمة:

✅ **أول مرة هياخد وقت** - الـ Build ممكن ياخد 5-10 دقائق
✅ **استخدم كابل USB أصلي** - الكوابل الرخيصة ممكن متشتغلش
✅ **خلي النت شغال** - أول مرة بينزل مكتبات كتير
✅ **لو الموبايل مش ظاهر** - جرب كابل تاني أو منفذ USB تاني
✅ **خلي الموبايل unlocked** - لو الشاشة مقفولة ممكن متنفعش

---

### ❌ مشاكل شائعة وحلولها:

#### مشكلة: "Device not found"
**الحل:**
```bash
adb kill-server
adb start-server
adb devices
```

#### مشكلة: "Gradle sync failed"
**الحل:**
- File → Invalidate Caches → Invalidate and Restart
- انتظر وجرب تاني

#### مشكلة: "SDK not found"
**الحل:**
- Tools → SDK Manager
- تأكد إن Android SDK Platform 33 مثبت
- تأكد إن Build Tools 33.0.0 مثبت

#### مشكلة: التطبيق بيعمل Crash
**الحل:**
- افتح Logcat في Android Studio (تحت)
- شوف الـ Error Message
- أو شغل من Terminal: `adb logcat`

---

### 🚀 الخطوة الإضافية: عمل Emulator (اختياري)

لو مش عايز تستخدم موبايلك، تقدر تعمل **محاكي**:

1. في Android Studio → Tools → Device Manager
2. اضغط "Create Device"
3. اختر جهاز (مثلاً Pixel 5)
4. اختر System Image (مثلاً Android 13 - API 33)
5. اضغط Next → Finish
6. اضغط ▶️ لتشغيل المحاكي
7. بعدين اختاره من القائمة واضغط Run

⚠️ المحاكي بطيء شوية مقارنة بالموبايل الحقيقي!

---

## الطريقة 3️⃣: بناء APK Release (للتوزيع)

### لبناء نسخة Release محترفة:

#### 1. إنشاء Keystore
```bash
cd client/android/app
keytool -genkey -v -keystore hs-release-key.keystore -alias hs-key -keyalg RSA -keysize 2048 -validity 10000
```
احفظ الباسوورد في مكان آمن!

#### 2. إضافة معلومات الـ Signing
أنشئ ملف `android/keystore.properties`:
```properties
storePassword=كلمة_السر_بتاعتك
keyPassword=كلمة_السر_بتاعتك
keyAlias=hs-key
storeFile=app/hs-release-key.keystore
```

#### 3. تعديل build.gradle
أضف في `android/app/build.gradle` قبل `android {`:
```groovy
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('keystore.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

وداخل `android { buildTypes { release {` أضف:
```groovy
signingConfig signingConfigs.release
```

وأضف قبل `buildTypes`:
```groovy
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
    }
}
```

#### 4. بناء APK Release
```bash
cd client/android
./gradlew assembleRelease
```

الملف في: `android/app/build/outputs/apk/release/app-release.apk`

---

## 🚀 اختصارات سريعة

### بناء APK بسرعة (بعد تثبيت Java):
```bash
cd client
npm run build
npx cap sync android
cd android
./gradlew assembleDebug
```

### الملف موجود في:
```
client/android/app/build/outputs/apk/debug/app-debug.apk
```

### نقله للموبايل:
- USB: انسخه والصقه في Downloads
- Cloud: ارفعه على Google Drive
- WhatsApp: ابعته لنفسك

### تثبيت على الهاتف:
1. افتح الملف من File Manager
2. اضغط Install
3. إذا طلع تحذير: Settings ← Install unknown apps ← Chrome/Files ← فعّل "Allow"

---

## ⚠️ ملاحظات مهمة

✅ **APK Debug**: للتجربة السريعة (حجم أكبر، بدون توقيع)
✅ **APK Release**: للتوزيع (حجم أصغر، موقّع، أسرع)
✅ **AAB Bundle**: للرفع على Google Play Store فقط

❌ **لا ترفع keystore على Git** - احفظه في مكان آمن!

---

## 🆘 مشاكل شائعة

### "JAVA_HOME is not set"
- ثبت Java: `winget install Microsoft.OpenJDK.17`
- أو حمل من: https://jdk.java.net/17/

### "App not installed"
- احذف التطبيق القديم أولاً
- أو غير الـ `versionCode` في build.gradle

### "USB Debugging not working"
- جرب كابل USB مختلف
- فعّل "File Transfer" بدل "Charging only"
- ثبت USB drivers لهاتفك

---

**بالتوفيق! 🚀📱**
