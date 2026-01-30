import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import './Subscription.css';

/*
  Razorpay integration (client-side):
  - This implements a client-initiated Razorpay Checkout for demo/test purposes.
  - PRODUCTION: create an order on your server using Razorpay secret key and pass
    order_id to the Checkout options for secure verification. Do NOT commit
    secret keys to the client.
  - Set your test key in an environment variable named `VITE_RAZORPAY_KEY`.
    Example (local): .env.local -> VITE_RAZORPAY_KEY=rzp_test_xxx
*/

const Subscription = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [busy, setBusy] = useState(false);
    const [status, setStatus] = useState('');

    const loadRazorpayScript = () => {
        return new Promise((resolve, reject) => {
            if (window.Razorpay) return resolve(true);
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error('Razorpay SDK failed to load'));
            document.body.appendChild(script);
        });
    };

    async function openRazorpay(amountINR, planId) {
        if (!user) {
            setStatus('Please sign in before subscribing.');
            navigate('/login');
            return;
        }

        setBusy(true);
        setStatus('Opening payment gateway…');

        try {
            await loadRazorpayScript();
        } catch (err) {
            setStatus('Could not load payment gateway. Try again later.');
            setBusy(false);
            return;
        }

        // Use environment key for test mode. Replace in production and create server-side order.
        const key = import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_XXXXXXXXXXXXXXXX';
        if (key.includes('XXXXXXXXXXXXXXXX')) {
            console.warn('Razorpay test key missing — set VITE_RAZORPAY_KEY in your env for full test.');
        }

        const options = {
            key, // Enter the Test/Live key ID
            amount: amountINR * 100, // amount in paise
            currency: 'INR',
            name: 'Indiverse Heritage',
            description: planId === 'patron' ? 'Heritage Patron — annual' : 'Subscription',
            // NOTE: for production, create an order on the server and pass order_id here
            handler: function (response) {
                // response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature
                setStatus('Payment successful — Thank you!');
                setBusy(false);
                // TODO: record subscription on backend / show subscription confirmation UI
                alert('Payment successful — ID: ' + response.razorpay_payment_id);
            },
            prefill: {
                email: user.email || '',
                contact: user.phoneNumber || ''
            },
            notes: {
                plan: planId,
                user: user.uid || user.email || ''
            },
            theme: {
                color: '#d4975f'
            },
            modal: {
                ondismiss: function () {
                    setStatus('Payment cancelled');
                    setBusy(false);
                }
            }
        };

        try {
            const rzp = new window.Razorpay(options);
            rzp.open();
            setStatus('Waiting for payment...');
        } catch (err) {
            setStatus('Payment failed to start.');
            setBusy(false);
        }
    }

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
                        <button className="btn btn-outline" onClick={() => navigate('/explore')}>Start Exploring Free</button>
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
                        <button
                            className="btn btn-primary"
                            onClick={() => openRazorpay(499, 'patron')}
                            disabled={busy}
                            aria-busy={busy}
                        >
                            {busy ? 'Opening payment…' : 'Become a Patron'}
                        </button>
                        {status && <p className="payment-status">{status}</p>}
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
