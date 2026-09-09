import { Star, Truck, RefreshCw, Leaf } from 'lucide-react';

const items = [
  {
    icon: Star,
    title: '4.8/5 rating',
    sub: 'Based on 2,340+ reviews',
  },
  {
    icon: Truck,
    title: 'Free delivery',
    sub: 'On orders over Ksh 5,000',
  },
  {
    icon: RefreshCw,
    title: '7-day returns',
    sub: 'Try at home, return free',
  },
  {
    icon: Leaf,
    title: 'Ethically made',
    sub: 'Small-batch & sustainable',
  },
];

const Promotions = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {items.map(({ icon: Icon, title, sub }) => (
          <div
            key={title}
            className="flex items-center gap-4 p-5 bg-surface rounded-card border border-line-soft"
          >
            <div className="w-12 h-12 rounded-full bg-surface-3 flex items-center justify-center shrink-0">
              <Icon size={20} className="text-ink-1" />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-sm text-ink-1">{title}</h3>
              <p className="text-xs text-ink-muted truncate">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promotions;
