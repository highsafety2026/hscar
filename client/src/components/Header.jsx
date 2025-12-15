import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Smartphone, Globe, ChevronDown, Check, Languages, Home, Settings, Calendar, FileText } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

function Header() {
  const { language, setLanguage, t, languages, currentLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showIOSModal, setShowIOSModal] = useState(false)
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [showAndroidModal, setShowAndroidModal] = useState(false)
  const langDropdownRef = useRef(null)
  const location = useLocation()
  const isRTL = language === 'ar' || language === 'ur' || language === 'fa'

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setShowLangDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone

    if (isInStandaloneMode) {
      setIsInstalled(true)
      return
    }

    if (isIOSDevice) {
      setIsIOS(true)
    }

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    const installedHandler = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', installedHandler)
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', installedHandler)
    }
  }, [])

  const handleInstall = async () => {
    setMenuOpen(false)
    if (isIOS) {
      setShowIOSModal(true)
      return
    }
    
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setIsInstalled(true)
      }
      setDeferredPrompt(null)
    } else {
      setShowAndroidModal(true)
    }
  }

  const navItems = [
    { path: '/', label: t.nav.home, icon: <Home size={18} /> },
    { path: '/services', label: t.nav.services, icon: <Settings size={18} /> },
    { path: '/booking', label: t.nav.booking, icon: <Calendar size={18} /> },
    { path: '/report', label: t.nav.report, icon: <FileText size={18} /> },
  ]

  return (
    <>
      <header className="header-pro">
        <div className="header-top">
          <div className="container">
            <Link to="/" className="logo-pro">
              <div className="logo-image-container">
                <img src="/images/logo.png" alt="High Safety Logo" />
              </div>
              <div className="logo-text-container">
                <h1>{language === 'ar' ? 'الأمان العالي الدولي' : 'High Safety International'}</h1>
                <span className="logo-subtitle">{language === 'ar' ? 'للفحص الفني للسيارات' : 'Technical Car Inspection'}</span>
              </div>
            </Link>
            
            <div className="header-actions">
              <div className="language-switcher-pro" ref={langDropdownRef}>
                <button 
                  className="lang-switcher-btn-pro"
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                >
                  <span className="lang-flag">{currentLanguage?.flag}</span>
                  <span className="lang-code">{currentLanguage?.code?.toUpperCase()}</span>
                  <ChevronDown 
                    size={14} 
                    className={`lang-chevron ${showLangDropdown ? 'rotated' : ''}`}
                  />
                </button>
                
                {showLangDropdown && (
                  <>
                    <div 
                      className="lang-dropdown-overlay" 
                      onClick={() => setShowLangDropdown(false)}
                    />
                    <div className="lang-dropdown-pro">
                      <div className="lang-dropdown-header">
                        <Globe size={16} />
                        <span>{language === 'ar' ? 'اختر اللغة' : 'Select Language'}</span>
                      </div>
                      <div className="lang-dropdown-grid">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            className={`lang-option ${language === lang.code ? 'active' : ''}`}
                            onClick={() => {
                              setLanguage(lang.code);
                              setShowLangDropdown(false);
                              setMenuOpen(false);
                            }}
                          >
                            <span className="lang-option-flag">{lang.flag}</span>
                            <span className="lang-option-name">{lang.name}</span>
                            {language === lang.code && (
                              <Check size={14} className="lang-check" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {!isInstalled && (
                <button className="install-btn-pro" onClick={handleInstall}>
                  <Smartphone size={16} />
                  <span>{language === 'ar' ? 'تحميل' : 'Install'}</span>
                </button>
              )}
              
              <button 
                className="mobile-menu-btn-pro"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        <nav className={`nav-pro ${menuOpen ? 'nav-open' : ''}`}>
          <div className="container">
            <div className="nav-items">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <style>{`
        .header-pro {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: linear-gradient(180deg, #0a0a14 0%, #0d0d1a 100%);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }
        
        .header-top {
          padding: 15px 0;
          border-bottom: 1px solid rgba(212, 168, 83, 0.15);
        }
        
        .header-top .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .logo-pro {
          display: flex;
          align-items: center;
          gap: 15px;
          text-decoration: none;
          color: white;
        }
        
        .logo-image-container {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #D4A853;
          box-shadow: 0 4px 20px rgba(212, 168, 83, 0.4);
          flex-shrink: 0;
        }
        
        .logo-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .logo-text-container {
          display: flex;
          flex-direction: column;
        }
        
        .logo-text-container h1 {
          font-size: 1.4rem;
          font-weight: 800;
          color: #D4A853;
          margin: 0;
          text-shadow: 0 0 30px rgba(212, 168, 83, 0.3);
          letter-spacing: 0.5px;
        }
        
        .logo-subtitle {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 2px;
        }
        
        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .lang-switcher-btn-pro {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(212, 168, 83, 0.15);
          border: 1px solid rgba(212, 168, 83, 0.3);
          padding: 8px 14px;
          border-radius: 25px;
          color: white;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.3s ease;
        }
        
        .lang-switcher-btn-pro:hover {
          background: rgba(212, 168, 83, 0.25);
          border-color: #D4A853;
        }
        
        .lang-flag {
          font-size: 1.2rem;
        }
        
        .lang-code {
          font-weight: 700;
          font-size: 0.85rem;
        }
        
        .lang-chevron {
          color: #D4A853;
          transition: transform 0.3s ease;
        }
        
        .lang-chevron.rotated {
          transform: rotate(180deg);
        }
        
        .install-btn-pro {
          display: flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #D4A853, #e8c252);
          color: #0a0a14;
          border: none;
          padding: 8px 16px;
          border-radius: 25px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }
        
        .install-btn-pro:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(212, 168, 83, 0.4);
        }
        
        .mobile-menu-btn-pro {
          display: none;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 8px;
        }
        
        .nav-pro {
          background: rgba(20, 20, 35, 0.95);
          border-bottom: 1px solid rgba(212, 168, 83, 0.1);
        }
        
        .nav-pro .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .nav-items {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 12px 0;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 30px;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        
        .nav-item:hover {
          color: #D4A853;
          background: rgba(212, 168, 83, 0.1);
          border-color: rgba(212, 168, 83, 0.3);
        }
        
        .nav-item.active {
          color: #D4A853;
          background: rgba(212, 168, 83, 0.15);
          border-color: rgba(212, 168, 83, 0.4);
        }
        
        .nav-item svg {
          flex-shrink: 0;
        }
        
        .language-switcher-pro {
          position: relative;
        }
        
        .lang-dropdown-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 10001;
        }
        
        .lang-dropdown-pro {
          position: absolute;
          top: calc(100% + 10px);
          ${isRTL ? 'left: 0;' : 'right: 0;'}
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          overflow: hidden;
          z-index: 10002;
          min-width: 280px;
          animation: dropdownSlide 0.25s ease;
        }
        
        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .lang-dropdown-header {
          padding: 14px 18px;
          background: linear-gradient(135deg, #0a0a14, #1a1a2e);
          color: white;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          border-bottom: 2px solid #D4A853;
        }
        
        .lang-dropdown-header svg {
          color: #D4A853;
        }
        
        .lang-dropdown-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          padding: 12px;
          background: #f8f9fb;
        }
        
        .lang-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 12px 8px;
          border: 2px solid transparent;
          background: white;
          border-radius: 10px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .lang-option:hover {
          border-color: rgba(212, 168, 83, 0.3);
          background: rgba(212, 168, 83, 0.05);
        }
        
        .lang-option.active {
          border-color: #D4A853;
          background: rgba(212, 168, 83, 0.1);
        }
        
        .lang-option-flag {
          font-size: 1.5rem;
        }
        
        .lang-option-name {
          font-size: 0.7rem;
          color: #333;
          font-weight: 600;
          text-align: center;
        }
        
        .lang-option.active .lang-option-name {
          color: #D4A853;
          font-weight: 700;
        }
        
        .lang-check {
          position: absolute;
          top: 4px;
          right: 4px;
          color: white;
          background: #D4A853;
          border-radius: 50%;
          padding: 2px;
        }
        
        @media (max-width: 900px) {
          .mobile-menu-btn-pro {
            display: block;
          }
          
          .install-btn-pro span {
            display: none;
          }
          
          .install-btn-pro {
            padding: 10px;
            border-radius: 50%;
          }
          
          .nav-pro {
            display: none;
          }
          
          .nav-pro.nav-open {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #0d0d1a;
            border-bottom: 2px solid rgba(212, 168, 83, 0.3);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          }
          
          .nav-items {
            flex-direction: column;
            padding: 15px;
            gap: 8px;
          }
          
          .nav-item {
            justify-content: center;
            padding: 14px 20px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
          }
          
          .logo-text-container h1 {
            font-size: 1rem;
          }
          
          .logo-subtitle {
            font-size: 0.7rem;
          }
          
          .logo-image-container {
            width: 45px;
            height: 45px;
          }
        }
        
        @media (max-width: 480px) {
          .logo-text-container h1 {
            font-size: 0.9rem;
          }
          
          .logo-subtitle {
            display: none;
          }
          
          .logo-image-container {
            width: 40px;
            height: 40px;
          }
          
          .lang-switcher-btn-pro {
            padding: 6px 10px;
          }
          
          .lang-code {
            display: none;
          }
        }
      `}</style>

      {showAndroidModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10001,
          padding: '20px'
        }} onClick={() => setShowAndroidModal(false)}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '350px',
            textAlign: 'center',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowAndroidModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: '#f0f0f0',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
            <div style={{
              width: '70px',
              height: '70px',
              background: 'linear-gradient(135deg, #0a0a14, #1a1a2e)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Smartphone size={35} color="#D4A853" />
            </div>
            <h3 style={{ color: '#0a0a14', marginBottom: '20px', fontSize: '1.2rem' }}>
              {language === 'ar' ? 'تثبيت التطبيق' : 'Install App'}
            </h3>
            <div style={{ textAlign: language === 'ar' ? 'right' : 'left', color: '#333', lineHeight: '2.2', fontSize: '0.95rem' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#D4A853', color: 'white', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0 }}>1</span>
                {language === 'ar' ? 'افتح الموقع في Chrome' : 'Open in Chrome browser'}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#D4A853', color: 'white', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0 }}>2</span>
                {language === 'ar' ? 'اضغط على ⋮ (القائمة)' : 'Tap ⋮ (menu)'}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#D4A853', color: 'white', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0 }}>3</span>
                {language === 'ar' ? 'اختر "إضافة إلى الشاشة الرئيسية"' : 'Select "Add to Home Screen"'}
              </p>
            </div>
            <button
              onClick={() => setShowAndroidModal(false)}
              style={{
                marginTop: '25px',
                background: 'linear-gradient(135deg, #0a0a14, #1a1a2e)',
                color: 'white',
                border: 'none',
                padding: '14px 40px',
                borderRadius: '10px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '1rem'
              }}
            >
              {language === 'ar' ? 'فهمت' : 'Got it'}
            </button>
          </div>
        </div>
      )}

      {showIOSModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10001,
          padding: '20px'
        }} onClick={() => setShowIOSModal(false)}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '350px',
            textAlign: 'center',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowIOSModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: '#f0f0f0',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
            <div style={{
              width: '70px',
              height: '70px',
              background: 'linear-gradient(135deg, #0a0a14, #1a1a2e)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Smartphone size={35} color="#D4A853" />
            </div>
            <h3 style={{ color: '#0a0a14', marginBottom: '20px', fontSize: '1.2rem' }}>
              {language === 'ar' ? 'تثبيت التطبيق على iPhone' : 'Install App on iPhone'}
            </h3>
            <div style={{ textAlign: language === 'ar' ? 'right' : 'left', color: '#333', lineHeight: '2.2', fontSize: '0.95rem' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#D4A853', color: 'white', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0 }}>1</span>
                {language === 'ar' ? 'اضغط على زر المشاركة' : 'Tap the Share button'}
                <span style={{ fontSize: '1.2rem' }}>⬆️</span>
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#D4A853', color: 'white', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0 }}>2</span>
                {language === 'ar' ? 'اختر "إضافة إلى الشاشة الرئيسية"' : 'Select "Add to Home Screen"'}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#D4A853', color: 'white', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0 }}>3</span>
                {language === 'ar' ? 'اضغط "إضافة"' : 'Tap "Add"'}
              </p>
            </div>
            <button
              onClick={() => setShowIOSModal(false)}
              style={{
                marginTop: '25px',
                background: 'linear-gradient(135deg, #0a0a14, #1a1a2e)',
                color: 'white',
                border: 'none',
                padding: '14px 40px',
                borderRadius: '10px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '1rem'
              }}
            >
              {language === 'ar' ? 'فهمت' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
