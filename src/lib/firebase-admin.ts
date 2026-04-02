// Lightweight shim for local builds/dev. Replace with real Firebase Admin SDK in production.
// WARNING: This file bypasses real authentication and Firestore access — use only for local UI testing.

export const admin: any = {
  auth: () => ({
    verifyIdToken: async (token: string) => {
      // Accept any token during local testing. Return a minimal payload.
      return Promise.resolve({ uid: 'shim-user' });
    }
  })
};

// Minimal placeholder for Firestore `db` required by code that calls `collection(db, ...)`.
export const db: any = {};
