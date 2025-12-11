import { useState } from 'react'
import { CreditCard, User, Phone, Mail, Shield, CheckCircle } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

function Payment() {
  const { language, t } = useLanguage()
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    amount: '',
    serviceType: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const services = language === 'ar' ? [
    { value: 'full', label: 'الفحص الشامل - Full Inspection', price: 350 },
    { value: 'mechanical', label: 'فحص الميكانيكا والكمبيوتر - Mechanical + Computer', price: 250 },
    { value: 'misc', label: 'فحوصات متنوعة - Miscellaneous Tests', price: 200 },
    { value: 'basic', label: 'فحص الأجزاء الأساسية - Basic Parts', price: 150 }
  ] : [
    { value: 'full', label: 'Full Inspection', price: 350 },
    { value: 'mechanical', label: 'Mechanical + Computer Check', price: 250 },
    { value: 'misc', label: 'Miscellaneous Tests', price: 200 },
    { value: 'basic', label: 'Basic Parts Check', price: 150 }
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
        setError(data.error || (language === 'ar' ? 'حدث خطأ في إنشاء جلسة الدفع' : 'Error creating checkout session'))
      }
    } catch (err) {
      setError(language === 'ar' ? 'حدث خطأ في الاتصال بالخادم' : 'Connection error')
    }
    setLoading(false)
  }

  return (
    <div className="payment-page">
      <div className="payment-hero">
        <div className="container">
          <span className="section-badge">{t.payment.badge}</span>
          <h1>{t.payment.title}</h1>
          <p>{t.payment.subtitle}</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 24px' }}>
        <div className="payment-container">
          <div className="payment-info">
            <div className="security-badge">
              <Shield size={24} />
              <span>{t.payment.secure}</span>
            </div>
            
            <h3>{t.payment.features}</h3>
            <ul className="payment-features">
              <li><CheckCircle size={18} /> {t.payment.secureStripe}</li>
              <li><CheckCircle size={18} /> {t.payment.cards}</li>
              <li><CheckCircle size={18} /> {t.payment.ssl}</li>
              <li><CheckCircle size={18} /> {t.payment.receipt}</li>
              <li><CheckCircle size={18} /> {language === 'ar' ? 'لا نحتفظ ببيانات بطاقتك' : 'We don\'t store your card data'}</li>
            </ul>

            <div className="accepted-cards">
              <span>{language === 'ar' ? 'البطاقات المقبولة:' : 'Accepted Cards:'}</span>
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
                <label><User size={18} /> {t.payment.name}</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  placeholder={t.payment.namePlaceholder}
                />
              </div>

              <div className="form-group-new">
                <label><Phone size={18} /> {t.payment.phone}</label>
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
                <label><Mail size={18} /> {t.payment.email}</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
              </div>

              <div className="form-group-new">
                <label>{t.payment.service}</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t.payment.selectService}</option>
                  {services.map(service => (
                    <option key={service.value} value={service.value}>
                      {service.label} - {service.price} {t.common.aed}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group-new">
                <label><CreditCard size={18} /> {t.payment.amount}</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  placeholder={language === 'ar' ? 'المبلغ بالدرهم' : 'Amount in AED'}
                  min="1"
                  readOnly={formData.serviceType !== ''}
                />
              </div>

              <div className="amount-display">
                <span>{language === 'ar' ? 'المبلغ الإجمالي:' : 'Total Amount:'}</span>
                <span className="total-amount">{formData.amount || 0} {t.common.aed}</span>
              </div>

              <button 
                type="submit" 
                className="payment-submit-btn" 
                disabled={loading || !formData.amount}
              >
                <CreditCard size={20} />
                {loading ? t.payment.processing : t.payment.payNow}
              </button>

              <p className="payment-note">
                {language === 'ar' ? 'سيتم تحويلك إلى صفحة الدفع الآمنة من Stripe' : 'You will be redirected to Stripe\'s secure payment page'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
