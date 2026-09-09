import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ArrivalCard {
  title: string;
  badge: string;
  price: string;
  was?: string;
  image: string;
}

const cards: ArrivalCard[] = [
  {
    title: 'Suede-effect jacket',
    badge: 'Overshirts',
    price: 'Ksh 11,900',
    was: 'Ksh 13,600',
    image: '/assets/images/cool-denim.jpg',
  },
  {
    title: 'Cotton zip hoodie',
    badge: 'Hoodies',
    price: 'Ksh 6,500',
    image: '/assets/images/hoodie.jpg',
  },
  {
    title: 'Heavyweight sweatshirt',
    badge: 'Tops',
    price: 'Ksh 5,800',
    image: '/assets/images/sweat-shirt.jpg',
  },
  {
    title: 'Wool blend overshirt',
    badge: 'Overshirts',
    price: 'Ksh 14,200',
    image: '/assets/images/woolen-denim.jpg',
  },
];

const FreshArrivals = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      <header className="flex items-end justify-between mb-10">
        <div>
          <span className="chip mb-4">New arrivals</span>
          <h2 className="font-display text-4xl md:text-5xl leading-tight max-w-2xl text-ink-1 mt-3">
            Fresh arrivals,<br /> handpicked for the season
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-surface border border-line hover:border-ink-1 flex items-center justify-center transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button className="w-10 h-10 rounded-full bg-surface border border-line hover:border-ink-1 flex items-center justify-center transition-colors">
            <ChevronRight size={16} />
          </button>
          <button
            onClick={() => navigate('/products')}
            className="btn-pill btn-ghost ml-2"
          >
            View all
            <ArrowUpRight size={14} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cards.map((c) => (
          <article
            key={c.title}
            onClick={() => navigate('/products')}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[3/4] rounded-card overflow-hidden bg-surface-2">
              <img
                src={c.image}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 right-3 chip bg-white/95 backdrop-blur">
                {c.badge}
              </span>
            </div>

            <div className="mt-4 px-1 flex items-start justify-between gap-3">
              <h3 className="text-[15px] font-medium text-ink-1 leading-snug">{c.title}</h3>
              <div className="flex flex-col items-end shrink-0">
                <span className="font-medium text-ink-1 text-[15px]">{c.price}</span>
                {c.was && <span className="text-xs text-ink-muted line-through">{c.was}</span>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FreshArrivals;
