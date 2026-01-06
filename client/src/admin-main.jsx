import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import './styles/index.css'

function AdminApp() {
  return (
    <BrowserRouter>
      <div className="app admin-app">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<AdminLogin />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>
)
