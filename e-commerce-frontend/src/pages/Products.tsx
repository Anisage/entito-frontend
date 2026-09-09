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
import { useSearchParams } from "react-router-dom";
import { ChevronDown, Grid3X3, List, SlidersHorizontal } from "lucide-react";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const totalProducts = useSelector(selectTotalProducts);
  const loading = useSelector(selectIsLoading);
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("category-name");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [sizeFilter, setSizeFilter] = useState<string | undefined>();
  const [ratingsFilter, setRatingsFilter] = useState<number | undefined>();
  const [colorFilter, setColorFilter] = useState<string | undefined>();
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
  const [brandFilter, setBrandFilter] = useState<string | undefined>();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (
      categoryName ||
      minPrice ||
      maxPrice ||
      sizeFilter ||
      colorFilter ||
      ratingsFilter ||
      categoryFilter ||
      brandFilter
    ) {
      dispatch(
        fetchProducts({
          category: categoryName?.toLowerCase(),
          minPrice,
          maxPrice,
          sizeFilter,
          colorFilter,
          ratingsFilter,
          categoryFilter,
          brandFilter,
        }) as any
      );
      return;
    }
    dispatch(fetchProducts({ page: 0, pageSize: 12 }) as any);
  }, [
    dispatch,
    categoryName,
    minPrice,
    maxPrice,
    sizeFilter,
    colorFilter,
    ratingsFilter,
    categoryFilter,
    brandFilter,
  ]);

  const handleClearFilters = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSizeFilter(undefined);
    setColorFilter(undefined);
    setRatingsFilter(undefined);
    setCategoryFilter(undefined);
    setBrandFilter(undefined);
  };

  return (
    <div className="bg-page">
      {/* Page header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <a href="/" className="hover:text-ink-1">Home</a>
            <span>/</span>
            <span className="text-ink-1">Shop</span>
            {categoryName && (
              <>
                <span>/</span>
                <span className="text-ink-1 capitalize">{categoryName}</span>
              </>
            )}
          </nav>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight">
            {categoryName ? (
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
          <p className="text-ink-muted mt-4 max-w-md">
            {totalProducts > 0
              ? `${totalProducts} pieces available — refreshed weekly with new arrivals.`
              : "Browse our latest pieces, refreshed every week."}
          </p>
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
              brandFilter={brandFilter}
              onColorChange={setColorFilter}
              onPriceRangeChange={({ min, max }) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
              onClearFilters={handleClearFilters}
              onCategoryChange={setCategoryFilter}
              onBrandChange={setBrandFilter}
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

                <button className="btn-pill btn-ghost">
                  Sort by: Newest
                  <ChevronDown size={14} />
                </button>
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
                <p className="text-ink-muted mt-2">Try clearing a filter or two.</p>
                <button
                  onClick={handleClearFilters}
                  className="btn-pill btn-primary mt-6 mx-auto"
                >
                  Clear filters
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
              brandFilter={brandFilter}
              onColorChange={setColorFilter}
              onPriceRangeChange={({ min, max }) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
              onClearFilters={handleClearFilters}
              onCategoryChange={setCategoryFilter}
              onBrandChange={setBrandFilter}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
