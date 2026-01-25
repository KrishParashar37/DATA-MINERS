import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './components/AuthProvider.jsx';
import Login from './pages/Login.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import ConfigError from './pages/ConfigError.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Explore from './pages/Explore.jsx';
import HeritageList from './pages/HeritageList.jsx';
import HeritageDetail from './pages/HeritageDetail.jsx';
import TicketBooking from './pages/TicketBooking.jsx';

export default function App() {
  const { user, loading, error } = useAuth();

  if (error) return <ConfigError />;
  if (loading) return <div className="center">Loading…</div>;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route
        path="/explore"
        element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        }
      />
      <Route
        path="/heritages"
        element={
          <ProtectedRoute>
            <HeritageList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/heritage/:id"
        element={
          <ProtectedRoute>
            <HeritageDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/book-ticket/:id"
        element={
          <ProtectedRoute>
            <TicketBooking />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to={user ? '/explore' : '/login'} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
