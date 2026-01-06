import { useState } from 'react'
import { Star, Send, CheckCircle, MessageSquare } from 'lucide-react'

const API_URL = 'https://hscar-backend.onrender.com'

function RatingSection() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

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
      }
    } catch (err) {
      console.error('Error submitting rating:', err)
    }
    setLoading(false)
  }

  const ratingLabels = ['', 'ضعيف', 'مقبول', 'جيد', 'جيد جداً', 'ممتاز']

  return (
    <section style={{ 
      padding: '80px 0', 
      background: 'linear-gradient(135deg, #0B1F3A 0%, #1a365d 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(200,157,42,0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(200,157,42,0.08) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '70px',
            height: '70px',
            background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
            borderRadius: '50%',
            marginBottom: '20px'
          }}>
            <MessageSquare size={32} color="#0B1F3A" />
          </div>
          <h2 style={{ 
            color: 'white', 
            fontSize: '2.2rem', 
            fontWeight: '700',
            marginBottom: '15px'
          }}>
            شاركنا تجربتك
          </h2>
          <p style={{ 
            color: 'rgba(255,255,255,0.8)', 
            fontSize: '1.1rem',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            رأيك يهمنا ويساعدنا في تطوير خدماتنا
          </p>
        </div>

        {!submitted ? (
          <div style={{ 
            maxWidth: '550px', 
            margin: '0 auto',
            background: 'white',
            padding: '45px 40px',
            borderRadius: '24px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)'
          }}>
            <form onSubmit={handleSubmit}>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <p style={{ 
                  color: '#0B1F3A', 
                  fontWeight: '600', 
                  marginBottom: '15px',
                  fontSize: '1.1rem'
                }}>
                  كيف كانت تجربتك معنا؟
                </p>
                <div style={{ 
                  display: 'flex', 
                  gap: '12px', 
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '5px',
                        transition: 'transform 0.2s',
                        transform: (hover >= star || rating >= star) ? 'scale(1.15)' : 'scale(1)'
                      }}
                    >
                      <Star
                        size={42}
                        fill={(hover || rating) >= star ? '#C89D2A' : 'transparent'}
                        color="#C89D2A"
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
                <div style={{ 
                  height: '24px',
                  color: '#C89D2A', 
                  fontWeight: '600',
                  fontSize: '1rem'
                }}>
                  {rating > 0 && ratingLabels[rating]}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="اسمك الكريم"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #e8ecf1',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#C89D2A'
                    e.target.style.boxShadow = '0 0 0 4px rgba(200,157,42,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e8ecf1'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <textarea
                  placeholder="شاركنا رأيك وملاحظاتك..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #e8ecf1',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'none',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#C89D2A'
                    e.target.style.boxShadow = '0 0 0 4px rgba(200,157,42,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e8ecf1'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <button 
                type="submit" 
                disabled={rating === 0 || loading}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: rating === 0 ? '#ccc' : 'linear-gradient(135deg, #0B1F3A, #1a365d)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: rating === 0 ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: rating > 0 ? '0 8px 25px rgba(11,31,58,0.3)' : 'none'
                }}
                onMouseOver={(e) => rating > 0 && (e.target.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <Send size={20} />
                {loading ? 'جاري الإرسال...' : 'إرسال التقييم'}
              </button>
            </form>
          </div>
        ) : (
          <div style={{ 
            maxWidth: '550px', 
            margin: '0 auto',
            background: 'white',
            padding: '60px 40px',
            borderRadius: '24px',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #28a745, #20c997)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 25px',
              animation: 'scaleIn 0.5s ease'
            }}>
              <CheckCircle size={40} color="white" />
            </div>
            <style>{`
              @keyframes scaleIn {
                from { transform: scale(0); }
                to { transform: scale(1); }
              }
            `}</style>
            <h3 style={{ 
              color: '#0B1F3A', 
              fontSize: '1.8rem', 
              marginBottom: '15px',
              fontWeight: '700'
            }}>
              شكراً لك!
            </h3>
            <p style={{ 
              color: '#666', 
              fontSize: '1.1rem',
              lineHeight: '1.7'
            }}>
              نقدر رأيك الكريم ونسعى دائماً لتقديم أفضل خدمة لعملائنا
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default RatingSection
