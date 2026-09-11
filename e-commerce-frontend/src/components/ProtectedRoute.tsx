import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

import { useAuth } from '../auth/AuthProvider';

/**
 * Wrap a route that requires a signed-in shopper.
 *
 * While Firebase is still restoring a session we render nothing rather than
 * redirecting - otherwise a page refresh would bounce a signed-in user to
 * the login screen before Firebase had a chance to answer.
 *
 * The attempted path is passed along in location state so login can send
 * the user back where they were going.
 */
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, initialising } = useAuth();
    const location = useLocation();

    if (initialising) {
        return (
            <div className="max-w-2xl mx-auto px-6 py-24 text-center text-gray-500">
                Checking your session&hellip;
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
