import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProductDetailCard from "../components/ProductDetailCard";
import StayInTouch from "../components/StayInTouch";
import Promotions from "../components/index/Promotions";
import FAQS from "../components/index/FAQS";
import BrandStory from "../components/index/BrandStory";
import Categories from "../components/index/Categories";
import type { AppDispatch } from "../redux/store";
import { fetchProducts, selectProducts } from "../redux/slices/productsSlice";
import ProductImagePlaceholder from "../components/product/ProductImagePlaceholder";
import { money } from "../utils/money";

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts({}) as any);
  }, [dispatch]);

  return (
    <div className="bg-page">
      {/* HERO ============================================================ */}
      {/* What stood here pitched "Snap it. Find it. Try it on." over an
          upload box, with sample looks named "Braided bob" and "Lace
          frontal" - the hair-extensions business this codebase started life
          as. Two things were wrong with it on Entito's shop: it sells
          clothing, not wigs; and the feature it funnelled every visitor
          into is switched off, so the homepage's main action ended at a
          "coming soon" page. */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative overflow-hidden rounded-card-lg bg-coral-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 lg:p-14 min-h-[420px] md:min-h-[480px]">
            <div className="lg:col-span-7 flex flex-col justify-center relative z-10">
              <span className="chip bg-white/90 text-ink-1 border-transparent self-start">
                Entito Designs
              </span>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5rem] leading-[0.95] mt-6 text-ink-1">
                <span className="block">Made for</span>
                <span className="block">the way you</span>
                <span className="block">actually dress.</span>
              </h1>
              <p className="text-ink-muted leading-relaxed max-w-md mt-6">
                Dresses, tops, skirts and outerwear — designed and made by
                Entito, in sizes XS to XL. Delivered countrywide.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-8">
                <button
                  onClick={() => navigate("/products")}
                  className="btn-pill btn-light"
                >
                  Shop the collection
                  <ArrowUpRight size={14} />
                </button>
                <button
                  onClick={() => navigate("/lookbook")}
                  className="btn-pill btn-ghost"
                >
                  See the lookbook
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                {products.slice(0, 2).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="group text-left"
                  >
                    <div className="aspect-[4/5] rounded-card overflow-hidden bg-white/60">
                      {product.main_image?.image ? (
                        <img
                          src={product.main_image.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <ProductImagePlaceholder label={product.name} />
                      )}
                    </div>
                    <p className="text-sm text-ink-1 mt-3 line-clamp-1">{product.name}</p>
                    <p className="text-xs text-ink-muted">{money(product.price)}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROMOTIONS ====================================================== */}
      <Promotions />

      {/* The "Fresh arrivals" strip that stood here listed four hard-coded
          garments - a suede jacket, a zip hoodie - with invented prices,
          none of which Entito sells. The real collection is below, from the
          database. */}

      {/* PRODUCT CATALOG ================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
        <header className="flex items-end justify-between mb-10">
          <div>
            <span className="chip mb-4">Product catalog</span>
            <h2 className="font-display text-4xl md:text-5xl text-ink-1 mt-3 leading-tight max-w-xl">
              The full collection, ready to shop
            </h2>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="hidden md:inline-flex btn-pill btn-ghost"
          >
            View all
            <ArrowUpRight size={14} />
          </button>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductDetailCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CATEGORIES ====================================================== */}
      <Categories />

      {/* "Words from the closet" carried three invented reviews signed by
          invented people, on a shop that has not sold anything yet. Removed
          rather than rewritten: made-up praise presented as a customer's is
          not a thing to tidy up. Bring it back when there are real reviews
          to show. */}

      {/* BRAND STORY ===================================================== */}
      <BrandStory />

      {/* FAQ ============================================================= */}
      <FAQS />

      {/* NEWSLETTER ====================================================== */}
      <StayInTouch />
    </div>
  );
};

export default Index;
