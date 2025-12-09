import { Link } from 'react-router-dom'
import { Shield, CheckCircle, Clock, Award, FileText, Car, Phone, MapPin, Wrench, Star } from 'lucide-react'
import RatingSection from '../components/RatingSection'

function Home() {
  return (
    <div>
      <section className="hero" style={{ 
        backgroundImage: 'linear-gradient(135deg, rgba(11,31,58,0.92), rgba(26,54,93,0.88)), url(/images/hero-banner.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <img 
            src="/images/logo.png" 
            alt="High Safety Logo" 
            style={{ 
              width: '140px', 
              height: '140px', 
              borderRadius: '50%', 
              marginBottom: '30px', 
              border: '4px solid #C89D2A',
              boxShadow: '0 10px 40px rgba(200,157,42,0.4)'
            }} 
          />
          <h2 style={{ marginBottom: '25px' }}>الأمان العالي الدولي للفحص الفني للسيارات</h2>
          <p style={{ fontSize: '1.3rem', marginBottom: '40px' }}>
            المركز الأول والأفضل في فحص جميع أنواع السيارات بأحدث الأجهزة والتقنيات العالمية
            <br />
            <span style={{ color: '#C89D2A', fontWeight: '600' }}>فريق متخصص • تقارير شاملة • دقة عالية</span>
          </p>
          <div className="cta-buttons">
            <Link to="/booking" className="btn btn-primary">
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                احجز موعدك الآن
              </span>
            </Link>
            <Link to="/report" className="btn btn-secondary">حمّل تقريرك</Link>
          </div>
        </div>
      </section>

      <section style={{ 
        padding: '30px 0', 
        background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
        borderBottom: '3px solid #C89D2A'
      }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '30px',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Wrench size={24} color="#0B1F3A" />
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>+5000</div>
                <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>سيارة تم فحصها</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Award size={24} color="#0B1F3A" />
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>+10</div>
                <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>سنوات خبرة</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle size={24} color="#0B1F3A" />
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>+500</div>
                <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>عميل سعيد</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 className="section-title">جولة في مركزنا</h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '2fr 1fr', 
            gap: '20px', 
            marginTop: '50px',
            marginBottom: '20px'
          }} className="gallery-main">
            <div style={{ 
              borderRadius: '20px', 
              overflow: 'hidden', 
              boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
              position: 'relative',
              gridRow: 'span 2'
            }}>
              <img 
                src="/images/inspection-area.jpg" 
                alt="منطقة الفحص" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px' }} 
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(11,31,58,0.95))',
                padding: '40px 25px 25px',
                color: 'white'
              }}>
                <h4 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>منطقة الفحص الفني</h4>
                <p style={{ opacity: 0.9, fontSize: '1rem' }}>مجهزة بأحدث رافعات الفحص والمعدات المتطورة</p>
              </div>
            </div>
            <div style={{ 
              borderRadius: '20px', 
              overflow: 'hidden', 
              boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
              position: 'relative'
            }}>
              <img 
                src="/images/engineer-car.jpg" 
                alt="مهندس الفحص" 
                style={{ width: '100%', height: '190px', objectFit: 'cover' }} 
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(11,31,58,0.9))',
                padding: '25px 15px 15px',
                color: 'white'
              }}>
                <h4 style={{ fontSize: '1.1rem' }}>فريق الفحص المتخصص</h4>
              </div>
            </div>
            <div style={{ 
              borderRadius: '20px', 
              overflow: 'hidden', 
              boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
              position: 'relative'
            }}>
              <img 
                src="/images/engineer-checking.jpg" 
                alt="فحص تحت السيارة" 
                style={{ width: '100%', height: '190px', objectFit: 'cover' }} 
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(11,31,58,0.9))',
                padding: '25px 15px 15px',
                color: 'white'
              }}>
                <h4 style={{ fontSize: '1.1rem' }}>فحص شامل للسيارة</h4>
              </div>
            </div>
          </div>

          <h3 style={{ textAlign: 'center', marginTop: '60px', marginBottom: '30px', color: '#0B1F3A', fontSize: '1.5rem' }}>
            صالات الاستقبال والضيافة
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '20px'
          }}>
            <div style={{ 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
              position: 'relative'
            }}>
              <img 
                src="/images/vip-lounge.jpg" 
                alt="صالة VIP" 
                style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(11,31,58,0.9))',
                padding: '25px 15px 12px',
                color: 'white'
              }}>
                <h4 style={{ fontSize: '1rem' }}>صالة VIP</h4>
              </div>
            </div>
            <div style={{ 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
              position: 'relative'
            }}>
              <img 
                src="/images/reception1.jpg" 
                alt="استقبال العملاء" 
                style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(11,31,58,0.9))',
                padding: '25px 15px 12px',
                color: 'white'
              }}>
                <h4 style={{ fontSize: '1rem' }}>صالة الاستقبال</h4>
              </div>
            </div>
            <div style={{ 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
              position: 'relative'
            }}>
              <img 
                src="/images/reception2.jpg" 
                alt="منطقة الانتظار" 
                style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(11,31,58,0.9))',
                padding: '25px 15px 12px',
                color: 'white'
              }}>
                <h4 style={{ fontSize: '1rem' }}>منطقة الانتظار</h4>
              </div>
            </div>
            <div style={{ 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
              position: 'relative'
            }}>
              <img 
                src="/images/recharge-station1.jpg" 
                alt="محطة المشروبات" 
                style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(11,31,58,0.9))',
                padding: '25px 15px 12px',
                color: 'white'
              }}>
                <h4 style={{ fontSize: '1rem' }}>ركن المشروبات</h4>
              </div>
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
                <Shield size={38} />
              </div>
              <h3>فحص شامل ودقيق</h3>
              <p>نقوم بفحص جميع أجزاء السيارة بدقة عالية باستخدام أحدث الأجهزة والتقنيات المتطورة.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <CheckCircle size={38} />
              </div>
              <h3>تقارير موثوقة</h3>
              <p>نقدم تقارير مفصلة وشاملة توضح حالة السيارة بكل شفافية ووضوح.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={38} />
              </div>
              <h3>سرعة في الإنجاز</h3>
              <p>نحرص على تقديم خدماتنا بسرعة وكفاءة عالية دون التأثير على جودة الفحص.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Award size={38} />
              </div>
              <h3>فريق متخصص</h3>
              <p>فريقنا يتكون من خبراء ومتخصصين في مجال فحص السيارات بخبرة واسعة.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FileText size={38} />
              </div>
              <h3>تقارير رقمية</h3>
              <p>احصل على تقريرك بصيغة PDF مباشرة على هاتفك بكل سهولة وأمان.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Car size={38} />
              </div>
              <h3>تقييم السيارات</h3>
              <p>خدمة تقييم سعر السيارة من خلال الصور والبيانات بشكل تقريبي.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ 
        padding: '80px 0', 
        background: 'linear-gradient(135deg, #0B1F3A 0%, #1a365d 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2.2rem', marginBottom: '20px', fontWeight: '700' }}>جاهز لفحص سيارتك؟</h2>
          <p style={{ marginBottom: '40px', fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 40px' }}>
            احجز موعدك الآن واحصل على تقرير شامل ومفصل عن حالة سيارتك مع ضمان الجودة والدقة
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/booking" 
              className="btn" 
              style={{ 
                background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
                color: '#0B1F3A',
                fontSize: '1.1rem', 
                padding: '16px 45px',
                fontWeight: '700'
              }}
            >
              احجز موعدك الآن
            </Link>
            <a 
              href="https://wa.me/971542206000" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn" 
              style={{ 
                background: '#25D366',
                color: 'white',
                fontSize: '1.1rem', 
                padding: '16px 45px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <Phone size={20} />
              تواصل واتساب
            </a>
          </div>
        </div>
      </section>

      <RatingSection />
    </div>
  )
}

export default Home
