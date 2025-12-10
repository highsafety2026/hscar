# الأمان العالي الدولي للفحص الفني للسيارات
High Safety International Technical Car Inspection Center

## Overview
A full-stack Progressive Web App (PWA) for a car inspection center that provides:
- Appointment booking with 4 service types
- PDF report downloads with simple code-based lookup
- AI-powered smart assistant with PDF analysis and booking
- Admin dashboard for management
- PWA - installable on mobile devices as native app
- APK download button for Android app

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **AI**: OpenAI GPT-4o-mini (via Replit AI Integrations)
- **Database**: JSON file-based storage (easily upgradeable to SQLite/PostgreSQL)
- **File Storage**: Local uploads folder

## Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Header, Footer, AIChatBot, ApkDownloadButton
│   │   ├── pages/         # All page components
│   │   └── styles/        # CSS styles
│   ├── public/downloads/  # APK files for download
│   └── vite.config.js
├── server/
│   ├── index.js           # Express server
│   └── database.json      # JSON database
├── uploads/               # Uploaded files (PDFs, images)
└── package.json
```

## Pages
1. **Home** - Introduction and features
2. **Services** - 4 inspection types with bilingual details (Arabic/English)
3. **Booking** - Appointment booking form
4. **Report Lookup** - Download PDF with simple code (no OTP)
5. **Admin Login** - Admin authentication
6. **Admin Dashboard** - Manage reports, bookings

## AI Smart Assistant Features
- Visible floating button with "المساعد الذكي" label
- 24/7 customer support in Arabic
- **PDF Upload & Analysis**: Upload car inspection reports to get:
  - Vehicle information extraction
  - Defects summary
  - UAE market price estimation based on condition
- **AI Booking**: Book appointments through conversation with:
  - Multi-turn conversation support
  - Automatic conflict detection (prevents double-booking)
  - Saves to database with source='ai_assistant'

## API Endpoints
- `POST /api/bookings` - Create booking (with conflict check)
- `POST /api/bookings/check-availability` - Check if time slot is available
- `GET /api/bookings` - Get all bookings
- `PATCH /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking
- `POST /api/reports` - Upload report PDF (with auto-generated code)
- `GET /api/reports` - Get all reports
- `DELETE /api/reports/:id` - Delete report
- `POST /api/reports/find-by-code` - Find report by code (simple lookup)
- `POST /api/admin/login` - Admin login
- `POST /api/chat` - AI chat with conversation history
- `POST /api/chat/analyze-pdf` - AI PDF analysis

## Admin Credentials
- Username: admin
- Password: safa

## Contact Info
- WhatsApp: +971 54 220 6000
- Email: highsafety2021@gmail.com

## PWA Features
- `manifest.json` - App configuration for installation
- `sw.js` - Service worker for offline functionality
- Install prompt component for mobile users
- Works offline after first visit

## Running the Project
- Development: `npm run dev` (runs both frontend and backend)
- Frontend only: `npm run client`
- Backend only: `npm run server`

## UAE Car Prices Database
Built-in reference prices for 20+ car brands (2015-2024) including:
- Land Cruiser, Patrol, Camry, Accord, Altima
- Lexus, BMW, Mercedes, Audi, Porsche
- Range Rover, GMC, Chevrolet, Ford
- KIA, Hyundai, Mitsubishi, Mazda, Infiniti, Volkswagen
