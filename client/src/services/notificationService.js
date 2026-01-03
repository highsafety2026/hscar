import { Capacitor } from '@capacitor/core';

class NotificationService {
  constructor() {
    this.isInitialized = false;
    this.isNative = false;
  }

  async initialize() {
    // تعطيل الإشعارات مؤقتاً لمنع تعطل التطبيق
    // يمكن تفعيلها لاحقاً بعد إعداد Firebase بشكل صحيح
    if (this.isInitialized) return { success: true };
    
    try {
      this.isNative = Capacitor.isNativePlatform();
      this.isInitialized = true;
      
      // عدم طلب أذونات الإشعارات تلقائياً
      // سيتم طلبها يدوياً من إعدادات المستخدم عند الحاجة
      
      return { success: true, message: 'Notifications disabled for stability' };
    } catch (error) {
      console.log('Notification service initialization skipped:', error);
      return { success: false };
    }
  }

  setupListeners() {
    // تم تعطيل المستمعات مؤقتاً
    // سيتم تفعيلها بعد إعداد Firebase و FCM بشكل صحيح
    console.log('Push notification listeners disabled');
  }

  async sendTokenToServer(token) {
    try {
      const user = JSON.parse(localStorage.getItem('hs_user') || '{}');
      if (user.phone) {
        await fetch('/api/notifications/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: user.phone,
            token: token,
            platform: Capacitor.getPlatform()
          })
        });
      }
    } catch (error) {
      console.error('Error sending token to server:', error);
    }
  }

  showLocalNotification(notification) {
    // Display notification using browser API or custom UI
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title || 'HS Car Report', {
        body: notification.body,
        icon: '/images/icon.png',
        badge: '/images/badge.png'
      });
    }
  }

  handleNotificationTap(notification) {
    // Navigate to appropriate screen based on notification data
    const data = notification.notification.data;
    
    if (data.type === 'appointment') {
      window.location.href = '/dashboard';
    } else if (data.type === 'reward') {
      window.location.href = '/rewards';
    } else if (data.type === 'maintenance') {
      window.location.href = '/dashboard';
    }
  }

  async sendNotification(phone, title, body, data = {}) {
    try {
      await fetch('/api/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          title,
          body,
          data
        })
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  // Schedule maintenance reminder
  async scheduleMaintenanceReminder(phone, carDetails, maintenanceDate) {
    const daysUntil = Math.ceil((new Date(maintenanceDate) - new Date()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil <= 7 && daysUntil > 0) {
      await this.sendNotification(
        phone,
        '🔧 تذكير بموعد الصيانة',
        `موعد صيانة ${carDetails.model} بعد ${daysUntil} أيام`,
        { type: 'maintenance', date: maintenanceDate }
      );
    }
  }

  // Send booking confirmation
  async sendBookingConfirmation(phone, bookingDetails) {
    await this.sendNotification(
      phone,
      '✅ تم تأكيد الحجز',
      `تم تأكيد حجزك ليوم ${bookingDetails.date} - ${bookingDetails.service}`,
      { type: 'appointment', id: bookingDetails.id }
    );
  }

  // Send points earned notification
  async sendPointsEarned(phone, points, reason) {
    await this.sendNotification(
      phone,
      '🎁 حصلت على نقاط جديدة!',
      `تم إضافة ${points} نقطة - ${reason}`,
      { type: 'reward', points }
    );
  }

  // Send promotional notification
  async sendPromotion(phone, promotion) {
    await this.sendNotification(
      phone,
      '🎉 عرض خاص لك!',
      promotion.message,
      { type: 'promotion', code: promotion.code }
    );
  }
}

export default new NotificationService();
