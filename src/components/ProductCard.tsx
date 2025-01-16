import React from 'react';

interface ProductCardProps {
  product: {
    name: string;
    price: number;
    rating: number;
    image: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex-shrink-0 w-[180px] snap-start">
      <div className="bg-gray-50 rounded-lg p-4 mb-2">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-auto"
        />
      </div>
      <h4 className="font-medium text-sm mb-1">{product.name}</h4>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold">${product.price}</span>
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm">{product.rating}</span>
        </div>
      </div>
    </div>
  );
}