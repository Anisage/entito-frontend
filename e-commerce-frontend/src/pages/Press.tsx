import { Link } from "react-router-dom";
import { Download, ArrowUpRight, Newspaper } from "lucide-react";

interface Mention {
  outlet: string;
  date: string;
  headline: string;
  url: string;
}

const MENTIONS: Mention[] = [
  {
    outlet: "Business Daily",
    date: "May 2026",
    headline: "Nairobi-based BR.F is betting on AI try-on for hair and beauty",
    url: "#",
  },
  {
    outlet: "Techweez",
    date: "April 2026",
    headline: "BR.F launches visual search powered by OpenCLIP and pgvector",
    url: "#",
  },
  {
    outlet: "Capital FM",
    date: "March 2026",
    headline: "Local commerce: the storefronts redesigning the Kenyan shopping experience",
    url: "#",
  },
];

const Press = () => {
  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <span className="text-ink-1">Press</span>
          </nav>
          <span className="chip mb-4">
            <Newspaper size={12} /> Press &amp; media
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight mt-3">
            For journalists,<br /> partners, and the curious.
          </h1>
          <p className="text-ink-muted mt-4 max-w-xl">
            Looking for our brand assets, founder bios, or the latest from BR.F?
            You'll find it all below — and you can always reach our team directly.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <a
            href="#"
            className="bg-surface border border-line-soft rounded-card-lg p-6 hover:border-ink-1/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center mb-4">
              <Download size={16} className="text-ink-1" />
            </div>
            <p className="font-display text-2xl text-ink-1">Brand kit</p>
            <p className="text-sm text-ink-muted mt-2">
              Logos, wordmarks, colour tokens, and usage guidelines. ZIP, 18 MB.
            </p>
          </a>
          <a
            href="#"
            className="bg-surface border border-line-soft rounded-card-lg p-6 hover:border-ink-1/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center mb-4">
              <Download size={16} className="text-ink-1" />
            </div>
            <p className="font-display text-2xl text-ink-1">Founder bios</p>
            <p className="text-sm text-ink-muted mt-2">
              Short and long-form bios for the BR.F leadership team. PDF.
            </p>
          </a>
          <a
            href="#"
            className="bg-surface border border-line-soft rounded-card-lg p-6 hover:border-ink-1/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center mb-4">
              <Download size={16} className="text-ink-1" />
            </div>
            <p className="font-display text-2xl text-ink-1">Product imagery</p>
            <p className="text-sm text-ink-muted mt-2">
              High-resolution product and editorial shots, free for editorial use.
            </p>
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <p className="font-display text-3xl text-ink-1 mb-6">In the news</p>
        <div className="space-y-3">
          {MENTIONS.map((m) => (
            <a
              key={m.headline}
              href={m.url}
              className="bg-surface border border-line-soft rounded-card-lg p-5 md:p-6 flex items-center justify-between gap-4 group hover:border-ink-1/30 transition-colors"
            >
              <div>
                <div className="flex items-center gap-3 text-xs text-ink-muted">
                  <span className="uppercase tracking-wider">{m.outlet}</span>
                  <span>·</span>
                  <span>{m.date}</span>
                </div>
                <p className="text-ink-1 mt-1">{m.headline}</p>
              </div>
              <ArrowUpRight
                size={18}
                className="text-ink-muted shrink-0 group-hover:text-ink-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </a>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-display text-3xl text-ink-1">Press enquiries</p>
            <p className="text-ink-muted mt-2 max-w-md">
              For interviews, quotes, or product loans, email{" "}
              <span className="text-ink-1">press@br-f.co.ke</span>. We aim to reply
              within one business day.
            </p>
          </div>
          <Link to="/contact" className="btn-pill btn-primary">
            Contact us
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Press;
