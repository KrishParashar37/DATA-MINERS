import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as fbSignOut,
  sendPasswordResetEmail,
  updateProfile,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { firebaseConfig, isConfigValid } from '../firebase/config.js';

const AuthContext = createContext(null);

let authInstance = null;
let dbInstance = null;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize Firebase once on mount
  useEffect(() => {
    try {
      console.log('Validating Firebase config...');
      if (!isConfigValid()) {
        throw new Error('Firebase config is invalid. Check .env.local for placeholder values.');
      }
      
      console.log('Initializing Firebase app...');
      const newApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
      authInstance = getAuth(newApp);
      dbInstance = getFirestore(newApp);
      console.log('Firebase initialized successfully');
      setError(null);

      // Set up auth state listener
      const unsub = onAuthStateChanged(authInstance, async (u) => {
        console.log('Auth state changed:', u?.email || 'no user');
        setUser(u);
        setLoading(false);
      });

      return () => unsub();
    } catch (e) {
      console.error('Firebase init failed:', e?.message || e);
      setError(e?.message || 'Firebase initialization failed');
      setLoading(false);
    }
  }, []);

  async function upsertUserProfile(u) {
    try {
      if (!dbInstance) {
        console.warn('Firestore not initialized, skipping profile upsert');
        return;
      }
      const ref = doc(dbInstance, 'users', u.uid);
      const snap = await getDoc(ref);
      const base = {
        uid: u.uid,
        email: u.email || null,
        displayName: u.displayName || null,
        photoURL: u.photoURL || null,
        lastLoginAt: serverTimestamp(),
      };
      if (snap.exists()) {
        await setDoc(ref, base, { merge: true });
      } else {
        await setDoc(ref, { ...base, createdAt: serverTimestamp() }, { merge: true });
      }
    } catch (e) {
      // Don't block sign-in if Firestore isn't ready; just warn.
      console.warn('Profile upsert skipped:', e?.code || e?.message || e);
    }
  }

  useEffect(() => {
    if (!authInstance) {
      setError('Firebase auth not initialized');
      setLoading(false);
      return;
    }

    // Handle Google redirect result if popup was blocked
    (async () => {
      try {
        const cred = await getRedirectResult(authInstance);
        if (cred?.user) {
          await upsertUserProfile(cred.user);
        }
      } catch (_) {}
    })();
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    error,
    async signIn(email, password) {
      if (!authInstance) throw new Error('Firebase not initialized');
      const cred = await signInWithEmailAndPassword(authInstance, email, password);
      await upsertUserProfile(cred.user);
      return cred.user;
    },
    async signUp(email, password) {
      if (!authInstance) throw new Error('Firebase not initialized');
      const cred = await createUserWithEmailAndPassword(authInstance, email, password);
      if (!cred.user.displayName) {
        try { await updateProfile(cred.user, { displayName: email.split('@')[0] }); } catch {}
      }
      await upsertUserProfile(cred.user);
      // Send verification email
      try {
        const { sendEmailVerification } = await import('firebase/auth');
        await sendEmailVerification(cred.user);
      } catch (e) {
        console.warn('Could not send verification email:', e?.message);
      }
      return cred.user;
    },
    async signInWithGoogle() {
      if (!authInstance) throw new Error('Firebase not initialized');
      const provider = new GoogleAuthProvider();
      try {
        const cred = await signInWithPopup(authInstance, provider);
        await upsertUserProfile(cred.user);
        return cred.user;
      } catch (err) {
        // Fallback to redirect if popup is blocked
        const code = err?.code || '';
        if (code === 'auth/popup-blocked' || code === 'auth/cancelled-popup-request') {
          await signInWithRedirect(authInstance, provider);
          return; // redirecting
        }
        throw err;
      }
    },
    async resetPassword(email) {
      if (!authInstance) throw new Error('Firebase not initialized');
      await sendPasswordResetEmail(authInstance, email);
    },
    async signOut() {
      if (!authInstance) throw new Error('Firebase not initialized');
      await fbSignOut(authInstance);
    },
  }), [user, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
