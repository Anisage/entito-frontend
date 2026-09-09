import { Trash2, Plus, Minus } from 'lucide-react';
import type { CartItemType } from '../../types/cart';
import type React from 'react';

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (id: number, newQuantity: number) => void;
  removeItem: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, removeItem }) => {
  return (
    <article className="bg-surface border border-line-soft rounded-card p-4 flex gap-4">
      {/* Image */}
      <div className="w-24 h-28 rounded-xl overflow-hidden bg-surface-2 shrink-0">
        <img
          src={item.item.main_image?.image || '/assets/images/cargo-pants.jpg'}
          alt={item.item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-medium text-ink-1 leading-snug line-clamp-1">
              {item.item.name}
            </h3>
            <p className="text-xs text-ink-muted mt-1">
              {item.item.brand || 'BR.F'} · Size {item.size} · {item.color}
            </p>
          </div>
          <button
            onClick={() => removeItem(item.item.id)}
            className="w-9 h-9 rounded-full bg-surface-3 hover:bg-coral-soft hover:text-coral text-ink-muted flex items-center justify-center transition-colors shrink-0"
            aria-label="Remove"
          >
            <Trash2 size={14} />
          </button>
        </div>

        <div className="flex items-end justify-between gap-3 mt-auto pt-3">
          <span className="font-medium text-ink-1">Ksh {item.item.price}</span>
          <div className="flex items-center bg-surface-3 rounded-full p-1">
            <button
              onClick={() => updateQuantity(item.item.id, item.quantity - 1)}
              className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartItem;
