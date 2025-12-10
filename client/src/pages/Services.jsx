import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

function Services() {
  const services = [
    {
      title: 'الفحص الشامل',
      titleEn: 'Full Inspection',
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
    <div className="services-page">
      <div className="container">
        <h2 className="section-title">خدماتنا | Our Services</h2>
        <p style={{ textAlign: 'center', marginBottom: '40px', color: '#666', fontSize: '1.1rem' }}>
          نقدم مجموعة متكاملة من خدمات الفحص الفني للسيارات
          <br />
          <span style={{ fontSize: '0.95rem' }}>We offer comprehensive car inspection services</span>
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px'
        }}>
          {services.map((service, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
                padding: '20px',
                textAlign: 'center'
              }}>
                <h3 style={{ 
                  color: '#C89D2A', 
                  margin: 0, 
                  fontSize: '1.3rem',
                  fontWeight: '700'
                }}>{service.title}</h3>
                <p style={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  margin: '8px 0 0 0',
                  fontSize: '0.95rem'
                }}>{service.titleEn}</p>
              </div>
              
              <div style={{
                padding: '20px',
                maxHeight: '350px',
                overflowY: 'auto'
              }}>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {service.items.map((item, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '8px 0',
                      borderBottom: i < service.items.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }}>
                      <CheckCircle size={18} color="#C89D2A" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ flex: 1 }}>
                        <span style={{ 
                          color: '#0B1F3A', 
                          fontWeight: '600',
                          fontSize: '0.95rem'
                        }}>{item.ar}</span>
                        <span style={{ 
                          color: '#666',
                          fontSize: '0.85rem',
                          display: 'block'
                        }}>{item.en}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div style={{ padding: '0 20px 20px' }}>
                <Link 
                  to="/booking" 
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
                    color: '#0B1F3A',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: '700',
                    transition: 'transform 0.2s'
                  }}
                >
                  احجز الآن | Book Now
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
