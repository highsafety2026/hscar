import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/images/logo.png" alt="High Safety Logo" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
          <h1>الأمان العالي الدولي</h1>
        </Link>
        <nav className="nav">
          <Link to="/">الرئيسية</Link>
          <Link to="/services">الخدمات</Link>
          <Link to="/booking">حجز موعد</Link>
          <Link to="/report">تحميل التقرير</Link>
          <Link to="/valuation">تقييم السيارة</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
