import React from 'react';
import { useAuth } from '../components/AuthProvider.jsx';

export default function Welcome() {
  const { user, signOut } = useAuth();

  return (
    <>
      <header className="topbar">
        <div className="container row space-between center">
          <h1 className="brand">Heritage</h1>
          <div className="row gap">
            <span className="subtle">{user?.email}</span>
            <button className="secondary" onClick={signOut}>Sign out</button>
          </div>
        </div>
      </header>
      <main className="container">
        <section className="card">
          <h1>hello all is working</h1>
          <p className="subtle">You are successfully signed in.</p>
        </section>
      </main>
    </>
  );
}
