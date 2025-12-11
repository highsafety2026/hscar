import { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown, Car, Calendar, Clock, ChevronLeft, ChevronRight, Check, QrCode, Shield, Settings, Eye, FileCheck, Wrench } from 'lucide-react'

function Booking() {
  const serviceTypes = [
    { 
      id: 'full', 
      icon: <Shield size={32} />, 
      title: 'الفحص الشامل', 
      titleEn: 'Full Inspection',
      price: '350 درهم',
      desc: 'فحص كامل لجميع أجزاء السيارة',
      features: ['200+ نقطة فحص', 'تقرير مفصل', 'ضمان الدقة'],
      color: '#C89D2A'
    },
    { 
      id: 'mechanical', 
      icon: <Settings size={32} />, 
      title: 'الميكانيكا + الكمبيوتر', 
      titleEn: 'Mechanical + Computer',
      price: '250 درهم',
      desc: 'فحص المحرك والقير والكمبيوتر',
      features: ['فحص المحرك', 'فحص القير', 'قراءة الأكواد'],
      color: '#4285F4'
    },
    { 
      id: 'misc', 
      icon: <Eye size={32} />, 
      title: 'فحوصات متنوعة', 
      titleEn: 'Various Tests',
      price: '200 درهم',
      desc: 'فحص الهيكل والبودي والصبغ',
      features: ['فحص الحوادث', 'قياس الصبغ', 'فحص الشاصي'],
      color: '#34A853'
    },
    { 
      id: 'basic', 
      icon: <FileCheck size={32} />, 
      title: 'فحص أساسي', 
      titleEn: 'Basic Check',
      price: '150 درهم',
      desc: 'فحص سريع للأجزاء الأساسية',
      features: ['فحص سريع', 'النقاط الأساسية', 'تقرير مختصر'],
      color: '#EA4335'
    }
  ]

  const yearOptions = []
  for (let year = 2025; year >= 1990; year--) {
    yearOptions.push(year)
  }
  const carBrands = [
    { name: 'تويوتا', nameEn: 'Toyota', models: ['كامري', 'كورولا', 'لاندكروزر', 'برادو', 'فورتشنر', 'هايلكس', 'راف4', 'افالون', 'يارس', 'سيكويا'] },
    { name: 'نيسان', nameEn: 'Nissan', models: ['باترول', 'اكستيرا', 'ارمادا', 'التيما', 'ماكسيما', 'صني', 'كيكس', 'باثفايندر', 'نافارا'] },
    { name: 'هوندا', nameEn: 'Honda', models: ['اكورد', 'سيفيك', 'سي ار في', 'بايلوت', 'اوديسي', 'اتش ار في'] },
    { name: 'هيونداي', nameEn: 'Hyundai', models: ['سوناتا', 'النترا', 'توسان', 'سانتافي', 'باليسيد', 'كونا', 'اكسنت', 'ازيرا'] },
    { name: 'كيا', nameEn: 'Kia', models: ['سورينتو', 'سبورتاج', 'اوبتيما', 'سيراتو', 'كارنيفال', 'تيلورايد', 'سيلتوس'] },
    { name: 'شيفروليه', nameEn: 'Chevrolet', models: ['تاهو', 'سوبربان', 'سلفرادو', 'ترافيرس', 'ماليبو', 'كمارو', 'ايكوينوكس'] },
    { name: 'فورد', nameEn: 'Ford', models: ['اكسبلورر', 'اكسبديشن', 'رابتر', 'فيوجن', 'موستانج', 'برونكو', 'ايدج', 'اف 150'] },
    { name: 'جي ام سي', nameEn: 'GMC', models: ['يوكون', 'سييرا', 'اكاديا', 'تيرين', 'سافانا'] },
    { name: 'دودج', nameEn: 'Dodge', models: ['دورانجو', 'تشارجر', 'تشالنجر', 'رام', 'جورني'] },
    { name: 'جيب', nameEn: 'Jeep', models: ['رانجلر', 'جراند شيروكي', 'شيروكي', 'كومباس', 'جلاديتور'] },
    { name: 'لاندروفر', nameEn: 'Land Rover', models: ['رينج روفر', 'رينج روفر سبورت', 'ديفندر', 'ديسكفري', 'ايفوك', 'فيلار'] },
    { name: 'مرسيدس', nameEn: 'Mercedes', models: ['S كلاس', 'E كلاس', 'C كلاس', 'GLE', 'GLC', 'GLS', 'AMG GT', 'A كلاس'] },
    { name: 'بي ام دبليو', nameEn: 'BMW', models: ['الفئة 7', 'الفئة 5', 'الفئة 3', 'X7', 'X5', 'X3', 'X6', 'M5'] },
    { name: 'اودي', nameEn: 'Audi', models: ['A8', 'A6', 'A4', 'Q7', 'Q5', 'Q3', 'RS6', 'e-tron'] },
    { name: 'لكزس', nameEn: 'Lexus', models: ['LS', 'ES', 'LX', 'GX', 'RX', 'NX', 'IS', 'LC'] },
    { name: 'بورش', nameEn: 'Porsche', models: ['كايين', 'ماكان', 'باناميرا', '911', 'تايكان'] },
    { name: 'فولكس واجن', nameEn: 'Volkswagen', models: ['تيجوان', 'طوارق', 'جولف', 'باسات', 'ارتيون', 'اطلس'] },
    { name: 'مازدا', nameEn: 'Mazda', models: ['CX-9', 'CX-5', 'CX-3', 'مازدا 6', 'مازدا 3', 'MX-5'] },
    { name: 'ميتسوبيشي', nameEn: 'Mitsubishi', models: ['باجيرو', 'اوتلاندر', 'مونتيرو', 'اكليبس كروس', 'لانسر'] },
    { name: 'سوبارو', nameEn: 'Subaru', models: ['اوتباك', 'فورستر', 'XV', 'امبريزا', 'WRX'] },
    { name: 'انفينيتي', nameEn: 'Infiniti', models: ['QX80', 'QX60', 'QX50', 'Q50', 'Q60'] },
    { name: 'جينيسيس', nameEn: 'Genesis', models: ['G90', 'G80', 'G70', 'GV80', 'GV70'] },
    { name: 'كاديلاك', nameEn: 'Cadillac', models: ['اسكاليد', 'XT6', 'XT5', 'CT6', 'CT5'] },
    { name: 'لينكولن', nameEn: 'Lincoln', models: ['نافيجيتور', 'افياتور', 'كورسير', 'نوتيلوس'] },
    { name: 'رولز رويس', nameEn: 'Rolls Royce', models: ['فانتوم', 'جوست', 'كولينان', 'رايث', 'داون'] },
    { name: 'بنتلي', nameEn: 'Bentley', models: ['بنتايجا', 'كونتيننتال', 'فلاينج سبير'] },
    { name: 'ماكلارين', nameEn: 'McLaren', models: ['720S', '570S', 'GT', 'Artura'] },
    { name: 'فيراري', nameEn: 'Ferrari', models: ['488', 'F8', 'SF90', 'Roma', 'بورتوفينو'] },
    { name: 'لامبورجيني', nameEn: 'Lamborghini', models: ['اوروس', 'هوراكان', 'افينتادور'] },
    { name: 'استون مارتن', nameEn: 'Aston Martin', models: ['DB11', 'DBX', 'فانتاج', 'DBS'] },
    { name: 'مازيراتي', nameEn: 'Maserati', models: ['ليفانتي', 'جيبلي', 'كواتروبورتي', 'MC20'] },
    { name: 'جاكوار', nameEn: 'Jaguar', models: ['F-Pace', 'E-Pace', 'XF', 'XE', 'F-Type'] },
    { name: 'فولفو', nameEn: 'Volvo', models: ['XC90', 'XC60', 'XC40', 'S90', 'S60', 'V60'] },
    { name: 'بيجو', nameEn: 'Peugeot', models: ['5008', '3008', '2008', '508', '308'] },
    { name: 'رينو', nameEn: 'Renault', models: ['كوليوس', 'داستر', 'كابتور', 'ميجان', 'تاليسمان'] },
    { name: 'ام جي', nameEn: 'MG', models: ['RX8', 'RX5', 'ZS', 'HS', 'GT'] },
    { name: 'شانجان', nameEn: 'Changan', models: ['CS95', 'CS85', 'CS75', 'CS55', 'CS35'] },
    { name: 'جيلي', nameEn: 'Geely', models: ['امجراند', 'كولراي', 'اوكافانجو', 'ستارري'] },
    { name: 'هافال', nameEn: 'Haval', models: ['H9', 'H6', 'جوليون', 'دارجو'] },
    { name: 'جاك', nameEn: 'JAC', models: ['S7', 'S4', 'S3', 'T8'] },
    { name: 'سوزوكي', nameEn: 'Suzuki', models: ['جيمني', 'فيتارا', 'سويفت', 'ديزاير', 'ارتيجا'] }
  ]

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ]

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    carBrand: '',
    carModel: '',
    carYear: '',
    serviceType: '',
    notes: ''
  })
  const [success, setSuccess] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  const [modelSearchTerm, setModelSearchTerm] = useState('')
  const dropdownRef = useRef(null)
  const modelDropdownRef = useRef(null)

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [bookedSlots, setBookedSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [qrCode, setQrCode] = useState(null)
  const [step, setStep] = useState(0)
  const [selectedService, setSelectedService] = useState(null)

  useEffect(() => {
    fetchQRCode()
  }, [])

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate)
    }
  }, [selectedDate])

  const fetchQRCode = async () => {
    try {
      const res = await fetch('/api/booking-qr')
      const data = await res.json()
      if (data.qrCode) {
        setQrCode(data.qrCode)
      }
    } catch (error) {
      console.error('Error fetching QR code:', error)
    }
  }

  const fetchBookedSlots = async (date) => {
    setLoadingSlots(true)
    try {
      const dateStr = date.toISOString().split('T')[0]
      const res = await fetch(`/api/slots?date=${dateStr}`)
      const data = await res.json()
      setBookedSlots(data.bookedSlots || [])
    } catch (error) {
      console.error('Error fetching slots:', error)
    }
    setLoadingSlots(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target)) {
        setShowModelDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredBrands = carBrands.filter(brand => 
    brand.name.includes(searchTerm) || 
    brand.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredModels = selectedBrand ? 
    selectedBrand.models.filter(model => 
      model.includes(modelSearchTerm) || 
      model.toLowerCase().includes(modelSearchTerm.toLowerCase())
    ) : []

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand)
    setSearchTerm(`${brand.name} - ${brand.nameEn}`)
    setFormData({ ...formData, carBrand: brand.name, carModel: '' })
    setShowDropdown(false)
    setModelSearchTerm('')
  }

  const handleModelSelect = (model) => {
    setModelSearchTerm(model)
    setFormData({ ...formData, carModel: model })
    setShowModelDropdown(false)
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
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const isDateDisabled = (date) => {
    if (!date) return true
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dayOfWeek = date.getDay()
    return date < today || dayOfWeek === 5
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('ar-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
  const dayNames = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) {
      alert('الرجاء اختيار التاريخ والوقت')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          carModel: `${formData.carBrand} ${formData.carModel}`,
          preferredDate: selectedDate.toISOString().split('T')[0],
          preferredTime: selectedTime
        })
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setBookingId(data.bookingId || '')
        setFormData({
          name: '',
          phone: '',
          email: '',
          carBrand: '',
          carModel: '',
          carYear: '',
          serviceType: '',
          notes: ''
        })
        setSearchTerm('')
        setModelSearchTerm('')
        setSelectedBrand(null)
        setSelectedDate(null)
        setSelectedTime(null)
        setSelectedService(null)
        setStep(0)
      }
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
  }

  const isSlotBooked = (time) => {
    return bookedSlots.includes(time)
  }

  return (
    <div className="booking-page-new">
      <div className="booking-hero">
        <div className="container">
          <span className="section-badge">احجز موعدك</span>
          <h1>حجز موعد فحص</h1>
          <p>احجز موعدك الآن واحصل على تقرير شامل لسيارتك</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 24px' }}>
        {success ? (
          <div className="booking-success-card">
            <div className="success-icon-large">
              <Check size={60} />
            </div>
            <h2>تم الحجز بنجاح!</h2>
            <p>رقم الحجز الخاص بك</p>
            <div className="booking-id-display">{bookingId}</div>
            <p className="success-note">سنتواصل معك قريباً لتأكيد الموعد على الرقم المسجل</p>
            <button onClick={() => setSuccess(false)} className="btn-new-booking">
              حجز موعد جديد
            </button>
          </div>
        ) : (
          <div className="booking-layout">
            <div className="booking-steps">
              <div className={`step ${step >= 0 ? 'active' : ''}`}>
                <span className="step-number">1</span>
                <span className="step-label">اختر الخدمة</span>
              </div>
              <div className="step-line"></div>
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <span className="step-number">2</span>
                <span className="step-label">اختر التاريخ</span>
              </div>
              <div className="step-line"></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <span className="step-number">3</span>
                <span className="step-label">اختر الوقت</span>
              </div>
              <div className="step-line"></div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <span className="step-number">4</span>
                <span className="step-label">البيانات</span>
              </div>
            </div>

            <div className="booking-content">
              {step === 0 && (
                <div className="service-selection-section">
                  <h3><Wrench size={24} /> اختر نوع الخدمة</h3>
                  <div className="service-cards-grid">
                    {serviceTypes.map((service) => (
                      <div 
                        key={service.id}
                        className={`service-select-card ${selectedService?.id === service.id ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedService(service)
                          setFormData({ ...formData, serviceType: service.id })
                          setStep(1)
                        }}
                        style={{ '--card-color': service.color }}
                      >
                        <div className="service-card-icon" style={{ background: service.color }}>
                          {service.icon}
                        </div>
                        <div className="service-card-info">
                          <h4>{service.title}</h4>
                          <p className="service-title-en">{service.titleEn}</p>
                          <p className="service-desc">{service.desc}</p>
                          <div className="service-features">
                            {service.features.map((f, i) => (
                              <span key={i} className="feature-tag">{f}</span>
                            ))}
                          </div>
                          <div className="service-price">{service.price}</div>
                        </div>
                        <ChevronLeft size={24} className="card-arrow" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="calendar-section">
                  {selectedService && (
                    <div className="selected-service-display">
                      <div className="service-badge" style={{ background: selectedService.color }}>
                        {selectedService.icon}
                      </div>
                      <div className="service-info">
                        <span className="service-name">{selectedService.title}</span>
                        <span className="service-price-small">{selectedService.price}</span>
                      </div>
                      <button onClick={() => setStep(0)} className="change-btn">تغيير</button>
                    </div>
                  )}
                  <h3><Calendar size={20} /> اختر التاريخ المناسب</h3>
                  <div className="calendar-header">
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
                      <ChevronRight size={24} />
                    </button>
                    <h3>
                      <Calendar size={20} />
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
                      <ChevronLeft size={24} />
                    </button>
                  </div>
                  
                  <div className="calendar-days-header">
                    {dayNames.map(day => (
                      <div key={day} className="day-name">{day}</div>
                    ))}
                  </div>
                  
                  <div className="calendar-grid">
                    {getDaysInMonth(currentMonth).map((day, index) => (
                      <button
                        key={index}
                        className={`calendar-day ${!day ? 'empty' : ''} ${isDateDisabled(day) ? 'disabled' : ''} ${selectedDate && day && day.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`}
                        onClick={() => {
                          if (day && !isDateDisabled(day)) {
                            setSelectedDate(day)
                            setSelectedTime(null)
                            setStep(2)
                          }
                        }}
                        disabled={isDateDisabled(day)}
                      >
                        {day ? day.getDate() : ''}
                      </button>
                    ))}
                  </div>

                  <div className="calendar-legend">
                    <div className="legend-item">
                      <span className="legend-dot available"></span>
                      <span>متاح</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot disabled"></span>
                      <span>غير متاح</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot friday"></span>
                      <span>الجمعة (عطلة)</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="time-slots-section">
                  <div className="selected-date-display">
                    <Calendar size={20} />
                    <span>{formatDate(selectedDate)}</span>
                    <button onClick={() => setStep(1)} className="change-date-btn">تغيير</button>
                  </div>
                  
                  <h3><Clock size={20} /> اختر الوقت المناسب</h3>
                  
                  {loadingSlots ? (
                    <div className="loading-slots">جاري تحميل المواعيد...</div>
                  ) : (
                    <div className="time-slots-grid">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          className={`time-slot ${isSlotBooked(time) ? 'booked' : ''} ${selectedTime === time ? 'selected' : ''}`}
                          onClick={() => {
                            if (!isSlotBooked(time)) {
                              setSelectedTime(time)
                              setStep(3)
                            }
                          }}
                          disabled={isSlotBooked(time)}
                        >
                          <Clock size={16} />
                          <span>{time}</span>
                          {isSlotBooked(time) && <span className="booked-label">محجوز</span>}
                        </button>
                      ))}
                    </div>
                  )}

                  <button onClick={() => setStep(1)} className="back-btn">
                    <ChevronRight size={18} /> العودة للتقويم
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="booking-form-section">
                  <div className="selected-datetime-display">
                    <div className="datetime-item">
                      <Calendar size={18} />
                      <span>{formatDate(selectedDate)}</span>
                    </div>
                    <div className="datetime-item">
                      <Clock size={18} />
                      <span>{selectedTime}</span>
                    </div>
                    <button onClick={() => setStep(1)} className="change-btn">تغيير</button>
                  </div>

                  <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-row">
                      <div className="form-group-new">
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

                      <div className="form-group-new">
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
                    </div>

                    <div className="form-group-new">
                      <label>البريد الإلكتروني (اختياري)</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group-new" ref={dropdownRef}>
                        <label>نوع السيارة (الماركة)</label>
                        <div className="search-input-wrapper">
                          <Search size={18} className="search-icon" />
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                              setSearchTerm(e.target.value)
                              setShowDropdown(true)
                              setSelectedBrand(null)
                            }}
                            onFocus={() => setShowDropdown(true)}
                            placeholder="ابحث عن الماركة..."
                            required
                          />
                          <ChevronDown size={18} className="dropdown-icon" />
                        </div>
                        {showDropdown && (
                          <div className="car-dropdown">
                            {filteredBrands.length > 0 ? (
                              filteredBrands.map((brand, index) => (
                                <div 
                                  key={index} 
                                  className="car-dropdown-item"
                                  onClick={() => handleBrandSelect(brand)}
                                >
                                  <span className="brand-ar">{brand.name}</span>
                                  <span className="brand-en">{brand.nameEn}</span>
                                </div>
                              ))
                            ) : (
                              <div className="no-results">لا توجد نتائج</div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="form-group-new" ref={modelDropdownRef}>
                        <label>الموديل</label>
                        <div className="search-input-wrapper">
                          <Car size={18} className="search-icon" />
                          <input
                            type="text"
                            value={modelSearchTerm}
                            onChange={(e) => {
                              setModelSearchTerm(e.target.value)
                              setShowModelDropdown(true)
                            }}
                            onFocus={() => setShowModelDropdown(true)}
                            placeholder={selectedBrand ? "اختر الموديل..." : "اختر الماركة أولاً"}
                            disabled={!selectedBrand}
                            required
                          />
                          <ChevronDown size={18} className="dropdown-icon" />
                        </div>
                        {showModelDropdown && selectedBrand && (
                          <div className="car-dropdown">
                            {filteredModels.length > 0 ? (
                              filteredModels.map((model, index) => (
                                <div 
                                  key={index} 
                                  className="car-dropdown-item"
                                  onClick={() => handleModelSelect(model)}
                                >
                                  <span className="brand-ar">{model}</span>
                                </div>
                              ))
                            ) : (
                              <div className="no-results">لا توجد نتائج</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group-new">
                        <label>سنة الصنع</label>
                        <select
                          name="carYear"
                          value={formData.carYear}
                          onChange={handleChange}
                          required
                          className="year-select"
                        >
                          <option value="">اختر السنة</option>
                          {yearOptions.map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>

                    <div className="form-group-new">
                      <label>ملاحظات إضافية</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                        placeholder="أي ملاحظات أو استفسارات..."
                      />
                    </div>

                    <div className="form-actions">
                      <button type="button" onClick={() => setStep(2)} className="back-btn">
                        <ChevronRight size={18} /> العودة
                      </button>
                      <button type="submit" className="booking-submit-btn" disabled={loading}>
                        {loading ? 'جاري الإرسال...' : 'تأكيد الحجز'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {qrCode && (
              <div className="qr-section">
                <div className="qr-card">
                  <QrCode size={24} />
                  <h4>امسح للحجز السريع</h4>
                  <img src={qrCode} alt="QR Code for booking" className="qr-image" />
                  <p>امسح الكود للوصول لصفحة الحجز</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Booking
