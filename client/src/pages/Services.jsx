import { Link } from 'react-router-dom'

function Services() {
  const services = [
    {
      title: 'الفحص الشامل',
      titleEn: 'Full Inspection',
      description: 'فحص كامل ومتكامل لجميع أجزاء السيارة',
      features: [
        'فحص المحرك بالكامل',
        'فحص ناقل الحركة',
        'فحص نظام الفرامل',
        'فحص نظام التعليق',
        'فحص الهيكل والبودي',
        'فحص الكهرباء والإلكترونيات',
        'فحص نظام التكييف',
        'تقرير PDF شامل'
      ]
    },
    {
      title: 'الفحص الميكانيكي والكمبيوتر',
      titleEn: 'Mechanical + Computer',
      description: 'فحص متخصص للأنظمة الميكانيكية والإلكترونية',
      features: [
        'فحص المحرك',
        'فحص ناقل الحركة',
        'فحص بالكمبيوتر',
        'قراءة أكواد الأعطال',
        'فحص الحساسات',
        'فحص وحدة التحكم ECU',
        'تقرير تفصيلي'
      ]
    },
    {
      title: 'الفحوصات المتنوعة',
      titleEn: 'Misc Tests',
      description: 'فحوصات متخصصة حسب الحاجة',
      features: [
        'فحص الطلاء',
        'فحص الحوادث السابقة',
        'فحص الغمر والماء',
        'فحص الإطارات',
        'فحص السوائل',
        'فحص البطارية',
        'تقرير مختصر'
      ]
    },
    {
      title: 'فحص القطع الأساسية',
      titleEn: 'Basic Parts Inspection',
      description: 'فحص القطع والأجزاء الأساسية في السيارة',
      features: [
        'فحص الفرامل',
        'فحص الإطارات',
        'فحص المصابيح',
        'فحص المساحات',
        'فحص الزجاج',
        'تقرير سريع'
      ]
    }
  ]

  return (
    <div className="services-page">
      <div className="container">
        <h2 className="section-title">خدماتنا</h2>
        <p style={{ textAlign: 'center', marginBottom: '40px', color: '#666' }}>
          نقدم مجموعة متكاملة من خدمات الفحص الفني للسيارات
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-header">
                <h3>{service.title}</h3>
                <small>{service.titleEn}</small>
              </div>
              <div className="service-body">
                <p style={{ marginBottom: '15px', color: '#666' }}>{service.description}</p>
                <ul>
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <Link to="/booking" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                  احجز الآن
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
