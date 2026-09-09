import { Link } from "react-router-dom";
import { ArrowUpRight, Camera, Sparkles } from "lucide-react";

interface Story {
  id: string;
  title: string;
  season: string;
  tagline: string;
  image: string;
  hue: string;
}

const STORIES: Story[] = [
  {
    id: "harvest",
    title: "Harvest",
    season: "FW 2026 · Edit 01",
    tagline:
      "Earth-toned weaves and braided crowns shot at golden hour in Karura.",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1600&q=80",
    hue: "bg-[#d8a47f]",
  },
  {
    id: "matatu-nights",
    title: "Matatu Nights",
    season: "FW 2026 · Edit 02",
    tagline:
      "After-dark colour: sapphire bobs, neon liner, and the city blurring behind.",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80",
    hue: "bg-[#1d2440]",
  },
  {
    id: "sunday-soft",
    title: "Sunday Soft",
    season: "SS 2026 · Edit 03",
    tagline:
      "Honey extensions and slip dresses, photographed on the way to brunch.",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&q=80",
    hue: "bg-[#f3d9b1]",
  },
  {
    id: "studio-blue",
    title: "Studio Blue",
    season: "SS 2026 · Edit 04",
    tagline:
      "Sleek lace fronts paired with linen tailoring — a quiet, deliberate palette.",
    image:
      "https://images.unsplash.com/photo-1488508872907-592763824245?w=1600&q=80",
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
          to={`/products?category-name=${STORIES[0].id}`}
          className="group relative block overflow-hidden rounded-card-lg"
        >
          <div className={`absolute inset-0 ${STORIES[0].hue} opacity-90`} />
          <img
            src={STORIES[0].image}
            alt={STORIES[0].title}
            className="relative w-full h-[480px] md:h-[640px] object-cover mix-blend-overlay group-hover:scale-[1.02] transition-transform duration-700"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
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
              to={`/products?category-name=${story.id}`}
              className="group relative block overflow-hidden rounded-card-lg"
            >
              <div className={`absolute inset-0 ${story.hue} opacity-90`} />
              <img
                src={story.image}
                alt={story.title}
                className="relative w-full h-[420px] object-cover mix-blend-overlay group-hover:scale-[1.03] transition-transform duration-700"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
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
