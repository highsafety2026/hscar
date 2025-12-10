import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, Home, FileText, Phone } from 'lucide-react'

function PaymentSuccess() {
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
        
        <h1>تم الدفع بنجاح!</h1>
        <p className="result-message">
          شكراً لك! تم استلام دفعتك بنجاح.
        </p>

        {loading ? (
          <p>جاري التحقق من الدفع...</p>
        ) : paymentData ? (
          <div className="payment-details">
            <div className="detail-row">
              <span>الاسم:</span>
              <span>{paymentData.customerName}</span>
            </div>
            <div className="detail-row">
              <span>المبلغ:</span>
              <span>{paymentData.amount} {paymentData.currency?.toUpperCase()}</span>
            </div>
            <div className="detail-row">
              <span>الحالة:</span>
              <span className="status-paid">مدفوع</span>
            </div>
          </div>
        ) : null}

        <div className="next-steps">
          <h3>الخطوات التالية:</h3>
          <ul>
            <li>سيتم التواصل معك لتأكيد موعد الفحص</li>
            <li>ستصلك رسالة على البريد الإلكتروني بتفاصيل الدفع</li>
            <li>يمكنك تحميل تقرير الفحص بعد إكماله من صفحة التقارير</li>
          </ul>
        </div>

        <div className="result-actions">
          <Link to="/" className="btn-result-primary">
            <Home size={18} />
            العودة للرئيسية
          </Link>
          <Link to="/report" className="btn-result-secondary">
            <FileText size={18} />
            تحميل التقرير
          </Link>
        </div>

        <div className="contact-info">
          <Phone size={18} />
          <span>للاستفسار: +971 54 220 6000</span>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
