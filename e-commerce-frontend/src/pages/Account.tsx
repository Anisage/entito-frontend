import { useNavigate } from 'react-router-dom';

import { useAuth } from '../auth/AuthProvider';

/**
 * Minimal signed-in page.
 *
 * Deliberately small: it exists so the sign-in loop is complete and
 * verifiable end to end (protected route -> live token -> sign out). Order
 * history goes here once the orders endpoint is wired up - GET /api/orders/
 * already filters to the signed-in user server-side.
 */
const Account = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="max-w-md mx-auto px-6 py-16">
            <h1 className="text-3xl font-semibold mb-8">Your account</h1>

            <dl className="flex flex-col gap-4 mb-10">
                {user?.displayName && (
                    <div className="flex flex-col gap-0.5">
                        <dt className="text-xs uppercase tracking-wider text-gray-500">Name</dt>
                        <dd className="text-base">{user.displayName}</dd>
                    </div>
                )}
                <div className="flex flex-col gap-0.5">
                    <dt className="text-xs uppercase tracking-wider text-gray-500">Email</dt>
                    <dd className="text-base">{user?.email}</dd>
                </div>
                {user && !user.emailVerified && (
                    <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                        Your email isn’t verified yet.
                    </p>
                )}
            </dl>

            <p className="text-sm text-gray-600 mb-8">
                Your order history will appear here.
            </p>

            <button
                type="button"
                onClick={async () => {
                    await signOut();
                    navigate('/', { replace: true });
                }}
                className="rounded-full border border-gray-300 font-medium px-6 py-3"
            >
                Sign out
            </button>
        </div>
    );
};

export default Account;
