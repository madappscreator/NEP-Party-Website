
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // Fallback to the bucket provided by the user if env var is missing
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "studio-8928688313-be767.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate required Firebase environment variables (only on client side)
export function validateFirebaseConfig() {
  if (typeof window === 'undefined') {
    return; // Skip validation on server side
  }

  const requiredEnvVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID'
  ];

  // Debug: Log what we find
  console.log('🔍 Checking Firebase environment variables:');
  requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    console.log(`${varName}: ${value ? '✅ Set' : '❌ Missing'} ${value ? '(length: ' + value.length + ')' : ''}`);
  });

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    const errorMsg = `Missing required Firebase environment variables: ${missingVars.join(', ')}. ` +
      `Please check your .env.local file and ensure all Firebase config variables are set correctly.`;
    console.error('❌ Firebase Config Error:', errorMsg);
    // Don't throw error, just log it and return false
    return false;
  }

  console.log('✅ All Firebase environment variables are set correctly');
  return true;
}
