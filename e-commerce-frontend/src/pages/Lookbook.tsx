import { Link } from "react-router-dom";
import { ArrowUpRight, Camera, Sparkles } from "lucide-react";

interface Story {
  id: string;
  title: string;
  season: string;
  tagline: string;
  image: string | null;
  hue: string;
}

/*
 * The seasonal edits.
 *
 * What stood here described "earth-toned weaves and braided crowns",
 * "sapphire bobs" and "sleek lace fronts" - hair, from the business this
 * codebase began as - over stock photographs of strangers pulled from
 * Unsplash and presented as Entito campaigns. Each edit also linked to
 * `?category-name=harvest` and the like, which match no category, so every
 * one of them landed on an empty catalogue.
 *
 * These are clothing edits now, each pointing at a category that exists.
 * `image` is deliberately null until Entito's own photography is shot:
 * a marked placeholder is honest, somebody else's photo is not.
 */
const STORIES: Story[] = [
  {
    id: "dresses",
    title: "Day Into Evening",
    season: "The dresses edit",
    tagline:
      "Pieces that hold their shape from a morning meeting to a late table.",
    image: null,
    hue: "bg-[#d8a47f]",
  },
  {
    id: "tops & blouses",
    title: "Quiet Layers",
    season: "The tops edit",
    tagline: "Blouses and knits built to carry the rest of the wardrobe.",
    image: null,
    hue: "bg-[#1d2440]",
  },
  {
    id: "skirts & trousers",
    title: "Room To Move",
    season: "The tailoring edit",
    tagline: "Wide legs, deep pleats, and waistbands that sit where they should.",
    image: null,
    hue: "bg-[#f3d9b1]",
  },
  {
    id: "outerwear",
    title: "The Outer Layer",
    season: "The coats edit",
    tagline: "What goes over everything, cut to be worn open or closed.",
    image: null,
    hue: "bg-[#2a3a55]",
  },
];

const Lookbook = () => {
  return (
    <div className="bg-page">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <span className="text-ink-1">Lookbook</span>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="chip mb-4">
                <Camera size={12} /> The seasonal edit
              </span>
              <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight mt-3">
                Stories worn,<br /> not just styled.
              </h1>
              <p className="text-ink-muted mt-4 max-w-md">
                Quarterly editorials shot across Nairobi — every look is shoppable,
                and every piece can be tried on virtually before you commit.
              </p>
            </div>
            <Link to="/visual-search" className="btn-pill btn-primary self-start">
              <Sparkles size={14} />
              Find your look
            </Link>
          </div>
        </div>
      </section>

      {/* Hero story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Link
          to={`/products?category-name=${encodeURIComponent(STORIES[0].id)}`}
          className="group relative block overflow-hidden rounded-card-lg"
        >
          <div className={`absolute inset-0 ${STORIES[0].hue} opacity-90`} />
          {STORIES[0].image ? (
            <img
              src={STORIES[0].image}
              alt={STORIES[0].title}
              className="relative w-full h-[480px] md:h-[640px] object-cover mix-blend-overlay group-hover:scale-[1.02] transition-transform duration-700"
            />
          ) : (
            <div className="relative w-full h-[480px] md:h-[640px]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-1/80 via-ink-1/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
            <p className="text-xs uppercase tracking-wider text-white/70 mb-3">
              {STORIES[0].season}
            </p>
            <p className="font-display text-5xl md:text-7xl leading-none">
              {STORIES[0].title}
            </p>
            <p className="mt-4 max-w-md text-white/85">{STORIES[0].tagline}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
              Shop the story
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </div>
        </Link>
      </section>

      {/* Story grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {STORIES.slice(1).map((story) => (
            <Link
              key={story.id}
              to={`/products?category-name=${encodeURIComponent(story.id)}`}
              className="group relative block overflow-hidden rounded-card-lg"
            >
              <div className={`absolute inset-0 ${story.hue} opacity-90`} />
              {story.image ? (
                <img
                  src={story.image}
                  alt={story.title}
                  className="relative w-full h-[420px] object-cover mix-blend-overlay group-hover:scale-[1.03] transition-transform duration-700"
                />
              ) : (
                <div className="relative w-full h-[420px]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-1/85 via-ink-1/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-[11px] uppercase tracking-wider text-white/70">
                  {story.season}
                </p>
                <p className="font-display text-3xl mt-1">{story.title}</p>
                <p className="text-sm text-white/80 mt-2 line-clamp-2">
                  {story.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Sign-off */}
        <div className="mt-16 bg-surface-2 rounded-card-lg p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-3xl text-ink-1 leading-tight">
              Want to be in the next edit?
            </p>
            <p className="text-ink-muted mt-2 max-w-md">
              We cast from our community every quarter — Nairobi-based stylists,
              creatives, and customers we love.
            </p>
          </div>
          <Link to="/contact" className="btn-pill btn-primary">
            Get in touch
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Lookbook;
