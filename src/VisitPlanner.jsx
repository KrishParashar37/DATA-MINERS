import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './VisitPlanner.css';

const VisitPlanner = () => {
    const [searchParams] = useSearchParams();
    const siteParam = searchParams.get('site') || 'taj-mahal';
    const [selectedSite, setSelectedSite] = useState(siteParam);
    const [activeTab, setActiveTab] = useState('best-time');
    const [weatherData, setWeatherData] = useState({});
    const [loadingWeather, setLoadingWeather] = useState(true);

    // Location coordinates for weather API
    const locationCoordinates = {
        'taj-mahal': { lat: 27.1751, lon: 78.0421, city: 'Agra' },
        'qutub-minar': { lat: 28.5244, lon: 77.1855, city: 'Delhi' },
        'red-fort': { lat: 28.6562, lon: 77.2410, city: 'Delhi' },
        'ajanta-caves': { lat: 20.5518, lon: 75.7801, city: 'Aurangabad' },
        'ellora-caves': { lat: 19.9035, lon: 75.7791, city: 'Aurangabad' },
        'konark-temple': { lat: 19.8873, lon: 86.0921, city: 'Konark' },
        'khajuraho': { lat: 24.8318, lon: 79.9864, city: 'Khajuraho' },
        'hampi': { lat: 15.3350, lon: 76.4789, city: 'Hampi' },
        'kaziranga': { lat: 26.5961, lon: 93.1561, city: 'Kaziranga' },
        'sanchi-stupa': { lat: 23.4833, lon: 77.7333, city: 'Sanchi' }
    };

    // Fetch real weather data
    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoadingWeather(true);
            try {
                const location = locationCoordinates[selectedSite];
                if (!location) {
                    setLoadingWeather(false);
                    return;
                }

                // Using Open-Meteo API (free, no API key needed)
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=celsius&timezone=auto`
                );

                if (!response.ok) throw new Error('Failed to fetch weather');

                const data = await response.json();
                const current = data.current;
                const daily = data.daily;

                // Map weather codes to conditions
                const getWeatherCondition = (code) => {
                    if (code === 0) return 'Clear sky';
                    if (code === 1 || code === 2) return 'Partly cloudy';
                    if (code === 3) return 'Overcast';
                    if (code === 45 || code === 48) return 'Foggy';
                    if ([51, 53, 55, 61, 63, 65, 71, 73, 75, 77, 80, 81, 82].includes(code)) return 'Rainy';
                    if ([85, 86].includes(code)) return 'Snow showers';
                    if ([80, 81, 82].includes(code)) return 'Rain showers';
                    return 'Cloudy';
                };

                // Format 3-day forecast
                const forecast = [];
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                
                for (let i = 1; i <= 3; i++) {
                    const forecastDate = new Date();
                    forecastDate.setDate(forecastDate.getDate() + i);
                    
                    forecast.push({
                        day: forecastDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
                        temp: `${Math.round(daily.temperature_2m_max[i])}°C`,
                        minTemp: `${Math.round(daily.temperature_2m_min[i])}°C`,
                        condition: getWeatherCondition(daily.weather_code[i])
                    });
                }

                setWeatherData(prev => ({
                    ...prev,
                    [selectedSite]: {
                        current: `${Math.round(current.temperature_2m)}°C`,
                        condition: getWeatherCondition(current.weather_code),
                        humidity: `${current.relative_humidity_2m}%`,
                        windSpeed: `${Math.round(current.wind_speed_10m)} km/h`,
                        forecast: forecast
                    }
                }));
            } catch (error) {
                console.error('Weather fetch error:', error);
                // Keep fallback data on error
            } finally {
                setLoadingWeather(false);
            }
        };

        fetchWeatherData();
    }, [selectedSite]);

    useEffect(() => {
        setSelectedSite(siteParam);
    }, [siteParam]);

    // 10 Available Heritage Sites with Visit Planner
    const heritageData = {
        'taj-mahal': { name: 'Taj Mahal', location: 'Agra, India', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=300&fit=crop' },
        'qutub-minar': { name: 'Qutub Minar', location: 'Delhi, India', image: 'https://images.unsplash.com/photo-1549144611-f82d441c8374?w=500&h=300&fit=crop' },
        'red-fort': { name: 'Red Fort', location: 'Delhi, India', image: 'https://images.unsplash.com/photo-1532650985954-1820c6e2dbf4?w=500&h=300&fit=crop' },
        'ajanta-caves': { name: 'Ajanta Caves', location: 'Maharashtra, India', image: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=500&h=300&fit=crop' },
        'ellora-caves': { name: 'Ellora Caves', location: 'Maharashtra, India', image: 'https://images.unsplash.com/photo-1551969014-7ee588231e92?w=500&h=300&fit=crop' },
        'konark-temple': { name: 'Konark Sun Temple', location: 'Odisha, India', image: 'https://images.unsplash.com/photo-1597239624002-68c3797188d4?w=500&h=300&fit=crop' },
        'khajuraho': { name: 'Khajuraho Temples', location: 'Madhya Pradesh, India', image: 'https://images.unsplash.com/photo-1585390273870-fac3c09a27d5?w=500&h=300&fit=crop' },
        'hampi': { name: 'Hampi Ruins', location: 'Karnataka, India', image: 'https://images.unsplash.com/photo-1567359781514-3b963ff18fa6?w=500&h=300&fit=crop' },
        'kaziranga': { name: 'Kaziranga National Park', location: 'Assam, India', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&h=300&fit=crop' },
        'sanchi-stupa': { name: 'Sanchi Stupa', location: 'Madhya Pradesh, India', image: 'https://images.unsplash.com/photo-1599587025762-b36be5de313e?w=500&h=300&fit=crop' }
    };

    const bestTimeData = {
        'taj-mahal': { bestMonths: 'October - March', temperature: '15°C - 28°C', rainfall: 'Minimal', crowdLevel: 'Moderate to High', whyBest: 'Pleasant weather with clear skies. Avoid monsoons and extreme heat.', tips: ['Visit early morning for fewer crowds', 'Book tickets online', 'Wear comfortable shoes', 'Avoid weekends'] },
        'qutub-minar': { bestMonths: 'October - March', temperature: '12°C - 25°C', rainfall: 'Low', crowdLevel: 'Moderate', whyBest: 'Cool weather perfect for exploration.', tips: ['Early morning visits recommended', 'Bring sunscreen', 'Allow 2-3 hours', 'Photography allowed'] },
        'khajuraho': { bestMonths: 'October - February', temperature: '10°C - 28°C', rainfall: 'Minimal', crowdLevel: 'Low to Moderate', whyBest: 'Ideal for outdoor monument exploration.', tips: ['Plan sunrise/sunset visits', 'Hire local guide', 'Visit museum first', 'Stay hydrated'] },
        'ajanta-caves': { bestMonths: 'November - February', temperature: '12°C - 28°C', rainfall: 'Low', crowdLevel: 'Low', whyBest: 'Best visibility of paintings and comfort.', tips: ['Stay in Aurangabad', 'Hire guide for insights', 'Wear good shoes', 'Bring water'] },
        'ellora-caves': { bestMonths: 'October - March', temperature: '14°C - 30°C', rainfall: 'Low', crowdLevel: 'Low to Moderate', whyBest: 'Pleasant weather for cave exploration.', tips: ['Visit both carved temples', 'Bring water bottle', 'Wear sturdy shoes', 'Early morning preferred'] },
        'red-fort': { bestMonths: 'November - February', temperature: '10°C - 24°C', rainfall: 'Minimal', crowdLevel: 'High', whyBest: 'Cool and pleasant for walking.', tips: ['Early morning visit', 'Avoid peak hours', 'Light clothing', 'Carry water'] },
        'hampi': { bestMonths: 'October - February', temperature: '15°C - 32°C', rainfall: 'Low', crowdLevel: 'Low to Moderate', whyBest: 'Ideal for exploring extensive ruins.', tips: ['Rent bicycle or jeep', 'Visit at sunrise', 'Bring sun protection', 'Hire local guide'] },
        'konark-temple': { bestMonths: 'October - March', temperature: '15°C - 30°C', rainfall: 'Low', crowdLevel: 'Moderate', whyBest: 'Pleasant weather for monument exploration and photography.', tips: ['Visit during sunrise', 'Hire knowledgeable guide', 'Wear sun protection', 'Allow 2-3 hours'] },
        'kaziranga': { bestMonths: 'November - April', temperature: '12°C - 28°C', rainfall: 'Low', crowdLevel: 'Moderate', whyBest: 'Perfect for wildlife safari and rhinoceros spotting.', tips: ['Book jeep safari in advance', 'Early morning safaris best', 'Bring binoculars', 'Photography equipment recommended'] },
        'sanchi-stupa': { bestMonths: 'October - March', temperature: '10°C - 28°C', rainfall: 'Low', crowdLevel: 'Low', whyBest: 'Ideal weather for exploring ancient Buddhist monuments.', tips: ['Visit early morning', 'Hire site guide', 'Wear comfortable shoes', 'Bring water bottle'] },
        'agra-fort': { bestMonths: 'October - March', temperature: '14°C - 28°C', rainfall: 'Minimal', crowdLevel: 'Moderate to High', whyBest: 'Clear skies for photography.', tips: ['Morning visit best', 'Complementary to Taj Mahal', 'Allow 2 hours', 'Wear comfortable shoes'] },
        'jaipur-city': { bestMonths: 'October - March', temperature: '12°C - 26°C', rainfall: 'Low', crowdLevel: 'Moderate', whyBest: 'Perfect weather for city exploration.', tips: ['Stay in city center', 'Hire guide', 'Visit early morning', 'Try local cuisine'] },
        'meenakshi-temple': { bestMonths: 'October - February', temperature: '24°C - 32°C', rainfall: 'Low', crowdLevel: 'Moderate', whyBest: 'Good weather and festival season.', tips: ['Check festival dates', 'Dress respectfully', 'Visit early morning', 'Photography limited'] }
    };

    const crowdData = {
        'taj-mahal': { current: 'High (1200+ visitors/hour)', peak: '10 AM - 3 PM', lessVisited: '6-8 AM, 4-6 PM', monthly: [{ month: 'Jan', level: 'Very High' }, { month: 'Feb', level: 'Very High' }, { month: 'Jul', level: 'Low' }, { month: 'Aug', level: 'Low' }, { month: 'Nov', level: 'High' }] },
        'qutub-minar': { current: 'Moderate (300-400 visitors/hour)', peak: '11 AM - 2 PM', lessVisited: '7-9 AM, 3-5 PM', monthly: [{ month: 'Jan', level: 'High' }, { month: 'Feb', level: 'High' }, { month: 'Jun', level: 'Very Low' }, { month: 'Jul', level: 'Low' }, { month: 'Dec', level: 'High' }] },
        'khajuraho': { current: 'Low (100-150 visitors/hour)', peak: '10 AM - 12 PM', lessVisited: 'Early morning, Evening', monthly: [{ month: 'Jan', level: 'Moderate' }, { month: 'Feb', level: 'Moderate' }, { month: 'Jun', level: 'Very Low' }, { month: 'Sep', level: 'Very Low' }, { month: 'Dec', level: 'Moderate' }] },
        'ajanta-caves': { current: 'Low (80-100 visitors/hour)', peak: '10 AM - 1 PM', lessVisited: 'Early morning, Evening', monthly: [{ month: 'Jan', level: 'Low' }, { month: 'Feb', level: 'Low' }, { month: 'Jun', level: 'Very Low' }, { month: 'Aug', level: 'Very Low' }, { month: 'Dec', level: 'Moderate' }] },
        'ellora-caves': { current: 'Low to Moderate (120-180 visitors/hour)', peak: '10 AM - 2 PM', lessVisited: 'Early morning, Late afternoon', monthly: [{ month: 'Jan', level: 'Moderate' }, { month: 'Feb', level: 'Moderate' }, { month: 'Jul', level: 'Very Low' }, { month: 'Aug', level: 'Very Low' }, { month: 'Nov', level: 'Low' }] },
        'red-fort': { current: 'High (500+ visitors/hour)', peak: '10 AM - 3 PM', lessVisited: '7-8 AM, 4-6 PM', monthly: [{ month: 'Jan', level: 'Very High' }, { month: 'Feb', level: 'Very High' }, { month: 'Jun', level: 'Low' }, { month: 'Jul', level: 'Low' }, { month: 'Dec', level: 'High' }] },
        'hampi': { current: 'Low (100-150 visitors/hour)', peak: '9 AM - 12 PM', lessVisited: 'Early morning, Late evening', monthly: [{ month: 'Jan', level: 'Moderate' }, { month: 'Feb', level: 'Moderate' }, { month: 'May', level: 'Very Low' }, { month: 'Jun', level: 'Very Low' }, { month: 'Nov', level: 'Low' }] },
        'konark-temple': { current: 'Moderate (200-300 visitors/hour)', peak: '10 AM - 2 PM', lessVisited: '6-8 AM, 4-6 PM', monthly: [{ month: 'Jan', level: 'Moderate' }, { month: 'Feb', level: 'Moderate' }, { month: 'May', level: 'Low' }, { month: 'Jul', level: 'Very Low' }, { month: 'Dec', level: 'Moderate' }] },
        'kaziranga': { current: 'Moderate (Safari dependent)', peak: 'Morning & Evening Safaris', lessVisited: 'Afternoon hours', monthly: [{ month: 'Jan', level: 'High' }, { month: 'Feb', level: 'High' }, { month: 'Jun', level: 'Very Low' }, { month: 'Jul', level: 'Low' }, { month: 'Nov', level: 'Moderate' }] },
        'sanchi-stupa': { current: 'Low (50-100 visitors/hour)', peak: '10 AM - 1 PM', lessVisited: 'Early morning, Evening', monthly: [{ month: 'Jan', level: 'Low' }, { month: 'Feb', level: 'Low' }, { month: 'May', level: 'Very Low' }, { month: 'Jul', level: 'Very Low' }, { month: 'Dec', level: 'Low' }] },
        'agra-fort': { current: 'Moderate to High (400+ visitors/hour)', peak: '10 AM - 2 PM', lessVisited: '6-8 AM, 4-6 PM', monthly: [{ month: 'Jan', level: 'Very High' }, { month: 'Feb', level: 'Very High' }, { month: 'Jun', level: 'Low' }, { month: 'Jul', level: 'Low' }, { month: 'Dec', level: 'High' }] },
        'jaipur-city': { current: 'Moderate (250-350 visitors/hour)', peak: '11 AM - 2 PM', lessVisited: 'Early morning, Evening', monthly: [{ month: 'Jan', level: 'High' }, { month: 'Feb', level: 'High' }, { month: 'May', level: 'Very Low' }, { month: 'Jul', level: 'Low' }, { month: 'Nov', level: 'Moderate' }] },
        'meenakshi-temple': { current: 'Moderate to High (Festival dependent)', peak: 'Morning prayers, Festival times', lessVisited: 'Afternoon hours', monthly: [{ month: 'Jan', level: 'High' }, { month: 'Feb', level: 'High' }, { month: 'May', level: 'Moderate' }, { month: 'Jun', level: 'Moderate' }, { month: 'Dec', level: 'High' }] }
    };

    const nearbyData = {
        'taj-mahal': { hotels: [{ name: 'The Oberoi Amarvilas', rating: '4.8/5', price: '₹18,000-25,000/night', distance: '0.5 km' }, { name: 'Taj Hotel Agra', rating: '4.5/5', price: '₹12,000-18,000/night', distance: '1.5 km' }, { name: 'Amar Vilas', rating: '4.7/5', price: '₹15,000-22,000/night', distance: '0.8 km' }, { name: 'ITC Mughal', rating: '4.6/5', price: '₹10,000-16,000/night', distance: '2 km' }], restaurants: [{ name: 'Pind Balluchi', cuisine: 'Indian', rating: '4.3/5', price: '₹300-800' }, { name: 'Taj Side Restaurant', cuisine: 'Multi-cuisine', rating: '4.0/5', price: '₹400-1000' }, { name: 'Zorba The Buddha', cuisine: 'Multi-cuisine', rating: '4.4/5', price: '₹500-1200' }, { name: 'Mama Chicken', cuisine: 'Mughlai', rating: '4.2/5', price: '₹250-600' }] },
        'qutub-minar': { hotels: [{ name: 'The Leela Delhi', rating: '4.7/5', price: '₹15,000-22,000/night', distance: '8 km' }, { name: 'Pullman New Delhi', rating: '4.4/5', price: '₹8,000-14,000/night', distance: '15 km' }, { name: 'Hilton Delhi', rating: '4.5/5', price: '₹10,000-16,000/night', distance: '12 km' }], restaurants: [{ name: 'Karim\'s', cuisine: 'Mughlai', rating: '4.5/5', price: '₹200-500' }, { name: 'Paranthe Wali Gali', cuisine: 'Indian', rating: '4.3/5', price: '₹100-300' }, { name: 'Dum Pukht', cuisine: 'Mughlai', rating: '4.6/5', price: '₹600-1500' }] },
        'khajuraho': { hotels: [{ name: 'Radisson Jass Khajuraho', rating: '4.5/5', price: '₹6,000-10,000/night', distance: '3 km' }, { name: 'Lalit Temple View', rating: '4.3/5', price: '₹5,000-8,000/night', distance: '2 km' }, { name: 'Ken River Lodge', rating: '4.6/5', price: '₹4,000-7,000/night', distance: '1.5 km' }], restaurants: [{ name: 'Rajdarbar', cuisine: 'Indian', rating: '4.2/5', price: '₹250-600' }, { name: 'Raja Cafe', cuisine: 'Multi-cuisine', rating: '4.0/5', price: '₹300-700' }] },
        'ajanta-caves': { hotels: [{ name: 'Rama International', rating: '4.2/5', price: '₹3,000-5,000/night', distance: '59 km' }, { name: 'MTDC Holiday Resort', rating: '4.0/5', price: '₹2,000-4,000/night', distance: '59 km' }], restaurants: [{ name: 'Nandini Vaishno', cuisine: 'Indian', rating: '4.1/5', price: '₹200-500' }, { name: 'Bhoj Restaurant', cuisine: 'Maharashtrian', rating: '4.0/5', price: '₹250-600' }] },
        'ellora-caves': { hotels: [{ name: 'Rama International', rating: '4.2/5', price: '₹3,000-5,000/night', distance: '30 km' }, { name: 'MTDC Holiday', rating: '4.0/5', price: '₹2,000-4,000/night', distance: '30 km' }], restaurants: [{ name: 'Adil Darbar', cuisine: 'Mughlai', rating: '4.2/5', price: '₹300-700' }, { name: 'Bhoj', cuisine: 'Maharashtrian', rating: '4.0/5', price: '₹250-600' }] },
        'red-fort': { hotels: [{ name: 'The Imperial', rating: '4.8/5', price: '₹12,000-20,000/night', distance: '2 km' }, { name: 'Park Hotel Delhi', rating: '4.3/5', price: '₹6,000-12,000/night', distance: '3 km' }], restaurants: [{ name: 'Karim\'s Old Delhi', cuisine: 'Mughlai', rating: '4.5/5', price: '₹200-500' }, { name: 'Paranthe Wali Gali', cuisine: 'Indian', rating: '4.3/5', price: '₹100-300' }] },
        'hampi': { hotels: [{ name: 'Hampi Heritage Resort', rating: '4.4/5', price: '₹2,500-4,500/night', distance: '1 km' }, { name: 'The Boulders Hampi', rating: '4.5/5', price: '₹3,500-6,000/night', distance: '2 km' }], restaurants: [{ name: 'Warung Mak Beng', cuisine: 'International', rating: '4.2/5', price: '₹150-400' }, { name: 'Hampi\'s Kitchen', cuisine: 'Multi-cuisine', rating: '4.1/5', price: '₹200-500' }] },
        'konark-temple': { hotels: [{ name: 'Konark Sun Temple Resort', rating: '4.2/5', price: '₹3,000-5,000/night', distance: '2 km' }, { name: 'Konark Beach Resort', rating: '4.0/5', price: '₹2,500-4,000/night', distance: '3 km' }], restaurants: [{ name: 'Sea Food Palace', cuisine: 'Seafood', rating: '4.1/5', price: '₹300-700' }, { name: 'Odia Kitchen', cuisine: 'Odia', rating: '4.0/5', price: '₹200-500' }] },
        'kaziranga': { hotels: [{ name: 'Kaziranga Heritage Resort', rating: '4.3/5', price: '₹4,000-7,000/night', distance: '2 km' }, { name: 'Kaziranga Eco Lodge', rating: '4.1/5', price: '₹3,000-5,500/night', distance: '1.5 km' }], restaurants: [{ name: 'Wildlife Restaurant', cuisine: 'Multi-cuisine', rating: '4.0/5', price: '₹250-600' }, { name: 'Assamese Kitchen', cuisine: 'Assamese', rating: '4.1/5', price: '₹200-500' }] },
        'sanchi-stupa': { hotels: [{ name: 'Sanchi Heritage Hotel', rating: '4.1/5', price: '₹2,000-3,500/night', distance: '1 km' }, { name: 'Raisen Fort Resort', rating: '3.9/5', price: '₹1,500-2,500/night', distance: '5 km' }], restaurants: [{ name: 'Madhya Kitchen', cuisine: 'Indian', rating: '4.0/5', price: '₹200-450' }, { name: 'Stupa Restaurant', cuisine: 'Multi-cuisine', rating: '3.9/5', price: '₹150-350' }] }
    };

    const site = heritageData[selectedSite];
    const bestTime = bestTimeData[selectedSite];
    const weather = weatherData[selectedSite] || {
        current: 'Loading...',
        condition: 'Fetching data',
        humidity: '--',
        windSpeed: '--',
        forecast: [
            { day: 'Loading', temp: '--', condition: 'Please wait' },
            { day: 'Loading', temp: '--', condition: 'Please wait' },
            { day: 'Loading', temp: '--', condition: 'Please wait' }
        ]
    };
    const crowds = crowdData[selectedSite];
    const nearby = nearbyData[selectedSite];

    return (
        <div className="visit-planner-page">
            <div className="planner-header">
                <h1>Visit Planner</h1>
                <p>Plan your perfect heritage visit</p>
            </div>

            <div className="planner-container">
                <div className="site-selector">
                    <h2>Selected Heritage Site</h2>
                    <div className="site-options">
                        <div className="site-option active">
                            <img src={heritageData[selectedSite].image} alt={heritageData[selectedSite].name} />
                            <div className="site-info">
                                <h3>{heritageData[selectedSite].name}</h3>
                                <p>{heritageData[selectedSite].location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="planner-content">
                    <div className="planner-tabs">
                        <button className={`tab-btn ${activeTab === 'best-time' ? 'active' : ''}`} onClick={() => setActiveTab('best-time')}>Best Time</button>
                        <button className={`tab-btn ${activeTab === 'weather' ? 'active' : ''}`} onClick={() => setActiveTab('weather')}>Weather</button>
                        <button className={`tab-btn ${activeTab === 'crowds' ? 'active' : ''}`} onClick={() => setActiveTab('crowds')}>Crowds</button>
                        <button className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`} onClick={() => setActiveTab('nearby')}>Nearby</button>
                    </div>

                    {activeTab === 'best-time' && (
                        <div className="tab-content">
                            <h2>Best Time to Visit</h2>
                            <div className="best-time-grid">
                                <div className="info-card"><h3>Ideal Months</h3><p>{bestTime.bestMonths}</p></div>
                                <div className="info-card"><h3>Temperature</h3><p>{bestTime.temperature}</p></div>
                                <div className="info-card"><h3>Rainfall</h3><p>{bestTime.rainfall}</p></div>
                                <div className="info-card"><h3>Crowd Level</h3><p>{bestTime.crowdLevel}</p></div>
                            </div>
                            <div className="why-best"><h3>Why This Time?</h3><p>{bestTime.whyBest}</p></div>
                            <div className="tips-section"><h3>Visitor Tips</h3><ul>{bestTime.tips.map((tip, idx) => <li key={idx}>{tip}</li>)}</ul></div>
                        </div>
                    )}

                    {activeTab === 'weather' && (
                        <div className="tab-content">
                            <h2>Weather Information</h2>
                            {loadingWeather && <p className="loading-text">Fetching real-time weather data...</p>}
                            <div className="weather-current">
                                <div className="current-weather-card">
                                    <h3>Current Weather</h3>
                                    <div className="weather-details">
                                        <div className="weather-item"><span className="label">Temperature</span><span className="value">{weather.current}</span></div>
                                        <div className="weather-item"><span className="label">Condition</span><span className="value">{weather.condition}</span></div>
                                        <div className="weather-item"><span className="label">Humidity</span><span className="value">{weather.humidity}</span></div>
                                        <div className="weather-item"><span className="label">Wind Speed</span><span className="value">{weather.windSpeed}</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="forecast"><h3>3-Day Forecast</h3><div className="forecast-grid">{weather.forecast && weather.forecast.map((day, idx) => <div key={idx} className="forecast-card"><h4>{day.day}</h4><p className="temp">{day.temp}</p>{day.minTemp && <p className="min-temp">Min: {day.minTemp}</p>}<p className="condition">{day.condition}</p></div>)}</div></div>
                        </div>
                    )}

                    {activeTab === 'crowds' && (
                        <div className="tab-content">
                            <h2>Crowd Prediction</h2>
                            <div className="crowd-info">
                                <div className="info-card"><h3>Current Status</h3><p className="crowd-level">{crowds.current}</p></div>
                                <div className="info-card"><h3>Peak Hours</h3><p>{crowds.peak}</p></div>
                                <div className="info-card"><h3>Less Crowded</h3><p>{crowds.lessVisited}</p></div>
                            </div>
                            <div className="monthly-crowds"><h3>Crowd Levels by Month</h3><div className="crowd-chart">{crowds.monthly.map((month, idx) => <div key={idx} className="month-bar"><span className="month-name">{month.month}</span><div className={`bar level-${month.level.replace(' ', '-').toLowerCase()}`}></div><span className="level-text">{month.level}</span></div>)}</div></div>
                        </div>
                    )}

                    {activeTab === 'nearby' && (
                        <div className="tab-content">
                            <h2>Nearby Hotels & Restaurants</h2>
                            <div className="nearby-section">
                                <h3>Hotels</h3>
                                <div className="nearby-grid">{nearby.hotels.map((hotel, idx) => <div key={idx} className="nearby-card"><div className="card-header"><h4>{hotel.name}</h4><span className="rating">{hotel.rating}</span></div><p className="price">{hotel.price}</p><p className="distance">{hotel.distance}</p><button className="btn-book">Book Now</button></div>)}</div>
                            </div>
                            <div className="nearby-section">
                                <h3>Restaurants</h3>
                                <div className="nearby-grid">{nearby.restaurants.map((restaurant, idx) => <div key={idx} className="nearby-card"><div className="card-header"><h4>{restaurant.name}</h4><span className="rating">{restaurant.rating}</span></div><p className="cuisine">{restaurant.cuisine}</p><p className="price">{restaurant.price}</p><button className="btn-reserve">Reserve</button></div>)}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VisitPlanner;
