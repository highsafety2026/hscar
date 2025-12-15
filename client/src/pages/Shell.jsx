import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Terminal, Send, Trash2, ArrowLeft } from 'lucide-react'

function Shell() {
  const navigate = useNavigate()
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: 'مرحباً بك في لوحة التحكم - High Safety Shell v1.0' },
    { type: 'system', text: 'اكتب الأمر واضغط Enter للتنفيذ' }
  ])
  const [loading, setLoading] = useState(false)
  const outputRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin')
    }
  }, [navigate])

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = async () => {
    if (!command.trim()) return
    
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin')
      return
    }

    setHistory(prev => [...prev, { type: 'command', text: `$ ${command}` }])
    setLoading(true)

    try {
      const res = await fetch('/api/admin/shell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ command: command.trim() })
      })

      const data = await res.json()
      
      if (res.ok) {
        setHistory(prev => [...prev, { 
          type: 'output', 
          text: data.output || 'تم التنفيذ بنجاح'
        }])
      } else {
        setHistory(prev => [...prev, { 
          type: 'error', 
          text: data.error || 'حدث خطأ'
        }])
      }
    } catch (error) {
      setHistory(prev => [...prev, { 
        type: 'error', 
        text: 'خطأ في الاتصال بالسيرفر'
      }])
    }

    setCommand('')
    setLoading(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      executeCommand()
    }
  }

  const clearHistory = () => {
    setHistory([
      { type: 'system', text: 'تم مسح السجل' }
    ])
  }

  return (
    <div className="shell-page">
      <div className="shell-header">
        <div className="shell-title">
          <Terminal size={28} />
          <div>
            <h1>Terminal</h1>
            <span>لوحة التحكم المتقدمة</span>
          </div>
        </div>
        <div className="shell-actions">
          <button className="shell-btn clear" onClick={clearHistory}>
            <Trash2 size={18} />
            مسح
          </button>
          <button className="shell-btn back" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft size={18} />
            العودة
          </button>
        </div>
      </div>

      <div className="shell-container">
        <div className="shell-output" ref={outputRef}>
          {history.map((item, index) => (
            <div key={index} className={`shell-line ${item.type}`}>
              {item.type === 'command' && <span className="prompt">❯</span>}
              <pre>{item.text}</pre>
            </div>
          ))}
          {loading && (
            <div className="shell-line loading">
              <span className="loading-dots">...</span>
            </div>
          )}
        </div>

        <div className="shell-input-area">
          <span className="input-prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اكتب الأمر هنا..."
            disabled={loading}
            autoFocus
          />
          <button 
            className="execute-btn" 
            onClick={executeCommand}
            disabled={loading || !command.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <style>{`
        .shell-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);
          padding: 20px;
        }

        .shell-header {
          max-width: 1200px;
          margin: 0 auto 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: rgba(255,255,255,0.05);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .shell-title {
          display: flex;
          align-items: center;
          gap: 15px;
          color: #00D4FF;
        }

        .shell-title h1 {
          margin: 0;
          font-size: 1.5rem;
          color: white;
        }

        .shell-title span {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
        }

        .shell-actions {
          display: flex;
          gap: 10px;
        }

        .shell-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .shell-btn.clear {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .shell-btn.clear:hover {
          background: rgba(239, 68, 68, 0.3);
        }

        .shell-btn.back {
          background: rgba(0, 212, 255, 0.2);
          color: #00D4FF;
        }

        .shell-btn.back:hover {
          background: rgba(0, 212, 255, 0.3);
        }

        .shell-container {
          max-width: 1200px;
          margin: 0 auto;
          background: #0d0d1a;
          border-radius: 16px;
          border: 1px solid rgba(0, 212, 255, 0.2);
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .shell-output {
          height: 500px;
          overflow-y: auto;
          padding: 20px;
          font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .shell-line {
          display: flex;
          gap: 10px;
          margin-bottom: 8px;
        }

        .shell-line pre {
          margin: 0;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .shell-line.system {
          color: #64748b;
        }

        .shell-line.command {
          color: #00D4FF;
        }

        .shell-line.command .prompt {
          color: #C89D2A;
        }

        .shell-line.output {
          color: #34d399;
        }

        .shell-line.error {
          color: #ef4444;
        }

        .shell-line.loading {
          color: #C89D2A;
        }

        .loading-dots {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .shell-input-area {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 20px;
          background: rgba(0, 212, 255, 0.05);
          border-top: 1px solid rgba(0, 212, 255, 0.2);
        }

        .input-prompt {
          color: #C89D2A;
          font-family: 'Fira Code', monospace;
          font-size: 1.2rem;
          font-weight: bold;
        }

        .shell-input-area input {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          font-family: 'Fira Code', 'Monaco', monospace;
          font-size: 1rem;
          outline: none;
        }

        .shell-input-area input::placeholder {
          color: rgba(255,255,255,0.3);
        }

        .execute-btn {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #00D4FF, #0066FF);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .execute-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        }

        .execute-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .shell-page {
            padding: 10px;
          }

          .shell-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .shell-output {
            height: 400px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Shell
