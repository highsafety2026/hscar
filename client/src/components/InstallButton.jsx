import { useState, useEffect } from 'react'
import { Download, Smartphone } from 'lucide-react'

function InstallButton() {
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

  if (isInstalled) return null

  return (
    <>
      <button
        onClick={handleInstall}
        style={{
          position: 'fixed',
          bottom: '100px',
          left: '25px',
          background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
          color: '#0B1F3A',
          border: 'none',
          padding: '15px 20px',
          borderRadius: '50px',
          fontWeight: '700',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'inherit',
          fontSize: '0.95rem',
          boxShadow: '0 6px 25px rgba(200, 157, 42, 0.5)',
          zIndex: 999,
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        <Smartphone size={20} />
        <span>حمّل التطبيق</span>
      </button>

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
            textAlign: 'center'
          }} onClick={(e) => e.stopPropagation()}>
            <img src="/images/logo.png" alt="Logo" style={{ width: '60px', marginBottom: '15px' }} />
            <h3 style={{ color: '#0B1F3A', marginBottom: '15px' }}>تثبيت التطبيق على iPhone</h3>
            <div style={{ textAlign: 'right', color: '#333', lineHeight: '2' }}>
              <p>1. اضغط على أيقونة المشاركة <span style={{ fontSize: '1.2rem' }}>⬆️</span></p>
              <p>2. مرر للأسفل واختر "إضافة إلى الشاشة الرئيسية"</p>
              <p>3. اضغط "إضافة" في أعلى الشاشة</p>
            </div>
            <button
              onClick={() => setShowIOSModal(false)}
              style={{
                marginTop: '20px',
                background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '10px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'inherit'
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

export default InstallButton
