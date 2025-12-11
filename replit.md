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
3. **Booking** - Clean appointment form (payment section removed)
4. **Report Lookup** - Download PDF + view inspection images gallery
5. **Admin Login** - Admin authentication
6. **Admin Dashboard** - Upload reports with PDF + images (up to 10)

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

## Recent Changes (December 2024)
- Added bilingual support (Arabic/English) with language toggle
- Redesigned entire website with Dubizzle-inspired modern style
- Added stats bar with animated counters
- Created service cards with prices and features
- Added image upload support for reports (up to 10 images)
- Implemented image gallery with click-to-enlarge in report lookup
- Added floating social media buttons (WhatsApp, Facebook, TikTok)
- Removed payment section from booking page
- Removed WhatsApp/phone from location section
- Updated location to Sharjah Industrial Area 13
