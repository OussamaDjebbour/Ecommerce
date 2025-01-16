import React, { useState } from 'react';

export function ProductQuantity() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-3 border rounded-lg p-1">
      <button 
        onClick={() => setQuantity(q => Math.max(1, q - 1))}
        className="w-8 h-8 flex items-center justify-center text-gray-500"
      >
        -
      </button>
      <span className="w-8 text-center">{quantity}</span>
      <button 
        onClick={() => setQuantity(q => q + 1)}
        className="w-8 h-8 flex items-center justify-center text-gray-500"
      >
        +
      </button>
    </div>
  );
}