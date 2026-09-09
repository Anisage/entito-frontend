import { useState } from "react";
import { Link } from "react-router-dom";
import { Gift, ArrowUpRight, Sparkles } from "lucide-react";

const PRESETS = [1000, 2500, 5000, 10000, 25000];

const GiftCards = () => {
  const [amount, setAmount] = useState<number>(5000);
  const [recipient, setRecipient] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [note, setNote] = useState("");

  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <span className="text-ink-1">Gift cards</span>
          </nav>
          <span className="chip mb-4">
            <Gift size={12} /> Always the right fit
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight mt-3">
            The safest bet<br /> for the most stylish person you know.
          </h1>
          <p className="text-ink-muted mt-4 max-w-xl">
            Digital gift cards from KSh 1,000 to KSh 50,000. Delivered by email,
            redeemable instantly, valid for two years.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Preview */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-card-lg bg-gradient-to-br from-ink-1 via-ink-2 to-ink-1 p-8 md:p-10 aspect-[3/4] flex flex-col justify-between text-white shadow-xl">
              <div>
                <div className="flex items-baseline">
                  <span className="font-display text-5xl">BR.</span>
                  <span className="font-display text-5xl text-white/40">F</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-white/50 mt-2">
                  Gift card
                </p>
              </div>
              <div>
                <p className="text-xs text-white/50">Value</p>
                <p className="font-display text-6xl mt-1">
                  KSh {amount.toLocaleString("en-KE")}
                </p>
                {recipient && (
                  <p className="text-sm text-white/70 mt-4">For {recipient}</p>
                )}
                {note && (
                  <p className="text-sm text-white/60 mt-2 italic line-clamp-3">
                    "{note}"
                  </p>
                )}
              </div>
              <Sparkles
                size={48}
                className="absolute -top-4 -right-4 text-white/5"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface border border-line-soft rounded-card-lg p-6 md:p-8">
              <p className="font-display text-2xl text-ink-1 mb-5">
                Build the gift
              </p>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ink-muted mb-2">
                  Amount
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className={`btn-pill ${
                        amount === preset ? "btn-primary" : "btn-ghost"
                      }`}
                    >
                      KSh {preset.toLocaleString("en-KE")}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 max-w-xs">
                  <span className="text-sm text-ink-muted">Custom:</span>
                  <input
                    type="number"
                    min={500}
                    max={50000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    className="flex-1 bg-page border border-line rounded-card px-3 py-2 text-sm text-ink-1 focus:outline-none focus:border-ink-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-muted mb-2">
                    Recipient name
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full bg-page border border-line rounded-card px-4 py-3 text-sm text-ink-1 focus:outline-none focus:border-ink-1"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-muted mb-2">
                    Recipient email
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full bg-page border border-line rounded-card px-4 py-3 text-sm text-ink-1 focus:outline-none focus:border-ink-1"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs uppercase tracking-wider text-ink-muted mb-2">
                  Note (optional)
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Happy birthday — pick something you'll wear forever."
                  className="w-full bg-page border border-line rounded-card px-4 py-3 text-sm text-ink-1 focus:outline-none focus:border-ink-1 resize-none"
                />
              </div>

              <button
                type="button"
                className="btn-pill btn-primary mt-6 w-full justify-center"
                onClick={() => alert("Checkout flow coming soon.")}
              >
                Continue to checkout
                <ArrowUpRight size={14} />
              </button>
              <p className="text-xs text-ink-muted mt-3">
                Cards are sent to the recipient's email the moment payment clears.
                Valid for two years. Non-refundable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GiftCards;
