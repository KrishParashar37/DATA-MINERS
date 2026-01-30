import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthProvider';
import Login from './Login';
import Explore from './Explore';
import HeritageList from './HeritageList';
import HeritageDetail from './HeritageDetail';
import TicketBooking from './TicketBooking';
import Subscription from './Subscription';
import Donate from './Donate';
import UNESCOSearch from './UNESCOSearch';
import UserProfile from './UserProfile';
import VisitPlanner from './VisitPlanner';
import './App.css';

// Protected Route Component - redirects to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route Component - redirects to explore if already authenticated
const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/explore" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        } />
        <Route path="/heritages" element={
          <ProtectedRoute>
            <HeritageList />
          </ProtectedRoute>
        } />
        <Route path="/heritage/:id" element={
          <ProtectedRoute>
            <HeritageDetail />
          </ProtectedRoute>
        } />
        <Route path="/book-ticket/:id" element={
          <ProtectedRoute>
            <TicketBooking />
          </ProtectedRoute>
        } />
        <Route path="/subscription" element={
          <ProtectedRoute>
            <Subscription />
          </ProtectedRoute>
        } />
        <Route path="/donate" element={
          <ProtectedRoute>
            <Donate />
          </ProtectedRoute>
        } />
        <Route path="/unesco-search" element={
          <ProtectedRoute>
            <UNESCOSearch />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
        <Route path="/visit-planner" element={
          <ProtectedRoute>
            <VisitPlanner />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;

