# Car Inspection Website - Context Handoff

## NEW TASK: Create Admin Shell/Terminal Page

### Requirements
- Create a terminal page for admin to execute commands
- Protected by admin authentication
- Located at /admin/shell route

### Current Routes (from App.jsx)
- /admin - AdminLogin
- /admin/dashboard - AdminDashboard
- Need to add /admin/shell - Shell

### Files to Create/Modify
1. Create: client/src/pages/Shell.jsx
2. Modify: client/src/App.jsx - add route
3. Modify: server/index.js - add /api/shell endpoint

### Admin Auth
- Username: admin
- Password: safa
- Uses token-based auth with authMiddleware

### Shell Page Features Needed
- Terminal-style dark UI
- Command input field
- Output display area
- Execute commands via API
- Admin-only access

### Previous Work (All Completed)
- 5% electronic payment discount
- Booking code overflow fix
- Payment badge fix
- Video with sound button
- Services count badge
- Text changes (دولياً, مجانية)

### Server Info
- Backend: port 3001
- Frontend: port 5000
- Workflow: Development Server (running)
