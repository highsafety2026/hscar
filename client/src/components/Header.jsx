import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/images/logo.png" alt="High Safety Logo" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
          <h1 style={{ fontSize: '1.1rem' }}>الأمان العالي الدولي</h1>
        </Link>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>الرئيسية</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>الخدمات</Link>
          <Link to="/booking" onClick={() => setMenuOpen(false)}>حجز موعد</Link>
          <Link to="/report" onClick={() => setMenuOpen(false)}>تحميل التقرير</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
