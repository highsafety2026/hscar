import { Link } from 'react-router-dom'
import { Shield, CheckCircle, Clock, Award, FileText, Car, MapPin, Wrench, Star, Coffee, Users, ArrowLeft, ArrowRight, Zap, Eye, Settings, FileCheck, Phone } from 'lucide-react'
import RatingSection from '../components/RatingSection'
import { useLanguage } from '../i18n/LanguageContext'

function Home() {
  const { language, t } = useLanguage()
  const isRTL = language === 'ar'
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  const services = [
    {
      id: 'full',
      icon: <Shield size={32} />,
      title: language === 'ar' ? 'الفحص الشامل' : 'Full Inspection',
      titleEn: 'Full Inspection',
      desc: language === 'ar' ? 'فحص كامل لجميع أجزاء السيارة' : 'Complete inspection of all car parts',
      color: '#C89D2A',
      features: language === 'ar' 
        ? ['200+ نقطة فحص', 'تقرير مفصل', 'ضمان الدقة']
        : ['200+ inspection points', 'Detailed report', 'Accuracy guaranteed']
    },
    {
      id: 'mechanical',
      icon: <Settings size={32} />,
      title: language === 'ar' ? 'الميكانيكا + الكمبيوتر' : 'Mechanical + Computer',
      titleEn: 'Mechanical + Computer',
      desc: language === 'ar' ? 'فحص المحرك والقير والكمبيوتر' : 'Engine, transmission, and computer check',
      color: '#4285F4',
      features: language === 'ar'
        ? ['فحص المحرك', 'فحص القير', 'قراءة الأكواد']
        : ['Engine check', 'Gearbox check', 'Code reading']
    },
    {
      id: 'misc',
      icon: <Eye size={32} />,
      title: language === 'ar' ? 'فحوصات متنوعة' : 'Various Tests',
      titleEn: 'Various Tests',
      desc: language === 'ar' ? 'فحص الهيكل والبودي والصبغ' : 'Body, frame, and paint inspection',
      color: '#34A853',
      features: language === 'ar'
        ? ['فحص الحوادث', 'قياس الصبغ', 'فحص الشاصي']
        : ['Accident check', 'Paint measurement', 'Chassis check']
    },
    {
      id: 'basic',
      icon: <FileCheck size={32} />,
      title: language === 'ar' ? 'فحص أساسي' : 'Basic Check',
      titleEn: 'Basic Check',
      desc: language === 'ar' ? 'فحص سريع للأجزاء الأساسية' : 'Quick inspection of main parts',
      color: '#EA4335',
      features: language === 'ar'
        ? ['فحص سريع', 'النقاط الأساسية', 'تقرير مختصر']
        : ['Quick check', 'Main points', 'Brief report']
    }
  ]

  const stats = [
    { icon: <Wrench size={28} />, number: '+5,000', label: t.stats.cars },
    { icon: <Award size={28} />, number: '+10', label: t.stats.years },
    { icon: <Users size={28} />, number: '+500', label: t.stats.customers },
    { icon: <Star size={28} />, number: '4.9', label: t.stats.rating }
  ]

  const whyUs = language === 'ar' ? [
    { icon: <Zap size={36} />, title: 'سرعة في الإنجاز', desc: 'فحص شامل خلال ساعة واحدة فقط' },
    { icon: <Shield size={36} />, title: 'دقة عالية', desc: 'أحدث أجهزة الفحص العالمية' },
    { icon: <FileText size={36} />, title: 'تقارير مفصلة', desc: 'تقرير PDF شامل مع صور' },
    { icon: <Award size={36} />, title: 'فريق متخصص', desc: 'مهندسين ومهندسات ذوي خبرة' }
  ] : [
    { icon: <Zap size={36} />, title: 'Fast Service', desc: 'Complete inspection in just one hour' },
    { icon: <Shield size={36} />, title: 'High Accuracy', desc: 'Latest global inspection equipment' },
    { icon: <FileText size={36} />, title: 'Detailed Reports', desc: 'Comprehensive PDF report with photos' },
    { icon: <Award size={36} />, title: 'Expert Team', desc: 'Male & female engineers with experience' }
  ]

  return (
    <div className="home-page">
      <section className="hero-modern">
        <div className="hero-video-bg">
          <video autoPlay loop playsInline muted className="hero-video" id="heroVideo">
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay"></div>
          <button 
            className="video-sound-btn" 
            onClick={() => {
              const video = document.getElementById('heroVideo');
              video.muted = !video.muted;
            }}
            title={language === 'ar' ? 'تشغيل/إيقاف الصوت' : 'Toggle Sound'}
          >
            🔊
          </button>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Star size={16} fill="#C89D2A" color="#C89D2A" />
              <span>{t.hero.badge}</span>
            </div>
            <h1>{t.hero.title}</h1>
            <h2>{t.hero.subtitle}</h2>
            <p className="hero-subtitle">
              {t.hero.description}
              <br />
              <strong>{t.hero.features}</strong>
            </p>
            <div className="hero-actions">
              <Link to="/booking" className="btn-hero-primary">
                <span>{t.hero.bookNow}</span>
                <ArrowIcon size={20} />
              </Link>
              <Link to="/report" className="btn-hero-secondary">
                <FileText size={20} />
                <span>{t.hero.downloadReport}</span>
              </Link>
            </div>
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
            <span className="section-badge">{t.services.title}</span>
            <h2>{language === 'ar' ? 'اختر نوع الفحص المناسب' : 'Choose the Right Inspection'}</h2>
            <p>{language === 'ar' ? 'نوفر لكم باقات متنوعة تناسب جميع احتياجاتكم' : 'We offer various packages to suit all your needs'}</p>
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
                  {language === 'ar' && <span className="service-title-en">{service.titleEn}</span>}
                  <p>{service.desc}</p>
                  <ul className="service-features">
                    {service.features.map((f, i) => (
                      <li key={i}><CheckCircle size={14} /> {f}</li>
                    ))}
                  </ul>
                  <div className="service-footer">
                    <Link to="/booking" className="service-btn">
                      <span>{t.services.bookNow}</span>
                      <ArrowIcon size={16} />
                    </Link>
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
            <span className="section-badge">{language === 'ar' ? 'لماذا نحن؟' : 'Why Us?'}</span>
            <h2>{language === 'ar' ? 'مميزات تجعلنا الخيار الأول' : 'Features That Make Us #1'}</h2>
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

      <section className="engineer-spotlight">
        <div className="container">
          <div className="engineer-grid">
            <div className="engineer-image-wrapper">
              <img src="/images/engineer.jpg" alt={language === 'ar' ? 'مهندسة الفحص' : 'Inspection Engineer'} />
              <div className="engineer-badge">
                <Shield size={20} />
                <span>{language === 'ar' ? 'خبرة معتمدة' : 'Certified Expert'}</span>
              </div>
            </div>
            <div className="engineer-content">
              <span className="section-badge">{language === 'ar' ? 'فريقنا المتخصص' : 'Our Expert Team'}</span>
              <h2>{language === 'ar' ? 'مهندسين ومهندسات ذوي خبرة' : 'Experienced Male & Female Engineers'}</h2>
              <p>{language === 'ar' 
                ? 'نفتخر بفريقنا المتميز من المهندسين والمهندسات المعتمدين الذين يتمتعون بخبرة واسعة في فحص السيارات باستخدام أحدث التقنيات والمعدات.'
                : 'We are proud of our distinguished team of certified engineers with extensive experience in car inspection using the latest technologies and equipment.'}</p>
              <div className="engineer-features">
                <div className="engineer-feature">
                  <CheckCircle size={20} color="#34A853" />
                  <span>{language === 'ar' ? 'شهادات معتمدة' : 'Certified credentials'}</span>
                </div>
                <div className="engineer-feature">
                  <CheckCircle size={20} color="#34A853" />
                  <span>{language === 'ar' ? 'خبرة +10 سنوات' : '10+ years experience'}</span>
                </div>
                <div className="engineer-feature">
                  <CheckCircle size={20} color="#34A853" />
                  <span>{language === 'ar' ? 'تدريب مستمر' : 'Continuous training'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{language === 'ar' ? 'جولة افتراضية' : 'Virtual Tour'}</span>
            <h2>{language === 'ar' ? 'تعرف على مركزنا' : 'Explore Our Center'}</h2>
            <p>{language === 'ar' ? 'مرافق حديثة ومجهزة بأعلى المعايير' : 'Modern facilities equipped to the highest standards'}</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item large">
              <img src="/images/inspection-area.jpg" alt={language === 'ar' ? 'منطقة الفحص' : 'Inspection Area'} />
              <div className="gallery-overlay">
                <h4>{language === 'ar' ? 'منطقة الفحص الفني' : 'Technical Inspection Area'}</h4>
                <p>{language === 'ar' ? 'أحدث رافعات الفحص والمعدات' : 'Latest lifts and equipment'}</p>
              </div>
            </div>
            <div className="gallery-item">
              <img src="/images/engineer-car.jpg" alt={language === 'ar' ? 'فريق الفحص' : 'Inspection Team'} />
              <div className="gallery-overlay">
                <h4>{language === 'ar' ? 'فريق متخصص' : 'Expert Team'}</h4>
              </div>
            </div>
            <div className="gallery-item">
              <img src="/images/engineer-checking.jpg" alt={language === 'ar' ? 'فحص السيارة' : 'Car Inspection'} />
              <div className="gallery-overlay">
                <h4>{language === 'ar' ? 'فحص شامل' : 'Full Inspection'}</h4>
              </div>
            </div>
          </div>
          <div className="facilities-grid">
            <div className="facility-card">
              <img src="/images/gallery/reception1.jpg" alt={language === 'ar' ? 'الاستقبال' : 'Reception'} />
              <div className="facility-info">
                <Users size={24} />
                <div>
                  <h4>{language === 'ar' ? 'مكتب الاستقبال' : 'Reception Desk'}</h4>
                  <p>{language === 'ar' ? 'خدمة عملاء احترافية' : 'Professional customer service'}</p>
                </div>
              </div>
            </div>
            <div className="facility-card">
              <img src="/images/gallery/waiting1.jpg" alt={language === 'ar' ? 'صالة الانتظار' : 'Waiting Area'} />
              <div className="facility-info">
                <Star size={24} />
                <div>
                  <h4>{language === 'ar' ? 'صالة انتظار VIP' : 'VIP Waiting Lounge'}</h4>
                  <p>{language === 'ar' ? 'جلسات مريحة وأجواء هادئة' : 'Comfortable seating and calm atmosphere'}</p>
                </div>
              </div>
            </div>
            <div className="facility-card">
              <img src="/images/gallery/drinks.jpg" alt={language === 'ar' ? 'المشروبات' : 'Beverages'} />
              <div className="facility-info">
                <Coffee size={24} />
                <div>
                  <h4>{language === 'ar' ? 'منطقة المشروبات' : 'Beverages Area'}</h4>
                  <p>{language === 'ar' ? 'قهوة ومشروبات ساخنة وباردة' : 'Hot and cold beverages'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{language === 'ar' ? 'جاهز لفحص سيارتك؟' : 'Ready to Inspect Your Car?'}</h2>
            <p>{language === 'ar' ? 'احجز موعدك الآن واحصل على تقرير شامل ومفصل' : 'Book now and get a comprehensive detailed report'}</p>
            <div className="cta-buttons">
              <Link to="/booking" className="btn-cta-primary">
                {t.hero.bookNow}
                <ArrowIcon size={20} />
              </Link>
              <a href="https://wa.me/9710542206000" className="btn-cta-whatsapp" target="_blank" rel="noopener noreferrer">
                <Phone size={20} />
                {language === 'ar' ? 'تواصل واتساب' : 'WhatsApp Us'}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="location-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{language === 'ar' ? 'موقعنا' : 'Our Location'}</span>
            <h2>{language === 'ar' ? 'تفضلوا بزيارتنا' : 'Visit Us'}</h2>
          </div>
          <div className="location-grid">
            <div className="location-card">
              <div className="location-info">
                <div className="location-icon">
                  <MapPin size={30} />
                </div>
                <div>
                  <h4>{language === 'ar' ? 'العنوان' : 'Address'}</h4>
                  <p>{t.footer.location}</p>
                </div>
              </div>
              <a 
                href="https://maps.app.goo.gl/7W2ULSzLzGSR6Lj4A" 
                target="_blank"
                rel="noopener noreferrer"
                className="location-btn"
              >
                <MapPin size={18} />
                {language === 'ar' ? 'افتح في خرائط جوجل' : 'Open in Google Maps'}
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
