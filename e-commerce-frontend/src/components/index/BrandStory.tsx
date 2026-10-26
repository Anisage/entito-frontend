import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/*
 * Entito's story, as told on the homepage.
 *
 * Everything specific that stood here was invented: "Est. 2020",
 * "small-batch and ethically produced in Nairobi", "sustainable fabric",
 * and three figures - 120+ styles in season, an average customer score of
 * 5 (from no reviews at all), and 48-hour Nairobi delivery. None of it came
 * from Entito.
 *
 * Rather than swap in different invented copy, the specifics are marked as
 * blanks for Babu to fill. A placeholder that announces itself is honest;
 * a confident wrong fact is not, and these are the kind nobody re-reads
 * once they look plausible.
 */

const BrandStory = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 rounded-card-lg overflow-hidden bg-ink-1 relative aspect-[4/3] lg:aspect-auto min-h-[420px]">
          {/* A stock photograph of denim stood here, captioned "Our craft"
              as though it were Entito's workroom. Left as a plain panel
              until there is a real photograph to put in it. */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-1 via-ink-1/70 to-ink-1/40" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <span className="chip bg-white/15 text-white border-white/20 mb-4">Our craft</span>
            <h3 className="font-display text-3xl md:text-4xl leading-tight max-w-md mt-3">
              Love the way it hangs in your closet
            </h3>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between bg-surface-2 rounded-card-lg p-8 md:p-10">
          <div>
            <h2 className="font-display text-4xl text-ink-1 leading-tight">
              Built to last, made to move
            </h2>
            <p className="text-ink-muted leading-relaxed mt-6">
              Entito designs and makes its own womenswear — considered
              pieces, cut to be worn and worn again.
            </p>
            <p className="text-ink-muted leading-relaxed mt-4 text-sm italic">
              [Entito&rsquo;s founding story goes here.]
            </p>
          </div>

          {/* The three figures that sat here were made up. Put real ones
              back when there are real ones to put. */}
          <div className="mt-10">
          </div>

          <button
            onClick={() => navigate('/about')}
            className="btn-pill btn-primary mt-8 self-start"
          >
            Read our story
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
