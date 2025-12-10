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
              padding: '20px',
              background: 'rgba(37,211,102,0.15)',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid rgba(37,211,102,0.3)'
            }}>
              <p style={{ fontSize: '1rem', marginBottom: '15px' }}>
                بعد التحويل يرجى إرسال صورة الإيصال عبر الواتساب
              </p>
              <a 
                href="https://wa.me/9710542206000"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#25D366',
                  color: 'white',
                  padding: '12px 25px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.05rem',
                  boxShadow: '0 4px 15px rgba(37,211,102,0.4)'
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                إرسال الإيصال عبر واتساب
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
