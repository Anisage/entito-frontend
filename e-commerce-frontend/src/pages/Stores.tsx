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

/*
 * Entito's shops.
 *
 * Four were listed here with street addresses, opening hours and phone
 * numbers: a Westlands studio at "The Mall, 2nd floor, Suite 214", a Karen
 * showroom, and pop-ups in Nyali and Kisumu. None of them exists. The
 * Westlands address is the same invented one that was on the Privacy page
 * under another company's name.
 *
 * This is the worst kind of placeholder to leave in: somebody reads it,
 * drives across Nairobi on a Saturday, and finds an office suite. Empty
 * until Entito has a real address to put here.
 */
const STORES: Store[] = [];

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
          {STORES.length === 0 && (
            <div className="col-span-full bg-surface border border-line-soft rounded-card-lg py-16 px-6 text-center">
              <p className="font-display text-2xl text-ink-1">
                We are online only, for now
              </p>
              <p className="text-ink-muted mt-3 max-w-md mx-auto text-sm">
                Entito does not have a shop you can walk into yet. Everything
                is ordered here and delivered to you, anywhere in Kenya.
              </p>
              <Link to="/products" className="btn-pill btn-primary mt-6 inline-flex">
                Shop the collection
              </Link>
            </div>
          )}
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
