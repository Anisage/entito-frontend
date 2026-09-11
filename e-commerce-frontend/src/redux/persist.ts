/**
 * Keep the basket and the wishlist alive across page loads.
 *
 * Before this, both lived only in Redux - which is memory. Refreshing the
 * page, opening the site in a new tab, or being sent to sign in and coming
 * back all emptied the basket, and checkout then bounced the shopper to an
 * empty cart page. A shop that forgets what you put in your bag is a shop
 * you leave.
 *
 * Only the two slices a shopper builds up by hand are stored. Products,
 * categories, orders and search results are all re-fetched from the server,
 * and storing them would only mean showing stale prices.
 *
 * This is per-browser, not per-account: it never reaches the server, and it
 * is not shared between devices. Signing in on a laptop does not bring over
 * a basket filled on a phone. That is the normal behaviour for a shop this
 * size, and doing better means storing carts server-side - a bigger piece of
 * work, worth doing later.
 */

import type { CartState } from '../types/cart';
import type { WishlistState } from '../types/wishlist';

const KEY = 'entito.shop.v1';

// A basket kept for weeks is not a basket any more: the prices have moved,
// pieces have sold out, and the shopper has forgotten it exists. Two weeks
// is long enough to survive a holiday and short enough to stay honest.
const MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;

interface Envelope {
    savedAt: number;
    cart: CartState;
    wishlist: WishlistState;
}

const isFiniteNumber = (value: unknown): value is number =>
    typeof value === 'number' && Number.isFinite(value);

/**
 * Storage is untrusted input. It can hold whatever an older version of this
 * app wrote, whatever another tab wrote, or whatever someone typed into the
 * console - and a malformed basket that reaches a reducer crashes the whole
 * page on load, which is far worse than an empty basket. So check the shape
 * rather than trusting it, and throw the whole thing away if it disagrees.
 */
const isValidCart = (value: unknown): value is CartState => {
    const cart = (value as CartState)?.cart;
    if (!cart || !Array.isArray(cart.items)) return false;
    if (![cart.subtotal, cart.discount, cart.percentageDiscount,
          cart.deliveryFee, cart.totalAmount].every(isFiniteNumber)) return false;

    return cart.items.every((line) =>
        line
        && typeof line.item === 'object' && line.item !== null
        && isFiniteNumber(line.item.id)
        && typeof line.item.price === 'string'
        && typeof line.size === 'string'
        && typeof line.color === 'string'
        && isFiniteNumber(line.quantity) && line.quantity > 0
        && isFiniteNumber(line.total),
    );
};

const isValidWishlist = (value: unknown): value is WishlistState => {
    const items = (value as WishlistState)?.items;
    return Array.isArray(items) && items.every((item) => item && isFiniteNumber(item.id));
};

export const clearPersistedState = (): void => {
    try {
        window.localStorage.removeItem(KEY);
    } catch {
        /* nothing useful to do */
    }
};

/**
 * Read and validate storage once per page load. Both slices ask for their
 * own initial state as they are created, and re-reading and re-parsing for
 * each of them would be wasted work.
 */
const readOnce = (): Partial<Envelope> => {
    let raw: string | null;
    try {
        // Reading storage throws outright in a locked-down browser, so even
        // getItem needs the guard - not just the parse below.
        raw = window.localStorage.getItem(KEY);
    } catch {
        return {};
    }
    if (!raw) return {};

    try {
        const saved = JSON.parse(raw) as Envelope;
        if (!isFiniteNumber(saved?.savedAt)) return {};
        if (Date.now() - saved.savedAt > MAX_AGE_MS) {
            clearPersistedState();
            return {};
        }

        // Each half is judged on its own: a corrupt basket should not also
        // cost the shopper her wishlist.
        return {
            cart: isValidCart(saved.cart) ? saved.cart : undefined,
            wishlist: isValidWishlist(saved.wishlist) ? saved.wishlist : undefined,
        };
    } catch {
        // Unreadable means unusable. Drop it so the next load starts clean
        // instead of failing the same way forever.
        clearPersistedState();
        return {};
    }
};

let cached: Partial<Envelope> | null = null;
const saved = (): Partial<Envelope> => (cached ??= readOnce());

/**
 * The stored basket, or `undefined`. `isLoading` and `error` are reset:
 * a request that was in flight when the tab closed is not in flight now,
 * and restoring a stale error would show the shopper a failure that has
 * nothing to do with what she is currently doing.
 */
export const loadPersistedCart = (): CartState | undefined => {
    const cart = saved().cart;
    return cart && { ...cart, isLoading: false, error: null };
};

export const loadPersistedWishlist = (): WishlistState | undefined => {
    const wishlist = saved().wishlist;
    return wishlist && { ...wishlist, loading: false, error: null };
};

export const savePersistedState = (state: { cart: CartState; wishlist: WishlistState }): void => {
    try {
        window.localStorage.setItem(KEY, JSON.stringify({ ...state, savedAt: Date.now() }));
    } catch {
        // Full, disabled, or a private window. Saving the basket is a
        // convenience; failing to save it must never break the page.
    }
};
