import { useState } from 'react'
import { Building2, CreditCard, Copy, Check } from 'lucide-react'

function Booking() {
  const [copied, setCopied] = useState('')

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(''), 2000)
  }
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

        <div style={{
          marginTop: '40px',
          background: 'linear-gradient(135deg, #0B1F3A 0%, #1a365d 100%)',
          borderRadius: '20px',
          padding: '35px',
          color: 'white',
          boxShadow: '0 15px 40px rgba(11,31,58,0.3)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '70px',
              height: '70px',
              background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <CreditCard size={35} color="#0B1F3A" />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>طريقة الدفع</h3>
            <p style={{ opacity: 0.8 }}>يمكنكم الدفع عن طريق التحويل البنكي</p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '25px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <Building2 size={24} color="#C89D2A" />
              <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>بيانات الحساب البنكي</span>
            </div>

            <div style={{ display: 'grid', gap: '15px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.08)',
                padding: '15px 20px',
                borderRadius: '10px'
              }}>
                <div>
                  <div style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '5px' }}>اسم البنك</div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>ADIB - مصرف أبوظبي الإسلامي</div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.08)',
                padding: '15px 20px',
                borderRadius: '10px'
              }}>
                <div>
                  <div style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '5px' }}>اسم الحساب</div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>High Safety International Center</div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.08)',
                padding: '15px 20px',
                borderRadius: '10px'
              }}>
                <div>
                  <div style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '5px' }}>رقم الحساب</div>
                  <div style={{ fontWeight: '600', fontSize: '1.2rem', fontFamily: 'monospace' }}>19033395</div>
                </div>
                <button
                  onClick={() => copyToClipboard('19033395', 'account')}
                  style={{
                    background: copied === 'account' ? '#25D366' : 'rgba(200,157,42,0.3)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 15px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'white',
                    transition: 'all 0.3s'
                  }}
                >
                  {copied === 'account' ? <Check size={18} /> : <Copy size={18} />}
                  {copied === 'account' ? 'تم النسخ' : 'نسخ'}
                </button>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(200,157,42,0.15)',
                padding: '15px 20px',
                borderRadius: '10px',
                border: '1px solid rgba(200,157,42,0.3)'
              }}>
                <div>
                  <div style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '5px' }}>رقم IBAN</div>
                  <div style={{ fontWeight: '600', fontSize: '1rem', fontFamily: 'monospace', letterSpacing: '1px' }}>
                    AE440500000000019033395
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('AE440500000000019033395', 'iban')}
                  style={{
                    background: copied === 'iban' ? '#25D366' : 'rgba(200,157,42,0.3)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 15px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'white',
                    transition: 'all 0.3s'
                  }}
                >
                  {copied === 'iban' ? <Check size={18} /> : <Copy size={18} />}
                  {copied === 'iban' ? 'تم النسخ' : 'نسخ'}
                </button>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.08)',
                padding: '15px 20px',
                borderRadius: '10px'
              }}>
                <div>
                  <div style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '5px' }}>العملة</div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>AED - درهم إماراتي</div>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: 'rgba(37,211,102,0.15)',
              borderRadius: '10px',
              textAlign: 'center',
              border: '1px solid rgba(37,211,102,0.3)'
            }}>
              <p style={{ fontSize: '0.95rem', margin: 0 }}>
                بعد التحويل يرجى إرسال صورة الإيصال عبر الواتساب
                <a 
                  href="https://wa.me/971542206000" 
                  style={{ 
                    color: '#25D366', 
                    fontWeight: '700',
                    marginRight: '8px',
                    textDecoration: 'none'
                  }}
                >
                  +971 54 220 6000
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
