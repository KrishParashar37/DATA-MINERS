import React from 'react';
import { useAuth } from '../components/AuthProvider.jsx';

const Sidebar = () => {
  const { signOut } = useAuth();

  return (
    <div
      style={{
        width: '250px',
        background: '#151515',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        borderRight: '1px solid #333',
        flexShrink: 0,
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontSize: '1.5rem', color: '#f0a500', fontWeight: 'bold', marginBottom: '3rem', letterSpacing: '1px' }}>
          Indiverse
        </div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', listStyle: 'none', margin: 0, padding: 0 }}>
          <li style={{ fontSize: '1.1rem', color: '#a0a0a0', cursor: 'pointer', transition: 'color 0.3s', padding: '0.5rem 0' }}>
            Home
          </li>
          <li style={{ fontSize: '1.1rem', color: '#a0a0a0', cursor: 'pointer', transition: 'color 0.3s', padding: '0.5rem 0' }}>
            About
          </li>
          <li style={{ fontSize: '1.1rem', color: '#a0a0a0', cursor: 'pointer', transition: 'color 0.3s', padding: '0.5rem 0' }}>
            Donate
          </li>
          <li style={{ fontSize: '1.1rem', color: '#a0a0a0', cursor: 'pointer', transition: 'color 0.3s', padding: '0.5rem 0' }}>
            Subscription
          </li>
        </ul>
      </div>
      <div>
        <button
          onClick={signOut}
          style={{
            background: '#f0a500',
            color: '#000',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            width: '100%',
          }}
        >
          Sign Out
        </button>
        <small style={{ color: '#555', display: 'block', marginTop: '1rem', textAlign: 'center' }}>v1.0.0</small>
      </div>
    </div>
  );
};

export default Sidebar;
