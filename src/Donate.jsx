import React, { useState } from 'react';
import './Donate.css';
import tajMahal from './assets/images/tajmahal1.jpeg';
import hampi from './assets/images/Humpi.jpg.jpeg';
import ajantaCaves from './assets/images/AjantaCaves1.jpeg';

const Donate = () => {
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState('');
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptData, setReceiptData] = useState(null);
    const [showCSRModal, setShowCSRModal] = useState(false);
    const [csrFormData, setCSrFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        partnershipType: 'annual',
        message: ''
    });
    const [showAdoptModal, setShowAdoptModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const donationAmounts = [500, 1000, 2500, 5000];

    const heritageProjects = [
        {
            name: 'Taj Mahal Restoration',
            location: 'Agra, Uttar Pradesh',
            urgency: 'High Priority',
            raised: '₹12,45,000',
            goal: '₹25,00,000',
            progress: 50,
            image: tajMahal
        },
        {
            name: 'Hampi Temple Conservation',
            location: 'Karnataka',
            urgency: 'Medium Priority',
            raised: '₹8,20,000',
            goal: '₹15,00,000',
            progress: 55,
            image: hampi
        },
        {
            name: 'Ajanta Caves Documentation',
            location: 'Maharashtra',
            urgency: 'Ongoing',
            raised: '₹18,90,000',
            goal: '₹20,00,000',
            progress: 95,
            image: ajantaCaves
        }
    ];

    const generateReceipt = () => {
        const amount = selectedAmount || parseInt(customAmount);

        if (!amount || amount <= 0) {
            alert('Please select or enter a valid donation amount');
            return;
        }

        const receipt = {
            receiptNo: 'VIR' + Date.now().toString().slice(-8),
            date: new Date().toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }),
            time: new Date().toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            amount: amount,
            donorName: 'Heritage Supporter',
            transactionId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            paymentMethod: 'Demo Payment',
            purpose: 'Heritage Preservation'
        };

        setReceiptData(receipt);
        setShowReceipt(true);
    };

    const downloadReceipt = () => {
        const receiptContent = `
═══════════════════════════════════════
        VIRAASAT - HERITAGE FOUNDATION
           DONATION RECEIPT
═══════════════════════════════════════

Receipt No: ${receiptData.receiptNo}
Date: ${receiptData.date} ${receiptData.time}

───────────────────────────────────────
DONOR DETAILS
───────────────────────────────────────
Name: ${receiptData.donorName}

───────────────────────────────────────
DONATION DETAILS
───────────────────────────────────────
Amount: ₹${receiptData.amount.toLocaleString('en-IN')}
Purpose: ${receiptData.purpose}
Payment Method: ${receiptData.paymentMethod}
Transaction ID: ${receiptData.transactionId}

───────────────────────────────────────
TAX BENEFITS
───────────────────────────────────────
This donation is eligible for tax 
deduction under Section 80G of the 
Income Tax Act, 1961.

───────────────────────────────────────

Thank you for preserving India's 
irreplaceable cultural heritage!

═══════════════════════════════════════
        `;

        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Viraasat_Receipt_${receiptData.receiptNo}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="donate-wrapper">
            <div className="donate-container">
                {/* Hero Section */}
                <div className="donate-header">
                    <p className="donate-subtitle">SUPPORT HERITAGE</p>
                    <h1 className="donate-title">Adopt a Heritage</h1>
                    <p className="donate-description">
                        Your contribution directly funds the preservation, restoration, and digital<br />
                        archival of India's irreplaceable cultural treasures.
                    </p>
                    <div className="divider"></div>
                </div>

                {/* Donation Amount Selection */}
                <div className="donation-section">
                    <h2 className="section-title">Choose Your Contribution</h2>
                    <p className="section-subtitle">Every contribution makes a difference in preserving our legacy</p>

                    <div className="amount-grid">
                        {donationAmounts.map((amount) => (
                            <button
                                key={amount}
                                className={`amount-card ${selectedAmount === amount ? 'selected' : ''}`}
                                onClick={() => {
                                    setSelectedAmount(amount);
                                    setCustomAmount('');
                                }}
                            >
                                <span className="amount-value">₹{amount.toLocaleString()}</span>
                                <span className="amount-label">One-time</span>
                            </button>
                        ))}
                    </div>

                    <div className="custom-amount">
                        <label htmlFor="custom">Or enter custom amount:</label>
                        <div className="custom-input-wrapper">
                            <span className="currency-symbol">₹</span>
                            <input
                                type="number"
                                id="custom"
                                placeholder="Enter amount"
                                value={customAmount}
                                onChange={(e) => {
                                    setCustomAmount(e.target.value);
                                    setSelectedAmount(null);
                                }}
                            />
                        </div>
                    </div>

                    <button className="donate-btn" onClick={generateReceipt}>
                        Contribute Now
                    </button>
                </div>

                {/* Adopt a Heritage Projects */}
                <div className="projects-section">
                    <h2 className="section-title">Active Heritage Projects</h2>
                    <p className="section-subtitle">Choose a specific project to support</p>

                    <div className="projects-grid">
                        {heritageProjects.map((project, index) => (
                            <div key={index} className="project-card">
                                <div className="project-image-container">
                                    <img src={project.image} alt={project.name} className="project-image" />
                                </div>
                                <div className="project-content">
                                    <div className="project-header">
                                        <h3 className="project-name">{project.name}</h3>
                                        <span className={`urgency-badge ${project.urgency.toLowerCase().replace(' ', '-')}`}>
                                            {project.urgency}
                                        </span>
                                    </div>
                                    <p className="project-location">📍 {project.location}</p>

                                    <div className="progress-section">
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
                                        </div>
                                        <div className="progress-stats">
                                            <span className="raised">{project.raised} raised</span>
                                            <span className="goal">of {project.goal}</span>
                                        </div>
                                    </div>


                                    <button
                                        className="adopt-btn"
                                        onClick={() => {
                                            setSelectedProject(project);
                                            setShowAdoptModal(true);
                                        }}
                                    >
                                        Adopt This Heritage
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Impact Section */}
                <div className="impact-section">
                    <h2 className="section-title">Your Impact</h2>
                    <div className="impact-grid">
                        <div className="impact-card">
                            <div className="impact-icon">🏛️</div>
                            <h3 className="impact-number">127</h3>
                            <p className="impact-label">Sites Preserved</p>
                        </div>
                        <div className="impact-card">
                            <div className="impact-icon">📚</div>
                            <h3 className="impact-number">50,000+</h3>
                            <p className="impact-label">Artifacts Documented</p>
                        </div>
                        <div className="impact-card">
                            <div className="impact-icon">🌍</div>
                            <h3 className="impact-number">2.5M+</h3>
                            <p className="impact-label">Global Visitors</p>
                        </div>
                        <div className="impact-card">
                            <div className="impact-icon">💰</div>
                            <h3 className="impact-number">₹4.2Cr</h3>
                            <p className="impact-label">Funds Raised</p>
                        </div>
                    </div>
                </div>

                {/* Corporate Sponsorship */}
                <div className="corporate-section">
                    <div className="corporate-content">
                        <h2 className="corporate-title">Corporate & CSR Partnerships</h2>
                        <p className="corporate-description">
                            Partner with us to fulfill your Corporate Social Responsibility goals while preserving India's cultural heritage.
                        </p>
                        <button className="corporate-btn" onClick={() => setShowCSRModal(true)}>Explore CSR Opportunities</button>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="trust-section">
                    <p className="trust-text">
                        🔒 Secure Payment • 💯 100% Transparent • 📜 Tax Benefits under 80G
                    </p>
                </div>
            </div>

            {/* Receipt Modal */}
            {showReceipt && receiptData && (
                <div className="receipt-overlay" onClick={() => setShowReceipt(false)}>
                    <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setShowReceipt(false)}>✕</button>

                        <div className="receipt-header">
                            <h2>🏛️ VIRAASAT</h2>
                            <p>Heritage Foundation</p>
                        </div>

                        <div className="receipt-divider"></div>

                        <h3 className="receipt-title">DONATION RECEIPT</h3>

                        <div className="receipt-info">
                            <div className="receipt-row">
                                <span className="label">Receipt No:</span>
                                <span className="value">{receiptData.receiptNo}</span>
                            </div>
                            <div className="receipt-row">
                                <span className="label">Date & Time:</span>
                                <span className="value">{receiptData.date}, {receiptData.time}</span>
                            </div>
                            <div className="receipt-row">
                                <span className="label">Transaction ID:</span>
                                <span className="value">{receiptData.transactionId}</span>
                            </div>
                        </div>

                        <div className="receipt-divider"></div>

                        <div className="receipt-amount-section">
                            <p className="amount-label">Donation Amount</p>
                            <p className="amount-display">₹{receiptData.amount.toLocaleString('en-IN')}</p>
                        </div>

                        <div className="receipt-divider"></div>

                        <div className="receipt-info">
                            <div className="receipt-row">
                                <span className="label">Donor Name:</span>
                                <span className="value">{receiptData.donorName}</span>
                            </div>
                            <div className="receipt-row">
                                <span className="label">Purpose:</span>
                                <span className="value">{receiptData.purpose}</span>
                            </div>
                            <div className="receipt-row">
                                <span className="label">Payment Method:</span>
                                <span className="value">{receiptData.paymentMethod}</span>
                            </div>
                        </div>

                        <div className="tax-notice">
                            <p>✓ This donation is eligible for tax deduction under Section 80G</p>
                        </div>

                        <div className="receipt-actions">
                            <button className="download-btn" onClick={downloadReceipt}>
                                📥 Download Receipt
                            </button>
                            <button className="close-receipt-btn" onClick={() => setShowReceipt(false)}>
                                Close
                            </button>
                        </div>

                        <div className="receipt-footer">
                            <p>Thank you for preserving India's irreplaceable cultural heritage!</p>
                        </div>
                    </div>
                </div>
            )}

            {/* CSR Partnership Modal */}
            {showCSRModal && (
                <div className="receipt-overlay" onClick={() => setShowCSRModal(false)}>
                    <div className="csr-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setShowCSRModal(false)}>✕</button>

                        <div className="csr-header">
                            <h2>🤝 CSR Partnership</h2>
                            <p>Join us in preserving India's cultural heritage</p>
                        </div>

                        <div className="receipt-divider"></div>

                        <form className="csr-form" onSubmit={(e) => {
                            e.preventDefault();
                            alert(`Thank you ${csrFormData.companyName}! Our team will contact you within 24-48 hours to discuss partnership opportunities.`);
                            setShowCSRModal(false);
                            setCSrFormData({
                                companyName: '',
                                contactPerson: '',
                                email: '',
                                phone: '',
                                partnershipType: 'annual',
                                message: ''
                            });
                        }}>
                            <div className="form-group">
                                <label htmlFor="companyName">Company Name *</label>
                                <input
                                    type="text"
                                    id="companyName"
                                    required
                                    value={csrFormData.companyName}
                                    onChange={(e) => setCSrFormData({ ...csrFormData, companyName: e.target.value })}
                                    placeholder="Enter your company name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contactPerson">Contact Person *</label>
                                <input
                                    type="text"
                                    id="contactPerson"
                                    required
                                    value={csrFormData.contactPerson}
                                    onChange={(e) => setCSrFormData({ ...csrFormData, contactPerson: e.target.value })}
                                    placeholder="Full name"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={csrFormData.email}
                                        onChange={(e) => setCSrFormData({ ...csrFormData, email: e.target.value })}
                                        placeholder="company@example.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        required
                                        value={csrFormData.phone}
                                        onChange={(e) => setCSrFormData({ ...csrFormData, phone: e.target.value })}
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="partnershipType">Partnership Type *</label>
                                <select
                                    id="partnershipType"
                                    value={csrFormData.partnershipType}
                                    onChange={(e) => setCSrFormData({ ...csrFormData, partnershipType: e.target.value })}
                                >
                                    <option value="annual">Annual CSR Partnership</option>
                                    <option value="project">Project-Based Sponsorship</option>
                                    <option value="adoption">Heritage Adoption Program</option>
                                    <option value="educational">Educational Licensing</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message (Optional)</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    value={csrFormData.message}
                                    onChange={(e) => setCSrFormData({ ...csrFormData, message: e.target.value })}
                                    placeholder="Tell us about your CSR goals and interests..."
                                ></textarea>
                            </div>

                            <div className="csr-benefits">
                                <h4>Partnership Benefits:</h4>
                                <ul>
                                    <li>✓ Tax benefits under Section 80G</li>
                                    <li>✓ Brand visibility on heritage sites</li>
                                    <li>✓ CSR compliance documentation</li>
                                    <li>✓ Quarterly impact reports</li>
                                </ul>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="submit-csr-btn">
                                    Submit Partnership Request
                                </button>
                                <button type="button" className="cancel-btn" onClick={() => setShowCSRModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Adopt Heritage Modal */}
            {showAdoptModal && selectedProject && (
                <div className="receipt-overlay" onClick={() => setShowAdoptModal(false)}>
                    <div className="adopt-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setShowAdoptModal(false)}>✕</button>

                        <div className="adopt-header">
                            <div className="project-icon-large">{selectedProject.image}</div>
                            <h2>{selectedProject.name}</h2>
                            <p className="project-location">📍 {selectedProject.location}</p>
                            <span className={`urgency-badge ${selectedProject.urgency.toLowerCase().replace(' ', '-')}`}>
                                {selectedProject.urgency}
                            </span>
                        </div>

                        <div className="receipt-divider"></div>

                        <div className="adopt-progress">
                            <h3>Current Progress</h3>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${selectedProject.progress}%` }}></div>
                            </div>
                            <div className="progress-stats">
                                <span className="raised">{selectedProject.raised} raised</span>
                                <span className="goal">of {selectedProject.goal}</span>
                            </div>
                            <p className="progress-percentage">{selectedProject.progress}% Complete</p>
                        </div>

                        <div className="receipt-divider"></div>

                        <div className="adoption-tiers">
                            <h3>Choose Your Support Level</h3>
                            <div className="tier-grid">
                                <div className="tier-card">
                                    <h4>🌱 Supporter</h4>
                                    <p className="tier-amount">₹1,000</p>
                                    <ul className="tier-benefits">
                                        <li>Digital certificate</li>
                                        <li>Project updates</li>
                                        <li>Name in supporters list</li>
                                    </ul>
                                    <button className="tier-btn" onClick={() => {
                                        alert(`Thank you for adopting ${selectedProject.name} as a Supporter! Redirecting to payment...`);
                                        setShowAdoptModal(false);
                                    }}>
                                        Adopt as Supporter
                                    </button>
                                </div>

                                <div className="tier-card tier-featured">
                                    <div className="tier-badge">Popular</div>
                                    <h4>🏆 Patron</h4>
                                    <p className="tier-amount">₹5,000</p>
                                    <ul className="tier-benefits">
                                        <li>All Supporter benefits</li>
                                        <li>Name on heritage plaque</li>
                                        <li>Exclusive site visit</li>
                                        <li>Quarterly impact reports</li>
                                    </ul>
                                    <button className="tier-btn tier-btn-featured" onClick={() => {
                                        alert(`Thank you for adopting ${selectedProject.name} as a Patron! Redirecting to payment...`);
                                        setShowAdoptModal(false);
                                    }}>
                                        Adopt as Patron
                                    </button>
                                </div>

                                <div className="tier-card">
                                    <h4>👑 Guardian</h4>
                                    <p className="tier-amount">₹25,000</p>
                                    <ul className="tier-benefits">
                                        <li>All Patron benefits</li>
                                        <li>Permanent recognition</li>
                                        <li>VIP heritage tours</li>
                                        <li>Direct project involvement</li>
                                    </ul>
                                    <button className="tier-btn" onClick={() => {
                                        alert(`Thank you for adopting ${selectedProject.name} as a Guardian! Redirecting to payment...`);
                                        setShowAdoptModal(false);
                                    }}>
                                        Adopt as Guardian
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="adopt-info">
                            <p>💡 Your contribution directly supports the preservation, restoration, and documentation of this heritage site.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Donate;
