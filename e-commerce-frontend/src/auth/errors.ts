/**
 * Turn Firebase's error codes into something a shopper can act on.
 *
 * Sign-in failures deliberately do not say whether the email exists -
 * that would let anyone enumerate customer accounts.
 */
const MESSAGES: Record<string, string> = {
    'auth/invalid-credential': 'That email and password don’t match. Please try again.',
    'auth/invalid-email': 'That doesn’t look like a valid email address.',
    'auth/user-not-found': 'That email and password don’t match. Please try again.',
    'auth/wrong-password': 'That email and password don’t match. Please try again.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/email-already-in-use': 'There’s already an account with that email. Try signing in instead.',
    'auth/weak-password': 'Please choose a password of at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Please wait a few minutes and try again.',
    'auth/network-request-failed': 'We couldn’t reach the server. Check your connection and try again.',
    'auth/popup-closed-by-user': 'The Google sign-in window closed before finishing.',
    'auth/popup-blocked': 'Your browser blocked the sign-in window. Allow pop-ups and try again.',
    'auth/operation-not-allowed': 'This sign-in method isn’t enabled for this site yet.',
};

export const authErrorMessage = (error: unknown): string => {
    const code = (error as { code?: string } | null)?.code;
    if (code && MESSAGES[code]) {
        return MESSAGES[code];
    }
    return 'Something went wrong. Please try again.';
};
