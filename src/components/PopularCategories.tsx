import React from 'react';

export function PopularCategories() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Explore Popular Categories</h3>
        <button className="text-teal-500">See all →</button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-semibold mb-2">Popular top 10 brands</h4>
          <p className="text-sm text-gray-600 mb-4">5,400+ Orders & reviews</p>
          <div className="flex -space-x-2">
            <img className="w-8 h-8 rounded-full border-2 border-white" src="/brand1.jpg" alt="" />
            <img className="w-8 h-8 rounded-full border-2 border-white" src="/brand2.jpg" alt="" />
            <img className="w-8 h-8 rounded-full border-2 border-white" src="/brand3.jpg" alt="" />
            <img className="w-8 h-8 rounded-full border-2 border-white" src="/brand4.jpg" alt="" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-semibold mb-2">Newest Sellers</h4>
          <p className="text-sm text-gray-600 mb-4">4,600+ Orders & reviews</p>
          <div className="flex -space-x-2">
            <img className="w-8 h-8 rounded-full border-2 border-white" src="/seller1.jpg" alt="" />
            <img className="w-8 h-8 rounded-full border-2 border-white" src="/seller2.jpg" alt="" />
            <img className="w-8 h-8 rounded-full border-2 border-white" src="/seller3.jpg" alt="" />
            <img className="w-8 h-8 rounded-full border-2 border-white" src="/seller4.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}