import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { heritages } from './data';
import Map360View from './Map360View';
import './HeritageDetail.css';

const HeritageDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const item = heritages.find(h => h.id === parseInt(id));

    // Simple Carousel State (Trigger HMR Update)
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    if (!item) return <div className="detail-page">Heritage Not Found</div>;

    // Placeholder data for carousel (using item image + generic placeholders)
    const slides = [
        { type: 'image', src: item.image },
        { type: 'image', src: 'https://placehold.co/800x400?text=Detail+View+1' },
        { type: 'video', src: 'placeholder-video' },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    return (
        <div className="detail-page">
            {/* Hero Carousel */}
            <div className="carousel-container" onClick={nextSlide}>
                {slides.map((slide, index) => (
                    <div key={index} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
                        {slide.type === 'image' ? (
                            <img src={slide.src} alt="Slide" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div className="carousel-video-placeholder">▶ Video Preview (Placeholder)</div>
                        )}
                    </div>
                ))}

                <div className="carousel-controls">
                    {slides.map((_, idx) => (
                        <div
                            key={idx}
                            className={`control-dot ${idx === currentSlide ? 'active' : ''}`}
                            onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                        />
                    ))}
                </div>
            </div>

            <div className="detail-content">
                <h1 className="detail-title">{item.name}</h1>
                <div className="detail-meta">
                    <span>📍 {item.location}</span>
                    <span>⏳ {item.era}</span>
                    <span>🏷️ {item.category}</span>
                </div>

                <div className="detail-desc">
                    <p>{item.description}</p>
                    <p>
                        Experience the grandeur of {item.name}. This digital recreation allows you to explore every
                        nook and cranny of this historical masterpiece. Our platform provides high-fidelity
                        reconstructions and educational narratives to preserve this legacy.
                    </p>
                </div>

                <div className="action-buttons">
                    <button
                        className="btn-action btn-premium"
                        onClick={() => setShowPremiumModal(true)}
                    >
                        🔒 360° View (Premium)
                    </button>
                    <button
                        className="btn-action btn-book"
                        onClick={() => navigate(`/book-ticket/${item.id}`)}
                    >
                        Book Tickets 🎟️
                    </button>
                </div>
            </div>

            {/* Premium/Demo Modal */}
            {showPremiumModal && (
                <div className="modal-overlay" onClick={() => setShowPremiumModal(false)}>
                    <div className="premium-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', width: '90%' }}>
                        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2>360° Virtual Tour (Demo)</h2>
                            <button className="modal-close-small" onClick={() => setShowPremiumModal(false)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                        </div>

                        <div className="map-container" style={{ borderRadius: '8px', overflow: 'hidden', border: '2px solid #ffd700' }}>
                            {/* Pass coordinates to the map view if available */}
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
