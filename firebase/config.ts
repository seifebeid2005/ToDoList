// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAGcwiKHZcO38Aayw3LruFjraSj36mboD0",
  authDomain: "gamefordrawing.firebaseapp.com",
  databaseURL:
    "https://gamefordrawing-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gamefordrawing",
  storageBucket: "gamefordrawing.firebasestorage.app",
  messagingSenderId: "634189758781",
  appId: "1:634189758781:web:88b03f79e1ee4f88cf8554",
  measurementId: "G-9HHXTH3FGE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
