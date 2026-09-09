import { Search, ShoppingBag, Heart, User, ChevronDown, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../redux/store';
import { fetchCategories, selectedCategories } from '../../redux/slices/categorySlice';
import { useEffect, useState } from 'react';
import { cartItemsCount } from '../../redux/slices/cartSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);
  const params = new URLSearchParams(window.location.search);
  const type = params.get('category-name');
  const categories = useSelector(selectedCategories);
  const cartItems = useSelector(cartItemsCount);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  const navLinks = [
    { label: 'Shop', to: '/products' },
    { label: 'Wishlist', to: '/wishlist' },
    { label: 'Recently viewed', to: '/recent-views' },
  ];

  return (
    <header className="bg-page sticky top-0 z-40 border-b border-line">
      {/* Promo bar */}
      <div className="bg-ink-1 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <span className="hidden sm:block opacity-80">Free express delivery on orders over Ksh 5,000</span>
          <span className="opacity-80">Try-on at home · 7-day returns</span>
        </div>
      </div>

      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center gap-6">
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-baseline cursor-pointer shrink-0"
        >
          <span className="font-display text-3xl tracking-tight text-ink-1">BR.</span>
          <span className="font-display text-3xl tracking-tight text-ink-soft">F</span>
        </button>

        {/* Primary nav */}
        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {navLinks.map((link) => (
            <button
              key={link.to}
              onClick={() => navigate(link.to)}
              className="px-4 py-2 text-sm text-ink-1 hover:bg-surface-3 rounded-full transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md ml-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products, brands…"
              className="w-full pl-11 pr-4 py-3 text-sm bg-surface border border-line rounded-full focus:outline-none focus:border-ink-1 transition-colors"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 md:gap-1">
          <button
            onClick={() => navigate('/wishlist')}
            className="relative w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-3 transition-colors"
            aria-label="Wishlist"
          >
            <Heart
              size={20}
              className={wishlistCount > 0 ? 'text-coral fill-coral' : 'text-ink-1'}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-coral text-white text-[10px] font-medium w-4.5 h-4.5 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate('/cart')}
            className="relative w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-3 transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag size={20} className="text-ink-1" />
            {cartItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-ink-1 text-white text-[10px] font-medium min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </button>

          <button className="w-11 h-11 hidden md:flex items-center justify-center rounded-full hover:bg-surface-3 transition-colors" aria-label="Account">
            <User size={20} className="text-ink-1" />
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-3"
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Category nav (desktop) */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 chip">
            <span>All Categories</span>
            <ChevronDown size={14} />
          </div>
          <button
            onClick={() => navigate('/products')}
            className={`chip ${!type ? 'chip-dark' : ''}`}
          >
            New In
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => navigate(`/products?category-name=${category.name}`)}
              className={`chip ${type === category.name ? 'chip-dark' : ''}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-line bg-page">
          <div className="px-4 py-4 space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-11 pr-4 py-3 text-sm bg-surface border border-line rounded-full focus:outline-none focus:border-ink-1"
              />
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
            </div>
            {navLinks.map((link) => (
              <button
                key={link.to}
                onClick={() => {
                  navigate(link.to);
                  setMobileOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm text-ink-1 hover:bg-surface-3 rounded-2xl"
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-line">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate(`/products?category-name=${category.name}`);
                    setMobileOpen(false);
                  }}
                  className={`chip ${type === category.name ? 'chip-dark' : ''}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
