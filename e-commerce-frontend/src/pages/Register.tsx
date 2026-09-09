import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../auth/AuthProvider';
import { authErrorMessage } from '../auth/errors';
import NotConfiguredNotice from '../components/auth/NotConfiguredNotice';

const Register = () => {
    const { signUp, signInWithGoogle, configured } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    if (!configured) {
        return <NotConfiguredNotice />;
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        // Checked here as well as by Firebase: a mismatch is our rule, not
        // theirs, and Firebase's 6-character minimum is worth stating up
        // front rather than as a failed round trip.
        if (password !== confirm) {
            setError('Those passwords don’t match.');
            return;
        }
        if (password.length < 6) {
            setError('Please choose a password of at least 6 characters.');
            return;
        }

        setError(null);
        setBusy(true);
        try {
            await signUp(email, password, name.trim() || undefined);
            navigate('/', { replace: true });
        } catch (err) {
            setError(authErrorMessage(err));
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="max-w-md mx-auto px-6 py-16">
            <h1 className="text-3xl font-semibold mb-2">Create an account</h1>
            <p className="text-gray-600 mb-8">
                Keep track of your orders, save your wishlist, and check out faster.
            </p>

            {error && (
                <p role="alert" className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium">Full name</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        className="rounded-lg border border-gray-300 px-4 py-3"
                    />
                </label>

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
                        autoComplete="new-password"
                        className="rounded-lg border border-gray-300 px-4 py-3"
                    />
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium">Confirm password</span>
                    <input
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                        autoComplete="new-password"
                        className="rounded-lg border border-gray-300 px-4 py-3"
                    />
                </label>

                <button
                    type="submit"
                    disabled={busy}
                    className="mt-2 rounded-full bg-black text-white font-medium px-6 py-3 disabled:opacity-60"
                >
                    {busy ? 'Creating your account…' : 'Create account'}
                </button>
            </form>

            <div className="flex items-center gap-3 my-7">
                <span className="h-px flex-1 bg-gray-200" />
                <span className="text-xs uppercase tracking-wider text-gray-500">or</span>
                <span className="h-px flex-1 bg-gray-200" />
            </div>

            <button
                type="button"
                onClick={async () => {
                    setError(null);
                    setBusy(true);
                    try {
                        await signInWithGoogle();
                        navigate('/', { replace: true });
                    } catch (err) {
                        setError(authErrorMessage(err));
                    } finally {
                        setBusy(false);
                    }
                }}
                disabled={busy}
                className="w-full rounded-full border border-gray-300 font-medium px-6 py-3 disabled:opacity-60"
            >
                Continue with Google
            </button>

            <p className="mt-8 text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="underline font-medium">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default Register;
