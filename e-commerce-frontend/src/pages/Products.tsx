import ProductsFilter from "../components/product/ProductsFilter";
import ProductDetailCard from "../components/ProductDetailCard";
import RecentFinds from "../components/product/RecentFinds";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import {
  fetchProducts,
  selectProducts,
  selectTotalProducts,
  selectIsLoading,
} from "../redux/slices/productsSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ChevronDown, Grid3X3, List, SlidersHorizontal } from "lucide-react";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const totalProducts = useSelector(selectTotalProducts);
  const loading = useSelector(selectIsLoading);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryName = searchParams.get("category-name");
  // Set by the header search box. The API already searches across name,
  // description and category - nothing was passing a term to it.
  const search = searchParams.get("search")?.trim() || undefined;
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [sizeFilter, setSizeFilter] = useState<string | undefined>();
  const [ratingsFilter, setRatingsFilter] = useState<number | undefined>();
  const [colorFilter, setColorFilter] = useState<string | undefined>();
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  // Values the API accepts verbatim; "" means the server default, which
  // is newest first (Product.Meta.ordering).
  const [ordering, setOrdering] = useState("");

  useEffect(() => {
    if (
      categoryName ||
      search ||
      ordering ||
      minPrice ||
      maxPrice ||
      sizeFilter ||
      colorFilter ||
      ratingsFilter ||
      categoryFilter
    ) {
      dispatch(
        fetchProducts({
          category: categoryName?.toLowerCase(),
          search,
          ordering: ordering || undefined,
          minPrice,
          maxPrice,
          sizeFilter,
          colorFilter,
          ratingsFilter,
          categoryFilter,
        }) as any
      );
      return;
    }
    dispatch(fetchProducts({ page: 0, pageSize: 12 }) as any);
  }, [
    dispatch,
    categoryName,
    search,
    ordering,
    minPrice,
    maxPrice,
    sizeFilter,
    colorFilter,
    ratingsFilter,
    categoryFilter,
  ]);

  const handleClearFilters = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSizeFilter(undefined);
    setColorFilter(undefined);
    setRatingsFilter(undefined);
    setCategoryFilter(undefined);
  };

  return (
    <div className="bg-page">
      {/* Page header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <span className="text-ink-1">Shop</span>
            {categoryName && (
              <>
                <span>/</span>
                <span className="text-ink-1 capitalize">{categoryName}</span>
              </>
            )}
            {search && (
              <>
                <span>/</span>
                <span className="text-ink-1">Search</span>
              </>
            )}
          </nav>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight">
            {search ? (
              <>
                &ldquo;{search}&rdquo;
                <span className="block text-ink-muted text-3xl mt-2 font-sans font-normal">
                  {products.length === 1 ? '1 piece' : `${products.length} pieces`} matched
                </span>
              </>
            ) : categoryName ? (
              <>
                {categoryName}
                <span className="block text-ink-muted text-3xl mt-2 font-sans font-normal">
                  Curated picks for the season
                </span>
              </>
            ) : (
              <>
                The full<br /> collection
              </>
            )}
          </h1>
          {/* The search heading already states how many matched, so this
              line would only repeat it - and it said "1 pieces". */}
          {!search && (
            <p className="text-ink-muted mt-4 max-w-md">
              {totalProducts > 0
                ? `${totalProducts} ${totalProducts === 1 ? 'piece' : 'pieces'} available — refreshed weekly with new arrivals.`
                : "Browse our latest pieces, refreshed every week."}
            </p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filter rail */}
          <div className="hidden lg:block lg:col-span-3">
            <ProductsFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              sizeFilter={sizeFilter}
              onSizeChange={setSizeFilter}
              ratingsFilter={ratingsFilter}
              setRatingsFilter={setRatingsFilter}
              colorFilter={colorFilter}
              categoryFilter={categoryFilter}
              onColorChange={setColorFilter}
              onPriceRangeChange={({ min, max }) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
              onClearFilters={handleClearFilters}
              onCategoryChange={setCategoryFilter}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-9">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden btn-pill btn-ghost"
                >
                  <SlidersHorizontal size={14} />
                  Filters
                </button>
                <p className="text-sm text-ink-muted">
                  <span className="text-ink-1 font-medium">{products.length}</span> products
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-1 bg-surface border border-line rounded-full p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      viewMode === "grid" ? "bg-ink-1 text-white" : "text-ink-muted hover:text-ink-1"
                    }`}
                  >
                    <Grid3X3 size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      viewMode === "list" ? "bg-ink-1 text-white" : "text-ink-muted hover:text-ink-1"
                    }`}
                  >
                    <List size={14} />
                  </button>
                </div>

                {/* This was a button with no handler - it looked like a
                    control and could never sort anything. The API has
                    accepted `ordering` all along. */}
                <div className="relative">
                  <label htmlFor="sort-by" className="sr-only">Sort by</label>
                  <select
                    id="sort-by"
                    value={ordering}
                    onChange={(e) => setOrdering(e.target.value)}
                    className="btn-pill btn-ghost appearance-none pr-9 cursor-pointer"
                  >
                    <option value="">Sort by: Newest</option>
                    <option value="price">Price: low to high</option>
                    <option value="-price">Price: high to low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink-muted"
                  />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/5] bg-surface-2 rounded-card" />
                    <div className="h-4 bg-surface-2 rounded mt-4 w-2/3" />
                    <div className="h-3 bg-surface-2 rounded mt-2 w-1/3" />
                  </div>
                ))}
              </div>
            ) : products.length < 1 ? (
              <div className="bg-surface border border-line-soft rounded-card-lg py-20 text-center">
                <p className="font-display text-3xl text-ink-1">No matches yet</p>
                <p className="text-ink-muted mt-2">
                  {search
                    ? <>Nothing in the collection matches &ldquo;{search}&rdquo;.</>
                    : 'Try clearing a filter or two.'}
                </p>
                <button
                  onClick={() => {
                    handleClearFilters();
                    // Search and category live in the URL, so clearing the
                    // component's filters alone would leave the shopper
                    // staring at the same empty page.
                    if (search || categoryName) navigate('/products');
                  }}
                  className="btn-pill btn-primary mt-6 mx-auto"
                >
                  {search || categoryName ? 'Show everything' : 'Clear filters'}
                </button>
              </div>
            ) : (
              <div className={`grid gap-4 md:gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-2 md:grid-cols-3"
                  : "grid-cols-1"
              }`}>
                {products.map((product) => (
                  <ProductDetailCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <div className="mt-16">
              <RecentFinds />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filter overlay */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-ink-1/40 backdrop-blur-sm">
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-page p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="btn-pill btn-ghost"
              >
                Done
              </button>
            </div>
            <ProductsFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              sizeFilter={sizeFilter}
              onSizeChange={setSizeFilter}
              ratingsFilter={ratingsFilter}
              setRatingsFilter={setRatingsFilter}
              colorFilter={colorFilter}
              categoryFilter={categoryFilter}
              onColorChange={setColorFilter}
              onPriceRangeChange={({ min, max }) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
              onClearFilters={handleClearFilters}
              onCategoryChange={setCategoryFilter}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
