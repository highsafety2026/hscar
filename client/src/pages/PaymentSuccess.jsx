import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, Home, FileText, Phone } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

function PaymentSuccess() {
  const { language, t } = useLanguage()
  const [searchParams] = useSearchParams()
  const [paymentData, setPaymentData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      fetch(`/api/payment/verify/${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setPaymentData(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [searchParams])

  return (
    <div className="payment-result-page">
      <div className="payment-result-container success">
        <div className="result-icon">
          <CheckCircle size={80} />
        </div>
        
        <h1>{t.paymentSuccess.title}</h1>
        <p className="result-message">
          {t.paymentSuccess.message}
        </p>

        {loading ? (
          <p>{language === 'ar' ? 'جاري التحقق من الدفع...' : 'Verifying payment...'}</p>
        ) : paymentData ? (
          <div className="payment-details">
            <div className="detail-row">
              <span>{t.paymentSuccess.name}:</span>
              <span>{paymentData.customerName}</span>
            </div>
            <div className="detail-row">
              <span>{t.paymentSuccess.amount}:</span>
              <span>{paymentData.amount} {paymentData.currency?.toUpperCase()}</span>
            </div>
            <div className="detail-row">
              <span>{t.paymentSuccess.status}:</span>
              <span className="status-paid">{t.paymentSuccess.paid}</span>
            </div>
          </div>
        ) : null}

        <div className="next-steps">
          <h3>{t.paymentSuccess.nextSteps}</h3>
          <ul>
            <li>{t.paymentSuccess.step1}</li>
            <li>{t.paymentSuccess.step2}</li>
            <li>{t.paymentSuccess.step3}</li>
          </ul>
        </div>

        <div className="result-actions">
          <Link to="/" className="btn-result-primary">
            <Home size={18} />
            {t.paymentSuccess.backHome}
          </Link>
          <Link to="/report" className="btn-result-secondary">
            <FileText size={18} />
            {t.paymentSuccess.downloadReport}
          </Link>
        </div>

        <div className="contact-info">
          <Phone size={18} />
          <span>{t.paymentSuccess.contact} +971 54 220 6000</span>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
