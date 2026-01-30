import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { heritages } from './data';
import Map360View from './Map360View';
import { db, storage } from './firebase';
import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from './AuthProvider';
import './HeritageDetail.css';
import deleteIcon from './assets/images/delete-icon.svg';

const HeritageDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const item = heritages.find(h => h.id === parseInt(id));

    // Simple Carousel State (Trigger HMR Update)
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    
    // Review States
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loadingReviews, setLoadingReviews] = useState(true);

    if (!item) return <div className="detail-page">Heritage Not Found</div>;

    // Use item images if available, otherwise fallback to single image
    const itemImages = item.images || [item.image];

    // Create slides from images
    const slides = itemImages.map(img => ({ type: 'image', src: img }));

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // 3 seconds per slide
        return () => clearInterval(interval);
    }, [slides.length]);

    // Fetch reviews from Firestore with real-time listener
    useEffect(() => {
        const q = query(
            collection(db, 'reviews'),
            where('heritageId', '==', parseInt(id))
        );

        // Set up real-time listener
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                const reviewsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })).sort((a, b) => {
                    // Sort by timestamp descending
                    const timeA = a.timestamp?.toDate?.() || new Date(0);
                    const timeB = b.timestamp?.toDate?.() || new Date(0);
                    return timeB - timeA;
                });
                setReviews(reviewsData);
                setLoadingReviews(false);
            } catch (error) {
                console.error('Error processing reviews:', error);
                setLoadingReviews(false);
            }
        }, (error) => {
            console.error('Error listening to reviews:', error);
            setLoadingReviews(false);
        });

        return () => unsubscribe();
    }, [id]);

    const handleShareSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            alert('Please login to submit a review');
            navigate('/login');
            return;
        }

        if (!reviewText.trim()) {
            alert('Please write a review');
            return;
        }

        setUploading(true);

        try {
            let imageUrl = null;
            let videoUrl = null;

            // Upload image if provided
            if (imageFile) {
                const imageRef = ref(storage, `reviews/${Date.now()}_${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
            }

            // Upload video if provided
            if (videoFile) {
                const videoRef = ref(storage, `reviews/${Date.now()}_${videoFile.name}`);
                await uploadBytes(videoRef, videoFile);
                videoUrl = await getDownloadURL(videoRef);
            }

            // Save review to Firestore
            const reviewData = {
                heritageId: parseInt(id),
                heritageName: item.name,
                userId: user.uid,
                userName: user.displayName || user.email || 'Anonymous',
                userEmail: user.email,
                text: reviewText,
                rating: rating,
                timestamp: serverTimestamp(),
                imageUrl: imageUrl,
                videoUrl: videoUrl
            };

            await addDoc(collection(db, 'reviews'), reviewData);

            // Add to local state immediately
            setReviews([{ ...reviewData, id: Date.now(), timestamp: new Date() }, ...reviews]);

            // Reset form
            setReviewText('');
            setRating(5);
            setImageFile(null);
            setVideoFile(null);
            setShowShareModal(false);
            
            alert('Thank you for your review!');
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    };

    const handleDeleteReview = async (reviewId, userId) => {
        if (!user) {
            alert('Please login to delete reviews');
            return;
        }

        if (user.uid !== userId) {
            alert('You can only delete your own reviews');
            return;
        }

        if (!window.confirm('Are you sure you want to delete this review?')) {
            return;
        }

        try {
            await deleteDoc(doc(db, 'reviews', reviewId));
            setReviews(reviews.filter(review => review.id !== reviewId));
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Failed to delete review. Please try again.');
        }
    };

    return (
        <div>
            <div className="detail-page">
                {/* Back Button */}
                <button className="btn-back" onClick={() => navigate(-1)}>
                    ← Back
                </button>

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
                    <span>Location: {item.location}</span>
                    <span>Era: {item.era}</span>
                    <span>Category: {item.category}</span>
                </div>

                <div className="detail-desc">
                    <p>{item.description}</p>
                    <p>
                        Experience the grandeur of {item.name}. This digital recreation allows you to explore every
                        nook and cranny of this piece of history.
                    </p>
                </div>

                <div className="action-buttons">
                    <button
                        className="btn-action btn-visit-planner"
                        onClick={() => {
                            if (!user) {
                                alert('Please login to access Visit Planner');
                                navigate('/login');
                            } else {
                                const siteMap = {
                                    1: 'taj-mahal',
                                    2: 'qutub-minar',
                                    3: 'red-fort',
                                    4: 'ajanta-caves',
                                    5: 'ellora-caves',
                                    6: 'konark-temple',
                                    7: 'khajuraho',
                                    8: 'hampi',
                                    9: 'kaziranga',
                                    10: 'sanchi-stupa'
                                };
                                const siteKey = siteMap[item.id];
                                if (siteKey) {
                                    navigate(`/visit-planner?site=${siteKey}`);
                                }
                            }
                        }}
                        title="Premium Feature - Visit Planner"
                    >
                        Plan Visit
                    </button>
                    <button
                        className="btn-action btn-premium btn-small"
                        onClick={() => setShowPremiumModal(true)}
                    >
                        360° View
                    </button>
                    <button
                        className="btn-action btn-book"
                        onClick={() => navigate(`/book-ticket/${item.id}`)}
                    >
                        Book Tickets
                    </button>
                </div>

                {/* Share Button (Full Width below others) */}
                <button
                    className="btn-action btn-share"
                    onClick={() => setShowShareModal(true)}
                    style={{ marginTop: '1rem', width: '100%' }}
                >
                    Share Your Thoughts
                </button>
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

            {/* Share Thoughts Modal */}
            {showShareModal && (
                <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
                    <div className="premium-modal share-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Share Your Experience</h2>
                            <button className="modal-close-small" onClick={() => setShowShareModal(false)}>×</button>
                        </div>
                        <form className="share-form" onSubmit={handleShareSubmit}>
                            {/* Star Rating */}
                            <div className="rating-container">
                                <label>Rating:</label>
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <textarea
                                className="share-input textarea"
                                placeholder="Write your thoughts about this monument..."
                                rows="4"
                                required
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            ></textarea>

                            <div className="file-inputs">
                                <div className="file-group">
                                    <label>Add Image</label>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => setImageFile(e.target.files[0])}
                                    />
                                    {imageFile && <span className="file-name">{imageFile.name}</span>}
                                </div>
                                <div className="file-group">
                                    <label>Add Video</label>
                                    <input 
                                        type="file" 
                                        accept="video/*"
                                        onChange={(e) => setVideoFile(e.target.files[0])}
                                    />
                                    {videoFile && <span className="file-name">{videoFile.name}</span>}
                                </div>
                            </div>

                            <button type="submit" className="btn-submit-share" disabled={uploading}>
                                {uploading ? 'Uploading...' : 'Submit Review'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>

        {/* Reviews Section - Below the main layout */}
        <div className="reviews-section">
                <div className="reviews-header">
                    <h2>Reviews & Ratings</h2>
                    <div className="rating-summary">
                        <span className="avg-rating">{calculateAverageRating()}</span>
                        <div className="stars-display">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} className={`star ${star <= Math.round(calculateAverageRating()) ? 'active' : ''}`}>★</span>
                            ))}
                        </div>
                        <span className="review-count">({reviews.length} reviews)</span>
                    </div>
                </div>

                {loadingReviews ? (
                    <p className="loading-text">Loading reviews...</p>
                ) : reviews.length === 0 ? (
                    <p className="no-reviews">No reviews yet. Be the first to share your experience!</p>
                ) : (
                    <div className="reviews-list">
                        {reviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    <div className="reviewer-info">
                                        <span className="reviewer-name">{review.userName}</span>
                                        <div className="review-stars">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star} className={`star-small ${star <= review.rating ? 'active' : ''}`}>★</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="review-header-right">
                                        <span className="review-date">
                                            {review.timestamp?.toDate ? review.timestamp.toDate().toLocaleDateString() : new Date().toLocaleDateString()}
                                        </span>
                                        {user && user.uid === review.userId && (
                                            <button 
                                                className="delete-review-btn"
                                                onClick={() => handleDeleteReview(review.id, review.userId)}
                                                title="Delete review"
                                            >
                                                <img src={deleteIcon} alt="Delete" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <p className="review-text">{review.text}</p>
                                {review.imageUrl && (
                                    <img src={review.imageUrl} alt="Review" className="review-media" />
                                )}
                                {review.videoUrl && (
                                    <video src={review.videoUrl} controls className="review-media"></video>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeritageDetail;
