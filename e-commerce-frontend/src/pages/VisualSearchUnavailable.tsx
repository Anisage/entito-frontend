import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

/**
 * Stand-in for /visual-search while the feature is switched off.
 *
 * Visual search needs POST /api/search/visual, which lives only on the
 * backend branch feat/simplejwt-auth-and-visual-search. Six places link
 * to /visual-search (the home hero and its CTA, Help Centre, Lookbook,
 * Size Guide), so the route has to stay and land somewhere sensible -
 * removing it would drop all six onto a blank screen, since the router
 * has no catch-all.
 *
 * Set VITE_ENABLE_VISUAL_SEARCH=true to serve the real page instead.
 */
const VisualSearchUnavailable = () => (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 mb-6">
            <Sparkles size={24} className="text-gray-500" aria-hidden="true" />
        </span>
        <h1 className="text-3xl font-semibold mb-3">Visual search is coming soon</h1>
        <p className="text-gray-600 mb-8">
            Soon you'll be able to search the collection with a photo instead of
            words. It isn't ready yet &mdash; in the meantime you can browse
            everything by category, size and colour.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
            <Link
                to="/products"
                className="px-6 py-3 rounded-full bg-black text-white font-medium"
            >
                Browse the collection
            </Link>
            <Link
                to="/lookbook"
                className="px-6 py-3 rounded-full border border-gray-300 font-medium"
            >
                See the lookbook
            </Link>
        </div>
    </div>
);

export default VisualSearchUnavailable;
