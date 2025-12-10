import { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone

    if (isIOSDevice && !isInStandaloneMode) {
      setIsIOS(true)
      const dismissed = localStorage.getItem('pwa-prompt-dismissed')
      if (!dismissed) {
        setTimeout(() => setShowPrompt(true), 3000)
      }
    }

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      const dismissed = localStorage.getItem('pwa-prompt-dismissed')
      if (!dismissed) {
        setTimeout(() => setShowPrompt(true), 3000)
      }
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setShowPrompt(false)
      }
      setDeferredPrompt(null)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-prompt-dismissed', 'true')
  }

  if (!showPrompt) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      left: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
      color: 'white',
      padding: '20px',
      borderRadius: '16px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      zIndex: 10000,
      animation: 'slideUp 0.3s ease'
    }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      
      <button 
        onClick={handleDismiss}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white'
        }}
      >
        <X size={18} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img 
          src="/images/logo.png" 
          alt="Logo" 
          style={{ width: '50px', height: '50px', borderRadius: '12px' }} 
        />
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 5px', fontSize: '1.1rem' }}>حمّل التطبيق</h4>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>
            {isIOS 
              ? 'اضغط على "مشاركة" ثم "إضافة للشاشة الرئيسية"'
              : 'أضف التطبيق لشاشتك الرئيسية للوصول السريع'
            }
          </p>
        </div>
        {!isIOS && (
          <button
            onClick={handleInstall}
            style={{
              background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
              color: '#0B1F3A',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '10px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'inherit'
            }}
          >
            <Download size={18} />
            تثبيت
          </button>
        )}
      </div>
    </div>
  )
}

export default InstallPrompt
