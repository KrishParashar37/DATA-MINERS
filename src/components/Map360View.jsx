import React from 'react';

const Map360View = ({ coordinates }) => {
  const center = coordinates || { lat: 27.1751, lng: 78.0421 };
  const embedUrl = `https://maps.google.com/maps?layer=c&cbll=${center.lat},${center.lng}&cbp=12,0,0,0,0&output=svembed`;

  return (
    <iframe
      src={embedUrl}
      style={{
        width: '100%',
        height: '400px',
        border: 'none',
        borderRadius: '8px',
      }}
      title="360 View"
      allowFullScreen
      loading="lazy"
    ></iframe>
  );
};

export default Map360View;
