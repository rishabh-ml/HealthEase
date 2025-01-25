// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9N7Q0Uk9y8zVug21VlAcjdrCcQy0587Q",
  authDomain: "healthease-a5a3c.firebaseapp.com",
  projectId: "healthease-a5a3c",
  storageBucket: "healthease-a5a3c.firebasestorage.app",
  messagingSenderId: "1084103186092",
  appId: "1:1084103186092:web:cbd6c64704c4cb20cb3109",
  measurementId: "G-SPL6F0LWEV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth
export const auth = getAuth(app);

// Export Firestore instance
export const db = getFirestore(app);

// Initialize Analytics (optional; if you're using it)
const analytics = getAnalytics(app);

// Default export (the app)
export default app;