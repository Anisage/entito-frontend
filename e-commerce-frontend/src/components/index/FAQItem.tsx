import { Plus } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-line">
    <button
      className="w-full py-6 text-left flex justify-between items-center gap-4 group"
      onClick={onClick}
    >
      <span className="font-medium text-[17px] text-ink-1 group-hover:text-ink-muted transition-colors">
        {question}
      </span>
      <div
        className={`w-10 h-10 rounded-full border border-line flex items-center justify-center transition-all duration-300 shrink-0 ${
          isOpen ? 'rotate-45 bg-ink-1 text-white border-ink-1' : 'text-ink-1'
        }`}
      >
        <Plus className="w-4 h-4" />
      </div>
    </button>
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <p className="text-ink-muted leading-relaxed max-w-2xl">{answer}</p>
      </div>
    </div>
  </div>
);

export default FAQItem;
