import { Link } from 'react-router-dom'
import { Car } from 'lucide-react'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'white' }}>
          <Car size={40} />
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
