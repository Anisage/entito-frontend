import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CheckoutSteps from '../components/cart/CheckoutSteps';
import { useAuth } from '../auth/AuthProvider';
import { cartItems, clearCart } from '../redux/slices/cartSlice';
import {
    createOrder,
    fetchDeliveryZones,
    selectDeliveryZones,
    selectOrderSubmitting,
    selectOrdersError,
} from '../redux/slices/ordersSlice';
import { toOrderItem } from '../types/order';
import { money } from '../utils/money';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuth();

    const items = useSelector(cartItems);
    const zones = useSelector(selectDeliveryZones);
    const submitting = useSelector(selectOrderSubmitting);
    const error = useSelector(selectOrdersError);

    const [zoneId, setZoneId] = useState<number | null>(null);
    const [deliveryId, setDeliveryId] = useState<number | null>(null);
    const [form, setForm] = useState({
        shipping_full_name: '',
        shipping_phone: '',
        shipping_address: '',
        shipping_city: '',
        shipping_postal_code: '',
        delivery_notes: '',
    });

    useEffect(() => {
        dispatch(fetchDeliveryZones() as any);
    }, [dispatch]);

    // Prefill the name from the account, so a signed-in shopper isn't asked
    // for something we already know.
    useEffect(() => {
        if (user?.displayName) {
            setForm((f) => (f.shipping_full_name ? f : { ...f, shipping_full_name: user.displayName! }));
        }
    }, [user]);

    // Default to the first zone once they arrive.
    useEffect(() => {
        if (zoneId === null && zones.length > 0) setZoneId(zones[0].id);
    }, [zones, zoneId]);

    const selectedZone = zones.find((z) => z.id === zoneId) || null;
    const methods = selectedZone?.methods ?? [];

    // Whenever the area changes, re-pick the delivery method. Keeping the
    // old selection would be wrong twice over: the price differs by zone,
    // and the method may not reach the new one at all - the server would
    // reject it after the shopper had filled in everything else.
    useEffect(() => {
        if (methods.length === 0) {
            setDeliveryId(null);
            return;
        }
        if (deliveryId === null || !methods.some((m) => m.id === deliveryId)) {
            setDeliveryId(methods[0].id);
        }
    }, [methods, deliveryId]);

    // An empty basket has nothing to check out.
    useEffect(() => {
        if (items.length === 0) navigate('/cart', { replace: true });
    }, [items.length, navigate]);

    const selectedDelivery = methods.find((m) => m.id === deliveryId) || null;

    // Display only. The server recomputes all of this from the products and
    // the delivery method, and its answer is the one that counts - so if
    // these ever disagree, the server is right and this is the bug.
    const { subtotal, deliveryFee, total, itemCount } = useMemo(() => {
        const sub = items.reduce((sum, i) => sum + parseFloat(i.item.price) * i.quantity, 0);
        const fee = selectedDelivery ? parseFloat(selectedDelivery.price) : 0;
        return {
            subtotal: sub,
            deliveryFee: fee,
            total: sub + fee,
            itemCount: items.reduce((n, i) => n + i.quantity, 0),
        };
    }, [items, selectedDelivery]);

    const set = (field: keyof typeof form) => (e: { target: { value: string } }) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const result: any = await dispatch(createOrder({
            ...form,
            delivery_method: deliveryId,
            delivery_zone: zoneId,
            cart_items: items.map(toOrderItem),
        }) as any);

        // Match on the fulfilled action rather than sniffing for an error
        // field. Getting this wrong in the optimistic direction would empty
        // the basket and show a confirmation for an order that was never
        // created - the worst possible failure here.
        if (!createOrder.fulfilled.match(result)) return; // error renders from the store

        // Only now is the order really on the server.
        dispatch(clearCart());
        navigate(`/order-confirmation/${result.payload.id}`, { replace: true });
    };

    return (
        <div className="bg-page">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
                <div className="text-center mb-10">
                    <button
                        type="button"
                        onClick={() => navigate('/cart')}
                        className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink-1 mb-6"
                    >
                        <ArrowLeft size={14} /> Back to bag
                    </button>
                    <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight mb-6">Checkout</h1>
                    <CheckoutSteps currentStep={2} />
                </div>
            </section>

            <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
                    <div className="lg:col-span-2 space-y-10">
                        <section>
                            <StepHeading n={1} title="Where should we deliver?" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Field label="Full name" value={form.shipping_full_name} onChange={set('shipping_full_name')} required />
                                <Field label="Phone number" value={form.shipping_phone} onChange={set('shipping_phone')} type="tel" required placeholder="+254…" />
                                <Field label="Email" value={user?.email || ''} onChange={() => {}} type="email" readOnly hint="From your account" />
                                <Field label="Town or city" value={form.shipping_city} onChange={set('shipping_city')} required />
                                <div className="md:col-span-2">
                                    <Field label="Delivery address" value={form.shipping_address} onChange={set('shipping_address')} required placeholder="Estate, street, house or apartment number" />
                                </div>
                                <Field label="Postal code" value={form.shipping_postal_code} onChange={set('shipping_postal_code')} hint="Optional" />
                                <Field label="Notes for the rider" value={form.delivery_notes} onChange={set('delivery_notes')} hint="Optional" />
                            </div>
                        </section>

                        <section>
                            <StepHeading n={2} title="Delivery" />
                            {zones.length === 0 ? (
                                <p className="text-sm text-ink-muted">Loading delivery options…</p>
                            ) : (
                              <>
                                <label className="block mb-5">
                                    <span className="block text-xs text-ink-muted mb-1">Delivery area</span>
                                    <select
                                        value={zoneId ?? ''}
                                        onChange={(e) => setZoneId(Number(e.target.value))}
                                        className="w-full px-4 py-3 bg-surface border border-line rounded-card text-sm text-ink-1 focus:outline-none focus:border-ink-1"
                                    >
                                        {zones.map((zone) => (
                                            <option key={zone.id} value={zone.id}>{zone.name}</option>
                                        ))}
                                    </select>
                                    {selectedZone?.description && (
                                        <span className="block text-xs text-ink-muted mt-1.5">
                                            {selectedZone.description}
                                        </span>
                                    )}
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {methods.map((method) => {
                                        const active = method.id === deliveryId;
                                        return (
                                            <button
                                                type="button"
                                                key={method.id}
                                                onClick={() => setDeliveryId(method.id)}
                                                aria-pressed={active}
                                                className={`text-left p-4 rounded-card border transition-colors ${
                                                    active ? 'border-ink-1 bg-surface-2' : 'border-line bg-surface hover:border-ink-1/40'
                                                }`}
                                            >
                                                <span className="block text-sm font-medium text-ink-1">{method.name}</span>
                                                <span className="block text-xs text-ink-muted mt-0.5">{method.description}</span>
                                                <span className="block text-sm text-ink-1 mt-2 tabular-nums">{money(method.price)}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                                {methods.length === 0 && (
                                    <p className="text-sm text-ink-muted">
                                        We don&rsquo;t deliver to that area yet. Try another, or
                                        get in touch and we&rsquo;ll see what we can do.
                                    </p>
                                )}
                              </>
                            )}
                        </section>

                        <section>
                            <StepHeading n={3} title="Payment" />
                            <div className="flex gap-3 bg-surface-2 border border-line rounded-card p-4">
                                <Info size={18} className="text-ink-muted shrink-0 mt-0.5" aria-hidden="true" />
                                <p className="text-sm text-ink-muted">
                                    Online payment isn&rsquo;t available yet. Place your order and
                                    we&rsquo;ll be in touch to arrange payment and confirm delivery.
                                </p>
                            </div>
                        </section>
                    </div>

                    <aside className="bg-surface border border-line-soft rounded-card-lg p-6 self-start lg:sticky lg:top-28">
                        <p className="text-center font-display text-3xl text-ink-1 mb-6">
                            {itemCount} {itemCount === 1 ? 'item' : 'items'}
                        </p>

                        <ul className="space-y-3 text-sm mb-5">
                            {items.map((line, i) => (
                                <li key={`${line.item.id}-${line.size}-${line.color}-${i}`} className="flex justify-between gap-3">
                                    <span className="text-ink-muted">
                                        {line.item.name}
                                        <span className="text-ink-muted"> × {line.quantity}</span>
                                    </span>
                                    <span className="text-ink-1 tabular-nums shrink-0">
                                        {money(parseFloat(line.item.price) * line.quantity)}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="space-y-3 text-sm border-t border-line pt-4">
                            <div className="flex justify-between">
                                <span className="text-ink-muted">Subtotal</span>
                                <span className="text-ink-1 tabular-nums">{money(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-ink-muted">{selectedDelivery?.name || 'Delivery'}</span>
                                <span className="text-ink-1 tabular-nums">{money(deliveryFee)}</span>
                            </div>
                        </div>

                        <div className="border-t border-line my-5 pt-4 flex justify-between items-baseline">
                            <span className="font-medium text-ink-1">Total</span>
                            <span className="font-display text-3xl text-ink-1 tabular-nums">{money(total)}</span>
                        </div>

                        {error && (
                            <p role="alert" className="mb-4 rounded-card bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={submitting || deliveryId === null}
                            className="w-full btn-pill btn-primary py-4 disabled:opacity-60"
                        >
                            {submitting ? 'Placing your order…' : 'Place order'}
                            {!submitting && <ArrowRight size={16} />}
                        </button>
                    </aside>
                </div>
            </form>
        </div>
    );
};

const StepHeading = ({ n, title }: { n: number; title: string }) => (
    <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-8 rounded-full bg-ink-1 text-white text-xs font-medium flex items-center justify-center">{n}</span>
        <h2 className="text-lg font-medium text-ink-1">{title}</h2>
    </div>
);

const Field = ({ label, value, onChange, type = 'text', required, readOnly, hint, placeholder }: {
    label: string;
    value: string;
    onChange: (e: { target: { value: string } }) => void;
    type?: string;
    required?: boolean;
    readOnly?: boolean;
    hint?: string;
    placeholder?: string;
}) => (
    <label className="block">
        <span className="block text-xs text-ink-muted mb-1">
            {label}
            {hint && <span className="ml-1 text-ink-muted/70">· {hint}</span>}
        </span>
        <input
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            readOnly={readOnly}
            placeholder={placeholder}
            className={`w-full px-4 py-3 bg-surface border border-line rounded-card text-sm focus:outline-none focus:border-ink-1 transition-colors ${
                readOnly ? 'text-ink-muted cursor-not-allowed' : 'text-ink-1'
            }`}
        />
    </label>
);

export default Checkout;
