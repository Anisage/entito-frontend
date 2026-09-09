import { Link } from "react-router-dom";
import { Users, Percent, BarChart3, ArrowUpRight } from "lucide-react";

const TIERS = [
  {
    name: "Creator",
    rate: "12%",
    body:
      "For stylists, hair influencers, and editorial creators with an engaged audience in Kenya.",
    perks: ["12% on every referred order", "Custom code for your community", "Free try-on credits"],
  },
  {
    name: "Partner",
    rate: "18%",
    body:
      "For salons and beauty businesses that resell or recommend BR.F to their clients in-chair.",
    perks: ["18% on every referred order", "Co-branded landing page", "Quarterly product seeding"],
    featured: true,
  },
  {
    name: "Studio",
    rate: "Custom",
    body:
      "For larger publishers, agencies, and multi-location studios — bespoke economics and reporting.",
    perks: ["Negotiated commission", "Dedicated account lead", "Custom reporting & creatives"],
  },
];

const Affiliates = () => {
  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <span className="text-ink-1">Affiliates</span>
          </nav>
          <span className="chip mb-4">
            <Users size={12} /> Creator program
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight mt-3">
            Earn what you<br /> actually deserve.
          </h1>
          <p className="text-ink-muted mt-4 max-w-xl">
            BR.F's affiliate programme is built for stylists, creators, and salons —
            with rates that respect the work you do bringing customers in.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-card-lg p-6 md:p-8 ${
                tier.featured
                  ? "bg-ink-1 text-white"
                  : "bg-surface border border-line-soft"
              }`}
            >
              <p className={`text-xs uppercase tracking-wider ${tier.featured ? "text-white/60" : "text-ink-muted"}`}>
                {tier.name}
              </p>
              <p className={`font-display text-5xl mt-2 ${tier.featured ? "text-white" : "text-ink-1"}`}>
                {tier.rate}
              </p>
              <p className={`text-sm mt-3 ${tier.featured ? "text-white/70" : "text-ink-muted"}`}>
                {tier.body}
              </p>
              <ul className={`mt-5 space-y-2 text-sm ${tier.featured ? "text-white/85" : "text-ink-1"}`}>
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <Percent size={12} className="mt-1.5 shrink-0 opacity-60" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`btn-pill mt-6 inline-flex ${
                  tier.featured
                    ? "bg-white text-ink-1 hover:bg-white/90"
                    : "btn-ghost"
                }`}
              >
                Apply
                <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-surface border border-line-soft rounded-card-lg p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <BarChart3 size={18} className="text-ink-1 mb-3" />
            <p className="font-display text-xl text-ink-1">Live dashboard</p>
            <p className="text-sm text-ink-muted mt-2">
              Track clicks, orders, and payouts in real time from your account.
            </p>
          </div>
          <div>
            <Percent size={18} className="text-ink-1 mb-3" />
            <p className="font-display text-xl text-ink-1">Monthly payouts</p>
            <p className="text-sm text-ink-muted mt-2">
              Paid via M-Pesa or bank transfer on the first business day of each month.
            </p>
          </div>
          <div>
            <Users size={18} className="text-ink-1 mb-3" />
            <p className="font-display text-xl text-ink-1">90-day cookie</p>
            <p className="text-sm text-ink-muted mt-2">
              You get credit even when a customer takes their time. Industry-leading window.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Affiliates;
