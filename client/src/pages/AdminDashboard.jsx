import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Calendar, Upload, Trash2, Eye, CheckCircle, LogOut, Users, BarChart3, Clock, Phone, Car, Search, RefreshCw, MessageCircle, PhoneCall, Copy, PenTool } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

function AdminDashboard() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState('reports')
  const [bookings, setBookings] = useState([])
  const [reports, setReports] = useState([])
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
      const headers = getAuthHeaders()
      const [bookingsRes, reportsRes] = await Promise.all([
        fetch('/api/bookings', { headers }),
        fetch('/api/reports', { headers })
      ])
      
      if (bookingsRes.status === 401 || reportsRes.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin')
        return
      }
      
      setBookings(await bookingsRes.json())
      setReports(await reportsRes.json())
    } catch (error) {
      console.error('Error loading data:', error)
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

    await fetch('/api/reports', { 
      method: 'POST', 
      body: formData,
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    })
    setUploadData({ customerName: '', code: '', file: null, images: [] })
    loadData()
    setLoading(false)
  }

  const deleteReport = async (id) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا التقرير؟' : 'Are you sure you want to delete this report?')) {
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
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا الحجز؟' : 'Are you sure you want to delete this booking?')) {
      await fetch(`/api/bookings/${id}`, { 
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
      </div>
    </div>
  )
}

export default AdminDashboard
