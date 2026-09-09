import React, { useState } from 'react';
import { RecentFindsCard } from '../components/product/RecentFinds';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearRecentViews,
  selectFetchError,
  selectLoading,
  selectRecentProducts,
  selectRecentsInStock,
  selectRecentsOutOfStock,
} from '../redux/slices/recentViewsSlice';
import {
  Eye,
  Filter,
  Grid3X3,
  List,
  ShoppingBag,
  Trash2,
  ChevronDown,
} from 'lucide-react';
import RecentFindsEmptyState from '../components/product/RecentFindsEmptyState';

const RecentFindsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectFetchError);
  const recentFindsData = useSelector(selectRecentProducts);
  const inStockItems = useSelector(selectRecentsInStock);
  const outOfStock = useSelector(selectRecentsOutOfStock);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price-low' | 'price-high' | 'name'>('newest');
  const [filterBy, setFilterBy] = useState<'all' | 'in-stock' | 'on-sale'>('all');

  const handleClearAll = () => {
    if (window.confirm('Clear all recently viewed items?')) {
      dispatch(clearRecentViews());
    }
  };

  const handleAddAllToCart = () => {
    if (inStockItems.length === 0) {
      alert('No items in stock to add to cart');
      return;
    }
    alert(`Added ${inStockItems.length} items to cart!`);
  };

  const filteredAndSortedItems = React.useMemo(() => {
    let filtered = [...recentFindsData];
    switch (filterBy) {
      case 'in-stock':
        filtered = inStockItems;
        break;
      case 'on-sale':
        filtered = outOfStock;
        break;
      default:
        break;
    }
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (Number(a.price) || 0) - (Number(b.price) || 0);
        case 'price-high':
          return (Number(b.price) || 0) - (Number(a.price) || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    return filtered;
  }, [recentFindsData, filterBy, sortBy, inStockItems, outOfStock]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center text-ink-muted">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-coral-soft text-coral rounded-card-lg p-6 text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <span className="chip mb-4">
              <Eye size={12} /> Recently viewed
            </span>
            <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight mt-3">
              Pick up where<br /> you left off
            </h1>
            <p className="text-ink-muted mt-3">
              {recentFindsData.length} {recentFindsData.length === 1 ? 'item' : 'items'} you've browsed
            </p>
          </div>
          {recentFindsData.length > 0 && (
            <div className="flex items-center gap-2">
              <button onClick={handleAddAllToCart} className="btn-pill btn-primary">
                <ShoppingBag size={14} />
                Add all to bag
              </button>
              <button
                onClick={handleClearAll}
                className="btn-pill bg-surface text-ink-1 border border-line hover:bg-coral-soft hover:text-coral hover:border-coral-soft transition-colors"
              >
                <Trash2 size={14} />
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {recentFindsData.length === 0 ? (
          <RecentFindsEmptyState />
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-1 bg-surface border border-line rounded-full p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      viewMode === 'grid' ? 'bg-ink-1 text-white' : 'text-ink-muted hover:text-ink-1'
                    }`}
                  >
                    <Grid3X3 size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      viewMode === 'list' ? 'bg-ink-1 text-white' : 'text-ink-muted hover:text-ink-1'
                    }`}
                  >
                    <List size={14} />
                  </button>
                </div>
                <p className="text-sm text-ink-muted">
                  Showing <span className="text-ink-1 font-medium">{filteredAndSortedItems.length}</span> of {recentFindsData.length}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value as any)}
                    className="appearance-none bg-surface border border-line rounded-full pl-9 pr-9 py-2 text-xs text-ink-1 focus:outline-none focus:border-ink-1 cursor-pointer"
                  >
                    <option value="all">All items</option>
                    <option value="in-stock">In stock</option>
                    <option value="on-sale">On sale</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="appearance-none bg-surface border border-line rounded-full pl-4 pr-9 py-2 text-xs text-ink-1 focus:outline-none focus:border-ink-1 cursor-pointer"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name (A–Z)</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
                </div>
              </div>
            </div>

            {filteredAndSortedItems.length === 0 ? (
              <div className="bg-surface border border-line-soft rounded-card-lg py-16 text-center text-ink-muted">
                Nothing matches your current filters.
              </div>
            ) : (
              <div
                className={`grid gap-4 md:gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {filteredAndSortedItems.map((item) => (
                  <RecentFindsCard key={item.id} product={item} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default RecentFindsPage;
