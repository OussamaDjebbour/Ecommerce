import { CartItemType } from "../types";
import { create } from "zustand";

interface WishlistState {
  wishlist: CartItemType[];
  addToWishlist: (item: CartItemType) => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  wishlist: [],
  addToWishlist: (item) =>
    set((state) => ({
      wishlist: [...state.wishlist, item],
    })),
}));
