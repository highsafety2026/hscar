import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || ''

function RatingSection() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ count: 0, average: 0 })
  const [recentRatings, setRecentRatings] = useState([])

  useEffect(() => {
    fetchRatings()
  }, [])

  const fetchRatings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/ratings`)
      const data = await res.json()
      setStats(data.stats)
      setRecentRatings(data.ratings)
    } catch (err) {
      console.error('Error fetching ratings:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating === 0) return
    
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stars: rating, name, comment })
      })
      if (res.ok) {
        setSubmitted(true)
        fetchRatings()
      }
    } catch (err) {
      console.error('Error submitting rating:', err)
    }
    setLoading(false)
  }

  const renderStars = (count, size = 24, interactive = false) => {
    return [...Array(5)].map((_, i) => {
      const starValue = i + 1
      return (
        <Star
          key={i}
          size={size}
          fill={starValue <= (interactive ? (hover || rating) : count) ? '#C89D2A' : 'transparent'}
          color="#C89D2A"
          style={{ cursor: interactive ? 'pointer' : 'default', transition: 'transform 0.2s' }}
          onMouseEnter={() => interactive && setHover(starValue)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && setRating(starValue)}
        />
      )
    })
  }

  return (
    <section style={{ 
      padding: '80px 0', 
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    }}>
      <div className="container">
        <h2 className="section-title">تقييم العملاء</h2>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '20px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          <div style={{ 
            background: 'white', 
            padding: '30px 50px', 
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginBottom: '10px' }}>
              {renderStars(Math.round(stats.average), 32)}
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0B1F3A' }}>
              {stats.average.toFixed(1)}
            </div>
            <div style={{ color: '#666', fontSize: '0.95rem' }}>
              من {stats.count} تقييم
            </div>
          </div>
        </div>

        {!submitted ? (
          <div style={{ 
            maxWidth: '500px', 
            margin: '0 auto',
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ textAlign: 'center', marginBottom: '25px', color: '#0B1F3A' }}>
              شاركنا تجربتك
            </h3>
            <form onSubmit={handleSubmit}>
              <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  {renderStars(rating, 40, true)}
                </div>
                <p style={{ marginTop: '10px', color: '#666', fontSize: '0.9rem' }}>
                  {rating === 0 ? 'اضغط على النجوم للتقييم' : `تقييمك: ${rating} من 5`}
                </p>
              </div>
              <input
                type="text"
                placeholder="اسمك (اختياري)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                style={{ marginBottom: '15px' }}
              />
              <textarea
                placeholder="تعليقك (اختياري)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-input"
                rows={3}
                style={{ marginBottom: '20px', resize: 'none' }}
              />
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%' }}
                disabled={rating === 0 || loading}
              >
                {loading ? 'جاري الإرسال...' : 'إرسال التقييم'}
              </button>
            </form>
          </div>
        ) : (
          <div style={{ 
            maxWidth: '500px', 
            margin: '0 auto',
            background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
            padding: '40px',
            borderRadius: '20px',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>✓</div>
            <h3 style={{ marginBottom: '10px' }}>شكراً لتقييمك!</h3>
            <p style={{ opacity: 0.9 }}>نقدر رأيك ونسعى دائماً لتقديم أفضل خدمة</p>
          </div>
        )}

        {recentRatings.length > 0 && (
          <div style={{ marginTop: '50px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#0B1F3A' }}>
              آخر التقييمات
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {recentRatings.slice(0, 6).map((r) => (
                <div key={r.id} style={{
                  background: 'white',
                  padding: '25px',
                  borderRadius: '15px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
                }}>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '10px' }}>
                    {renderStars(r.stars, 18)}
                  </div>
                  <div style={{ fontWeight: '600', color: '#0B1F3A', marginBottom: '8px' }}>
                    {r.name}
                  </div>
                  {r.comment && (
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                      "{r.comment}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default RatingSection
