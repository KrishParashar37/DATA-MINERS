import React, { useState } from 'react';
import Donate from './Donate';
import Subscription from './Subscription';

function App() {
  const [currentPage, setCurrentPage] = useState('donate');

  return (
    <div>
      {/* Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(135deg, #3d5a5c 0%, #2c4547 100%)',
        padding: '15px 30px',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          color: '#d4975f',
          margin: 0,
          fontSize: '20px',
          fontWeight: 'bold',
          marginRight: 'auto'
        }}>Viraasat</h2>

        <button
          onClick={() => setCurrentPage('donate')}
          style={{
            padding: '10px 24px',
            background: currentPage === 'donate' ? '#d4975f' : 'transparent',
            color: currentPage === 'donate' ? '#2c2c2c' : 'white',
            border: currentPage === 'donate' ? 'none' : '2px solid rgba(255,255,255,0.3)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.3s ease'
          }}
        >
          Donate
        </button>

        <button
          onClick={() => setCurrentPage('subscription')}
          style={{
            padding: '10px 24px',
            background: currentPage === 'subscription' ? '#d4975f' : 'transparent',
            color: currentPage === 'subscription' ? '#2c2c2c' : 'white',
            border: currentPage === 'subscription' ? 'none' : '2px solid rgba(255,255,255,0.3)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.3s ease'
          }}
        >
          Membership
        </button>
      </nav>

      {/* Page Content with top padding for fixed nav */}
      <div style={{ paddingTop: '70px' }}>
        {currentPage === 'donate' ? <Donate /> : <Subscription />}
      </div>
    </div>
  );
}

export default App;
