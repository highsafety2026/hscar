// API Configuration
// Use production URL if available, otherwise use local IP for mobile testing
const API_URL = import.meta.env.VITE_API_URL || (
  typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? window.location.origin
    : 'http://localhost:3001'
)

export const api = {
  // Booking APIs
  async fetchBookedSlots(date) {
    const res = await fetch(`${API_URL}/api/slots?date=${date}`)
    return res.json()
  },

  async createBooking(bookingData) {
    const res = await fetch(`${API_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    })
    return res.json()
  },

  async getBookings(token) {
    const res = await fetch(`${API_URL}/api/bookings`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.json()
  },

  // Payment APIs
  async createCheckoutSession(sessionData) {
    const res = await fetch(`${API_URL}/api/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData)
    })
    return res.json()
  },

  async verifyPayment(sessionId) {
    const res = await fetch(`${API_URL}/api/verify-payment?session_id=${sessionId}`)
    return res.json()
  },

  // Admin APIs
  async adminLogin(credentials) {
    const res = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    return res.json()
  },

  async adminLogout(token) {
    const res = await fetch(`${API_URL}/api/admin/logout`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.json()
  },

  // Report APIs
  async findReportByCode(code) {
    const res = await fetch(`${API_URL}/api/reports/find-by-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
    return res.json()
  },

  async getReports(token) {
    const res = await fetch(`${API_URL}/api/reports`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.json()
  },

  async uploadReport(formData, token) {
    const res = await fetch(`${API_URL}/api/reports`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    })
    return res.json()
  },

  async deleteReport(reportId, token) {
    const res = await fetch(`${API_URL}/api/reports/${reportId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.json()
  },

  // Shell API
  async executeShellCommand(command, token) {
    const res = await fetch(`${API_URL}/api/admin/shell`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ command })
    })
    return res.json()
  },

  // Chat API
  async analyzePDF(formData, token) {
    const res = await fetch(`${API_URL}/api/chat/analyze-pdf`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    })
    return res.json()
  }
}
