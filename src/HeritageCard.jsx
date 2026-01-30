import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeritageList.css';

const HeritageCard = ({ item }) => {
    const navigate = useNavigate();

    return (
        <div className="heritage-card" onClick={() => navigate(`/heritage/${item.id}`)}>
            <div className="card-image-container">
                <img src={item.image} alt={item.name} className="card-image" />
                <div className="card-overlays-top">
                    <span className="card-tag">UNESCO</span>
                    <span className="card-tag">{item.category}</span>
                </div>
                <div className="card-overlays-bottom">
                    <span className="card-rating">Rating: 4.8</span>
                    <span className="card-views">Views: 1.2M</span>
                </div>
            </div>
            <div className="card-content">
                <p className="card-location">{item.location}</p>
                <h3 className="card-title">{item.name}</h3>
                <p className="card-short-desc text-truncate">{item.description}</p>
            </div>
        </div>
    );
};

export default HeritageCard;
