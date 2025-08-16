// // import { useLocation, NavigateFunction } from "react-router-dom";
// // import { useCartStore } from "../store/cartStore";
// // import { UseCheckoutProductsResult } from "../types";

// // export const useCheckoutProducts = (): UseCheckoutProductsResult => {
// //   const location = useLocation();
// //   const cartItems = useCartStore((state) => state.cart);
// //   const isBuyNow = location.state?.mode === "buy-now";
// //   const product = location.state?.mainProductState;

// //   const items = isBuyNow && product ? [product] : cartItems;

// //   return {
// //     items,
// //     mode: isBuyNow ? "buy-now" : "cart",
// //   };
// // };

// import { useLocation } from "react-router-dom";
// import { useCartStore } from "../store/cartStore";
// import { UseCheckoutProductsResult, CheckoutItem } from "../types";

// export const useCheckoutProducts = (): UseCheckoutProductsResult => {
//   const location = useLocation();
//   const cartItems = useCartStore((state) => state.cart);

//   const isBuyNow = location.state?.mode === "buy-now";
//   const product = location.state?.product as CheckoutItem | undefined;

//   const items: CheckoutItem[] = isBuyNow && product ? [product] : cartItems;

//   return {
//     items,
//     mode: isBuyNow ? "buy-now" : "cart",
//   };
// };

// import { useLocation } from "react-router-dom";
// import { useCartStore } from "../store/cartStore";

// export function useCheckoutProducts() {
//   const { state } = useLocation();
//   const { cart } = useCartStore();

//   const mode = state?.mode || "cart";
//   const items = mode === "buy-now" ? [state.product] : cart;

//   return { items, mode };
// }

import { useCartStore } from "../store/cartStore";
import { useSearchParams } from "react-router-dom";

export function useCheckoutProducts() {
  const { cart, buyNowProduct } = useCartStore();
  const [searchParams] = useSearchParams();

  // Check if this is a buy-now checkout
  const isBuyNow = searchParams.get("mode") === "buy-now";

  const mode = (isBuyNow ? "buy-now" : "cart") as "cart" | "buy-now";
  const items = isBuyNow && buyNowProduct ? [buyNowProduct] : cart;

  console.log("items", items);

  return {
    items,
    mode,
    buyNowQuantities: {}, // Not needed for this simplified approach
  };
}
