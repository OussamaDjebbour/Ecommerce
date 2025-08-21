import { AddToCartWishlistResult, CartItemType } from "src/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartState {
  buyNowProduct: CartItemType | null;
  cart: CartItemType[];
  addToCart: (item: CartItemType) => AddToCartWishlistResult;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotalPrice: () => number;
  getCartTotalItems: () => number;

  getTotalSavings: (mode?: "cart" | "buy-now") => number;

  // Buy Now actions
  setBuyNowProduct: (product: CartItemType) => void;
  clearBuyNowProduct: () => void;
  updateBuyNowQuantity: (quantity: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      buyNowProduct: null,
      cart: [],
      addToCart: (item) => {
        const state = get();

        const existingItem = state.cart.find(
          (cartItem) => cartItem.id === item.id,
        );

        const totalQuantity = existingItem
          ? existingItem.quantity + item.quantity
          : item.quantity;

        if (item.quantity <= 0 || totalQuantity > item.stock) {
          const available = item.stock - (existingItem?.quantity || 0);
          return {
            success: false,
            message:
              available > 0
                ? `Only ${available} more ${available === 1 ? "item" : "items"} available`
                : `Max stock reached for this product.`,
          };
        }

        set((state) => ({
          cart: existingItem
            ? state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem,
              )
            : [...state.cart, { ...item }],
        }));
        return {
          success: true,
          message: `${item.quantity}x ${item.title}  Added to cart`,
        };
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set((state) => ({
            cart: state.cart.filter((item) => item.id !== id),
          }));
        } else {
          set((state) => ({
            cart: state.cart.map((item) =>
              item.id === id ? { ...item, quantity } : item,
            ),
          }));
        }
      },
      clearCart: () => {
        set({ cart: [] });
      },
      getCartTotalPrice: () => {
        const cart = get().cart;
        return cart.reduce(
          (total, item) => total + item.discountedPrice * item.quantity,
          0,
        );
      },
      getCartTotalItems: () => {
        const cart = get().cart;

        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalSavings: (mode = "cart") => {
        const product = mode === "buy-now" && get().buyNowProduct;
        const products = get().cart;

        if (mode === "buy-now" && product) {
          const price = product.price || 0;
          const discountedPrice = product.discountedPrice || 0;
          const quantity = product.quantity || 1;
          return (price - discountedPrice) * quantity;
        }

        return products.reduce((total, product) => {
          const price = product.price || 0;
          const discountedPrice = product.discountedPrice || 0;
          const quantity = product.quantity || 1;
          return total + (price - discountedPrice) * quantity;
        }, 0);
      },
      getTotalSavingsss: (mode = "cart") => {
        const product = mode == "buy-now" && get().buyNowProduct;
        const products = get().cart;

        return mode == "buy-now"
          ? product
          : products.reduce((total, product) => {
              const quantity = product.quantity;
              return (
                total + (product.price - product.discountedPrice) * quantity
              );
            }, 0);
      },

      setBuyNowProduct: (product: CartItemType) => {
        set({ buyNowProduct: product });
      },

      clearBuyNowProduct: () => {
        set({ buyNowProduct: null });
      },
      updateBuyNowQuantity: (quantity: number) => {
        set((state) => ({
          buyNowProduct: state.buyNowProduct
            ? { ...state.buyNowProduct, quantity }
            : null,
        }));
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
