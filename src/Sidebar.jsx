import React from 'react';
import './Explore.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">Indiverse</div>
      <ul className="sidebar-menu">
        <li className="menu-item active">Home</li>
        <li className="menu-item">About</li>
        <li className="menu-item">Donate</li>
        <li className="menu-item">Subscription</li>
      </ul>
      <div className="sidebar-footer">
        {/* Placeholder for footer or version if needed */}
        <small style={{ color: '#555' }}>v1.0.0</small>
      </div>
    </div>
  );
};

export default Sidebar;

