import { Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: {
    text: string;
    name: string;
    initials: string;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
  <div className="bg-surface border border-line-soft rounded-card-lg p-8 h-full flex flex-col">
    <div className="flex items-center gap-1 mb-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="text-sun fill-sun" />
      ))}
    </div>
    <p className="text-ink-1 leading-relaxed text-[15px] flex-1">
      {testimonial.text}
    </p>
    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-line-soft">
      <div className="w-10 h-10 bg-surface-2 rounded-full flex items-center justify-center text-ink-1 text-sm font-medium">
        {testimonial.initials}
      </div>
      <div>
        <div className="text-sm font-medium text-ink-1">{testimonial.name}</div>
        <div className="text-xs text-ink-muted">Verified buyer</div>
      </div>
    </div>
  </div>
);

export default TestimonialCard;
