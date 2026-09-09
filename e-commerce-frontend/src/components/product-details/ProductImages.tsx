import React, { useState } from 'react';
import { Expand } from 'lucide-react';
import type { Image } from '../../types/product';

interface ProductImagesProps {
  productImages: Image[] | [];
}

const ProductImages: React.FC<ProductImagesProps> = ({ productImages }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = productImages.length > 0
    ? productImages
    : [{ id: 0, image: '/assets/images/cool-denim.jpg', is_main: true, product: 0 }];

  const active = images[activeIndex] || images[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[88px_1fr] gap-4">
      {/* Thumbnails */}
      <div className="order-2 md:order-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[600px]">
        {images.slice(0, 6).map((thumb, index) => (
          <button
            key={thumb.id}
            onClick={() => setActiveIndex(index)}
            className={`shrink-0 w-20 h-24 md:w-full md:h-24 rounded-xl overflow-hidden border-2 transition-all ${
              activeIndex === index ? 'border-ink-1' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={thumb.image || ''}
              alt={`View ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="order-1 md:order-2 relative bg-surface-2 rounded-card-lg overflow-hidden aspect-[4/5]">
        <img
          src={active.image || ''}
          alt="Product"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur flex items-center justify-center hover:bg-white transition-colors">
          <Expand size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProductImages;
