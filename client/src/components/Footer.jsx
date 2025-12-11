import { Phone, Mail, MapPin } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

function Footer() {
  const { language, t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>{t.footer.about}</h4>
            <p>{t.footer.aboutText}</p>
          </div>
          <div className="footer-section">
            <h4>{t.footer.contact}</h4>
            <div className="contact-info">
              <Phone size={18} />
              <span>+971 054 220 6000</span>
            </div>
            <div className="contact-info">
              <Mail size={18} />
              <span>highsafety2021@gmail.com</span>
            </div>
          </div>
          <div className="footer-section">
            <h4>{t.footer.quickLinks}</h4>
            <a href="/services">{t.nav.services}</a>
            <a href="/booking">{t.nav.booking}</a>
            <a href="/report">{t.nav.report}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 {language === 'ar' ? 'الأمان العالي الدولي للفحص الفني للسيارات' : 'High Safety International Technical Car Inspection'} - {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
