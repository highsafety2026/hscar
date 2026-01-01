# تطبيق HS Car Report للموبايل 📱

تم تحويل موقع HS Car Report إلى تطبيق موبايل يعمل على Android و iOS باستخدام Capacitor.

## 📋 المتطلبات

### لتطوير تطبيق Android:
- **Android Studio** (آخر إصدار)
- **Java JDK 17** أو أعلى
- **Android SDK** (API Level 33 أو أعلى)
- **Gradle** (يأتي مع Android Studio)

### لتطوير تطبيق iOS:
- **macOS** (مطلوب)
- **Xcode 14** أو أعلى
- **CocoaPods** - قم بتثبيته عبر: `sudo gem install cocoapods`
- **Apple Developer Account** (للنشر على App Store)

### عام:
- **Node.js** (الإصدار 16 أو أعلى)
- **npm** أو **yarn**

---

## 🚀 البداية السريعة

### 1. تثبيت Dependencies
```bash
cd client
npm install
```

### 2. بناء المشروع
```bash
npm run build
```

### 3. مزامنة مع المنصات
```bash
npm run sync
```

---

## 📱 تشغيل التطبيق

### على Android:

#### الطريقة 1: فتح Android Studio
```bash
npm run android
```
هذا الأمر سيفتح Android Studio. من هناك:
1. انتظر حتى يتم تحميل المشروع
2. اختر جهاز (Emulator أو جهاز حقيقي)
3. اضغط على زر "Run" (▶️)

#### الطريقة 2: من Command Line
```bash
cd android
./gradlew assembleDebug
```
سيتم إنشاء ملف APK في: `android/app/build/outputs/apk/debug/app-debug.apk`

### على iOS:

```bash
npm run ios
```
هذا سيفتح Xcode. من هناك:
1. حدد Team في Signing & Capabilities
2. اختر Simulator أو جهاز حقيقي
3. اضغط على زر "Run" (▶️)

---

## 📦 بناء نسخة Production

### Android (لرفعها على Google Play):

1. **إنشاء Keystore** (إذا لم يكن لديك):
```bash
cd android/app
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. **تعديل gradle.properties**:
أضف هذه السطور في `android/gradle.properties`:
```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

