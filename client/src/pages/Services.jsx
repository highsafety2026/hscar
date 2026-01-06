import { Link } from 'react-router-dom'
import { CheckCircle, Shield, Settings, Eye, FileCheck, ArrowRight, Calendar, Star } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const CarIcon = ({ type, size = 60 }) => {
  const icons = {
    sedan: (
      <svg viewBox="0 0 100 50" width={size} height={size * 0.5} fill="currentColor">
        <path d="M15,35 L15,40 C15,42 13,44 11,44 L6,44 C4,44 2,42 2,40 L2,35 C2,33 4,31 6,31 L11,31 C13,31 15,33 15,35 Z" opacity="0.9"/>
        <path d="M98,35 L98,40 C98,42 96,44 94,44 L89,44 C87,44 85,42 85,40 L85,35 C85,33 87,31 89,31 L94,31 C96,31 98,33 98,35 Z" opacity="0.9"/>
        <path d="M10,28 L90,28 C93,28 95,30 95,33 L95,38 C95,41 93,43 90,43 L10,43 C7,43 5,41 5,38 L5,33 C5,30 7,28 10,28 Z" opacity="0.3"/>
        <path d="M18,15 C20,10 28,7 50,7 C72,7 80,10 82,15 L85,24 C86,26 85,28 83,28 L17,28 C15,28 14,26 15,24 L18,15 Z" opacity="0.8"/>
        <path d="M25,12 L35,12 L35,22 L22,22 L25,12 Z M65,12 L75,12 L78,22 L65,22 L65,12 Z" fill="rgba(255,255,255,0.3)"/>
        <circle cx="22" cy="38" r="7" opacity="0.9"/>
        <circle cx="22" cy="38" r="4" fill="rgba(255,255,255,0.3)"/>
        <circle cx="78" cy="38" r="7" opacity="0.9"/>
        <circle cx="78" cy="38" r="4" fill="rgba(255,255,255,0.3)"/>
        <rect x="40" y="30" width="20" height="3" rx="1" opacity="0.4"/>
      </svg>
    ),
    suv: (
      <svg viewBox="0 0 100 55" width={size} height={size * 0.55} fill="currentColor">
        <path d="M15,40 L15,46 C15,48 13,50 11,50 L6,50 C4,50 2,48 2,46 L2,40 C2,38 4,36 6,36 L11,36 C13,36 15,38 15,40 Z" opacity="0.9"/>
        <path d="M98,40 L98,46 C98,48 96,50 94,50 L89,50 C87,50 85,48 85,46 L85,40 C85,38 87,36 89,36 L94,36 C96,36 98,38 98,40 Z" opacity="0.9"/>
        <path d="M8,32 L92,32 C95,32 97,34 97,37 L97,44 C97,47 95,49 92,49 L8,49 C5,49 3,47 3,44 L3,37 C3,34 5,32 8,32 Z" opacity="0.3"/>
        <path d="M15,10 C18,5 30,3 50,3 C70,3 82,5 85,10 L90,28 C91,30 90,32 88,32 L12,32 C10,32 9,30 10,28 L15,10 Z" opacity="0.8"/>
        <path d="M22,8 L35,8 L35,26 L18,26 L22,8 Z M65,8 L78,8 L82,26 L65,26 L65,8 Z" fill="rgba(255,255,255,0.3)"/>
        <rect x="35" y="8" width="30" height="18" rx="2" fill="rgba(255,255,255,0.25)"/>
        <circle cx="22" cy="44" r="9" opacity="0.9"/>
        <circle cx="22" cy="44" r="5" fill="rgba(255,255,255,0.3)"/>
        <circle cx="78" cy="44" r="9" opacity="0.9"/>
        <circle cx="78" cy="44" r="5" fill="rgba(255,255,255,0.3)"/>
        <rect x="10" y="32" width="6" height="4" rx="1" opacity="0.6"/>
        <rect x="84" y="32" width="6" height="4" rx="1" opacity="0.6"/>
      </svg>
    ),
    classic: (
      <svg viewBox="0 0 100 50" width={size} height={size * 0.5} fill="currentColor">
        <ellipse cx="20" cy="38" rx="10" ry="10" opacity="0.9"/>
        <ellipse cx="20" cy="38" rx="5" ry="5" fill="rgba(255,255,255,0.3)"/>
        <ellipse cx="80" cy="38" rx="10" ry="10" opacity="0.9"/>
        <ellipse cx="80" cy="38" rx="5" ry="5" fill="rgba(255,255,255,0.3)"/>
        <path d="M5,30 L95,30 C97,30 98,32 98,34 L98,38 C98,40 97,42 95,42 L5,42 C3,42 2,40 2,38 L2,34 C2,32 3,30 5,30 Z" opacity="0.3"/>
        <path d="M12,20 L30,8 C35,5 45,4 50,4 C55,4 65,5 70,8 L88,20 L92,28 C93,30 92,32 90,32 L10,32 C8,32 7,30 8,28 L12,20 Z" opacity="0.8"/>
        <path d="M35,10 L50,6 L65,10 L65,26 L35,26 L35,10 Z" fill="rgba(255,255,255,0.3)"/>
        <circle cx="10" cy="28" r="4" opacity="0.6"/>
        <circle cx="90" cy="28" r="4" opacity="0.6"/>
        <rect x="42" y="28" width="16" height="6" rx="2" opacity="0.5"/>
        <path d="M2,34 L12,34 L12,28 L6,28 C3,28 2,30 2,32 L2,34 Z" opacity="0.4"/>
        <path d="M98,34 L88,34 L88,28 L94,28 C97,28 98,30 98,32 L98,34 Z" opacity="0.4"/>
      </svg>
    ),
    luxury: (
      <svg viewBox="0 0 100 45" width={size} height={size * 0.45} fill="currentColor">
        <ellipse cx="20" cy="35" rx="8" ry="8" opacity="0.9"/>
        <ellipse cx="20" cy="35" rx="4" ry="4" fill="rgba(255,255,255,0.4)"/>
        <ellipse cx="80" cy="35" rx="8" ry="8" opacity="0.9"/>
        <ellipse cx="80" cy="35" r="4" fill="rgba(255,255,255,0.4)"/>
        <path d="M8,28 L92,28 C95,28 97,30 97,33 L97,36 C97,39 95,41 92,41 L8,41 C5,41 3,39 3,36 L3,33 C3,30 5,28 8,28 Z" opacity="0.25"/>
        <path d="M15,14 C18,8 32,5 50,5 C68,5 82,8 85,14 L90,24 C91,26 90,28 88,28 L12,28 C10,28 9,26 10,24 L15,14 Z" opacity="0.85"/>
        <path d="M22,10 L32,10 L32,24 L18,24 L22,10 Z" fill="rgba(255,255,255,0.35)"/>
        <path d="M68,10 L78,10 L82,24 L68,24 L68,10 Z" fill="rgba(255,255,255,0.35)"/>
        <path d="M36,8 L64,8 L64,24 L36,24 Z" fill="rgba(255,255,255,0.25)"/>
        <rect x="4" y="26" width="10" height="4" rx="2" opacity="0.5"/>
        <rect x="86" y="26" width="10" height="4" rx="2" opacity="0.5"/>
        <path d="M45,28 L55,28 L55,32 L45,32 Z" opacity="0.3"/>
        <circle cx="8" cy="20" r="3" opacity="0.7"/>
        <circle cx="92" cy="20" r="3" opacity="0.7"/>
      </svg>
    ),
    vip: (
      <svg viewBox="0 0 100 50" width={size} height={size * 0.5} fill="currentColor">
        <defs>
          <linearGradient id="vipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.7"/>
          </linearGradient>
        </defs>
        <ellipse cx="22" cy="38" rx="9" ry="9" opacity="0.95"/>
        <ellipse cx="22" cy="38" rx="5" ry="5" fill="rgba(255,255,255,0.4)"/>
        <ellipse cx="22" cy="38" rx="2" ry="2" opacity="0.8"/>
        <ellipse cx="78" cy="38" rx="9" ry="9" opacity="0.95"/>
        <ellipse cx="78" cy="38" rx="5" ry="5" fill="rgba(255,255,255,0.4)"/>
        <ellipse cx="78" cy="38" rx="2" ry="2" opacity="0.8"/>
        <path d="M6,30 L94,30 C97,30 99,32 99,35 L99,40 C99,43 97,45 94,45 L6,45 C3,45 1,43 1,40 L1,35 C1,32 3,30 6,30 Z" opacity="0.25"/>
        <path d="M12,12 C15,6 30,3 50,3 C70,3 85,6 88,12 L94,26 C95,28 94,30 92,30 L8,30 C6,30 5,28 6,26 L12,12 Z" opacity="0.9"/>
        <path d="M20,8 L32,8 L32,26 L16,26 L20,8 Z" fill="rgba(255,255,255,0.35)"/>
        <path d="M68,8 L80,8 L84,26 L68,26 L68,8 Z" fill="rgba(255,255,255,0.35)"/>
        <path d="M36,6 L64,6 L64,26 L36,26 Z" fill="rgba(255,255,255,0.3)"/>
        <rect x="2" y="28" width="12" height="5" rx="2" opacity="0.6"/>
        <rect x="86" y="28" width="12" height="5" rx="2" opacity="0.6"/>
        <path d="M40,30 L60,30 L58,36 L42,36 Z" opacity="0.4"/>
        <polygon points="50,0 52,4 56,4 53,7 54,11 50,9 46,11 47,7 44,4 48,4" fill="rgba(255,255,255,0.6)"/>
      </svg>
    )
  }
  return icons[type] || icons.sedan
}

