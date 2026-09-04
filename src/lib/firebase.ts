// ============================================================================
// FIREBASE CONFIGURATION
// Replace these values with your Firebase project configuration.
// Get these from: Firebase Console → Project Settings → General → Your apps
// ============================================================================

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgEgUCYgVZvsH7D0IfzlFUEqfC3YCdPxI",
  authDomain: "shantivettom.firebaseapp.com",
  projectId: "shantivettom",
  storageBucket: "shantivettom.firebasestorage.app",
  messagingSenderId: "520274977843",
  appId: "1:520274977843:web:ee0cbd68919d23fad26f46",
  measurementId: "G-NEZBKDTX9Y",
};

// Initialize Firebase (prevent re-initialization in dev hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
