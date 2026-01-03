import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminApi } from './api'
import DashboardStats from './components/DashboardStats'
import PointsSystem from './components/PointsSystem'
import '../styles/index.css'

function AdminDashboardNew() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [dashboardStats, setDashboardStats] = useState(null)
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
      navigate('/login')
      return
    }
    loadData()
  }, [navigate])

  const loadData = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const [statsData, bookingsData, reportsData, offersData] = await Promise.all([
        adminApi.getDashboardStats(token),
        adminApi.getBookings(token),
        adminApi.getReports(token),
        adminApi.getOffers(token)
      ])
      setDashboardStats(statsData)
      setBookings(bookingsData)
      setReports(reportsData)
      setOffers(offersData)
    } catch (error) {
      console.error('Error loading data:', error)
      if (error.message?.includes('401')) {
        localStorage.removeItem('adminToken')
        navigate('/login')
      }
    }
  }

  const handleUploadReport = async (e) => {
    e.preventDefault()
    if (!uploadData.code || !uploadData.file) return
    
    setLoading(true)
    try {
      const formData = new FormData()
      if (uploadData.customerName) formData.append('customerName', uploadData.customerName)
      if (uploadData.phone) formData.append('phone', uploadData.phone)
      formData.append('code', uploadData.code.toUpperCase())
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
    const booking = bookings.find(b => b.id === id)
    if (!booking) return
    
    if (status === 'confirmed') {
      const confirmMsg = `هل تريد تأكيد الحجز؟

📋 تفاصيل الحجز:
👤 العميل: ${booking.name}
📞 الهاتف: ${booking.phone}
🔧 الخدمة: ${booking.serviceType}
📅 التاريخ: ${booking.preferredDate}
⏰ الوقت: ${booking.preferredTime}

⚠️ ملاحظة: يُرجى الاتصال بالعميل على رقم ${booking.phone} لإبلاغه بالتأكيد`

      if (!confirm(confirmMsg)) return
    }
    
    try {
      await adminApi.updateBookingStatus(id, status, localStorage.getItem('adminToken'))
      alert(`✅ تم ${status === 'confirmed' ? 'تأكيد' : 'تحديث'} الحجز بنجاح!\n\n📞 اتصل بالعميل: ${booking.phone}\n💬 أبلغه بتأكيد حجزه`)
      loadData()
    } catch (error) {
      alert('❌ فشل تحديث الحالة')
    }
  }

  const deleteReport = async (id) => {
    if (!confirm('هل أنت متأكد من حذف التقرير؟')) return
    try {
      await adminApi.deleteReport(id, localStorage.getItem('adminToken'))
      loadData()
    } catch (error) {
      alert('❌ فشل حذف التقرير')
    }
  }

  const deleteOffer = async (id) => {
    if (!confirm('هل أنت متأكد من حذف العرض؟')) return
    try {
      await adminApi.deleteOffer(id, localStorage.getItem('adminToken'))
      loadData()
    } catch (error) {
      alert('❌ فشل حذف العرض')
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    navigate('/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #0B1F3A, #1565C0)',
        color: 'white',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>🎛️ لوحة التحكم - HS</h1>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button onClick={() => { loadData(); alert('✅ تم تحديث البيانات!') }} style={{
              background: 'rgba(52, 211, 153, 0.9)',
              border: 'none',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🔄 تحديث البيانات
            </button>
            <button onClick={logout} style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '0', overflowX: 'auto' }}>
          {[
            { id: 'dashboard', label: '📊 الرئيسية', icon: '📊' },
            { id: 'points', label: '🎁 النقاط', icon: '🎁' },
            { id: 'bookings', label: '📅 الحجوزات', icon: '📅' },
            { id: 'reports', label: '📄 التقارير', icon: '📄' },
            { id: 'offers', label: '🎉 العروض', icon: '🎉' },
            { id: 'notifications', label: '🔔 الإشعارات', icon: '🔔' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '15px 25px',
                border: 'none',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #0B1F3A, #1565C0)' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#64748b',
                cursor: 'pointer',
                fontWeight: '600',
                borderBottom: activeTab === tab.id ? 'none' : '2px solid transparent',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        {activeTab === 'dashboard' && <DashboardStats stats={dashboardStats} />}
        {activeTab === 'points' && <PointsSystem token={localStorage.getItem('adminToken')} />}
        
        {activeTab === 'bookings' && (
          <BookingsTab bookings={bookings} updateStatus={updateBookingStatus} />
        )}
        
        {activeTab === 'reports' && (
          <ReportsTab 
            reports={reports}
            uploadData={uploadData}
            setUploadData={setUploadData}
            handleUpload={handleUploadReport}
            deleteReport={deleteReport}
            loading={loading}
          />
        )}
        
        {activeTab === 'offers' && (
          <OffersTab
            offers={offers}
            offerData={offerData}
            setOfferData={setOfferData}
            handleCreate={handleCreateOffer}
            deleteOffer={deleteOffer}
            loading={loading}
          />
        )}
        
        {activeTab === 'notifications' && (
          <NotificationsTab
            notification={notification}
            setNotification={setNotification}
            handleSend={handleSendNotification}
            loading={loading}
          />
        )}
      </div>
    </div>
  )
}

// Bookings Tab Component
function BookingsTab({ bookings, updateStatus }) {
  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#0B1F3A' }}>📅 الحجوزات ({bookings.length})</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={thStyle}>الاسم</th>
              <th style={thStyle}>الهاتف</th>
              <th style={thStyle}>نوع الفحص</th>
              <th style={thStyle}>التاريخ</th>
              <th style={thStyle}>الوقت</th>
              <th style={thStyle}>الحالة</th>
              <th style={thStyle}>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={tdStyle}>{booking.name || booking.customerName || '-'}</td>
                <td style={tdStyle}>{booking.phone || booking.customerPhone || '-'}</td>
                <td style={tdStyle}>{booking.serviceType || booking.service_type || '-'}</td>
                <td style={tdStyle}>{booking.preferredDate || booking.date ? new Date(booking.preferredDate || booking.date).toLocaleDateString('ar-SA') : '-'}</td>
                <td style={tdStyle}>{booking.preferredTime || booking.time || '-'}</td>
                <td style={tdStyle}>
                  <span style={{
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: booking.status === 'confirmed' ? '#d4edda' : '#fff3cd',
                    color: booking.status === 'confirmed' ? '#155724' : '#856404'
                  }}>
                    {booking.status === 'confirmed' ? 'مؤكد' : 'قيد الانتظار'}
                  </span>
                </td>
                <td style={tdStyle}>
                  {booking.status === 'pending' && (
                    <button
                      onClick={() => updateStatus(booking.id, 'confirmed')}
                      style={{...buttonStyle, padding: '8px 16px', fontSize: '14px'}}
                    >
                      تأكيد
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Reports Tab Component
function ReportsTab({ reports, uploadData, setUploadData, handleUpload, deleteReport, loading }) {
  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#0B1F3A' }}>📄 التقارير</h2>
      
      {/* Upload Form */}
      <div style={{ background: 'white', borderRadius: '15px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px' }}>رفع تقرير جديد</h3>
        <form onSubmit={handleUpload}>
          <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <input
              type="text"
              placeholder="اسم العميل (اختياري)"
              value={uploadData.customerName}
              onChange={(e) => setUploadData({...uploadData, customerName: e.target.value})}
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder="رقم الهاتف (اختياري)"
              value={uploadData.phone}
              onChange={(e) => setUploadData({...uploadData, phone: e.target.value})}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="الكود *"
              value={uploadData.code}
              onChange={(e) => setUploadData({...uploadData, code: e.target.value.toUpperCase()})}
              style={inputStyle}
              required
            />
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setUploadData({...uploadData, file: e.target.files[0]})}
              style={inputStyle}
              required
            />
          </div>
          <button type="submit" disabled={loading} style={{...buttonStyle, marginTop: '15px'}}>
            {loading ? 'جاري الرفع...' : 'رفع التقرير'}
          </button>
        </form>
      </div>

      {/* Reports List */}
      <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px' }}>📋 التقارير المرفوعة ({reports.length})</h3>
        {reports.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>لا توجد تقارير مرفوعة</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={thStyle}>اسم العميل</th>
                  <th style={thStyle}>رقم الهاتف</th>
                  <th style={thStyle}>الكود</th>
                  <th style={thStyle}>تاريخ الرفع</th>
                  <th style={thStyle}>الوقت</th>
                  <th style={thStyle}>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => {
                  const date = new Date(report.createdAt || report.created_at)
                  return (
                    <tr key={report.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={tdStyle}>{report.customerName || report.customer_name}</td>
                      <td style={tdStyle}>{report.phone || '-'}</td>
                      <td style={tdStyle}>
                        <span style={{ 
                          background: 'linear-gradient(135deg, #0B1F3A, #1565C0)',
                          color: 'white',
                          padding: '5px 12px',
                          borderRadius: '8px',
                          fontWeight: 'bold',
                          fontSize: '14px'
                        }}>
                          {report.code}
                        </span>
                      </td>
                      <td style={tdStyle}>{date.toLocaleDateString('ar-SA')}</td>
                      <td style={tdStyle}>{date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</td>
                      <td style={tdStyle}>
                        {report.filename && (
                          <a 
                            href={`https://hscar-backend.onrender.com/uploads/${report.filename}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{...buttonStyle, padding: '5px 15px', fontSize: '14px', textDecoration: 'none', display: 'inline-block', marginLeft: '10px'}}
                          >
                            📄 عرض
                          </a>
                        )}
                        <button onClick={() => deleteReport(report.id)} style={{...buttonStyle, padding: '5px 15px', fontSize: '14px', background: '#dc3545'}}>
                          🗑️ حذف
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// Offers Tab Component  
function OffersTab({ offers, offerData, setOfferData, handleCreate, deleteOffer, loading }) {
  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#0B1F3A' }}>🎉 العروض</h2>
      
      {/* Create Form */}
      <div style={{ background: 'white', borderRadius: '15px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px' }}>إضافة عرض جديد</h3>
        <form onSubmit={handleCreate}>
          <div style={{ display: 'grid', gap: '15px' }}>
            <input
              type="text"
              placeholder="عنوان العرض"
              value={offerData.title_ar}
              onChange={(e) => setOfferData({...offerData, title_ar: e.target.value})}
              style={inputStyle}
              required
            />
            <textarea
              placeholder="وصف العرض"
              value={offerData.description_ar}
              onChange={(e) => setOfferData({...offerData, description_ar: e.target.value})}
              style={{...inputStyle, minHeight: '100px'}}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input
                type="number"
                placeholder="نسبة الخصم %"
                value={offerData.discount}
                onChange={(e) => setOfferData({...offerData, discount: e.target.value})}
                style={inputStyle}
                required
              />
              <input
                type="date"
                value={offerData.valid_until}
                onChange={(e) => setOfferData({...offerData, valid_until: e.target.value})}
                style={inputStyle}
              />
            </div>
          </div>
          <button type="submit" disabled={loading} style={{...buttonStyle, marginTop: '15px'}}>
            {loading ? 'جاري الإضافة...' : 'إضافة العرض'}
          </button>
        </form>
      </div>

      {/* Offers List */}
      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {offers.map((offer) => (
          <div key={offer.id} style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '10px', color: '#0B1F3A' }}>{offer.title_ar}</h3>
            <p style={{ color: '#64748b', marginBottom: '10px' }}>{offer.description_ar}</p>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0088FE', marginBottom: '10px' }}>
              {offer.discount}% خصم
            </div>
            {offer.valid_until && (
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '15px' }}>
                صالح حتى: {new Date(offer.valid_until).toLocaleDateString('ar-SA')}
              </p>
            )}
            <button onClick={() => deleteOffer(offer.id)} style={{...buttonStyle, background: '#dc3545', width: '100%'}}>
              حذف العرض
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Notifications Tab Component
function NotificationsTab({ notification, setNotification, handleSend, loading }) {
  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#0B1F3A' }}>🔔 إرسال إشعار</h2>
      <div style={{ background: 'white', borderRadius: '15px', padding: '20px', maxWidth: '600px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <form onSubmit={handleSend}>
          <div style={{ display: 'grid', gap: '15px' }}>
            <input
              type="text"
              placeholder="عنوان الإشعار"
              value={notification.title}
              onChange={(e) => setNotification({...notification, title: e.target.value})}
              style={inputStyle}
              required
            />
            <textarea
              placeholder="نص الإشعار"
              value={notification.message}
              onChange={(e) => setNotification({...notification, message: e.target.value})}
              style={{...inputStyle, minHeight: '120px'}}
              required
            />
            <select
              value={notification.target}
              onChange={(e) => setNotification({...notification, target: e.target.value})}
              style={inputStyle}
            >
              <option value="all">جميع العملاء</option>
              <option value="recent">العملاء الأخيرين</option>
            </select>
          </div>
          <button type="submit" disabled={loading} style={{...buttonStyle, marginTop: '15px', width: '100%'}}>
            {loading ? 'جاري الإرسال...' : 'إرسال الإشعار'}
          </button>
        </form>
      </div>
    </div>
  )
}

// Styles
const inputStyle = {
  padding: '12px',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '14px',
  width: '100%'
}

const buttonStyle = {
  background: 'linear-gradient(135deg, #0B1F3A, #1565C0)',
  color: 'white',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '16px'
}

const thStyle = {
  padding: '12px',
  textAlign: 'right',
  fontWeight: '600',
  color: '#0B1F3A'
}

const tdStyle = {
  padding: '12px',
  textAlign: 'right'
}

export default AdminDashboardNew
