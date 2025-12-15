// src/lib/firebase.ts
"use client";

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

/**
 * 🔐 Firebase configuration
 * Replace these values with your Firebase project keys
 */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

/**
 * ✅ Initialize Firebase safely (prevents duplicate apps)
 */
const app: FirebaseApp = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

/**
 * ✅ Auth instance (singleton)
 */
const auth: Auth = getAuth(app);

/**
 * ✅ Storage instance (singleton)
 */
const storage: FirebaseStorage = getStorage(app);

export { app, auth, storage };
