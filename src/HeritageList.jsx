import React from 'react';
import { heritages } from './data';
import HeritageCard from './HeritageCard';
import './HeritageList.css';

const HeritageList = () => {
    return (
        <div className="heritage-page">
            <div className="page-header">
                <span className="page-subtitle-small">FEATURED DESTINATIONS</span>
                <h1 className="page-title">Explore UNESCO World Heritage</h1>
                <p className="page-description">
                    Journey through India's most treasured architectural marvels, preserved for generations to come.
                </p>
                <div className="header-divider"></div>
            </div>
            <div className="heritage-grid">
                {heritages.map((item) => (
                    <HeritageCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default HeritageList;
