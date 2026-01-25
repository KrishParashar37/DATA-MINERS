import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { heritages } from '../data.js';
import { useAuth } from '../components/AuthProvider.jsx';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getApp } from 'firebase/app';

const TicketBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const item = heritages.find((h) => h.id === parseInt(id));
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: user?.email || '', date: '', tickets: '1' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = getFirestore(getApp());
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        heritageId: item.id,
        heritageName: item.name,
        ...formData,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Booking error:', err);
      alert('Error submitting booking. Please try again.');
    }
  };

  if (!item) return <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#0f0f0f', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Heritage Not Found</div>;

  if (submitted) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#0f0f0f', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#f5f5f5' }}>
        <div style={{ background: '#1a1a1a', width: '100%', maxWidth: '500px', padding: '2.5rem', borderRadius: '12px', border: '1px solid #333', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', color: '#4caf50' }}>✓</div>
          <div style={{ fontSize: '1.5rem', color: '#f5f5f5', marginBottom: '2rem' }}>Ticket booking request submitted!</div>
          <p style={{ marginBottom: '2rem', color: '#888' }}>(This is a demo)</p>
          <button
            style={{
              background: 'transparent',
              border: '1px solid #a0a0a0',
              color: '#a0a0a0',
              padding: '0.8rem 2rem',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onClick={() => navigate('/heritages')}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#f0a500';
              e.target.style.color = '#f0a500';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#a0a0a0';
              e.target.style.color = '#a0a0a0';
            }}
          >
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#0f0f0f', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#f5f5f5' }}>
      <div style={{ background: '#1a1a1a', width: '100%', maxWidth: '500px', padding: '2.5rem', borderRadius: '12px', border: '1px solid #333', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)' }}>
        <h1 style={{ fontSize: '2rem', color: '#f0a500', marginBottom: '2rem', textAlign: 'center' }}>Book Tickets for {item.name}</h1>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem' }}>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                padding: '0.8rem',
                borderRadius: '6px',
                border: '1px solid #333',
                background: '#252525',
                color: '#f5f5f5',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#f0a500')}
              onBlur={(e) => (e.target.style.borderColor = '#333')}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem' }}>Email Address</label>
            <input
              type="email"
              placeholder="john@example.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                padding: '0.8rem',
                borderRadius: '6px',
                border: '1px solid #333',
                background: '#252525',
                color: '#f5f5f5',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#f0a500')}
              onBlur={(e) => (e.target.style.borderColor = '#333')}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem' }}>Date of Visit</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              style={{
                padding: '0.8rem',
                borderRadius: '6px',
                border: '1px solid #333',
                background: '#252525',
                color: '#f5f5f5',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#f0a500')}
              onBlur={(e) => (e.target.style.borderColor = '#333')}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem' }}>Number of Tickets</label>
            <input
              type="number"
              min="1"
              max="10"
              required
              value={formData.tickets}
              onChange={(e) => setFormData({ ...formData, tickets: e.target.value })}
              style={{
                padding: '0.8rem',
                borderRadius: '6px',
                border: '1px solid #333',
                background: '#252525',
                color: '#f5f5f5',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#f0a500')}
              onBlur={(e) => (e.target.style.borderColor = '#333')}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: '1rem',
              padding: '1rem',
              background: '#f0a500',
              color: '#000',
              fontWeight: '700',
              fontSize: '1.1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'filter 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.filter = 'brightness(1.1)')}
            onMouseLeave={(e) => (e.target.style.filter = 'brightness(1)')}
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketBooking;
