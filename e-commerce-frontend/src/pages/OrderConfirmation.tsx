import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle2 } from 'lucide-react';

import { fetchOrders, selectOrders, selectOrdersLoading } from '../redux/slices/ordersSlice';
import { money } from '../utils/money';

/**
 * Shown straight after an order is placed.
 *
 * Reads the order from the store, but falls back to fetching: a shopper who
 * refreshes this page, or opens the link later from their order history,
 * has an empty store and should still see their order rather than an error.
 */
const OrderConfirmation = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const loading = useSelector(selectOrdersLoading);

    const order = orders.find((o) => String(o.id) === id);

    useEffect(() => {
        if (!order) dispatch(fetchOrders() as any);
    }, [dispatch, order]);

    if (!order) {
        return (
            <div className="max-w-2xl mx-auto px-6 py-24 text-center text-ink-muted">
                {loading ? 'Finding your order…' : 'We could not find that order.'}
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <CheckCircle2 size={40} className="mx-auto text-green-600 mb-4" aria-hidden="true" />
                <h1 className="font-display text-4xl text-ink-1 mb-2">Thank you</h1>
                <p className="text-ink-muted">
                    Your order <span className="text-ink-1 font-medium">#{order.id}</span> is in.
                    We&rsquo;ve sent a confirmation to your email.
                </p>
            </div>

            <div className="bg-surface border border-line-soft rounded-card-lg p-6 mb-6">
                <h2 className="text-sm uppercase tracking-wider text-ink-muted mb-4">What you ordered</h2>
                <ul className="divide-y divide-line">
                    {order.cart_items.map((item) => (
                        <li key={item.id} className="py-3 flex justify-between gap-4 text-sm">
                            <span className="text-ink-1">
                                {item.product_name}
                                <span className="text-ink-muted"> × {item.quantity}</span>
                                {item.description && item.description !== 'No description provided' && (
                                    <span className="block text-xs text-ink-muted">{item.description}</span>
                                )}
                            </span>
                            <span className="text-ink-1 tabular-nums">{money(item.line_total)}</span>
                        </li>
                    ))}
                </ul>

                <dl className="mt-5 pt-5 border-t border-line space-y-2 text-sm">
                    <Row label="Subtotal" value={money(order.subtotal)} />
                    {Number(order.discount) > 0 && (
                        <Row label="Discount" value={`− ${money(order.discount)}`} />
                    )}
                    <Row
                        label={order.delivery_method_detail?.name || 'Delivery'}
                        value={money(order.delivery_fee)}
                    />
                    <div className="flex justify-between pt-3 border-t border-line">
                        <dt className="font-medium text-ink-1">Total</dt>
                        <dd className="font-display text-2xl text-ink-1 tabular-nums">
                            {money(order.total_amount)}
                        </dd>
                    </div>
                </dl>
            </div>

            <div className="bg-surface border border-line-soft rounded-card-lg p-6 mb-8">
                <h2 className="text-sm uppercase tracking-wider text-ink-muted mb-3">Delivering to</h2>
                <p className="text-sm text-ink-1 whitespace-pre-line">
                    {order.shipping_full_name}
                    {'\n'}{order.shipping_address}
                    {'\n'}{order.shipping_city}{order.shipping_postal_code ? `, ${order.shipping_postal_code}` : ''}
                    {'\n'}{order.shipping_phone}
                </p>
            </div>

            <div className="flex flex-wrap gap-3">
                <Link to="/products" className="btn-pill btn-primary">Keep shopping</Link>
                <Link to="/account" className="btn-pill btn-light">View your orders</Link>
            </div>
        </div>
    );
};

const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between">
        <dt className="text-ink-muted">{label}</dt>
        <dd className="text-ink-1 tabular-nums">{value}</dd>
    </div>
);

export default OrderConfirmation;
