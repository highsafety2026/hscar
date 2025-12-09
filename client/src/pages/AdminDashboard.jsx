import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('reports')
  const [bookings, setBookings] = useState([])
  const [reports, setReports] = useState([])
  const [valuations, setValuations] = useState([])
  const [uploadData, setUploadData] = useState({ phone: '', customerName: '', file: null })
  const [loading, setLoading] = useState(false)
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
      const headers = getAuthHeaders()
      const [bookingsRes, reportsRes, valuationsRes] = await Promise.all([
        fetch('/api/bookings', { headers }),
        fetch('/api/reports', { headers }),
        fetch('/api/valuations', { headers })
      ])
      
      if (bookingsRes.status === 401 || reportsRes.status === 401 || valuationsRes.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin')
        return
      }
      
      setBookings(await bookingsRes.json())
      setReports(await reportsRes.json())
      setValuations(await valuationsRes.json())
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleUploadReport = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('phone', uploadData.phone)
    formData.append('customerName', uploadData.customerName)
    formData.append('file', uploadData.file)

    await fetch('/api/reports', { 
      method: 'POST', 
      body: formData,
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    })
    setUploadData({ phone: '', customerName: '', file: null })
    loadData()
    setLoading(false)
  }

  const deleteReport = async (id) => {
    if (confirm('هل أنت متأكد من حذف هذا التقرير؟')) {
      await fetch(`/api/reports/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders()
      })
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
    if (confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
      await fetch(`/api/bookings/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      loadData()
    }
  }

  const updateValuation = async (id) => {
    const price = prompt('أدخل السعر التقديري (مثال: 50,000 ريال):')
    if (price) {
      await fetch(`/api/valuations/${id}`, {
        method: 'PATCH',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ estimatedPrice: price, status: 'completed' })
      })
      loadData()
    }
  }

  const deleteValuation = async (id) => {
    if (confirm('هل أنت متأكد من حذف هذا التقييم؟')) {
      await fetch(`/api/valuations/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      loadData()
    }
  }

  const logout = async () => {
    await fetch('/api/admin/logout', {
      method: 'POST',
      headers: getAuthHeaders()
    })
    localStorage.removeItem('adminToken')
    navigate('/admin')
  }

  const serviceTypes = {
    full: 'الفحص الشامل',
    mechanical: 'ميكانيكي وكمبيوتر',
    misc: 'فحوصات متنوعة',
    basic: 'فحص أساسي'
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>لوحة التحكم</h2>
          <button onClick={logout} className="btn btn-secondary">تسجيل الخروج</button>
        </div>

        <div className="admin-tabs">
          <button className={`admin-tab ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
            التقارير ({reports.length})
          </button>
          <button className={`admin-tab ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            الحجوزات ({bookings.length})
          </button>
          <button className={`admin-tab ${activeTab === 'valuations' ? 'active' : ''}`} onClick={() => setActiveTab('valuations')}>
            التقييمات ({valuations.length})
          </button>
        </div>

        {activeTab === 'reports' && (
          <div className="admin-section">
            <h3 style={{ marginBottom: '20px' }}>رفع تقرير جديد</h3>
            <form onSubmit={handleUploadReport} className="upload-form">
              <div className="form-group">
                <label>اسم العميل</label>
                <input
                  type="text"
                  value={uploadData.customerName}
                  onChange={(e) => setUploadData({...uploadData, customerName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>رقم الهاتف</label>
                <input
                  type="tel"
                  value={uploadData.phone}
                  onChange={(e) => setUploadData({...uploadData, phone: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>ملف PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setUploadData({...uploadData, file: e.target.files[0]})}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'جاري الرفع...' : 'رفع التقرير'}
              </button>
            </form>

            <h3 style={{ marginTop: '30px', marginBottom: '20px' }}>التقارير المرفوعة</h3>
            {reports.length === 0 ? (
              <p style={{ color: '#888' }}>لا توجد تقارير حالياً</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>اسم العميل</th>
                    <th>رقم الهاتف</th>
                    <th>التاريخ</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr key={report.id}>
                      <td>{report.customerName}</td>
                      <td>{report.phone}</td>
                      <td>{new Date(report.createdAt).toLocaleDateString('ar-SA')}</td>
                      <td>
                        <a href={`/uploads/${report.filename}`} target="_blank" className="action-btn confirm">
                          عرض
                        </a>
                        <button onClick={() => deleteReport(report.id)} className="action-btn delete">
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="admin-section">
            <h3 style={{ marginBottom: '20px' }}>إدارة الحجوزات</h3>
            {bookings.length === 0 ? (
              <p style={{ color: '#888' }}>لا توجد حجوزات حالياً</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>الاسم</th>
                    <th>الهاتف</th>
                    <th>السيارة</th>
                    <th>الخدمة</th>
                    <th>التاريخ</th>
                    <th>الحالة</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id}>
                      <td>{booking.name}</td>
                      <td>{booking.phone}</td>
                      <td>{booking.carModel} - {booking.carYear}</td>
                      <td>{serviceTypes[booking.serviceType]}</td>
                      <td>{booking.preferredDate}</td>
                      <td>
                        <span className={booking.status === 'pending' ? 'pending-badge' : 'completed-badge'}>
                          {booking.status === 'pending' ? 'قيد الانتظار' : 'مؤكد'}
                        </span>
                      </td>
                      <td>
                        {booking.status === 'pending' && (
                          <button onClick={() => updateBookingStatus(booking.id, 'confirmed')} className="action-btn confirm">
                            تأكيد
                          </button>
                        )}
                        <button onClick={() => deleteBooking(booking.id)} className="action-btn delete">
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'valuations' && (
          <div className="admin-section">
            <h3 style={{ marginBottom: '20px' }}>طلبات التقييم</h3>
            {valuations.length === 0 ? (
              <p style={{ color: '#888' }}>لا توجد طلبات تقييم حالياً</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>الموديل</th>
                    <th>السنة</th>
                    <th>الهاتف</th>
                    <th>الصور</th>
                    <th>الحالة</th>
                    <th>السعر التقديري</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {valuations.map(val => (
                    <tr key={val.id}>
                      <td>{val.model}</td>
                      <td>{val.year}</td>
                      <td>{val.phone}</td>
                      <td>
                        {val.images.map((img, i) => (
                          <a key={i} href={`/uploads/${img}`} target="_blank" style={{ marginLeft: '5px' }}>
                            صورة {i + 1}
                          </a>
                        ))}
                      </td>
                      <td>
                        <span className={val.status === 'pending' ? 'pending-badge' : 'completed-badge'}>
                          {val.status === 'pending' ? 'قيد المراجعة' : 'مكتمل'}
                        </span>
                      </td>
                      <td>{val.estimatedPrice || '-'}</td>
                      <td>
                        {val.status === 'pending' && (
                          <button onClick={() => updateValuation(val.id)} className="action-btn confirm">
                            تقييم
                          </button>
                        )}
                        <button onClick={() => deleteValuation(val.id)} className="action-btn delete">
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
