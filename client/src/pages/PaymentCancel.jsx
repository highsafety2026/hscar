import { Link } from 'react-router-dom'
import { XCircle, Home, CreditCard, Phone } from 'lucide-react'

function PaymentCancel() {
  return (
    <div className="payment-result-page">
      <div className="payment-result-container cancel">
        <div className="result-icon cancel">
          <XCircle size={80} />
        </div>
        
        <h1>تم إلغاء الدفع</h1>
        <p className="result-message">
          لم تتم عملية الدفع. لم يتم خصم أي مبلغ من حسابك.
        </p>

        <div className="cancel-reasons">
          <h3>أسباب محتملة:</h3>
          <ul>
            <li>قمت بإلغاء العملية</li>
            <li>انتهت صلاحية الجلسة</li>
            <li>رفض البطاقة من البنك</li>
          </ul>
        </div>

        <div className="result-actions">
          <Link to="/payment" className="btn-result-primary">
            <CreditCard size={18} />
            حاول مرة أخرى
          </Link>
          <Link to="/" className="btn-result-secondary">
            <Home size={18} />
            العودة للرئيسية
          </Link>
        </div>

        <div className="contact-info">
          <Phone size={18} />
          <span>للمساعدة: +971 54 220 6000</span>
        </div>
      </div>
    </div>
  )
}

export default PaymentCancel
