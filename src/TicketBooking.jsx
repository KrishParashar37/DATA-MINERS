import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { heritages } from './data';
import './TicketBooking.css';

const TicketBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const item = heritages.find(h => h.id === parseInt(id));
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (!item) return <div className="booking-page">Heritage Not Found</div>;

    if (submitted) {
        return (
            <div className="booking-page">
                <div className="booking-card success-message">
                    <div className="success-icon">✓</div>
                    <div className="success-text">Ticket booking request submitted!</div>
                    <p style={{ marginBottom: '2rem', color: '#888' }}>(This is a demo)</p>
                    <button className="btn-home" onClick={() => navigate('/explore')}>
                        Back to Explore
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-page">
            <div className="booking-card">
                <h1 className="booking-title">Book Tickets for {item.name}</h1>

                <form className="booking-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-input" required placeholder="John Doe" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-input" required placeholder="john@example.com" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Date of Visit</label>
                        <input type="date" className="form-input" required />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Number of Tickets</label>
                        <input type="number" min="1" max="10" className="form-input" required defaultValue="1" />
                    </div>

                    <button type="submit" className="btn-submit">Confirm Booking</button>
                </form>
            </div>
        </div>
    );
};

export default TicketBooking;

