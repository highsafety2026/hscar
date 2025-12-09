# الأمان العالي الدولي للفحص الفني للسيارات
High Safety International Technical Car Inspection Center

## Overview
A full-stack web application for a car inspection center that provides:
- Appointment booking
- PDF report downloads with OTP verification
- Car valuation service
- Admin dashboard for management

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: JSON file-based storage (easily upgradeable to SQLite/PostgreSQL)
- **File Storage**: Local uploads folder

## Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Header, Footer
│   │   ├── pages/         # All page components
│   │   └── styles/        # CSS styles
│   └── vite.config.js
├── server/
│   ├── index.js           # Express server
│   └── database.json      # JSON database
├── uploads/               # Uploaded files (PDFs, images)
└── package.json
```

## Pages
1. **Home** - Introduction and features
2. **Services** - Inspection types (Full, Mechanical, Misc, Basic)
3. **Booking** - Appointment booking form
4. **Report Lookup** - Download PDF with OTP verification
5. **Car Valuation** - Upload images for car price estimation
6. **Admin Login** - Admin authentication
7. **Admin Dashboard** - Manage reports, bookings, valuations

## API Endpoints
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings
- `PATCH /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking
- `POST /api/reports` - Upload report PDF
- `GET /api/reports` - Get all reports
- `DELETE /api/reports/:id` - Delete report
- `POST /api/reports/check` - Check if report exists
- `POST /api/reports/verify` - Verify OTP and get report
- `POST /api/valuations` - Submit car for valuation
- `GET /api/valuations` - Get all valuations
- `PATCH /api/valuations/:id` - Update valuation
- `DELETE /api/valuations/:id` - Delete valuation
- `POST /api/admin/login` - Admin login

## Admin Credentials
- Username: admin
- Password: admin123

## Contact Info
- WhatsApp: 0542206000
- Email: highsafery2021@gmail.com

## Running the Project
- Development: `npm run dev` (runs both frontend and backend)
- Frontend only: `npm run client`
- Backend only: `npm run server`
