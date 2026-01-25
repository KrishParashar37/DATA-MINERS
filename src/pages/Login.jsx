import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider.jsx';

export default function Login() {
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = '/welcome';

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus(isSignUp ? 'Creating account…' : 'Signing in…');
    try {
      if (isSignUp) {
        await signUp(email.trim(), password);
        setStatus('Account created! Check your email to verify.');
        setTimeout(() => navigate('/verify', { replace: true }), 1000);
      } else {
        await signIn(email.trim(), password);
        setStatus('Success! Redirecting…');
        navigate(from, { replace: true });
      }
    } catch (err) {
      const code = err.code || '';
      const friendly = code.replace('auth/', '').replace(/-/g, ' ');
      setStatus(`Error: ${friendly || err.message}`);
    } finally {
      setBusy(false);
    }
  }

  async function handleReset() {
    if (!email) return setStatus('Enter your email to reset password.');
    try {
      await resetPassword(email.trim());
      setStatus('Password reset email sent.');
    } catch (err) {
      setStatus('Could not send reset email.');
    }
  }

  async function handleGoogle() {
    setBusy(true);
    setStatus('Opening Google sign-in…');
    try {
      await signInWithGoogle();
      setStatus('Success! Redirecting…');
      navigate(from, { replace: true });
    } catch (err) {
      setStatus('Google sign-in failed or cancelled.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Welcome back</h1>
        <p className="subtle">Sign in or create an account</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <div className="row space-between">
            <label className="checkbox">
              <input type="checkbox" checked={isSignUp} onChange={(e)=>setIsSignUp(e.target.checked)} />
              <span>Create new account</span>
            </label>
            <button type="button" className="link" onClick={handleReset}>Forgot password?</button>
          </div>
          <button type="submit" className="primary w-full" disabled={busy}>{isSignUp ? 'Create account' : 'Continue'}</button>
        </form>
        <div className="divider"><span>or</span></div>
        <button className="secondary w-full" onClick={handleGoogle} disabled={busy}>Continue with Google</button>
        <p className="status" aria-live="polite">{status}</p>
      </section>
    </main>
  );
}
