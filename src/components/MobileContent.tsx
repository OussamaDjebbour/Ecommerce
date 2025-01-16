import React from 'react';
import { ProductDetail } from './ProductDetail';
import { DailyDeals } from './DailyDeals';
import { RelatedProducts } from './RelatedProducts';

export function MobileContent() {
  return (
    <main className="max-w-lg mx-auto pb-20 pt-16">
      <ProductDetail />
      <DailyDeals />
      <RelatedProducts />
    </main>
  );
}