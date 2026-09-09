import { Star, X, SlidersHorizontal } from 'lucide-react';
import React from 'react';
import Slider from '@mui/material/Slider';
import { useSelector } from 'react-redux';
import { selectedCategories } from '../../redux/slices/categorySlice';

interface ProductFilterProps {
  minPrice?: number;
  maxPrice?: number;
  sizeFilter?: string;
  colorFilter?: string;
  ratingsFilter?: number;
  categoryFilter?: string;
  brandFilter?: string;
  setRatingsFilter: (rating: number | undefined) => void;
  onPriceRangeChange: (priceRange: { min?: number; max?: number }) => void;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
  onClearFilters?: () => void;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
}

const colorSwatches = [
  { name: 'Black', hex: '#0f1419' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Gray', hex: '#9ca3af' },
  { name: 'Navy', hex: '#4a5b82' },
  { name: 'Brown', hex: '#8b5e3c' },
  { name: 'Coral', hex: '#f47171' },
  { name: 'Olive', hex: '#7a8053' },
  { name: 'Sand', hex: '#e7dcc5' },
];

const brands = ['Nike', 'Adidas', 'H&M', 'Zara', 'Uniqlo', 'Gap', 'Lacoste', 'Puma'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="py-6 border-b border-line last:border-0">
    <h3 className="text-xs uppercase tracking-wider text-ink-muted mb-4">{title}</h3>
    {children}
  </div>
);

const ProductsFilter: React.FC<ProductFilterProps> = ({
  minPrice = 0,
  maxPrice = 500,
  onPriceRangeChange,
  sizeFilter,
  onSizeChange,
  colorFilter,
  onColorChange,
  ratingsFilter,
  setRatingsFilter,
  onClearFilters,
  onCategoryChange,
  onBrandChange,
}) => {
  const activeFiltersCount = [
    minPrice && minPrice > 0,
    maxPrice && maxPrice < 500,
    sizeFilter,
    colorFilter,
    ratingsFilter,
  ].filter(Boolean).length;
  const categories = useSelector(selectedCategories);

  return (
    <aside className="bg-surface rounded-card border border-line-soft p-6 sticky top-28">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-line">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-ink-1" />
          <h2 className="text-sm font-medium text-ink-1">Filters</h2>
          {activeFiltersCount > 0 && (
            <span className="bg-ink-1 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-xs text-ink-muted hover:text-coral transition-colors"
          >
            <X size={12} />
            Clear all
          </button>
        )}
      </div>

      <Section title="Categories">
        <div className="space-y-2.5 max-h-44 overflow-y-auto pr-2">
          {categories.map((category, index) => (
            <label key={index} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-line text-ink-1 focus:ring-ink-1 focus:ring-1"
                onChange={() => onCategoryChange(category.name)}
              />
              <span className="text-sm text-ink-1 group-hover:text-ink-muted transition-colors">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Brands">
        <div className="space-y-2.5 max-h-44 overflow-y-auto pr-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-line text-ink-1 focus:ring-ink-1 focus:ring-1"
                onChange={() => onBrandChange(brand)}
              />
              <span className="text-sm text-ink-1 group-hover:text-ink-muted transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Price range">
        <div className="flex justify-between text-xs text-ink-muted mb-3">
          <span>Ksh {minPrice}</span>
          <span>Ksh {maxPrice}</span>
        </div>
        <Slider
          value={[minPrice, maxPrice]}
          onChange={(_, value) =>
            onPriceRangeChange({
              min: (value as number[])[0],
              max: (value as number[])[1],
            })
          }
          valueLabelDisplay="auto"
          min={0}
          max={500}
          step={10}
          sx={{
            color: '#0f1419',
            '& .MuiSlider-thumb': {
              backgroundColor: '#0f1419',
              border: '2px solid #ffffff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              '&:hover, &.Mui-focusVisible': { boxShadow: '0 0 0 8px rgba(15,20,25,0.08)' },
            },
            '& .MuiSlider-track': { backgroundColor: '#0f1419', border: 'none', height: 3 },
            '& .MuiSlider-rail': { backgroundColor: '#e6e4dd', opacity: 1, height: 3 },
          }}
        />
      </Section>

      <Section title="Size">
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`py-2.5 text-sm rounded-xl border transition-all ${
                sizeFilter === size
                  ? 'border-ink-1 bg-ink-1 text-white'
                  : 'border-line hover:border-ink-1 text-ink-1'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Color">
        <div className="flex flex-wrap gap-3">
          {colorSwatches.map(({ name, hex }) => (
            <button
              key={name}
              onClick={() => onColorChange(name)}
              title={name}
              className={`w-9 h-9 rounded-full border transition-all ${
                colorFilter === name
                  ? 'ring-2 ring-offset-2 ring-ink-1 border-transparent'
                  : 'border-line hover:scale-105'
              }`}
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
      </Section>

      <Section title="Rating">
        <div className="space-y-2.5">
          {[5, 4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={ratingsFilter === rating}
                onChange={() => setRatingsFilter(rating)}
                className="w-4 h-4 text-ink-1 focus:ring-ink-1 focus:ring-1"
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < rating ? 'text-sun fill-sun' : 'text-line'}
                  />
                ))}
                <span className="ml-2 text-xs text-ink-muted">& up</span>
              </div>
            </label>
          ))}
        </div>
      </Section>

      <div className="pt-4 text-[11px] text-ink-muted leading-relaxed space-y-1.5">
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-ink-1 rounded-full" />
          Free delivery over Ksh 5,000
        </p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-coral rounded-full" />
          7-day returns, hassle-free
        </p>
      </div>
    </aside>
  );
};

export default ProductsFilter;
