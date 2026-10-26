import { useState } from 'react';
import FAQItem from './FAQItem';
import { RETURN_CONDITION, RETURN_WINDOW_DAYS } from '../../content/policy';

const FAQS = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Answers a customer will hold Entito to, so each one has to match what
  // the shop actually does.
  //
  // What was here promised free Nairobi returns, same-day delivery before
  // 1pm, and shipping across East Africa with tariffs calculated at
  // checkout - none of which exists; delivery is Kenya-only, by zone. The
  // fourth answered "How does the AI try-on work?", from the hair
  // business this codebase began as.
  const faqs = [
    {
      question: 'How do I pay?',
      answer:
        "Online payment isn't switched on yet. Place your order and we'll contact you to arrange payment and confirm delivery before anything ships.",
    },
    {
      question: 'How much is delivery?',
      answer:
        'It depends where you are. Pick your area at checkout and the fee is shown before you place the order — nothing is added afterwards.',
    },
    {
      question: "What's your return policy?",
      answer: `${RETURN_WINDOW_DAYS} days from delivery, for pieces that are ${RETURN_CONDITION}.`,
    },
    {
      question: 'What sizes do you carry?',
      answer:
        'XS to XL, varying by piece. Every product page lists the sizes available for that garment, and the size guide has the measurements.',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <span className="chip mb-4">FAQ</span>
          <h2 className="font-display text-4xl md:text-5xl text-ink-1 mt-3 leading-tight">
            Questions, answered
          </h2>
          <p className="text-ink-muted mt-6 leading-relaxed max-w-sm">
            {/* +254 700 000 000 is not a real number. Put Entito's own
                here - an unanswered contact line is worse than none. */}
            Still curious? Get in touch and we&rsquo;ll come back to you.
          </p>
        </div>
        <div className="lg:col-span-7">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQS;
