import { ArrowUpRight } from 'lucide-react';

const BrandStory = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 rounded-card-lg overflow-hidden bg-ink-1 relative aspect-[4/3] lg:aspect-auto min-h-[420px]">
          <img
            src="/assets/images/cool-denim.jpg"
            alt="Brand story"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-1/80 via-ink-1/10 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <span className="chip bg-white/15 text-white border-white/20 mb-4">Our craft</span>
            <h3 className="font-display text-3xl md:text-4xl leading-tight max-w-md mt-3">
              Love the way it hangs in your closet
            </h3>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between bg-surface-2 rounded-card-lg p-8 md:p-10">
          <div>
            <span className="chip mb-4">Est. 2020</span>
            <h2 className="font-display text-4xl text-ink-1 leading-tight mt-2">
              Built to last, made to move
            </h2>
            <p className="text-ink-muted leading-relaxed mt-6">
              BR.F is small-batch and ethically produced in Nairobi. Every piece starts with sustainable fabric and ends in a wardrobe that gets better with time.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-10">
            <div>
              <p className="font-display text-3xl text-ink-1">120+</p>
              <p className="text-xs text-ink-muted mt-1">Styles in season</p>
            </div>
            <div>
              <p className="font-display text-3xl text-ink-1">5</p>
              <p className="text-xs text-ink-muted mt-1">Avg. customer score</p>
            </div>
            <div>
              <p className="font-display text-3xl text-ink-1">48h</p>
              <p className="text-xs text-ink-muted mt-1">Nairobi delivery</p>
            </div>
          </div>

          <button className="btn-pill btn-primary mt-8 self-start">
            Read our story
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
