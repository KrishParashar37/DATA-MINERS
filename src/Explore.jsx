import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Explore.css';

import logo from './assets/logo.png';
import { heritages } from './data';

const Explore = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heritages.length);
        }, 4000); // Change every 4 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="explore-layout">
            <Navbar />
            <div className="explore-content">
                {/* Background Slider */}
                <div className="hero-background-slider">
                    {heritages.map((item, index) => (
                        <img
                            key={item.id}
                            src={item.image}
                            alt={item.name}
                            className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
                        />
                    ))}
                    {/* Dark Overlay for readability */}
                    <div className="hero-readability-overlay"></div>
                </div>

                {/* Foreground Content */}
                <div className="hero-foreground">
                    <div className="app-branding centered-branding">
                        <img src={logo} alt="Indiverse Heritage Logo" className="app-logo-img" />
                        <h1 className="app-name">Indiverse<br />Heritage</h1>
                    </div>

                    <div className="story-text">
                        <p>
                            Preserving the echo of the past for the future.
                            Immerse yourself in a digital exploration of the world's greatest monuments
                            and traditions. Experience history like never before, from the comfort of your screen.
                        </p>
                    </div>

                    <div className="explore-action">
                        <button className="explore-btn-large" onClick={() => navigate('/heritages')}>
                            EXPLORE
                        </button>
                    </div>

                    {/* Optional: Caption at bottom */}
                    <div className="slide-caption-corner">{heritages[currentIndex].name}</div>
                </div>
            </div>
        </div>
    );
};

export default Explore;
