import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeritageCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="heritage-card"
      onClick={() => navigate(`/heritage/${item.id}`)}
      style={{
        background: '#1a1a1a',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s',
        border: '1px solid #333',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: '100%',
          height: '250px',
          objectFit: 'cover',
          filter: 'grayscale(20%)',
          transition: 'filter 0.3s',
        }}
        onMouseEnter={(e) => (e.target.style.filter = 'grayscale(0%)')}
        onMouseLeave={(e) => (e.target.style.filter = 'grayscale(20%)')}
      />
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', color: '#f5f5f5', marginBottom: '0.5rem' }}>
          {item.name}
        </h3>
        <p style={{ color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          📍 {item.location}
        </p>
        <div
          style={{
            background: 'rgba(240, 165, 0, 0.1)',
            color: '#f0a500',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            display: 'inline-block',
            marginTop: '1rem',
            textTransform: 'uppercase',
            fontWeight: '600',
          }}
        >
          {item.category}
        </div>
      </div>
    </div>
  );
};

export default HeritageCard;
