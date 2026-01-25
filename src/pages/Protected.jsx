import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider.jsx';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';

export default function Protected() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      const db = getFirestore(getApp());
      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);
      if (!ignore) setProfile(snap.data() || null);
    }
    if (user) load();
    return () => { ignore = true; };
  }, [user]);

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
          <h2>Protected Area</h2>
          <p className="subtle">Only visible when authenticated.</p>
          <pre className="code">{JSON.stringify(profile, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}
