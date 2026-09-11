import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../auth/AuthProvider';
import { authErrorMessage } from '../auth/errors';
import NotConfiguredNotice from '../components/auth/NotConfiguredNotice';

const Login = () => {
    const { signIn, signInWithGoogle, sendPasswordReset, configured } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    // Where the shopper was heading before being asked to sign in.
    const destination = (location.state as { from?: string } | null)?.from || '/';

    if (!configured) {
        return <NotConfiguredNotice />;
    }

    const run = async (action: () => Promise<void>) => {
        setError(null);
        setNotice(null);
        setBusy(true);
        try {
            await action();
            navigate(destination, { replace: true });
        } catch (err) {
            setError(authErrorMessage(err));
        } finally {
            setBusy(false);
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        run(() => signIn(email, password));
    };

    const handleReset = async () => {
        if (!email) {
            setError('Enter your email address first, then tap “Forgot password”.');
            return;
        }
        setError(null);
        try {
            await sendPasswordReset(email);
            setNotice(`If an account exists for ${email}, a reset link is on its way.`);
        } catch (err) {
            setError(authErrorMessage(err));
        }
    };

    return (
        <div className="max-w-md mx-auto px-6 py-16">
            <h1 className="text-3xl font-semibold mb-2">Sign in</h1>
            <p className="text-gray-600 mb-8">
                Sign in to see your orders and keep your wishlist across devices.
            </p>

            {error && (
                <p role="alert" className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
                    {error}
                </p>
            )}
            {notice && (
                <p className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
                    {notice}
                </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium">Email</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="rounded-lg border border-gray-300 px-4 py-3"
                    />
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium">Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="rounded-lg border border-gray-300 px-4 py-3"
                    />
                </label>

                <button
                    type="submit"
                    disabled={busy}
                    className="mt-2 rounded-full bg-black text-white font-medium px-6 py-3 disabled:opacity-60"
                >
                    {busy ? 'Signing in…' : 'Sign in'}
                </button>
            </form>

            <button
                type="button"
                onClick={handleReset}
                className="mt-3 text-sm text-gray-600 underline self-start"
            >
                Forgot password
            </button>

            <div className="flex items-center gap-3 my-7">
                <span className="h-px flex-1 bg-gray-200" />
                <span className="text-xs uppercase tracking-wider text-gray-500">or</span>
                <span className="h-px flex-1 bg-gray-200" />
            </div>

            <button
                type="button"
                onClick={() => run(signInWithGoogle)}
                disabled={busy}
                className="w-full rounded-full border border-gray-300 font-medium px-6 py-3 disabled:opacity-60"
            >
                Continue with Google
            </button>

            <p className="mt-8 text-sm text-gray-600">
                New here?{' '}
                <Link to="/register" className="underline font-medium">
                    Create an account
                </Link>
            </p>
        </div>
    );
};

export default Login;
