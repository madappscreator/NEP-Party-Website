// src/lib/firebase.ts
// Bridge file to provide Firebase instances for services that need direct access
"use client";

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { firebaseConfig } from "@/firebase/config";

/**
 * Initialize Firebase safely (prevents duplicate apps)
 */
const app: FirebaseApp = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

/**
 * Auth instance (singleton)
 */
const auth: Auth = getAuth(app);

/**
 * Firestore instance (singleton)
 * Aliased as 'db' for compatibility with gallery-service and other modules
 */
const db: Firestore = getFirestore(app);

/**
 * Storage instance (singleton)
 */
const storage: FirebaseStorage = getStorage(app);

// Export Firebase config for modules that need the API key
export { firebaseConfig };

// Export all instances
export { app, auth, db, storage };

