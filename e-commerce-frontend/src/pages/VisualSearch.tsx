import React from "react";
import { useSelector } from "react-redux";
import ProductDetailCard from "../components/ProductDetailCard";
import UploadDropzone from "../components/search/UploadDropzone";
import {
  selectVisualSearchResponse,
  selectVisualSearchLoading,
  selectVisualSearchResults,
} from "../redux/slices/searchSlice";

const VisualSearch: React.FC = () => {
  const response = useSelector(selectVisualSearchResponse);
  const loading = useSelector(selectVisualSearchLoading);
  const results = useSelector(selectVisualSearchResults);

  return (
    <div className="bg-page">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <a href="/" className="hover:text-ink-1">
              Home
            </a>
            <span>/</span>
            <span className="text-ink-1">Visual search</span>
          </nav>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight">
            Find your look<br />
            <span className="block text-ink-muted text-3xl mt-2 font-sans font-normal">
              Drop in a photo — we'll find the closest matches in stock.
            </span>
          </h1>
        </div>
      </section>

      {/* Upload + Tips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <UploadDropzone variant="page" />
          </div>

          <aside className="lg:col-span-5">
            <div className="bg-surface border border-line-soft rounded-card-lg p-6 h-full">
              <p className="font-display text-2xl text-ink-1 mb-3">
                How it works
              </p>
              <ol className="space-y-3 text-sm text-ink-muted">
                <li>
                  <span className="text-ink-1 font-medium">1.</span> Upload a
                  photo of a hairstyle, wig, or piece you like.
                </li>
                <li>
                  <span className="text-ink-1 font-medium">2.</span> Our AI
                  finds the most visually similar items in stock.
                </li>
                <li>
                  <span className="text-ink-1 font-medium">3.</span> Try them on
                  virtually before checking out.
                </li>
              </ol>
              <p className="text-xs text-ink-muted mt-6">
                Tip: well-lit, head-and-shoulders photos give the best results.
                We don't keep your photo beyond the search itself.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-surface-2 rounded-card" />
                <div className="h-4 bg-surface-2 rounded mt-4 w-2/3" />
                <div className="h-3 bg-surface-2 rounded mt-2 w-1/3" />
              </div>
            ))}
          </div>
        )}

        {!loading && response && (
          <>
            <div className="flex items-end justify-between gap-3 mb-6">
              <div>
                <p className="font-display text-3xl text-ink-1">
                  {response.count > 0
                    ? `${response.count} similar ${
                        response.count === 1 ? "piece" : "pieces"
                      }`
                    : "No matches yet"}
                </p>
                <p className="text-xs text-ink-muted mt-1">
                  Found in {response.query.latency_ms} ms
                </p>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="bg-surface border border-line-soft rounded-card-lg py-20 text-center">
                <p className="font-display text-2xl text-ink-1">
                  Nothing close enough yet
                </p>
                <p className="text-ink-muted mt-2 max-w-sm mx-auto">
                  Try another photo, or browse the full collection while we
                  expand our catalogue.
                </p>
                <a href="/products" className="btn-pill btn-primary mt-6 inline-flex">
                  Browse all products
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {results.map((product) => (
                  <div key={product.id} className="relative">
                    {typeof product.distance === "number" && (
                      <span className="absolute top-3 left-3 z-10 chip bg-white/95 backdrop-blur text-[11px]">
                        {Math.max(0, Math.round((1 - product.distance) * 100))}%
                        match
                      </span>
                    )}
                    <ProductDetailCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default VisualSearch;
