import { Link } from "react-router-dom";
import { Leaf, Recycle, Package, Users } from "lucide-react";

const COMMITMENTS = [
  {
    icon: Package,
    title: "Plastic-free packaging by 2027",
    body:
      "We're transitioning to compostable mailers and recycled card inserts. Every order ships in materials we'd be comfortable handing back to the soil.",
  },
  {
    icon: Recycle,
    title: "A take-back programme for hair",
    body:
      "Send any BR.F wig back at end of life and we'll recycle the fibre or rehome it through partner salons. KSh 500 credit on every return.",
  },
  {
    icon: Users,
    title: "Living-wage supplier audits",
    body:
      "We audit every supplier annually and publish a redacted summary. If a partner can't meet the bar, we don't reorder.",
  },
  {
    icon: Leaf,
    title: "Carbon-neutral local delivery",
    body:
      "Boda partners are paid for distance, not for speed. Long-haul orders are offset through verified Kenyan reforestation projects.",
  },
];

const Sustainability = () => {
  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <span className="text-ink-1">Sustainability</span>
          </nav>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight">
            Slower, lighter,<br /> more honest.
          </h1>
          <p className="text-ink-muted mt-4 max-w-xl">
            We're not a sustainable brand yet — we're a brand that's working at it,
            in public. Here's where we are, and what we've promised ourselves
            by end of 2027.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {COMMITMENTS.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="bg-surface border border-line-soft rounded-card-lg p-6 md:p-8"
              >
                <div className="w-10 h-10 rounded-full bg-mint/15 flex items-center justify-center mb-4">
                  <Icon size={16} className="text-mint-deep" />
                </div>
                <p className="font-display text-2xl text-ink-1">{c.title}</p>
                <p className="text-sm text-ink-muted mt-3 leading-relaxed">
                  {c.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <p className="font-display text-3xl text-ink-1">Where we still fall short</p>
          <div className="grid md:grid-cols-2 gap-6 mt-6 text-ink-muted leading-relaxed">
            <p>
              Synthetic hair fibres are still the largest source of waste in our category,
              and current recycling pathways are limited. We're funding a feasibility
              study with Kenyatta University in 2026 to look at viable end-of-life options.
            </p>
            <p>
              Our supplier audit currently covers Tier 1 only. We aim to extend to Tier 2
              (fibre and raw-material producers) by 2027, but we don't have the team for it
              yet — and we'd rather under-promise than greenwash.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;
