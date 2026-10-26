import { Search, ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { useAuth } from '../../auth/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../redux/store';
import { fetchCategories, selectedCategories } from '../../redux/slices/categorySlice';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { cartItemsCount } from '../../redux/slices/cartSlice';
import { RETURN_WINDOW_DAYS } from '../../content/policy';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);
  const categories = useSelector(selectedCategories);
  const cartItems = useSelector(cartItemsCount);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Read the current category from the router, not from `window.location`.
  // The old code captured window.location.search during render, which is a
  // value React knows nothing about: it did not necessarily reflect the page
  // being rendered, and nothing re-read it when the route changed.
  const params = new URLSearchParams(location.search);
  const type = params.get('category-name');

  // "New In" means "the catalogue, unfiltered" - so it can only be the
  // current selection while we are actually on the catalogue. Previously it
  // highlighted whenever there was no category in the URL, which is true of
  // the cart, the wishlist, visual search and every other page on the site.
  const onCatalogue = location.pathname === '/products';
  const newInSelected = onCatalogue && !type && !params.get('search');

  useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  // Keep the box showing what the results are actually filtered by, including
  // when the shopper arrives from a link or presses back.
  useEffect(() => {
    setQuery(onCatalogue ? (params.get('search') ?? '') : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, location.pathname]);

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    const term = query.trim();
    // An empty box means "show me everything", not "search for nothing".
    navigate(term ? `/products?search=${encodeURIComponent(term)}` : '/products');
    setMobileOpen(false);
  };

  const navLinks = [
    { label: 'Shop', to: '/products' },
    { label: 'Lookbook', to: '/lookbook' },
    { label: 'Wishlist', to: '/wishlist' },
    { label: 'Recently viewed', to: '/recent-views' },
  ];

  const searchInputClass =
    'w-full pl-11 pr-4 py-3 text-sm bg-surface border border-line rounded-full focus:outline-none focus:border-ink-1 transition-colors';

  return (
    <header className="bg-page sticky top-0 z-40 border-b border-line">
      {/* Promo bar */}
      <div className="bg-ink-1 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          {/* Whatever goes here has to be true. Delivery is priced by
              area with no free threshold, so the old "free express
              delivery over Ksh 5,000" line was a promise the shop would
              have had to break at checkout. */}
          <span className="hidden sm:block opacity-80">Delivery countrywide · priced by area</span>
          <span className="opacity-80">{RETURN_WINDOW_DAYS}-day returns</span>
        </div>
      </div>

      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center gap-6">
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-baseline cursor-pointer shrink-0"
        >
          <span className="font-display text-3xl tracking-tight text-ink-1">ENTI</span>
          <span className="font-display text-3xl tracking-tight text-ink-soft">TO</span>
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
        <form onSubmit={submitSearch} role="search" className="hidden md:flex flex-1 max-w-md ml-auto">
          <div className="relative w-full">
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dresses, tops, sizes…"
              aria-label="Search the collection"
              className={searchInputClass}
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
          </div>
        </form>

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
              <span className="absolute -top-0.5 -right-0.5 bg-coral text-white text-[10px] font-medium min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
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

          <button
            onClick={() => navigate(user ? '/account' : '/login')}
            className="w-11 h-11 hidden md:flex items-center justify-center rounded-full hover:bg-surface-3 transition-colors"
            aria-label={user ? 'Your account' : 'Sign in'}
          >
            <User size={20} className="text-ink-1" />
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-3"
            aria-expanded={mobileOpen}
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Category nav (desktop) */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
          {/* There was an "All Categories" chip with a dropdown arrow here.
              It was a plain <div> - not a button, no menu, no handler - so it
              could never do anything. "New In" beside it already is the
              unfiltered view, which is what a working version would have
              shown. */}
          <button
            onClick={() => navigate('/products')}
            className={`chip ${newInSelected ? 'chip-dark' : ''}`}
          >
            New In
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/products?category-name=${encodeURIComponent(category.name)}`)}
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
            <form onSubmit={submitSearch} role="search">
              <div className="relative">
                <input
                  id="site-search-mobile"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the collection"
                  aria-label="Search the collection"
                  className={searchInputClass}
                />
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
              </div>
            </form>
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
            {/* The account icon in the bar above is hidden below md, so
                without this there is no way to sign in on a phone at all. */}
            <button
              onClick={() => {
                navigate(user ? '/account' : '/login');
                setMobileOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm text-ink-1 hover:bg-surface-3 rounded-2xl"
            >
              {user ? 'Your account' : 'Sign in'}
            </button>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-line">
              <button
                onClick={() => {
                  navigate('/products');
                  setMobileOpen(false);
                }}
                className={`chip ${newInSelected ? 'chip-dark' : ''}`}
              >
                New In
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    navigate(`/products?category-name=${encodeURIComponent(category.name)}`);
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
