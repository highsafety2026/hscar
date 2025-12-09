import { Link } from 'react-router-dom'
import { Shield, CheckCircle, Clock, Award, FileText, Car } from 'lucide-react'

function Home() {
  return (
    <div>
      <section className="hero" style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/images/hero-banner.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <img src="/images/logo.png" alt="High Safety Logo" style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px', border: '3px solid #ffd700' }} />
          <h2>الأمان العالي الدولي للفحص الفني للسيارات</h2>
          <p>مركز متخصص في تقديم خدمات الفحص الشامل للسيارات بأحدث التقنيات والمعايير العالمية. نضمن لك تقريراً دقيقاً وموثوقاً لحالة سيارتك.</p>
          <div className="cta-buttons">
            <Link to="/booking" className="btn btn-primary">احجز موعدك الآن</Link>
            <Link to="/report" className="btn btn-secondary">حمّل تقريرك</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 className="section-title">صور من مركزنا</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
            <div style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
              <img src="/images/inspection1.jpg" alt="فحص السيارات" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            </div>
            <div style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
              <img src="/images/inspection2.jpg" alt="فحص فني" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">لماذا تختارنا؟</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={35} />
              </div>
              <h3>فحص شامل ودقيق</h3>
              <p>نقوم بفحص جميع أجزاء السيارة بدقة عالية باستخدام أحدث الأجهزة والتقنيات المتطورة.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <CheckCircle size={35} />
              </div>
              <h3>تقارير موثوقة</h3>
              <p>نقدم تقارير مفصلة وشاملة توضح حالة السيارة بكل شفافية ووضوح.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={35} />
              </div>
              <h3>سرعة في الإنجاز</h3>
              <p>نحرص على تقديم خدماتنا بسرعة وكفاءة عالية دون التأثير على جودة الفحص.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Award size={35} />
              </div>
              <h3>فريق متخصص</h3>
              <p>فريقنا يتكون من خبراء ومتخصصين في مجال فحص السيارات بخبرة واسعة.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FileText size={35} />
              </div>
              <h3>تقارير رقمية</h3>
              <p>احصل على تقريرك بصيغة PDF مباشرة على هاتفك بكل سهولة وأمان.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Car size={35} />
              </div>
              <h3>تقييم السيارات</h3>
              <p>خدمة تقييم سعر السيارة من خلال الصور والبيانات بشكل تقريبي.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">جاهز لفحص سيارتك؟</h2>
          <p style={{ marginBottom: '30px', fontSize: '1.1rem', color: '#666' }}>
            احجز موعدك الآن واحصل على تقرير شامل ومفصل عن حالة سيارتك
          </p>
          <Link to="/booking" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '15px 40px' }}>
            احجز موعدك الآن
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
