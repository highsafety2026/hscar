import { useState } from 'react';

export default function CustomerSuggestion() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !message.trim()) {
      setError('يرجى إدخال الاسم والاقتراح.');
      return;
    }
    const res = await fetch('/api/suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message })
    });
    if (res.ok) {
      setSent(true);
      setName('');
      setMessage('');
    } else {
      setError('حدث خطأ أثناء الإرسال');
    }
  };

  if (sent) return <div style={{color:'#34A853',fontWeight:'bold',margin:'20px 0'}}>تم إرسال اقتراحك بنجاح! شكراً لمشاركتك.</div>;

  return (
    <form onSubmit={handleSubmit} style={{background:'#fff',padding:24,borderRadius:12,boxShadow:'0 2px 8px #0001',maxWidth:400,margin:'30px auto'}}>
      <h3 style={{marginBottom:16}}>اقترح ميزة أو أرسل ملاحظة</h3>
      <input type="text" placeholder="اسمك" value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',marginBottom:12,padding:10,borderRadius:8,border:'1px solid #ccc'}} />
      <textarea placeholder="اكتب اقتراحك أو ملاحظتك هنا..." value={message} onChange={e=>setMessage(e.target.value)} rows={4} style={{width:'100%',marginBottom:12,padding:10,borderRadius:8,border:'1px solid #ccc'}} />
      {error && <div style={{color:'red',marginBottom:8}}>{error}</div>}
      <button type="submit" style={{background:'#0B1F3A',color:'#fff',padding:'10px 24px',border:'none',borderRadius:8,fontWeight:'bold',cursor:'pointer'}}>إرسال</button>
    </form>
  );
}
