import React, { useState, useEffect } from 'react';
import './UNESCOSearch.css';

const UNESCOSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sites, setSites] = useState([]);
    const [filteredSites, setFilteredSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favoriteSites');
        return saved ? JSON.parse(saved) : [];
    });

    // Fetch UNESCO sites data
    useEffect(() => {
        fetchUNESCOSites();
    }, []);

    const fetchUNESCOSites = async () => {
        try {
            setLoading(true);
            // Fetch from local JSON file
            const response = await fetch('/unesco-sites.json');
            if (!response.ok) {
                throw new Error('Failed to load UNESCO data');
            }
            const data = await response.json();
            
            if (data.results) {
                setSites(data.results);
                setFilteredSites(data.results);
            }
            setError(null);
        } catch (err) {
            console.error('Error fetching UNESCO sites:', err);
            setError('Could not load UNESCO data. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    };

    // Handle search and filter
    useEffect(() => {
        let results = sites;

        // Filter by search term
        if (searchTerm.trim()) {
            results = results.filter(site =>
                site.name_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                site.states?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by country
        if (selectedCountry) {
            results = results.filter(site =>
                site.states?.toLowerCase().includes(selectedCountry.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory) {
            results = results.filter(site => {
                const categories = site.category?.toLowerCase();
                return categories?.includes(selectedCategory.toLowerCase());
            });
        }

        setFilteredSites(results);
    }, [searchTerm, selectedCountry, selectedCategory, sites]);

    const toggleFavorite = (siteId) => {
        setFavorites(prev => {
            const updated = prev.includes(siteId)
                ? prev.filter(id => id !== siteId)
                : [...prev, siteId];
            localStorage.setItem('favoriteSites', JSON.stringify(updated));
            return updated;
        });
    };

    // Get unique countries for filter
    const countries = [...new Set(sites.map(site => site.states))]
        .filter(Boolean)
        .sort();

    return (
        <div className="unesco-search-page">
            <div className="search-header">
                <h1>Explore UNESCO World Heritage Sites</h1>
                <p>Discover and learn about historic, cultural, and natural heritage sites across the globe</p>
            </div>

            <div className="search-container">
                {/* Search Bar */}
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by site name or country..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                </div>

                {/* Filters */}
                <div className="filters">
                    <div className="filter-group">
                        <label>Country</label>
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">All Countries</option>
                            {countries.map(country => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">All Categories</option>
                            <option value="Cultural">Cultural</option>
                            <option value="Natural">Natural</option>
                            <option value="Mixed">Mixed</option>
                        </select>
                    </div>

                    <button
                        className="btn-clear-filters"
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCountry('');
                            setSelectedCategory('');
                        }}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="results-section">
                {loading && (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading UNESCO sites...</p>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                        <button onClick={fetchUNESCOSites} className="btn-retry">
                            Retry
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div className="results-info">
                            <p>Found <strong>{filteredSites.length}</strong> heritage sites</p>
                        </div>

                        {filteredSites.length === 0 ? (
                            <div className="no-results">
                                <p>No heritage sites found matching your criteria.</p>
                                <p>Try adjusting your search or filters.</p>
                            </div>
                        ) : (
                            <div className="sites-grid">
                                {filteredSites.map(site => (
                                    <div key={site.id} className="site-card">
                                        <div className="site-card-image">
                                            <img 
                                                src={site.image || 'https://via.placeholder.com/500x400?text=No+Image'} 
                                                alt={site.name_en}
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/500x400?text=Image+Not+Available';
                                                }}
                                            />
                                            <button
                                                className={`favorite-btn ${favorites.includes(site.id) ? 'active' : ''}`}
                                                onClick={() => toggleFavorite(site.id)}
                                                title={favorites.includes(site.id) ? 'Remove from favorites' : 'Add to favorites'}
                                            >
                                                ♥
                                            </button>
                                        </div>

                                        <div className="site-card-header">
                                            <h3>{site.name_en}</h3>
                                        </div>

                                        <div className="site-card-body">
                                            <p className="site-country">
                                                <strong>Country:</strong> {site.states}
                                            </p>
                                            <p className="site-category">
                                                <strong>Category:</strong> {site.category}
                                            </p>
                                            <p className="site-year">
                                                <strong>Year Inscribed:</strong> {site.date_inscribed}
                                            </p>
                                            {site.short_description && (
                                                <p className="site-description">{site.short_description}</p>
                                            )}
                                        </div>

                                        <div className="site-card-footer">
                                            {site.criteria && (
                                                <span className="criteria-badge">Criteria: {site.criteria}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default UNESCOSearch;
