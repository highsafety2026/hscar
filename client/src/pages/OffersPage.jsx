import { useState, useEffect } from 'react'
import '../styles/index.css'

export default function OffersPage() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOffers()
  }, [])

  const loadOffers = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/offers')
      const data = await res.json()
      setOffers(data.filter(offer => {
        if (!offer.valid_until) return true
        return new Date(offer.valid_until) >= new Date()
      }))
    } catch (error) {
      console.error('Error loading offers:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0B1F3A 0%, #1565C0 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
          <div style={{ fontSize: '20px' }}>جاري تحميل العروض...</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0B1F3A 0%, #1565C0 100%)' }}>
      {/* Header */}
      <header style={{ 
        padding: '40px 20px', 
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ animation: 'fadeIn 0.6s' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            marginBottom: '15px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            🎉 عروض الفحص الحصرية
          </h1>
          <p style={{ 
            fontSize: '20px', 
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            استفد من أفضل العروض والخصومات على خدمات فحص السيارات
          </p>
        </div>
      </header>

      {/* Offers Grid */}
      <div style={{ 
        padding: '40px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {offers.length === 0 ? (
          <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '60px 40px',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              animation: 'fadeIn 0.5s'
            }}
          >
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>📭</div>
            <h2 style={{ fontSize: '32px', color: '#0B1F3A', marginBottom: '10px' }}>
              لا توجد عروض حالياً
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b' }}>
              تابعنا للحصول على أحدث العروض والخصومات
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {offers.map((offer, index) => (
              <div
                key={offer.id}
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  position: 'relative',
                  cursor: 'pointer',
                  animation: `fadeIn 0.5s ${index * 0.1}s both`,
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-10px)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)'
                }}
              >
                {/* Discount Badge */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '50px',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(255,107,107,0.4)',
                  zIndex: 1
                }}>
                  🔥 {offer.discount}%
                </div>

                {/* Icon */}
                <div style={{
                  background: 'linear-gradient(135deg, #0B1F3A 0%, #1565C0 100%)',
                  padding: '40px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '80px' }}>🚗</div>
                </div>

                {/* Content */}
                <div style={{ padding: '30px' }}>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#0B1F3A',
                    marginBottom: '15px'
                  }}>
                    {offer.title_ar}
                  </h3>

                  {offer.description_ar && (
                    <p style={{
                      fontSize: '16px',
                      color: '#64748b',
                      lineHeight: '1.6',
                      marginBottom: '20px'
                    }}>
                      {offer.description_ar}
                    </p>
                  )}

                  {/* Validity */}
                  {offer.valid_until && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '15px',
                      background: '#FFF3CD',
                      borderRadius: '10px',
                      marginBottom: '20px'
                    }}>
                      <span style={{ fontSize: '24px' }}>⏰</span>
                      <div>
                        <div style={{ fontSize: '12px', color: '#856404', fontWeight: '600' }}>
                          ينتهي العرض في
                        </div>
                        <div style={{ fontSize: '16px', color: '#856404', fontWeight: 'bold' }}>
                          {new Date(offer.valid_until).toLocaleDateString('ar-SA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <button
                    onClick={() => window.location.href = '/booking'}
                    style={{
                      width: '100%',
                      padding: '18px',
                      background: 'linear-gradient(135deg, #0B1F3A 0%, #1565C0 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(11,31,58,0.3)',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = '0 6px 20px rgba(11,31,58,0.4)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 4px 15px rgba(11,31,58,0.3)'
                    }}
                  >
                    احجز الآن واستفد من العرض
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div style={{
        padding: '60px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ animation: 'fadeIn 0.5s 0.5s both' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>
            هل تريد معرفة المزيد عن خدماتنا؟
          </h2>
          <button
            onClick={() => window.location.href = '/services'}
            style={{
              padding: '18px 40px',
              background: 'white',
              color: '#0B1F3A',
              border: 'none',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(255,255,255,0.3)'
            }}
          >
            تصفح الخدمات
          </button>
        </div>
      </div>
    </div>
  )
}
