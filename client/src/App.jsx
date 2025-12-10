import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import InstallButton from './components/InstallButton'
import UpdatePrompt from './components/UpdatePrompt'
import AIChatBot from './components/AIChatBot'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import ReportLookup from './pages/ReportLookup'
import CarValuation from './pages/CarValuation'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/report" element={<ReportLookup />} />
            <Route path="/valuation" element={<CarValuation />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <InstallButton />
        <AIChatBot />
        <UpdatePrompt />
      </div>
    </BrowserRouter>
  )
}

export default App
