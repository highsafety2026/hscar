import { useState, useRef, useEffect } from 'react'
import { Calendar, Clock, ChevronLeft, ChevronRight, Check, Shield, Settings, Eye, FileCheck, Phone, MessageCircle, PhoneCall, PenTool, Star, Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import sedanImg from '../assets/cars/sedan.png'
import suvImg from '../assets/cars/suv.png'
import classicImg from '../assets/cars/classic.png'
import luxuryImg from '../assets/cars/luxury.png'
import vipImg from '../assets/cars/vip.png'

function Booking() {
  const { language, t } = useLanguage()
  const isRTL = language === 'ar' || language === 'ur' || language === 'fa' || language === 'he'

  const carCategories = [
    { 
      id: 'sedan', 
      title: 'صالون', 
      titleEn: 'Sedan',
      color: '#4285F4',
      gradient: 'linear-gradient(135deg, #4285F4 0%, #1a73e8 100%)',
      image: sedanImg
    },
    { 
      id: 'suv', 
      title: 'دفع رباعي', 
      titleEn: 'SUV / 4WD',
      color: '#34A853',
      gradient: 'linear-gradient(135deg, #34A853 0%, #1e8e3e 100%)',
      image: suvImg
    },
    { 
      id: 'classic', 
      title: 'كلاسيك', 
      titleEn: 'Classic',
      color: '#FF6B35',
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #e55a2b 100%)',
      image: classicImg,
      hasPlus: true
    },
    { 
      id: 'luxury', 
      title: 'فاخرة', 
      titleEn: 'Luxury',
      color: '#9C27B0',
      gradient: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
      image: luxuryImg
    },
    { 
      id: 'vip', 
      title: 'VIP', 
      titleEn: 'VIP',
      color: '#C89D2A',
      gradient: 'linear-gradient(135deg, #C89D2A 0%, #9a7b1f 100%)',
      image: vipImg
    }
  ]

  const pricing = {
    sedan: { full: 500, mechanical: 250, misc: 200, basic: 300 },
    suv: { full: 600, mechanical: 300, misc: 200, basic: 400 },
    classic: { full: 600, mechanical: 350, misc: 200, basic: 400 },
    luxury: { full: 700, mechanical: 350, misc: 200, basic: 500 },
    vip: { full: 1000, mechanical: 500, misc: 300, basic: 700 }
  }

  const serviceTypes = [
    { id: 'full', icon: <Shield size={22} />, title: 'الفحص الشامل', titleEn: 'Full Inspection', color: '#C89D2A' },
    { id: 'mechanical', icon: <Settings size={22} />, title: 'ميكانيكا + كمبيوتر', titleEn: 'Mechanical + Computer', color: '#4285F4' },
    { id: 'basic', icon: <FileCheck size={22} />, title: 'الأجزاء الأساسية', titleEn: 'Basic Parts', color: '#EA4335' },
    { id: 'misc', icon: <Eye size={22} />, title: 'فحوصات متنوعة', titleEn: 'Various Tests', color: '#34A853' }
  ]

  const contactMethods = [
    { id: 'whatsapp', icon: <MessageCircle size={20} />, label: language === 'ar' ? 'واتساب' : 'WhatsApp', color: '#25D366' },
    { id: 'call', icon: <PhoneCall size={20} />, label: language === 'ar' ? 'اتصال' : 'Call', color: '#4285F4' },
    { id: 'both', icon: <Phone size={20} />, label: language === 'ar' ? 'الاثنين' : 'Both', color: '#C89D2A' }
  ]

  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00'
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
  const [selectedCarCategory, setSelectedCarCategory] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [signature, setSignature] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null)

  const getServicePrice = (serviceId) => {
    if (!selectedCarCategory) return '---'
    return pricing[selectedCarCategory.id][serviceId]
  }

  const getTotalPrice = () => {
    if (!selectedCarCategory || !selectedService) return 0
    return pricing[selectedCarCategory.id][selectedService.id]
  }

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
    if (!selectedDate || !selectedTime || !selectedService || !selectedCarCategory || !formData.contactMethod) {
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
          carCategory: selectedCarCategory.id,
          totalPrice: getTotalPrice(),
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
    if (step === 0) return selectedCarCategory && selectedService
    if (step === 1) return selectedDate
    if (step === 2) return selectedTime
    if (step === 3) return formData.name && formData.phone && formData.carBrand && formData.carModel && formData.carYear && formData.contactMethod
    return false
  }

  const stepLabels = language === 'ar' 
    ? ['الخدمة', 'التاريخ', 'الوقت', 'البيانات']
    : ['Service', 'Date', 'Time', 'Details']

  const resetBooking = () => {
    setSuccess(false)
    setStep(0)
    setSelectedCarCategory(null)
    setSelectedService(null)
    setSelectedDate(null)
    setSelectedTime(null)
    setSignature(null)
    setFormData({ name: '', phone: '', carBrand: '', carModel: '', carYear: '', contactMethod: '' })
  }

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>{language === 'ar' ? 'احجز موعدك الآن' : 'Book Your Appointment'}</span>
          </div>
          <h1>{language === 'ar' ? 'حجز موعد الفحص' : 'Book Inspection'}</h1>
          <p>{language === 'ar' ? 'اختر فئة سيارتك ونوع الفحص المناسب' : 'Select your car category and inspection type'}</p>
        </div>
      </div>

      <div className="booking-content">
        {success ? (
          <div className="success-container">
            <div className="success-card">
              <div className="success-icon-wrapper">
                <div className="success-icon"><Check size={50} /></div>
              </div>
              <h2>{language === 'ar' ? 'تم الحجز بنجاح!' : 'Booking Confirmed!'}</h2>
              <p className="booking-code">{bookingId}</p>
              <div className="success-details">
                <div className="detail-row">
                  <span className="detail-label">{language === 'ar' ? 'فئة السيارة' : 'Car Category'}</span>
                  <span className="detail-value">{language === 'ar' ? selectedCarCategory?.title : selectedCarCategory?.titleEn}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{language === 'ar' ? 'نوع الفحص' : 'Inspection Type'}</span>
                  <span className="detail-value">{language === 'ar' ? selectedService?.title : selectedService?.titleEn}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{language === 'ar' ? 'التاريخ' : 'Date'}</span>
                  <span className="detail-value">{selectedDate && formatDate(selectedDate)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{language === 'ar' ? 'الوقت' : 'Time'}</span>
                  <span className="detail-value">{selectedTime}</span>
                </div>
                <div className="detail-row total">
                  <span className="detail-label">{language === 'ar' ? 'السعر' : 'Price'}</span>
                  <span className="detail-value">{getTotalPrice()} {language === 'ar' ? 'درهم' : 'AED'}</span>
                </div>
              </div>
              <div className="success-message">
                <p>
                  {language === 'ar' 
                    ? 'شكراً لاختيارك مركز الأمان العالي الدولي! سيتم التواصل معك خلال 30 دقيقة لتأكيد موعدك.'
                    : 'Thank you for choosing High Safety International! We will contact you within 30 minutes to confirm your appointment.'}
                </p>
              </div>
              <button className="new-booking-btn" onClick={resetBooking}>
                {language === 'ar' ? 'حجز جديد' : 'New Booking'}
              </button>
            </div>
          </div>
        ) : (
          <div className="booking-wizard">
            <div className="wizard-progress">
              {stepLabels.map((label, i) => (
                <div key={i} className={`progress-step ${step >= i ? 'active' : ''} ${step === i ? 'current' : ''}`}>
                  <div className="step-number">{i + 1}</div>
                  <span className="step-label">{label}</span>
                  {i < stepLabels.length - 1 && <div className="step-connector"></div>}
                </div>
              ))}
            </div>

            <div className="wizard-content">
              {step === 0 && (
                <div className="step-service">
                  <div className="section-block">
                    <h3 className="section-title">
                      <span className="title-number">1</span>
                      {language === 'ar' ? 'اختر فئة السيارة' : 'Select Car Category'}
                    </h3>
                    <p className="click-instruction">
                      {language === 'ar' ? '👆 انقر واختر الفئة المطلوبة' : '👆 Click to select your category'}
                    </p>
                    <div className="car-categories-grid">
                      {carCategories.map(cat => (
                        <div 
                          key={cat.id} 
                          className={`category-card ${selectedCarCategory?.id === cat.id ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedCarCategory(cat)
                            setSelectedService(null)
                          }}
                        >
                          <div className="category-icon category-icon-img">
                            <img 
                              src={cat.image} 
                              alt={cat.titleEn}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                transition: 'transform 0.3s ease'
                              }}
                            />
                          </div>
                          <div className="category-name">
                            <strong>
                              {language === 'ar' ? cat.title : cat.titleEn}
                              {cat.hasPlus && <span style={{ color: '#C89D2A', marginRight: '5px', marginLeft: '5px' }}>+</span>}
                            </strong>
                            <small>{language === 'ar' ? cat.titleEn : cat.title}</small>
                          </div>
                          {selectedCarCategory?.id === cat.id && (
                            <div className="selected-check" style={{ background: cat.gradient }}>
                              <Check size={16} />
                            </div>
                          )}
                          <div className="category-indicator" style={{ background: cat.gradient }}></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedCarCategory && (
                    <div className="section-block">
                      <h3 className="section-title">
                        <span className="title-number">2</span>
                        {language === 'ar' ? 'اختر نوع الفحص' : 'Select Inspection Type'}
                      </h3>
                      <div className="services-grid">
                        {serviceTypes.map(s => (
                          <div 
                            key={s.id} 
                            className={`service-card ${selectedService?.id === s.id ? 'selected' : ''}`}
                            onClick={() => setSelectedService(s)}
                          >
                            <div className="service-header">
                              <div className="service-icon" style={{ background: s.color }}>{s.icon}</div>
                              <div className="service-info">
                                <strong>{language === 'ar' ? s.title : s.titleEn}</strong>
                                <small>{language === 'ar' ? s.titleEn : s.title}</small>
                              </div>
                            </div>
                            <div className="service-price">
                              <span className="price-value">
                                {getServicePrice(s.id)}
                                {selectedCarCategory?.id === 'classic' && <span style={{ color: '#C89D2A', fontWeight: 'bold' }}>+</span>}
                              </span>
                              <span className="price-currency">{language === 'ar' ? 'درهم' : 'AED'}</span>
                            </div>
                            {selectedService?.id === s.id && (
                              <div className="selected-indicator" style={{ background: s.color }}></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCarCategory && selectedService && (
                    <div className="summary-card">
                      <div className="summary-header">
                        <Star size={20} />
                        <span>{language === 'ar' ? 'ملخص الاختيار' : 'Selection Summary'}</span>
                      </div>
                      <div className="summary-body">
                        <div className="summary-item">
                          <img src={selectedCarCategory.image} alt={selectedCarCategory.titleEn} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                          <span>{language === 'ar' ? selectedCarCategory.title : selectedCarCategory.titleEn}</span>
                        </div>
                        <div className="summary-divider">+</div>
                        <div className="summary-item">
                          <span>{selectedService.icon}</span>
                          <span>{language === 'ar' ? selectedService.title : selectedService.titleEn}</span>
                        </div>
                        <div className="summary-divider">=</div>
                        <div className="summary-total">
                          <span className="total-amount">
                            {getTotalPrice()}
                            {selectedCarCategory?.id === 'classic' && <span style={{ color: '#C89D2A' }}>+</span>}
                          </span>
                          <span className="total-currency">{language === 'ar' ? 'درهم' : 'AED'}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 1 && (
                <div className="step-date">
                  <div className="calendar-card">
                    <div className="calendar-header">
                      <button className="nav-btn" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
                        {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
                      </button>
                      <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                      <button className="nav-btn" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
                        {isRTL ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                      </button>
                    </div>
                    <div className="calendar-days-header">
                      {dayNames.map(d => <span key={d}>{d}</span>)}
                    </div>
                    <div className="calendar-days-grid">
                      {getDaysInMonth(currentMonth).map((day, i) => (
                        <button
                          key={i}
                          className={`day-cell ${!day ? 'empty' : ''} ${isDateDisabled(day) ? 'disabled' : ''} ${selectedDate?.toDateString() === day?.toDateString() ? 'selected' : ''} ${day?.getDay() === 5 ? 'friday' : ''}`}
                          onClick={() => day && !isDateDisabled(day) && setSelectedDate(day)}
                          disabled={!day || isDateDisabled(day)}
                        >
                          {day?.getDate() || ''}
                        </button>
                      ))}
                    </div>
                    <p className="calendar-note">
                      {language === 'ar' ? '⚠️ يوم الجمعة إجازة رسمية' : '⚠️ Friday is an official holiday'}
                    </p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="step-time">
                  <div className="time-card">
                    <div className="selected-date-display">
                      <Calendar size={20} />
                      <span>{formatDate(selectedDate)}</span>
                    </div>
                    <p className="working-hours">
                      {language === 'ar' ? 'ساعات العمل: 10 صباحاً - 9 مساءً' : 'Working hours: 10 AM - 9 PM'}
                    </p>
                    <div className="time-slots-grid">
                      {timeSlots.map(t => (
                        <button
                          key={t}
                          className={`time-slot ${isSlotBooked(t) ? 'booked' : ''} ${selectedTime === t ? 'selected' : ''}`}
                          onClick={() => !isSlotBooked(t) && setSelectedTime(t)}
                          disabled={isSlotBooked(t)}
                        >
                          <Clock size={14} />
                          <span>{t}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form className="step-details" onSubmit={handleSubmit}>
                  <div className="booking-summary-bar">
                    <div className="summary-item-bar">
                      {selectedCarCategory && <img src={selectedCarCategory.image} alt={selectedCarCategory.titleEn} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />}
                      <span>{language === 'ar' ? selectedCarCategory?.title : selectedCarCategory?.titleEn}</span>
                    </div>
                    <div className="summary-item-bar">
                      {selectedService?.icon}
                      <span>{language === 'ar' ? selectedService?.title : selectedService?.titleEn}</span>
                    </div>
                    <div className="summary-item-bar">
                      <Calendar size={16} />
                      <span>{formatDate(selectedDate)}</span>
                    </div>
                    <div className="summary-item-bar">
                      <Clock size={16} />
                      <span>{selectedTime}</span>
                    </div>
                    <div className="summary-price-bar">
                      {getTotalPrice()} {language === 'ar' ? 'درهم' : 'AED'}
                    </div>
                  </div>

                  <div className="form-card">
                    <div className="form-section">
                      <h4>{language === 'ar' ? 'بيانات التواصل' : 'Contact Information'}</h4>
                      <div className="form-row">
                        <div className="form-group">
                          <label>{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                          <input 
                            name="name" 
                            placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'} 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label>{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                          <input 
                            name="phone" 
                            placeholder={language === 'ar' ? '05XXXXXXXX' : '05XXXXXXXX'} 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h4>{language === 'ar' ? 'طريقة التواصل المفضلة' : 'Preferred Contact Method'}</h4>
                      <div className="contact-options">
                        {contactMethods.map(method => (
                          <button
                            key={method.id}
                            type="button"
                            className={`contact-option ${formData.contactMethod === method.id ? 'selected' : ''}`}
                            onClick={() => setFormData({ ...formData, contactMethod: method.id })}
                          >
                            <span className="contact-icon" style={{ color: method.color }}>{method.icon}</span>
                            <span>{method.label}</span>
                            {formData.contactMethod === method.id && <Check size={18} className="check-icon" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-section">
                      <h4>{language === 'ar' ? 'بيانات السيارة' : 'Car Information'}</h4>
                      <div className="form-row three-cols">
                        <div className="form-group">
                          <label>{language === 'ar' ? 'ماركة السيارة' : 'Car Brand'}</label>
                          <input 
                            name="carBrand" 
                            placeholder={language === 'ar' ? 'مثال: تويوتا' : 'e.g., Toyota'} 
                            value={formData.carBrand} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label>{language === 'ar' ? 'الموديل' : 'Model'}</label>
                          <input 
                            name="carModel" 
                            placeholder={language === 'ar' ? 'مثال: كامري' : 'e.g., Camry'} 
                            value={formData.carModel} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label>{language === 'ar' ? 'سنة الصنع' : 'Year'}</label>
                          <input 
                            name="carYear" 
                            type="number"
                            min="1980"
                            max="2025"
                            placeholder={language === 'ar' ? '2020' : '2020'} 
                            value={formData.carYear} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h4>
                        <PenTool size={18} />
                        {language === 'ar' ? 'توقيع العميل' : 'Customer Signature'}
                      </h4>
                      <div className="signature-area">
                        <canvas
                          ref={canvasRef}
                          width={320}
                          height={140}
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={startDrawing}
                          onTouchMove={draw}
                          onTouchEnd={stopDrawing}
                        />
                        <button type="button" className="clear-btn" onClick={clearSignature}>
                          {language === 'ar' ? 'مسح التوقيع' : 'Clear'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="submit-booking-btn" disabled={loading || !canProceed()}>
                    {loading 
                      ? (language === 'ar' ? 'جاري الحجز...' : 'Booking...') 
                      : (language === 'ar' ? 'تأكيد الحجز' : 'Confirm Booking')}
                  </button>
                </form>
              )}
            </div>

            <div className="wizard-navigation">
              {step > 0 && (
                <button className="nav-back-btn" onClick={() => setStep(step - 1)}>
                  {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                  {language === 'ar' ? 'السابق' : 'Back'}
                </button>
              )}
              {step < 3 && (
                <button className="nav-next-btn" onClick={() => setStep(step + 1)} disabled={!canProceed()}>
                  {language === 'ar' ? 'التالي' : 'Next'}
                  {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .booking-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
        }
        .booking-hero {
          background: linear-gradient(135deg, #0B1F3A 0%, #1a365d 50%, #2d4a6f 100%);
          padding: 60px 20px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .booking-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .hero-content {
          position: relative;
          z-index: 1;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          color: white;
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 20px;
        }
        .booking-hero h1 {
          color: white;
          font-size: 2.5rem;
          margin: 0 0 10px;
          font-weight: 700;
        }
        .booking-hero p {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          margin: 0;
        }
        .booking-content {
          max-width: 900px;
          margin: -40px auto 40px;
          padding: 0 20px;
          position: relative;
        }
        .booking-wizard {
          background: white;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .wizard-progress {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 30px 20px;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-bottom: 1px solid #e2e8f0;
        }
        .progress-step {
          display: flex;
          align-items: center;
          position: relative;
        }
        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e2e8f0;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .progress-step.active .step-number {
          background: #0B1F3A;
          color: white;
        }
        .progress-step.current .step-number {
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          color: white;
          box-shadow: 0 4px 15px rgba(200,157,42,0.4);
          transform: scale(1.1);
        }
        .step-label {
          position: absolute;
          bottom: -24px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: 0.8rem;
          color: #64748b;
        }
        .progress-step.current .step-label {
          color: #0B1F3A;
          font-weight: 600;
        }
        .step-connector {
          width: 60px;
          height: 3px;
          background: #e2e8f0;
          margin: 0 10px;
        }
        .progress-step.active .step-connector {
          background: #0B1F3A;
        }
        .wizard-content {
          padding: 40px 30px;
        }
        .section-block {
          margin-bottom: 35px;
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.2rem;
          color: #0B1F3A;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .title-number {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }
        .car-categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }
        .category-card {
          position: relative;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 25px 15px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        .category-card.selected {
          border-color: transparent;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }
        .category-icon {
          margin-bottom: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .click-instruction {
          text-align: center;
          color: #C89D2A;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 20px;
          padding: 10px;
          background: linear-gradient(135deg, rgba(200,157,42,0.1), rgba(200,157,42,0.05));
          border-radius: 10px;
          border: 1px dashed #C89D2A;
        }
        .price-prefix {
          color: #C89D2A;
          font-weight: 700;
          font-size: 1rem;
          margin-right: 2px;
        }
        .category-name strong {
          display: block;
          font-size: 1rem;
          color: #0B1F3A;
          margin-bottom: 4px;
        }
        .category-name small {
          color: #64748b;
          font-size: 0.8rem;
        }
        .selected-check {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .category-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .category-card.selected .category-indicator {
          opacity: 1;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        .service-card {
          position: relative;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .service-card:hover {
          border-color: #cbd5e1;
          transform: translateY(-2px);
        }
        .service-card.selected {
          border-color: #0B1F3A;
          background: linear-gradient(135deg, #f8fafc, #fff);
        }
        .service-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }
        .service-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .service-info strong {
          display: block;
          font-size: 1rem;
          color: #0B1F3A;
          margin-bottom: 3px;
        }
        .service-info small {
          color: #64748b;
          font-size: 0.85rem;
        }
        .service-price {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .price-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #C89D2A;
        }
        .price-currency {
          font-size: 0.9rem;
          color: #64748b;
        }
        .selected-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
        }
        .summary-card {
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          border-radius: 16px;
          padding: 20px;
          color: white;
        }
        .summary-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
          color: #C89D2A;
          font-weight: 600;
        }
        .summary-body {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }
        .summary-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          padding: 10px 18px;
          border-radius: 10px;
        }
        .summary-divider {
          color: #C89D2A;
          font-size: 1.5rem;
          font-weight: bold;
        }
        .summary-total {
          display: flex;
          align-items: baseline;
          gap: 6px;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          padding: 12px 25px;
          border-radius: 12px;
        }
        .total-amount {
          font-size: 1.8rem;
          font-weight: 700;
        }
        .total-currency {
          font-size: 0.9rem;
        }
        .calendar-card, .time-card {
          background: white;
          border-radius: 16px;
          padding: 25px;
          border: 1px solid #e2e8f0;
        }
        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .calendar-header h3 {
          color: #0B1F3A;
          font-size: 1.2rem;
          margin: 0;
        }
        .nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: none;
          background: #f1f5f9;
          color: #0B1F3A;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .nav-btn:hover {
          background: #e2e8f0;
        }
        .calendar-days-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
          margin-bottom: 10px;
        }
        .calendar-days-header span {
          text-align: center;
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
          padding: 10px 0;
        }
        .calendar-days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
        }
        .day-cell {
          aspect-ratio: 1;
          border-radius: 10px;
          border: none;
          background: #f8fafc;
          color: #0B1F3A;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .day-cell:hover:not(.disabled):not(.empty) {
          background: #e2e8f0;
        }
        .day-cell.selected {
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          color: white;
          font-weight: 600;
        }
        .day-cell.disabled, .day-cell.friday {
          background: #fee2e2;
          color: #ef4444;
          cursor: not-allowed;
          opacity: 0.6;
        }
        .day-cell.empty {
          background: transparent;
          cursor: default;
        }
        .calendar-note {
          text-align: center;
          color: #ef4444;
          font-size: 0.85rem;
          margin-top: 15px;
        }
        .selected-date-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          color: white;
          padding: 15px;
          border-radius: 12px;
          margin-bottom: 15px;
          font-weight: 600;
        }
        .working-hours {
          text-align: center;
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 20px;
        }
        .time-slots-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
        }
        .time-slot {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 14px 10px;
          border-radius: 10px;
          border: 2px solid #e2e8f0;
          background: white;
          color: #0B1F3A;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .time-slot:hover:not(.booked) {
          border-color: #C89D2A;
          background: #fffbeb;
        }
        .time-slot.selected {
          border-color: #C89D2A;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          color: white;
        }
        .time-slot.booked {
          background: #f1f5f9;
          color: #94a3b8;
          cursor: not-allowed;
          text-decoration: line-through;
        }
        .booking-summary-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          padding: 15px 20px;
          border-radius: 14px;
          margin-bottom: 25px;
          align-items: center;
          justify-content: center;
        }
        .summary-item-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.15);
          padding: 8px 15px;
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
        }
        .summary-price-bar {
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          padding: 8px 20px;
          border-radius: 8px;
          color: white;
          font-weight: 700;
          font-size: 1rem;
        }
        .form-card {
          background: #f8fafc;
          border-radius: 16px;
          padding: 25px;
        }
        .form-section {
          margin-bottom: 25px;
        }
        .form-section:last-child {
          margin-bottom: 0;
        }
        .form-section h4 {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #0B1F3A;
          font-size: 1rem;
          margin: 0 0 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e2e8f0;
        }
        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        .form-row.three-cols {
          grid-template-columns: repeat(3, 1fr);
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-size: 0.85rem;
          color: #475569;
          font-weight: 500;
        }
        .form-group input {
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        .form-group input:focus {
          outline: none;
          border-color: #C89D2A;
          box-shadow: 0 0 0 3px rgba(200,157,42,0.1);
        }
        .contact-options {
          display: flex;
          gap: 12px;
        }
        .contact-option {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          font-size: 0.95rem;
          position: relative;
        }
        .contact-option:hover {
          border-color: #cbd5e1;
          transform: translateY(-2px);
        }
        .contact-option.selected {
          border-color: #0B1F3A;
          background: #f8fafc;
        }
        .contact-icon {
          font-size: 1.2rem;
        }
        .check-icon {
          color: #34A853;
        }
        .signature-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .signature-area canvas {
          border: 2px dashed #C89D2A;
          border-radius: 12px;
          background: white;
          cursor: crosshair;
          touch-action: none;
        }
        .clear-btn {
          padding: 10px 25px;
          background: #f1f5f9;
          border: none;
          border-radius: 8px;
          color: #475569;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        .clear-btn:hover {
          background: #e2e8f0;
        }
        .submit-booking-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          border: none;
          border-radius: 14px;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 20px;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        .submit-booking-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(200,157,42,0.4);
        }
        .submit-booking-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .wizard-navigation {
          display: flex;
          justify-content: space-between;
          padding: 20px 30px 30px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }
        .nav-back-btn, .nav-next-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        .nav-back-btn {
          background: white;
          border: 2px solid #e2e8f0;
          color: #475569;
        }
        .nav-back-btn:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
        }
        .nav-next-btn {
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          border: none;
          color: white;
          margin-left: auto;
        }
        .nav-next-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(11,31,58,0.3);
        }
        .nav-next-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .success-container {
          padding: 20px;
        }
        .success-card {
          background: white;
          border-radius: 24px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        .success-icon-wrapper {
          margin-bottom: 20px;
        }
        .success-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          background: linear-gradient(135deg, #34A853, #2e7d32);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .success-card h2 {
          color: #0B1F3A;
          font-size: 1.8rem;
          margin: 0 0 10px;
        }
        .booking-code {
          display: inline-block;
          background: #f1f5f9;
          padding: 10px 25px;
          border-radius: 10px;
          font-family: monospace;
          font-size: 1.2rem;
          color: #0B1F3A;
          letter-spacing: 2px;
          margin-bottom: 25px;
        }
        .success-details {
          background: #f8fafc;
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-row.total {
          font-weight: 700;
          font-size: 1.1rem;
          color: #C89D2A;
        }
        .detail-label {
          color: #64748b;
        }
        .detail-value {
          color: #0B1F3A;
          font-weight: 500;
        }
        .success-message {
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          color: white;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 25px;
        }
        .success-message p {
          margin: 0;
          line-height: 1.7;
        }
        .new-booking-btn {
          padding: 16px 40px;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        .new-booking-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(200,157,42,0.4);
        }
        @media (max-width: 768px) {
          .car-categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .services-grid {
            grid-template-columns: 1fr;
          }
          .time-slots-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .form-row, .form-row.three-cols {
            grid-template-columns: 1fr;
          }
          .contact-options {
            flex-direction: column;
          }
          .wizard-content {
            padding: 25px 20px;
          }
          .booking-hero h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Booking
