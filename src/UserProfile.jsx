import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './UserProfile.css';

const UserProfile = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [bookings, setBookings] = useState([]);
    const [donations, setDonations] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchUserData();
    }, [user]);

    const fetchUserData = async () => {
        try {
            setLoading(true);

            // Fetch user's reviews
            const reviewsQuery = query(collection(db, 'reviews'), where('userId', '==', user.uid));
            const reviewsSnapshot = await getDocs(reviewsQuery);
            const reviewsData = reviewsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setReviews(reviewsData);

            // Fetch favorites from localStorage
            const savedFavorites = localStorage.getItem('favoriteSites');
            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            }

            // Mock booking data - in real app would fetch from Firestore
            const mockBookings = [
                {
                    id: 1,
                    site: 'Taj Mahal',
                    date: '2026-02-15',
                    tickets: 2,
                    amount: 100,
                    status: 'Confirmed'
                },
                {
                    id: 2,
                    site: 'Qutub Minar',
                    date: '2026-03-20',
                    tickets: 1,
                    amount: 35,
                    status: 'Pending'
                }
            ];
            setBookings(mockBookings);

            // Mock donation data - in real app would fetch from Firestore
            const mockDonations = [
                {
                    id: 1,
                    project: 'Taj Mahal Restoration',
                    amount: 500,
                    date: '2026-01-10',
                    status: 'Completed'
                },
                {
                    id: 2,
                    project: 'Ajanta Caves Conservation',
                    amount: 1000,
                    date: '2026-01-20',
                    status: 'Completed'
                }
            ];
            setDonations(mockDonations);

            // Mock subscription data
            setSubscription({
                type: 'Premium',
                status: 'Active',
                startDate: '2026-01-01',
                endDate: '2026-12-31',
                price: 999
            });

            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    const handleCancelBooking = (bookingId) => {
        setBookings(bookings.map(b =>
            b.id === bookingId ? { ...b, status: 'Cancelled' } : b
        ));
    };

    const handleRenewSubscription = () => {
        alert('Redirecting to subscription page...');
        navigate('/subscription');
    };

    if (loading) {
        return (
            <div className="profile-page">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            {/* Header */}
            <div className="profile-header">
                <div className="profile-card">
                    <div className="profile-avatar">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="Profile" />
                        ) : (
                            <div className="avatar-placeholder">
                                {user?.displayName?.[0] || user?.email?.[0] || 'U'}
                            </div>
                        )}
                    </div>
                    <div className="profile-info">
                        <h1>{user?.displayName || 'Heritage Explorer'}</h1>
                        <p className="email">{user?.email || user?.phoneNumber}</p>
                        <p className="member-since">Member since January 2026</p>
                    </div>
                    <button className="btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                {/* Stats */}
                <div className="profile-stats">
                    <div className="stat-card">
                        <span className="stat-number">{reviews.length}</span>
                        <span className="stat-label">Reviews</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{bookings.length}</span>
                        <span className="stat-label">Bookings</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{donations.length}</span>
                        <span className="stat-label">Donations</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{favorites.length}</span>
                        <span className="stat-label">Favorites</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="profile-tabs">
                <button
                    className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button
                    className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    Bookings
                </button>
                <button
                    className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
                    onClick={() => setActiveTab('favorites')}
                >
                    Favorites
                </button>
                <button
                    className={`tab-button ${activeTab === 'donations' ? 'active' : ''}`}
                    onClick={() => setActiveTab('donations')}
                >
                    Donations
                </button>
                <button
                    className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Reviews
                </button>
                <button
                    className={`tab-button ${activeTab === 'subscription' ? 'active' : ''}`}
                    onClick={() => setActiveTab('subscription')}
                >
                    Subscription
                </button>
            </div>

            {/* Content */}
            <div className="profile-content">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="tab-content">
                        <h2>Welcome Back!</h2>
                        <p>Your complete heritage journey management dashboard</p>
                        
                        <div className="overview-grid">
                            <div className="overview-section">
                                <h3>Recent Bookings</h3>
                                {bookings.length > 0 ? (
                                    <ul className="simple-list">
                                        {bookings.slice(0, 2).map(booking => (
                                            <li key={booking.id}>
                                                <span>{booking.site}</span>
                                                <span className={`status ${booking.status.toLowerCase()}`}>
                                                    {booking.status}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="empty-state">No bookings yet</p>
                                )}
                            </div>

                            <div className="overview-section">
                                <h3>Recent Donations</h3>
                                {donations.length > 0 ? (
                                    <ul className="simple-list">
                                        {donations.slice(0, 2).map(donation => (
                                            <li key={donation.id}>
                                                <span>{donation.project}</span>
                                                <span className="amount">₹{donation.amount.toLocaleString()}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="empty-state">No donations yet</p>
                                )}
                            </div>

                            <div className="overview-section">
                                <h3>Subscription</h3>
                                {subscription ? (
                                    <div className="subscription-info">
                                        <p><strong>{subscription.type} Plan</strong></p>
                                        <p>Status: <span className="active">{subscription.status}</span></p>
                                        <p>Valid until: {subscription.endDate}</p>
                                    </div>
                                ) : (
                                    <p className="empty-state">No active subscription</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                    <div className="tab-content">
                        <h2>Booking History</h2>
                        {bookings.length > 0 ? (
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Heritage Site</th>
                                            <th>Date</th>
                                            <th>Tickets</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map(booking => (
                                            <tr key={booking.id}>
                                                <td>{booking.site}</td>
                                                <td>{new Date(booking.date).toLocaleDateString()}</td>
                                                <td>{booking.tickets}</td>
                                                <td>₹{booking.amount}</td>
                                                <td>
                                                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    {booking.status === 'Confirmed' && (
                                                        <button
                                                            className="btn-small btn-cancel"
                                                            onClick={() => handleCancelBooking(booking.id)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="empty-state-large">
                                <p>No bookings yet</p>
                                <button className="btn-primary" onClick={() => navigate('/heritages')}>
                                    Book a Visit
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Favorites Tab */}
                {activeTab === 'favorites' && (
                    <div className="tab-content">
                        <h2>Saved Favorites ({favorites.length})</h2>
                        {favorites.length > 0 ? (
                            <div className="favorites-grid">
                                {favorites.map(favId => (
                                    <div key={favId} className="favorite-card">
                                        <div className="favorite-placeholder">
                                            <p>Site #{favId}</p>
                                        </div>
                                        <button className="btn-small btn-view">View</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state-large">
                                <p>No favorite sites yet</p>
                                <button className="btn-primary" onClick={() => navigate('/unesco-search')}>
                                    Explore UNESCO Sites
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Donations Tab */}
                {activeTab === 'donations' && (
                    <div className="tab-content">
                        <h2>Donation History</h2>
                        {donations.length > 0 ? (
                            <>
                                <div className="donation-summary">
                                    <div className="donation-stat">
                                        <span className="label">Total Donated</span>
                                        <span className="amount">₹{donations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}</span>
                                    </div>
                                    <div className="donation-stat">
                                        <span className="label">Number of Donations</span>
                                        <span className="amount">{donations.length}</span>
                                    </div>
                                </div>

                                <div className="donations-list">
                                    {donations.map(donation => (
                                        <div key={donation.id} className="donation-item">
                                            <div className="donation-details">
                                                <h3>{donation.project}</h3>
                                                <p className="date">Date: {new Date(donation.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="donation-amount">₹{donation.amount.toLocaleString()}</div>
                                            <span className={`status-badge ${donation.status.toLowerCase()}`}>
                                                {donation.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="empty-state-large">
                                <p>No donations yet</p>
                                <button className="btn-primary" onClick={() => navigate('/donate')}>
                                    Make a Donation
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                    <div className="tab-content">
                        <h2>Your Reviews ({reviews.length})</h2>
                        {reviews.length > 0 ? (
                            <div className="reviews-list">
                                {reviews.map(review => (
                                    <div key={review.id} className="review-item">
                                        <div className="review-header">
                                            <h3>{review.heritageName}</h3>
                                            <div className="stars">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span key={star} className={`star ${star <= review.rating ? 'active' : ''}`}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="review-text">{review.text}</p>
                                        <p className="review-date">
                                            {review.timestamp?.toDate ? review.timestamp.toDate().toLocaleDateString() : new Date().toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state-large">
                                <p>No reviews yet</p>
                                <button className="btn-primary" onClick={() => navigate('/heritages')}>
                                    Visit a Heritage Site
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Subscription Tab */}
                {activeTab === 'subscription' && (
                    <div className="tab-content">
                        <h2>Subscription Management</h2>
                        {subscription ? (
                            <div className="subscription-card">
                                <div className="subscription-details">
                                    <h3>{subscription.type} Plan</h3>
                                    <div className="detail-row">
                                        <span>Status</span>
                                        <span className={`badge ${subscription.status.toLowerCase()}`}>
                                            {subscription.status}
                                        </span>
                                    </div>
                                    <div className="detail-row">
                                        <span>Start Date</span>
                                        <span>{subscription.startDate}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span>End Date</span>
                                        <span>{subscription.endDate}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span>Annual Price</span>
                                        <span>₹{subscription.price.toLocaleString()}</span>
                                    </div>
                                </div>
                                <button className="btn-primary" onClick={handleRenewSubscription}>
                                    Renew Subscription
                                </button>
                            </div>
                        ) : (
                            <div className="empty-state-large">
                                <p>No active subscription</p>
                                <button className="btn-primary" onClick={handleRenewSubscription}>
                                    Choose a Plan
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
