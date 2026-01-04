import { useState, useEffect, useRef } from 'react';

export default function AdminChatPanel({ bookingId, employeeName = 'محمد' }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle | accepted | busy
  const intervalRef = useRef();

  useEffect(() => {
    fetch(`/api/chats/${bookingId}`)
      .then(res => res.json())
      .then(data => setMessages(data?.messages || []));
    intervalRef.current = setInterval(() => {
      fetch(`/api/chats/${bookingId}`)
        .then(res => res.json())
        .then(data => setMessages(data?.messages || []));
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [bookingId]);

  const sendMessage = async (msg) => {
    setMessages([...messages, { sender: 'admin', message: msg, time: new Date().toISOString() }]);
    await fetch(`/api/chats/${bookingId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender: 'admin', message: msg })
    });
  };

  const handleAccept = () => {
    setStatus('accepted');
    sendMessage(`مرحباً! معك الموظف ${employeeName} من مركز الأمان. كيف يمكنني مساعدتك؟`);
  };

  const handleBusy = () => {
    setStatus('busy');
    sendMessage('الخدمة مشغولة مؤقتًا يرجى الانتظار من 5 إلى 10 دقائق.');
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div style={{ border: '2px solid #0B1F3A', borderRadius: 10, padding: 18, maxWidth: 400, background: '#f9fafb' }}>
      <div style={{ minHeight: 120, maxHeight: 220, overflowY: 'auto', marginBottom: 10, background: '#fff', borderRadius: 8, padding: 8, boxShadow: '0 2px 8px #e0e7ef33' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === 'admin' ? 'left' : 'right', margin: '6px 0' }}>
            <span style={{ background: msg.sender === 'admin' ? '#e3f2fd' : '#c8e6c9', borderRadius: 7, padding: '6px 12px', display: 'inline-block', fontSize: 15 }}>{msg.message}</span>
            <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{new Date(msg.time).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        ))}
      </div>
      {status === 'idle' && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <button onClick={handleAccept} style={{ background: '#0B1F3A', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>الرد الآن</button>
          <button onClick={handleBusy} style={{ background: '#ff9800', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>ليس الآن</button>
        </div>
      )}
      {status === 'accepted' && (
        <div style={{ display: 'flex', gap: 6 }}>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="اكتب ردك..." style={{ flex: 1, borderRadius: 6, border: '1px solid #ccc', padding: '8px' }} />
          <button onClick={handleSend} style={{ background: '#0B1F3A', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 14px', fontWeight: 600, cursor: 'pointer' }}>إرسال</button>
        </div>
      )}
      {status === 'busy' && (
        <div style={{ color: '#ff9800', fontWeight: 600, textAlign: 'center', marginTop: 8 }}>تم إخطار العميل بالانتظار</div>
      )}
    </div>
  );
}
