import React from 'react';
import { Plus } from 'lucide-react';
import type { Product } from '../types/product';
import { useNavigate } from 'react-router-dom';
import WishlistButton from './wishlist/WishlistButton';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { addItemToCart } from '../redux/slices/cartSlice';

interface ProductDetailCardProps {
  product: Product;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(addItemToCart({
      item: product,
      size: product.sizes ? product.sizes[0] : 'M',
      color: product.colors ? product.colors[0] : 'Default',
      quantity: 1,
      totalDiscount: product.discount ? product.discount : 0,
      percentageDiscount: product.discount_percentage ? product.discount_percentage : 0,
      total: parseFloat(product.price),
    }));
  };

  const hasDiscount = product.discount_percentage && product.original_price;

  return (
    <article
      className="group relative cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image well */}
      <div className="relative aspect-[4/5] rounded-card overflow-hidden bg-surface-2">
        <img
          src={product.main_image?.image || '/assets/images/cargo-pants.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top-left tag */}
        {hasDiscount ? (
          <span className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-coral text-white text-[11px] font-medium">
            -{product.discount_percentage}%
          </span>
        ) : (
          <span className="absolute top-3 left-3 chip bg-white/95 backdrop-blur">
            New
          </span>
        )}

        {/* Wishlist */}
        <div
          className="absolute top-3 right-3"
          onClick={(e) => e.stopPropagation()}
        >
          <WishlistButton
            item={product}
            className="bg-white/95 backdrop-blur text-ink-1 hover:bg-white shadow-sm w-9 h-9 flex items-center justify-center rounded-full"
            size={16}
          />
        </div>

        {/* Quick-add (appears on hover) */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-ink-1 text-white flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-lg"
          aria-label="Add to cart"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Meta */}
      <div className="pt-4 px-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-medium text-ink-1 text-[15px] leading-snug line-clamp-1">
            {product.name}
          </h3>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-ink-1 font-medium text-[15px] whitespace-nowrap">
              Ksh {product.price}
            </span>
            {hasDiscount && (
              <span className="text-ink-muted text-xs line-through">
                Ksh {product.original_price}
              </span>
            )}
          </div>
        </div>
        <p className="text-xs text-ink-muted mt-1 line-clamp-1">
          {product.brand || product.category_name || 'BR.F Essentials'}
        </p>

        {/* Color swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-3">
            {product.colors.slice(0, 4).map((color, i) => (
              <span
                key={i}
                className="w-3.5 h-3.5 rounded-full border border-line"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[11px] text-ink-muted ml-1">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductDetailCard;
