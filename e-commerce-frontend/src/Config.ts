type Config = {
    VITE_API_BASE_URL: string;
    VITE_KEYCLOAK_CLIENT_ID: string;
    VITE_KEYCLOAK_AUTHORITY: string;
    VITE_APP_WEBSOCKET_URL: string;
    /**
     * Visual search posts to POST /api/search/visual, which currently
     * exists only on the backend branch
     * feat/simplejwt-auth-and-visual-search and is not deployed. Off by
     * default, so /visual-search shows a "coming soon" notice rather than
     * failing against an endpoint that isn't there. Set
     * VITE_ENABLE_VISUAL_SEARCH=true once that endpoint is live.
     */
    VITE_ENABLE_VISUAL_SEARCH: boolean;
};

/** Env vars arrive as strings; only the literal "true" enables a flag. */
const asBool = (value: unknown): boolean =>
    typeof value === 'boolean'
        ? value
        : String(value ?? '').trim().toLowerCase() === 'true';

export function getConfig(): Config {
    const runtimeConfig = (window as any).RUNTIME_CONFIG || {};

    return {
        VITE_API_BASE_URL: runtimeConfig.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL,
        VITE_KEYCLOAK_CLIENT_ID: runtimeConfig.VITE_KEYCLOAK_CLIENT_ID || import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
        VITE_KEYCLOAK_AUTHORITY: runtimeConfig.VITE_KEYCLOAK_AUTHORITY || import.meta.env.VITE_KEYCLOAK_AUTHORITY,
        VITE_APP_WEBSOCKET_URL: runtimeConfig.VITE_APP_WEBSOCKET_URL || import.meta.env.VITE_APP_WEBSOCKET_URL,
        // ?? not || so an explicit `false` in RUNTIME_CONFIG is respected.
        VITE_ENABLE_VISUAL_SEARCH: asBool(
            runtimeConfig.VITE_ENABLE_VISUAL_SEARCH ?? import.meta.env.VITE_ENABLE_VISUAL_SEARCH,
        ),
    };
}
