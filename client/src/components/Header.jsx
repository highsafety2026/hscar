import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Smartphone, CreditCard, Globe, ChevronDown, Check, Languages } from 'lucide-react'
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

  return (
    <>
      <header className="header">
        <div className="container">
          <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/images/logo.png" alt="High Safety Logo" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
            <h1 style={{ fontSize: '1.1rem' }}>{language === 'ar' ? 'الأمان العالي الدولي' : 'High Safety Intl'}</h1>
          </Link>
          
          <button 
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>{t.nav.home}</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)}>{t.nav.services}</Link>
            <Link to="/booking" onClick={() => setMenuOpen(false)}>{t.nav.booking}</Link>
            <Link to="/report" onClick={() => setMenuOpen(false)}>{t.nav.report}</Link>
            <Link 
              to="/payment" 
              onClick={() => setMenuOpen(false)}
              style={{
                background: 'linear-gradient(135deg, #34A853, #2e8b47)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}
            >
              <CreditCard size={16} />
              {t.nav.payment}
            </Link>
            {!isInstalled && (
              <button 
                onClick={handleInstall}
                style={{
                  background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
                  color: '#0B1F3A',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem'
                }}
              >
                <Smartphone size={16} />
                {t.nav.downloadApp}
              </button>
            )}
            
            <div className="language-switcher-pro" ref={langDropdownRef}>
              <button 
                className="lang-switcher-btn-pro"
                onClick={() => setShowLangDropdown(!showLangDropdown)}
              >
                <div className="lang-btn-icon">
                  <Languages size={18} />
                </div>
                <div className="lang-btn-content">
                  <span className="lang-flag">{currentLanguage?.flag}</span>
                  <span className="lang-code">{currentLanguage?.code?.toUpperCase()}</span>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`lang-chevron ${showLangDropdown ? 'rotated' : ''}`}
                />
              </button>
              
              {showLangDropdown && (
                <div className="lang-dropdown-pro" style={{ [isRTL ? 'left' : 'right']: 0 }}>
                  <div className="lang-dropdown-header">
                    <Globe size={16} />
                    <span>{t.languageSwitcher?.title || 'Select Language'}</span>
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
              )}
            </div>
          </nav>
        </div>
      </header>

      <style>{`
        .language-switcher-pro {
          position: relative;
        }
        
        .lang-switcher-btn-pro {
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, rgba(200,157,42,0.15), rgba(200,157,42,0.05));
          border: 2px solid rgba(200,157,42,0.4);
          padding: 8px 14px;
          border-radius: 30px;
          color: white;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.3s ease;
        }
        .lang-switcher-btn-pro:hover {
          background: linear-gradient(135deg, rgba(200,157,42,0.25), rgba(200,157,42,0.15));
          border-color: #C89D2A;
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(200,157,42,0.3);
        }
        
        .lang-btn-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0B1F3A;
        }
        
        .lang-btn-content {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .lang-flag {
          font-size: 1.3rem;
        }
        .lang-code {
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }
        
        .lang-chevron {
          color: #C89D2A;
          transition: transform 0.3s ease;
        }
        .lang-chevron.rotated {
          transform: rotate(180deg);
        }
        
        .lang-dropdown-pro {
          position: absolute;
          top: calc(100% + 12px);
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(200,157,42,0.1);
          overflow: hidden;
          z-index: 1000;
          min-width: 320px;
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
          padding: 16px 20px;
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          color: white;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          font-size: 0.95rem;
        }
        .lang-dropdown-header svg {
          color: #C89D2A;
        }
        
        .lang-dropdown-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
          padding: 12px;
          max-height: 350px;
          overflow-y: auto;
        }
        
        .lang-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 14px 8px;
          border: none;
          background: #f8f9fa;
          border-radius: 12px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s ease;
          position: relative;
        }
        .lang-option:hover {
          background: rgba(200,157,42,0.15);
          transform: scale(1.02);
        }
        .lang-option.active {
          background: linear-gradient(135deg, rgba(200,157,42,0.2), rgba(200,157,42,0.1));
          border: 2px solid #C89D2A;
        }
        
        .lang-option-flag {
          font-size: 1.8rem;
        }
        .lang-option-name {
          font-size: 0.75rem;
          color: #0B1F3A;
          font-weight: 500;
          text-align: center;
          line-height: 1.2;
        }
        .lang-option.active .lang-option-name {
          font-weight: 700;
          color: #C89D2A;
        }
        
        .lang-check {
          position: absolute;
          top: 6px;
          right: 6px;
          color: #C89D2A;
          background: white;
          border-radius: 50%;
          padding: 2px;
        }
        
        @media (max-width: 768px) {
          .lang-dropdown-pro {
            position: fixed;
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            border-radius: 24px 24px 0 0;
            min-width: 100%;
            max-height: 70vh;
            animation: slideUp 0.3s ease;
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(100%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .lang-dropdown-grid {
            grid-template-columns: repeat(4, 1fr);
            max-height: 60vh;
          }
          
          .lang-switcher-btn-pro {
            padding: 6px 10px;
          }
          .lang-btn-icon {
            width: 28px;
            height: 28px;
          }
          .lang-btn-icon svg {
            width: 14px;
            height: 14px;
          }
          .lang-code {
            display: none;
          }
        }
        
        @media (max-width: 480px) {
          .lang-dropdown-grid {
            grid-template-columns: repeat(3, 1fr);
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
              background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Smartphone size={35} color="#C89D2A" />
            </div>
            <h3 style={{ color: '#0B1F3A', marginBottom: '20px', fontSize: '1.2rem' }}>
              {language === 'ar' ? 'تثبيت التطبيق' : 'Install App'}
            </h3>
            <div style={{ textAlign: language === 'ar' ? 'right' : 'left', color: '#333', lineHeight: '2.2', fontSize: '0.95rem' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#C89D2A', color: 'white', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0 }}>1</span>
                {language === 'ar' ? 'افتح الموقع في Chrome' : 'Open in Chrome browser'}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#C89D2A', color: 'white', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0 }}>2</span>
                {language === 'ar' ? 'اضغط على ⋮ (القائمة)' : 'Tap ⋮ (menu)'}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#C89D2A', color: 'white', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0 }}>3</span>
                {language === 'ar' ? 'اختر "إضافة إلى الشاشة الرئيسية"' : 'Select "Add to Home Screen"'}
              </p>
            </div>
            <button
              onClick={() => setShowAndroidModal(false)}
              style={{
                marginTop: '25px',
                background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
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
              background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Smartphone size={35} color="#C89D2A" />
            </div>
            <h3 style={{ color: '#0B1F3A', marginBottom: '20px', fontSize: '1.2rem' }}>
              {language === 'ar' ? 'تثبيت التطبيق على iPhone' : 'Install App on iPhone'}
            </h3>
            <div style={{ textAlign: language === 'ar' ? 'right' : 'left', color: '#333', lineHeight: '2.2', fontSize: '0.95rem' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ 
                  background: '#C89D2A', 
                  color: 'white', 
                  width: '25px', 
                  height: '25px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  flexShrink: 0
                }}>1</span>
                {language === 'ar' ? 'اضغط على أيقونة المشاركة ⬆️' : 'Tap the Share icon ⬆️'}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ 
                  background: '#C89D2A', 
                  color: 'white', 
                  width: '25px', 
                  height: '25px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  flexShrink: 0
                }}>2</span>
                {language === 'ar' ? 'اختر "إضافة إلى الشاشة الرئيسية"' : 'Select "Add to Home Screen"'}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ 
                  background: '#C89D2A', 
                  color: 'white', 
                  width: '25px', 
                  height: '25px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  flexShrink: 0
                }}>3</span>
                {language === 'ar' ? 'اضغط "إضافة"' : 'Tap "Add"'}
              </p>
            </div>
            <button
              onClick={() => setShowIOSModal(false)}
              style={{
                marginTop: '25px',
                background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
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
