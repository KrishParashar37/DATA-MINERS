import React from 'react';
import { useAuth } from '../components/AuthProvider.jsx';

export default function ConfigError() {
  const { error } = useAuth();

  return (
    <main className="container">
      <section className="card">
        <h1>Configuration Error</h1>
        <p className="subtle">{error}</p>
        <p>
          <strong>Fix:</strong> Copy <code>.env.local.sample</code> to <code>.env.local</code> and fill in your Firebase credentials from Firebase Console.
        </p>
        <pre className="code">
{`1. Go to Firebase Console
2. Click "Project Settings"
3. Go to "Your apps" → select Web app
4. Copy config values
5. Paste into .env.local
6. Restart dev server: npm run dev`}
        </pre>
      </section>
    </main>
  );
}
