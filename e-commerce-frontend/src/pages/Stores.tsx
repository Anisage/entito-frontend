import { Link } from "react-router-dom";
import { MapPin, Clock, Phone, ArrowUpRight } from "lucide-react";

interface Store {
  city: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  status: "open" | "soon";
}

const STORES: Store[] = [
  {
    city: "Nairobi",
    name: "Westlands Studio",
    address: "The Mall, Westlands · 2nd floor, Suite 214",
    hours: "Mon – Sat · 10:00 – 19:00",
    phone: "+254 700 000 000",
    status: "open",
  },
  {
    city: "Nairobi",
    name: "Karen Showroom",
    address: "Karen Crossroads · Ground floor",
    hours: "Wed – Sun · 11:00 – 18:00",
    phone: "+254 700 000 001",
    status: "open",
  },
  {
    city: "Mombasa",
    name: "Nyali Pop-up",
    address: "City Mall, Nyali · Coming Q3 2026",
    hours: "—",
    phone: "—",
    status: "soon",
  },
  {
    city: "Kisumu",
    name: "Lakeside Atelier",
    address: "Mega Plaza, Kisumu · Coming Q4 2026",
    hours: "—",
    phone: "—",
    status: "soon",
  },
];

const Stores = () => {
  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <span className="text-ink-1">Stores</span>
          </nav>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight">
            Try it on,<br /> in person.
          </h1>
          <p className="text-ink-muted mt-4 max-w-md">
            Our studios are quiet, mirrored, and stocked with the full catalogue.
            Book a fitting or walk in — coffee's on us.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {STORES.map((store) => (
            <div
              key={store.name}
              className="bg-surface border border-line-soft rounded-card-lg p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs uppercase tracking-wider text-ink-muted">
                    {store.city}
                  </span>
                  <p className="font-display text-3xl text-ink-1 mt-1">
                    {store.name}
                  </p>
                </div>
                <span
                  className={`chip ${
                    store.status === "open"
                      ? "bg-mint/15 text-mint-deep"
                      : "bg-surface-2 text-ink-muted"
                  }`}
                >
                  {store.status === "open" ? "Open now" : "Coming soon"}
                </span>
              </div>

              <ul className="mt-5 space-y-3 text-sm text-ink-1">
                <li className="flex items-start gap-3">
                  <MapPin size={14} className="text-ink-muted mt-0.5 shrink-0" />
                  <span>{store.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={14} className="text-ink-muted mt-0.5 shrink-0" />
                  <span>{store.hours}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={14} className="text-ink-muted mt-0.5 shrink-0" />
                  <span>{store.phone}</span>
                </li>
              </ul>

              {store.status === "open" && (
                <Link
                  to="/contact"
                  className="btn-pill btn-ghost mt-6 inline-flex"
                >
                  Book a fitting
                  <ArrowUpRight size={14} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Stores;
