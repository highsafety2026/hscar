import { Phone, Mail, MapPin } from 'lucide-react'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>عن المركز</h4>
            <p>الأمان العالي الدولي للفحص الفني للسيارات - مركز متخصص في تقديم خدمات الفحص الشامل للسيارات بأحدث التقنيات والمعايير العالمية.</p>
          </div>
          <div className="footer-section">
            <h4>تواصل معنا</h4>
            <div className="contact-info">
              <Phone size={18} />
              <span>+971 54 220 6000</span>
            </div>
            <div className="contact-info">
              <Mail size={18} />
              <span>highsafery2021@gmail.com</span>
            </div>
          </div>
          <div className="footer-section">
            <h4>روابط سريعة</h4>
            <a href="/services">خدماتنا</a>
            <a href="/booking">حجز موعد</a>
            <a href="/report">تحميل التقرير</a>
            <a href="/valuation">تقييم السيارة</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 الأمان العالي الدولي للفحص الفني للسيارات - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
