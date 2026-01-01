import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import SocialButtons from './components/SocialButtons'
import UpdatePrompt from './components/UpdatePrompt'
import AIChatBot from './components/AIChatBot'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import ReportLookup from './pages/ReportLookup'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Shell from './pages/Shell'
import Payment from './pages/Payment'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentCancel from './pages/PaymentCancel'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Rewards from './pages/Rewards'
import { useEffect } from 'react'
import notificationService from './services/notificationService'

function App() {
  useEffect(() => {
    // Initialize push notifications on app start
    notificationService.initialize();
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/report" element={<ReportLookup />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/cancel" element={<PaymentCancel />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/shell" element={<Shell />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/rewards" element={<Rewards />} />
              </Routes>
            </main>
            <Footer />
            <SocialButtons />
            <AIChatBot />
            <UpdatePrompt />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App
