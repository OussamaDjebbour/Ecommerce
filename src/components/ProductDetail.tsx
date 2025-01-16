import React from 'react';
import { ProductColors } from './ProductColors';
import { ProductQuantity } from './ProductQuantity';
import { ProductActions } from './ProductActions';

export function ProductDetail() {
  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-6">
        {/* Mobile Title */}
        <div className="lg:hidden">
          <h1 className="text-2xl font-bold">Headphones</h1>
          <p className="text-sm text-gray-600">From top brands</p>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-8">
          <img 
            src="/images/beats-green.png" 
            alt="Beats Studio3 Wireless Headphone" 
            className="w-full h-auto max-w-[280px] mx-auto"
          />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Beats Studio3 Wireless Headphone</h2>
          
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {'★'.repeat(5)}
            </div>
            <span className="text-sm text-gray-600">(2000+ Reviews)</span>
          </div>
          
          <p className="text-sm text-gray-600">
            Ergonomic ear cups with on-ear controls. Up to 22 hours of listening time. 
            Apple W1 chip & Class 1 Wireless Bluetooth.
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-teal-500">$349.95</span>
            <ProductQuantity />
          </div>
          
          <ProductColors />
          <ProductActions />
        </div>
      </div>
    </div>
  );
}