function Services() {
  const { language, t } = useLanguage()
  const isRTL = language === 'ar' || language === 'ur' || language === 'fa'

  const carCategories = [
    {
      id: 'sedan',
      title: language === 'ar' ? 'صالون' : 'Sedan',
      subtitle: 'Sedan',
      color: '#4285F4',
      bgGradient: 'linear-gradient(135deg, #4285F4, #1a73e8)'
    },
    {
      id: 'suv',
      title: language === 'ar' ? 'دفع رباعي / فورويل' : '4WD / SUV',
      subtitle: '4WD / SUV',
      color: '#34A853',
      bgGradient: 'linear-gradient(135deg, #34A853, #1e8e3e)'
    },
    {
      id: 'classic',
      title: language === 'ar' ? 'كلاسيك' : 'Classic',
      subtitle: 'Classic',
      color: '#FF6B35',
      bgGradient: 'linear-gradient(135deg, #FF6B35, #e55a2b)'
    },
    {
      id: 'luxury',
      title: language === 'ar' ? 'فاخرة' : 'Luxury',
      subtitle: 'Luxury',
      color: '#9C27B0',
      bgGradient: 'linear-gradient(135deg, #9C27B0, #7b1fa2)'
    },
    {
      id: 'vip',
      title: language === 'ar' ? 'VIP فاخرة' : 'VIP Luxury',
      subtitle: 'VIP',
      color: '#C89D2A',
      bgGradient: 'linear-gradient(135deg, #C89D2A, #a88420)'
    }
  ]

  const serviceTypes = [
    { 
      id: 'full', 
      name: language === 'ar' ? 'الفحص الشامل' : 'Full Inspection', 
      nameEn: 'Comprehensive',
      icon: <Shield size={24} />,
      description: language === 'ar' 
        ? 'فحص كامل ومتكامل لجميع أنظمة السيارة الميكانيكية والإلكترونية والهيكل' 
        : 'Complete and comprehensive inspection of all mechanical, electronic and body systems',
      categories: [
        {
          title: language === 'ar' ? 'الأنظمة الميكانيكية الرئيسية' : 'Main Mechanical Systems',
          items: [
            { ar: 'فحص المحرك بالكامل وأدائه', en: 'Complete Engine Inspection & Performance' },
            { ar: 'القير والتروس وجودة النقل', en: 'Transmission, Gears & Shift Quality' },
            { ar: 'الدبل ونظام الدفع الرباعي', en: '4WD System & Transfer Case' },
            { ar: 'الديفريشن الأمامي والخلفي', en: 'Front & Rear Differential' },
            { ar: 'نظام التعليق والمساعدات', en: 'Suspension System & Shock Absorbers' },
            { ar: 'المقصات والكراسي والبوشات', en: 'Control Arms, Mounts & Bushings' }
          ]
        },
        {
          title: language === 'ar' ? 'الأنظمة الإلكترونية المتقدمة' : 'Advanced Electronic Systems',
          items: [
            { ar: 'كمبيوتر السيارة وقراءة الأعطال', en: 'ECU Diagnostics & Error Codes' },
            { ar: 'فحص الإيرباقات والحساسات', en: 'Airbags & Safety Sensors Check' },
            { ar: 'النظام الكهربائي الكامل', en: 'Complete Electrical System' },
            { ar: 'جميع الحساسات والوحدات', en: 'All Sensors & Control Units' },
            { ar: 'البطارية والدينمو والمارش', en: 'Battery, Alternator & Starter' },
            { ar: 'نظام ABS ومكابح الطوارئ', en: 'ABS System & Emergency Brakes' }
          ]
        },
        {
          title: language === 'ar' ? 'الهيكل والبودي الخارجي' : 'Chassis & External Body',
          items: [
            { ar: 'فحص الشاصي بجهاز متخصص', en: 'Professional Chassis Inspection' },
            { ar: 'الصبغ والمعجون بالجهاز', en: 'Paint & Filler Detection' },
            { ar: 'فحص الحوادث السابقة', en: 'Previous Accident Detection' },
            { ar: 'فحص الغرق والمياه', en: 'Flood & Water Damage Check' },
            { ar: 'نسبة الصدأ والتآكل', en: 'Rust & Corrosion Level' },
            { ar: 'قطع الهيكل والأبواب', en: 'Body Panels & Doors Alignment' }
          ]
        },
        {
          title: language === 'ar' ? 'الداخلية والتجهيزات' : 'Interior & Equipment',
          items: [
            { ar: 'فحص داخلية السيارة الكاملة', en: 'Complete Interior Inspection' },
            { ar: 'الكونسول والأزرار الإلكترونية', en: 'Console & Electronic Controls' },
            { ar: 'نظام الصوت والملتيميديا', en: 'Audio & Multimedia System' },
            { ar: 'فحص التحويل والتعديلات', en: 'Conversion & Modifications Check' },
            { ar: 'الفرش والمقاعد', en: 'Upholstery & Seats Condition' },
            { ar: 'مثبت السرعة والكاميرات', en: 'Cruise Control & Cameras' }
          ]
        },
        {
          title: language === 'ar' ? 'السوائل والأنظمة الحيوية' : 'Fluids & Vital Systems',
          items: [
            { ar: 'كشف التسريبات بالكامل', en: 'Complete Leak Detection' },
            { ar: 'فحص حالة جميع الزيوت', en: 'All Oils Condition Check' },
            { ar: 'نظام التبريد والرديتر', en: 'Cooling System & Radiator' },
            { ar: 'نظام التكييف والفريون', en: 'A/C System & Refrigerant' },
            { ar: 'نظام الوقود والبخاخات', en: 'Fuel System & Injectors' },
            { ar: 'نظام العادم والكتمان', en: 'Exhaust System & Muffler' }
          ]
        },
        {
          title: language === 'ar' ? 'الإضاءة والعجلات والإطارات' : 'Lighting, Wheels & Tires',
          items: [
            { ar: 'جميع الزجاج والمرايا', en: 'All Glass & Mirrors' },
            { ar: 'الإضاءة الأمامية والخلفية', en: 'Front & Rear Lighting' },
            { ar: 'فحص التواير وعمقها', en: 'Tires Inspection & Tread Depth' },
            { ar: 'الرنقات والجنوط', en: 'Rims & Wheels Condition' },
            { ar: 'نظام المكابح والفحمات', en: 'Brake System & Pads' },
            { ar: 'الترصيص والاتزان', en: 'Wheel Alignment & Balancing' }
          ]
        }
      ]
    },
    { 
      id: 'mechanical', 
      name: language === 'ar' ? 'ميكانيكا + كمبيوتر' : 'Mechanical + Computer', 
      nameEn: 'Mechanical',
      icon: <Settings size={24} />,
      description: language === 'ar' 
        ? 'فحص متخصص للأنظمة الميكانيكية مع الكمبيوتر لضمان سلامة التشغيل' 
        : 'Specialized mechanical inspection with computer diagnostics',
      categories: [
        {
          title: language === 'ar' ? 'الفحص الميكانيكي المتقدم' : 'Advanced Mechanical Check',
          items: [
            { ar: 'المحرك والأداء العام', en: 'Engine & Overall Performance' },
            { ar: 'القير وجودة التبديل', en: 'Transmission & Shift Quality' },
            { ar: 'كشف التسريبات بالكامل', en: 'Complete Leak Detection' },
            { ar: 'جميع أجزاء السيرفس', en: 'All Service Components' },
            { ar: 'فحص حالة الزيوت', en: 'Oil Condition Analysis' },
            { ar: 'التعليق والمساعدات', en: 'Suspension & Absorbers' }
          ]
        },
        {
          title: language === 'ar' ? 'التشخيص الإلكتروني' : 'Electronic Diagnostics',
          items: [
            { ar: 'فحص كمبيوتر السيارة', en: 'ECU Computer Diagnostics' },
            { ar: 'قراءة أكواد الأعطال', en: 'Error Codes Reading' },
            { ar: 'فحص الحساسات الرئيسية', en: 'Main Sensors Check' },
            { ar: 'نظام الحقن الإلكتروني', en: 'Electronic Fuel Injection' },
            { ar: 'البطارية والشحن', en: 'Battery & Charging System' },
            { ar: 'الأنظمة الكهربائية', en: 'Electrical Systems' }
          ]
        },
        {
          title: language === 'ar' ? 'الأنظمة الحيوية' : 'Vital Systems',
          items: [
            { ar: 'نظام التبريد والرديتر', en: 'Cooling System & Radiator' },
            { ar: 'نظام الوقود والفلتر', en: 'Fuel System & Filter' },
            { ar: 'نظام التكييف', en: 'Air Conditioning System' },
            { ar: 'نظام العادم', en: 'Exhaust System' },
            { ar: 'المكابح والفحمات', en: 'Brakes & Pads' },
            { ar: 'التواير وعمقها', en: 'Tires & Tread Depth' }
          ]
        },
        {
          title: language === 'ar' ? 'الفحص الخارجي' : 'External Inspection',
          items: [
            { ar: 'الإضاءة الأمامية والخلفية', en: 'Front & Rear Lighting' },
            { ar: 'الزجاج والمساحات', en: 'Glass & Wipers' },
            { ar: 'المرايا والأبواب', en: 'Mirrors & Doors' },
            { ar: 'الرنقات والإطارات', en: 'Rims & Tires' }
          ]
        }
      ]
    },
    { 
      id: 'basic', 
      name: language === 'ar' ? 'الأجزاء الأساسية' : 'Basic Parts', 
      nameEn: 'Basic',
      icon: <FileCheck size={24} />,
      description: language === 'ar' 
        ? 'فحص الأجزاء الرئيسية والمهمة للسيارة بسعر مناسب' 
        : 'Essential parts inspection at an affordable price',
      categories: [
        {
          title: language === 'ar' ? 'الأجزاء الميكانيكية الرئيسية' : 'Main Mechanical Parts',
          items: [
            { ar: 'فحص المحرك الأساسي', en: 'Basic Engine Check' },
            { ar: 'فحص القير', en: 'Transmission Inspection' },
            { ar: 'التعليق الأمامي', en: 'Front Suspension' },
            { ar: 'المكابح الأساسية', en: 'Basic Brakes Check' },
            { ar: 'الزيوت والسوائل', en: 'Oils & Fluids Level' }
          ]
        },
        {
          title: language === 'ar' ? 'الفحص الإلكتروني' : 'Electronic Inspection',
          items: [
            { ar: 'فحص الكمبيوتر الأساسي', en: 'Basic Computer Check' },
            { ar: 'فحص الإيرباقات', en: 'Airbags Inspection' },
            { ar: 'البطارية والكهرباء', en: 'Battery & Electrical' },
            { ar: 'الإضاءة الرئيسية', en: 'Main Lighting System' }
          ]
        },
        {
          title: language === 'ar' ? 'الهيكل والمظهر' : 'Body & Exterior',
          items: [
            { ar: 'فحص الشاصي', en: 'Chassis Inspection' },
            { ar: 'الصبغ الرئيسي', en: 'Main Paint Check' },
            { ar: 'الزجاج والإطارات', en: 'Glass & Tires' },
            { ar: 'الداخلية الأساسية', en: 'Basic Interior Check' }
          ]
        }
      ]
    },
    { 
      id: 'misc', 
      name: language === 'ar' ? 'فحوصات متنوعة' : 'Miscellaneous Tests', 
      nameEn: 'Various',
      icon: <Eye size={24} />,
      description: language === 'ar' 
        ? 'فحوصات متخصصة حسب حاجتك - اختر ما تريد فحصه فقط' 
        : 'Specialized inspections based on your needs - choose what you want',
      categories: [
        {
          title: language === 'ar' ? 'فحوصات فردية متخصصة' : 'Individual Specialized Tests',
          items: [
            { ar: 'فحص الصبغ فقط بالجهاز', en: 'Paint Inspection Only' },
            { ar: 'فحص المحرك فقط', en: 'Engine Only Check' },
            { ar: 'فحص الكمبيوتر فقط', en: 'Computer Diagnostics Only' },
            { ar: 'فحص الشاصي فقط', en: 'Chassis Only Inspection' },
            { ar: 'فحص الغرق فقط', en: 'Flood Detection Only' },
            { ar: 'فحص القير فقط', en: 'Transmission Only' },
            { ar: 'فحص التكييف فقط', en: 'A/C System Only' },
            { ar: 'فحص الإيرباقات فقط', en: 'Airbags Only' }
          ]
        },
        {
          title: language === 'ar' ? 'فحوصات مركبة متقدمة' : 'Combined Advanced Tests',
          items: [
            { ar: 'ميكانيكا + شاصي فقط', en: 'Mechanical + Chassis Only' },
            { ar: 'صبغ + شاصي فقط', en: 'Paint + Chassis Only' },
            { ar: 'صبغ + حوادث فقط', en: 'Paint + Accidents Only' },
            { ar: 'محرك + قير فقط', en: 'Engine + Transmission Only' },
            { ar: 'كمبيوتر + كهرباء فقط', en: 'Computer + Electrical Only' },
            { ar: 'شاصي + غرق فقط', en: 'Chassis + Flood Only' }
          ]
        },
        {
          title: language === 'ar' ? 'فحوصات ما قبل الشراء' : 'Pre-Purchase Inspections',
          items: [
            { ar: 'فحص سريع (30 دقيقة)', en: 'Quick Check (30 min)' },
            { ar: 'تقييم سريع للحالة', en: 'Quick Condition Assessment' },
            { ar: 'فحص طريق اختباري', en: 'Test Drive Inspection' },
            { ar: 'استشارة فنية', en: 'Technical Consultation' }
          ]
        }
      ]
    }
  ]

  return (
    <div className="services-page-new">
      <div className="services-hero">
        <div className="container">
          <span className="section-badge">
            {language === 'ar' ? 'خدماتنا المميزة' : 'Our Premium Services'}
          </span>
          <h1>{language === 'ar' ? 'خدمات الفحص الفني' : 'Technical Inspection Services'}</h1>
          <p>{language === 'ar' ? 'اختار فئة سيارتك ونوع الفحص المناسب' : 'Choose your car category and inspection type'}</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 24px' }}>
        <div className="section-title-wrapper">
          <h2 className="section-main-title">
            {language === 'ar' ? 'فئات السيارات' : 'Car Categories'}
          </h2>
          <p className="section-subtitle">
<<<<<<< HEAD
            {language === 'ar' ? 'اختر فئة سيارتك لحجز موعد الفحص' : 'Select your car category to book inspection'}
=======
            {language === 'ar' ? 'اختار فئة سيارتك لمعرفة الأسعار' : 'Select your car category to see prices'}
>>>>>>> replit-agent
          </p>
        </div>

        <div className="car-categories-horizontal-grid">
          {carCategories.map((category) => (
            <div 
              key={category.id} 
              className="car-category-card"
              style={{ '--category-color': category.color, '--category-gradient': category.bgGradient }}
            >
              <div className="category-card-header" style={{ background: category.bgGradient }}>
                <div className="category-icon-wrapper">
                  <CarIcon type={category.id} size={70} />
                </div>
                <h3>{category.title}</h3>
                <span className="category-subtitle">{category.subtitle}</span>
              </div>
              <div className="category-features-list">
                {serviceTypes.map((service) => (
                  <div key={service.id} className="feature-row">
                    <span className="feature-icon" style={{ color: category.color }}>{service.icon}</span>
                    <span className="feature-name">{service.name}</span>
                  </div>
                ))}
              </div>
              <Link 
                to="/booking" 
                className="category-book-btn"
                style={{ background: category.bgGradient }}
              >
                <Calendar size={18} />
                <span>{language === 'ar' ? 'احجز الآن' : 'Book Now'}</span>
                <ArrowRight size={18} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
              </Link>
            </div>
          ))}
        </div>

        <div className="section-title-wrapper" style={{ marginTop: '80px' }}>
          <h2 className="section-main-title">
            {language === 'ar' ? 'تفاصيل الخدمات' : 'Service Details'}
          </h2>
          <p className="section-subtitle">
            {language === 'ar' ? 'ماذا يشمل كل نوع فحص' : 'What each inspection type includes'}
          </p>
        </div>

        <div className="services-details-grid">
          {serviceTypes.map((service, idx) => (
            <div key={service.id} className="service-detail-card">
              <div className="service-detail-header">
                <div className="service-detail-icon">
                  {service.icon}
                </div>
                <div className="service-detail-titles">
                  <h3>{service.name}</h3>
                  <span>{service.nameEn}</span>
                </div>
                <div className="service-number">{idx + 1}</div>
              </div>
              {service.description && (
                <div className="service-description">
                  {service.description}
                </div>
              )}
              <div className="service-categories-container">
                {service.categories.map((category, catIdx) => (
                  <div key={catIdx} className="service-category-group">
                    <h4 className="category-group-title">{category.title}</h4>
                    <div className="service-items-grid">
                      {category.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="service-item-premium">
                          <CheckCircle size={14} className="check-icon" />
                          <div className="item-text">
                            <span className="item-primary">{language === 'ar' ? item.ar : item.en}</span>
                            <span className="item-secondary">{language === 'ar' ? item.en : item.ar}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <div className="cta-content">
            <Star size={40} color="#C89D2A" />
            <h3>{language === 'ar' ? 'جاهز لفحص سيارتك؟' : 'Ready to inspect your car?'}</h3>
            <p>{language === 'ar' ? 'احجز موعدك الآن واحصل على تقرير شامل' : 'Book your appointment now and get a comprehensive report'}</p>
            <Link to="/booking" className="cta-main-btn">
              <Calendar size={20} />
              <span>{language === 'ar' ? 'احجز موعدك الآن' : 'Book Your Appointment'}</span>
              <ArrowRight size={20} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .section-title-wrapper {
          text-align: center;
          margin-bottom: 40px;
        }
        .section-main-title {
          font-size: 2rem;
          font-weight: 800;
          color: #D4A853;
          margin: 0 0 10px;
          text-shadow: 0 0 30px rgba(212, 168, 83, 0.3);
        }
        .section-subtitle {
          font-size: 1.1rem;
          color: #a0a0b0;
          margin: 0;
        }

        .car-categories-horizontal-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          margin-bottom: 60px;
        }

        @media (max-width: 1400px) {
          .car-categories-horizontal-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1000px) {
          .car-categories-horizontal-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .car-category-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          transition: all 0.4s ease;
          border: 2px solid transparent;
        }
        .car-category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
          border-color: var(--category-color);
        }

        .category-card-header {
          padding: 25px 20px;
          text-align: center;
          color: white;
        }
        .category-icon-wrapper {
          margin-bottom: 15px;
        }
        .category-card-header h3 {
          margin: 0 0 5px;
          font-size: 1.2rem;
          font-weight: 700;
        }
        .category-subtitle {
          font-size: 0.85rem;
          opacity: 0.9;
        }

        .category-features-list {
          padding: 20px 15px;
        }
        .feature-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .feature-row:last-child {
          border-bottom: none;
        }
        .feature-icon {
          display: flex;
          flex-shrink: 0;
        }
        .feature-icon svg {
          width: 20px;
          height: 20px;
        }
        .feature-name {
          font-size: 0.9rem;
          color: #333;
          font-weight: 600;
        }

        .category-book-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 15px;
          padding: 14px;
          border-radius: 12px;
          color: white;
          font-weight: 700;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }
        .category-book-btn:hover {
          transform: scale(1.02);
          filter: brightness(1.1);
        }

        .services-details-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }

        .service-detail-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }
        .service-detail-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 50px rgba(0,0,0,0.12);
        }

        .service-detail-header {
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
        }
        .service-detail-icon {
          width: 50px;
          height: 50px;
          background: rgba(200,157,42,0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C89D2A;
        }
        .service-detail-titles h3 {
          margin: 0 0 3px;
          font-size: 1rem;
          color: white;
          font-weight: 700;
        }
        .service-detail-titles span {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
        }
        .service-number {
          position: absolute;
          top: 15px;
          ${isRTL ? 'left' : 'right'}: 15px;
          width: 30px;
          height: 30px;
          background: #C89D2A;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0B1F3A;
          font-weight: 800;
          font-size: 0.9rem;
        }

        .service-description {
          padding: 15px 20px;
          background: linear-gradient(135deg, rgba(200,157,42,0.08), rgba(200,157,42,0.03));
          border-bottom: 1px solid rgba(200,157,42,0.15);
          font-size: 0.85rem;
          line-height: 1.6;
          color: #444;
          font-weight: 500;
          text-align: ${isRTL ? 'right' : 'left'};
        }

        .service-categories-container {
          padding: 20px;
        }
        .service-category-group {
          margin-bottom: 20px;
        }
        .service-category-group:last-child {
          margin-bottom: 0;
        }
        .category-group-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #C89D2A;
          margin: 0 0 12px;
          padding-bottom: 8px;
          border-bottom: 2px solid rgba(200,157,42,0.2);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .category-group-title::before {
          content: '';
          width: 4px;
          height: 16px;
          background: linear-gradient(180deg, #C89D2A, #d4af37);
          border-radius: 2px;
        }
        .service-items-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        .service-item-premium {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 10px 12px;
          background: linear-gradient(135deg, #f8f9fc 0%, #ffffff 100%);
          border-radius: 10px;
          border: 1px solid #e8eef5;
          transition: all 0.25s ease;
        }
        .service-item-premium:hover {
          border-color: #C89D2A;
          background: linear-gradient(135deg, rgba(200,157,42,0.05) 0%, #ffffff 100%);
          transform: translateX(${isRTL ? '5px' : '-5px'});
          box-shadow: 0 4px 15px rgba(200,157,42,0.1);
        }
        .service-item-premium .check-icon {
          color: #34A853;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .item-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .item-primary {
          font-size: 0.85rem;
          font-weight: 600;
          color: #0B1F3A;
          line-height: 1.3;
        }
        .item-secondary {
          font-size: 0.7rem;
          color: #888;
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .service-items-grid {
            grid-template-columns: 1fr;
          }
        }

        .service-items-list {
          padding: 20px;
        }
        .service-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid #f5f5f5;
          font-size: 0.9rem;
          color: #333;
        }
        .service-item:last-child {
          border-bottom: none;
        }

        .cta-section {
          margin-top: 80px;
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          border-radius: 30px;
          padding: 60px 40px;
          text-align: center;
        }
        .cta-content h3 {
          color: white;
          font-size: 2rem;
          margin: 20px 0 15px;
          font-weight: 800;
        }
        .cta-content p {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          margin: 0 0 30px;
        }
        .cta-main-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          color: #0B1F3A;
          padding: 18px 40px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(200,157,42,0.4);
        }
        .cta-main-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 40px rgba(200,157,42,0.5);
        }

        @media (max-width: 1200px) {
          .services-details-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .car-categories-horizontal-grid {
            grid-template-columns: 1fr;
          }
          .services-details-grid {
            grid-template-columns: 1fr;
          }
          .section-main-title {
            font-size: 1.5rem;
          }
          .cta-content h3 {
            font-size: 1.5rem;
          }
          .cta-section {
            padding: 40px 20px;
          }
        }
      `}</style>
    </div>
  )
}

export default Services
