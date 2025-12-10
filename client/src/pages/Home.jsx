import { Link } from 'react-router-dom'
import { Shield, CheckCircle, Clock, Award, FileText, Car, MapPin, Wrench, Star, Coffee, Users, ArrowLeft, Zap, Eye, Settings, FileCheck, Phone } from 'lucide-react'
import RatingSection from '../components/RatingSection'

function Home() {
  const services = [
    {
      id: 'full',
      icon: <Shield size={32} />,
      title: 'الفحص الشامل',
      titleEn: 'Full Inspection',
      desc: 'فحص كامل لجميع أجزاء السيارة',
      color: '#C89D2A',
      features: ['200+ نقطة فحص', 'تقرير مفصل', 'ضمان الدقة']
    },
    {
      id: 'mechanical',
      icon: <Settings size={32} />,
      title: 'ميكانيكي + كمبيوتر',
      titleEn: 'Mechanical + Computer',
      desc: 'فحص المحرك وناقل الحركة والكمبيوتر',
      color: '#4285F4',
      features: ['فحص المحرك', 'فحص الجيربوكس', 'قراءة الأكواد']
    },
    {
      id: 'misc',
      icon: <Eye size={32} />,
      title: 'فحوصات متنوعة',
      titleEn: 'Various Tests',
      desc: 'فحص الهيكل والبودي والطلاء',
      color: '#34A853',
      features: ['فحص الحوادث', 'قياس الطلاء', 'فحص الشاسيه']
    },
    {
      id: 'basic',
      icon: <FileCheck size={32} />,
      title: 'فحص أساسي',
      titleEn: 'Basic Check',
      desc: 'فحص سريع للأجزاء الأساسية',
      color: '#EA4335',
      features: ['فحص سريع', 'النقاط الأساسية', 'تقرير مختصر']
    }
  ]

  const stats = [
    { icon: <Wrench size={28} />, number: '+5,000', label: 'سيارة تم فحصها' },
    { icon: <Award size={28} />, number: '+10', label: 'سنوات خبرة' },
    { icon: <Users size={28} />, number: '+500', label: 'عميل سعيد' },
    { icon: <Star size={28} />, number: '4.9', label: 'تقييم العملاء' }
  ]

  const whyUs = [
    { icon: <Zap size={36} />, title: 'سرعة في الإنجاز', desc: 'فحص شامل خلال ساعة واحدة فقط' },
    { icon: <Shield size={36} />, title: 'دقة عالية', desc: 'أحدث أجهزة الفحص العالمية' },
    { icon: <FileText size={36} />, title: 'تقارير مفصلة', desc: 'تقرير PDF شامل مع صور' },
    { icon: <Award size={36} />, title: 'فريق متخصص', desc: 'مهندسون وفنيون ذوو خبرة' }
  ]

  return (
    <div className="home-page">
      <section className="hero-modern">
        <div className="hero-bg-pattern"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Star size={16} fill="#C89D2A" color="#C89D2A" />
              <span>المركز الأول في الإمارات</span>
            </div>
            <h1>الأمان العالي الدولي</h1>
            <h2>للفحص الفني للسيارات</h2>
            <p className="hero-subtitle">
              نقدم لكم خدمات فحص السيارات بأعلى معايير الجودة والدقة
              <br />
              <strong>أجهزة متطورة • فريق محترف • تقارير شاملة</strong>
            </p>
            <div className="hero-actions">
              <Link to="/booking" className="btn-hero-primary">
                <span>احجز موعدك الآن</span>
                <ArrowLeft size={20} />
              </Link>
              <Link to="/report" className="btn-hero-secondary">
                <FileText size={20} />
                <span>تحميل التقرير</span>
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/logo.png" alt="High Safety Logo" className="hero-logo" />
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">خدماتنا</span>
            <h2>اختر نوع الفحص المناسب</h2>
            <p>نوفر لكم باقات متنوعة تناسب جميع احتياجاتكم</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="service-card"
                style={{ '--card-color': service.color }}
              >
                <div className="service-icon" style={{ background: service.color }}>
                  {service.icon}
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <span className="service-title-en">{service.titleEn}</span>
                  <p>{service.desc}</p>
                  <ul className="service-features">
                    {service.features.map((f, i) => (
                      <li key={i}><CheckCircle size={14} /> {f}</li>
                    ))}
                  </ul>
                  <div className="service-footer">
                    <Link to="/booking" className="service-btn">احجز الآن</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="why-us-section">
        <div className="container">
          <div className="section-header light">
            <span className="section-badge">لماذا نحن؟</span>
            <h2>مميزات تجعلنا الخيار الأول</h2>
          </div>
          <div className="why-us-grid">
            {whyUs.map((item, index) => (
              <div key={index} className="why-us-card">
                <div className="why-us-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">جولة افتراضية</span>
            <h2>تعرف على مركزنا</h2>
            <p>مرافق حديثة ومجهزة بأعلى المعايير</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item large">
              <img src="/images/inspection-area.jpg" alt="منطقة الفحص" />
              <div className="gallery-overlay">
                <h4>منطقة الفحص الفني</h4>
                <p>أحدث رافعات الفحص والمعدات</p>
              </div>
            </div>
            <div className="gallery-item">
              <img src="/images/engineer-car.jpg" alt="فريق الفحص" />
              <div className="gallery-overlay">
                <h4>فريق متخصص</h4>
              </div>
            </div>
            <div className="gallery-item">
              <img src="/images/engineer-checking.jpg" alt="فحص السيارة" />
              <div className="gallery-overlay">
                <h4>فحص شامل</h4>
              </div>
            </div>
          </div>
          <div className="facilities-grid">
            <div className="facility-card">
              <img src="/images/gallery/reception1.jpg" alt="الاستقبال" />
              <div className="facility-info">
                <Users size={24} />
                <div>
                  <h4>مكتب الاستقبال</h4>
                  <p>خدمة عملاء احترافية</p>
                </div>
              </div>
            </div>
            <div className="facility-card">
              <img src="/images/gallery/waiting1.jpg" alt="صالة الانتظار" />
              <div className="facility-info">
                <Star size={24} />
                <div>
                  <h4>صالة انتظار VIP</h4>
                  <p>جلسات مريحة وأجواء هادئة</p>
                </div>
              </div>
            </div>
            <div className="facility-card">
              <img src="/images/gallery/drinks.jpg" alt="المشروبات" />
              <div className="facility-info">
                <Coffee size={24} />
                <div>
                  <h4>منطقة المشروبات</h4>
                  <p>قهوة ومشروبات مجانية</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>جاهز لفحص سيارتك؟</h2>
            <p>احجز موعدك الآن واحصل على تقرير شامل ومفصل</p>
            <div className="cta-buttons">
              <Link to="/booking" className="btn-cta-primary">
                احجز موعدك الآن
                <ArrowLeft size={20} />
              </Link>
              <a href="https://wa.me/9710542206000" className="btn-cta-whatsapp" target="_blank" rel="noopener noreferrer">
                <Phone size={20} />
                تواصل واتساب
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="location-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">موقعنا</span>
            <h2>تفضلوا بزيارتنا</h2>
          </div>
          <div className="location-grid">
            <div className="location-card">
              <div className="location-info">
                <div className="location-icon">
                  <MapPin size={30} />
                </div>
                <div>
                  <h4>العنوان</h4>
                  <p>الشارقة - المنطقة الصناعية 13</p>
                </div>
              </div>
              <a 
                href="https://maps.app.goo.gl/7W2ULSzLzGSR6Lj4A" 
                target="_blank"
                rel="noopener noreferrer"
                className="location-btn"
              >
                <MapPin size={18} />
                افتح في خرائط جوجل
              </a>
            </div>
            <div className="location-map">
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

      <RatingSection />
    </div>
  )
}

export default Home
