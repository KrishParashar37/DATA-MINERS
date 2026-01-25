import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => navigate('/')}>Indiverse</div>
            <ul className="navbar-menu">
                <li className="nav-item active" onClick={() => navigate('/explore')}>Home</li>
                <li className="nav-item">About</li>
                <li className="nav-item">Donate</li>
                <li className="nav-item">Subscription</li>
                <li className="nav-item login-btn">Login</li>
            </ul>
        </nav>
    );
};

export default Navbar;
