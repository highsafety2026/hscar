import { useState } from 'react'
import { FileText, Download, Search } from 'lucide-react'

function ReportLookup() {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)

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
        </div>
      </div>
    </div>
  )
}

export default ReportLookup
