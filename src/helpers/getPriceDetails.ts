// helpers/priceUtils.ts
import { Product, CartItemType } from "../types";

export function getPriceDetails(product: Product | CartItemType) {
  const originalPrice = product?.price;
  const discountPercentage = product?.discountPercentage || 0;
  const discountedPrice =
    discountPercentage > 0
      ? originalPrice * (1 - discountPercentage / 100)
      : originalPrice;

  return {
    originalPrice: Number(originalPrice?.toFixed(2)),
    discountedPrice: Number(discountedPrice?.toFixed(2)),
    savings:
      discountPercentage > 0
        ? Number((originalPrice - discountedPrice)?.toFixed(2))
        : 0,
    hasDiscount: discountPercentage > 0,
  };
}
