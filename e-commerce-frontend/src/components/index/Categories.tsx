import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch } from '../../redux/store';
import { fetchCategories, selectedCategories } from '../../redux/slices/categorySlice';

/**
 * Shop by category.
 *
 * This used to be a hard-coded list - Outerwear, Streetwear, Footwear,
 * Accessories - with invented counts ("124 items", "86 items"). Three of the
 * four are not categories Entito has, the counts were not real, and each
 * tile linked to `?type=`, a parameter nothing reads, so every one of them
 * landed on the unfiltered catalogue anyway.
 *
 * Now it shows the categories that actually exist, straight from the
 * database, and links with the parameter the catalogue reads.
 */

// Backgrounds cycle so the tiles stay varied however many categories exist.
const TILE_BACKGROUNDS = ['bg-surface-2', 'bg-sand', 'bg-coral-soft', 'bg-mint'];

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectedCategories);

  useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  // Nothing useful to show, and an empty grid of coloured boxes looks broken.
  if (categories.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      <header className="flex items-end justify-between mb-10">
        <div>
          <span className="chip mb-4">Find your piece</span>
          <h2 className="font-display text-4xl md:text-5xl text-ink-1 mt-3 max-w-xl leading-tight">
            Shop by category
          </h2>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="hidden md:inline-flex btn-pill btn-ghost"
        >
          See everything
          <ArrowUpRight size={14} />
        </button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() =>
              navigate(`/products?category-name=${encodeURIComponent(category.name)}`)
            }
            className={`relative ${TILE_BACKGROUNDS[index % TILE_BACKGROUNDS.length]} rounded-card-lg p-6 aspect-[5/6] flex flex-col justify-between text-left overflow-hidden group cursor-pointer transition-transform hover:-translate-y-0.5`}
          >
            <div className="relative z-10">
              <h3 className="font-display text-2xl text-ink-1">{category.name}</h3>
              {category.description && (
                <p className="text-xs text-ink-muted mt-2 line-clamp-3">
                  {category.description}
                </p>
              )}
            </div>
            <div className="relative z-10 self-end w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <ArrowUpRight size={18} className="text-ink-1" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
