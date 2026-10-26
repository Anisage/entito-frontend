import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch } from '../../redux/store';
import { fetchProducts, selectProducts } from '../../redux/slices/productsSlice';
import ProductImagePlaceholder from '../product/ProductImagePlaceholder';
import { money } from '../../utils/money';

interface RelatedProductsCarouselProps {
  /** The piece being viewed, so it is not suggested alongside itself. */
  currentProductId?: number;
  /** Suggest from the same category when we know it. */
  categoryName?: string;
}

/**
 * "Pair it with".
 *
 * This used to be four hard-coded entries: a Classic Leather sneaker, a
 * Club C 85 trainer, a Nano X3 cross-trainer and a Floatride Energy 5 —
 * Reebok's product names, with invented prices, over stock photographs of
 * jumpers. They were not Entito's, they were not even clothing, and
 * clicking one dumped you on the unfiltered catalogue.
 *
 * Now it suggests real pieces, from the same category where there is one.
 */
const RelatedProductsCarousel = ({
  currentProductId,
  categoryName,
}: RelatedProductsCarouselProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts(categoryName ? { category: categoryName } : {}) as any);
  }, [dispatch, categoryName]);

  const suggestions = products
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4);

  // Nothing worth showing: a single-piece category, or an empty catalogue.
  if (suggestions.length === 0) return null;

  return (
    <section className="mt-24">
      <header className="mb-10">
        <span className="chip mb-3">You may also like</span>
        <h2 className="font-display text-3xl md:text-4xl text-ink-1 mt-2">
          Pair it with
        </h2>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {suggestions.map((product) => (
          <article
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/5] rounded-card overflow-hidden bg-surface-2">
              {product.main_image?.image ? (
                <img
                  src={product.main_image.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <ProductImagePlaceholder label={product.name} />
              )}
            </div>
            <div className="pt-4 px-1 flex items-start justify-between gap-3">
              <h3 className="text-[15px] font-medium text-ink-1 leading-snug line-clamp-1">
                {product.name}
              </h3>
              <span className="text-[15px] font-medium text-ink-1 whitespace-nowrap">
                {money(product.price)}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 bg-ink-1 text-white rounded-card-lg p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="chip bg-white/10 text-white border-transparent mb-3">
            The collection
          </span>
          {/* Was "Popular brands, up to 25% off" - wrong on both counts here:
              Entito is the only brand, and that discount is not a real offer. */}
          <h3 className="font-display text-2xl md:text-3xl mt-2">
            See the whole Entito range
          </h3>
        </div>
        <button onClick={() => navigate('/products')} className="btn-pill btn-light">
          Shop the edit
          <ArrowUpRight size={14} />
        </button>
      </div>
    </section>
  );
};

export default RelatedProductsCarousel;
