import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Auth, User as FirebaseUser } from 'firebase/auth';
import {
    createUserWithEmailAndPassword,
    onIdTokenChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut as firebaseSignOut,
    updateProfile,
} from 'firebase/auth';

import { auth, googleProvider, isFirebaseConfigured } from './firebase';
import { clearAuthToken, setAuthToken, setTokenProvider } from './token';

type AuthContextValue = {
    /** The signed-in Firebase user, or null. */
    user: FirebaseUser | null;
    /** True until Firebase has restored (or ruled out) an existing session. */
    initialising: boolean;
    configured: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, displayName?: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    sendPasswordReset: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Narrow `auth` to non-null for the action functions.
 *
 * The UI never reaches these while unconfigured - Login and Register return
 * NotConfiguredNotice first - so this should be unreachable. It throws a
 * readable error rather than a null-dereference if that ever stops being
 * true.
 */
const requireAuth = (): Auth => {
    if (!auth) {
        throw new Error(
            'Firebase is not configured: set the VITE_FIREBASE_* values in .env.',
        );
    }
    return auth;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [initialising, setInitialising] = useState(isFirebaseConfigured);

    useEffect(() => {
        if (!isFirebaseConfigured || !auth) {
            // No config: behave as a permanently signed-out app rather than
            // crashing every page. The login screen explains what is missing.
            setInitialising(false);
            return;
        }

        // onIdTokenChanged, not onAuthStateChanged: this also fires on every
        // silent token refresh (roughly hourly), which is what keeps the API
        // layer's token current instead of stale after an hour.
        const unsubscribe = onIdTokenChanged(auth, async (nextUser) => {
            setUser(nextUser);
            setInitialising(false);

            if (nextUser) {
                // getIdToken() returns the cached token and refreshes it when
                // it is near expiry, so this is the right thing for the axios
                // interceptor to await on every request.
                setTokenProvider(() => nextUser.getIdToken());
                setAuthToken(await nextUser.getIdToken());
            } else {
                clearAuthToken();
            }
        });

        return unsubscribe;
    }, []);

    const value = useMemo<AuthContextValue>(() => ({
        user,
        initialising,
        configured: isFirebaseConfigured,

        signIn: async (email, password) => {
            await signInWithEmailAndPassword(requireAuth(), email, password);
        },

        signUp: async (email, password, displayName) => {
            const credential = await createUserWithEmailAndPassword(requireAuth(), email, password);
            if (displayName) {
                // The backend splits displayName into first/last name when it
                // mirrors the user, so setting it here is what gives the
                // account a real name rather than just an email.
                await updateProfile(credential.user, { displayName });
                await credential.user.getIdToken(true); // refresh so the claim is in the token
            }
        },

        signInWithGoogle: async () => {
            await signInWithPopup(requireAuth(), googleProvider);
        },

        signOut: async () => {
            await firebaseSignOut(requireAuth());
            clearAuthToken();
        },

        sendPasswordReset: async (email) => {
            await sendPasswordResetEmail(requireAuth(), email);
        },
    }), [user, initialising]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside <AuthProvider>.');
    }
    return context;
};
