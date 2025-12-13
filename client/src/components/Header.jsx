import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Smartphone, CreditCard, Globe, ChevronDown, Check } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

function Header() {
  const { language, setLanguage, t, languages, currentLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showIOSModal, setShowIOSModal] = useState(false)
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const langDropdownRef = useRef(null)

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
            <div className="language-switcher" ref={langDropdownRef}>
              <button 
                className="language-switcher-btn"
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(200,157,42,0.5)',
                  padding: '8px 14px',
                  borderRadius: '25px',
                  color: 'white',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <Globe size={16} style={{ color: '#C89D2A' }} />
                <span style={{ fontSize: '1rem' }}>{currentLanguage?.flag}</span>
                <span style={{ fontWeight: '500' }}>{currentLanguage?.name}</span>
                <ChevronDown 
                  size={14} 
                  style={{ 
                    color: '#C89D2A',
                    transform: showLangDropdown ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease'
                  }} 
                />
              </button>
              
              {showLangDropdown && (
                <div 
                  className="language-dropdown"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: language === 'ar' ? 'auto' : '0',
                    right: language === 'ar' ? '0' : 'auto',
                    marginTop: '8px',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                    zIndex: 1000,
                    minWidth: '180px',
                    animation: 'fadeInDown 0.2s ease'
                  }}
                >
                  <div style={{
                    padding: '12px 16px',
                    background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
                    color: 'white',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Globe size={14} style={{ color: '#C89D2A' }} />
                    {t.languageSwitcher?.title || 'Select Language'}
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLangDropdown(false);
                        setMenuOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        width: '100%',
                        padding: '14px 16px',
                        border: 'none',
                        background: language === lang.code ? 'rgba(200,157,42,0.1)' : 'white',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: '0.95rem',
                        color: '#0B1F3A',
                        textAlign: language === 'ar' ? 'right' : 'left',
                        transition: 'background 0.2s ease',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(200,157,42,0.1)'}
                      onMouseLeave={(e) => e.target.style.background = language === lang.code ? 'rgba(200,157,42,0.1)' : 'white'}
                    >
                      <span style={{ fontSize: '1.3rem' }}>{lang.flag}</span>
                      <span style={{ flex: 1, fontWeight: language === lang.code ? '600' : '400' }}>
                        {lang.name}
                      </span>
                      {language === lang.code && (
                        <Check size={16} style={{ color: '#C89D2A' }} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

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
