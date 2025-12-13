import { useState, useRef, useEffect } from 'react'
import { Car, Calendar, Clock, ChevronLeft, ChevronRight, Check, Shield, Settings, Eye, FileCheck, Phone, MessageCircle, PhoneCall, PenTool } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

function Booking() {
  const { language, t } = useLanguage()
  const isRTL = language === 'ar' || language === 'ur' || language === 'fa'
  
  const serviceTypes = [
    { id: 'full', icon: <Shield size={20} />, title: 'الفحص الشامل', titleEn: 'Full Inspection', price: '500', color: '#C89D2A' },
    { id: 'mechanical', icon: <Settings size={20} />, title: 'ميكانيكا + كمبيوتر', titleEn: 'Mechanical + Computer', price: '250', color: '#4285F4' },
    { id: 'misc', icon: <Eye size={20} />, title: 'فحوصات متنوعة', titleEn: 'Various Tests', price: '200', color: '#34A853' },
    { id: 'basic', icon: <FileCheck size={20} />, title: 'الأجزاء الأساسية', titleEn: 'Basic Parts', price: '300', color: '#EA4335' }
  ]

  const contactMethods = [
    { id: 'whatsapp', icon: <MessageCircle size={18} />, label: language === 'ar' ? 'واتساب' : 'WhatsApp', color: '#25D366' },
    { id: 'call', icon: <PhoneCall size={18} />, label: language === 'ar' ? 'اتصال' : 'Call', color: '#4285F4' },
    { id: 'both', icon: <Phone size={18} />, label: language === 'ar' ? 'الاثنين' : 'Both', color: '#C89D2A' }
  ]

  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ]

  const [formData, setFormData] = useState({
    name: '', phone: '', carBrand: '', carModel: '', carYear: '', contactMethod: ''
  })
  const [success, setSuccess] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [bookedSlots, setBookedSlots] = useState([])
  const [step, setStep] = useState(0)
  const [selectedService, setSelectedService] = useState(null)
  const [signature, setSignature] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate)
    }
  }, [selectedDate])

  useEffect(() => {
    if (step === 3 && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = '#0B1F3A'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
    }
  }, [step])

  const fetchBookedSlots = async (date) => {
    try {
      const dateStr = date.toISOString().split('T')[0]
      const res = await fetch(`/api/slots?date=${dateStr}`)
      const data = await res.json()
      setBookedSlots(data.bookedSlots || [])
    } catch (error) {
      console.error('Error fetching slots:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null)
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i))
    return days
  }

  const isDateDisabled = (date) => {
    if (!date) return true
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today || date.getDay() === 5
  }

  const formatDate = (date) => {
    return date.toLocaleDateString(language === 'ar' ? 'ar-AE' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  const monthNames = language === 'ar' 
    ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = language === 'ar' 
    ? ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const startDrawing = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top
    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
  }

  const draw = (e) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (isDrawing && canvasRef.current) {
      setSignature(canvasRef.current.toDataURL())
    }
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setSignature(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !selectedService || !formData.contactMethod) {
      alert(language === 'ar' ? 'الرجاء إكمال جميع البيانات' : 'Please complete all fields')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          serviceType: selectedService.id,
          preferredDate: selectedDate.toISOString().split('T')[0],
          preferredTime: selectedTime,
          signature: signature
        })
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setBookingId(data.bookingId || '')
      }
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
  }

  const isSlotBooked = (time) => bookedSlots.includes(time)

  const canProceed = () => {
    if (step === 0) return selectedService
    if (step === 1) return selectedDate
    if (step === 2) return selectedTime
    if (step === 3) return formData.name && formData.phone && formData.carBrand && formData.carModel && formData.carYear && formData.contactMethod
    return false
  }

  const stepLabels = language === 'ar' 
    ? ['الخدمة', 'التاريخ', 'الوقت', 'البيانات']
    : ['Service', 'Date', 'Time', 'Details']

  return (
    <div className="simple-booking">
      <div className="booking-header-compact">
        <h1>{language === 'ar' ? 'حجز موعد فحص' : 'Book Inspection'}</h1>
        <p>{language === 'ar' ? 'اختر الخدمة والموعد المناسب' : 'Choose service and time'}</p>
      </div>

      {success ? (
        <div className="success-box">
          <div className="success-icon"><Check size={40} /></div>
          <h2>{language === 'ar' ? 'تم الحجز بنجاح!' : 'Booking Confirmed!'}</h2>
          <p className="booking-code">{bookingId}</p>
          <div className="success-message">
            <p style={{ fontSize: '1.1rem', color: '#0B1F3A', lineHeight: '1.8' }}>
              {language === 'ar' 
                ? '🎉 شكراً لاختيارك مركز الأمان العالي الدولي! سيتم التواصل معك خلال 30 دقيقة لتأكيد موعدك.'
                : '🎉 Thank you for choosing High Safety International! We will contact you within 30 minutes to confirm your appointment.'}
            </p>
            <div style={{ 
              background: 'linear-gradient(135deg, #0B1F3A, #1a365d)', 
              color: 'white', 
              padding: '15px 20px', 
              borderRadius: '12px',
              marginTop: '15px'
            }}>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>
                📞 {formData.contactMethod === 'whatsapp' 
                  ? (language === 'ar' ? 'سنتواصل معك عبر واتساب' : 'We will contact you via WhatsApp')
                  : formData.contactMethod === 'call'
                  ? (language === 'ar' ? 'سنتصل بك هاتفياً' : 'We will call you')
                  : (language === 'ar' ? 'سنتواصل معك عبر واتساب والهاتف' : 'We will contact you via WhatsApp and phone')}
              </p>
            </div>
          </div>
          <button onClick={() => { setSuccess(false); setStep(0); setSelectedService(null); setSelectedDate(null); setSelectedTime(null); setSignature(null); setFormData({ name: '', phone: '', carBrand: '', carModel: '', carYear: '', contactMethod: '' }); }}>
            {language === 'ar' ? 'حجز جديد' : 'New Booking'}
          </button>
        </div>
      ) : (
        <div className="booking-container">
          <div className="steps-indicator">
            {stepLabels.map((label, i) => (
              <div key={i} className={`step-dot ${step >= i ? 'active' : ''} ${step === i ? 'current' : ''}`}>
                <span className="dot">{i + 1}</span>
                <span className="label">{label}</span>
              </div>
            ))}
          </div>

          <div className="step-content">
            {step === 0 && (
              <div className="services-compact">
                {serviceTypes.map(s => (
                  <div 
                    key={s.id} 
                    className={`service-item ${selectedService?.id === s.id ? 'selected' : ''}`}
                    onClick={() => setSelectedService(s)}
                    style={{ borderColor: selectedService?.id === s.id ? s.color : 'transparent' }}
                  >
                    <div className="service-icon" style={{ background: s.color }}>{s.icon}</div>
                    <div className="service-info">
                      <strong>{language === 'ar' ? s.title : s.titleEn}</strong>
                      <small>{language === 'ar' ? s.titleEn : s.title}</small>
                    </div>
                    <div className="service-price">{s.price} <small>{language === 'ar' ? 'درهم' : 'AED'}</small></div>
                    {selectedService?.id === s.id && <Check size={18} className="check-mark" style={{ color: s.color }} />}
                  </div>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="calendar-compact">
                <div className="month-nav">
                  <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}><ChevronRight size={20} /></button>
                  <span>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                  <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}><ChevronLeft size={20} /></button>
                </div>
                <div className="days-header">
                  {dayNames.map(d => <span key={d}>{d}</span>)}
                </div>
                <div className="days-grid">
                  {getDaysInMonth(currentMonth).map((day, i) => (
                    <button
                      key={i}
                      className={`day-btn ${!day ? 'empty' : ''} ${isDateDisabled(day) ? 'disabled' : ''} ${selectedDate?.toDateString() === day?.toDateString() ? 'selected' : ''}`}
                      onClick={() => day && !isDateDisabled(day) && setSelectedDate(day)}
                      disabled={!day || isDateDisabled(day)}
                    >
                      {day?.getDate() || ''}
                    </button>
                  ))}
                </div>
                <p style={{ textAlign: 'center', color: '#EA4335', fontSize: '0.85rem', marginTop: '10px' }}>
                  {language === 'ar' ? '⚠️ يوم الجمعة إجازة' : '⚠️ Friday is closed'}
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="times-compact">
                <p className="selected-date-label">
                  <Calendar size={16} /> {formatDate(selectedDate)}
                </p>
                <p style={{ textAlign: 'center', color: '#666', fontSize: '0.85rem', marginBottom: '15px' }}>
                  {language === 'ar' ? 'ساعات العمل: 10 صباحاً - 10 مساءً' : 'Working hours: 10 AM - 10 PM'}
                </p>
                <div className="times-grid">
                  {timeSlots.map(t => (
                    <button
                      key={t}
                      className={`time-btn ${isSlotBooked(t) ? 'booked' : ''} ${selectedTime === t ? 'selected' : ''}`}
                      onClick={() => !isSlotBooked(t) && setSelectedTime(t)}
                      disabled={isSlotBooked(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <form className="form-compact" onSubmit={handleSubmit}>
                <div className="summary-bar">
                  <span style={{ background: selectedService?.color }}>{language === 'ar' ? selectedService?.title : selectedService?.titleEn}</span>
                  <span><Calendar size={14} /> {formatDate(selectedDate)}</span>
                  <span><Clock size={14} /> {selectedTime}</span>
                </div>
                <div className="form-grid">
                  <input 
                    name="name" 
                    placeholder={language === 'ar' ? 'الاسم الكامل' : 'Full Name'} 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                  <input 
                    name="phone" 
                    placeholder={language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                  />
                  
                  <div className="contact-method-section">
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#0B1F3A' }}>
                      {language === 'ar' ? 'طريقة التواصل المفضلة' : 'Preferred Contact Method'}
                    </label>
                    <div className="contact-methods">
                      {contactMethods.map(method => (
                        <button
                          key={method.id}
                          type="button"
                          className={`contact-method-btn ${formData.contactMethod === method.id ? 'selected' : ''}`}
                          onClick={() => setFormData({ ...formData, contactMethod: method.id })}
                          style={{
                            borderColor: formData.contactMethod === method.id ? method.color : '#ddd',
                            background: formData.contactMethod === method.id ? `${method.color}15` : 'white'
                          }}
                        >
                          <span style={{ color: method.color }}>{method.icon}</span>
                          <span>{method.label}</span>
                          {formData.contactMethod === method.id && <Check size={16} style={{ color: method.color }} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input 
                    name="carBrand" 
                    placeholder={language === 'ar' ? 'ماركة السيارة (مثال: تويوتا)' : 'Car Brand (e.g., Toyota)'} 
                    value={formData.carBrand} 
                    onChange={handleChange} 
                    required 
                  />
                  <input 
                    name="carModel" 
                    placeholder={language === 'ar' ? 'موديل السيارة (مثال: كامري)' : 'Car Model (e.g., Camry)'} 
                    value={formData.carModel} 
                    onChange={handleChange} 
                    required 
                  />
                  <input 
                    name="carYear" 
                    type="number"
                    min="1980"
                    max="2025"
                    placeholder={language === 'ar' ? 'سنة الصنع (مثال: 2020)' : 'Year (e.g., 2020)'} 
                    value={formData.carYear} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="signature-section">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontWeight: '600', color: '#0B1F3A' }}>
                    <PenTool size={18} />
                    {language === 'ar' ? 'توقيع العميل' : 'Customer Signature'}
                  </label>
                  <div className="signature-box">
                    <canvas
                      ref={canvasRef}
                      width={300}
                      height={120}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      style={{
                        border: '2px dashed #C89D2A',
                        borderRadius: '10px',
                        cursor: 'crosshair',
                        touchAction: 'none'
                      }}
                    />
                    <button 
                      type="button" 
                      onClick={clearSignature}
                      className="clear-signature-btn"
                    >
                      {language === 'ar' ? 'مسح التوقيع' : 'Clear'}
                    </button>
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading 
                    ? (language === 'ar' ? 'جاري الحجز...' : 'Booking...') 
                    : (language === 'ar' ? 'تأكيد الحجز' : 'Confirm Booking')}
                </button>
              </form>
            )}
          </div>

          <div className="nav-buttons">
            {step > 0 && (
              <button className="back-btn" onClick={() => setStep(step - 1)}>
                {isRTL ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                {language === 'ar' ? 'السابق' : 'Back'}
              </button>
            )}
            {step < 3 && (
              <button className="next-btn" onClick={() => setStep(step + 1)} disabled={!canProceed()}>
                {language === 'ar' ? 'التالي' : 'Next'}
                {isRTL ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        .contact-method-section {
          grid-column: 1 / -1;
          margin: 15px 0;
        }
        .contact-methods {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .contact-method-btn {
          flex: 1;
          min-width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 15px;
          border: 2px solid #ddd;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        .contact-method-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .contact-method-btn.selected {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }
        .signature-section {
          grid-column: 1 / -1;
          margin: 20px 0;
        }
        .signature-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .clear-signature-btn {
          background: #f0f0f0;
          border: none;
          padding: 8px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.85rem;
          color: #666;
          transition: all 0.3s ease;
        }
        .clear-signature-btn:hover {
          background: #e0e0e0;
        }
        .success-message {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 15px;
          margin: 15px 0;
        }
        @media (max-width: 600px) {
          .contact-methods {
            flex-direction: column;
          }
          .contact-method-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default Booking
