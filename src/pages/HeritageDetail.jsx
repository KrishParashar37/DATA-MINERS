import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { heritages } from '../data.js';
import Map360View from '../components/Map360View.jsx';

const HeritageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = heritages.find((h) => h.id === parseInt(id));

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  if (!item) return <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#000', color: '#f5f5f5' }}>Heritage Not Found</div>;

  const slides = [
    { type: 'image', src: item.image },
    { type: 'image', src: 'https://placehold.co/800x400?text=Detail+View+1' },
    { type: 'video', src: 'placeholder-video' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#000', color: '#f5f5f5' }}>
      {/* Hero Carousel */}
      <div
        style={{
          width: '100%',
          height: '50vh',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={nextSlide}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              width: '100%',
              height: '100%',
              display: index === currentSlide ? 'block' : 'none',
              animation: 'fadeIn 0.5s',
            }}
          >
            {slide.type === 'image' ? (
              <img src={slide.src} alt="Slide" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#a0a0a0' }}>
                ▶ Video Preview (Placeholder)
              </div>
            )}
          </div>
        ))}

        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '1rem',
            zIndex: 10,
          }}
        >
          {slides.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: idx === currentSlide ? '#f0a500' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(idx);
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h1 style={{ fontSize: '3rem', color: '#f0a500', marginBottom: '0.5rem' }}>{item.name}</h1>
        <div style={{ display: 'flex', gap: '2rem', color: '#a0a0a0', fontSize: '1.1rem', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
          <span>📍 {item.location}</span>
          <span>⏳ {item.era}</span>
          <span>🏷️ {item.category}</span>
        </div>

        <div style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '3rem', color: '#ddd' }}>
          <p>{item.description}</p>
          <p>
            Experience the grandeur of {item.name}. This digital recreation allows you to explore every
            nook and cranny of this historical masterpiece. Our platform provides high-fidelity
            reconstructions and educational narratives to preserve this legacy.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
          <button
            style={{
              flex: 1,
              padding: '1.2rem',
              fontSize: '1.1rem',
              fontWeight: '700',
              border: '1px solid #ffd700',
              borderRadius: '8px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'transform 0.2s, filter 0.2s',
              background: '#333',
              color: '#ffd700',
            }}
            onClick={() => setShowPremiumModal(true)}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.filter = 'brightness(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.filter = 'brightness(1)';
            }}
          >
            🔒 360° View (Premium)
          </button>
          <button
            style={{
              flex: 1,
              padding: '1.2rem',
              fontSize: '1.1rem',
              fontWeight: '700',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'transform 0.2s, filter 0.2s',
              background: '#f0a500',
              color: '#000',
            }}
            onClick={() => navigate(`/book-ticket/${item.id}`)}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.filter = 'brightness(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.filter = 'brightness(1)';
            }}
          >
            Book Tickets 🎟️
          </button>
        </div>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowPremiumModal(false)}
        >
          <div
            style={{
              background: '#1a1a1a',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #ffd700',
              textAlign: 'center',
              maxWidth: '800px',
              width: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2>360° Virtual Tour (Demo)</h2>
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
                onClick={() => setShowPremiumModal(false)}
              >
                ×
              </button>
            </div>

            <div style={{ borderRadius: '8px', overflow: 'hidden', border: '2px solid #ffd700' }}>
              <Map360View coordinates={item.coordinates} />
            </div>

            <p style={{ marginTop: '1rem', color: '#aaa', fontSize: '0.9rem' }}>
              Explore the surroundings with our immersive street view technology. <br />
              <span style={{ color: '#ffd700' }}>Note: Requires valid Google Maps API Key to load correctly.</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeritageDetail;
