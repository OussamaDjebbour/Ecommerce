import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AddToCartWishlistResult, wishlistItemType } from "../types";

interface WishlistState {
  wishlist: wishlistItemType[];
  addToWishlist: (item: wishlistItemType) => AddToCartWishlistResult;
  removeFromWishlist: (itemId: number) => void;
  clearWishlist: () => void;
  isInWishlist: (itemId: number) => boolean;
  moveToCart: (itemId: number) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (item) => {
        const state = get().wishlist;
        const existingItem = state.find(
          (wishlistItem) => wishlistItem.id === item.id,
        );

        if (existingItem) {
          return {
            success: false,
            message: `The item is already in wishlist`,
          };
        }

        set((state) => ({
          wishlist: [...state.wishlist, item],
        }));

        return {
          success: true,
          message: `${item.title} added to wishlist`,
        };
      },

      removeFromWishlist: (itemId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== itemId),
        }));
      },

      clearWishlist: () => {
        set({ wishlist: [] });
      },

      isInWishlist: (itemId) => {
        const state = get().wishlist;
        return state.some((item) => item.id === itemId);
      },

      moveToCart: (itemId) => {
        const state = get().wishlist;
        const item = state.find((item) => item.id === itemId);
        if (item) {
          // Remove from wishlist
          set((state) => ({
            wishlist: state.wishlist.filter((item) => item.id !== itemId),
          }));
          // Note: Cart addition would be handled by the component using useCartStore
        }
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
