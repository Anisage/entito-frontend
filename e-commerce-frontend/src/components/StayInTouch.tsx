import { ArrowUpRight } from "lucide-react";

const StayInTouch = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      <div className="bg-surface-2 rounded-card-lg p-10 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-10 left-10 hidden md:block">
          <div className="w-24 h-24 rounded-2xl bg-coral-soft rotate-12" />
        </div>
        <div className="absolute bottom-10 right-10 hidden md:block">
          <div className="w-24 h-24 rounded-2xl bg-sand -rotate-12" />
        </div>

        <p className="chip mx-auto mb-6">Newsletter</p>
        <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-ink-1 mb-4">
          Stay in touch
        </h2>
        <p className="text-ink-muted max-w-md mx-auto mb-8">
          Get first dibs on drops, exclusive offers, and styling notes — straight to your inbox.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row items-stretch gap-2 max-w-md mx-auto bg-white p-1.5 rounded-full border border-line"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-3 text-sm bg-transparent focus:outline-none rounded-full"
          />
          <button
            type="submit"
            className="btn-pill btn-primary"
          >
            Join us
            <ArrowUpRight size={16} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default StayInTouch;
