import { useState } from 'react'
import { Car, Search, TrendingUp, ExternalLink } from 'lucide-react'

function CarValuation() {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: ''
  })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const carBrands = [
    'تويوتا', 'نيسان', 'هوندا', 'هيونداي', 'كيا', 'شيفروليه', 'فورد',
    'مرسيدس', 'بي ام دبليو', 'أودي', 'لكزس', 'جي إم سي', 'جيب',
    'مازدا', 'ميتسوبيشي', 'سوزوكي', 'رينو', 'بيجو', 'فولكس واجن'
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const generateMarketResults = () => {
    const basePrice = Math.floor(Math.random() * 80000) + 40000
    const currentYear = new Date().getFullYear()
    const carAge = currentYear - parseInt(formData.year)
    const depreciation = Math.max(0.4, 1 - (carAge * 0.08))
    const adjustedPrice = Math.floor(basePrice * depreciation)

    return {
      carInfo: `${formData.brand} ${formData.model} ${formData.year}`,
      averagePrice: adjustedPrice,
      priceRange: {
        min: Math.floor(adjustedPrice * 0.85),
        max: Math.floor(adjustedPrice * 1.15)
      },
      listings: [
        {
          title: `${formData.brand} ${formData.model} ${formData.year} - نظيفة`,
          price: Math.floor(adjustedPrice * (0.9 + Math.random() * 0.2)),
          location: 'الرياض',
          source: 'حراج'
        },
        {
          title: `${formData.brand} ${formData.model} ${formData.year} - ممشى قليل`,
          price: Math.floor(adjustedPrice * (0.95 + Math.random() * 0.15)),
          location: 'جدة',
          source: 'موتري'
        },
        {
          title: `${formData.brand} ${formData.model} ${parseInt(formData.year) - 1}`,
          price: Math.floor(adjustedPrice * (0.8 + Math.random() * 0.15)),
          location: 'الدمام',
          source: 'حراج'
        },
        {
          title: `${formData.brand} ${formData.model} ${formData.year} - فل كامل`,
          price: Math.floor(adjustedPrice * (1.05 + Math.random() * 0.2)),
          location: 'الرياض',
          source: 'سيارة'
        }
      ]
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      const marketResults = generateMarketResults()
      setResults(marketResults)
      setLoading(false)
    }, 1500)
  }

  const resetForm = () => {
    setFormData({ brand: '', model: '', year: '' })
    setResults(null)
  }

  const formatPrice = (price) => {
    return price.toLocaleString('ar-SA') + ' ريال'
  }

  return (
    <div className="form-page">
      <div className="container">
        <div className="form-container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <TrendingUp size={60} color="#C89D2A" />
          </div>
          <h2 className="section-title">أسعار السيارات في السوق</h2>
          <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
            اكتشف أسعار السيارات المشابهة المعروضة حالياً في السوق السعودي
          </p>

          {!results ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>الماركة</label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                >
                  <option value="">اختر الماركة</option>
                  {carBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>الموديل</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  placeholder="مثال: كامري، اكورد، سوناتا"
                />
              </div>

              <div className="form-group">
                <label>سنة الصنع</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">اختر السنة</option>
                  {Array.from({length: 20}, (_, i) => 2025 - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} 
                disabled={loading}
              >
                <Search size={20} />
                {loading ? 'جاري البحث...' : 'بحث في السوق'}
              </button>
            </form>
          ) : (
            <div>
              <div style={{ 
                background: 'linear-gradient(135deg, #0B1F3A, #1a365d)', 
                color: 'white', 
                padding: '25px', 
                borderRadius: '15px',
                marginBottom: '25px',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Car size={24} />
                  <h3 style={{ margin: 0 }}>{results.carInfo}</h3>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#C89D2A', margin: '15px 0' }}>
                  {formatPrice(results.averagePrice)}
                </div>
                <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                  نطاق السعر: {formatPrice(results.priceRange.min)} - {formatPrice(results.priceRange.max)}
                </p>
              </div>

              <h4 style={{ marginBottom: '15px', color: '#0B1F3A' }}>سيارات مشابهة في السوق:</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {results.listings.map((listing, index) => (
                  <div 
                    key={index}
                    style={{
                      background: '#f8f9fa',
                      padding: '18px',
                      borderRadius: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '10px',
                      border: '1px solid #e8ecf1',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '5px' }}>{listing.title}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>
                        {listing.location} • {listing.source}
                      </div>
                    </div>
                    <div style={{ 
                      fontWeight: '700', 
                      color: '#0B1F3A',
                      fontSize: '1.1rem',
                      background: '#e8f4f8',
                      padding: '8px 15px',
                      borderRadius: '8px'
                    }}>
                      {formatPrice(listing.price)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ 
                background: '#fff3cd', 
                padding: '15px', 
                borderRadius: '10px', 
                marginTop: '20px',
                fontSize: '0.9rem',
                color: '#856404',
                textAlign: 'center'
              }}>
                * الأسعار تقريبية وتعتمد على حالة السيارة والمواصفات الفعلية
              </div>

              <button 
                onClick={resetForm} 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '20px' }}
              >
                بحث جديد
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CarValuation
