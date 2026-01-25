import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider.jsx';
import './Login.css';

import logo from './assets/logo.png';

const Login = () => {
    const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [status, setStatus] = useState('');
    const [busy, setBusy] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setBusy(true);
        setStatus(isSignUp ? 'Creating account…' : 'Signing in…');
        try {
            if (isSignUp) {
                await signUp(email.trim(), password);
                setStatus('✓ Account created! Check your email to verify before logging in.');
                setIsSignUp(false); // Switch back to login mode
            } else {
                await signIn(email.trim(), password);
                setStatus('Success! Redirecting…');
                navigate('/explore', { replace: true });
            }
        } catch (err) {
            const code = err.code || '';
            if (code === 'auth/email-not-verified') {
                setStatus('⚠️ Please verify your email before logging in. Check your inbox.');
            } else {
                const friendly = code.replace('auth/', '').replace(/-/g, ' ');
                setStatus(`Error: ${friendly || err.message}`);
            }
        } finally {
            setBusy(false);
        }
    }

    async function handleReset() {
        if (!email) return setStatus('Enter your email to reset password.');
        setBusy(true);
        try {
            await resetPassword(email.trim());
            setStatus('Password reset email sent.');
        } catch (err) {
            setStatus('Could not send reset email.');
        } finally {
            setBusy(false);
        }
    }

    async function handleGoogle() {
        setBusy(true);
        setStatus('Opening Google sign-in…');
        try {
            await signInWithGoogle();
            setStatus('Success! Redirecting…');
            navigate('/explore', { replace: true });
        } catch (err) {
            setStatus('Google sign-in failed or cancelled.');
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-branding">
                    <img src={logo} alt="Indiverse Heritage Logo" className="login-logo" />
                    <h1 className="login-title">Indiverse</h1>
                    <p className="login-subtitle">Heritage Platform</p>
                </div>

                <p className="login-welcome">Welcome back</p>
                <p className="login-hint">Sign in or create an account</p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="form-options">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={isSignUp}
                                onChange={(e) => setIsSignUp(e.target.checked)}
                            />
                            <span>Create new account</span>
                        </label>
                        <button type="button" className="link-btn" onClick={handleReset}>
                            Forgot password?
                        </button>
                    </div>

                    <button type="submit" className="login-btn primary" disabled={busy}>
                        {isSignUp ? 'Create Account' : 'Continue'}
                    </button>
                </form>

                <div className="divider">
                    <span>or</span>
                </div>

                <button className="login-btn google-btn" onClick={handleGoogle} disabled={busy}>
                    <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: '8px' }}>
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </button>

                <p className="status-message" aria-live="polite">{status}</p>

                <div className="demo-hint">
                    <p>Firebase Authentication</p>
                    <code>Google Sign-In & Email Verification enabled</code>
                </div>
            </div>
        </div>
    );
};

export default Login;
