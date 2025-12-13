import { useState } from 'react'
import { CreditCard, User, Phone, Mail, Shield, CheckCircle, Car, Truck, Crown } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

function Payment() {
  const { language, t } = useLanguage()
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    amount: '',
    serviceType: '',
    carCategory: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const carCategories = [
    { value: 'sedan', label: language === 'ar' ? 'السيارات الصالون' : 'Sedan', icon: Car },
    { value: 'suv', label: language === 'ar' ? 'سيارات الدفع الرباعي' : '4WD / SUV', icon: Truck },
    { value: 'luxury', label: language === 'ar' ? 'السيارات الفاخرة والرياضية' : 'Luxury / Coupe', icon: Crown }
  ]

  const pricing = {
    sedan: { full: 500, mechanical: 250, misc: 200, basic: 300 },
    suv: { full: 600, mechanical: 300, misc: 200, basic: 400 },
    luxury: { full: 700, mechanical: 350, misc: 200, basic: 500 }
  }

  const serviceLabels = language === 'ar' ? {
    full: 'الفحص الشامل',
    mechanical: 'ميكانيكا + كمبيوتر',
    misc: 'فحوصات متنوعة',
    basic: 'الأجزاء الأساسية'
  } : {
    full: 'Full Inspection',
    mechanical: 'Mechanical + Computer',
    misc: 'Various Tests',
    basic: 'Basic Parts'
  }

  const getServicesForCategory = (category) => {
    if (!category || !pricing[category]) return []
    const prices = pricing[category]
    return Object.keys(prices).map(key => ({
      value: key,
      label: serviceLabels[key],
      price: prices[key]
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => {
      const newData = { ...prev, [name]: value }
      if (name === 'carCategory') {
        newData.serviceType = ''
        newData.amount = ''
      }
      if (name === 'serviceType' && newData.carCategory) {
        const services = getServicesForCategory(newData.carCategory)
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
          serviceType: formData.serviceType,
          carCategory: formData.carCategory
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

  const services = getServicesForCategory(formData.carCategory)

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

            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              background: 'rgba(200, 157, 42, 0.1)', 
              borderRadius: '10px',
              border: '1px solid rgba(200, 157, 42, 0.3)'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#C89D2A', fontSize: '0.95rem' }}>
                {language === 'ar' ? 'الأسعار حسب فئة السيارة:' : 'Prices by Car Category:'}
              </h4>
              <div style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.6' }}>
                <div><strong>{language === 'ar' ? 'صالون:' : 'Sedan:'}</strong> 200-500 {t.common.aed}</div>
                <div><strong>{language === 'ar' ? 'دفع رباعي:' : 'SUV:'}</strong> 200-600 {t.common.aed}</div>
                <div><strong>{language === 'ar' ? 'فاخرة:' : 'Luxury:'}</strong> 200-700 {t.common.aed}</div>
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
                <label><Car size={18} /> {language === 'ar' ? 'فئة السيارة' : 'Car Category'}</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '10px' }}>
                  {carCategories.map(cat => {
                    const Icon = cat.icon
                    const isSelected = formData.carCategory === cat.value
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => handleChange({ target: { name: 'carCategory', value: cat.value } })}
                        style={{
                          padding: '15px 10px',
                          border: isSelected ? '2px solid #C89D2A' : '2px solid #e0e0e0',
                          borderRadius: '12px',
                          background: isSelected ? 'rgba(200, 157, 42, 0.1)' : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <Icon size={24} color={isSelected ? '#C89D2A' : '#666'} />
                        <span style={{ 
                          fontSize: '0.8rem', 
                          fontWeight: isSelected ? '600' : '500',
                          color: isSelected ? '#0B1F3A' : '#666',
                          textAlign: 'center'
                        }}>{cat.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {formData.carCategory && (
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
              )}

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
