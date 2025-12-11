import { Link } from 'react-router-dom'
import { XCircle, Home, CreditCard, Phone } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

function PaymentCancel() {
  const { language, t } = useLanguage()

  return (
    <div className="payment-result-page">
      <div className="payment-result-container cancel">
        <div className="result-icon cancel">
          <XCircle size={80} />
        </div>
        
        <h1>{t.paymentCancel.title}</h1>
        <p className="result-message">
          {t.paymentCancel.message}
        </p>

        <div className="cancel-reasons">
          <h3>{language === 'ar' ? 'أسباب محتملة:' : 'Possible reasons:'}</h3>
          <ul>
            <li>{language === 'ar' ? 'قمت بإلغاء العملية' : 'You cancelled the transaction'}</li>
            <li>{language === 'ar' ? 'انتهت صلاحية الجلسة' : 'Session expired'}</li>
            <li>{language === 'ar' ? 'رفض البطاقة من البنك' : 'Card declined by bank'}</li>
          </ul>
        </div>

        <div className="result-actions">
          <Link to="/payment" className="btn-result-primary">
            <CreditCard size={18} />
            {t.paymentCancel.tryAgain}
          </Link>
          <Link to="/" className="btn-result-secondary">
            <Home size={18} />
            {t.paymentCancel.backHome}
          </Link>
        </div>

        <div className="contact-info">
          <Phone size={18} />
          <span>{t.paymentCancel.contact} +971 54 220 6000</span>
        </div>
      </div>
    </div>
  )
}

export default PaymentCancel
