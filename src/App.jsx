import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Explore from './Explore';
import HeritageList from './HeritageList';
import HeritageDetail from './HeritageDetail';
import TicketBooking from './TicketBooking';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/heritages" element={<HeritageList />} />
          <Route path="/heritage/:id" element={<HeritageDetail />} />
          <Route path="/book-ticket/:id" element={<TicketBooking />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
