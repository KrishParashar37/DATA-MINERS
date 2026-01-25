import React from 'react';
import { heritages } from './data';
import HeritageCard from './HeritageCard';
import './HeritageList.css';

const HeritageList = () => {
    return (
        <div className="heritage-page">
            <h1 className="page-title">Explore Cultural Heritage Sites</h1>
            <div className="heritage-grid">
                {heritages.map((item) => (
                    <HeritageCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default HeritageList;
