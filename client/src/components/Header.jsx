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
            <img src="/images/logo.png" alt="High Safety Logo" style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid rgba(200,157,42,0.5)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }} />
            <h1 style={{ 
              fontSize: '1.2rem', 
              fontWeight: '700', 
              color: '#ffffff',
              textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
              letterSpacing: '0.5px',
              margin: 0
            }}>{language === 'ar' ? 'الأمان العالي الدولي' : 'High Safety Intl'}</h1>
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
                <>
                  <div 
                    className="lang-dropdown-overlay" 
                    onClick={() => setShowLangDropdown(false)}
                    style={{ display: window.innerWidth <= 768 ? 'block' : 'none' }}
                  />
                  <div className="lang-dropdown-pro" style={{ [isRTL ? 'left' : 'right']: 0 }}>
                    <div className="lang-dropdown-header">
                      <Globe size={18} />
                      <span>{t.languageSwitcher?.title || 'اختر اللغة - Select Language'}</span>
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
                            <Check size={16} className="lang-check" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
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
          background: linear-gradient(135deg, rgba(200,157,42,0.2), rgba(200,157,42,0.08));
          border: 2px solid rgba(200,157,42,0.5);
          padding: 10px 18px;
          border-radius: 35px;
          color: white;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }
        .lang-switcher-btn-pro:hover {
          background: linear-gradient(135deg, rgba(200,157,42,0.35), rgba(200,157,42,0.2));
          border-color: #C89D2A;
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(200,157,42,0.4);
        }
        .lang-switcher-btn-pro:active {
          transform: translateY(-1px);
        }
        
        .lang-btn-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #C89D2A, #d4af37, #e8c252);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0B1F3A;
          box-shadow: 0 3px 12px rgba(200,157,42,0.4);
        }
        
        .lang-btn-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .lang-flag {
          font-size: 1.5rem;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }
        .lang-code {
          font-weight: 800;
          font-size: 0.95rem;
          letter-spacing: 1px;
          text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        
        .lang-chevron {
          color: #C89D2A;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .lang-chevron.rotated {
          transform: rotate(180deg);
        }
        
        .lang-dropdown-pro {
          position: absolute;
          top: calc(100% + 12px);
          background: white;
          border-radius: 20px;
          box-shadow: 0 25px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(200,157,42,0.2);
          overflow: hidden;
          z-index: 1000;
          min-width: 380px;
          animation: dropdownSlide 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .lang-dropdown-header {
          padding: 18px 24px;
          background: linear-gradient(135deg, #0B1F3A 0%, #1a3a5c 50%, #0B1F3A 100%);
          color: white;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 1rem;
          border-bottom: 3px solid #C89D2A;
        }
        .lang-dropdown-header svg {
          color: #C89D2A;
        }
        
        .lang-dropdown-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          padding: 16px;
          max-height: 350px;
          overflow-y: auto;
          background: linear-gradient(180deg, #f8fafb 0%, #ffffff 100%);
        }
        
        .lang-dropdown-grid::-webkit-scrollbar {
          width: 6px;
        }
        .lang-dropdown-grid::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .lang-dropdown-grid::-webkit-scrollbar-thumb {
          background: #C89D2A;
          border-radius: 3px;
        }
        
        .lang-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 10px;
          border: 2px solid transparent;
          background: white;
          border-radius: 14px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .lang-option:hover {
          background: linear-gradient(135deg, rgba(200,157,42,0.12), rgba(200,157,42,0.06));
          border-color: rgba(200,157,42,0.4);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(200,157,42,0.2);
        }
        .lang-option.active {
          background: linear-gradient(135deg, rgba(200,157,42,0.2), rgba(200,157,42,0.1));
          border: 2px solid #C89D2A;
          box-shadow: 0 4px 15px rgba(200,157,42,0.3);
        }
        
        .lang-option-flag {
          font-size: 2rem;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }
        .lang-option-name {
          font-size: 0.75rem;
          color: #0B1F3A;
          font-weight: 600;
          text-align: center;
          line-height: 1.3;
        }
        .lang-option.active .lang-option-name {
          font-weight: 800;
          color: #C89D2A;
        }
        
        .lang-check {
          position: absolute;
          top: 8px;
          right: 8px;
          color: white;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          border-radius: 50%;
          padding: 3px;
          box-shadow: 0 2px 8px rgba(200,157,42,0.4);
        }
        
        @media (max-width: 768px) {
          .lang-dropdown-pro {
            position: fixed;
            top: 50%;
            left: 50%;
            right: auto;
            bottom: auto;
            transform: translate(-50%, -50%);
            border-radius: 24px;
            min-width: 90vw;
            max-width: 400px;
            max-height: 85vh;
            animation: modalPop 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 10002;
            overflow: hidden;
          }
          
          @keyframes modalPop {
            from {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.8);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }
          
          .lang-dropdown-header {
            padding: 20px;
            font-size: 1.1rem;
            text-align: center;
            justify-content: center;
          }
          
          .lang-dropdown-grid {
            grid-template-columns: repeat(3, 1fr);
            max-height: 60vh;
            padding: 20px;
            gap: 12px;
            overflow-y: auto;
          }
          
          .lang-option {
            padding: 18px 12px;
            border-radius: 16px;
          }
          
          .lang-option-flag {
            font-size: 2.2rem;
          }
          
          .lang-option-name {
            font-size: 0.85rem;
          }
          
          .lang-switcher-btn-pro {
            padding: 10px 16px;
            border-radius: 25px;
          }
          .lang-btn-icon {
            width: 34px;
            height: 34px;
          }
          .lang-btn-icon svg {
            width: 16px;
            height: 16px;
          }
          .lang-flag {
            font-size: 1.4rem;
          }
          .lang-code {
            font-size: 0.85rem;
            font-weight: 700;
          }
        }
        
        @media (max-width: 480px) {
          .lang-dropdown-pro {
            min-width: 95vw;
            max-width: 95vw;
          }
          
          .lang-dropdown-grid {
            grid-template-columns: repeat(3, 1fr);
            padding: 16px;
            gap: 10px;
          }
          
          .lang-option {
            padding: 14px 8px;
          }
          
          .lang-option-flag {
            font-size: 1.9rem;
          }
          
          .lang-option-name {
            font-size: 0.8rem;
          }
        }
        
        .lang-dropdown-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 10001;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
