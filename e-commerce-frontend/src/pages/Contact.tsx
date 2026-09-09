import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle, MapPin, Send, CheckCircle2 } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Order help");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to backend support endpoint
    setSubmitted(true);
  };

  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <span className="text-ink-1">Contact</span>
          </nav>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight">
            Talk to us.
          </h1>
          <p className="text-ink-muted mt-4 max-w-xl">
            Order issues, returns, fittings, press — we're a small team, and we
            answer everything. Aim to reply within an hour during business hours.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Channels */}
          <aside className="lg:col-span-5 space-y-4">
            <div className="bg-surface border border-line-soft rounded-card-lg p-6">
              <MessageCircle size={16} className="text-ink-1 mb-3" />
              <p className="font-display text-xl text-ink-1">WhatsApp</p>
              <p className="text-sm text-ink-muted mt-1">Fastest reply, 08:00 – 20:00 EAT.</p>
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noreferrer noopener"
                className="text-ink-1 text-sm font-medium mt-3 inline-block"
              >
                +254 700 000 000
              </a>
            </div>
            <div className="bg-surface border border-line-soft rounded-card-lg p-6">
              <Mail size={16} className="text-ink-1 mb-3" />
              <p className="font-display text-xl text-ink-1">Email</p>
              <p className="text-sm text-ink-muted mt-1">General: hello@br-f.co.ke</p>
              <p className="text-sm text-ink-muted">Press: press@br-f.co.ke</p>
            </div>
            <div className="bg-surface border border-line-soft rounded-card-lg p-6">
              <Phone size={16} className="text-ink-1 mb-3" />
              <p className="font-display text-xl text-ink-1">Phone</p>
              <p className="text-sm text-ink-muted mt-1">+254 700 000 001 · Mon – Sat, 09:00 – 18:00</p>
            </div>
            <div className="bg-surface border border-line-soft rounded-card-lg p-6">
              <MapPin size={16} className="text-ink-1 mb-3" />
              <p className="font-display text-xl text-ink-1">Visit</p>
              <p className="text-sm text-ink-muted mt-1">
                The Mall, Westlands · 2nd floor, Suite 214 · By appointment.
              </p>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface border border-line-soft rounded-card-lg p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-mint/15 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={22} className="text-mint-deep" />
                  </div>
                  <p className="font-display text-3xl text-ink-1">Got it.</p>
                  <p className="text-ink-muted mt-2 max-w-sm mx-auto">
                    We'll reply to <span className="text-ink-1">{email}</span> shortly.
                    If it's urgent, ping us on WhatsApp.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setMessage("");
                    }}
                    className="btn-pill btn-ghost mt-6"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <p className="font-display text-2xl text-ink-1 mb-2">
                    Send us a note
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-ink-muted mb-2">
                        Your name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-page border border-line rounded-card px-4 py-3 text-sm text-ink-1 focus:outline-none focus:border-ink-1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-ink-muted mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-page border border-line rounded-card px-4 py-3 text-sm text-ink-1 focus:outline-none focus:border-ink-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-muted mb-2">
                      Topic
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full bg-page border border-line rounded-card px-4 py-3 text-sm text-ink-1 focus:outline-none focus:border-ink-1"
                    >
                      <option>Order help</option>
                      <option>Returns &amp; refunds</option>
                      <option>Try-on / sizing</option>
                      <option>Wholesale</option>
                      <option>Press</option>
                      <option>Careers</option>
                      <option>Something else</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-muted mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-page border border-line rounded-card px-4 py-3 text-sm text-ink-1 focus:outline-none focus:border-ink-1 resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-pill btn-primary">
                    <Send size={14} />
                    Send message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
