import { Scissors, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { RETURN_CONDITION, RETURN_WINDOW_DAYS } from '../../content/policy';

/**
 * Four things a shopper should know before she buys. Each one has to be
 * true, because this sits directly above the products.
 *
 * Two were not. "4.8/5 rating, based on 2,340+ reviews" was invented - the
 * shop has no reviews at all - and "Free delivery on orders over Ksh 5,000"
 * contradicts checkout, where delivery is priced by area with no free
 * threshold. "Ethically made / small-batch & sustainable" went too: it is a
 * claim about Entito's supply chain that nobody here can stand behind.
 */
const items = [
  {
    icon: Scissors,
    title: "Entito's own line",
    sub: 'Designed and made by us',
  },
  {
    icon: Truck,
    title: 'Countrywide delivery',
    sub: 'Priced by area, shown at checkout',
  },
  {
    icon: RefreshCw,
    title: `${RETURN_WINDOW_DAYS}-day returns`,
    sub: RETURN_CONDITION,
  },
  {
    icon: ShieldCheck,
    title: 'Pay on confirmation',
    sub: "We'll be in touch to arrange it",
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
