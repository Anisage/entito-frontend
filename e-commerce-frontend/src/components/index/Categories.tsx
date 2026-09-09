import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Category {
  name: string;
  count: string;
  bg: string;
  image: string;
}

const categories: Category[] = [
  { name: 'Outerwear', count: '124 items', bg: 'bg-surface-2', image: '/assets/images/cool-denim.jpg' },
  { name: 'Streetwear', count: '86 items', bg: 'bg-sand', image: '/assets/images/hoodie.jpg' },
  { name: 'Footwear', count: '52 items', bg: 'bg-coral-soft', image: '/assets/images/sweat-shirt.jpg' },
  { name: 'Accessories', count: '38 items', bg: 'bg-mint', image: '/assets/images/woolen-denim.jpg' },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      <header className="flex items-end justify-between mb-10">
        <div>
          <span className="chip mb-4">Casual inspirations</span>
          <h2 className="font-display text-4xl md:text-5xl text-ink-1 mt-3 max-w-xl leading-tight">
            Shop by category
          </h2>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="hidden md:inline-flex btn-pill btn-ghost"
        >
          See all categories
          <ArrowUpRight size={14} />
        </button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => navigate('/products?type=' + cat.name.toLowerCase())}
            className={'relative ' + cat.bg + ' rounded-card-lg p-6 aspect-[5/6] flex flex-col justify-between text-left overflow-hidden group cursor-pointer'}
          >
            <div className="relative z-10">
              <h3 className="font-display text-2xl text-ink-1">{cat.name}</h3>
              <p className="text-xs text-ink-muted mt-1">{cat.count}</p>
            </div>
            <div className="relative z-10 self-end w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <ArrowUpRight size={18} className="text-ink-1" />
            </div>
            <img
              src={cat.image}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply group-hover:opacity-60 transition-opacity"
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
