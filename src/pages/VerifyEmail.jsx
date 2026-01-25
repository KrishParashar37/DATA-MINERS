import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';
import { reload } from 'firebase/auth';

export default function VerifyEmail() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState('');

  // Auto-check every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (user && !user.emailVerified) {
        reload(user).catch(() => {});
      } else if (user?.emailVerified) {
        setStatus('Email verified! Redirecting…');
        setTimeout(() => navigate('/welcome', { replace: true }), 1000);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [user, navigate]);

  // Redirect if already verified
  useEffect(() => {
    if (user?.emailVerified) {
      setStatus('Email verified! Redirecting…');
      navigate('/welcome', { replace: true });
    }
  }, [user?.emailVerified, navigate]);

  async function checkVerification() {
    setChecking(true);
    setStatus('Checking…');
    try {
      await reload(user);
      if (user.emailVerified) {
        setStatus('Email verified! Redirecting…');
        setTimeout(() => navigate('/welcome', { replace: true }), 500);
      } else {
        setStatus('Email not verified yet. Keep checking…');
      }
    } catch (err) {
      console.error(err);
      setStatus(`Error: ${err?.message || 'Could not refresh'}`);
    } finally {
      setChecking(false);
    }
  }

  async function resendVerificationEmail() {
    setResending(true);
    setStatus('Sending verification email…');
    try {
      const { sendEmailVerification } = await import('firebase/auth');
      await sendEmailVerification(user);
      setStatus('Verification email sent. Check your inbox.');
    } catch (err) {
      console.error(err);
      setStatus(`Error: ${err?.message || 'Could not send email'}`);
    } finally {
      setResending(false);
    }
  }

  return (
    <main className="container">
      <section className="card">
        <h2>Verify your email</h2>
        <p className="subtle">A verification link was sent to:</p>
        <p style={{ fontWeight: 'bold', margin: '8px 0' }}>{user?.email}</p>
        <p className="subtle">Click the link in the email to continue. Or click "Check verification" below.</p>
        <div style={{ margin: '16px 0' }} className="row gap">
          <button className="primary" onClick={checkVerification} disabled={checking}>
            {checking ? 'Checking…' : 'Check verification'}
          </button>
          <button className="secondary" onClick={resendVerificationEmail} disabled={resending}>
            {resending ? 'Sending…' : 'Resend email'}
          </button>
          <button className="secondary" onClick={signOut}>Sign out</button>
        </div>
        <p className="status" aria-live="polite">{status}</p>
      </section>
    </main>
  );
}
