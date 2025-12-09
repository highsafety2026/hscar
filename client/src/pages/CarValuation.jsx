import { useState } from 'react'
import { Camera, Car } from 'lucide-react'

function CarValuation() {
  const [formData, setFormData] = useState({
    model: '',
    year: '',
    phone: ''
  })
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages(files)
    
    const newPreviews = files.map(file => URL.createObjectURL(file))
    setPreviews(newPreviews)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formDataToSend = new FormData()
    formDataToSend.append('model', formData.model)
    formDataToSend.append('year', formData.year)
    formDataToSend.append('phone', formData.phone)
    images.forEach(img => formDataToSend.append('images', img))

    try {
      const res = await fetch('/api/valuations', {
        method: 'POST',
        body: formDataToSend
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setResult({
          status: 'pending',
          message: 'تم استلام طلبك بنجاح! سيتم مراجعة البيانات وإرسال التقييم قريباً.'
        })
      }
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
  }

  const resetForm = () => {
    setFormData({ model: '', year: '', phone: '' })
    setImages([])
    setPreviews([])
    setSuccess(false)
    setResult(null)
  }

  return (
    <div className="form-page">
      <div className="container">
        <div className="form-container">
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Car size={60} color="#1a365d" />
          </div>
          <h2 className="section-title">تقييم سعر السيارة</h2>
          <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
            أرسل بيانات سيارتك وصورها للحصول على تقييم تقريبي لسعرها
          </p>

          {success && result ? (
            <div>
              <div className="info-message">
                {result.message}
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '8px' }}>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                  سيتم إرسال التقييم إلى رقم الهاتف المسجل
                </p>
                <p style={{ fontSize: '0.9rem', color: '#888' }}>
                  ملاحظة: التقييم المقدم تقريبي وليس أكيد ويعتمد على عدة عوامل
                </p>
              </div>
              <button onClick={resetForm} className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                طلب تقييم جديد
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>موديل السيارة</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  placeholder="مثال: تويوتا كامري"
                />
              </div>

              <div className="form-group">
                <label>سنة الصنع</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  placeholder="مثال: 2020"
                  min="1990"
                  max="2025"
                />
              </div>

              <div className="form-group">
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

              <div className="form-group">
                <label>صور السيارة (يمكنك رفع حتى 10 صور)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  required
                  style={{ padding: '10px', background: '#f8fafc', border: '2px dashed #e2e8f0', borderRadius: '8px' }}
                />
                {previews.length > 0 && (
                  <div className="image-preview">
                    {previews.map((src, i) => (
                      <img key={i} src={src} alt={`Preview ${i + 1}`} />
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'جاري الإرسال...' : 'إرسال للتقييم'}
              </button>

              <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: '#888' }}>
                * التقييم المقدم تقريبي وليس أكيد ويعتمد على حالة السيارة الفعلية
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default CarValuation
