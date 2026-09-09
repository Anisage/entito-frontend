import { useState } from 'react';
import FAQItem from './FAQItem';

const FAQS = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What's your return policy?",
      answer: 'We offer a 7-day try-at-home window for all items. Items must be in original condition with tags attached. Returns within Nairobi are free.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Same-day delivery is available across Nairobi for orders placed before 1pm. Express country-wide delivery takes 2 to 3 working days.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship across East Africa with a 5 to 7 day window. International rates and tariffs are calculated at checkout.',
    },
    {
      question: 'How does the AI try-on work?',
      answer: 'Upload one selfie and we render the item on you in seconds. Try as many looks as you like, no measurements needed.',
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
            Still curious? Reach us on WhatsApp at +254 700 000 000 and we will get back the same day.
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
