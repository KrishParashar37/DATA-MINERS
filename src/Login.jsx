import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // No auth logic required, straight redirect
        navigate('/explore');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Indiverse</h1>
                <p className="login-subtitle">Heritage Platform</p>

                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="login-input"
                        defaultValue="guest"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        defaultValue="password"
                    />
                    <button type="submit" className="login-btn">
                        Connect to History
                    </button>
                </form>

                <p className="guest-note">Demo Access Enabled</p>
            </div>
        </div>
    );
};

export default Login;
