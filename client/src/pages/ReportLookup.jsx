import { useState } from 'react'
import { FileText, Download, Search, Image, X } from 'lucide-react'

function ReportLookup() {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const findReport = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setReport(null)
    
    try {
      const res = await fetch('/api/reports/find-by-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() })
      })
      const data = await res.json()
      
      if (data.success) {
        setReport(data.report)
        setMessage('تم العثور على التقرير!')
        setMessageType('success')
      } else {
        setMessage(data.message || 'لم يتم العثور على تقرير بهذا الكود')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('حدث خطأ، يرجى المحاولة لاحقاً')
      setMessageType('error')
    }
    setLoading(false)
  }

  const resetForm = () => {
    setCode('')
    setMessage('')
    setReport(null)
  }

  return (
    <div className="form-page">
      <div className="container">
        <div className="form-container" style={{ maxWidth: '500px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px'
            }}>
              <FileText size={40} color="#C89D2A" />
            </div>
            <h2 className="section-title" style={{ marginBottom: '10px' }}>تحميل تقرير الفحص</h2>
            <p style={{ color: '#666', fontSize: '1rem' }}>Download Inspection Report</p>
          </div>
          
          {message && (
            <div className={`${messageType}-message`} style={{
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              {message}
            </div>
          )}

          {!report ? (
            <form onSubmit={findReport}>
              <div className="form-group">
                <label style={{ 
                  display: 'block', 
                  marginBottom: '10px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#0B1F3A'
                }}>
                  أدخل كود التقرير
                  <span style={{ display: 'block', fontSize: '0.9rem', color: '#666', fontWeight: 'normal' }}>
                    Enter Report Code
                  </span>
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  required
                  placeholder="مثال: ABC123"
                  style={{
                    textAlign: 'center',
                    fontSize: '1.3rem',
                    letterSpacing: '3px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    padding: '15px'
                  }}
                />
                <p style={{ 
                  fontSize: '0.85rem', 
                  color: '#888', 
                  marginTop: '10px',
                  textAlign: 'center'
                }}>
                  الكود موجود في إيصال الفحص
                </p>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ 
                  width: '100%',
                  padding: '15px',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }} 
                disabled={loading || !code.trim()}
              >
                {loading ? (
                  'جاري البحث...'
                ) : (
                  <>
                    <Search size={20} />
                    البحث عن التقرير
                  </>
                )}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px'
              }}>
                <p style={{ margin: '0 0 5px 0', color: '#666' }}>اسم العميل:</p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '1.2rem', 
                  fontWeight: '700',
                  color: '#0B1F3A'
                }}>{report.customerName}</p>
              </div>
              
              {report.filename && (
                <a
                  href={`/uploads/${report.filename}`}
                  download
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    borderRadius: '10px',
                    marginBottom: '15px'
                  }}
                >
                  <Download size={22} />
                  تحميل التقرير PDF
                </a>
              )}

              {report.images && report.images.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginBottom: '15px',
                    color: '#0B1F3A'
                  }}>
                    <Image size={20} />
                    <span style={{ fontWeight: '600' }}>صور الفحص ({report.images.length})</span>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                    gap: '10px'
                  }}>
                    {report.images.map((img, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImage(`/uploads/${img}`)}
                        style={{
                          borderRadius: '10px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          transition: 'transform 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <img
                          src={`/uploads/${img}`}
                          alt={`صورة فحص ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '80px',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      report.images.forEach((img, i) => {
                        setTimeout(() => {
                          const link = document.createElement('a')
                          link.href = `/uploads/${img}`
                          link.download = `inspection-image-${i + 1}.jpg`
                          link.click()
                        }, i * 300)
                      })
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '15px',
                      color: '#C89D2A',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    <Download size={18} />
                    تحميل جميع الصور
                  </a>
                </div>
              )}
              
              <button 
                onClick={resetForm} 
                className="btn btn-secondary" 
                style={{ 
                  width: '100%',
                  padding: '12px'
                }}
              >
                بحث جديد | New Search
              </button>
            </div>
          )}

          {selectedImage && (
            <div
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                cursor: 'pointer'
              }}
            >
              <button
                onClick={() => setSelectedImage(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={24} color="#0B1F3A" />
              </button>
              <img
                src={selectedImage}
                alt="صورة مكبرة"
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  borderRadius: '10px'
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportLookup
