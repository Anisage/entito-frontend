/**
 * What to show in a product's image well when the piece has no photograph.
 *
 * Every card used to fall back to `/assets/images/cargo-pants.jpg` - a stock
 * shot of men's cargo trousers and trainers. On a shop that sells only
 * Entito's ladies' clothing, that is worse than showing nothing: a shopper
 * sees a garment, believes it is the one she is buying, and it is not even
 * womenswear.
 *
 * So the fallback is deliberately not a photograph. It reads as "no photo
 * yet" rather than impersonating one, which is also the honest signal while
 * Entito's real photography is still being shot.
 */
const ProductImagePlaceholder = ({ label }: { label?: string }) => (
    <div
        className="w-full h-full flex flex-col items-center justify-center gap-2 bg-surface-2 text-ink-muted"
        role="img"
        aria-label={label ? `No photograph yet for ${label}` : 'No photograph yet'}
    >
        <svg
            width="34" height="34" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true" className="opacity-50"
        >
            {/* A hanger: the one shape that reads as "garment" without
                claiming to be any particular garment. */}
            <path d="M12 5.5a2 2 0 1 1 2 2c-1.2 0-2 .8-2 2" />
            <path d="M12 9.5 3.6 15.2a1.4 1.4 0 0 0 .8 2.55h15.2a1.4 1.4 0 0 0 .8-2.55L12 9.5Z" />
        </svg>
        <span className="text-[11px] tracking-wide uppercase opacity-70">Photo coming soon</span>
    </div>
);

export default ProductImagePlaceholder;
