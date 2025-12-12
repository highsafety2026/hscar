# الأمان العالي الدولي للفحص الفني للسيارات
High Safety International Technical Car Inspection Center

## Overview
A full-stack Progressive Web App (PWA) for a car inspection center with a modern Dubizzle-inspired design that provides:
- Bilingual support (Arabic/English) with language toggle button
- Appointment booking with 4 service types
- PDF report downloads with image gallery (up to 10 inspection images)
- AI-powered smart assistant with PDF analysis and booking
- Admin dashboard for management with image uploads
- PWA - installable on mobile devices as native app
- APK download button for Android app
- Floating social media buttons (WhatsApp, Facebook, TikTok)

## Tech Stack
- **Frontend**: React + Vite (Modern Dubizzle-style design)
- **Backend**: Node.js + Express
- **AI**: OpenAI GPT-4o-mini (via Replit AI Integrations)
- **Database**: JSON file-based storage
- **File Storage**: Local uploads folder (PDFs + Images)

## Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Header, Footer, AIChatBot, SocialButtons
│   │   ├── pages/         # Home, Services, Booking, ReportLookup, Admin
│   │   ├── i18n/          # Translations and LanguageContext (Arabic/English)
│   │   └── styles/        # index.css (Modern design system)
│   ├── public/downloads/  # APK files for download
│   └── vite.config.js
├── server/
│   ├── index.js           # Express server with image upload support
│   └── database.json      # JSON database
├── uploads/               # Uploaded files (PDFs + Images)
└── package.json
```

## Design System (Dubizzle-inspired)
### Colors
- Primary: #0B1F3A (Dark blue)
- Secondary: #C89D2A (Gold)
- Accent colors: Blue (#4285F4), Green (#34A853), Red (#EA4335)

### Components
- Hero section with animated badge and stats bar
- Service cards with icons, prices, and features
- Interactive gallery with hover effects
- CTA sections with gradients
- Floating social media buttons

## Pages
1. **Home** - Modern hero, stats, services preview, gallery, location
2. **Services** - 4 detailed service cards with all inspection items
3. **Booking** - 4-step wizard (service → date → time → details) with clickable selections
4. **Report Lookup** - Download PDF + view inspection images gallery
5. **Interactive Report** - NEW 3D interactive car inspection viewer with defect points (demo feature)
6. **Admin Login** - Admin authentication
7. **Admin Dashboard** - Upload reports with PDF + images (up to 10)

## Report System Features
- Upload PDF report with up to 10 inspection images
- Auto-generated unique codes
- Customer image gallery view with click-to-enlarge
- Batch download all images option

## Social Media & Contact
- **WhatsApp**: +971 054 220 6000
- **Facebook**: https://www.facebook.com/share/1WgxRcySN1/
- **TikTok**: https://www.tiktok.com/@highs.afety
- **Email**: highsafety2021@gmail.com

## Location
- الشارقة - المنطقة الصناعية 13 (Sharjah - Industrial Area 13)
- Google Maps integration

## API Endpoints
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings
- `POST /api/reports` - Upload report (PDF + images)
- `GET /api/reports` - Get all reports
- `POST /api/reports/find-by-code` - Find report by code
- `POST /api/chat` - AI chat
- `POST /api/chat/analyze-pdf` - AI PDF analysis

## Admin Credentials
- Username: admin
- Password: safa

## Payment System
- **Gateway**: Stripe (via Replit Integration)
- **Bank**: ADIB (Abu Dhabi Islamic Bank)
- **Currency**: AED (UAE Dirham)
- **Pages**: /payment, /payment/success, /payment/cancel
- **Features**: 
  - Secure checkout via Stripe Checkout
  - Webhook handling for payment confirmation
  - PostgreSQL payment records tracking
  - Email receipts via Stripe

## Running the Project
- Development: `npm run dev` (runs both frontend and backend concurrently)

## Bilingual System
- Language toggle button in header (Globe icon)
- Translations stored in `client/src/i18n/translations.js`
- Language context provider in `client/src/i18n/LanguageContext.jsx`
- Supported pages: Home, Header, Footer, Payment, PaymentSuccess, PaymentCancel
- Language preference saved to localStorage
- RTL/LTR direction automatically applied

## Booking System
- Real-time calendar with date/time slot selection
- 3-step booking wizard: Date → Time → Car Details
- Friday disabled (UAE weekend), past dates blocked
- Double-booking prevention via server-side validation
- Time slots: 09:00 - 17:00 (30-minute intervals)
- QR code generation for booking links
- PostgreSQL appointment_slots table with availability tracking

## Recent Changes (December 2024)
- **ENHANCED: Smart Interactive 3D Inspection Report Viewer - v2.0**
  - Data-driven architecture with JSON-based defect system (`/data/defects.json`)
  - 3 realistic demo defects: Front Bumper Damage, Tire Issues, Lighting System Problem
  - Structured defect data: ID, location, type, severity, short/detailed descriptions, recommendations, cost estimates
  - Upload functionality with success/error feedback (ready for future AI integration)
  - "Demo Version" badge clearly indicates test/prototype status
  - Car info display (Brand, Model, Year)
  - Click interactive defect markers to view detailed modal with severity, cost, recommendations
  - Bilingual interface (Arabic/English) with full RTL support
  - Responsive design for desktop, tablet, mobile
  - Architecture ready for PDF analysis AI integration (/api/analyze-inspection endpoint structure in place)
  - Fallback UI for WebGL environments
- Redesigned booking to tasjeel.com-style with clickable service selection cards (4-step wizard)
- Service selection is now step 0 with beautiful cards showing icon, title, features, and price
- Year input converted to dropdown (1990-2025) - no manual typing needed
- Added video background to hero section
- Implemented real-time calendar booking system with time slots