3. **تعديل build.gradle**:
أضف في `android/app/build.gradle` داخل `android`:
```groovy
signingConfigs {
    release {
        storeFile file(MYAPP_RELEASE_STORE_FILE)
        storePassword MYAPP_RELEASE_STORE_PASSWORD
        keyAlias MYAPP_RELEASE_KEY_ALIAS
        keyPassword MYAPP_RELEASE_KEY_PASSWORD
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

4. **بناء APK/AAB**:
```bash
cd android
./gradlew bundleRelease  # لإنشاء AAB (مطلوب للـ Play Store)
# أو
./gradlew assembleRelease  # لإنشاء APK
```

الملفات ستكون في:
- **AAB**: `android/app/build/outputs/bundle/release/app-release.aab`
- **APK**: `android/app/build/outputs/apk/release/app-release.apk`

### iOS (لرفعها على App Store):

1. افتح Xcode:
```bash
npm run ios
```

2. في Xcode:
   - اذهب إلى **Product > Archive**
   - بعد انتهاء الأرشفة، اضغط **Distribute App**
   - اختر **App Store Connect**
   - اتبع الخطوات لرفع التطبيق

---

## 🎨 تخصيص الأيقونة و Splash Screen

تم إنشاء ملفات SVG أساسية في مجلد `resources/`:
- `icon.svg` - أيقونة التطبيق
- `splash.svg` - شاشة البداية

### لإنشاء جميع الأحجام المطلوبة تلقائياً:

1. قم بتثبيت أداة Cordova Res:
```bash
npm install -g cordova-res
```

2. قم بإنشاء الأيقونات:
```bash
cd client
cordova-res android --skip-config --copy
cordova-res ios --skip-config --copy
```

أو يمكنك استخدام أي أداة أخرى لإنشاء الأيقونات بالأحجام المختلفة.

---

## 🔄 تحديث التطبيق بعد تعديل الكود

بعد أي تعديل في كود React:

```bash
npm run sync        # لكل المنصات
# أو
npm run sync:android # فقط Android
npm run sync:ios     # فقط iOS
```

---

## 📝 معلومات التطبيق

- **App ID**: `com.hs.carreport`
- **App Name**: HS Car Report
- **Version**: 1.0.0
- **Version Code**: 1

لتغيير هذه المعلومات:
- عدّل `capacitor.config.ts` لتغيير App ID و App Name
- عدّل `android/app/build.gradle` لتغيير الإصدار على Android
- عدّل في Xcode لتغيير الإصدار على iOS

---

## 🔐 الصلاحيات المضافة

تم إضافة الصلاحيات التالية في AndroidManifest.xml:
- ✅ الإنترنت
- ✅ حالة الشبكة
- ✅ الكاميرا
- ✅ قراءة/كتابة الملفات
- ✅ الموقع الجغرافي

---

## 📚 Scripts المتاحة

```bash
npm run dev          # تشغيل Development Server
npm run build        # بناء المشروع
npm run sync         # مزامنة مع كل المنصات
npm run android      # فتح مشروع Android في Android Studio
npm run ios          # فتح مشروع iOS في Xcode
npm run sync:android # مزامنة مع Android فقط
npm run sync:ios     # مزامنة مع iOS فقط
```

---

## 🐛 حل المشاكل الشائعة

### المشكلة: "Command failed: capacitor sync"
**الحل**: تأكد من تشغيل `npm run build` أولاً.

### المشكلة: Android Studio لا يتعرف على المشروع
**الحل**: 
1. احذف مجلد `android`
2. شغّل `npx cap add android`
3. شغّل `npm run sync:android`

### المشكلة: Xcode يعطي أخطاء Signing
**الحل**: 
1. اذهب إلى Signing & Capabilities
2. حدد Team الخاص بك
3. أو اختر "Automatically manage signing"

### المشكلة: التطبيق يظهر شاشة بيضاء
**الحل**:
1. تأكد من تشغيل `npm run build` قبل `npm run sync`
2. تحقق من أن مجلد `dist` موجود وبه ملفات
3. تحقق من `capacitor.config.ts` أن `webDir: 'dist'`

---

## 📤 رفع التطبيق على المتاجر

### Google Play Store:

1. أنشئ حساب Google Play Developer (رسوم لمرة واحدة: $25)
2. ارفع ملف AAB من `android/app/build/outputs/bundle/release/app-release.aab`
3. املأ معلومات التطبيق (الوصف، الصور، إلخ)
4. أرسل للمراجعة

### Apple App Store:

1. سجّل في Apple Developer Program (99$/سنة)
2. استخدم Xcode لرفع التطبيق
3. اذهب إلى App Store Connect
4. املأ معلومات التطبيق
5. أرسل للمراجعة

---

## 📞 الدعم

للمزيد من المعلومات:
- **Capacitor Docs**: https://capacitorjs.com/docs
- **Android Studio**: https://developer.android.com/studio
- **Xcode**: https://developer.apple.com/xcode/

---

## ✅ الخطوات التالية المقترحة

1. **تخصيص الأيقونة**: عدّل `resources/icon.svg` وأنشئ الأحجام المختلفة
2. **إضافة Push Notifications**: باستخدام Firebase Cloud Messaging
3. **إضافة In-App Purchases**: إذا كنت تريد مدفوعات داخل التطبيق
4. **تحسين الأداء**: إضافة caching و offline mode
5. **Analytics**: إضافة Google Analytics أو Firebase Analytics

---

**ملاحظة مهمة**: 
- لرفع التطبيق على Google Play، يجب استخدام ملف **AAB** (Android App Bundle) وليس APK
- تأكد من اختبار التطبيق جيداً على أجهزة مختلفة قبل النشر
- احتفظ بنسخة من keystore في مكان آمن - فقدانها يعني عدم القدرة على تحديث التطبيق!

**حظاً موفقاً في نشر تطبيقك! 🚀**
