type FirebaseConfig = {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
};

type Config = {
    VITE_API_BASE_URL: string;
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
    /**
     * Firebase web config. These are public values - they ship inside the
     * JS bundle and anyone can read them. The backend's service-account
     * private key is the actual secret and never appears here.
     */
    firebase: FirebaseConfig;
};

/** Env vars arrive as strings; only the literal "true" enables a flag. */
const asBool = (value: unknown): boolean =>
    typeof value === 'boolean'
        ? value
        : String(value ?? '').trim().toLowerCase() === 'true';

export function getConfig(): Config {
    const runtimeConfig = (window as any).RUNTIME_CONFIG || {};

    /** Runtime override first (injected at deploy time), then build-time env. */
    const read = (key: string): string =>
        runtimeConfig[key] || import.meta.env[key] || '';

    return {
        VITE_API_BASE_URL: read('VITE_API_BASE_URL'),
        VITE_APP_WEBSOCKET_URL: read('VITE_APP_WEBSOCKET_URL'),
        // ?? not || so an explicit `false` in RUNTIME_CONFIG is respected.
        VITE_ENABLE_VISUAL_SEARCH: asBool(
            runtimeConfig.VITE_ENABLE_VISUAL_SEARCH ?? import.meta.env.VITE_ENABLE_VISUAL_SEARCH,
        ),
        firebase: {
            apiKey: read('VITE_FIREBASE_API_KEY'),
            authDomain: read('VITE_FIREBASE_AUTH_DOMAIN'),
            projectId: read('VITE_FIREBASE_PROJECT_ID'),
            storageBucket: read('VITE_FIREBASE_STORAGE_BUCKET'),
            messagingSenderId: read('VITE_FIREBASE_MESSAGING_SENDER_ID'),
            appId: read('VITE_FIREBASE_APP_ID'),
        },
    };
}
