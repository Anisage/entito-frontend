import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  const testimonials = [
    {
      text: "The quality is incredible and the fit is perfect. I've ordered three jackets already and they're all amazing.",
      name: 'Marcus Johnson',
      initials: 'MJ',
    },
    {
      text: 'Fast shipping, great packaging, and the clothes look exactly like the photos. BR.F has become my go-to brand.',
      name: 'Sarah Kim',
      initials: 'SK',
    },
    {
      text: 'Love the sustainable approach without compromising on style. These pieces are built to last.',
      name: 'David Rodriguez',
      initials: 'DR',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      <header className="text-center mb-12">
        <span className="chip mb-4">Loved by customers</span>
        <h2 className="font-display text-4xl md:text-5xl text-ink-1 mt-3">
          Words from the closet
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} testimonial={t} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
