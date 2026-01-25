import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { heritages } from './data';
import './TicketBooking.css';

const TicketBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const item = heritages.find(h => h.id === parseInt(id));
    const [submitted, setSubmitted] = useState(false);
    const [ticketCount, setTicketCount] = useState(1);
    const [visitDate, setVisitDate] = useState('');
    const [visitorName, setVisitorName] = useState('');
    const TICKET_PRICE = 500; // Fixed price for demo

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (!item) return <div className="booking-page">Heritage Not Found</div>;

    if (submitted) {
        return (
            <div className="booking-page">
                <div className="booking-card success-message video-overlay-receipt">
                    <div className="success-icon">✓</div>
                    <div className="success-text">Booking Confirmed!</div>

                    <div className="receipt-container">
                        <div className="receipt-header">OFFICIAL RECEIPT</div>
                        <div className="receipt-row">
                            <span>Heritage:</span>
                            <strong>{item.name}</strong>
                        </div>
                        <div className="receipt-row">
                            <span>Visitor:</span>
                            <strong>{visitorName}</strong>
                        </div>
                        <div className="receipt-row">
                            <span>Date:</span>
                            <strong>{visitDate}</strong>
                        </div>
                        <div className="receipt-row">
                            <span>Tickets:</span>
                            <strong>{ticketCount} x ₹{TICKET_PRICE}</strong>
                        </div>
                        <div className="receipt-divider"></div>
                        <div className="receipt-row total">
                            <span>Total Paid:</span>
                            <strong>₹{ticketCount * TICKET_PRICE}</strong>
                        </div>
                        <div className="receipt-footer">Booking ID: #IND-{Math.floor(Math.random() * 10000)}</div>
                    </div>

                    <p style={{ marginBottom: '2rem', color: '#888', fontStyle: 'italic' }}>(Please save a screenshot of this receipt)</p>
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
                        <input
                            type="text"
                            className="form-input"
                            required
                            placeholder="John Doe"
                            value={visitorName}
                            onChange={(e) => setVisitorName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-input" required placeholder="john@example.com" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Date of Visit</label>
                        <input
                            type="date"
                            className="form-input"
                            required
                            value={visitDate}
                            onChange={(e) => setVisitDate(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Number of Tickets (₹{TICKET_PRICE}/each)</label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            className="form-input"
                            required
                            value={ticketCount}
                            onChange={(e) => setTicketCount(parseInt(e.target.value))}
                        />
                    </div>

                    <div className="price-summary" style={{ padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', border: '1px border var(--primary)', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--cream)', fontWeight: 'bold' }}>
                            <span>Total Payable:</span>
                            <span>₹{ticketCount * TICKET_PRICE}</span>
                        </div>
                    </div>

                    <button type="submit" className="btn-submit">Confirm & Pay</button>
                </form>
            </div>
        </div>
    );
};

export default TicketBooking;

