import { useDispatch, useSelector } from 'react-redux';
import { Sparkles, Trash2, Plus } from 'lucide-react';
import { addToWishlist, clearWishlist } from '../../redux/store/wishlistSlice';
import { sampleWishlistItems } from '../../utils/sampleWishlistData';
import type { RootState } from '../../redux/store';

const WishlistDemo: React.FC = () => {
  const dispatch = useDispatch();
  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.items.length
  );

  const handleAddSampleItems = () => {
    sampleWishlistItems.forEach((item) => {
      dispatch(
        addToWishlist({
          ...item,
          dateAdded: new Date().toISOString(),
        })
      );
    });
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  return (
    <div className="bg-surface-2 border border-line-soft rounded-card p-5 mb-8 flex flex-col md:flex-row md:items-center gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
          <Sparkles size={14} className="text-ink-1" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink-1">Demo controls</p>
          <p className="text-xs text-ink-muted truncate">
            Wishlist has {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'}.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end md:self-auto">
        <button
          onClick={handleAddSampleItems}
          className="btn-pill btn-ghost text-xs px-4 py-2"
        >
          <Plus size={14} />
          Add samples
        </button>
        {wishlistCount > 0 && (
          <button
            onClick={handleClearWishlist}
            className="btn-pill text-xs px-4 py-2 bg-coral-soft text-coral hover:bg-coral hover:text-white transition-colors"
          >
            <Trash2 size={14} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default WishlistDemo;
