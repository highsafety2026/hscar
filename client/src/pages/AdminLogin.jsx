import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'

function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem('adminToken', data.token)
        navigate('/admin/dashboard')
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError('حدث خطأ، يرجى المحاولة لاحقاً')
    }
    setLoading(false)
  }

  return (
    <div className="form-page">
      <div className="container">
        <div className="form-container" style={{ maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Lock size={60} color="#1a365d" />
          </div>
          <h2 className="section-title">لوحة التحكم</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>اسم المستخدم</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>كلمة المرور</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'جاري الدخول...' : 'دخول'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
