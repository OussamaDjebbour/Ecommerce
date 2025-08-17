import { useCartStore } from "../store/cartStore";
import { useSearchParams } from "react-router-dom";

export function useCheckoutProducts() {
  const { cart, buyNowProduct } = useCartStore();
  const [searchParams] = useSearchParams();

  // Check if this is a buy-now checkout
  const isBuyNow = searchParams.get("mode") === "buy-now";

  const mode = (isBuyNow ? "buy-now" : "cart") as "cart" | "buy-now";
  const items = isBuyNow && buyNowProduct ? [buyNowProduct] : cart;

  return {
    items,
    mode,
    buyNowQuantities: {},
  };
}
