import React from 'react';
import { heritages } from './data';
import HeritageCard from './HeritageCard';
import TextType from './TextType';
import './HeritageList.css';

const HeritageList = () => {
    const headingTexts = [
        "Explore UNESCO World Heritage",
        "Discover India's Timeless Treasures",
        "Journey Through Ancient Wonders",
        "Experience Cultural Magnificence"
    ];

    return (
        <div className="heritage-page">
            <div className="page-header">
                <span className="page-subtitle-small">FEATURED DESTINATIONS</span>
                <h1 className="page-title">
                    <TextType
                        text={headingTexts}
                        typingSpeed={50}
                        pauseDuration={2000}
                        deletingSpeed={30}
                        showCursor={true}
                        cursorCharacter="_"
                        cursorBlinkDuration={0.5}
                        loop={true}
                    />
                </h1>
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

