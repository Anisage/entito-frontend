import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from '../auth/AuthProvider';
import {
    fetchOrders,
    selectOrders,
    selectOrdersError,
    selectOrdersLoading,
} from '../redux/slices/ordersSlice';
import { money } from '../utils/money';
import type { Order } from '../types/order';

/** Colour the status so it reads at a glance rather than as another word. */
const STATUS_STYLES: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-800 border-amber-200',
    processing: 'bg-blue-50 text-blue-800 border-blue-200',
    completed: 'bg-green-50 text-green-800 border-green-200',
    failed: 'bg-red-50 text-red-800 border-red-200',
};

const Account = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orders = useSelector(selectOrders);
    const loading = useSelector(selectOrdersLoading);
    const error = useSelector(selectOrdersError);

    useEffect(() => {
        dispatch(fetchOrders() as any);
    }, [dispatch]);

    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="font-display text-4xl text-ink-1 mb-8">Your account</h1>

            <dl className="flex flex-col gap-4 mb-12">
                {user?.displayName && (
                    <div className="flex flex-col gap-0.5">
                        <dt className="text-xs uppercase tracking-wider text-ink-muted">Name</dt>
                        <dd className="text-base text-ink-1">{user.displayName}</dd>
                    </div>
                )}
                <div className="flex flex-col gap-0.5">
                    <dt className="text-xs uppercase tracking-wider text-ink-muted">Email</dt>
                    <dd className="text-base text-ink-1">{user?.email}</dd>
                </div>
                {user && !user.emailVerified && (
                    <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-card px-4 py-3">
                        Your email isn&rsquo;t verified yet.
                    </p>
                )}
            </dl>

            <section>
                <h2 className="font-display text-2xl text-ink-1 mb-5">Your orders</h2>

                {error && (
                    <p role="alert" className="rounded-card bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 mb-4">
                        {error}
                    </p>
                )}

                {loading && orders.length === 0 && (
                    <p className="text-sm text-ink-muted">Loading your orders…</p>
                )}

                {!loading && orders.length === 0 && !error && (
                    <div className="bg-surface border border-line-soft rounded-card-lg p-8 text-center">
                        <p className="text-ink-1">You haven&rsquo;t ordered anything yet.</p>
                        <Link to="/products" className="btn-pill btn-primary mt-5 inline-flex">
                            Browse the collection
                        </Link>
                    </div>
                )}

                <ul className="space-y-4">
                    {orders.map((order) => <OrderRow key={order.id} order={order} />)}
                </ul>
            </section>

            <button
                type="button"
                onClick={async () => {
                    await signOut();
                    navigate('/', { replace: true });
                }}
                className="mt-12 btn-pill btn-light"
            >
                Sign out
            </button>
        </div>
    );
};

const OrderRow = ({ order }: { order: Order }) => {
    const itemCount = order.cart_items.reduce((n, i) => n + i.quantity, 0);
    const placed = new Date(order.created_at).toLocaleDateString('en-KE', {
        day: 'numeric', month: 'long', year: 'numeric',
    });

    return (
        <li className="bg-surface border border-line-soft rounded-card-lg p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                    <p className="text-ink-1 font-medium">Order #{order.id}</p>
                    <p className="text-xs text-ink-muted mt-0.5">{placed}</p>
                </div>
                <span
                    className={`text-xs px-3 py-1 rounded-full border capitalize ${
                        STATUS_STYLES[order.status] || 'bg-surface-2 text-ink-muted border-line'
                    }`}
                >
                    {order.status}
                </span>
            </div>

            <ul className="text-sm space-y-1 mb-4">
                {order.cart_items.map((item) => (
                    <li key={item.id} className="flex justify-between gap-4">
                        <span className="text-ink-muted">
                            {item.product_name}
                            <span> × {item.quantity}</span>
                        </span>
                        <span className="text-ink-1 tabular-nums shrink-0">{money(item.line_total)}</span>
                    </li>
                ))}
            </ul>

            <div className="flex flex-wrap items-baseline justify-between gap-2 pt-3 border-t border-line">
                <span className="text-xs text-ink-muted">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    {order.delivery_method_detail && ` · ${order.delivery_method_detail.name}`}
                </span>
                <span className="font-medium text-ink-1 tabular-nums">{money(order.total_amount)}</span>
            </div>
        </li>
    );
};

export default Account;
