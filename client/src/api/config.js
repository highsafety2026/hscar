// API Configuration
// Production API URL on Render
const API_URL = 'https://hscar-backend.onrender.com'

export const api = {
  // Booking APIs
  async fetchBookedSlots(date) {
    try {
      const res = await fetch(`${API_URL}/api/slots?date=${date}`, {
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Network error')
      return res.json()
    } catch (error) {
      console.error('fetchBookedSlots error:', error)
      return []
    }
  },

  async createBooking(bookingData) {
    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Network error')
      return res.json()
    } catch (error) {
      console.error('createBooking error:', error)
      return { error: 'فشل الاتصال بالسيرفر' }
    }
  },

  async getBookings(token) {
    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Network error')
      return res.json()
    } catch (error) {
      console.error('getBookings error:', error)
      return []
    }
  },

  // Payment APIs
  async createCheckoutSession(sessionData) {
    try {
      const res = await fetch(`${API_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData),
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Network error')
      return res.json()
    } catch (error) {
      console.error('createCheckoutSession error:', error)
      return { error: 'فشل الاتصال بالسيرفر' }
    }
  },

  async verifyPayment(sessionId) {
    try {
      const res = await fetch(`${API_URL}/api/verify-payment?session_id=${sessionId}`, {
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Network error')
      return res.json()
    } catch (error) {
      console.error('verifyPayment error:', error)
      return { error: 'فشل التحقق من الدفع' }
    }
  },

  // Admin APIs
  async adminLogin(credentials) {
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Network error')
      return res.json()
    } catch (error) {
      console.error('adminLogin error:', error)
      return { error: 'فشل الاتصال بالسيرفر' }
    }
  },

  async adminLogout(token) {
    try {
      const res = await fetch(`${API_URL}/api/admin/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Network error')
      return res.json()
    } catch (error) {
      console.error('adminLogout error:', error)
      return { success: true }
    }
  },

  // Report APIs
  async findReportByCode(code) {
    try {
      const res = await fetch(`${API_URL}/api/reports/find-by-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Network error')
      return res.json()
    } catch (error) {
      console.error('findReportByCode error:', error)
      return { error: 'فشل البحث عن التقرير' }
    }
  },

  async getReports(token) {
    try {
      const res = await fetch(`${API_URL}/api/reports`, {
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Network error')
      return res.json()
    } catch (error) {
      console.error('getReports error:', error)
      return []
    }
  },

  async uploadReport(formData, token) {
    try {
      const res = await fetch(`${API_URL}/api/reports`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
        signal: AbortSignal.timeout(30000)
      })
      if (!res.ok) throw new Error('Network error')
      return res.json()
    } catch (error) {
      console.error('uploadReport error:', error)
      return { error: 'فشل رفع التقرير' }
    }
  },

  async deleteReport(reportId, token) {
    try {
      const res = await fetch(`${API_URL}/api/reports/${reportId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Network error')
      return res.json()
    } catch (error) {
      console.error('deleteReport error:', error)
      return { error: 'فشل حذف التقرير' }
    }
  },

  // Offers API
  async getOffers() {
    try {
      // إضافة timestamp لمنع الـ cache ودائماً نجيب أحدث البيانات
      const timestamp = new Date().getTime()
      const res = await fetch(`${API_URL}/api/offers?_t=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Network error')
      const data = await res.json()
      return data.filter(offer => {
        if (!offer.valid_until) return true
        return new Date(offer.valid_until) >= new Date()
      })
    } catch (error) {
      console.error('getOffers error:', error)
      return []
    }
  },

  // User & Points APIs
  async loginUser(name, phone) {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Network error')
      return res.json()
    } catch (error) {
      console.error('loginUser error:', error)
      return { error: 'فشل تسجيل الدخول' }
    }
  },

  async getUserPoints(phone) {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, name: '' }),
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Network error')
      const data = await res.json()
      return data.points || 0
    } catch (error) {
      console.error('getUserPoints error:', error)
      return 0
    }
  },

// ...existing code...
// نهاية ملف config.js بعد آخر دالة صحيحة
