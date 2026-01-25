import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';

const Explore = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', margin: 0, overflow: 'hidden', background: '#0f0f0f' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem 2rem', position: 'relative', height: '100%' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', background: 'linear-gradient(to right, #fff, #aaa)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              Indiverse<br />Heritage
            </h1>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto 1.5rem auto', color: '#a0a0a0', fontSize: '1rem', lineHeight: '1.5', textAlign: 'center' }}>
            <p>
              Preserving the echo of the past for the future.
              Immerse yourself in a digital exploration of the world's greatest monuments
              and traditions. Experience history like never before, from the comfort of your screen.
            </p>
          </div>

          <div style={{ width: '100%', flex: '2', minHeight: '350px', marginBottom: '1rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333', position: 'relative', boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)', background: '#000' }}>
            <video
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              controls
              autoPlay
              muted
              loop
              poster="https://placehold.co/800x400?text=Heritage+Video+Preview"
            >
              <source src="/heritage-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div style={{ paddingTop: '0.5rem', flexShrink: 0 }}>
            <button
              style={{
                width: '100%',
                padding: '1.5rem',
                background: '#f0a500',
                color: '#000',
                fontSize: '1.5rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                letterSpacing: '5px',
                transition: 'transform 0.2s, letterSpacing 0.2s',
              }}
              onClick={() => navigate('/heritages')}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.letterSpacing = '8px';
                e.target.style.boxShadow = '0 10px 30px rgba(240, 165, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.letterSpacing = '5px';
                e.target.style.boxShadow = 'none';
              }}
            >
              EXPLORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
