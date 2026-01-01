import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Calendar, Upload, Trash2, Eye, CheckCircle, LogOut, Users, BarChart3, Clock, Phone, Car, Search, RefreshCw, MessageCircle, PhoneCall, Copy, PenTool } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { api } from '../api/config'

function AdminDashboard() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState('reports')
  const [bookings, setBookings] = useState([])
  const [reports, setReports] = useState([])
  const [offers, setOffers] = useState([])
  const [notification, setNotification] = useState({ title: '', message: '', target: 'all' })
  const [offerData, setOfferData] = useState({ 
    title_ar: '', 
    title_en: '', 
    description_ar: '', 
    description_en: '', 
    discount: '', 
    valid_until: '',
    image_url: '' 
  })
  const [uploadData, setUploadData] = useState({ customerName: '', code: '', file: null, images: [] })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
  })

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin')
      return
    }
    loadData()
  }, [navigate])

  const loadData = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const [bookingsData, reportsData, offersData] = await Promise.all([
        api.getBookings(token),
        api.getReports(token),
        fetch('/api/offers/all', { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()).catch(() => [])
      ])
      
      setBookings(bookingsData)
      setReports(reportsData)
      setOffers(offersData)
    } catch (error) {
      console.error('Error loading data:', error)
      if (error.message.includes('401')) {
        localStorage.removeItem('adminToken')
        navigate('/admin')
      }
    }
  }

  const handleUploadReport = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('customerName', uploadData.customerName)
    if (uploadData.code) formData.append('code', uploadData.code.toUpperCase())
    if (uploadData.file) formData.append('file', uploadData.file)
    
    if (uploadData.images && uploadData.images.length > 0) {
      for (let i = 0; i < uploadData.images.length; i++) {
        formData.append('images', uploadData.images[i])
      }
    }

    await api.uploadReport(formData, localStorage.getItem('adminToken'))
    setUploadData({ customerName: '', code: '', file: null, images: [] })
    loadData()
    setLoading(false)
  }

  const deleteReport = async (id) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا التقرير؟' : 'Are you sure you want to delete this report?')) {
      await api.deleteReport(id, localStorage.getItem('adminToken'))
      loadData()
    }
  }

  const updateBookingStatus = async (id, status) => {
    await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    loadData()
  }

  const deleteBooking = async (id) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا الحجز؟' : 'Are you sure you want to delete this booking?')) {
      await fetch(`/api/bookings/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      loadData()
    }
  }

  const logout = async () => {
    await api.adminLogout(localStorage.getItem('adminToken'))
    localStorage.removeItem('adminToken')
    navigate('/admin')
  }

  const handleCreateOffer = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = localStorage.getItem('adminToken')
      await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(offerData)
      })
      setOfferData({ title_ar: '', title_en: '', description_ar: '', description_en: '', discount: '', valid_until: '', image_url: '' })
      loadData()
      alert(language === 'ar' ? 'تم إضافة العرض بنجاح!' : 'Offer created successfully!')
    } catch (error) {
      console.error('Error creating offer:', error)
      alert(language === 'ar' ? 'فشل في إضافة العرض' : 'Failed to create offer')
    }
    setLoading(false)
  }

  const toggleOfferStatus = async (id, active) => {
    try {
      const token = localStorage.getItem('adminToken')
      await fetch(`/api/offers/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: active ? 0 : 1 })
      })
      loadData()
    } catch (error) {
      console.error('Error toggling offer:', error)
    }
  }

  const deleteOffer = async (id) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا العرض؟' : 'Are you sure you want to delete this offer?')) {
      try {
        const token = localStorage.getItem('adminToken')
        await fetch(`/api/offers/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        })
        loadData()
      } catch (error) {
        console.error('Error deleting offer:', error)
      }
    }
  }

  const sendNotification = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = localStorage.getItem('adminToken')
      
      if (notification.target === 'all') {
        // Send to all users
        await fetch('/api/notifications/broadcast', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: notification.title, body: notification.message })
        })
      } else {
        // Send to specific user
        await fetch('/api/notifications/send', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: notification.target, title: notification.title, body: notification.message })
        })
      }
      
      setNotification({ title: '', message: '', target: 'all' })
      alert(language === 'ar' ? 'تم إرسال الإشعار بنجاح!' : 'Notification sent successfully!')
    } catch (error) {
      console.error('Error sending notification:', error)
      alert(language === 'ar' ? 'فشل في إرسال الإشعار' : 'Failed to send notification')
    }
    setLoading(false)
  }

  const serviceTypes = {
    full: language === 'ar' ? 'الفحص الشامل' : 'Full Inspection',
    mechanical: language === 'ar' ? 'ميكانيكي وكمبيوتر' : 'Mechanical + Computer',
    misc: language === 'ar' ? 'فحوصات متنوعة' : 'Various Tests',
    basic: language === 'ar' ? 'فحص أساسي' : 'Basic Inspection'
  }

  const pendingBookings = bookings.filter(b => b.status === 'pending').length
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length

  const filteredBookings = bookings.filter(b => 
    b.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.phone?.includes(searchQuery) ||
    b.carModel?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredReports = reports.filter(r =>
    r.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.code?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="admin-page" style={{ background: '#f5f7fa', minHeight: '100vh' }}>
      <div className="admin-header" style={{
        background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
        padding: '20px 0',
        marginBottom: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
                {language === 'ar' ? 'لوحة التحكم' : 'Admin Dashboard'}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', margin: '5px 0 0', fontSize: '0.9rem' }}>
                {language === 'ar' ? 'مركز الأمان العالي للفحص الفني' : 'High Safety Inspection Center'}
              </p>
            </div>
            <button 
              onClick={logout} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <LogOut size={18} />
              {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4285F4, #5a9cf4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={24} color="white" />
            </div>
            <div>
              <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>
                {language === 'ar' ? 'التقارير' : 'Reports'}
              </p>
              <h3 style={{ margin: '5px 0 0', fontSize: '1.8rem', color: '#0B1F3A' }}>{reports.length}</h3>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #C89D2A, #d4a936)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={24} color="white" />
            </div>
            <div>
              <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>
                {language === 'ar' ? 'قيد الانتظار' : 'Pending'}
              </p>
              <h3 style={{ margin: '5px 0 0', fontSize: '1.8rem', color: '#0B1F3A' }}>{pendingBookings}</h3>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #34A853, #4ab862)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle size={24} color="white" />
            </div>
            <div>
              <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>
                {language === 'ar' ? 'مؤكد' : 'Confirmed'}
              </p>
              <h3 style={{ margin: '5px 0 0', fontSize: '1.8rem', color: '#0B1F3A' }}>{confirmedBookings}</h3>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users size={24} color="white" />
            </div>
            <div>
              <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>
                {language === 'ar' ? 'إجمالي الحجوزات' : 'Total Bookings'}
              </p>
              <h3 style={{ margin: '5px 0 0', fontSize: '1.8rem', color: '#0B1F3A' }}>{bookings.length}</h3>
            </div>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          marginBottom: '25px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setActiveTab('reports')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: activeTab === 'reports' ? '#0B1F3A' : 'white',
                color: activeTab === 'reports' ? 'white' : '#0B1F3A',
                border: activeTab === 'reports' ? 'none' : '2px solid #e0e0e0',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              <FileText size={18} />
              {language === 'ar' ? 'التقارير' : 'Reports'} ({reports.length})
            </button>
            <button 
              onClick={() => setActiveTab('bookings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: activeTab === 'bookings' ? '#0B1F3A' : 'white',
                color: activeTab === 'bookings' ? 'white' : '#0B1F3A',
                border: activeTab === 'bookings' ? 'none' : '2px solid #e0e0e0',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              <Calendar size={18} />
              {language === 'ar' ? 'الحجوزات' : 'Bookings'} ({bookings.length})
            </button>
            <button 
              onClick={() => setActiveTab('offers')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: activeTab === 'offers' ? '#0B1F3A' : 'white',
                color: activeTab === 'offers' ? 'white' : '#0B1F3A',
                border: activeTab === 'offers' ? 'none' : '2px solid #e0e0e0',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              <BarChart3 size={18} />
              {language === 'ar' ? 'العروض' : 'Offers'} ({offers.length})
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: activeTab === 'notifications' ? '#0B1F3A' : 'white',
                color: activeTab === 'notifications' ? 'white' : '#0B1F3A',
                border: activeTab === 'notifications' ? 'none' : '2px solid #e0e0e0',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              <MessageCircle size={18} />
              {language === 'ar' ? 'إشعارات' : 'Notifications'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
              <input
                type="text"
                placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '10px 12px 10px 40px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  width: '200px',
                  outline: 'none'
                }}
              />
            </div>
            <button 
              onClick={loadData}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                background: 'white',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
              title={language === 'ar' ? 'تحديث' : 'Refresh'}
            >
              <RefreshCw size={18} color="#666" />
            </button>
          </div>
        </div>

        {activeTab === 'reports' && (
          <div>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              marginBottom: '25px'
            }}>
              <h3 style={{ 
                margin: '0 0 20px', 
                color: '#0B1F3A',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Upload size={22} color="#C89D2A" />
                {language === 'ar' ? 'رفع تقرير جديد' : 'Upload New Report'}
              </h3>
              <form onSubmit={handleUploadReport}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                      {language === 'ar' ? 'اسم العميل' : 'Customer Name'} *
                    </label>
                    <input
                      type="text"
                      value={uploadData.customerName}
                      onChange={(e) => setUploadData({...uploadData, customerName: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'border-color 0.3s'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                      {language === 'ar' ? 'كود التقرير (اختياري)' : 'Report Code (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={uploadData.code}
                      onChange={(e) => setUploadData({...uploadData, code: e.target.value.toUpperCase()})}
                      placeholder={language === 'ar' ? 'مثال: ABC123' : 'Example: ABC123'}
                      maxLength="10"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        textTransform: 'uppercase',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                      {language === 'ar' ? 'ملف PDF' : 'PDF File'} *
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setUploadData({...uploadData, file: e.target.files[0]})}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px dashed #e0e0e0',
                        borderRadius: '10px',
                        fontSize: '0.9rem',
                        background: '#f9f9f9'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                      {language === 'ar' ? 'صور الفحص (حتى 10)' : 'Inspection Images (up to 10)'}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => setUploadData({...uploadData, images: Array.from(e.target.files)})}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px dashed #e0e0e0',
                        borderRadius: '10px',
                        fontSize: '0.9rem',
                        background: '#f9f9f9'
                      }}
                    />
                    {uploadData.images && uploadData.images.length > 0 && (
                      <p style={{ color: '#34A853', marginTop: '8px', fontSize: '0.85rem', fontWeight: '600' }}>
                        {language === 'ar' ? `تم اختيار ${uploadData.images.length} صورة` : `${uploadData.images.length} images selected`}
                      </p>
                    )}
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '25px',
                    padding: '14px 30px',
                    background: 'linear-gradient(135deg, #C89D2A, #d4a936)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  <Upload size={20} />
                  {loading ? (language === 'ar' ? 'جاري الرفع...' : 'Uploading...') : (language === 'ar' ? 'رفع التقرير' : 'Upload Report')}
                </button>
              </form>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '20px 25px', borderBottom: '1px solid #eee' }}>
                <h3 style={{ margin: 0, color: '#0B1F3A' }}>
                  {language === 'ar' ? 'التقارير المرفوعة' : 'Uploaded Reports'}
                </h3>
              </div>
              {filteredReports.length === 0 ? (
                <p style={{ padding: '30px', textAlign: 'center', color: '#888' }}>
                  {language === 'ar' ? 'لا توجد تقارير حالياً' : 'No reports yet'}
                </p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ padding: '15px 20px', textAlign: language === 'ar' ? 'right' : 'left', fontWeight: '600', color: '#666', fontSize: '0.9rem' }}>
                          {language === 'ar' ? 'الكود' : 'Code'}
                        </th>
                        <th style={{ padding: '15px 20px', textAlign: language === 'ar' ? 'right' : 'left', fontWeight: '600', color: '#666', fontSize: '0.9rem' }}>
                          {language === 'ar' ? 'اسم العميل' : 'Customer Name'}
                        </th>
                        <th style={{ padding: '15px 20px', textAlign: language === 'ar' ? 'right' : 'left', fontWeight: '600', color: '#666', fontSize: '0.9rem' }}>
                          {language === 'ar' ? 'التاريخ' : 'Date'}
                        </th>
                        <th style={{ padding: '15px 20px', textAlign: 'center', fontWeight: '600', color: '#666', fontSize: '0.9rem' }}>
                          {language === 'ar' ? 'إجراءات' : 'Actions'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.map(report => (
                        <tr key={report.id} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '15px 20px' }}>
                            <span style={{ 
                              fontWeight: 'bold', 
                              color: '#C89D2A',
                              fontSize: '1rem',
                              letterSpacing: '1px',
                              background: 'rgba(200, 157, 42, 0.1)',
                              padding: '5px 12px',
                              borderRadius: '6px'
                            }}>{report.code || '-'}</span>
                          </td>
                          <td style={{ padding: '15px 20px', fontWeight: '500', color: '#333' }}>{report.customerName}</td>
                          <td style={{ padding: '15px 20px', color: '#666', fontSize: '0.9rem' }}>
                            {new Date(report.createdAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                          </td>
                          <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                              <a 
                                href={`/uploads/${report.filename}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  padding: '8px 15px',
                                  background: '#4285F4',
                                  color: 'white',
                                  textDecoration: 'none',
                                  borderRadius: '6px',
                                  fontSize: '0.85rem',
                                  fontWeight: '500'
                                }}
                              >
                                <Eye size={16} />
                                {language === 'ar' ? 'عرض' : 'View'}
                              </a>
                              <button 
                                onClick={() => deleteReport(report.id)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  padding: '8px 15px',
                                  background: '#EA4335',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '6px',
                                  fontSize: '0.85rem',
                                  fontWeight: '500',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 size={16} />
                                {language === 'ar' ? 'حذف' : 'Delete'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '20px 25px', borderBottom: '1px solid #eee' }}>
              <h3 style={{ margin: 0, color: '#0B1F3A' }}>
                {language === 'ar' ? 'إدارة الحجوزات' : 'Manage Bookings'}
              </h3>
            </div>
            {filteredBookings.length === 0 ? (
              <p style={{ padding: '30px', textAlign: 'center', color: '#888' }}>
                {language === 'ar' ? 'لا توجد حجوزات حالياً' : 'No bookings yet'}
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ padding: '15px 10px', textAlign: language === 'ar' ? 'right' : 'left', fontWeight: '600', color: '#666', fontSize: '0.85rem' }}>
                        {language === 'ar' ? 'كود الحجز' : 'Booking Code'}
                      </th>
                      <th style={{ padding: '15px 10px', textAlign: language === 'ar' ? 'right' : 'left', fontWeight: '600', color: '#666', fontSize: '0.85rem' }}>
                        {language === 'ar' ? 'الاسم' : 'Name'}
                      </th>
                      <th style={{ padding: '15px 10px', textAlign: language === 'ar' ? 'right' : 'left', fontWeight: '600', color: '#666', fontSize: '0.85rem' }}>
                        {language === 'ar' ? 'الهاتف' : 'Phone'}
                      </th>
                      <th style={{ padding: '15px 10px', textAlign: language === 'ar' ? 'right' : 'left', fontWeight: '600', color: '#666', fontSize: '0.85rem' }}>
                        {language === 'ar' ? 'التواصل' : 'Contact'}
                      </th>
                      <th style={{ padding: '15px 10px', textAlign: language === 'ar' ? 'right' : 'left', fontWeight: '600', color: '#666', fontSize: '0.85rem' }}>
                        {language === 'ar' ? 'السيارة' : 'Car'}
                      </th>
                      <th style={{ padding: '15px 10px', textAlign: language === 'ar' ? 'right' : 'left', fontWeight: '600', color: '#666', fontSize: '0.85rem' }}>
                        {language === 'ar' ? 'الخدمة' : 'Service'}
                      </th>
                      <th style={{ padding: '15px 10px', textAlign: language === 'ar' ? 'right' : 'left', fontWeight: '600', color: '#666', fontSize: '0.85rem' }}>
                        {language === 'ar' ? 'التاريخ' : 'Date'}
                      </th>
                      <th style={{ padding: '15px 10px', textAlign: 'center', fontWeight: '600', color: '#666', fontSize: '0.85rem' }}>
                        {language === 'ar' ? 'الحالة' : 'Status'}
                      </th>
                      <th style={{ padding: '15px 10px', textAlign: 'center', fontWeight: '600', color: '#666', fontSize: '0.85rem' }}>
                        {language === 'ar' ? 'الدفع' : 'Payment'}
                      </th>
                      <th style={{ padding: '15px 10px', textAlign: 'center', fontWeight: '600', color: '#666', fontSize: '0.85rem' }}>
                        {language === 'ar' ? 'التوقيع' : 'Signature'}
                      </th>
                      <th style={{ padding: '15px 10px', textAlign: 'center', fontWeight: '600', color: '#666', fontSize: '0.85rem' }}>
                        {language === 'ar' ? 'إجراءات' : 'Actions'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map(booking => (
                      <tr key={booking.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 10px' }}>
                          <div 
                            style={{ 
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
                              color: '#C89D2A',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              fontFamily: 'monospace',
                              fontWeight: '700',
                              fontSize: '0.85rem',
                              letterSpacing: '0.5px',
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              navigator.clipboard.writeText(booking.bookingId || `HS-${booking.id.substring(0,8).toUpperCase()}`)
                              alert(language === 'ar' ? 'تم نسخ الكود!' : 'Code copied!')
                            }}
                            title={language === 'ar' ? 'انقر للنسخ' : 'Click to copy'}
                          >
                            <Copy size={12} />
                            {booking.bookingId || `HS-${booking.id.substring(0,8).toUpperCase()}`}
                          </div>
                        </td>
                        <td style={{ padding: '12px 10px', fontWeight: '500', color: '#333' }}>{booking.name}</td>
                        <td style={{ padding: '12px 10px', color: '#666' }}>
                          <a href={`tel:${booking.phone}`} style={{ color: '#4285F4', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Phone size={14} />
                            {booking.phone}
                          </a>
                        </td>
                        <td style={{ padding: '12px 10px' }}>
                          {booking.contactMethod === 'whatsapp' && (
                            <span style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '4px', 
                              background: 'rgba(37, 211, 102, 0.15)', 
                              color: '#25D366', 
                              padding: '5px 10px', 
                              borderRadius: '15px', 
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}>
                              <MessageCircle size={14} />
                              {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                            </span>
                          )}
                          {booking.contactMethod === 'call' && (
                            <span style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '4px', 
                              background: 'rgba(66, 133, 244, 0.15)', 
                              color: '#4285F4', 
                              padding: '5px 10px', 
                              borderRadius: '15px', 
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}>
                              <PhoneCall size={14} />
                              {language === 'ar' ? 'اتصال' : 'Call'}
                            </span>
                          )}
                          {booking.contactMethod === 'both' && (
                            <span style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '4px', 
                              background: 'rgba(200, 157, 42, 0.15)', 
                              color: '#C89D2A', 
                              padding: '5px 10px', 
                              borderRadius: '15px', 
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}>
                              <Phone size={14} />
                              {language === 'ar' ? 'الاثنين' : 'Both'}
                            </span>
                          )}
                          {!booking.contactMethod && (
                            <span style={{ color: '#999', fontSize: '0.8rem' }}>-</span>
                          )}
                        </td>
                        <td style={{ padding: '12px 10px', color: '#666' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Car size={14} color="#888" />
                            {booking.carBrand || ''} {booking.carModel} - {booking.carYear}
                          </div>
                        </td>
                        <td style={{ padding: '12px 10px', color: '#333', fontSize: '0.85rem' }}>{serviceTypes[booking.serviceType]}</td>
                        <td style={{ padding: '12px 10px', color: '#666', fontSize: '0.85rem' }}>
                          {booking.preferredDate}
                          {booking.preferredTime && <span style={{ display: 'block', fontSize: '0.8rem', color: '#888' }}>{booking.preferredTime}</span>}
                        </td>
                        <td style={{ padding: '15px', textAlign: 'center' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            background: booking.status === 'pending' ? 'rgba(200, 157, 42, 0.15)' : 'rgba(52, 168, 83, 0.15)',
                            color: booking.status === 'pending' ? '#C89D2A' : '#34A853'
                          }}>
                            {booking.status === 'pending' ? <Clock size={14} /> : <CheckCircle size={14} />}
                            {booking.status === 'pending' ? (language === 'ar' ? 'قيد الانتظار' : 'Pending') : (language === 'ar' ? 'مؤكد' : 'Confirmed')}
                          </span>
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            background: booking.paymentMethod === 'electronic' 
                              ? 'rgba(52, 168, 83, 0.15)' 
                              : booking.paymentMethod === 'cash' 
                                ? 'rgba(255, 152, 0, 0.15)' 
                                : 'rgba(158, 158, 158, 0.15)',
                            color: booking.paymentMethod === 'electronic' 
                              ? '#34A853' 
                              : booking.paymentMethod === 'cash' 
                                ? '#FF9800' 
                                : '#9E9E9E'
                          }}>
                            {booking.paymentMethod === 'electronic' 
                              ? (language === 'ar' ? '💳 مدفوع إلكتروني' : '💳 Paid Online')
                              : booking.paymentMethod === 'cash' 
                                ? (language === 'ar' ? '💵 كاش عند الوصول' : '💵 Cash on Arrival')
                                : (language === 'ar' ? 'في الانتظار' : 'Pending')}
                          </span>
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                          {booking.signature ? (
                            <img 
                              src={booking.signature} 
                              alt={language === 'ar' ? 'توقيع العميل' : 'Customer Signature'}
                              style={{
                                maxWidth: '80px',
                                maxHeight: '40px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '6px',
                                background: 'white',
                                cursor: 'pointer'
                              }}
                              onClick={() => {
                                const win = window.open('', '_blank')
                                win.document.write(`<img src="${booking.signature}" style="max-width: 100%; border: 2px solid #C89D2A; border-radius: 10px; padding: 10px; background: white;" />`)
                              }}
                              title={language === 'ar' ? 'انقر للتكبير' : 'Click to enlarge'}
                            />
                          ) : (
                            <span style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '4px', 
                              color: '#999', 
                              fontSize: '0.8rem' 
                            }}>
                              <PenTool size={14} />
                              {language === 'ar' ? 'لا يوجد' : 'None'}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '15px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                            {booking.status === 'pending' && (
                              <button 
                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '7px 12px',
                                  background: '#34A853',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '6px',
                                  fontSize: '0.8rem',
                                  fontWeight: '500',
                                  cursor: 'pointer'
                                }}
                              >
                                <CheckCircle size={14} />
                                {language === 'ar' ? 'تأكيد' : 'Confirm'}
                              </button>
                            )}
                            <button 
                              onClick={() => deleteBooking(booking.id)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '7px 12px',
                                background: '#EA4335',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                fontWeight: '500',
                                cursor: 'pointer'
                              }}
                            >
                              <Trash2 size={14} />
                              {language === 'ar' ? 'حذف' : 'Delete'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'offers' && (
          <div>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              marginBottom: '25px'
            }}>
              <h3 style={{ 
                margin: '0 0 20px', 
                color: '#0B1F3A',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <BarChart3 size={22} color="#C89D2A" />
                {language === 'ar' ? 'إضافة عرض جديد' : 'Add New Offer'}
              </h3>
              <form onSubmit={handleCreateOffer}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                      {language === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'} *
                    </label>
                    <input
                      type="text"
                      value={offerData.title_ar}
                      onChange={(e) => setOfferData({...offerData, title_ar: e.target.value})}
                      required
                      placeholder="مثال: خصم 30% على الفحص الشامل"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                      {language === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'} *
                    </label>
                    <input
                      type="text"
                      value={offerData.title_en}
                      onChange={(e) => setOfferData({...offerData, title_en: e.target.value})}
                      required
                      placeholder="e.g., 30% OFF Full Inspection"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                      {language === 'ar' ? 'نسبة الخصم' : 'Discount %'} *
                    </label>
                    <input
                      type="number"
                      value={offerData.discount}
                      onChange={(e) => setOfferData({...offerData, discount: e.target.value})}
                      required
                      min="1"
                      max="100"
                      placeholder="30"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                      {language === 'ar' ? 'صالح حتى' : 'Valid Until'} *
                    </label>
                    <input
                      type="date"
                      value={offerData.valid_until}
                      onChange={(e) => setOfferData({...offerData, valid_until: e.target.value})}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                      {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'} *
                    </label>
                    <textarea
                      value={offerData.description_ar}
                      onChange={(e) => setOfferData({...offerData, description_ar: e.target.value})}
                      required
                      rows="3"
                      placeholder="مثال: احصل على خصم 30% على خدمة الفحص الشامل لسيارتك. العرض ساري لفترة محدودة!"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                      {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'} *
                    </label>
                    <textarea
                      value={offerData.description_en}
                      onChange={(e) => setOfferData({...offerData, description_en: e.target.value})}
                      required
                      rows="3"
                      placeholder="e.g., Get 30% OFF on our comprehensive car inspection service. Limited time offer!"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                      {language === 'ar' ? 'رابط الصورة (اختياري)' : 'Image URL (Optional)'}
                    </label>
                    <input
                      type="url"
                      value={offerData.image_url}
                      onChange={(e) => setOfferData({...offerData, image_url: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '25px',
                    padding: '14px 30px',
                    background: 'linear-gradient(135deg, #C89D2A, #d4a936)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  <Upload size={20} />
                  {loading ? (language === 'ar' ? 'جاري الإضافة...' : 'Adding...') : (language === 'ar' ? 'إضافة العرض' : 'Add Offer')}
                </button>
              </form>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '20px 25px', borderBottom: '1px solid #eee' }}>
                <h3 style={{ margin: 0, color: '#0B1F3A' }}>
                  {language === 'ar' ? 'العروض الحالية' : 'Current Offers'}
                </h3>
              </div>
              {offers.length === 0 ? (
                <p style={{ padding: '30px', textAlign: 'center', color: '#888' }}>
                  {language === 'ar' ? 'لا توجد عروض حالياً' : 'No offers yet'}
                </p>
              ) : (
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                    {offers.map(offer => (
                      <div key={offer.id} style={{
                        border: '2px solid #e0e0e0',
                        borderRadius: '12px',
                        padding: '20px',
                        background: offer.active ? 'white' : '#f5f5f5',
                        opacity: offer.active ? 1 : 0.6,
                        transition: 'all 0.3s'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                          <div style={{
                            background: 'linear-gradient(135deg, #C89D2A, #d4a936)',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontWeight: 'bold',
                            fontSize: '1.2rem'
                          }}>
                            {offer.discount}% OFF
                          </div>
                          <div style={{ display: 'flex', gap: '5px' }}>
                            <button
                              onClick={() => toggleOfferStatus(offer.id, offer.active)}
                              style={{
                                padding: '6px 12px',
                                background: offer.active ? '#34A853' : '#888',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                cursor: 'pointer'
                              }}
                            >
                              {offer.active ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'موقوف' : 'Inactive')}
                            </button>
                            <button
                              onClick={() => deleteOffer(offer.id)}
                              style={{
                                padding: '6px 12px',
                                background: '#EA4335',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                cursor: 'pointer'
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <h4 style={{ margin: '0 0 10px', color: '#0B1F3A', fontSize: '1.1rem' }}>
                          {language === 'ar' ? offer.title_ar : offer.title_en}
                        </h4>
                        <p style={{ margin: '0 0 15px', color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                          {language === 'ar' ? offer.description_ar : offer.description_en}
                        </p>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '5px', 
                          color: '#888', 
                          fontSize: '0.85rem',
                          padding: '10px',
                          background: 'rgba(200, 157, 42, 0.1)',
                          borderRadius: '8px'
                        }}>
                          <Clock size={16} />
                          {language === 'ar' ? 'صالح حتى:' : 'Valid until:'} {new Date(offer.valid_until).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ 
              margin: '0 0 20px', 
              color: '#0B1F3A',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <MessageCircle size={22} color="#C89D2A" />
              {language === 'ar' ? 'إرسال إشعار للمستخدمين' : 'Send Notification to Users'}
            </h3>
            <form onSubmit={sendNotification}>
              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                    {language === 'ar' ? 'إرسال إلى' : 'Send to'} *
                  </label>
                  <select
                    value={notification.target}
                    onChange={(e) => setNotification({...notification, target: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '10px',
                      fontSize: '0.95rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">{language === 'ar' ? 'جميع المستخدمين' : 'All Users'}</option>
                    {bookings.map(b => (
                      <option key={b.phone} value={b.phone}>
                        {b.name} ({b.phone})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                    {language === 'ar' ? 'عنوان الإشعار' : 'Notification Title'} *
                  </label>
                  <input
                    type="text"
                    value={notification.title}
                    onChange={(e) => setNotification({...notification, title: e.target.value})}
                    required
                    placeholder={language === 'ar' ? 'مثال: عرض جديد! خصم 30%' : 'e.g., New Offer! 30% OFF'}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '10px',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                    {language === 'ar' ? 'نص الإشعار' : 'Notification Message'} *
                  </label>
                  <textarea
                    value={notification.message}
                    onChange={(e) => setNotification({...notification, message: e.target.value})}
                    required
                    rows="4"
                    placeholder={language === 'ar' ? 'مثال: احصل على خصم 30% على خدمة الفحص الشامل. العرض ساري حتى نهاية الأسبوع!' : 'e.g., Get 30% OFF on comprehensive inspection. Offer valid until end of week!'}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '10px',
                      fontSize: '0.95rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '25px',
                  padding: '14px 30px',
                  background: 'linear-gradient(135deg, #4285F4, #5a9cf4)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
              >
                <MessageCircle size={20} />
                {loading ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...') : (language === 'ar' ? 'إرسال الإشعار' : 'Send Notification')}
              </button>
            </form>
            <div style={{ 
              marginTop: '30px', 
              padding: '20px', 
              background: 'rgba(66, 133, 244, 0.1)', 
              borderRadius: '10px',
              border: '1px solid rgba(66, 133, 244, 0.3)'
            }}>
              <h4 style={{ margin: '0 0 10px', color: '#4285F4', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={18} />
                {language === 'ar' ? 'ملاحظة مهمة' : 'Important Note'}
              </h4>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {language === 'ar' 
                  ? 'سيتم إرسال الإشعارات مباشرة إلى المستخدمين الذين قاموا بتنزيل التطبيق وسمحوا بالإشعارات. تأكد من وضوح الرسالة وأهميتها.'
                  : 'Notifications will be sent directly to users who have downloaded the app and enabled notifications. Make sure your message is clear and important.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
