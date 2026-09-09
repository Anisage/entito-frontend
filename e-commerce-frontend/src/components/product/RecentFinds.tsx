import React, { useEffect, useRef } from 'react';
import { Star, ChevronRight, ChevronLeft, ShoppingBag, ArrowUpRight } from 'lucide-react';
import WishlistButton from '../wishlist/WishlistButton';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/product';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRecentViews,
  selectFetchError,
  selectLoading,
  selectRecentProducts,
} from '../../redux/slices/recentViewsSlice';
import type { AppDispatch } from '../../redux/store';
import { addItemToCart } from '../../redux/slices/cartSlice';

interface RecentFindsItemProps {
  product: Product;
}

export const RecentFindsCard: React.FC<RecentFindsItemProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(
      addItemToCart({
        item: product,
        size: product.sizes ? product.sizes[0] : 'M',
        color: product.colors ? product.colors[0] : 'Default',
        quantity: 1,
        totalDiscount: product.discount ? product.discount : 0,
        percentageDiscount: product.discount_percentage
          ? product.discount_percentage
          : 0,
        total: parseFloat(product.price),
      }) as any
    );
  };

  return (
    <article
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/5] rounded-card overflow-hidden bg-surface-2">
        <img
          src={product.main_image?.image || '/assets/images/cargo-pants.jpg'}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center">
          <WishlistButton item={product} size={14} className="" />
        </div>

        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-ink-1 text-white flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-lg"
          aria-label="Add to bag"
        >
          <ShoppingBag size={14} />
        </button>
      </div>

      <div className="pt-4 px-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-medium text-ink-1 text-[15px] leading-snug line-clamp-1">
            {product.name}
          </h3>
          <span className="font-medium text-ink-1 text-[15px] whitespace-nowrap">
            Ksh {product.price}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-ink-muted">{product.category_name}</p>
          <div className="flex items-center gap-1 text-xs text-ink-muted">
            <Star size={11} className="text-sun fill-sun" />
            {product.rating || 0}
          </div>
        </div>
      </div>
    </article>
  );
};

const RecentFinds: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectFetchError);
  const data = useSelector(selectRecentProducts);

  useEffect(() => {
    dispatch(fetchRecentViews() as any);
  }, [dispatch]);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -320 : 320,
        behavior: 'smooth',
      });
    }
  };

  if (!isLoading && data.length === 0) return null;

  return (
    <section className="mt-16">
      <header className="flex items-end justify-between mb-8">
        <div>
          <span className="chip mb-3">Recently viewed</span>
          <h3 className="font-display text-3xl text-ink-1 mt-2">Pick up where you left off</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-surface border border-line hover:border-ink-1 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-surface border border-line hover:border-ink-1 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
          <button
            onClick={() => navigate('/recent-views')}
            className="btn-pill btn-ghost text-xs"
          >
            View all
            <ArrowUpRight size={12} />
          </button>
        </div>
      </header>

      {isLoading ? (
        <p className="text-center text-ink-muted py-10">Loading recent finds…</p>
      ) : error ? (
        <p className="text-center text-coral py-10">Couldn't load recent finds.</p>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {data.map((item) => (
            <div key={item.id} className="shrink-0 w-56 md:w-64">
              <RecentFindsCard product={item} />
            </div>
          ))}
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `.scrollbar-hide::-webkit-scrollbar { display: none; }`,
        }}
      />
    </section>
  );
};

export default RecentFinds;
