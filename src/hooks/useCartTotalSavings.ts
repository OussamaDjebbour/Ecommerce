import { Mode } from "../types";
import { useCartStore } from "../store/cartStore";

export const useCartTotalSavings = (mode: Mode = "cart") => {
  return useCartStore((state) => {
    const product = state.buyNowProduct;
    const cart = state.cart;

    if (mode === "buy-now" && product) {
      const price = product.price || 0;
      const discountedPrice = product.discountedPrice || 0;
      const quantity = product.quantity || 1;
      return (price - discountedPrice) * quantity;
    }

    return cart.reduce((total, product) => {
      const price = product.price || 0;
      const discountedPrice = product.discountedPrice || 0;
      const quantity = product.quantity || 1;
      return total + (price - discountedPrice) * quantity;
    }, 0);
  });
};
