import { useCartStore } from "../store/cartStore";

export const useCartTotalItems = () =>
  useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0),
  );
