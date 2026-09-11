import { getApp, getApps, initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';

import { getConfig } from '../Config';

/**
 * Firebase client setup.
 *
 * These values are NOT secrets. A Firebase web config ships inside the
 * JavaScript bundle by design and is visible to anyone who opens the page.
 * What protects the data is Firebase's auth rules plus this API's own
 * permission classes - not hiding the API key. The service-account private
 * key that the Django backend uses is a different thing entirely and must
 * never appear in frontend code.
 */
const { firebase: firebaseConfig } = getConfig();

/** True when enough config is present for Firebase to work at all. */
export const isFirebaseConfigured = Boolean(
    firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId,
);

/**
 * `auth` is null when Firebase is not configured, and every caller must
 * check. This is deliberate and was verified rather than assumed:
 * `initializeApp` tolerates an empty config, but `getAuth` throws
 * `auth/invalid-api-key` immediately. Calling it unconditionally at module
 * scope would therefore crash the entire app on import - taking down
 * browsing, the basket and everything else - rather than just disabling
 * sign-in. Guarding here keeps a missing env var to a broken login page.
 */
let firebaseAuth: Auth | null = null;

if (isFirebaseConfigured) {
    // getApps() guard: Vite's hot reload re-runs this module, and a second
    // initializeApp for the same name throws.
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    firebaseAuth = getAuth(app);
}

export const auth = firebaseAuth;

export const googleProvider = new GoogleAuthProvider();
