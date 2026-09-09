import { Link } from "react-router-dom";
import { ScrollText } from "lucide-react";

interface Section {
  heading: string;
  body: string | string[];
}

interface LegalLayoutProps {
  breadcrumb: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
}

const LegalLayout: React.FC<LegalLayoutProps> = ({
  breadcrumb,
  title,
  subtitle,
  lastUpdated,
  sections,
}) => {
  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <span className="text-ink-1">{breadcrumb}</span>
          </nav>
          <span className="chip mb-4">
            <ScrollText size={12} /> Last updated {lastUpdated}
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight mt-3">
            {title}
          </h1>
          <p className="text-ink-muted mt-4 max-w-2xl">{subtitle}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Table of contents */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs uppercase tracking-wider text-ink-muted mb-3">
                On this page
              </p>
              <ul className="space-y-2 text-sm">
                {sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#section-${i}`}
                      className="text-ink-muted hover:text-ink-1 transition-colors"
                    >
                      {i + 1}. {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Body */}
          <article className="lg:col-span-9">
            <div className="bg-surface border border-line-soft rounded-card-lg p-6 md:p-10 space-y-8">
              {sections.map((s, i) => (
                <section key={s.heading} id={`section-${i}`} className="scroll-mt-24">
                  <p className="text-xs uppercase tracking-wider text-ink-muted">
                    Section {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="font-display text-2xl md:text-3xl text-ink-1 mt-1">
                    {s.heading}
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-ink-muted leading-relaxed">
                    {Array.isArray(s.body) ? (
                      s.body.map((p, j) => <p key={j}>{p}</p>)
                    ) : (
                      <p>{s.body}</p>
                    )}
                  </div>
                </section>
              ))}
            </div>
            <p className="text-xs text-ink-muted mt-6">
              Questions about this document? Email{" "}
              <span className="text-ink-1">legal@br-f.co.ke</span> or use the{" "}
              <Link to="/contact" className="text-ink-1 underline underline-offset-2">
                contact form
              </Link>
              .
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default LegalLayout;
