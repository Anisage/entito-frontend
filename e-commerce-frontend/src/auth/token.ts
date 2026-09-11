/**
 * Where the API layer gets its bearer token.
 *
 * The token is never written to localStorage or sessionStorage: anything
 * JavaScript on the page can read, an XSS payload can read too. Firebase
 * keeps the session itself and re-issues silently on reload, so there is
 * nothing we need to persist ourselves.
 *
 * Two ways in, and the async one is what should normally be used:
 *
 * - `setTokenProvider` registers a function that returns a *currently
 *   valid* token. AuthProvider registers Firebase's `getIdToken()`, which
 *   returns the cached token and transparently refreshes it when it is
 *   close to expiring. Because the axios request interceptor awaits this
 *   on every call, a request can never go out holding an hour-old token.
 *
 * - `setAuthToken` stores one token directly. Kept as a fallback for tests
 *   and for any caller that has a token but no provider.
 */

type TokenProvider = () => Promise<string | null>;

let accessToken: string | null = null;
let tokenProvider: TokenProvider | null = null;

/** Register the live token source. Pass null on sign-out. */
export const setTokenProvider = (provider: TokenProvider | null): void => {
    tokenProvider = provider;
};

export const setAuthToken = (token: string | null): void => {
    accessToken = token;
};

/** Synchronous read. Only sees what setAuthToken stored. */
export const getAuthToken = (): string | null => accessToken;

/**
 * The token to send with a request. Prefers the live provider, so an
 * expiring token is refreshed rather than replayed; falls back to whatever
 * setAuthToken last stored.
 */
export const resolveAuthToken = async (): Promise<string | null> => {
    if (tokenProvider) {
        try {
            return await tokenProvider();
        } catch {
            // A refresh can fail if the session was revoked. Fall through to
            // the stored token; the API will answer 401 and the response
            // interceptor will clear it.
            return accessToken;
        }
    }
    return accessToken;
};

export const clearAuthToken = (): void => {
    accessToken = null;
    tokenProvider = null;
};
