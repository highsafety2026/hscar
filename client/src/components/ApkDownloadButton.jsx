import { Download, Smartphone } from 'lucide-react'

function ApkDownloadButton() {
  const handleDownload = () => {
    window.open('/downloads/high-safety.apk', '_blank')
  }

  return (
    <div
      onClick={handleDownload}
      style={{
        position: 'fixed',
        bottom: '100px',
        left: '25px',
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        cursor: 'pointer',
        zIndex: 997,
        animation: 'fadeIn 0.5s ease'
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{
        background: 'linear-gradient(135deg, #28a745, #20c997)',
        color: 'white',
        padding: '10px 16px',
        borderRadius: '25px 0 0 25px',
        fontWeight: '700',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        boxShadow: '0 4px 15px rgba(40, 167, 69, 0.4)'
      }}>
        <Download size={16} />
        تحميل التطبيق
      </div>
      <div style={{
        background: 'linear-gradient(135deg, #1e7e34, #17a2b8)',
        color: 'white',
        width: '50px',
        height: '50px',
        borderRadius: '0 50% 50% 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(40, 167, 69, 0.4)'
      }}>
        <Smartphone size={22} />
      </div>
    </div>
  )
}

export default ApkDownloadButton
