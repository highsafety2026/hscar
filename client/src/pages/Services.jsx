import { Link } from 'react-router-dom'
import { CheckCircle, Shield, Settings, Eye, FileCheck, ArrowLeft, Car, Truck, Crown, Calendar } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

function Services() {
  const { language, t } = useLanguage()
  const isRTL = language === 'ar' || language === 'ur' || language === 'fa'

  const carCategories = [
    {
      id: 'sedan',
      title: language === 'ar' ? 'السيارات الصالون' : 'Sedan Cars',
      subtitle: 'Sedan',
      icon: <Car size={40} />,
      color: '#4285F4',
      bgGradient: 'linear-gradient(135deg, #4285F4, #1a73e8)',
      services: [
        { id: 'full', name: language === 'ar' ? 'الفحص الشامل' : 'Full Inspection', nameEn: 'Comprehensive', price: 500, icon: <Shield size={20} /> },
        { id: 'mechanical', name: language === 'ar' ? 'ميكانيكا وكمبيوتر' : 'Mechanical + Computer', nameEn: 'Mechanical', price: 250, icon: <Settings size={20} /> },
        { id: 'misc', name: language === 'ar' ? 'فحوصات متنوعة' : 'Various Tests', nameEn: 'Various', price: 200, icon: <Eye size={20} /> },
        { id: 'basic', name: language === 'ar' ? 'الأجزاء الأساسية' : 'Basic Parts', nameEn: 'Basic', price: 300, icon: <FileCheck size={20} /> }
      ]
    },
    {
      id: 'suv',
      title: language === 'ar' ? 'سيارات الدفع الرباعي' : '4WD / SUV',
      subtitle: '4WD / SUV',
      icon: <Truck size={40} />,
      color: '#34A853',
      bgGradient: 'linear-gradient(135deg, #34A853, #1e8e3e)',
      services: [
        { id: 'full', name: language === 'ar' ? 'الفحص الشامل' : 'Full Inspection', nameEn: 'Comprehensive', price: 600, icon: <Shield size={20} /> },
        { id: 'mechanical', name: language === 'ar' ? 'ميكانيكا وكمبيوتر' : 'Mechanical + Computer', nameEn: 'Mechanical', price: 300, icon: <Settings size={20} /> },
        { id: 'misc', name: language === 'ar' ? 'فحوصات متنوعة' : 'Various Tests', nameEn: 'Various', price: 200, icon: <Eye size={20} /> },
        { id: 'basic', name: language === 'ar' ? 'الأجزاء الأساسية' : 'Basic Parts', nameEn: 'Basic', price: 400, icon: <FileCheck size={20} /> }
      ]
    },
    {
      id: 'luxury',
      title: language === 'ar' ? 'السيارات الفاخرة والرياضية' : 'Luxury & Sports Cars',
      subtitle: 'Luxury / Coupe',
      icon: <Crown size={40} />,
      color: '#C89D2A',
      bgGradient: 'linear-gradient(135deg, #C89D2A, #a88420)',
      services: [
        { id: 'full', name: language === 'ar' ? 'الفحص الشامل' : 'Full Inspection', nameEn: 'Comprehensive', price: 700, icon: <Shield size={20} /> },
        { id: 'mechanical', name: language === 'ar' ? 'ميكانيكا وكمبيوتر' : 'Mechanical + Computer', nameEn: 'Mechanical', price: 350, icon: <Settings size={20} /> },
        { id: 'misc', name: language === 'ar' ? 'فحوصات متنوعة' : 'Various Tests', nameEn: 'Various', price: 200, icon: <Eye size={20} /> },
        { id: 'basic', name: language === 'ar' ? 'الأجزاء الأساسية' : 'Basic Parts', nameEn: 'Basic', price: 500, icon: <FileCheck size={20} /> }
      ]
    }
  ]

  const inspectionItems = {
    full: [
      { ar: 'الماكينة', en: 'Engine' },
      { ar: 'القير', en: 'Transmission' },
      { ar: 'الكمبيوتر', en: 'Computer Scan' },
      { ar: 'الشاصي', en: 'Chassis' },
      { ar: 'الصبغ والحوادث', en: 'Paint & Accidents' },
      { ar: 'نظام التبريد', en: 'Cooling System' },
      { ar: 'نظام الفرامل', en: 'Brake System' },
      { ar: 'الإيرباقات', en: 'Airbags' }
    ],
    mechanical: [
      { ar: 'الماكينة', en: 'Engine' },
      { ar: 'القير', en: 'Transmission' },
      { ar: 'الكمبيوتر', en: 'Computer Scan' },
      { ar: 'التسريبات', en: 'Leaks' },
      { ar: 'حالة الزيوت', en: 'Oil Condition' }
    ],
    misc: [
      { ar: 'صبغ فقط', en: 'Paint Only' },
      { ar: 'شاصي فقط', en: 'Chassis Only' },
      { ar: 'كمبيوتر فقط', en: 'Computer Only' },
      { ar: 'فحص الغرق', en: 'Flood Check' }
    ],
    basic: [
      { ar: 'الماكينة', en: 'Engine' },
      { ar: 'القير', en: 'Transmission' },
      { ar: 'الكمبيوتر', en: 'Computer' },
      { ar: 'الشاصي', en: 'Chassis' }
    ]
  }

  return (
    <div className="services-page-new">
      <div className="services-hero">
        <div className="container">
          <span className="section-badge">
            {language === 'ar' ? 'خدماتنا المميزة' : 'Our Services'}
          </span>
          <h1>{language === 'ar' ? 'خدمات الفحص الفني' : 'Technical Inspection Services'}</h1>
          <p>{language === 'ar' ? 'اختر الباقة الخاصة لسيارتك' : 'Choose the package for your car'}</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 24px' }}>
        {carCategories.map((category) => (
          <div key={category.id} className="car-category-section">
            <div className="category-header" style={{ background: category.bgGradient }}>
              <div className="category-icon">{category.icon}</div>
              <div className="category-titles">
                <h2>{category.title}</h2>
                <span>{category.subtitle}</span>
              </div>
            </div>

            <div className="category-services-grid">
              {category.services.map((service) => (
                <div key={service.id} className="service-price-card">
                  <div className="service-card-icon" style={{ background: `${category.color}15`, color: category.color }}>
                    {service.icon}
                  </div>
                  <h3>{service.name}</h3>
                  <p className="service-name-en">{service.nameEn}</p>
                  
                  <div className="service-features">
                    {inspectionItems[service.id]?.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="feature-item">
                        <CheckCircle size={14} color={category.color} />
                        <span>{language === 'ar' ? item.ar : item.en}</span>
                      </div>
                    ))}
                  </div>

                  <div className="service-price-tag">
                    <span className="price-amount">{service.price}</span>
                    <span className="price-currency">{language === 'ar' ? 'درهم' : 'AED'}</span>
                  </div>

                  <Link 
                    to="/booking" 
                    className="book-now-btn"
                    style={{ 
                      background: category.bgGradient,
                      boxShadow: `0 4px 15px ${category.color}40`
                    }}
                  >
                    <Calendar size={18} />
                    <span>{language === 'ar' ? 'احجز الآن' : 'Book Now'}</span>
                    {isRTL ? <ArrowLeft size={18} /> : <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .car-category-section {
          margin-bottom: 50px;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        }
        .category-header {
          padding: 30px 40px;
          display: flex;
          align-items: center;
          gap: 20px;
          color: white;
        }
        .category-icon {
          width: 70px;
          height: 70px;
          background: rgba(255,255,255,0.2);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .category-titles h2 {
          margin: 0;
          font-size: 1.6rem;
          font-weight: 700;
        }
        .category-titles span {
          font-size: 1rem;
          opacity: 0.9;
        }
        .category-services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 25px;
          padding: 30px;
        }
        .service-price-card {
          background: #f8f9fa;
          border-radius: 16px;
          padding: 25px;
          text-align: center;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        .service-price-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border-color: #C89D2A;
        }
        .service-card-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
        }
        .service-price-card h3 {
          margin: 0 0 5px;
          font-size: 1.1rem;
          color: #0B1F3A;
        }
        .service-name-en {
          font-size: 0.85rem;
          color: #666;
          margin: 0 0 15px;
        }
        .service-features {
          text-align: ${isRTL ? 'right' : 'left'};
          margin: 15px 0;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 0;
          font-size: 0.85rem;
          color: #444;
        }
        .service-price-tag {
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          color: white;
          padding: 15px;
          border-radius: 12px;
          margin: 20px 0 15px;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 8px;
        }
        .price-amount {
          font-size: 2rem;
          font-weight: 800;
        }
        .price-currency {
          font-size: 1rem;
          opacity: 0.9;
        }
        .book-now-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px 20px;
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        .book-now-btn:hover {
          transform: scale(1.02);
          filter: brightness(1.1);
        }
        @media (max-width: 768px) {
          .category-header {
            padding: 20px;
            flex-direction: column;
            text-align: center;
          }
          .category-services-grid {
            padding: 20px;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  )
}

export default Services
