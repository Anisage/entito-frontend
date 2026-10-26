import { Link } from "react-router-dom";
import { Scissors, Heart, Globe, ArrowUpRight } from "lucide-react";

// "Try-on first" described previewing wigs, weaves and frames on your own
// face - the business this codebase began as. "Made for here" promised
// M-Pesa at checkout and same-day boda across Nairobi, neither of which the
// shop does. "Honest sourcing" claimed Entito publishes who made each piece
// and where, on every product page; it does not.
const PILLARS = [
  {
    icon: Scissors,
    title: "One label, start to finish",
    body:
      "Entito designs and makes its own pieces. Nothing here is another brand's, and nothing is resold.",
  },
  {
    icon: Heart,
    title: "Made for here",
    body:
      "Priced in shillings, cut for Kenyan weather and Kenyan wardrobes, delivered across the country.",
  },
  {
    icon: Globe,
    title: "Bought with a person, not a form",
    body:
      "Place an order and we speak to you directly to arrange payment and delivery. Slower than a card, and nobody is left guessing.",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <span className="text-ink-1">About us</span>
          </nav>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight">
            A modern wardrobe,<br /> from Nairobi outward.
          </h1>
          <p className="text-ink-muted mt-4 max-w-xl">
            Entito Designs is a Nairobi womenswear label. We design and make our own
            pieces, and we sell them here directly &mdash; no middlemen, no other brands.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-surface border border-line-soft rounded-card-lg p-6"
              >
                <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center mb-4">
                  <Icon size={16} className="text-ink-1" />
                </div>
                <p className="font-display text-2xl text-ink-1">{pillar.title}</p>
                <p className="text-sm text-ink-muted mt-2 leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-surface border border-line-soft rounded-card-lg p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <span className="chip mb-4">Our story</span>
            <p className="font-display text-3xl md:text-4xl text-ink-1 leading-snug mt-3">
              We're a small team building the storefront we always wanted to use.
            </p>
          </div>
          <div className="md:col-span-7 space-y-4 text-ink-muted leading-relaxed">
            <p>
              {/* TODO: replace with Entito's real founding story - when the label
                  started, who is behind it, what it set out to do. Kept deliberately
                  plain rather than invented. */}
              Entito began with a simple frustration: clothes that look right online and
              wrong in person. We keep our range small on purpose, so every piece earns
              its place.
            </p>
            {/* This described a selfie try-on feature and M-Pesa checkout,
                neither of which exists. */}
            <p>
              Ordering is deliberately unhurried: you place the order, we
              speak to you to arrange payment, and only then does it ship.
              Slower than tapping a card, and nobody is left wondering.
            </p>
            <p>
              We're still small, still iterating, and still very much listening. If
              there's something you'd like to see — a piece, a feature, a brand — tell us.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-3xl text-ink-1">Come say hi.</p>
            <p className="text-ink-muted mt-2 max-w-md">
              Online only for now &mdash; but always in your inbox.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact" className="btn-pill btn-primary">
              Contact us
              <ArrowUpRight size={14} />
            </Link>
            <Link to="/careers" className="btn-pill btn-ghost">
              We're hiring
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
