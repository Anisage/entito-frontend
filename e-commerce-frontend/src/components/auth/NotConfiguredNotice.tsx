import { Link } from 'react-router-dom';

/**
 * Shown on the auth pages when no Firebase web config is present.
 *
 * Without this the pages would throw on first render and take the whole
 * route down with them, which is a confusing way to discover that an env
 * var is missing. Browsing does not need Firebase, so the rest of the shop
 * keeps working.
 */
const NotConfiguredNotice = () => (
    <div className="max-w-md mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold mb-3">Accounts aren’t set up yet</h1>
        <p className="text-gray-600 mb-8">
            Signing in isn’t available on this deployment. You can still browse
            the collection and add things to your basket.
        </p>
        <Link
            to="/products"
            className="inline-block px-6 py-3 rounded-full bg-black text-white font-medium"
        >
            Browse the collection
        </Link>
        <p className="mt-10 text-xs text-gray-500">
            Developers: set the <code>VITE_FIREBASE_*</code> values in{' '}
            <code>.env</code> — see <code>.env.example</code>.
        </p>
    </div>
);

export default NotConfiguredNotice;
