import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleAuthClick = async () => {
        if (user) {
            await signOut();
            navigate('/login');
        } else {
            navigate('/login');
        }
        setIsMenuOpen(false);
    };

    const handleNavClick = (path) => {
        if (path) navigate(path);
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => navigate('/')}>Indiverse</div>
            
            <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                <li className="nav-item active" onClick={() => handleNavClick('/explore')}>Home</li>
                <li className="nav-item" onClick={() => handleNavClick('/unesco-search')}>Explore UNESCO</li>
                <li className="nav-item" onClick={() => handleNavClick()}>About</li>
                <li className="nav-item" onClick={() => handleNavClick('/donate')}>Donate</li>
                <li className="nav-item" onClick={() => handleNavClick('/subscription')}>Subscription</li>

                {user && (
                  <li className="nav-item" onClick={() => handleNavClick('/profile')}>My Profile</li>
                )}

                {user && (
                  <>
                    {window.location.pathname !== '/explore' && (
                      <li className="nav-item nav-identity" title={user.email || user.phoneNumber}>
                        <span className="identity-text">{user.email || user.phoneNumber}</span>
                      </li>
                    )}
                  </>
                )}

                <li className="nav-item login-btn mobile-only" onClick={handleAuthClick}>
                    {user ? 'Logout' : 'Login'}
                </li>
            </ul>

            <div className="nav-item login-btn desktop-only" onClick={handleAuthClick}>
                {user ? 'Logout' : 'Login'}
            </div>
        </nav>
    );
};

export default Navbar;

