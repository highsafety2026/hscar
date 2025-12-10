import { useState, useEffect } from 'react'
import { RefreshCw, X } from 'lucide-react'

function UpdatePrompt() {
  const [showUpdate, setShowUpdate] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState(null)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setWaitingWorker(newWorker)
                setShowUpdate(true)
              }
            })
          }
        })
      })

      let refreshing = false
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true
          window.location.reload()
        }
      })
    }
  }, [])

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage('skipWaiting')
    }
    setShowUpdate(false)
  }

  if (!showUpdate) return null

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, #28a745, #20c997)',
      color: 'white',
      padding: '15px 20px',
      borderRadius: '12px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      zIndex: 10001,
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      animation: 'slideDown 0.3s ease'
    }}>
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      
      <RefreshCw size={24} />
      <div style={{ flex: 1 }}>
        <strong>تحديث جديد متاح!</strong>
        <p style={{ margin: '5px 0 0', fontSize: '0.9rem', opacity: 0.9 }}>اضغط للتحديث الآن</p>
      </div>
      <button
        onClick={handleUpdate}
        style={{
          background: 'white',
          color: '#28a745',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: '700',
          cursor: 'pointer',
          fontFamily: 'inherit'
        }}
      >
        تحديث
      </button>
      <button
        onClick={() => setShowUpdate(false)}
        style={{
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
    </div>
  )
}

export default UpdatePrompt
