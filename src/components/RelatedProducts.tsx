import React from 'react';
import { ProductCard } from './ProductCard';

export function RelatedProducts() {
  const products = [
    {
      name: 'Original Beats Solo Pro',
      price: 333.20,
      rating: 4.9,
      image: '/images/beats-blue.png'
    },
    {
      name: 'Beats Studio3 Bluetooth',
      price: 119.88,
      rating: 5.0,
      image: '/images/beats-cyan.png'
    },
    {
      name: 'Beats Solo3 Wireless',
      price: 199.95,
      rating: 4.8,
      image: '/images/beats-black.png'
    }
  ];

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Similar Products</h3>
        <button className="text-sm text-teal-500">See all</button>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 snap-x">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </div>
  );
}