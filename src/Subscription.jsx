import React from 'react';
import './Subscription.css';

const Subscription = () => {
    return (
        <div className="subscription-wrapper">
            <div className="subscription-container">
                <div className="header">
                    <p className="subtitle">JOIN THE MOVEMENT</p>
                    <h1 className="title">Preserve Our Legacy</h1>
                    <p className="description">
                        Your support directly funds the preservation, documentation, and digital<br />
                        archival of India's irreplaceable cultural heritage.
                    </p>
                    <div className="divider"></div>
                </div>

                <div className="pricing-cards">
                    {/* Heritage Friend Card (Freemium) */}
                    <div className="card">
                        <div className="icon-box">
                            <svg
                                className="icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </div>
                        <h2 className="card-title">Heritage Friend</h2>
                        <div className="price">
                            <span className="currency">₹</span>
                            <span className="amount">0</span>
                            <span className="period">/year</span>
                        </div>
                        <ul className="features">
                            <li>Access to basic heritage sites</li>
                            <li>Basic cultural timelines</li>
                            <li>Community newsletter</li>
                        </ul>
                        <button className="btn btn-outline">Start Exploring Free</button>
                    </div>

                    {/* Heritage Patron Card (Premium Membership) */}
                    <div className="card card-popular">
                        <span className="badge">Most Popular</span>
                        <div className="icon-box icon-box-dark">
                            <svg
                                className="icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                        </div>
                        <h2 className="card-title">Heritage Patron</h2>
                        <div className="price price-highlight">
                            <span className="currency">₹</span>
                            <span className="amount">499</span>
                            <span className="period">/year</span>
                        </div>
                        <ul className="features">
                            <li>Unlimited Premium 360° Virtual Tours</li>
                            <li>Expert-guided audio narrations</li>
                            <li>Exclusive deep-dive cultural stories</li>
                            <li>Digital Certificate of Support</li>
                            <li>Early access to new content</li>
                        </ul>
                        <button className="btn btn-primary">Become a Patron</button>
                    </div>
                </div>

                <div className="footer">
                    <div className="supporters">
                        <svg
                            className="supporters-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span className="supporters-count">12,500+</span>
                        <span className="supporters-text">heritage supporters worldwide</span>
                    </div>
                    <p className="donation-link">
                        Prefer a one-time contribution?
                        <a href="#"> Adopt a Heritage (Donate) <span className="arrow">→</span></a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
