import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProductDetailCard from "../components/ProductDetailCard";
import StayInTouch from "../components/StayInTouch";
import FreshArrivals from "../components/index/FreshArrivals";
import Promotions from "../components/index/Promotions";
import FAQS from "../components/index/FAQS";
import BrandStory from "../components/index/BrandStory";
import Testimonials from "../components/index/Testimonials";
import Categories from "../components/index/Categories";
import UploadDropzone from "../components/search/UploadDropzone";
import type { AppDispatch } from "../redux/store";
import { fetchProducts, selectProducts } from "../redux/slices/productsSlice";
import { setSearchError } from "../redux/slices/searchSlice";

// Sample inspiration photos that users can click to pre-fill the visual
// search. URLs are deterministic picsum images keyed by slug so they're
// stable across sessions; Allan can swap them for real wig / hairstyle
// reference shots later (the contract for this list is the only thing
// that needs to stay stable — anywhere a real hairstyle image is added,
// it just replaces the `url`).
interface SampleLook {
  id: string;
  label: string;
  url: string;
}

const SAMPLE_LOOKS: SampleLook[] = [
  {
    id: "braided-bob",
    label: "Braided bob",
    url: "https://picsum.photos/seed/braided-bob/600/750",
  },
  {
    id: "long-curls",
    label: "Long curls",
    url: "https://picsum.photos/seed/long-curls/600/750",
  },
  {
    id: "kinky-twist",
    label: "Kinky twist",
    url: "https://picsum.photos/seed/kinky-twist/600/750",
  },
  {
    id: "sleek-straight",
    label: "Sleek straight",
    url: "https://picsum.photos/seed/sleek-straight/600/750",
  },
  {
    id: "lace-frontal",
    label: "Lace frontal",
    url: "https://picsum.photos/seed/lace-frontal/600/750",
  },
  {
    id: "ponytail",
    label: "High ponytail",
    url: "https://picsum.photos/seed/ponytail/600/750",
  },
];

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const navigate = useNavigate();

  const [presetFile, setPresetFile] = useState<File | null>(null);
  const [loadingSampleId, setLoadingSampleId] = useState<string | null>(null);
  const sampleScrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(fetchProducts({}) as any);
  }, [dispatch]);

  /**
   * Turn a sample-photo URL into a File suitable for the dropzone. We
   * fetch the blob client-side rather than streaming the URL through to
   * the backend so the search payload is identical whether the user
   * uploaded their own photo or picked from the carousel.
   */
  const handleSampleClick = async (sample: SampleLook) => {
    if (loadingSampleId) return;
    setLoadingSampleId(sample.id);
    try {
      const res = await fetch(sample.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      // Default to image/jpeg if the server didn't return a Content-Type
      // that lands in our accepted set — picsum returns jpeg.
      const type = blob.type || "image/jpeg";
      const file = new File([blob], `${sample.id}.jpg`, { type });
      setPresetFile(file);
    } catch (err) {
      dispatch(
        setSearchError(
          "Couldn't load that sample. Try another or upload your own photo."
        )
      );
    } finally {
      setLoadingSampleId(null);
    }
  };

  const scrollSamples = (direction: "left" | "right") => {
    const el = sampleScrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleSearchDispatched = () => {
    // The thunk was just dispatched from the dropzone. Hop to the
    // dedicated results page where pending → fulfilled/rejected will
    // play out. `clearOnUnmount={false}` on the dropzone keeps the
    // slice state alive for the next route.
    navigate("/visual-search");
  };

  return (
    <div className="bg-page">
      {/* HERO ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative overflow-hidden rounded-card-lg bg-coral-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 lg:p-14 min-h-[520px] md:min-h-[600px]">
            {/* Pitch */}
            <div className="lg:col-span-6 flex flex-col justify-between relative z-10">
              <div>
                <span className="chip bg-white/90 text-ink-1 border-transparent">
                  <Sparkles size={12} /> AI hair try-on
                </span>
                <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] mt-6 text-ink-1">
                  <span className="block">Snap it.</span>
                  <span className="block">Find it.</span>
                  <span className="block">Try it on.</span>
                </h1>
                <p className="text-ink-muted leading-relaxed max-w-md mt-6">
                  Upload any hairstyle photo and we'll match you with the
                  closest wigs and extensions in stock — then preview them on
                  your selfie before you check out.
                </p>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={() => navigate("/visual-search")}
                  className="btn-pill btn-light"
                >
                  Browse looks
                  <ArrowUpRight size={14} />
                </button>
                <button
                  onClick={() => navigate("/products")}
                  className="btn-pill btn-ghost"
                >
                  All products
                </button>
              </div>
            </div>

            {/* Upload zone */}
            <div className="lg:col-span-6 relative">
              <div className="bg-white/95 backdrop-blur rounded-card-lg p-5 md:p-6 shadow-card">
                <p className="text-xs text-ink-muted uppercase tracking-wide mb-3">
                  Start your search
                </p>
                <UploadDropzone
                  variant="hero"
                  presetFile={presetFile}
                  clearOnUnmount={false}
                  onSubmitted={handleSearchDispatched}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAMPLE LOOKS ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <header className="flex items-end justify-between gap-3 mb-6">
          <div>
            <span className="chip mb-3">Sample looks</span>
            <h2 className="font-display text-3xl md:text-4xl text-ink-1 mt-2 leading-tight">
              Need inspiration? Tap a look.
            </h2>
            <p className="text-ink-muted mt-2 text-sm max-w-md">
              We'll preload the photo into the search above — hit "Find matches"
              to see what's in stock.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollSamples("left")}
              aria-label="Scroll samples left"
              className="w-10 h-10 rounded-full bg-surface-2 hover:bg-ink-1/10 text-ink-1 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollSamples("right")}
              aria-label="Scroll samples right"
              className="w-10 h-10 rounded-full bg-surface-2 hover:bg-ink-1/10 text-ink-1 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </header>

        <div
          ref={sampleScrollerRef}
          className="flex gap-4 md:gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
        >
          {SAMPLE_LOOKS.map((sample) => {
            const isLoading = loadingSampleId === sample.id;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSampleClick(sample)}
                disabled={isLoading}
                className="group relative shrink-0 w-40 md:w-48 snap-start text-left"
              >
                <div className="aspect-[4/5] rounded-card overflow-hidden bg-surface-2 relative">
                  <img
                    src={sample.url}
                    alt={sample.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {isLoading && (
                    <div className="absolute inset-0 bg-ink-1/30 flex items-center justify-center text-white text-xs">
                      Loading…
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium text-ink-1 mt-3">
                  {sample.label}
                </p>
                <p className="text-xs text-ink-muted">Try this look</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* PROMOTIONS ====================================================== */}
      <Promotions />

      {/* FRESH ARRIVALS ================================================== */}
      <FreshArrivals />

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

      {/* TESTIMONIALS ==================================================== */}
      <Testimonials />

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
