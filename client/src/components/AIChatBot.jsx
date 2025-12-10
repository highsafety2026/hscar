import { useState, useRef, useEffect } from 'react'
import { X, Send, Bot, User, FileText, Loader2, Sparkles } from 'lucide-react'

function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'مرحباً! أنا المساعد الذكي لمركز الأمان العالي للفحص الفني. يمكنني مساعدتك في:\n\n📋 حجز موعد للفحص\n📄 تحليل تقرير الفحص وتقدير سعر السيارة\n❓ الإجابة على أي استفسارات\n\nكيف يمكنني خدمتك؟' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingPdf, setUploadingPdf] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (customMessage = null) => {
    const messageToSend = customMessage || input.trim()
    if (!messageToSend || isLoading) return

    if (!customMessage) setInput('')
    const newMessages = [...messages, { role: 'user', content: messageToSend }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      const conversationHistory = newMessages.map(m => ({
        role: m.role,
        content: m.content
      }))
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend, history: conversationHistory })
      })

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل معنا عبر الواتساب.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !file.name.toLowerCase().endsWith('.pdf')) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'يرجى رفع ملف PDF فقط.' 
      }])
      return
    }

    setUploadingPdf(true)
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: `📄 تم رفع ملف: ${file.name}`,
      isPdf: true
    }])

    try {
      const formData = new FormData()
      formData.append('pdf', file)

      const response = await fetch('/api/chat/analyze-pdf', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'عذراً، حدث خطأ في تحليل الملف. يرجى التأكد من صحة ملف PDF والمحاولة مرة أخرى.' 
      }])
    } finally {
      setUploadingPdf(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '170px',
            left: '25px',
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            cursor: 'pointer',
            zIndex: 998,
            animation: 'pulse 2s infinite'
          }}
        >
          <style>{`
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            @keyframes glow {
              0%, 100% { box-shadow: 0 6px 25px rgba(200, 157, 42, 0.5); }
              50% { box-shadow: 0 6px 35px rgba(200, 157, 42, 0.8); }
            }
          `}</style>
          <div style={{
            background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
            color: '#0B1F3A',
            padding: '10px 18px',
            borderRadius: '25px 0 0 25px',
            fontWeight: '700',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 6px 25px rgba(200, 157, 42, 0.5)'
          }}>
            <Sparkles size={16} />
            المساعد الذكي
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
            color: 'white',
            width: '55px',
            height: '55px',
            borderRadius: '0 50% 50% 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 25px rgba(11, 31, 58, 0.5)',
            animation: 'glow 2s infinite'
          }}>
            <Bot size={26} />
          </div>
        </div>
      )}

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          width: '380px',
          maxWidth: 'calc(100vw - 40px)',
          height: '550px',
          maxHeight: 'calc(100vh - 100px)',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 15px 50px rgba(0,0,0,0.3)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.3s ease'
        }}>
          <style>{`
            @keyframes slideUp {
              from { transform: translateY(100px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>

          <div style={{
            background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
            color: 'white',
            padding: '15px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #C89D2A, #d4af37)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={22} color="#0B1F3A" />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700' }}>المساعد الذكي</h4>
                <span style={{ fontSize: '0.75rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%' }}></span>
                  متاح الآن
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
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

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: '#f8f9fa'
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-start' : 'flex-end',
                  gap: '8px'
                }}
              >
                {msg.role === 'assistant' && (
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    <Bot size={16} />
                  </div>
                )}
                <div style={{
                  maxWidth: '75%',
                  padding: '12px 15px',
                  borderRadius: msg.role === 'user' ? '15px 15px 5px 15px' : '15px 15px 15px 5px',
                  background: msg.role === 'user' 
                    ? msg.isPdf ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #C89D2A, #d4af37)' 
                    : 'white',
                  color: msg.role === 'user' ? (msg.isPdf ? 'white' : '#0B1F3A') : '#333',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  lineHeight: '1.6',
                  fontSize: '0.9rem',
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: msg.isPdf ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #C89D2A, #d4af37)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: msg.isPdf ? 'white' : '#0B1F3A',
                    flexShrink: 0
                  }}>
                    {msg.isPdf ? <FileText size={16} /> : <User size={16} />}
                  </div>
                )}
              </div>
            ))}
            {(isLoading || uploadingPdf) && (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <Bot size={16} />
                </div>
                <div style={{
                  padding: '12px 20px',
                  borderRadius: '15px 15px 15px 5px',
                  background: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    {uploadingPdf ? (
                      <>
                        <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                        <span style={{ fontSize: '0.85rem', color: '#666' }}>جاري تحليل التقرير...</span>
                      </>
                    ) : (
                      <>
                        <span style={{ animation: 'bounce 1s infinite', animationDelay: '0s' }}>●</span>
                        <span style={{ animation: 'bounce 1s infinite', animationDelay: '0.2s' }}>●</span>
                        <span style={{ animation: 'bounce 1s infinite', animationDelay: '0.4s' }}>●</span>
                      </>
                    )}
                  </div>
                  <style>{`
                    @keyframes bounce {
                      0%, 60%, 100% { transform: translateY(0); }
                      30% { transform: translateY(-5px); }
                    }
                    @keyframes spin {
                      from { transform: rotate(0deg); }
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{
            padding: '12px 15px',
            borderTop: '1px solid #e8ecf1',
            background: 'white'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '10px'
            }}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePdfUpload}
                accept=".pdf"
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPdf || isLoading}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: 'linear-gradient(135deg, #28a745, #20c997)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: uploadingPdf || isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  opacity: uploadingPdf || isLoading ? 0.6 : 1,
                  fontFamily: 'inherit'
                }}
              >
                <FileText size={16} />
                رفع تقرير PDF
              </button>
            </div>
            <div style={{
              display: 'flex',
              gap: '10px'
            }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب سؤالك أو اطلب حجز موعد..."
                disabled={isLoading || uploadingPdf}
                style={{
                  flex: 1,
                  padding: '12px 15px',
                  border: '2px solid #e8ecf1',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#C89D2A'}
                onBlur={(e) => e.target.style.borderColor = '#e8ecf1'}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || uploadingPdf || !input.trim()}
                style={{
                  background: 'linear-gradient(135deg, #0B1F3A, #1a365d)',
                  color: 'white',
                  border: 'none',
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  cursor: isLoading || uploadingPdf || !input.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isLoading || uploadingPdf || !input.trim() ? 0.5 : 1,
                  transition: 'all 0.3s'
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AIChatBot
