import { useState } from 'react'

function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    carYear: '',
    serviceType: '',
    preferredDate: '',
    notes: ''
  })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setFormData({
          name: '',
          phone: '',
          carModel: '',
          carYear: '',
          serviceType: '',
          preferredDate: '',
          notes: ''
        })
      }
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
  }

  return (
    <div className="form-page">
      <div className="container">
        <div className="form-container">
          <h2 className="section-title">حجز موعد فحص</h2>
          
          {success && (
            <div className="success-message">
              تم استلام طلبك بنجاح! سنتواصل معك قريباً لتأكيد الموعد.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>الاسم الكامل</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="أدخل اسمك الكامل"
              />
            </div>

            <div className="form-group">
              <label>رقم الهاتف</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="05XXXXXXXX"
              />
            </div>

            <div className="form-group">
              <label>نوع السيارة</label>
              <input
                type="text"
                name="carModel"
                value={formData.carModel}
                onChange={handleChange}
                required
                placeholder="مثال: تويوتا كامري"
              />
            </div>

            <div className="form-group">
              <label>سنة الصنع</label>
              <input
                type="number"
                name="carYear"
                value={formData.carYear}
                onChange={handleChange}
                required
                placeholder="مثال: 2020"
                min="1990"
                max="2025"
              />
            </div>

            <div className="form-group">
              <label>نوع الخدمة</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
              >
                <option value="">اختر نوع الخدمة</option>
                <option value="full">الفحص الشامل - Full Inspection</option>
                <option value="mechanical">فحص الميكانيكا والكمبيوتر - Mechanical + Computer</option>
                <option value="misc">فحوصات متنوعة - Miscellaneous Tests</option>
                <option value="basic">فحص الأجزاء الأساسية - Basic Parts</option>
              </select>
            </div>

            <div className="form-group">
              <label>التاريخ المفضل</label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>ملاحظات إضافية</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="أي ملاحظات أو استفسارات..."
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Booking
