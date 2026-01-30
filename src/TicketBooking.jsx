import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { heritages } from './data';
import { QRCodeSVG } from 'qrcode.react';
import './TicketBooking.css';

const TicketBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const item = heritages.find(h => h.id === parseInt(id));
    const [submitted, setSubmitted] = useState(false);
    const [ticketCount, setTicketCount] = useState(1);
    const [visitDate, setVisitDate] = useState('');
    const [visitorName, setVisitorName] = useState('');
    const [bookingId, setBookingId] = useState('');
    const [email, setEmail] = useState('');
    const TICKET_PRICE = item?.ticketPrice || 50; // Use official price from data

    const handleSubmit = (e) => {
        e.preventDefault();
        const generatedBookingId = `IND-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        setBookingId(generatedBookingId);
        setSubmitted(true);
    };

    if (!item) return <div className="booking-page">Heritage Not Found</div>;

    if (submitted) {
        // Generate QR code data
        const qrData = JSON.stringify({
            bookingId: bookingId,
            heritage: item.name,
            visitor: visitorName,
            email: email,
            date: visitDate,
            tickets: ticketCount,
            total: ticketCount * TICKET_PRICE,
            timestamp: new Date().toISOString()
        });

        console.log('QR Data:', qrData); // Debug log

        return (
            <div className="booking-page">
                <div className="booking-card success-message video-overlay-receipt">
                    <div className="success-icon">✓</div>
                    <div className="success-text">Booking Confirmed!</div>

                    <div className="receipt-container">
                        <div className="receipt-header">OFFICIAL RECEIPT</div>
                        
                        {/* QR Code Section */}
                        <div className="qr-code-section">
                            <QRCodeSVG 
                                value={qrData}
                                size={180}
                                level="H"
                                includeMargin={true}
                            />
                            <p className="qr-text">Scan QR Code for Entry</p>
                        </div>

                        <div className="receipt-row">
                            <span>Heritage:</span>
                            <strong>{item.name}</strong>
                        </div>
                        <div className="receipt-row">
                            <span>Visitor:</span>
                            <strong>{visitorName}</strong>
                        </div>
                        <div className="receipt-row">
                            <span>Email:</span>
                            <strong>{email}</strong>
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
                        <div className="receipt-footer">Booking ID: {bookingId}</div>
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
                        <input 
                            type="email" 
                            className="form-input" 
                            required 
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Date of Visit</label>
                        <input
                            type="date"
                            className="form-input"
                            required
                            min={new Date().toISOString().split('T')[0]}
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

                    <div className="price-summary" style={{ padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--primary)', borderRadius: '4px', marginBottom: '1rem' }}>
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

