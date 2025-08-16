import { create } from "zustand";
import { CartItemType } from "../types";

interface CheckoutState {
  mode: "cart" | "buy-now";
  buyNowProduct: CartItemType | null;
  buyNowQuantities: Record<number, number>;

  // Actions
  setBuyNowCheckout: (product: CartItemType, quantity?: number) => void;
  setCartCheckout: () => void;
  updateBuyNowQuantity: (productId: number, quantity: number) => void;
  clearCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  mode: "cart",
  buyNowProduct: null,
  buyNowQuantities: {},

  setBuyNowCheckout: (product: CartItemType, quantity = product.quantity) => {
    set({
      mode: "buy-now",
      buyNowProduct: { ...product, quantity },
      buyNowQuantities: { [product.id]: quantity },
    });
  },

  setCartCheckout: () => {
    set({
      mode: "cart",
      buyNowProduct: null,
      buyNowQuantities: {},
    });
  },

  updateBuyNowQuantity: (productId: number, quantity: number) => {
    const { buyNowQuantities } = get();
    set({
      buyNowQuantities: {
        ...buyNowQuantities,
        [productId]: quantity,
      },
    });
  },

  clearCheckout: () => {
    set({
      mode: "cart",
      buyNowProduct: null,
      buyNowQuantities: {},
    });
  },
}));
