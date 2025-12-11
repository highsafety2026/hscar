import { Link } from 'react-router-dom'
import { CheckCircle, Shield, Settings, Eye, FileCheck, ArrowLeft } from 'lucide-react'

function Services() {
  const services = [
    {
      title: 'الفحص الشامل',
      titleEn: 'Full Inspection',
      icon: <Shield size={32} />,
      color: '#C89D2A',
      items: [
        { ar: 'الماكينة', en: 'Engine' },
        { ar: 'القير', en: 'Transmission' },
        { ar: 'الدبل', en: '4WD' },
        { ar: 'الكمبيوتر', en: 'Computer' },
        { ar: 'الإيرباقات', en: 'Airbags' },
        { ar: 'داخلية السيارة', en: 'Car Interior' },
        { ar: 'الشاصي', en: 'Chassis' },
        { ar: 'الأجزاء الكهربائية', en: 'Electrical Parts' },
        { ar: 'الصبغ', en: 'Paint' },
        { ar: 'التسريبات', en: 'Leaks' },
        { ar: 'الديفريشن', en: 'Differential' },
        { ar: 'الحوادث', en: 'Accidents' },
        { ar: 'الغرق', en: 'Flooding' },
        { ar: 'داخل الماكينة', en: 'Engine Interior' },
        { ar: 'نسبة الصدأ', en: 'Rust Level' },
        { ar: 'الزجاج', en: 'Glass' },
        { ar: 'الإضاءة', en: 'Lighting' },
        { ar: 'التواير', en: 'Tires' },
        { ar: 'الرنقات', en: 'Rims' },
        { ar: 'البطارية', en: 'Battery' },
        { ar: 'جميع الحساسات', en: 'All Sensors' },
        { ar: 'حالة الزيوت', en: 'Oil Condition' },
        { ar: 'نظام التعليق', en: 'Suspension System' },
        { ar: 'نظام التبريد', en: 'Cooling System' },
        { ar: 'نظام التكييف', en: 'Air Conditioning System' },
        { ar: 'نظام البترول', en: 'Fuel System' },
        { ar: 'نظام الصوت', en: 'Sound System' },
        { ar: 'التزويد', en: 'Fuel Supply' },
        { ar: 'التحويل', en: 'Conversion' },
        { ar: 'التعديل', en: 'Modification' },
        { ar: 'الأجزاء الميكانيكية أعلى وأسفل', en: 'Upper & Lower Mechanical Parts' },
        { ar: 'أجزاء الهيكل الداخلية والخارجية', en: 'Internal & External Body Parts' }
      ]
    },
    {
      title: 'فحص الميكانيكا + الكمبيوتر',
      titleEn: 'Mechanical + Computer Check',
      icon: <Settings size={32} />,
      color: '#4285F4',
      items: [
        { ar: 'التسريبات', en: 'Leaks' },
        { ar: 'جميع أجزاء السيرفس', en: 'All Service Parts' },
        { ar: 'نظام التبريد', en: 'Cooling System' },
        { ar: 'نظام البترول', en: 'Fuel System' },
        { ar: 'الإضاءة', en: 'Lighting' },
        { ar: 'الزجاج', en: 'Glass' },
        { ar: 'الكمبيوتر', en: 'Computer' },
        { ar: 'حالة الزيوت', en: 'Oil Condition' },
        { ar: 'التواير', en: 'Tires' },
        { ar: 'التكييف', en: 'Air Conditioning' }
      ]
    },
    {
      title: 'فحوصات متنوعة',
      titleEn: 'Miscellaneous Tests',
      icon: <Eye size={32} />,
      color: '#34A853',
      items: [
        { ar: 'صبغ فقط', en: 'Paint Only' },
        { ar: 'ماكينة فقط', en: 'Engine Only' },
        { ar: 'كمبيوتر فقط', en: 'Computer Only' },
        { ar: 'شاصي فقط', en: 'Chassis Only' },
        { ar: 'غرق فقط', en: 'Flooding Only' },
        { ar: 'ميكانيكا + شاصي فقط', en: 'Mechanical + Chassis Only' },
        { ar: 'صبغ + شاصي فقط', en: 'Paint + Chassis Only' },
        { ar: 'صبغ + حوادث فقط', en: 'Paint + Accidents Only' }
      ]
    },
    {
      title: 'فحص الأجزاء الأساسية',
      titleEn: 'Basic Parts Inspection',
      icon: <FileCheck size={32} />,
      color: '#EA4335',
      items: [
        { ar: 'الماكينة', en: 'Engine' },
        { ar: 'القير', en: 'Transmission' },
        { ar: 'الكمبيوتر', en: 'Computer' },
        { ar: 'الإيرباقات', en: 'Airbags' },
        { ar: 'الشاصي', en: 'Chassis' },
        { ar: 'الزجاج', en: 'Glass' },
        { ar: 'الإضاءة', en: 'Lighting' }
      ]
    }
  ]

  return (
    <div className="services-page-new">
      <div className="services-hero">
        <div className="container">
          <span className="section-badge">خدماتنا المميزة</span>
          <h1>خدمات الفحص الفني</h1>
          <p>نقدم مجموعة متكاملة من خدمات الفحص الفني للسيارات بأعلى المعايير</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 24px' }}>
        <div className="services-detailed-grid">
          {services.map((service, index) => (
            <div key={index} className="service-detailed-card" style={{ '--accent': service.color }}>
              <div className="service-header" style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}dd)` }}>
                <div className="service-icon-large">{service.icon}</div>
                <div className="service-titles">
                  <h3>{service.title}</h3>
                  <span>{service.titleEn}</span>
                </div>
              </div>
              
              <div className="service-items-list">
                <h4>يشمل الفحص:</h4>
                <ul>
                  {service.items.map((item, i) => (
                    <li key={i}>
                      <CheckCircle size={16} color={service.color} />
                      <div>
                        <span className="item-ar">{item.ar}</span>
                        <span className="item-en">{item.en}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="service-card-footer">
                <Link to="/booking" className="service-book-btn" style={{ background: service.color }}>
                  <span>احجز الآن</span>
                  <ArrowLeft size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services
