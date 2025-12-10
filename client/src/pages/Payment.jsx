import { useState } from 'react'
import { CreditCard, User, Phone, Mail, Shield, CheckCircle } from 'lucide-react'

function Payment() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    amount: '',
    serviceType: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const services = [
    { value: 'full', label: 'الفحص الشامل - Full Inspection', price: 350 },
    { value: 'mechanical', label: 'فحص الميكانيكا والكمبيوتر - Mechanical + Computer', price: 250 },
    { value: 'misc', label: 'فحوصات متنوعة - Miscellaneous Tests', price: 200 },
    { value: 'basic', label: 'فحص الأجزاء الأساسية - Basic Parts', price: 150 }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => {
      const newData = { ...prev, [name]: value }
      if (name === 'serviceType') {
        const service = services.find(s => s.value === value)
        if (service) {
          newData.amount = service.price.toString()
        }
      }
      return newData
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          customerEmail: formData.customerEmail,
          amount: parseInt(formData.amount),
          serviceType: formData.serviceType
        })
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'حدث خطأ في إنشاء جلسة الدفع')
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالخادم')
    }
    setLoading(false)
  }

  return (
    <div className="payment-page">
      <div className="payment-hero">
        <div className="container">
          <span className="section-badge">الدفع الآمن</span>
          <h1>الدفع الإلكتروني</h1>
          <p>ادفع بأمان عبر البطاقة البنكية</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 24px' }}>
        <div className="payment-container">
          <div className="payment-info">
            <div className="security-badge">
              <Shield size={24} />
              <span>دفع آمن ومشفر 100%</span>
            </div>
            
            <h3>مميزات الدفع الإلكتروني</h3>
            <ul className="payment-features">
              <li><CheckCircle size={18} /> دفع آمن عبر Stripe</li>
              <li><CheckCircle size={18} /> يدعم Visa و Mastercard</li>
              <li><CheckCircle size={18} /> تشفير SSL/TLS</li>
              <li><CheckCircle size={18} /> إيصال فوري بالبريد</li>
              <li><CheckCircle size={18} /> لا نحتفظ ببيانات بطاقتك</li>
            </ul>

            <div className="accepted-cards">
              <span>البطاقات المقبولة:</span>
              <div className="card-icons">
                <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/visa.svg" alt="Visa" style={{ width: 50, height: 35, objectFit: 'contain', background: 'white', padding: 5, borderRadius: 5 }} />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={{ width: 50, height: 35, objectFit: 'contain', background: 'white', padding: 5, borderRadius: 5 }} />
              </div>
            </div>
          </div>

          <div className="payment-form-container">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="payment-form">
              <div className="form-group-new">
                <label><User size={18} /> الاسم الكامل</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div className="form-group-new">
                <label><Phone size={18} /> رقم الهاتف</label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  required
                  placeholder="05XXXXXXXX"
                />
              </div>

              <div className="form-group-new">
                <label><Mail size={18} /> البريد الإلكتروني (اختياري)</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
              </div>

              <div className="form-group-new">
                <label>نوع الخدمة</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="">اختر نوع الخدمة</option>
                  {services.map(service => (
                    <option key={service.value} value={service.value}>
                      {service.label} - {service.price} درهم
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group-new">
                <label><CreditCard size={18} /> المبلغ (درهم)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  placeholder="المبلغ بالدرهم"
                  min="1"
                  readOnly={formData.serviceType !== ''}
                />
              </div>

              <div className="amount-display">
                <span>المبلغ الإجمالي:</span>
                <span className="total-amount">{formData.amount || 0} درهم</span>
              </div>

              <button 
                type="submit" 
                className="payment-submit-btn" 
                disabled={loading || !formData.amount}
              >
                <CreditCard size={20} />
                {loading ? 'جاري التحويل...' : 'ادفع الآن'}
              </button>

              <p className="payment-note">
                سيتم تحويلك إلى صفحة الدفع الآمنة من Stripe
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
