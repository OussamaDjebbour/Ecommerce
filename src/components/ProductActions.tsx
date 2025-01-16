import React from 'react';

export function ProductActions() {
  return (
    <div className="flex gap-4">
      <button className="flex-1 px-6 py-3 border-2 border-teal-500 text-teal-500 rounded-lg font-medium">
        Add to cart
      </button>
      <button className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-lg font-medium">
        Buy now
      </button>
    </div>
  );
}