import { useState, useMemo } from 'react'
import { Car, Search, TrendingUp, Calendar, Gauge, Star, Filter } from 'lucide-react'

const carDatabase = {
  'تويوتا': {
    logo: 'https://images.unsplash.com/photo-1559136560-8a23b9f6df0b?w=100&h=100&fit=crop',
    models: {
      'كامري': { newPrice: 125000, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop' },
      'لاند كروزر': { newPrice: 320000, image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=250&fit=crop' },
      'برادو': { newPrice: 220000, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop' },
      'كورولا': { newPrice: 85000, image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400&h=250&fit=crop' },
      'راف فور': { newPrice: 130000, image: 'https://images.unsplash.com/photo-1568844293986-8c8e8b8c5c8b?w=400&h=250&fit=crop' },
      'فورتشنر': { newPrice: 175000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop' },
      'يارس': { newPrice: 65000, image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=250&fit=crop' },
      'هايلكس': { newPrice: 145000, image: 'https://images.unsplash.com/photo-1559136560-8a23b9f6df0b?w=400&h=250&fit=crop' }
    }
  },
  'نيسان': {
    logo: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100&h=100&fit=crop',
    models: {
      'باترول': { newPrice: 280000, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop' },
      'التيما': { newPrice: 115000, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop' },
      'صني': { newPrice: 58000, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop' },
      'اكس تريل': { newPrice: 125000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop' },
      'كيكس': { newPrice: 85000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop' },
      'ماكسيما': { newPrice: 155000, image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=400&h=250&fit=crop' }
    }
  },
  'هوندا': {
    logo: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=100&h=100&fit=crop',
    models: {
      'اكورد': { newPrice: 130000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop' },
      'سيفيك': { newPrice: 95000, image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=250&fit=crop' },
      'CR-V': { newPrice: 140000, image: 'https://images.unsplash.com/photo-1568844293986-8c8e8b8c5c8b?w=400&h=250&fit=crop' },
      'بايلوت': { newPrice: 185000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop' },
      'سيتي': { newPrice: 72000, image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=250&fit=crop' }
    }
  },
  'مرسيدس': {
    logo: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=100&h=100&fit=crop',
    models: {
      'S-Class': { newPrice: 650000, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop' },
      'E-Class': { newPrice: 320000, image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=250&fit=crop' },
      'C-Class': { newPrice: 220000, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop' },
      'GLE': { newPrice: 420000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop' },
      'GLC': { newPrice: 280000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop' },
      'A-Class': { newPrice: 175000, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop' },
      'AMG GT': { newPrice: 850000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop' }
    }
  },
  'بي ام دبليو': {
    logo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100&h=100&fit=crop',
    models: {
      'الفئة السابعة': { newPrice: 580000, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop' },
      'الفئة الخامسة': { newPrice: 320000, image: 'https://images.unsplash.com/photo-1520050206757-e5d65c37c22b?w=400&h=250&fit=crop' },
      'الفئة الثالثة': { newPrice: 220000, image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=400&h=250&fit=crop' },
      'X5': { newPrice: 380000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop' },
      'X3': { newPrice: 260000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop' },
      'X7': { newPrice: 520000, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop' }
    }
  },
  'لكزس': {
    logo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=100&h=100&fit=crop',
    models: {
      'LS': { newPrice: 480000, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop' },
      'ES': { newPrice: 220000, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop' },
      'LX': { newPrice: 520000, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop' },
      'RX': { newPrice: 280000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop' },
      'NX': { newPrice: 210000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop' },
      'IS': { newPrice: 185000, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop' }
    }
  },
  'هيونداي': {
    logo: 'https://images.unsplash.com/photo-1629897048514-3dd7414fe72a?w=100&h=100&fit=crop',
    models: {
      'سوناتا': { newPrice: 105000, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop' },
      'النترا': { newPrice: 78000, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop' },
      'توسان': { newPrice: 115000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop' },
      'سانتافي': { newPrice: 145000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop' },
      'اكسنت': { newPrice: 55000, image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=250&fit=crop' },
      'باليسيد': { newPrice: 185000, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop' }
    }
  },
  'كيا': {
    logo: 'https://images.unsplash.com/photo-1629897048514-3dd7414fe72a?w=100&h=100&fit=crop',
    models: {
      'K5': { newPrice: 98000, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop' },
      'سيراتو': { newPrice: 72000, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop' },
      'سبورتاج': { newPrice: 115000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop' },
      'سورينتو': { newPrice: 155000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop' },
      'تيلورايد': { newPrice: 195000, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop' },
      'كارنفال': { newPrice: 165000, image: 'https://images.unsplash.com/photo-1568844293986-8c8e8b8c5c8b?w=400&h=250&fit=crop' }
    }
  },
  'شيفروليه': {
    logo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=100&h=100&fit=crop',
    models: {
      'تاهو': { newPrice: 285000, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop' },
      'سوبربان': { newPrice: 320000, image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=250&fit=crop' },
      'ماليبو': { newPrice: 95000, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop' },
      'ترافيرس': { newPrice: 175000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop' },
      'كابتيفا': { newPrice: 105000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop' }
    }
  },
  'فورد': {
    logo: 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=100&h=100&fit=crop',
    models: {
      'اكسبلورر': { newPrice: 210000, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop' },
      'اكسبيديشن': { newPrice: 295000, image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=250&fit=crop' },
      'توروس': { newPrice: 135000, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop' },
      'رينجر': { newPrice: 125000, image: 'https://images.unsplash.com/photo-1559136560-8a23b9f6df0b?w=400&h=250&fit=crop' },
      'F-150': { newPrice: 185000, image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=400&h=250&fit=crop' },
      'موستانج': { newPrice: 220000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop' }
    }
  },
  'جي ام سي': {
    logo: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=100&h=100&fit=crop',
    models: {
      'يوكن': { newPrice: 320000, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop' },
      'سييرا': { newPrice: 195000, image: 'https://images.unsplash.com/photo-1559136560-8a23b9f6df0b?w=400&h=250&fit=crop' },
      'اكاديا': { newPrice: 175000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop' },
      'تيرين': { newPrice: 140000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop' }
    }
  },
  'جيب': {
    logo: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=100&h=100&fit=crop',
    models: {
      'رانجلر': { newPrice: 220000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop' },
      'جراند شيروكي': { newPrice: 295000, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop' },
      'شيروكي': { newPrice: 165000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop' },
      'كومباس': { newPrice: 125000, image: 'https://images.unsplash.com/photo-1568844293986-8c8e8b8c5c8b?w=400&h=250&fit=crop' }
    }
  },
  'أودي': {
    logo: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=100&fit=crop',
    models: {
      'A8': { newPrice: 480000, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop' },
      'A6': { newPrice: 280000, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop' },
      'A4': { newPrice: 195000, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop' },
      'Q7': { newPrice: 350000, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop' },
      'Q5': { newPrice: 250000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop' },
      'Q3': { newPrice: 175000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop' }
    }
  },
  'رينج روفر': {
    logo: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=100&fit=crop',
    models: {
      'رينج روفر': { newPrice: 680000, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop' },
      'رينج روفر سبورت': { newPrice: 520000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop' },
      'ديفندر': { newPrice: 380000, image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=250&fit=crop' },
      'ايفوك': { newPrice: 250000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop' }
    }
  },
  'بورش': {
    logo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=100&h=100&fit=crop',
    models: {
      'كايين': { newPrice: 450000, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop' },
      'باناميرا': { newPrice: 520000, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop' },
      'ماكان': { newPrice: 320000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop' },
      '911': { newPrice: 680000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop' }
    }
  }
}

function CarValuation() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [conditionFilter, setConditionFilter] = useState('all')
  const [results, setResults] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  const brands = Object.keys(carDatabase)
  const models = selectedBrand ? Object.keys(carDatabase[selectedBrand].models) : []
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i)

  const filteredBrands = useMemo(() => {
    if (!searchQuery) return brands
    return brands.filter(brand => 
      brand.includes(searchQuery) || 
      Object.keys(carDatabase[brand].models).some(model => model.includes(searchQuery))
    )
  }, [searchQuery])

  const calculateUsedPrice = (newPrice, year) => {
    const age = currentYear - year
    const depreciationRate = 0.12
    const minValue = 0.25
    const depreciation = Math.max(minValue, 1 - (age * depreciationRate))
    return Math.floor(newPrice * depreciation)
  }

  const getConditionLabel = (year) => {
    const age = currentYear - year
    if (age === 0) return { label: 'جديدة', color: '#28a745', badge: 'جديدة 0 كم' }
    if (age === 1) return { label: 'شبه جديدة', color: '#20c997', badge: 'سنة واحدة' }
    if (age <= 3) return { label: 'ممتازة', color: '#17a2b8', badge: `${age} سنوات` }
    if (age <= 5) return { label: 'جيدة جداً', color: '#ffc107', badge: `${age} سنوات` }
    if (age <= 8) return { label: 'جيدة', color: '#fd7e14', badge: `${age} سنوات` }
    return { label: 'مستعملة', color: '#6c757d', badge: `${age} سنوات` }
  }

  const handleSearch = () => {
    if (!selectedBrand || !selectedModel) return

    const modelData = carDatabase[selectedBrand].models[selectedModel]
    const searchResults = []

    years.forEach(year => {
      const isNew = year === currentYear
      const price = isNew ? modelData.newPrice : calculateUsedPrice(modelData.newPrice, year)
      const condition = getConditionLabel(year)
      const age = currentYear - year

      if (conditionFilter === 'new' && !isNew) return
      if (conditionFilter === 'used' && isNew) return
      if (selectedYear && year !== parseInt(selectedYear)) return

      const mileage = isNew ? 0 : Math.floor(age * 15000 + Math.random() * 10000)

      searchResults.push({
        brand: selectedBrand,
        model: selectedModel,
        year,
        price,
        priceRange: {
          min: Math.floor(price * 0.9),
          max: Math.floor(price * 1.1)
        },
        image: modelData.image,
        isNew,
        condition,
        mileage,
        location: ['دبي', 'أبوظبي', 'الشارقة', 'عجمان'][Math.floor(Math.random() * 4)]
      })
    })

    setResults(searchResults.slice(0, 8))
  }

  const formatPrice = (price) => {
    return price.toLocaleString('ar-AE') + ' درهم'
  }

  const resetSearch = () => {
    setSelectedBrand('')
    setSelectedModel('')
    setSelectedYear('')
    setConditionFilter('all')
    setResults(null)
    setSearchQuery('')
  }

  return (
    <div className="form-page" style={{ minHeight: '100vh', paddingBottom: '50px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '30px' }}>
          <TrendingUp size={60} color="#C89D2A" />
          <h2 className="section-title" style={{ marginTop: '20px' }}>أسعار السيارات في الإمارات</h2>
          <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            اكتشف أسعار السيارات الجديدة والمستعملة في السوق الإماراتي
          </p>
        </div>

        <div style={{ 
          background: 'white', 
          borderRadius: '20px', 
          padding: '30px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{ marginBottom: '25px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={20} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
              <input
                type="text"
                placeholder="ابحث عن ماركة أو موديل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px 50px 15px 15px',
                  borderRadius: '12px',
                  border: '2px solid #e8ecf1',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0B1F3A' }}>الماركة</label>
              <select
                value={selectedBrand}
                onChange={(e) => { setSelectedBrand(e.target.value); setSelectedModel(''); }}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #e8ecf1' }}
              >
                <option value="">اختار الماركة</option>
                {filteredBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0B1F3A' }}>الموديل</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #e8ecf1' }}
                disabled={!selectedBrand}
              >
                <option value="">اختار الموديل</option>
                {models.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0B1F3A' }}>السنة</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #e8ecf1' }}
              >
                <option value="">جميع السنوات</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0B1F3A' }}>الحالة</label>
              <select
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #e8ecf1' }}
              >
                <option value="all">الكل</option>
                <option value="new">جديدة فقط</option>
                <option value="used">مستعملة فقط</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleSearch}
              disabled={!selectedBrand || !selectedModel}
              className="btn btn-primary"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <Search size={20} />
              بحث في السوق
            </button>
            {results && (
              <button onClick={resetSearch} className="btn btn-secondary">
                بحث جديد
              </button>
            )}
          </div>
        </div>

        {results && results.length > 0 && (
          <div style={{ marginTop: '40px', maxWidth: '1000px', margin: '40px auto 0' }}>
            <h3 style={{ marginBottom: '25px', color: '#0B1F3A', textAlign: 'center' }}>
              نتائج البحث: {selectedBrand} {selectedModel}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
              {results.map((car, index) => (
                <div
                  key={index}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s'
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: car.condition.color,
                      color: 'white',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      {car.condition.label}
                    </div>
                    {car.isNew && (
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
                        color: '#0B1F3A',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '700'
                      }}>
                        <Star size={14} style={{ marginLeft: '5px' }} />
                        جديدة
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '20px' }}>
                    <h4 style={{ margin: '0 0 10px', color: '#0B1F3A', fontSize: '1.2rem' }}>
                      {car.brand} {car.model} {car.year}
                    </h4>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#666', fontSize: '0.9rem' }}>
                        <Calendar size={16} />
                        <span>{car.condition.badge}</span>
                      </div>
                      {!car.isNew && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#666', fontSize: '0.9rem' }}>
                          <Gauge size={16} />
                          <span>{car.mileage.toLocaleString('ar-AE')} كم</span>
                        </div>
                      )}
                    </div>

                    <div style={{ 
                      background: 'linear-gradient(135deg, #0B1F3A, #1a365d)', 
                      color: 'white', 
                      padding: '15px', 
                      borderRadius: '12px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#C89D2A' }}>
                        {formatPrice(car.price)}
                      </div>
                      <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '5px' }}>
                        {formatPrice(car.priceRange.min)} - {formatPrice(car.priceRange.max)}
                      </div>
                    </div>

                    <div style={{ 
                      marginTop: '12px', 
                      padding: '10px', 
                      background: '#f8f9fa', 
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontSize: '0.9rem',
                      color: '#666'
                    }}>
                      📍 {car.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ 
              background: '#fff3cd', 
              padding: '15px 20px', 
              borderRadius: '12px', 
              marginTop: '30px',
              textAlign: 'center',
              color: '#856404'
            }}>
              * الأسعار تقريبية وتعتمد على حالة السيارة والمواصفات الفعلية في السوق الإماراتي
            </div>
          </div>
        )}

        {results && results.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '50px', 
            background: 'white', 
            borderRadius: '20px',
            marginTop: '30px',
            maxWidth: '600px',
            margin: '30px auto'
          }}>
            <Car size={60} color="#ccc" />
            <h3 style={{ color: '#666', marginTop: '20px' }}>لا توجد نتائج</h3>
            <p style={{ color: '#999' }}>جرب تغيير معايير البحث</p>
          </div>
        )}

        {!results && (
          <div style={{ marginTop: '50px', maxWidth: '1000px', margin: '50px auto 0' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#0B1F3A' }}>
              الماركات المتوفرة
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
              gap: '15px' 
            }}>
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => { setSelectedBrand(brand); setSelectedModel(''); }}
                  style={{
                    background: selectedBrand === brand ? 'linear-gradient(135deg, #0B1F3A, #1a365d)' : 'white',
                    color: selectedBrand === brand ? 'white' : '#0B1F3A',
                    border: '2px solid #e8ecf1',
                    padding: '20px 15px',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.3s',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                  }}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CarValuation
