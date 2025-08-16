import { useCartStore } from "../store/cartStore";

export const useCartTotalPrice = () =>
  useCartStore((state) =>
    state.cart.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0,
    ),
  );
