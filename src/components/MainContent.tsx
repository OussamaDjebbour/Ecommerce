import React from 'react';
import { ProductDetail } from './ProductDetail';
import { SummerPromo } from './SummerPromo';
import { DailyDeals } from './DailyDeals';
import { PopularCategories } from './PopularCategories';

export function MainContent() {
  return (
    <div className="pt-24 pl-64 pr-8">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <ProductDetail />
          <div className="mt-8">
            <PopularCategories />
          </div>
        </div>
        <div className="col-span-4">
          <SummerPromo />
          <div className="mt-8">
            <DailyDeals />
          </div>
        </div>
      </div>
    </div>
  );
}