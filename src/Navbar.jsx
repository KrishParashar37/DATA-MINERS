import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    const handleAuthClick = async () => {
        if (user) {
            await signOut();
            navigate('/login');
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => navigate('/')}>Indiverse</div>
            <ul className="navbar-menu">
                <li className="nav-item active" onClick={() => navigate('/explore')}>Home</li>
                <li className="nav-item">About</li>
                <li className="nav-item" onClick={() => navigate('/donate')}>Donate</li>
                <li className="nav-item" onClick={() => navigate('/subscription')}>Subscription</li>

                {user && (
                  <li className="nav-item nav-identity" title={user.email || user.phoneNumber}>
                    <span className="identity-text">{user.email || user.phoneNumber}</span>
                  </li>
                )}

                <li className="nav-item login-btn" onClick={handleAuthClick}>
                    {user ? 'Logout' : 'Login'}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

