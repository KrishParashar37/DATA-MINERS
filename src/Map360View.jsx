import React from 'react';

const containerStyle = {
    width: '100%',
    height: '400px',
    border: 'none'
};

const Map360View = ({ coordinates }) => {
    // Default to Taj Mahal if no coords provided
    const center = coordinates || { lat: 27.1751, lng: 78.0421 };

    // Constructing a Street View Embed URL (Unofficial/Demo friendly)
    // Note: This relies on Google's embed structure.
    const embedUrl = `https://maps.google.com/maps?layer=c&cbll=${center.lat},${center.lng}&cbp=12,0,0,0,0&output=svembed`;

    return (
        <iframe
            src={embedUrl}
            style={containerStyle}
            title="360 View"
            allowFullScreen
            loading="lazy"
        ></iframe>
    );
};

export default Map360View;
