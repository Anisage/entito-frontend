import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";

interface Role {
  team: string;
  title: string;
  location: string;
  type: string;
  blurb: string;
}

const ROLES: Role[] = [
  {
    team: "Engineering",
    title: "Senior Full-Stack Engineer",
    location: "Nairobi · Hybrid",
    type: "Full-time",
    blurb:
      "Lead the storefront stack (React + Django) and ship our visual-search and try-on features end-to-end.",
  },
  {
    team: "Engineering",
    title: "ML Engineer — Try-on",
    location: "Remote (EAT ±3)",
    type: "Full-time",
    blurb:
      "Own our hair try-on pipeline: HairCLIP, on-device face mesh, latency and cost optimisation.",
  },
  {
    team: "Operations",
    title: "Fulfilment Lead",
    location: "Nairobi · On-site",
    type: "Full-time",
    blurb:
      "Run our Westlands fulfilment, manage boda partners, and own same-day delivery SLAs.",
  },
  {
    team: "Brand",
    title: "Senior Content Stylist",
    location: "Nairobi · Hybrid",
    type: "Contract · 6 months",
    blurb:
      "Cast, style, and produce our quarterly Lookbook editorials. Strong portfolio in beauty and editorial.",
  },
];

const Careers = () => {
  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <span className="text-ink-1">Careers</span>
          </nav>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight">
            Build the storefront<br /> Kenya deserves.
          </h1>
          <p className="text-ink-muted mt-4 max-w-xl">
            We're a small, opinionated team based in Westlands. We hire for craft,
            calm, and curiosity — and we pay competitively against Nairobi tech rates,
            with options for everyone we bring on.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex items-end justify-between mb-6">
          <p className="font-display text-3xl text-ink-1">Open roles</p>
          <span className="text-xs text-ink-muted">
            {ROLES.length} {ROLES.length === 1 ? "position" : "positions"}
          </span>
        </div>
        <div className="space-y-3">
          {ROLES.map((role) => (
            <div
              key={role.title}
              className="bg-surface border border-line-soft rounded-card-lg p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 group hover:border-ink-1/30 transition-colors"
            >
              <div className="flex-1">
                <span className="text-xs uppercase tracking-wider text-ink-muted">
                  {role.team}
                </span>
                <p className="font-display text-2xl text-ink-1 mt-1">{role.title}</p>
                <p className="text-sm text-ink-muted mt-2 max-w-2xl">{role.blurb}</p>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-ink-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={12} /> {role.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} /> {role.type}
                  </span>
                </div>
              </div>
              <Link to="/contact" className="btn-pill btn-primary self-start md:self-center">
                Apply
                <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <p className="font-display text-3xl text-ink-1">
            Don't see your role?
          </p>
          <p className="text-ink-muted mt-3 max-w-xl">
            We're always open to meeting strong people, especially in product,
            data, and supply chain. Send a note and a portfolio — we read everything.
          </p>
          <Link to="/contact" className="btn-pill btn-primary mt-6 inline-flex">
            Get in touch
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Careers;
