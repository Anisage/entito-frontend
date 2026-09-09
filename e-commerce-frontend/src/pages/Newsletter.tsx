import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Sparkles, CheckCircle2 } from "lucide-react";

const PERKS = [
  {
    title: "Drops, two days early",
    body: "Newsletter readers see new collections 48 hours before public release.",
  },
  {
    title: "Subscriber-only sales",
    body: "Four members-only moments a year, plus an annual birthday code.",
  },
  {
    title: "Quiet inbox",
    body: "We email twice a month. No retargeting blasts, ever.",
  },
];

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <span className="text-ink-1">Newsletter</span>
          </nav>
          <span className="chip mb-4">
            <Mail size={12} /> Twice-monthly
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight mt-3">
            Subtle inbox,<br /> strong taste.
          </h1>
          <p className="text-ink-muted mt-4 max-w-xl">
            Edits, drops, and the occasional behind-the-scenes from our Westlands
            studio. We email twice a month — that's it.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PERKS.map((p) => (
            <div
              key={p.title}
              className="bg-surface border border-line-soft rounded-card-lg p-6"
            >
              <Sparkles size={16} className="text-ink-1 mb-3" />
              <p className="font-display text-xl text-ink-1">{p.title}</p>
              <p className="text-sm text-ink-muted mt-2">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-ink-1 text-white rounded-card-lg p-8 md:p-14">
          {submitted ? (
            <div className="text-center max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={22} className="text-mint" />
              </div>
              <p className="font-display text-3xl">You're on the list.</p>
              <p className="text-white/70 mt-3">
                Check your inbox for a confirmation — we'll see you on the first
                of the month.
              </p>
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center">
              <p className="font-display text-4xl md:text-5xl leading-tight">
                Join the list.
              </p>
              <p className="text-white/70 mt-4">
                Use the same email as your account to unlock early access on drop days.
              </p>
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  className="btn-pill bg-white text-ink-1 hover:bg-white/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-white/40 mt-4">
                Unsubscribe in one tap, anytime. We never share your address.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
