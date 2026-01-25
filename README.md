# Heritage React + Firebase Auth

This app provides a React login page with Firebase Authentication (Email/Password + Google) and persists a user profile document in Firestore. It protects the `/app` route and redirects unauthenticated users to `/login`.

## Prerequisites
- Node.js 18+ and npm
- A Firebase project with Authentication and Firestore enabled

## Firebase setup
1. In Firebase Console, create a Web App and copy the SDK config.
2. Enable Authentication providers: Email/Password and Google.
3. Create Firestore database (Start in production or test mode).
4. Copy `.env.local.sample` to `.env.local` and paste your values.

## Install & run
```bash
npm install
npm run dev
```
Open the printed local URL (default http://localhost:5173).

## Project structure
- `src/components/AuthProvider.jsx`: Initializes Firebase, exposes auth actions, upserts user profile.
- `src/components/ProtectedRoute.jsx`: Guards protected pages.
- `src/pages/Login.jsx`: Login/Signup UI with Google and password reset.
- `src/pages/Protected.jsx`: Example protected screen loading `users/{uid}` document.

## Notes
- Environment variables must be prefixed with `VITE_` to be available in the client.
- Existing static files under `public/` are unused by Vite; you can move assets there if needed.
