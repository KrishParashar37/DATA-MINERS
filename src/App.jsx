import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './components/AuthProvider.jsx';
import Login from './pages/Login.jsx';
import Protected from './pages/Protected.jsx';
import Welcome from './pages/Welcome.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import ConfigError from './pages/ConfigError.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  const { user, loading, error } = useAuth();

  if (error) return <ConfigError />;
  if (loading) return <div className="center">Loading…</div>;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route
        path="/welcome"
        element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Protected />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to={user ? '/welcome' : '/login'} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
