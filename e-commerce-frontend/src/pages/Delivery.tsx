import { Link } from "react-router-dom";
import { Truck, Clock, MapPin, Package } from "lucide-react";

const ZONES = [
  {
    zone: "Nairobi metro",
    fee: "KSh 200",
    eta: "Same day (order by 14:00)",
    notes: "Boda partner, real-time tracking via WhatsApp.",
  },
  {
    zone: "Mombasa, Kisumu, Nakuru, Eldoret",
    fee: "KSh 450",
    eta: "1 – 2 business days",
    notes: "Overnight courier, signature on delivery.",
  },
  {
    zone: "Rest of Kenya",
    fee: "KSh 650",
    eta: "2 – 4 business days",
    notes: "Closest G4S / Wells Fargo collection point.",
  },
  {
    zone: "International",
    fee: "Coming late 2026",
    eta: "—",
    notes: "Uganda, Tanzania, Rwanda first. Join the list to be notified.",
  },
];

const Delivery = () => {
  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <Link to="/help" className="hover:text-ink-1">Help</Link>
            <span>/</span>
            <span className="text-ink-1">Delivery</span>
          </nav>
          <span className="chip mb-4">
            <Truck size={12} /> Shipping &amp; delivery
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight mt-3">
            Fast where it matters,<br /> careful everywhere else.
          </h1>
          <p className="text-ink-muted mt-4 max-w-xl">
            Most Nairobi orders arrive within hours. Countrywide, we use overnight
            couriers we trust — and we'll always confirm a window before we set off.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface border border-line-soft rounded-card-lg p-6">
            <Clock size={16} className="text-ink-1 mb-3" />
            <p className="font-display text-xl text-ink-1">Cut-off times</p>
            <p className="text-sm text-ink-muted mt-2">
              Order before 14:00 EAT, Monday – Saturday, for same-day Nairobi
              dispatch. Sundays go out Monday morning.
            </p>
          </div>
          <div className="bg-surface border border-line-soft rounded-card-lg p-6">
            <Package size={16} className="text-ink-1 mb-3" />
            <p className="font-display text-xl text-ink-1">Packaging</p>
            <p className="text-sm text-ink-muted mt-2">
              Discreet, plain mailers. No branding on the outside — what's inside
              is between you and your mirror.
            </p>
          </div>
          <div className="bg-surface border border-line-soft rounded-card-lg p-6">
            <MapPin size={16} className="text-ink-1 mb-3" />
            <p className="font-display text-xl text-ink-1">Live tracking</p>
            <p className="text-sm text-ink-muted mt-2">
              You'll receive an SMS the moment your order leaves us, plus the
              rider's number for boda deliveries.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <p className="font-display text-3xl text-ink-1 mb-6">Rates &amp; timing</p>
        <div className="bg-surface border border-line-soft rounded-card-lg overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-surface-2 text-xs uppercase tracking-wider text-ink-muted">
            <div className="col-span-4">Zone</div>
            <div className="col-span-2">Fee</div>
            <div className="col-span-3">ETA</div>
            <div className="col-span-3">Notes</div>
          </div>
          {ZONES.map((z, i) => (
            <div
              key={z.zone}
              className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-5 ${
                i !== ZONES.length - 1 ? "border-b border-line-soft" : ""
              }`}
            >
              <div className="md:col-span-4 text-ink-1 font-medium">{z.zone}</div>
              <div className="md:col-span-2 text-ink-1">{z.fee}</div>
              <div className="md:col-span-3 text-sm text-ink-muted">{z.eta}</div>
              <div className="md:col-span-3 text-sm text-ink-muted">{z.notes}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-muted mt-4">
          Free delivery on all orders above KSh 7,500 within Kenya.
        </p>
      </section>
    </div>
  );
};

export default Delivery;
