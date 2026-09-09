import type React from 'react';

interface PaymentMethodOptionProps {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const PaymentMethodOption: React.FC<PaymentMethodOptionProps> = ({ children, selected, onClick }) => {
  const cls = 'h-14 rounded-card border flex justify-center items-center gap-1 transition-all ' +
    (selected ? 'border-ink-1 bg-ink-1 text-white' : 'border-line bg-surface hover:border-ink-1 text-ink-1');
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
};

export default PaymentMethodOption;
