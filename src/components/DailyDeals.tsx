import React from 'react';

export function DailyDeals() {
  return (
    <div className="bg-blue-100 rounded-xl p-6 mx-4 mb-8">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">Daily Deals</h3>
        <button className="text-sm text-teal-500">View all</button>
      </div>
      
      <div className="space-y-4">
        {[
          {
            name: 'Beats new studio blue headset',
            price: '$320',
            reviews: '256 Reviews',
            orders: '1628 orders'
          },
          {
            name: 'Beats pro wireless Headset',
            price: '$199',
            reviews: '205 Reviews',
            orders: '1906 orders'
          }
        ].map((deal, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg p-2">
              <img 
                src={`/images/beats-${i === 0 ? 'blue' : 'black'}.png`}
                alt={deal.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">{deal.name}</h4>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-600">Price {deal.price}</span>
                <div className="text-xs text-gray-500">
                  <div>{deal.reviews}</div>
                  <div>{deal.orders}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}