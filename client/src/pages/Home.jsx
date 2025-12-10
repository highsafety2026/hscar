import { Link } from 'react-router-dom'
import { Shield, CheckCircle, Clock, Award, FileText, Car, Phone, MapPin, Wrench, Star, Coffee, Users } from 'lucide-react'
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

        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <h2 className="section-title">مرافق المركز</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '50px', fontSize: '1.1rem' }}>
            نوفر لعملائنا الكرام بيئة مريحة أثناء انتظار فحص سياراتهم
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '25px'
          }}>
            <div style={{ 
              borderRadius: '20px', 
              overflow: 'hidden', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              background: 'white'
            }}>
              <img 
                src="/images/gallery/reception1.jpg" 
                alt="مكتب الاستقبال" 
                style={{ width: '100%', height: '250px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '-45px auto 15px'
                }}>
                  <Users size={24} color="#0B1F3A" />
                </div>
                <h4 style={{ color: '#0B1F3A', marginBottom: '8px', fontSize: '1.2rem' }}>مكتب الاستقبال</h4>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>استقبال مميز وخدمة عملاء احترافية</p>
              </div>
            </div>

            <div style={{ 
              borderRadius: '20px', 
              overflow: 'hidden', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              background: 'white'
            }}>
              <img 
                src="/images/gallery/waiting1.jpg" 
                alt="صالة الانتظار" 
                style={{ width: '100%', height: '250px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '-45px auto 15px'
                }}>
                  <Star size={24} color="#0B1F3A" />
                </div>
                <h4 style={{ color: '#0B1F3A', marginBottom: '8px', fontSize: '1.2rem' }}>صالة الانتظار VIP</h4>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>جلسات مريحة وأجواء هادئة</p>
              </div>
            </div>

            <div style={{ 
              borderRadius: '20px', 
              overflow: 'hidden', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              background: 'white'
            }}>
              <img 
                src="/images/gallery/drinks.jpg" 
                alt="منطقة المشروبات" 
                style={{ width: '100%', height: '250px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '-45px auto 15px'
                }}>
                  <Coffee size={24} color="#0B1F3A" />
                </div>
                <h4 style={{ color: '#0B1F3A', marginBottom: '8px', fontSize: '1.2rem' }}>منطقة المشروبات</h4>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>قهوة ومشروبات مجانية لعملائنا</p>
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '20px',
            marginTop: '25px'
          }}>
            <div style={{ 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
            }}>
              <img 
                src="/images/gallery/reception2.jpg" 
                alt="مكتب الاستقبال" 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
              />
            </div>
            <div style={{ 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
            }}>
              <img 
                src="/images/gallery/waiting2.jpg" 
                alt="صالة الانتظار" 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
              />
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

      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 className="section-title">موقعنا</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px', fontSize: '1.1rem' }}>
            تفضلوا بزيارتنا في الشارقة - المنطقة الصناعية
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px',
            alignItems: 'center'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MapPin size={30} color="#0B1F3A" />
                </div>
                <div>
                  <h4 style={{ color: '#0B1F3A', marginBottom: '5px' }}>العنوان</h4>
                  <p style={{ color: '#666', fontSize: '0.95rem' }}>الشارقة - المنطقة الصناعية 4</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Phone size={30} color="white" />
                </div>
                <div>
                  <h4 style={{ color: '#0B1F3A', marginBottom: '5px' }}>واتساب</h4>
                  <a href="https://wa.me/971542206000" style={{ color: '#25D366', fontWeight: '600', fontSize: '1.1rem' }}>
                    +971 54 220 6000
                  </a>
                </div>
              </div>

              <a 
                href="https://maps.app.goo.gl/7W2ULSzLzGSR6Lj4A" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: 'linear-gradient(135deg, #4285F4, #34A853)',
                  color: 'white',
                  padding: '15px 30px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.05rem',
                  marginTop: '20px'
                }}
              >
                <MapPin size={20} />
                افتح في خرائط جوجل
              </a>
            </div>

            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              height: '350px'
            }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.851!2d55.4469!3d25.3153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5b8c9c9c9c9c%3A0x9c9c9c9c9c9c9c9c!2sHigh%20Safety%20International!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
