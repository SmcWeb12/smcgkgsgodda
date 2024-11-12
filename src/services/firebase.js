// src/services/firebase.js

// Import specific Firebase services
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBdekrIdLYbrQzTxQa3Ti_4ZB-BDcbn7Ag",
  authDomain: "chat-app1-7206a.firebaseapp.com",
  databaseURL: "https://chat-app1-7206a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app1-7206a",
  storageBucket: "chat-app1-7206a.appspot.com",
  messagingSenderId: "1098228877013",
  appId: "1:1098228877013:web:89e0cad5d00945a007445c",
  measurementId: "G-KN80PZ4DN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and firestore services
export const auth = getAuth(app);
export const db = getFirestore(app);
