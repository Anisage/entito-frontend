import type React from 'react';

interface DeliveryMethodOptionProps {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
  sub?: string;
}

const DeliveryMethodOption: React.FC<DeliveryMethodOptionProps> = ({ icon, label, selected, onClick, sub }) => {
  const wrap = 'p-4 rounded-card border text-left transition-all ' +
    (selected ? 'border-ink-1 bg-ink-1 text-white' : 'border-line hover:border-ink-1 bg-surface text-ink-1');
  const iconBg = 'w-9 h-9 rounded-full flex items-center justify-center mb-3 ' +
    (selected ? 'bg-white/10' : 'bg-surface-3');
  const subCls = 'text-xs mt-0.5 ' + (selected ? 'text-white/60' : 'text-ink-muted');

  return (
    <button onClick={onClick} className={wrap}>
      <div className={iconBg}>{icon}</div>
      <p className="text-sm font-medium">{label}</p>
      {sub && <p className={subCls}>{sub}</p>}
    </button>
  );
};

export default DeliveryMethodOption;
