# Campus Complaint Management System — Frontend

React + Vite frontend for the Campus Complaint Management System.

## Tech Stack
- **React 18** with hooks
- **Vite** build tool
- **React Router v6** for client-side routing
- **Axios** for HTTP requests
- **JWT** auth stored in localStorage

## Roles
| Role | Capabilities |
|------|-------------|
| **STUDENT** | Register, Login, Submit complaints, View own complaints, Delete own complaints |
| **MAINTENANCE** | Login, View all complaints, Update complaint status (Pending / In Progress / Resolved) |

## Local Development

```bash
# Install dependencies
npm install

# Copy env example and set your backend URL
cp .env.example .env.local
# Edit .env.local and set VITE_API_URL=http://localhost:8080

# Start dev server
npm run dev
```

## Deployment on Render

### Static Site (Render)

| Setting | Value |
|---------|-------|
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |
| **Environment Variable** | `VITE_API_URL` = your backend Render URL |

> The `public/_redirects` file handles React Router client-side routing on Render.

## Project Structure

```
src/
├── api/
│   └── apiService.js       # Axios instance + all API calls
├── components/
│   ├── Navbar.jsx           # Top navigation bar
│   └── PrivateRoute.jsx     # Route guard
├── context/
│   └── AuthContext.jsx      # Auth state + localStorage persistence
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   └── NewComplaintPage.jsx
├── App.jsx                  # Router + layout
├── config.js                # API base URL from env var
└── index.css                # Global styles
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `https://my-backend.onrender.com` |
