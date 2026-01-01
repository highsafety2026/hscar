import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminApi } from './api'
import '../styles/index.css'

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings')
  const [bookings, setBookings] = useState([])
  const [reports, setReports] = useState([])
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploadData, setUploadData] = useState({ customerName: '', phone: '', code: '', file: null })
  const [offerData, setOfferData] = useState({ 
    title_ar: '', description_ar: '', discount: '', valid_until: '' 
  })
  const [notification, setNotification] = useState({ title: '', message: '', target: 'all' })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/')
      return
    }
    loadData()
  }, [navigate])

  const loadData = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const [bookingsData, reportsData, offersData] = await Promise.all([
        adminApi.getBookings(token),
        adminApi.getReports(token),
        adminApi.getOffers(token)
      ])
      setBookings(bookingsData)
      setReports(reportsData)
      setOffers(offersData)
    } catch (error) {
      console.error('Error loading data:', error)
      if (error.message?.includes('401')) {
        localStorage.removeItem('adminToken')
        navigate('/')
      }
    }
  }

  const handleUploadReport = async (e) => {
    e.preventDefault()
    if (!uploadData.customerName || !uploadData.phone || !uploadData.file) return
    
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('customerName', uploadData.customerName)
      formData.append('phone', uploadData.phone)
      if (uploadData.code) formData.append('code', uploadData.code.toUpperCase())
      formData.append('file', uploadData.file)

      await adminApi.uploadReport(formData, localStorage.getItem('adminToken'))
      setUploadData({ customerName: '', phone: '', code: '', file: null })
      alert('✅ تم رفع التقرير بنجاح')
      loadData()
    } catch (error) {
      alert('❌ فشل رفع التقرير')
    }
    setLoading(false)
  }

  const handleCreateOffer = async (e) => {
    e.preventDefault()
    if (!offerData.title_ar || !offerData.discount) return
    
    setLoading(true)
    try {
      await adminApi.createOffer(offerData, localStorage.getItem('adminToken'))
      setOfferData({ title_ar: '', description_ar: '', discount: '', valid_until: '' })
      alert('✅ تم إضافة العرض بنجاح')
      loadData()
    } catch (error) {
      alert('❌ فشل إضافة العرض')
    }
    setLoading(false)
  }

  const handleSendNotification = async (e) => {
    e.preventDefault()
    if (!notification.title || !notification.message) return
    
    setLoading(true)
    try {
      await adminApi.sendNotification(notification, localStorage.getItem('adminToken'))
      setNotification({ title: '', message: '', target: 'all' })
      alert('✅ تم إرسال الإشعار')
    } catch (error) {
      alert('❌ فشل إرسال الإشعار')
    }
    setLoading(false)
  }

  const updateBookingStatus = async (id, status) => {
    try {
      await adminApi.updateBookingStatus(id, status, localStorage.getItem('adminToken'))
      loadData()
    } catch (error) {
      alert('❌ فشل تحديث الحالة')
    }
  }

  const deleteReport = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا التقرير؟')) return
    try {
      await adminApi.deleteReport(id, localStorage.getItem('adminToken'))
      loadData()
    } catch (error) {
      alert('❌ فشل الحذف')
    }
  }

  const deleteOffer = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا العرض؟')) return
    try {
      await adminApi.deleteOffer(id, localStorage.getItem('adminToken'))
      loadData()
    } catch (error) {
      alert('❌ فشل الحذف')
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    navigate('/')
  }

  const tabStyle = (isActive) => ({
    padding: '12px 24px',
    background: isActive ? '#1565C0' : 'transparent',
    color: isActive ? 'white' : '#64748b',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s'
  })

  const cardStyle = {
    background: 'white',
    borderRadius: '15px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  }

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    marginBottom: '12px'
  }

  const buttonStyle = {
    padding: '12px 24px',
    background: loading ? '#94a3b8' : '#1565C0',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontWeight: '600'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0B1F3A, #1565C0)',
        color: 'white',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 'bold' }}>
            لوحة التحكم - HS
          </h1>
          <p style={{ margin: 0, opacity: 0.9 }}>
            إدارة الحجوزات والتقارير والعروض
          </p>
        </div>
        <button onClick={logout} style={{
          ...buttonStyle,
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          تسجيل خروج
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        background: 'white',
        padding: '16px 40px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        display: 'flex',
        gap: '12px'
      }}>
        <button onClick={() => setActiveTab('bookings')} style={tabStyle(activeTab === 'bookings')}>
          📅 الحجوزات ({bookings.length})
        </button>
        <button onClick={() => setActiveTab('reports')} style={tabStyle(activeTab === 'reports')}>
          📄 التقارير ({reports.length})
        </button>
        <button onClick={() => setActiveTab('upload')} style={tabStyle(activeTab === 'upload')}>
          📤 رفع تقرير
        </button>
        <button onClick={() => setActiveTab('offers')} style={tabStyle(activeTab === 'offers')}>
          🎁 العروض ({offers.length})
        </button>
        <button onClick={() => setActiveTab('notifications')} style={tabStyle(activeTab === 'notifications')}>
          🔔 الإشعارات
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>الحجوزات</h2>
            {bookings.length === 0 ? (
              <p style={{ color: '#64748b' }}>لا توجد حجوزات</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '12px', textAlign: 'right' }}>الاسم</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>الهاتف</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>التاريخ</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>الوقت</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>نوع السيارة</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px' }}>{booking.customerName}</td>
                        <td style={{ padding: '12px' }}>{booking.phone}</td>
                        <td style={{ padding: '12px' }}>{booking.date}</td>
                        <td style={{ padding: '12px' }}>{booking.time}</td>
                        <td style={{ padding: '12px' }}>{booking.carType}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <select
                            value={booking.status || 'pending'}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              border: '1px solid #e2e8f0',
                              background: booking.status === 'completed' ? '#d1fae5' : '#fef3c7'
                            }}
                          >
                            <option value="pending">قيد الانتظار</option>
                            <option value="confirmed">مؤكد</option>
                            <option value="completed">مكتمل</option>
                            <option value="cancelled">ملغي</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>التقارير</h2>
            {reports.length === 0 ? (
              <p style={{ color: '#64748b' }}>لا توجد تقارير</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {reports.map((report) => (
                  <div key={report.id} style={{
                    background: '#f8fafc',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <h3 style={{ margin: '0 0 8px' }}>{report.customerName}</h3>
                    <p style={{ color: '#64748b', margin: '0 0 12px', fontSize: '14px' }}>
                      رمز: {report.code || 'بدون رمز'}
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {report.pdfUrl && (
                        <a href={report.pdfUrl} target="_blank" rel="noopener noreferrer" style={{
                          padding: '8px 16px',
                          background: '#1565C0',
                          color: 'white',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontSize: '14px'
                        }}>
                          عرض PDF
                        </a>
                      )}
                      <button onClick={() => deleteReport(report.id)} style={{
                        padding: '8px 16px',
                        background: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}>
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>رفع تقرير جديد</h2>
            <form onSubmit={handleUploadReport}>
              <input
                type="text"
                placeholder="اسم العميل *"
                value={uploadData.customerName}
                onChange={(e) => setUploadData({ ...uploadData, customerName: e.target.value })}
                style={inputStyle}
                required
              />
              <input
                type="tel"
                placeholder="رقم الهاتف *"
                value={uploadData.phone}
                onChange={(e) => setUploadData({ ...uploadData, phone: e.target.value })}
                style={inputStyle}
                required
              />
              <input
                type="text"
                placeholder="رمز التقرير (اختياري)"
                value={uploadData.code}
                onChange={(e) => setUploadData({ ...uploadData, code: e.target.value })}
                style={inputStyle}
              />
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setUploadData({ ...uploadData, file: e.target.files[0] })}
                style={inputStyle}
                required
              />
              <button type="submit" disabled={loading} style={buttonStyle}>
                {loading ? 'جاري الرفع...' : 'رفع التقرير'}
              </button>
            </form>
          </div>
        )}

        {/* Offers Tab */}
        {activeTab === 'offers' && (
          <>
            <div style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>إضافة عرض جديد</h2>
              <form onSubmit={handleCreateOffer}>
                <input
                  type="text"
                  placeholder="عنوان العرض *"
                  value={offerData.title_ar}
                  onChange={(e) => setOfferData({ ...offerData, title_ar: e.target.value })}
                  style={inputStyle}
                  required
                />
                <textarea
                  placeholder="تفاصيل العرض"
                  value={offerData.description_ar}
                  onChange={(e) => setOfferData({ ...offerData, description_ar: e.target.value })}
                  style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input
                    type="number"
                    placeholder="نسبة الخصم % *"
                    value={offerData.discount}
                    onChange={(e) => setOfferData({ ...offerData, discount: e.target.value })}
                    style={inputStyle}
                    required
                  />
                  <input
                    type="date"
                    placeholder="صالح حتى"
                    value={offerData.valid_until}
                    onChange={(e) => setOfferData({ ...offerData, valid_until: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <button type="submit" disabled={loading} style={buttonStyle}>
                  {loading ? 'جاري الإضافة...' : 'إضافة العرض'}
                </button>
              </form>
            </div>

            <div style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>العروض الحالية</h2>
              {offers.length === 0 ? (
                <p style={{ color: '#64748b' }}>لا توجد عروض</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                  {offers.map((offer) => (
                    <div key={offer.id} style={{
                      background: '#f8fafc',
                      padding: '20px',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <h3 style={{ margin: '0 0 8px' }}>{offer.title_ar}</h3>
                      <p style={{ color: '#64748b', margin: '0 0 12px', fontSize: '14px' }}>
                        {offer.description_ar}
                      </p>
                      <div style={{
                        display: 'inline-block',
                        padding: '6px 12px',
                        background: '#dcfce7',
                        color: '#16a34a',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        marginBottom: '12px'
                      }}>
                        خصم {offer.discount}%
                      </div>
                      {offer.valid_until && (
                        <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 12px' }}>
                          صالح حتى: {offer.valid_until}
                        </p>
                      )}
                      <button onClick={() => deleteOffer(offer.id)} style={{
                        padding: '8px 16px',
                        background: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}>
                        حذف العرض
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>إرسال إشعار</h2>
            <form onSubmit={handleSendNotification}>
              <input
                type="text"
                placeholder="عنوان الإشعار *"
                value={notification.title}
                onChange={(e) => setNotification({ ...notification, title: e.target.value })}
                style={inputStyle}
                required
              />
              <textarea
                placeholder="محتوى الإشعار *"
                value={notification.message}
                onChange={(e) => setNotification({ ...notification, message: e.target.value })}
                style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                required
              />
              <select
                value={notification.target}
                onChange={(e) => setNotification({ ...notification, target: e.target.value })}
                style={inputStyle}
              >
                <option value="all">جميع المستخدمين</option>
                <option value="customers">العملاء فقط</option>
              </select>
              <button type="submit" disabled={loading} style={buttonStyle}>
                {loading ? 'جاري الإرسال...' : 'إرسال الإشعار'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
