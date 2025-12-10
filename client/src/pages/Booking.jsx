import { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown, Car } from 'lucide-react'

function Booking() {
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

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carBrand: '',
    carModel: '',
    carYear: '',
    serviceType: '',
    preferredDate: '',
    notes: ''
  })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  const [modelSearchTerm, setModelSearchTerm] = useState('')
  const dropdownRef = useRef(null)
  const modelDropdownRef = useRef(null)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          carModel: `${formData.carBrand} ${formData.carModel}`
        })
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setFormData({
          name: '',
          phone: '',
          carBrand: '',
          carModel: '',
          carYear: '',
          serviceType: '',
          preferredDate: '',
          notes: ''
        })
        setSearchTerm('')
        setModelSearchTerm('')
        setSelectedBrand(null)
      }
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
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
        <div className="booking-form-container">
          {success && (
            <div className="success-message-new">
              <Car size={40} />
              <h3>تم استلام طلبك بنجاح!</h3>
              <p>سنتواصل معك قريباً لتأكيد الموعد</p>
            </div>
          )}

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
                    placeholder="ابحث عن الماركة... مثال: تويوتا أو Toyota"
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

            <div className="form-row">
              <div className="form-group-new">
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

              <div className="form-group-new">
                <label>التاريخ المفضل</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                />
              </div>
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
                <option value="full">الفحص الشامل - Full Inspection</option>
                <option value="mechanical">فحص الميكانيكا والكمبيوتر - Mechanical + Computer</option>
                <option value="misc">فحوصات متنوعة - Miscellaneous Tests</option>
                <option value="basic">فحص الأجزاء الأساسية - Basic Parts</option>
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

            <button type="submit" className="booking-submit-btn" disabled={loading}>
              {loading ? 'جاري الإرسال...' : 'إرسال طلب الحجز'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Booking
