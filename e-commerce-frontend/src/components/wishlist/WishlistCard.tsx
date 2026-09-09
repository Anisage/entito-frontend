import React from 'react';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromWishlist } from '../../redux/store/wishlistSlice';
import type { WishlistItem } from '../../types/wishlist';

interface WishlistCardProps {
  item: WishlistItem;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeFromWishlist(item.id));
  };

  const origPrice = Number(item.original_price);
  const currentPrice = Number(item.price);
  const discountPercentage =
    isFinite(origPrice) && origPrice > 0
      ? Math.round(((origPrice - currentPrice) / origPrice) * 100)
      : 0;

  return (
    <article className="group relative cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
      <div className="relative aspect-[4/5] rounded-card overflow-hidden bg-surface-2">
        <img
          src={item.main_image?.image || '/assets/images/cargo-pants.jpg'}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {discountPercentage > 0 && (
          <span className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-coral text-white text-[11px] font-medium">
            -{discountPercentage}%
          </span>
        )}

        <button
          onClick={handleRemoveFromWishlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-sm hover:bg-coral-soft transition-colors"
        >
          <Heart size={14} className="text-coral fill-coral" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${item.id}`);
          }}
          className="absolute bottom-3 left-3 right-3 px-4 py-2.5 rounded-full bg-ink-1 text-white text-xs font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all flex items-center justify-center gap-2"
        >
          <Eye size={14} /> View product
        </button>

        {!(item.units_in_stock > 0) && (
          <div className="absolute inset-0 bg-ink-1/50 flex items-center justify-center">
            <span className="chip bg-white">Out of stock</span>
          </div>
        )}
      </div>

      <div className="pt-4 px-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium text-ink-1 text-[15px] leading-snug line-clamp-1">
            {item.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-ink-muted shrink-0">
            <Star size={12} className="text-sun fill-sun" /> {item.rating || 0}
          </div>
        </div>
        <p className="text-xs text-ink-muted mt-1 line-clamp-1">
          {item.brand || item.category_name || 'BR.F Essentials'}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-ink-1">Ksh {item.price}</span>
            {item.original_price && Number(item.original_price) > Number(item.price) && (
              <span className="text-xs text-ink-muted line-through">
                Ksh {item.original_price}
              </span>
            )}
          </div>
          <button
            disabled={!(item.units_in_stock > 0)}
            onClick={(e) => e.stopPropagation()}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              item.units_in_stock > 0
                ? 'bg-ink-1 text-white hover:bg-ink-2'
                : 'bg-surface-3 text-ink-muted cursor-not-allowed'
            }`}
            aria-label="Add to cart"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default WishlistCard;
