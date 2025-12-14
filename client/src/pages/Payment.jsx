import { useState } from 'react'
import { CreditCard, User, Phone, Mail, Shield, CheckCircle, Car, Truck, Crown, Star, Lock, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import sedanImg from '../assets/cars/sedan.png'
import suvImg from '../assets/cars/suv.png'
import classicImg from '../assets/cars/classic.png'
import luxuryImg from '../assets/cars/luxury.png'
import vipImg from '../assets/cars/vip.png'

function Payment() {
  const { language, t } = useLanguage()
  const [step, setStep] = useState(0)
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

  const isRtl = language === 'ar' || language === 'ur' || language === 'fa'

  const carCategories = [
    { value: 'sedan', label: language === 'ar' ? 'السيارات الصالون' : 'Sedan', desc: language === 'ar' ? 'سيارات عادية' : 'Regular Cars', image: sedanImg },
    { value: 'suv', label: language === 'ar' ? 'سيارات الدفع الرباعي' : '4WD / SUV', desc: language === 'ar' ? 'سيارات كبيرة' : 'Large Vehicles', image: suvImg },
    { value: 'classic', label: language === 'ar' ? 'السيارات الكلاسيكية' : 'Classic', desc: language === 'ar' ? 'سيارات كلاسيكية' : 'Classic Cars', image: classicImg, hasPlus: true },
    { value: 'luxury', label: language === 'ar' ? 'السيارات الفاخرة' : 'Luxury', desc: language === 'ar' ? 'سيارات فاخرة' : 'Luxury Cars', image: luxuryImg },
    { value: 'vip', label: language === 'ar' ? 'VIP' : 'VIP', desc: language === 'ar' ? 'خدمة مميزة' : 'Premium Service', image: vipImg }
  ]

  const pricing = {
    sedan: { full: 500, mechanical: 250, misc: 200, basic: 300 },
    suv: { full: 600, mechanical: 300, misc: 200, basic: 400 },
    classic: { full: 600, mechanical: 350, misc: 200, basic: 400 },
    luxury: { full: 700, mechanical: 350, misc: 200, basic: 500 },
    vip: { full: 1000, mechanical: 500, misc: 300, basic: 700 }
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

  const serviceIcons = {
    full: '🔍',
    mechanical: '⚙️',
    misc: '🔧',
    basic: '📋'
  }

  const getServicesForCategory = (category) => {
    if (!category || !pricing[category]) return []
    const prices = pricing[category]
    return Object.keys(prices).map(key => ({
      value: key,
      label: serviceLabels[key],
      price: prices[key],
      icon: serviceIcons[key]
    }))
  }

  const handleCategorySelect = (category) => {
    setFormData(prev => ({
      ...prev,
      carCategory: category,
      serviceType: '',
      amount: ''
    }))
    setStep(1)
  }

  const handleServiceSelect = (serviceValue) => {
    const services = getServicesForCategory(formData.carCategory)
    const service = services.find(s => s.value === serviceValue)
    setFormData(prev => ({
      ...prev,
      serviceType: serviceValue,
      amount: service ? service.price.toString() : ''
    }))
    setStep(2)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
  const selectedCategory = carCategories.find(c => c.value === formData.carCategory)
  const selectedService = services.find(s => s.value === formData.serviceType)

  const steps = [
    { title: language === 'ar' ? 'فئة السيارة' : 'Car Category', icon: '🚗' },
    { title: language === 'ar' ? 'نوع الخدمة' : 'Service Type', icon: '⚙️' },
    { title: language === 'ar' ? 'بيانات الدفع' : 'Payment Details', icon: '💳' }
  ]

  return (
    <div className="payment-page-new" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="payment-hero-new">
        <div className="payment-hero-content">
          <div className="payment-badge">
            <Lock size={16} />
            <span>{t.payment.badge}</span>
          </div>
          <h1>{t.payment.title}</h1>
          <p>{t.payment.subtitle}</p>
        </div>
        <div className="payment-hero-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
        </div>
      </div>

      <div className="payment-wizard-container">
        <div className="payment-progress">
          {steps.map((s, index) => (
            <div 
              key={index} 
              className={`progress-step ${step >= index ? 'active' : ''} ${step === index ? 'current' : ''}`}
              onClick={() => step > index && setStep(index)}
            >
              <div className="step-number">
                {step > index ? <CheckCircle size={18} /> : <span>{s.icon}</span>}
              </div>
              <span className="step-label">{s.title}</span>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>

        <div className="payment-wizard-content">
          {step === 0 && (
            <div className="wizard-step step-category">
              <h2>{language === 'ar' ? 'اختر فئة سيارتك' : 'Select Your Car Category'}</h2>
              <p className="step-description">
                {language === 'ar' ? '👆 انقر واختر الفئة المطلوبة - الأسعار تختلف حسب نوع السيارة' : '👆 Click to select - Prices vary based on vehicle type'}
              </p>
              <div className="category-grid">
                {carCategories.map(cat => (
                  <div
                    key={cat.value}
                    className={`category-card ${formData.carCategory === cat.value ? 'selected' : ''}`}
                    onClick={() => handleCategorySelect(cat.value)}
                  >
                    <div className="category-icon">
                      <img 
                        src={cat.image} 
                        alt={cat.label}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                    <h3>
                      {cat.label}
                      {cat.hasPlus && <span style={{ color: '#C89D2A', marginRight: '5px', marginLeft: '5px' }}>+</span>}
                    </h3>
                    <p>{cat.desc}</p>
                    <div className="category-price-range">
                      {pricing[cat.value].misc} - {pricing[cat.value].full}{cat.hasPlus && '+'} {t.common.aed}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="wizard-step step-service">
              <div className="step-header">
                <button className="back-btn" onClick={() => setStep(0)}>
                  {isRtl ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                  {language === 'ar' ? 'رجوع' : 'Back'}
                </button>
              </div>
              <h2>{language === 'ar' ? 'اختر نوع الخدمة' : 'Select Service Type'}</h2>
              <p className="step-description">
                {language === 'ar' ? `أسعار ${selectedCategory?.label}` : `${selectedCategory?.label} Pricing`}
              </p>
              <div className="service-grid">
                {services.map(service => (
                  <div
                    key={service.value}
                    className={`service-card ${formData.serviceType === service.value ? 'selected' : ''}`}
                    onClick={() => handleServiceSelect(service.value)}
                  >
                    <div className="service-icon">{service.icon}</div>
                    <h3>{service.label}</h3>
                    <div className="service-price">
                      <span className="price-value">{service.price}</span>
                      {formData.carCategory === 'classic' && <span className="price-prefix" style={{ color: '#C89D2A', fontWeight: 'bold' }}>+</span>}
                      <span className="price-currency">{t.common.aed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="wizard-step step-details">
              <div className="step-header">
                <button className="back-btn" onClick={() => setStep(1)}>
                  {isRtl ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                  {language === 'ar' ? 'رجوع' : 'Back'}
                </button>
              </div>
              
              <div className="payment-layout">
                <div className="payment-form-section">
                  <h2>{language === 'ar' ? 'بياناتك' : 'Your Details'}</h2>
                  
                  {error && (
                    <div className="error-alert">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="payment-form-new">
                    <div className="form-field">
                      <label>
                        <User size={18} />
                        {t.payment.name}
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                        placeholder={t.payment.namePlaceholder}
                      />
                    </div>

                    <div className="form-field">
                      <label>
                        <Phone size={18} />
                        {t.payment.phone}
                      </label>
                      <input
                        type="tel"
                        name="customerPhone"
                        value={formData.customerPhone}
                        onChange={handleChange}
                        required
                        placeholder="05XXXXXXXX"
                      />
                    </div>

                    <div className="form-field">
                      <label>
                        <Mail size={18} />
                        {t.payment.email}
                      </label>
                      <input
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        placeholder="example@email.com"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="submit-payment-btn" 
                      disabled={loading || !formData.customerName || !formData.customerPhone}
                    >
                      {loading ? (
                        <>
                          <div className="spinner"></div>
                          {t.payment.processing}
                        </>
                      ) : (
                        <>
                          <Lock size={20} />
                          {t.payment.payNow}
                          <span className="btn-amount">{formData.amount} {t.common.aed}</span>
                        </>
                      )}
                    </button>

                    <p className="redirect-note">
                      <Shield size={14} />
                      {language === 'ar' ? 'سيتم تحويلك إلى Stripe للدفع الآمن' : 'You will be redirected to Stripe for secure payment'}
                    </p>
                  </form>
                </div>

                <div className="order-summary">
                  <h3>{language === 'ar' ? 'ملخص الطلب' : 'Order Summary'}</h3>
                  
                  <div className="summary-item">
                    <span className="summary-label">{language === 'ar' ? 'فئة السيارة' : 'Car Category'}</span>
                    <span className="summary-value">{selectedCategory?.label}</span>
                  </div>
                  
                  <div className="summary-item">
                    <span className="summary-label">{language === 'ar' ? 'نوع الخدمة' : 'Service Type'}</span>
                    <span className="summary-value">{selectedService?.icon} {selectedService?.label}</span>
                  </div>
                  
                  <div className="summary-divider"></div>
                  
                  <div className="summary-total">
                    <span>{language === 'ar' ? 'الإجمالي' : 'Total'}</span>
                    <span className="total-value">{formData.amount} {t.common.aed}</span>
                  </div>

                  <div className="security-features">
                    <div className="security-item">
                      <CheckCircle size={16} />
                      <span>{t.payment.secureStripe}</span>
                    </div>
                    <div className="security-item">
                      <CheckCircle size={16} />
                      <span>{t.payment.cards}</span>
                    </div>
                    <div className="security-item">
                      <CheckCircle size={16} />
                      <span>{t.payment.ssl}</span>
                    </div>
                    <div className="security-item">
                      <CheckCircle size={16} />
                      <span>{t.payment.receipt}</span>
                    </div>
                  </div>

                  <div className="accepted-cards-new">
                    <span>{language === 'ar' ? 'البطاقات المقبولة' : 'Accepted Cards'}</span>
                    <div className="cards-logos">
                      <div className="card-logo visa">VISA</div>
                      <div className="card-logo mastercard">MC</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .payment-page-new {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
        }

        .payment-hero-new {
          background: linear-gradient(135deg, #0B1F3A 0%, #1a3a5c 100%);
          padding: 80px 24px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .payment-hero-content {
          position: relative;
          z-index: 2;
        }

        .payment-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(200, 157, 42, 0.2);
          color: #C89D2A;
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 20px;
          border: 1px solid rgba(200, 157, 42, 0.3);
        }

        .payment-hero-new h1 {
          color: white;
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0 0 15px 0;
        }

        .payment-hero-new p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.1rem;
          margin: 0;
        }

        .payment-hero-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .decoration-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(200, 157, 42, 0.1);
        }

        .circle-1 {
          width: 300px;
          height: 300px;
          top: -100px;
          right: -50px;
        }

        .circle-2 {
          width: 200px;
          height: 200px;
          bottom: -50px;
          left: -50px;
        }

        .payment-wizard-container {
          max-width: 1000px;
          margin: -30px auto 60px;
          padding: 0 24px;
          position: relative;
          z-index: 10;
        }

        .payment-progress {
          display: flex;
          justify-content: center;
          align-items: center;
          background: white;
          padding: 20px 40px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 30px;
          gap: 10px;
          flex-wrap: wrap;
        }

        .progress-step {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .progress-step.active {
          opacity: 1;
        }

        .progress-step.current .step-number {
          background: #C89D2A;
          color: white;
          transform: scale(1.1);
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e8e8e8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .progress-step.active .step-number {
          background: #0B1F3A;
          color: white;
        }

        .step-label {
          font-weight: 600;
          color: #0B1F3A;
          font-size: 0.9rem;
        }

        .step-connector {
          width: 40px;
          height: 3px;
          background: #e8e8e8;
          margin: 0 10px;
        }

        .progress-step.active + .step-connector,
        .progress-step.active .step-connector {
          background: #0B1F3A;
        }

        .payment-wizard-content {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
          padding: 40px;
        }

        .wizard-step h2 {
          text-align: center;
          color: #0B1F3A;
          font-size: 1.8rem;
          margin: 0 0 10px 0;
        }

        .step-description {
          text-align: center;
          color: #666;
          margin: 0 0 30px 0;
        }

        .step-header {
          margin-bottom: 20px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: #0B1F3A;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          padding: 10px 0;
          transition: color 0.3s ease;
        }

        .back-btn:hover {
          color: #C89D2A;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .category-card {
          background: #f8f9fa;
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 30px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-card:hover {
          border-color: #C89D2A;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(200, 157, 42, 0.15);
        }

        .category-card.selected {
          border-color: #C89D2A;
          background: rgba(200, 157, 42, 0.08);
        }

        .category-icon {
          margin-bottom: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .price-prefix {
          color: #C89D2A;
          font-weight: 700;
          font-size: 1rem;
          margin-right: 2px;
        }

        .category-card h3 {
          margin: 0 0 8px 0;
          color: #0B1F3A;
          font-size: 1.1rem;
        }

        .category-card p {
          margin: 0 0 15px 0;
          color: #666;
          font-size: 0.85rem;
        }

        .category-price-range {
          background: #0B1F3A;
          color: #C89D2A;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-block;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
        }

        .service-card {
          background: #f8f9fa;
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 25px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .service-card:hover {
          border-color: #C89D2A;
          transform: translateY(-5px);
        }

        .service-card.selected {
          border-color: #C89D2A;
          background: rgba(200, 157, 42, 0.08);
        }

        .service-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .service-card h3 {
          margin: 0 0 15px 0;
          color: #0B1F3A;
          font-size: 1rem;
        }

        .service-price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 5px;
        }

        .price-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #C89D2A;
        }

        .price-currency {
          color: #666;
          font-size: 0.9rem;
        }

        .payment-layout {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 40px;
        }

        @media (max-width: 900px) {
          .payment-layout {
            grid-template-columns: 1fr;
          }
          
          .order-summary {
            order: -1;
          }
        }

        .payment-form-section h2 {
          text-align: left;
          font-size: 1.5rem;
          margin-bottom: 25px;
        }

        [dir="rtl"] .payment-form-section h2 {
          text-align: right;
        }

        .error-alert {
          background: #fee2e2;
          color: #dc2626;
          padding: 15px 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .payment-form-new {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-field label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #0B1F3A;
          margin-bottom: 8px;
          font-size: 0.95rem;
        }

        .form-field input {
          width: 100%;
          padding: 15px 18px;
          border: 2px solid #e8e8e8;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .form-field input:focus {
          outline: none;
          border-color: #C89D2A;
          background: white;
        }

        .submit-payment-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(135deg, #C89D2A 0%, #a8822a 100%);
          color: white;
          border: none;
          padding: 18px 30px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .submit-payment-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(200, 157, 42, 0.3);
        }

        .submit-payment-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-amount {
          background: rgba(255, 255, 255, 0.2);
          padding: 5px 12px;
          border-radius: 8px;
          font-size: 0.95rem;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .redirect-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #666;
          font-size: 0.85rem;
          margin: 0;
        }

        .order-summary {
          background: #f8f9fa;
          border-radius: 16px;
          padding: 25px;
          height: fit-content;
        }

        .order-summary h3 {
          margin: 0 0 20px 0;
          color: #0B1F3A;
          font-size: 1.2rem;
          padding-bottom: 15px;
          border-bottom: 2px solid #e8e8e8;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
        }

        .summary-label {
          color: #666;
          font-size: 0.9rem;
        }

        .summary-value {
          color: #0B1F3A;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .summary-divider {
          height: 2px;
          background: #e8e8e8;
          margin: 10px 0;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .total-value {
          color: #C89D2A;
          font-size: 1.4rem;
        }

        .security-features {
          background: white;
          border-radius: 12px;
          padding: 15px;
          margin-top: 20px;
        }

        .security-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          color: #34A853;
          font-size: 0.85rem;
        }

        .accepted-cards-new {
          margin-top: 20px;
          text-align: center;
        }

        .accepted-cards-new span {
          display: block;
          color: #666;
          font-size: 0.8rem;
          margin-bottom: 10px;
        }

        .cards-logos {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .card-logo {
          padding: 8px 15px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.8rem;
        }

        .card-logo.visa {
          background: #1A1F71;
          color: white;
        }

        .card-logo.mastercard {
          background: linear-gradient(135deg, #EB001B 0%, #F79E1B 100%);
          color: white;
        }

        @media (max-width: 600px) {
          .payment-hero-new {
            padding: 60px 16px 50px;
          }
          
          .payment-hero-new h1 {
            font-size: 1.8rem;
          }

          .payment-progress {
            padding: 15px 20px;
          }

          .step-label {
            display: none;
          }

          .step-connector {
            width: 20px;
          }

          .payment-wizard-content {
            padding: 25px 20px;
          }

          .category-grid,
          .service-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .category-card,
          .service-card {
            padding: 20px 15px;
          }

          .category-icon svg {
            width: 60px !important;
            height: 30px !important;
          }

          .service-icon {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Payment
