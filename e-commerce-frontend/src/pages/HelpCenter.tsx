import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, MessageCircle, Truck, RotateCcw, CreditCard, Sparkles, ArrowUpRight } from "lucide-react";

const TOPICS = [
  { icon: Truck, title: "Delivery", to: "/delivery", body: "Same-day boda in Nairobi, EMS countrywide." },
  { icon: RotateCcw, title: "Returns", to: "/returns", body: "Free returns within 14 days on most items." },
  { icon: CreditCard, title: "Payments", to: "/checkout", body: "M-Pesa, card, and cash on delivery." },
  { icon: Sparkles, title: "Try-on", to: "/visual-search", body: "How our AI fitting works." },
];

const FAQS = [
  {
    q: "How long does delivery take in Nairobi?",
    a: "Orders placed before 14:00 are delivered the same day via our boda partners. After 14:00, expect next-day delivery before noon. We confirm a window over WhatsApp once your rider is dispatched.",
  },
  {
    q: "Can I really try a wig on before buying?",
    a: "Yes — open any product page and tap 'Try on'. Upload a clear, well-lit photo of yourself and our AI renders the piece on you. It's the same model that runs in our studios, just on your phone.",
  },
  {
    q: "Is M-Pesa available at checkout?",
    a: "M-Pesa STK push is the default for Kenyan customers. You'll receive a prompt on your phone — approve it and we pack your order. Card and cash-on-delivery are also supported.",
  },
  {
    q: "What if a wig doesn't suit me when it arrives?",
    a: "We accept returns within 14 days as long as the lace is uncut and the piece hasn't been worn. Read the full policy on the Returns page.",
  },
  {
    q: "Do you ship outside Kenya?",
    a: "Right now we ship across Kenya only. We're working on East Africa coverage (Uganda, Tanzania, Rwanda) for late 2026 — sign up to our newsletter to hear when it lands.",
  },
  {
    q: "How do I track my order?",
    a: "You'll get a tracking link by SMS as soon as your order leaves our Westlands fulfilment centre. For boda deliveries we share the rider's number so you can coordinate directly.",
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
