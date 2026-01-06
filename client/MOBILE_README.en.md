# HS Car Report Mobile App 📱

This is the mobile application version of HS Car Report website, built with Capacitor to work on Android and iOS.

## 🚀 Quick Start

### Install Dependencies
```bash
cd client
npm install
```

### Build and Sync
```bash
npm run build
npm run sync
```

### Run on Android
```bash
npm run android
```
This will open Android Studio. Select a device/emulator and click Run.

### Run on iOS
```bash
npm run ios
```
This will open Xcode. Select a device/simulator and click Run.

## 📦 Build for Production

### Android (Google Play Store)

1. **Generate Keystore**:
```bash
cd android/app
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configure Signing**: Edit `android/gradle.properties`

3. **Build AAB**:
```bash
cd android
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

### iOS (App Store)

1. Open Xcode: `npm run ios`
2. Go to **Product > Archive**
3. Distribute to App Store Connect

## 📱 App Info

- **App ID**: com.hs.carreport
- **App Name**: HS Car Report
- **Version**: 1.0.0

## 📚 Available Scripts

- `npm run build` - Build the web app
- `npm run sync` - Sync with all platforms
- `npm run android` - Open Android project
- `npm run ios` - Open iOS project
- `npm run sync:android` - Sync Android only
- `npm run sync:ios` - Sync iOS only

## 📖 Full Documentation

For detailed instructions in Arabic, see [MOBILE_APP_README.md](MOBILE_APP_README.md)

## 🔧 Requirements

- Node.js 16+
- Android Studio (for Android)
- Xcode 14+ (for iOS, macOS only)
- JDK 17+ (for Android)

---

Good luck with your app! 🚀
