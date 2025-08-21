import { Mode } from "../types";
import { useCartStore } from "../store/cartStore";

export const useCartTotalPrice = (mode: Mode = "cart") =>
  useCartStore((state) =>
  {  const product = state.buyNowProduct;
    const cart = state.cart;

    if (mode === "buy-now" && product) {
      return product.discountedPrice * product.quantity
    }

    return cart.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0,
    );
  },
  );
  
// export const useCartTotalPrice = (mode: Mode = "cart") =>
//   useCartStore((state) =>
//     state.cart.reduce(
//       (total, item) => total + item.discountedPrice * item.quantity,
//       0,
//     ),
//   );
