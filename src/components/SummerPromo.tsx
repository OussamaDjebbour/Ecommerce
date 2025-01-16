import React from 'react';

export function SummerPromo() {
  return (
    <div className="bg-blue-100 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-2">Summer headphones</h2>
      <p className="text-gray-600 mb-4">from top brands</p>
      <button className="bg-teal-500 text-white px-4 py-2 rounded-lg">
        Buy it now →
      </button>
      <img 
        src="/images/summer-promo.png" 
        alt="Summer Headphones" 
        className="mt-4"
      />
    </div>
  );
}