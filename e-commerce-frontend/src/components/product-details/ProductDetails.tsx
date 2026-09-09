import React, { useState } from 'react';
import { Heart, ShoppingBag, Truck, Star, Check, RefreshCw, Sparkles } from 'lucide-react';
import type { Product } from '../../types/product';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/slices/cartSlice';

interface ProductDetailSectionProps {
  product: Product;
}

const swatchColor = (name: string) => {
  const map: Record<string, string> = {
    black: '#0f1419',
    white: '#ffffff',
    gray: '#9ca3af',
    grey: '#9ca3af',
    navy: '#4a5b82',
    brown: '#8b5e3c',
    red: '#f47171',
    coral: '#f47171',
    olive: '#7a8053',
    green: '#7a8053',
    sand: '#e7dcc5',
    beige: '#e7dcc5',
    blue: '#4a5b82',
  };
  return map[name.toLowerCase()] || '#9ca3af';
};

const ProductDetails: React.FC<ProductDetailSectionProps> = ({ product }) => {
  const sizes = product?.sizes || [];
  const colors = product?.colors || [];
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(colors[0] || '');
  const dispatch = useDispatch();
  const rating = product.rating || 4.6;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(
      addItemToCart({
        item: product,
        size: selectedSize || 'M',
        color: selectedColor || 'Default',
        quantity: 1,
        totalDiscount: product.discount ? product.discount : 0,
        percentageDiscount: product.discount_percentage ? product.discount_percentage : 0,
        total: parseFloat(product.price),
      }) as any
    );
  };

  const colorBtnClass = (active: boolean) =>
    'relative w-10 h-10 rounded-full transition-all ' + (active ? 'ring-2 ring-offset-2 ring-ink-1' : 'hover:scale-105');

  const sizeBtnClass = (active: boolean) =>
    'py-3 text-sm rounded-xl border transition-all ' + (active ? 'border-ink-1 bg-ink-1 text-white' : 'border-line hover:border-ink-1 text-ink-1');

  const starClass = (filled: boolean) => (filled ? 'text-sun fill-sun' : 'text-line fill-line');

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <span className="chip">{product.brand || product.category_name || 'BR.F Essentials'}</span>
        <div className="flex items-center gap-1.5 text-sm">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className={starClass(i < Math.round(rating))} />
            ))}
          </div>
          <span className="text-ink-1 font-medium">{rating.toFixed(1)}</span>
          <span className="text-ink-muted">({product.reviews.length} reviews)</span>
        </div>
      </div>

      <h1 className="font-display text-4xl md:text-5xl text-ink-1 leading-tight">{product.name}</h1>

      <p className="text-ink-muted leading-relaxed">
        {product.description || 'A modern essential, tailored from premium fabric and finished by hand in our Nairobi studio.'}
      </p>

      <div className="flex items-baseline gap-3 pt-1">
        <span className="font-display text-4xl text-ink-1">Ksh {product.price}</span>
        {product.original_price && (
          <>
            <span className="text-ink-muted line-through text-lg">Ksh {product.original_price}</span>
            {product.discount_percentage && (
              <span className="chip bg-coral-soft text-coral border-transparent">Save {product.discount_percentage}%</span>
            )}
          </>
        )}
      </div>

      {colors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-ink-1">Color</span>
            <span className="text-sm text-ink-muted capitalize">{selectedColor}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => {
              const active = selectedColor === color;
              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={colorBtnClass(active)}
                  style={{ backgroundColor: swatchColor(color) }}
                  title={color}
                >
                  {active && <Check size={14} className="absolute inset-0 m-auto text-white mix-blend-difference" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-ink-1">Size</span>
            <button className="text-xs text-ink-muted hover:text-ink-1 underline-offset-4 hover:underline">Size guide</button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {sizes.map((size) => {
              const active = selectedSize === size;
              return (
                <button key={size} onClick={() => setSelectedSize(size)} className={sizeBtnClass(active)}>
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 bg-coral-soft/40 border border-coral-soft rounded-card p-4">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
          <Sparkles size={16} className="text-coral" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-ink-1">Try this on, virtually</p>
          <p className="text-xs text-ink-muted">Upload one selfie and see it on you in seconds.</p>
        </div>
        <button className="btn-pill btn-light text-xs px-4 py-2">Try it</button>
      </div>

      <div className="flex items-stretch gap-2 pt-2">
        <button onClick={handleAddToCart} className="flex-1 btn-pill btn-primary py-4 text-base">
          <ShoppingBag size={18} />
          Add to bag
        </button>
        <button className="w-14 h-14 rounded-full bg-surface border border-line hover:border-ink-1 transition-colors flex items-center justify-center shrink-0">
          <Heart size={18} className="text-ink-1" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="flex items-center gap-3 text-sm">
          <Truck size={16} className="text-ink-muted" />
          <span className="text-ink-muted">Free delivery over Ksh 5,000</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RefreshCw size={16} className="text-ink-muted" />
          <span className="text-ink-muted">7-day try-at-home returns</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
