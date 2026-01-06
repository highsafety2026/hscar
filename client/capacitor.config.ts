import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hs.carreport',
  appName: 'HS Car Report',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: ['*']
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a202c',
      showSpinner: false,
      androidSpinnerStyle: 'small',
      iosSpinnerStyle: 'small'
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true
    },
    // تعطيل الإشعارات مؤقتاً لتجنب المشاكل
    PushNotifications: {
      presentationOptions: []
    }
  },
  // تحسين الأداء والاستقرار
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      releaseType: 'APK'
    }
  }
};

export default config;
