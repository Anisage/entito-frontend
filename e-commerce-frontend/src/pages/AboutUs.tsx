import { Link } from "react-router-dom";
import { Sparkles, Heart, Globe, ArrowUpRight } from "lucide-react";

const PILLARS = [
  {
    icon: Sparkles,
    title: "Try-on first",
    body:
      "Every wig, weave, and frame we sell can be previewed on your own face before checkout. No more guessing from a flat-lay.",
  },
  {
    icon: Heart,
    title: "Made for here",
    body:
      "Pricing in KSh, M-Pesa at checkout, and same-day boda delivery across Nairobi. Built for the way Kenya actually shops.",
  },
  {
    icon: Globe,
    title: "Honest sourcing",
    body:
      "We work directly with small ateliers and verified suppliers — and we share who made what, where, on every product page.",
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
            BR.F is an AI-powered try-on marketplace for hair, beauty, and ready-to-wear.
            We started in 2026 with a simple idea: people deserve to see how something
            actually looks on them before they pay for it.
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
              BR.F was founded in Nairobi by a group of designers, engineers, and
              stylists who were tired of buying online and being disappointed by what
              arrived. Hair, especially, was a guessing game — colour off, density wrong,
              cut unflattering.
            </p>
            <p>
              So we built the try-on layer first, then the storefront around it. Drop a
              selfie, see the piece on you, and decide with confidence. Pay with M-Pesa,
              have it delivered before sunset.
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
              We're at Westlands by appointment, and always in your inbox.
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
