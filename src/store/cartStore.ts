// src/store/cartStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface CartItem {
  id: number;
  // id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id,
          );
          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem,
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...item, quantity: 1 }],
            };
          }
        });
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
      getCartTotal: () => {
        const cart = get().cart;
        return cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
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
