/**
 * The shop's stated policies, in one place.
 *
 * These were written separately into half a dozen components and had
 * drifted apart: the header promised 7-day returns while the Returns page
 * promised 14, and the Help Centre promised a third thing again. Whichever
 * a customer reads is the one she will hold Entito to, so they cannot be
 * allowed to disagree.
 *
 * ──────────────────────────────────────────────────────────────────────
 *  BABU: CONFIRM THESE. They are the values the site already showed most
 *  often, not policies Entito has signed off. Every one of them is a
 *  promise to a paying customer.
 * ──────────────────────────────────────────────────────────────────────
 */

/** Days from delivery in which a piece can be returned. */
export const RETURN_WINDOW_DAYS = 7;

/** Condition a returned piece has to be in. */
export const RETURN_CONDITION = 'unworn, with tags still attached';

/**
 * Who pays return postage. Left deliberately vague rather than promising
 * "free returns", which the old copy did and which costs real money on
 * every return from outside Nairobi.
 */
export const RETURNS_ARE_FREE = false;

/** Where Entito delivers. Delivery zones are configured in Django admin. */
export const DELIVERY_AREA = 'Kenya';

/**
 * How payment works today. Online payment is not connected: an order is
 * placed, then Entito contacts the customer to arrange payment, and only
 * then is it marked paid and fulfilled.
 */
export const PAYMENT_IS_MANUAL = true;
