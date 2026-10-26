import { Link } from "react-router-dom";
import { RotateCcw, CheckCircle2, XCircle, ArrowUpRight } from "lucide-react";
import { RETURN_CONDITION, RETURN_WINDOW_DAYS } from '../content/policy';

const STEPS = [
  {
    n: "01",
    title: "Get in touch",
    // There is no "Start return" button in the account area - returns are
    // arranged by hand, the same way payment is.
    body:
      "Contact us with your order number and tell us what went wrong. We will take it from there.",
  },
  {
    n: "02",
    title: "Pack it up",
    body:
      "The original mailer is ideal, or any sturdy bag if you have recycled ours. Keep the tags on.",
  },
  {
    n: "03",
    title: "Send it back",
    body:
      "We will confirm where to send it and who covers the postage when you get in touch.",
  },
  {
    n: "04",
    title: "We refund",
    body:
      "Once it reaches us and we have checked it over, we arrange your refund the same way you paid.",
  },
];

const Returns = () => {
  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <Link to="/help" className="hover:text-ink-1">Help</Link>
            <span>/</span>
            <span className="text-ink-1">Returns</span>
          </nav>
          <span className="chip mb-4">
            <RotateCcw size={12} /> {RETURN_WINDOW_DAYS}-day return window
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight mt-3">
            Didn't quite work?<br /> Send it back.
          </h1>
          <p className="text-ink-muted mt-4 max-w-xl">
            Sometimes the colour reads differently in daylight, or the fit
            just isn&rsquo;t right. You have {RETURN_WINDOW_DAYS} days from
            delivery to send most pieces back.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="bg-surface border border-line-soft rounded-card-lg p-6"
            >
              <p className="font-display text-3xl text-ink-1/30">{s.n}</p>
              <p className="font-display text-xl text-ink-1 mt-3">{s.title}</p>
              <p className="text-sm text-ink-muted mt-2 leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-surface border border-line-soft rounded-card-lg p-6 md:p-8">
            <CheckCircle2 size={18} className="text-mint-deep mb-3" />
            <p className="font-display text-2xl text-ink-1">What you can return</p>
            {/* Wigs, weaves, beauty products and eyewear were listed here.
                Entito sells its own ladies' clothing and nothing else. */}
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              <li>· Pieces that are {RETURN_CONDITION}</li>
              <li>· Anything that arrived damaged or not as described</li>
              <li>· The wrong size, where we have another to exchange it for</li>
            </ul>
          </div>
          <div className="bg-surface border border-line-soft rounded-card-lg p-6 md:p-8">
            <XCircle size={18} className="text-coral mb-3" />
            <p className="font-display text-2xl text-ink-1">What we can't take back</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              <li>· Custom or made-to-order pieces</li>
              <li>· Anything worn, washed or altered</li>
              <li>· Pieces returned without their tags</li>
              <li>· Final-sale items (clearly marked at checkout)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-display text-3xl text-ink-1">Got a faulty item?</p>
            <p className="text-ink-muted mt-2 max-w-md">
              Send us a photo within 48 hours of delivery and we'll replace it
              or refund in full — return shipping on us.
            </p>
          </div>
          <Link to="/contact" className="btn-pill btn-primary">
            Report an issue
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Returns;
