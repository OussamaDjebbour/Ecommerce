import { AddToCartResult, CartItemType } from "src/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartState {
  // quantity: number;
  buyNowProduct: CartItemType | null;
  cart: CartItemType[];
  // addToCart: (item: CartItemType) => void;
  addToCart: (item: CartItemType) => AddToCartResult;
  // addToCart: (item: <CartItem>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotalPrice: () => number;
  getCartTotalItems: () => number;

  // getTotalSavings: (
  //   mode: "cart" | "buy-now",
  //   id: number,
  //   buyNowQuantities?: { [id: number]: number },
  // ) => number;
  getTotalSavings: (mode?: "cart" | "buy-now") => number;

  // Buy Now actions
  setBuyNowProduct: (product: CartItemType) => void;
  // setBuyNowProduct: (product: CartItemType) => CartItemType;
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
          // message: `${item.quantity} ${item.quantity === 1 ? "item" : "items"}  Added to cart successfully!`,
        };
      },

      // addToCart: (item) => {
      //   console.log("Adding to cart:", item, item?.quantity, item?.stock);
      //   // if (item.quantity <= 0 || item.quantity > item.stock) {
      //   //   // toast.error(`Only ${item.stock} items available`);

      //   //   return;
      //   // }
      //   set((state) => {
      //     const existingItem = state.cart.find(
      //       (cartItem) => cartItem.id === item.id,
      //     );
      //     // if (
      //     //   existingItem &&
      //     //   existingItem.quantity + item.quantity > existingItem.stock
      //     // ) {
      //     // ✅ Guard: quantity must be positive and not exceed stock
      //     if (
      //       item.quantity <= 0 ||
      //       (existingItem &&
      //         existingItem.quantity + item.quantity > existingItem.stock) ||
      //       (!existingItem && item.quantity > item.stock)
      //     ) {
      //       // toast.error(
      //       //   `You can't add more than ${existingItem?.stock} items of this product`,
      //       // );
      //       return state;
      //     }
      //     if (existingItem) {
      //       toast.success(
      //         `You can't add more than ${existingItem?.stock} items of this product`,
      //       );
      //       return {
      //         cart: state.cart.map((cartItem) =>
      //           cartItem.id === item.id
      //             ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
      //             : cartItem,
      //         ),
      //       };
      //     } else {
      //       return {
      //         cart: [...state.cart, { ...item, quantity: item.quantity }],
      //       };
      //     }
      //   });
      // },
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

      // getTotalSavings: (mode = "cart") => {
      //   const products =
      //     mode == "buy-now" ? [{ ...get().buyNowProduct }] : get().cart;

      //   if (!products) {
      //     return 0;
      //   }

      //   return products.reduce((total, product) => {
      //     const quantity = product.quantity;
      //     return total + (product.price - product.discountedPrice) * quantity;
      //   }, 0);
      // },

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

// import { create } from "zustand";
// import { CartItemType } from "../types";

// interface CartState {
//   cart: CartItemType[];
//   buyNowProduct: CartItemType | null;

//   // Cart actions
//   addToCart: (product: CartItemType) => { success: boolean; message: string };
//   removeFromCart: (productId: number) => void;
//   updateQuantity: (productId: number, quantity: number) => void;
//   clearCart: () => void;
//   getTotalSavings: (
//     mode: "cart" | "buy-now",
//     items: CartItemType[],
//     buyNowQuantities?: Record<number, number>,
//   ) => number;

//   // Buy Now actions
//   setBuyNowProduct: (product: CartItemType) => void;
//   clearBuyNowProduct: () => void;
// }

// export const useCartStore = create<CartState>((set, get) => ({
//   cart: [],
//   buyNowProduct: null,

//   addToCart: (product: CartItemType) => {
//     const { cart } = get();
//     const existingItem = cart.find((item) => item.id === product.id);

//     if (existingItem) {
//       const newQuantity = existingItem.quantity + product.quantity;
//       if (newQuantity <= existingItem.stock) {
//         set({
//           cart: cart.map((item) =>
//             item.id === product.id ? { ...item, quantity: newQuantity } : item,
//           ),
//         });
//         return { success: true, message: `Updated quantity to ${newQuantity}` };
//       } else {
//         return { success: false, message: "Not enough stock available" };
//       }
//     } else {
//       set({ cart: [...cart, product] });
//       return { success: true, message: "Added to cart successfully" };
//     }
//   },

//   removeFromCart: (productId: number) => {
//     set((state) => ({
//       cart: state.cart.filter((item) => item.id !== productId),
//     }));
//   },

//   updateQuantity: (productId: number, quantity: number) => {
//     set((state) => ({
//       cart: state.cart.map((item) =>
//         item.id === productId ? { ...item, quantity } : item,
//       ),
//     }));
//   },

//   clearCart: () => {
//     set({ cart: [] });
//   },

//   getTotalSavings: (
//     mode: "cart" | "buy-now",
//     items: CartItemType[],
//     buyNowQuantities?: Record<number, number>,
//   ) => {
//     return items.reduce((total, item) => {
//       const quantity =
//         mode === "buy-now" && buyNowQuantities
//           ? buyNowQuantities[item.id] || item.quantity
//           : item.quantity;
//       const originalPrice = item.price;
//       const discountedPrice = item.discountedPrice || item.price;
//       const savings = (originalPrice - discountedPrice) * quantity;
//       return total + savings;
//     }, 0);
//   },

//   setBuyNowProduct: (product: CartItemType) => {
//     set({ buyNowProduct: product });
//   },

//   clearBuyNowProduct: () => {
//     set({ buyNowProduct: null });
//   },
// }));

// export const useCartStore = create<CartState>((set, get) => ({
//   cart: [],
//   addToCart: (item) => {
//     set((state) => {
//       const existingItem = state.cart.find(
//         (cartItem) => cartItem.id === item.id,
//       );
//       if (existingItem) {
//         return {
//           cart: state.cart.map((cartItem) =>
//             cartItem.id === item.id
//               ? { ...cartItem, quantity: cartItem.quantity + 1 }
//               : cartItem,
//           ),
//         };
//       } else {
//         return {
//           cart: [...state.cart, { ...item, quantity: 1 }],
//         };
//       }
//     });
//   },
//   removeFromCart: (id) => {
//     set((state) => ({
//       cart: state.cart.filter((item) => item.id !== id),
//     }));
//   },
//   updateQuantity: (id, quantity) => {
//     if (quantity <= 0) {
//       set((state) => ({
//         cart: state.cart.filter((item) => item.id !== id),
//       }));
//     } else {
//       set((state) => ({
//         cart: state.cart.map((item) =>
//           item.id === id ? { ...item, quantity } : item,
//         ),
//       }));
//     }
//   },
//   clearCart: () => {
//     set({ cart: [] });
//   },
//   getCartTotal: () => {
//     const cart = get().cart;
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   },
// }));
