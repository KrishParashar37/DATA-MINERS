import React from 'react';
import { heritages } from '../data.js';
import HeritageCard from '../components/HeritageCard.jsx';

const HeritageList = () => {
  return (
    <div style={{ padding: '2rem', background: '#0f0f0f', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', color: '#f0a500', marginBottom: '2rem', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '2px' }}>
        Explore Cultural Heritage Sites
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {heritages.map((item) => (
          <HeritageCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HeritageList;
