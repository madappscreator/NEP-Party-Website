// src/firebase/firebase.ts
"use client";

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { firebaseConfig } from './config';

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
