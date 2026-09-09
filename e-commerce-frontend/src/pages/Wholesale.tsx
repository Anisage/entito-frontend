import { Link } from "react-router-dom";
import { Briefcase, Package, TrendingDown, ArrowUpRight } from "lucide-react";

const REASONS = [
  {
    icon: TrendingDown,
    title: "Trade pricing",
    body: "Up to 45% off retail across the catalogue, with progressive discounts above KSh 500K in monthly volume.",
  },
  {
    icon: Package,
    title: "Flexible MOQs",
    body: "Start at 20 units per style. We hold optional buffer stock at our Westlands warehouse for top-sellers.",
  },
  {
    icon: Briefcase,
    title: "Dedicated account lead",
    body: "A single point of contact, custom net-30 terms after the first three orders, and quarterly buying reviews.",
  },
];

const Wholesale = () => {
  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <span className="text-ink-1">Wholesale</span>
          </nav>
          <span className="chip mb-4">
            <Briefcase size={12} /> Trade
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight mt-3">
            Stock BR.F<br /> in your salon.
          </h1>
          <p className="text-ink-muted mt-4 max-w-xl">
            For salons, boutiques, and beauty businesses across East Africa.
            Real wholesale pricing, low MOQs, and a partner you can actually talk to.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {REASONS.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="bg-surface border border-line-soft rounded-card-lg p-6 md:p-8"
              >
                <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center mb-4">
                  <Icon size={16} className="text-ink-1" />
                </div>
                <p className="font-display text-2xl text-ink-1">{r.title}</p>
                <p className="text-sm text-ink-muted mt-3 leading-relaxed">
                  {r.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-surface border border-line-soft rounded-card-lg p-8 md:p-12">
          <p className="font-display text-3xl text-ink-1">How onboarding works</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            {[
              { n: "01", t: "Apply", b: "Send your business name, location, and what you'd like to stock." },
              { n: "02", t: "Verify", b: "We review your business in 2 – 3 business days." },
              { n: "03", t: "Open account", b: "You get a trade login with wholesale pricing live." },
              { n: "04", t: "First order", b: "Place, pay (M-Pesa or invoice), and we ship within 48 hours." },
            ].map((step) => (
              <div key={step.n}>
                <p className="font-display text-3xl text-ink-1/30">{step.n}</p>
                <p className="font-display text-xl text-ink-1 mt-2">{step.t}</p>
                <p className="text-sm text-ink-muted mt-1">{step.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-display text-3xl text-ink-1">Ready to apply?</p>
            <p className="text-ink-muted mt-2 max-w-md">
              Select 'Wholesale' on the contact form — we'll get back within
              two business days with next steps.
            </p>
          </div>
          <Link to="/contact" className="btn-pill btn-primary">
            Start application
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Wholesale;
