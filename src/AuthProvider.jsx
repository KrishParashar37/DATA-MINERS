import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    sendEmailVerification,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from 'firebase/auth';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Sign in with email and password
    const signIn = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);

        // Check if email is verified
        if (!result.user.emailVerified) {
            throw { code: 'auth/email-not-verified', message: 'Please verify your email before logging in.' };
        }

        return result;
    };

    // Sign up with email and password
    const signUp = async (email, password) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);

        // Send email verification
        await sendEmailVerification(result.user);

        // Sign out immediately - they need to verify email first
        await firebaseSignOut(auth);

        return result;
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        return result;
    };

    // Reset password
    const resetPassword = async (email) => {
        await sendPasswordResetEmail(auth, email);
        return true;
    };

    // Sign out
    const signOut = async () => {
        await firebaseSignOut(auth);
    };

    const value = {
        user,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        resetPassword,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
