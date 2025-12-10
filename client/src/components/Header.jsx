import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Smartphone } from 'lucide-react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showIOSModal, setShowIOSModal] = useState(false)

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
            <h1 style={{ fontSize: '1.1rem' }}>الأمان العالي الدولي</h1>
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
            <Link to="/" onClick={() => setMenuOpen(false)}>الرئيسية</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)}>الخدمات</Link>
            <Link to="/booking" onClick={() => setMenuOpen(false)}>حجز موعد</Link>
            <Link to="/report" onClick={() => setMenuOpen(false)}>تحميل التقرير</Link>
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
                تحميل التطبيق
              </button>
            )}
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
              تثبيت التطبيق على iPhone
            </h3>
            <div style={{ textAlign: 'right', color: '#333', lineHeight: '2.2', fontSize: '0.95rem' }}>
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
                اضغط على أيقونة المشاركة ⬆️
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
                اختر "إضافة إلى الشاشة الرئيسية"
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
                اضغط "إضافة"
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
              فهمت
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
