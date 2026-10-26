import { useState } from "react";
import { Link } from "react-router-dom";
import { Ruler, ArrowUpRight } from "lucide-react";

// Entito sells clothing. The "Wigs & weaves" and "Eyewear" tabs that
// stood here, with cap circumferences and lens widths, belonged to the
// business this codebase started as.
type Tab = "tops" | "bottoms";

const TABS: { id: Tab; label: string }[] = [
  { id: "tops", label: "Tops & dresses" },
  { id: "bottoms", label: "Skirts & trousers" },
];

const DATA: Record<Tab, { headers: string[]; rows: string[][] }> = {
  tops: {
    headers: ["Size", "Bust (cm)", "Waist (cm)", "Hip (cm)"],
    rows: [
      ["XS", "82", "62", "88"],
      ["S", "86", "66", "92"],
      ["M", "90", "70", "96"],
      ["L", "96", "76", "102"],
      ["XL", "102", "82", "108"],
    ],
  },
  bottoms: {
    headers: ["Size", "Waist (cm)", "Hip (cm)", "Inseam (cm)"],
    rows: [
      ["XS", "62", "88", "76"],
      ["S", "66", "92", "78"],
      ["M", "70", "96", "78"],
      ["L", "76", "102", "80"],
      ["XL", "82", "108", "80"],
    ],
  },
};

const SizeGuide = () => {
  const [tab, setTab] = useState<Tab>("tops");
  const data = DATA[tab];

  return (
    <div className="bg-page">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-surface-2 rounded-card-lg p-8 md:p-12">
          <nav className="text-xs text-ink-muted mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ink-1">Home</Link>
            <span>/</span>
            <Link to="/help" className="hover:text-ink-1">Help</Link>
            <span>/</span>
            <span className="text-ink-1">Size guide</span>
          </nav>
          <span className="chip mb-4">
            <Ruler size={12} /> Find your fit
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-ink-1 leading-tight mt-3">
            Measure once,<br /> wear it forever.
          </h1>
          <p className="text-ink-muted mt-4 max-w-xl">
            Sizes are listed in centimetres —
            the way each industry actually measures. When in doubt, size up; our tailor
            in Westlands can take in seams for KSh 800 a piece.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`btn-pill ${
                tab === t.id ? "btn-primary" : "btn-ghost"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="bg-surface border border-line-soft rounded-card-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface-2 text-xs uppercase tracking-wider text-ink-muted">
              <tr>
                {data.headers.map((h) => (
                  <th key={h} className="text-left px-6 py-4 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, i) => (
                <tr
                  key={i}
                  className={
                    i !== data.rows.length - 1 ? "border-b border-line-soft" : ""
                  }
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-6 py-4 ${j === 0 ? "text-ink-1 font-medium" : "text-ink-muted"}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-surface border border-line-soft rounded-card-lg p-6 md:p-8">
            <p className="font-display text-2xl text-ink-1">How to measure</p>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted leading-relaxed">
              <li>
                <span className="text-ink-1 font-medium">Bust:</span> Around the
                fullest part, keeping the tape parallel to the floor.
              </li>
              <li>
                <span className="text-ink-1 font-medium">Waist:</span> The
                narrowest part of your torso, usually above the navel.
              </li>
              <li>
                <span className="text-ink-1 font-medium">Hip:</span> Around the
                fullest part of your hips and seat.
              </li>
            </ul>
          </div>
          <div className="bg-surface-2 rounded-card-lg p-6 md:p-8 flex flex-col justify-between">
            <div>
              <p className="font-display text-2xl text-ink-1">
                Still not sure?
              </p>
              <p className="text-ink-muted mt-3 text-sm">
                Tell us your usual size and what you're between, and we'll tell you
                honestly which one to take. We'd rather you kept the piece than
                returned it.
              </p>
            </div>
            <Link to="/contact" className="btn-pill btn-primary self-start mt-6">
              Ask us
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SizeGuide;
