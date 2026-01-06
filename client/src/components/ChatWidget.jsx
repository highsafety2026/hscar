import { useState, useEffect, useRef } from 'react';

export default function ChatWidget({ bookingId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle | waiting | accepted | busy
  const [customerName, setCustomerName] = useState('');
  const [nameEntered, setNameEntered] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    if (!nameEntered) return;
    fetch(`/api/chats/${bookingId}`)
      .then(res => res.json())
      .then(data => setMessages(data?.messages || []));
    intervalRef.current = setInterval(() => {
      fetch(`/api/chats/${bookingId}`)
        .then(res => res.json())
        .then(data => setMessages(data?.messages || []));
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [bookingId, nameEntered]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'customer', message: input, time: new Date().toISOString(), name: customerName }]);
    setInput('');
    setStatus('waiting');
    await fetch(`/api/chats/${bookingId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender: 'customer', message: input, name: customerName })
    });
  };

  useEffect(() => {
    // Check for admin reply
    if (messages.length > 0) {
      const last = messages[messages.length - 1];
      if (last.sender === 'admin') {
        if (last.message.includes('معا حضرتك')) setStatus('accepted');
        if (last.message.includes('الخدمة مشغولة')) setStatus('busy');
      }
    }
  }, [messages]);

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, maxWidth: 350 }}>
      {!nameEntered ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ fontWeight: 600, color: '#0B1F3A', marginBottom: 4 }}>ادخل اسمك لبدء الدردشة مع أحد الموظفين</label>
          <input
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            placeholder="اسمك بالكامل"
            style={{ padding: '10px', borderRadius: 6, border: '1px solid #ccc', fontSize: 15 }}
          />
          <button
            onClick={() => customerName.trim() && setNameEntered(true)}
            style={{ background: '#0B1F3A', color: '#fff', border: 'none', borderRadius: 6, padding: '10px', fontWeight: 600, cursor: 'pointer', fontSize: 15 }}
          >
            بدء الدردشة
          </button>
        </div>
      ) : (
        <>
          <div style={{ minHeight: 120, maxHeight: 200, overflowY: 'auto', marginBottom: 8 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ textAlign: msg.sender === 'customer' ? 'right' : 'left', margin: '4px 0' }}>
                <span style={{ background: msg.sender === 'customer' ? '#e0f7fa' : '#f1f8e9', borderRadius: 6, padding: '4px 8px', display: 'inline-block' }}>
                  {msg.name && msg.sender === 'customer' ? <b style={{ color: '#0B1F3A', fontSize: 12 }}>{msg.name}: </b> : null}{msg.message}
                </span>
              </div>
            ))}
          </div>
          {status === 'idle' || status === 'waiting' ? (
            <>
              <input value={input} onChange={e => setInput(e.target.value)} placeholder="اكتب رسالتك..." style={{ width: '80%' }} />
              <button onClick={sendMessage} style={{ width: '18%', marginRight: 4 }}>إرسال</button>
              {status === 'waiting' && <div style={{ color: '#888', fontSize: 12 }}>سوف يرد عليك أحد الموظفين خلال 5 دقائق</div>}
            </>
          ) : status === 'accepted' ? (
            <div style={{ color: 'green', fontWeight: 600 }}>تم بدء المحادثة مع الموظف</div>
          ) : status === 'busy' ? (
            <div style={{ color: 'orange', fontWeight: 600 }}>الخدمة مشغولة مؤقتًا يرجى الانتظار من 5 إلى 10 دقائق</div>
          ) : null}
        </>
      )}
    </div>
  );
}
