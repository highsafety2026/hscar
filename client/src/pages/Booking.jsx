import { useState, useRef, useEffect } from 'react'
import { Car, Calendar, Clock, ChevronLeft, ChevronRight, Check, Shield, Settings, Eye, FileCheck } from 'lucide-react'

function Booking() {
  const serviceTypes = [
    { id: 'full', icon: <Shield size={20} />, title: 'الفحص الشامل', titleEn: 'Full Inspection', price: '350', color: '#C89D2A' },
    { id: 'mechanical', icon: <Settings size={20} />, title: 'ميكانيكا + كمبيوتر', titleEn: 'Mechanical + Computer', price: '250', color: '#4285F4' },
    { id: 'misc', icon: <Eye size={20} />, title: 'فحوصات متنوعة', titleEn: 'Various Tests', price: '200', color: '#34A853' },
    { id: 'basic', icon: <FileCheck size={20} />, title: 'فحص أساسي', titleEn: 'Basic Check', price: '150', color: '#EA4335' }
  ]

  const yearOptions = []
  for (let year = 2025; year >= 1990; year--) {
    yearOptions.push(year)
  }

  const carBrands = [
    { name: 'تويوتا', nameEn: 'Toyota', models: ['كامري', 'كورولا', 'لاندكروزر', 'برادو', 'راف4'] },
    { name: 'نيسان', nameEn: 'Nissan', models: ['باترول', 'اكستيرا', 'التيما', 'صني'] },
    { name: 'هوندا', nameEn: 'Honda', models: ['اكورد', 'سيفيك', 'سي ار في'] },
    { name: 'هيونداي', nameEn: 'Hyundai', models: ['سوناتا', 'النترا', 'توسان', 'سانتافي'] },
    { name: 'كيا', nameEn: 'Kia', models: ['سورينتو', 'سبورتاج', 'اوبتيما'] },
    { name: 'مرسيدس', nameEn: 'Mercedes', models: ['S كلاس', 'E كلاس', 'C كلاس', 'GLE'] },
    { name: 'بي ام دبليو', nameEn: 'BMW', models: ['الفئة 7', 'الفئة 5', 'X5', 'X3'] },
    { name: 'لكزس', nameEn: 'Lexus', models: ['LS', 'ES', 'LX', 'RX'] },
    { name: 'شيفروليه', nameEn: 'Chevrolet', models: ['تاهو', 'سوبربان', 'ماليبو'] },
    { name: 'فورد', nameEn: 'Ford', models: ['اكسبلورر', 'اكسبديشن', 'موستانج'] }
  ]

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ]

  const [formData, setFormData] = useState({
    name: '', phone: '', carBrand: '', carModel: '', carYear: '', serviceType: ''
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

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate)
    }
  }, [selectedDate])

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
    return date.toLocaleDateString('ar-AE', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
  const dayNames = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !selectedService) {
      alert('الرجاء إكمال جميع البيانات')
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
          preferredTime: selectedTime
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
    if (step === 3) return formData.name && formData.phone && formData.carBrand && formData.carModel && formData.carYear
    return false
  }

  const selectedBrand = carBrands.find(b => b.name === formData.carBrand)

  return (
    <div className="simple-booking">
      <div className="booking-header-compact">
        <h1>حجز موعد فحص</h1>
        <p>اختر الخدمة والموعد المناسب</p>
      </div>

      {success ? (
        <div className="success-box">
          <div className="success-icon"><Check size={40} /></div>
          <h2>تم الحجز بنجاح!</h2>
          <p className="booking-code">{bookingId}</p>
          <p>سنتواصل معك قريباً</p>
          <button onClick={() => { setSuccess(false); setStep(0); setSelectedService(null); setSelectedDate(null); setSelectedTime(null); }}>
            حجز جديد
          </button>
        </div>
      ) : (
        <div className="booking-container">
          <div className="steps-indicator">
            {['الخدمة', 'التاريخ', 'الوقت', 'البيانات'].map((label, i) => (
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
                      <strong>{s.title}</strong>
                      <small>{s.titleEn}</small>
                    </div>
                    <div className="service-price">{s.price} <small>درهم</small></div>
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
              </div>
            )}

            {step === 2 && (
              <div className="times-compact">
                <p className="selected-date-label">
                  <Calendar size={16} /> {formatDate(selectedDate)}
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
                  <span style={{ background: selectedService?.color }}>{selectedService?.title}</span>
                  <span><Calendar size={14} /> {formatDate(selectedDate)}</span>
                  <span><Clock size={14} /> {selectedTime}</span>
                </div>
                <div className="form-grid">
                  <input name="name" placeholder="الاسم الكامل" value={formData.name} onChange={handleChange} required />
                  <input name="phone" placeholder="رقم الهاتف" value={formData.phone} onChange={handleChange} required />
                  <select name="carBrand" value={formData.carBrand} onChange={handleChange} required>
                    <option value="">اختر الماركة</option>
                    {carBrands.map(b => <option key={b.name} value={b.name}>{b.name} - {b.nameEn}</option>)}
                  </select>
                  <select name="carModel" value={formData.carModel} onChange={handleChange} required disabled={!formData.carBrand}>
                    <option value="">اختر الموديل</option>
                    {selectedBrand?.models.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select name="carYear" value={formData.carYear} onChange={handleChange} required>
                    <option value="">سنة الصنع</option>
                    {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'جاري الحجز...' : 'تأكيد الحجز'}
                </button>
              </form>
            )}
          </div>

          <div className="nav-buttons">
            {step > 0 && (
              <button className="back-btn" onClick={() => setStep(step - 1)}>
                <ChevronRight size={18} /> السابق
              </button>
            )}
            {step < 3 && (
              <button className="next-btn" onClick={() => setStep(step + 1)} disabled={!canProceed()}>
                التالي <ChevronLeft size={18} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Booking
