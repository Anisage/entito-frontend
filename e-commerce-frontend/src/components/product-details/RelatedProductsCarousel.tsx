import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RelatedProductsCarousel = () => {
  const navigate = useNavigate();
  const products = [
    { id: 1, name: 'Classic Leather sneaker', price: 14915, image: '/assets/images/cool-denim.jpg', tag: 'Bestseller' },
    { id: 2, name: 'Club C 85 trainer', price: 12999, image: '/assets/images/hoodie.jpg', tag: 'New' },
    { id: 3, name: 'Nano X3 cross-trainer', price: 17950, image: '/assets/images/sweat-shirt.jpg', tag: 'Limited' },
    { id: 4, name: 'Floatride Energy 5', price: 15900, image: '/assets/images/woolen-denim.jpg', tag: 'Popular' },
  ];

  return (
    <section className="mt-24">
      <header className="flex items-end justify-between mb-10">
        <div>
          <span className="chip mb-3">You may also like</span>
          <h2 className="font-display text-3xl md:text-4xl text-ink-1 mt-2">Pair it with</h2>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-surface border border-line hover:border-ink-1 flex items-center justify-center transition-colors">
            <ChevronLeft size={14} />
          </button>
          <button className="w-10 h-10 rounded-full bg-surface border border-line hover:border-ink-1 flex items-center justify-center transition-colors">
            <ChevronRight size={14} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <article key={product.id} onClick={() => navigate('/products')} className="group cursor-pointer">
            <div className="relative aspect-[4/5] rounded-card overflow-hidden bg-surface-2">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 chip bg-white/95 backdrop-blur">{product.tag}</span>
            </div>
            <div className="pt-4 px-1 flex items-start justify-between gap-3">
              <h3 className="text-[15px] font-medium text-ink-1 leading-snug">{product.name}</h3>
              <span className="text-[15px] font-medium text-ink-1 whitespace-nowrap">
                Ksh {product.price.toLocaleString()}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 bg-ink-1 text-white rounded-card-lg p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="chip bg-white/10 text-white border-transparent mb-3">Brand spotlight</span>
          <h3 className="font-display text-2xl md:text-3xl mt-2">Popular brands, up to 25% off</h3>
        </div>
        <button onClick={() => navigate('/products')} className="btn-pill btn-light">
          Shop the edit
          <ArrowUpRight size={14} />
        </button>
      </div>
    </section>
  );
};

export default RelatedProductsCarousel;
