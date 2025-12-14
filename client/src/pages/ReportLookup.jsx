import { useState } from 'react'
import { FileText, Download, Search, Image, X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

function ReportLookup() {
  const { language, t } = useLanguage()
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
        setMessage(t.report.found || 'Report found!')
        setMessageType('success')
      } else {
        setMessage(t.report.notFound)
        setMessageType('error')
      }
    } catch (error) {
      setMessage(t.common.error)
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0B1F3A 0%, #0B1F3A 40%, #C89D2A 100%)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        marginTop: '40px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px 30px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={60} color="#0B1F3A" strokeWidth={1.5} />
            </div>
            
            <h1 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#0B1F3A',
              margin: '0 0 10px 0',
              lineHeight: '1.3'
            }}>
              {language === 'ar' ? 'تحميل تقرير' : 'Download'}
              <br />
              {language === 'ar' ? 'الفحص' : 'Inspection Report'}
            </h1>
            
            <div style={{
              width: '50px',
              height: '4px',
              background: '#C89D2A',
              margin: '15px auto 0',
              borderRadius: '2px'
            }}></div>
          </div>

          {message && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '12px',
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: '600',
              background: messageType === 'success' ? '#d4edda' : '#f8d7da',
              color: messageType === 'success' ? '#155724' : '#721c24',
              border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              {message}
            </div>
          )}

          {!report ? (
            <form onSubmit={findReport}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#0B1F3A',
                  textAlign: 'center'
                }}>
                  {language === 'ar' ? 'كود التقرير' : 'Report Code'}
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  required
                  placeholder={language === 'ar' ? 'أدخل كود التقرير' : 'Enter report code'}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    fontSize: '1.1rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    textAlign: 'center',
                    letterSpacing: '2px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    background: '#f8f9fa',
                    color: '#0B1F3A',
                    outline: 'none',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#C89D2A'
                    e.target.style.boxShadow = '0 0 0 3px rgba(200,157,42,0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e0e0e0'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading || !code.trim()}
                style={{ 
                  width: '100%',
                  padding: '16px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  background: '#EA4335',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: loading || !code.trim() ? 'not-allowed' : 'pointer',
                  opacity: loading || !code.trim() ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 15px rgba(234,67,53,0.3)'
                }}
                onMouseOver={(e) => {
                  if (!loading && code.trim()) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(234,67,53,0.4)'
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(234,67,53,0.3)'
                }}
              >
                {loading ? (
                  <span>{language === 'ar' ? 'جاري البحث...' : 'Searching...'}</span>
                ) : (
                  <>
                    <Search size={20} />
                    <span>{language === 'ar' ? 'البحث عن التقرير' : 'Search for Report'}</span>
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
                marginBottom: '20px',
                border: '1px solid #e0e0e0'
              }}>
                <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '0.9rem' }}>
                  {language === 'ar' ? 'اسم العميل:' : 'Customer Name:'}
                </p>
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
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '16px',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    background: '#0B1F3A',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    marginBottom: '15px',
                    boxShadow: '0 4px 15px rgba(11,31,58,0.3)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Download size={22} />
                  {t.report.downloadPdf}
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
                    <span style={{ fontWeight: '600' }}>{t.report.images} ({report.images.length})</span>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                    gap: '8px'
                  }}>
                    {report.images.map((img, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImage(`/uploads/${img}`)}
                        style={{
                          borderRadius: '8px',
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
                          alt={`${language === 'ar' ? 'صورة فحص' : 'Inspection image'} ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '70px',
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
                    {t.report.downloadAll}
                  </a>
                </div>
              )}
              
              <button 
                onClick={resetForm} 
                style={{ 
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  background: 'transparent',
                  color: '#0B1F3A',
                  border: '2px solid #0B1F3A',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#0B1F3A'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#0B1F3A'
                }}
              >
                {language === 'ar' ? 'بحث جديد' : 'New Search'}
              </button>
            </div>
          )}
        </div>
      </div>

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
            alt={language === 'ar' ? 'صورة مكبرة' : 'Enlarged image'}
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
  )
}

export default ReportLookup
