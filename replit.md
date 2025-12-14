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

## Design System (Professional Neon Theme)
### Colors - World-Class Car Inspection Center
- **Primary Dark**: #0a0a1a (Deep space black)
- **Neon Cyan**: #00D4FF (Main accent - header, buttons)
- **Neon Blue**: #0066FF (Gradients)
- **Neon Gold**: #FFD700 (Badges, highlights)
- **Neon Green**: #00FF88 (Success states)
- **Header**: Neon Light Blue gradient (#00D4FF → #00A8CC → #0095B6)
- **Footer**: Dark gradient with neon border
- **Buttons**: Neon cyan to blue gradient with glow effects
- **Scrollbar**: Neon themed

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

## Trilingual System (Arabic, English, Russian)
- Professional language switcher dropdown in header with Globe icon
- Shows flag emoji + language name for current selection
- Dropdown menu with all 3 languages and checkmark for active
- Translations stored in `client/src/i18n/translations.js`
- Language context provider in `client/src/i18n/LanguageContext.jsx`
- LANGUAGES array: Arabic (🇦🇪), English (🇬🇧), Russian (🇷🇺)
- Supported pages: All pages (Home, Services, Booking, Report, Payment, etc.)
- Language preference saved to localStorage
- RTL/LTR direction automatically applied based on language

## Booking System
- Real-time calendar with date/time slot selection
- 3-step booking wizard: Date → Time → Car Details
- Friday disabled (UAE weekend), past dates blocked
- Double-booking prevention via server-side validation
- Time slots: 09:00 - 17:00 (30-minute intervals)
- QR code generation for booking links
- PostgreSQL appointment_slots table with availability tracking

## Recent Changes (December 2024)
- **3D Car Category Selection on Booking Page** - Interactive Three.js 3D car models for car category selection
  - 5 unique 3D car models: Sedan, SUV, Classic, Luxury, VIP
  - Each car styled with appropriate colors (Blue, Green, Orange, Purple, Gold)
  - Auto-rotating animation that speeds up on hover/selection
  - Proper WebGL cleanup to prevent memory leaks
  - Graceful SVG fallback for browsers without WebGL support
  - Component: `client/src/components/Car3DViewer.jsx`
- **3D Car Model with Full Rotation** - Replaced static image with interactive Three.js 3D car model
  - 360° horizontal rotation with OrbitControls
  - Near-180° vertical tilt (0.05π to 0.95π) to view chassis underneath
  - Visible underside components: chassis plate, axles, exhaust pipes, brake discs
  - Auto-rotate toggle, zoom, and pan controls
  - Proper WebGL cleanup (animation frame cancellation, geometry/material disposal)
  - Graceful fallback for unsupported browsers
- **Removed download button** from smart report page per user request


- **MAJOR REDESIGN: Realistic 3D Interactive Inspection Report - v3.0**
  - **Realistic 3D Car Model**: Complete sedan with proper geometry (body, hood, trunk, windows, wheels, headlights, taillights, bumpers, mirrors)
  - **360° Rotation**: Full OrbitControls with smooth damping, zoom, and pan controls
  - **Auto-Rotate Toggle**: Button to enable/disable automatic car rotation
  - **Professional Design**: Restored original color scheme (Blue #0B1F3A, White, Gold #C89D2A, Gray, Red accents)
  - **Defects Below Viewer**: Professional card layout showing all inspection issues below the 3D model
  - **Interactive Defect Markers**: Glowing spheres on the 3D model that are clickable
  - **Detailed Modal**: Shows defect type, severity, description, recommendations, and estimated cost
  - **Data-driven Architecture**: JSON-based defect system (`/data/defects.json`) for easy management
  - **3 Demo Defects**: Front Bumper Damage, Tire Issues, Lighting System Problem
  - **Upload Functionality**: Ready for future AI integration with visual feedback
  - **Demo Version Badge**: Clearly indicates prototype status
  - **Car Info Display**: Shows Brand, Model, Year in hero section
  - **Bilingual Interface**: Full Arabic/English support with RTL
  - **Responsive Design**: Optimized for desktop, tablet, and mobile
  - **WebGL Fallback**: Graceful error handling for unsupported browsers
  - **Separate CSS**: Organized styles in `interactive-report.css`
- Redesigned booking to tasjeel.com-style with clickable service selection cards (4-step wizard)
- Service selection is now step 0 with beautiful cards showing icon, title, features, and price
- Year input converted to dropdown (1990-2025) - no manual typing needed
- Added video background to hero section
- Implemented real-time calendar booking system with time slots
