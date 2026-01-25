// Firebase Configuration for Indiverse Heritage Platform
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJKynTCpGLTDjg4CT64wyDKvGQ4VNbGP0",
    authDomain: "heritage-35f8a.firebaseapp.com",
    databaseURL: "https://heritage-35f8a-default-rtdb.firebaseio.com",
    projectId: "heritage-35f8a",
    storageBucket: "heritage-35f8a.firebasestorage.app",
    messagingSenderId: "498926610639",
    appId: "1:498926610639:web:0049df16d7d9c8d12befba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;
