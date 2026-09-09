import React, { useState } from 'react';
import ReviewsContent from './ReviewsContent';
import type { Product } from '../../types/product';

interface ProductTabsProps {
  product: Product;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState('Details');
  const tabs = ['Details', 'Reviews', 'Shipping & returns'];
  const reviews = product?.reviews || [];

  const tabClass = (active: boolean) =>
    'px-5 py-4 text-sm font-medium relative whitespace-nowrap transition-colors ' +
    (active ? 'text-ink-1' : 'text-ink-muted hover:text-ink-1');

  return (
    <section className="mt-20">
      <div className="border-b border-line">
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const active = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} className={tabClass(active)}>
                {tab}
                {active && <span className="absolute -bottom-px left-5 right-5 h-0.5 bg-ink-1 rounded-full" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="py-8">
        {activeTab === 'Details' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl">
            <div>
              <h3 className="font-display text-2xl text-ink-1 mb-4">About this piece</h3>
              <p className="text-ink-muted leading-relaxed">
                {product.description || 'A wardrobe essential cut from premium fabric and finished by hand. Designed to layer, last, and look like it was made for you.'}
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl text-ink-1 mb-4">Material and care</h3>
              <ul className="space-y-2 text-sm text-ink-muted">
                <li>{product.material || '100% organic cotton'}</li>
                <li>Machine wash cold</li>
                <li>Tumble dry low</li>
                <li>Iron on reverse if needed</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'Reviews' && <ReviewsContent reviews={reviews} />}

        {activeTab === 'Shipping & returns' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-surface border border-line-soft rounded-card p-6">
              <h3 className="font-medium text-ink-1 mb-2">Delivery</h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Same-day delivery available across Nairobi when ordered before 1pm. Nationwide express delivery in 2 to 3 days.
              </p>
            </div>
            <div className="bg-surface border border-line-soft rounded-card p-6">
              <h3 className="font-medium text-ink-1 mb-2">Returns</h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Try it at home for 7 days. If it is not right, we will collect it for free anywhere in Nairobi.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductTabs;
