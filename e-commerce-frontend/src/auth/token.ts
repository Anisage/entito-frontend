/**
 * In-memory access token store.
 *
 * The token deliberately does NOT live in localStorage or sessionStorage:
 * anything readable by JavaScript on the page is also readable by an XSS
 * payload, and an OIDC provider can re-issue silently on reload anyway.
 *
 * When Keycloak lands, its adapter should call setAuthToken() on login and
 * on every token refresh, and clearAuthToken() on logout. Nothing else in
 * the app needs to know where the token came from.
 */

let accessToken: string | null = null;

export const setAuthToken = (token: string | null): void => {
  accessToken = token;
};

export const getAuthToken = (): string | null => accessToken;

export const clearAuthToken = (): void => {
  accessToken = null;
};
