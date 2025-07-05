import { AddToCartResult, CartItem } from "src/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartState {
  // quantity: number;
  cart: CartItem[];
  // addToCart: (item: CartItem) => void;
  addToCart: (item: CartItem) => AddToCartResult;
  // addToCart: (item: <CartItem>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotalPrice: () => number;
  getCartTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const state = get();
        console.log("carttttt", state.cart);

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
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
      getCartTotalItems: () => {
        const cart = get().cart;
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

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
