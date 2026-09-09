import React from 'react';
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  removeFromWishlist,
  selectWishlistItemsFromRoot,
} from '../../redux/store/wishlistSlice';
import type { AppDispatch } from '../../redux/store';
import type { WishlistItem } from '../../types/wishlist';

interface WishlistButtonProps {
  item: Omit<WishlistItem, 'dateAdded'>;
  className?: string;
  size?: number;
  showTooltip?: boolean;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  item,
  className = '',
  size = 18,
  showTooltip = true,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlistItems = useSelector(selectWishlistItemsFromRoot);

  const isInWishlist = wishlistItems.some((w) => w?.id === item.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(item.id));
    } else {
      dispatch(
        addToWishlist({
          ...item,
          dateAdded: new Date().toISOString(),
        })
      );
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      className={`transition-all duration-200 hover:scale-105 ${className}`}
      title={showTooltip ? (isInWishlist ? 'Remove from wishlist' : 'Add to wishlist') : undefined}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        size={size}
        className={`transition-colors duration-200 ${
          isInWishlist ? 'text-coral fill-coral' : 'text-ink-1'
        }`}
      />
    </button>
  );
};

export default WishlistButton;
