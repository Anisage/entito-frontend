import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, MessageCircle, Truck, RotateCcw, CreditCard, Ruler, ArrowUpRight } from "lucide-react";
import { RETURN_CONDITION, RETURN_WINDOW_DAYS } from '../content/policy';

const TOPICS = [
  { icon: Truck, title: "Delivery", to: "/delivery", body: "Countrywide, priced by the area you are in." },
  { icon: RotateCcw, title: "Returns", to: "/returns", body: `${RETURN_WINDOW_DAYS} days from delivery, ${RETURN_CONDITION}.` },
  { icon: CreditCard, title: "Payments", to: "/checkout", body: "Arranged with you after you place the order." },
  // "Try-on" pointed at visual search, which is switched off - the card
  // led to a "coming soon" page. Sizing is what shoppers actually need.
  { icon: Ruler, title: "Sizing", to: "/size-guide", body: "Measurements for every size we cut." },
];

const FAQS = [
  {
    q: "How do I pay for my order?",
    a: "Online payment isn't switched on yet. Place your order and we'll contact you to arrange payment — once it's settled we pack the order and confirm delivery. Nothing ships before then.",
  },
  {
    q: "How much is delivery, and how long does it take?",
    a: "The fee depends on your area, and you see it at checkout before you place the order. Standard delivery is 3 to 5 working days, express 1 to 2. Same-day is available within Nairobi for orders placed before noon.",
  },
  {
    q: "Do you ship outside Kenya?",
    a: "Not at the moment — we deliver across Kenya only.",
  },
  {
    q: `What if a piece doesn't fit?`,
    a: `You have ${RETURN_WINDOW_DAYS} days from delivery to send it back, as long as it is ${RETURN_CONDITION}. Read the full policy on the Returns page.`,
  },
  {
    q: "How do I track my order?",
    a: "Your order appears under your account as soon as it's placed, and we'll be in touch directly with delivery details once payment is arranged.",
  },
];

const HelpCenter = () => {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <span className="text-ink-1">Help center</span>
          </nav>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight">
            How can we help?
          </h1>
          <div className="mt-6 relative max-w-xl">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search delivery, returns, payments…"
              className="w-full bg-surface border border-line rounded-full pl-11 pr-4 py-3 text-sm text-ink-1 focus:outline-none focus:border-ink-1 placeholder:text-ink-muted"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {TOPICS.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.title}
                to={t.to}
                className="bg-surface border border-line-soft rounded-card-lg p-5 hover:border-ink-1/30 transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center mb-3">
                  <Icon size={15} className="text-ink-1" />
                </div>
                <p className="font-medium text-ink-1">{t.title}</p>
                <p className="text-xs text-ink-muted mt-1">{t.body}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <p className="font-display text-3xl text-ink-1 mb-6">Common questions</p>
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="bg-surface border border-line-soft rounded-card-lg py-12 text-center text-ink-muted">
              Nothing matched that search. Try a different word — or{" "}
              <Link to="/contact" className="text-ink-1 underline underline-offset-2">
                message us directly
              </Link>
              .
            </div>
          ) : (
            filtered.map((faq, i) => (
              <div
                key={faq.q}
                className="bg-surface border border-line-soft rounded-card-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                >
                  <span className="text-ink-1 font-medium">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-ink-muted transition-transform shrink-0 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-5 md:px-6 pb-6 text-sm text-ink-muted leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-display text-3xl text-ink-1">Still stuck?</p>
            <p className="text-ink-muted mt-2 max-w-md">
              Our care team replies within an hour during business hours
              (08:00 – 20:00 EAT).
            </p>
          </div>
          <Link to="/contact" className="btn-pill btn-primary">
            <MessageCircle size={14} />
            Talk to us
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
