import { useState } from 'react'
import { FileText } from 'lucide-react'

function ReportLookup() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState(1)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [demoOtp, setDemoOtp] = useState('')

  const checkReport = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setDemoOtp('')
    try {
      const res = await fetch('/api/reports/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      })
      const data = await res.json()
      if (data.found) {
        setStep(2)
        setDemoOtp(data.demoOtp)
        setMessage('تم إرسال رمز التحقق')
        setMessageType('info')
      } else {
        setMessage(data.message)
        setMessageType('error')
      }
    } catch (error) {
      setMessage('حدث خطأ، يرجى المحاولة لاحقاً')
      setMessageType('error')
    }
    setLoading(false)
  }

  const verifyOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('/api/reports/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp })
      })
      const data = await res.json()
      if (data.success) {
        setReport(data.report)
        setStep(3)
        setMessage('تم التحقق بنجاح!')
        setMessageType('success')
      } else {
        setMessage(data.message)
        setMessageType('error')
      }
    } catch (error) {
      setMessage('حدث خطأ، يرجى المحاولة لاحقاً')
      setMessageType('error')
    }
    setLoading(false)
  }

  const resetForm = () => {
    setPhone('')
    setOtp('')
    setStep(1)
    setMessage('')
    setReport(null)
    setDemoOtp('')
  }

  return (
    <div className="form-page">
      <div className="container">
        <div className="form-container">
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <FileText size={60} color="#1a365d" />
          </div>
          <h2 className="section-title">تحميل تقرير الفحص</h2>
          
          {message && (
            <div className={`${messageType}-message`}>
              {message}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={checkReport}>
              <div className="form-group">
                <label>رقم الهاتف</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="أدخل رقم الهاتف المسجل لديك"
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'جاري البحث...' : 'البحث عن التقرير'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={verifyOtp}>
              {demoOtp && (
                <div className="info-message" style={{ marginBottom: '20px' }}>
                  <strong>للتجربة:</strong> رمز التحقق هو: <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{demoOtp}</span>
                </div>
              )}
              <div className="form-group">
                <label>رمز التحقق (OTP)</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  placeholder="أدخل رمز التحقق المرسل"
                  maxLength="6"
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'جاري التحقق...' : 'تأكيد'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary" style={{ width: '100%', marginTop: '10px' }}>
                رجوع
              </button>
            </form>
          )}

          {step === 3 && report && (
            <div>
              <div className="success-message">
                <strong>تم العثور على التقرير!</strong>
                <br />
                اسم العميل: {report.customerName}
              </div>
              <a
                href={`/uploads/${report.filename}`}
                download
                className="download-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                تحميل التقرير PDF
              </a>
              <button onClick={resetForm} className="btn btn-secondary" style={{ width: '100%', marginTop: '15px' }}>
                بحث جديد
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportLookup
