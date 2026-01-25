import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeritageList.css';

const HeritageCard = ({ item }) => {
    const navigate = useNavigate();

    return (
        <div className="heritage-card" onClick={() => navigate(`/heritage/${item.id}`)}>
            <img src={item.image} alt={item.name} className="card-image" />
            <div className="card-content">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-location">📍 {item.location}</p>
                <div className="card-category">{item.category}</div>
            </div>
        </div>
    );
};

export default HeritageCard;
