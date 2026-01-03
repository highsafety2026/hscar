// Admin API - مبسطة وخفيفة
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://hscar-backend.onrender.com' 
  : 'http://localhost:3001'

export const adminApi = {
  async login(username, password) {
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Login failed')
      return await res.json()
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  async getBookings(token) {
    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Failed to fetch bookings')
      return await res.json()
    } catch (error) {
      console.error('Get bookings error:', error)
      return []
    }
  },

  async getReports(token) {
    try {
      const res = await fetch(`${API_URL}/api/reports`, {
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Failed to fetch reports')
      return await res.json()
    } catch (error) {
      console.error('Get reports error:', error)
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
      if (!res.ok) {
        const errorText = await res.text()
        console.error('Upload failed:', errorText)
        throw new Error('Upload failed')
      }
      return await res.json()
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  },

  async deleteReport(id, token) {
    try {
      const res = await fetch(`${API_URL}/api/reports/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Delete failed')
      return await res.json()
    } catch (error) {
      console.error('Delete error:', error)
      throw error
    }
  },

  async updateBookingStatus(id, status, token) {
    try {
      const res = await fetch(`${API_URL}/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Update failed')
      return await res.json()
    } catch (error) {
      console.error('Update status error:', error)
      throw error
    }
  },

  async getOffers(token) {
    try {
      const res = await fetch(`${API_URL}/api/offers/all`, {
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Failed to fetch offers')
      return await res.json()
    } catch (error) {
      console.error('Get offers error:', error)
      return []
    }
  },

  async createOffer(offerData, token) {
    try {
      const res = await fetch(`${API_URL}/api/offers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(offerData),
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Create offer failed')
      return await res.json()
    } catch (error) {
      console.error('Create offer error:', error)
      throw error
    }
  },

  async deleteOffer(id, token) {
    try {
      const res = await fetch(`${API_URL}/api/offers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Delete offer failed')
      return await res.json()
    } catch (error) {
      console.error('Delete offer error:', error)
      throw error
    }
  },

  async sendNotification(notification, token) {
    try {
      const res = await fetch(`${API_URL}/api/notifications/broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: notification.title, body: notification.message }),
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Send notification failed')
      return await res.json()
    } catch (error) {
      console.error('Send notification error:', error)
      throw error
    }
  },

  async getDashboardStats(token) {
    try {
      const res = await fetch(`${API_URL}/api/admin/dashboard-stats`, {
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Failed to fetch stats')
      return await res.json()
    } catch (error) {
      console.error('Get stats error:', error)
      return null
    }
  },

  async getCustomers(token) {
    try {
      const res = await fetch(`${API_URL}/api/admin/customers`, {
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Failed to fetch customers')
      return await res.json()
    } catch (error) {
      console.error('Get customers error:', error)
      return []
    }
  },

  async getPointsConfig(token) {
    try {
      const res = await fetch(`${API_URL}/api/admin/points-config`, {
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Failed to fetch points config')
      return await res.json()
    } catch (error) {
      console.error('Get points config error:', error)
      return null
    }
  },

  async updatePointsConfig(config, token) {
    try {
      const res = await fetch(`${API_URL}/api/admin/points-config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(config),
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Update points config failed')
      return await res.json()
    } catch (error) {
      console.error('Update points config error:', error)
      throw error
    }
  },

  async redeemPoints(data, token) {
    try {
      const res = await fetch(`${API_URL}/api/admin/redeem-points`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Redeem points failed')
      return await res.json()
    } catch (error) {
      console.error('Redeem points error:', error)
      throw error
    }
  },

  async getRatings(token) {
    try {
      const res = await fetch(`${API_URL}/api/ratings`, {
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Failed to fetch ratings')
      return await res.json()
    } catch (error) {
      console.error('Get ratings error:', error)
      return { ratings: [], stats: { count: 0, average: 0 } }
    }
  },

  async deleteRating(id, token) {
    try {
      const res = await fetch(`${API_URL}/api/ratings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(10000)
      })
      if (!res.ok) throw new Error('Delete failed')
      return await res.json()
    } catch (error) {
      console.error('Delete rating error:', error)
      throw error
    }
  }
}
