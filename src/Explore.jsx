import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Explore.css';

import logo from './assets/logo.png';

const Explore = () => {
    const navigate = useNavigate();

    return (
        <div className="explore-layout">
            <Sidebar />
            <div className="explore-content">
                <div className="hero-section">
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

                    <div className="hero-video-container">
                        <video
                            className="hero-video"
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
                </div>

                <div className="explore-action">
                    <button className="explore-btn-large" onClick={() => navigate('/heritages')}>
                        EXPLORE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Explore;
