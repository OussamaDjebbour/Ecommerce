// import React from "react";
// import { useCartStore } from "../../store/cartStore";
// import { useNavigate } from "react-router-dom";

// const CartPage: React.FC = () => {
//   const { cart, getCartTotal, updateQuantity, removeFromCart } = useCartStore();

//   const navigate = useNavigate();

//   return (
//     <div className="p-4">
//       <h2 className="mb-4 text-2xl font-bold">Cart</h2>
//       {cart.length === 0 ? (
//         <p className="text-gray-500">Your cart is empty</p>
//       ) : (
//         <>
//           <div className="space-y-4">
//             {cart.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center space-x-4 rounded border p-4"
//               >
//                 <img
//                   src={item.image}
//                   alt={`${item.title} in cart`}
//                   className="h-16 w-16 rounded object-cover"
//                 />
//                 <div className="flex-1">
//                   <p className="text-lg font-medium">{item.title}</p>
//                   <p className="text-gray-500">
//                     ${item.price.toFixed(2)} x {item.quantity}
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                     className="rounded bg-gray-200 px-2 py-1"
//                     aria-label={`Decrease quantity of ${item.title}`}
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     className="rounded bg-gray-200 px-2 py-1"
//                     aria-label={`Increase quantity of ${item.title}`}
//                   >
//                     +
//                   </button>
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="rounded bg-red-500 px-2 py-1 text-white"
//                     aria-label={`Remove ${item.title} from cart`}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="mt-6">
//             <p className="text-xl font-semibold">
//               Total: ${getCartTotal().toFixed(2)}
//             </p>
//             <button
//               onClick={() => navigate("/checkout")}
//               className="mt-4 rounded bg-teal-500 px-4 py-2 text-white"
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartPage;

import React, { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { CartItem } from "src/types";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    {
      id: 1,
      name: "Beats Studio3 Wireless Headphone",
      price: 349.95,
      image: "/images/beats.png",
      quantity: 1,
    },
    {
      id: 2,
      name: "MacBook Pro",
      price: 1289.0,
      image: "/images/macbook.png",
      quantity: 1,
    },
    {
      id: 3,
      name: "Red Lipstick",
      price: 12.99,
      image: "/images/lipstick.png",
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item,
      ),
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="flex p-6">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="mb-6 text-3xl font-semibold">Your Cart</h1>

        <div className="mb-6 rounded bg-white p-4 shadow">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-contain"
                />
                <div>
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="rounded border px-2"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="rounded border px-2"
                >
                  +
                </button>
              </div>
              <div className="text-right font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded bg-white p-4 shadow">
          <div className="mb-2 flex justify-between">
            <span>Items</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span>Estimated Tax</span>
            <span>$5.00</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span>Delivery</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${(total + 5).toFixed(2)}</span>
          </div>
        </div>

        <button className="mt-6 w-full rounded bg-teal-600 py-3 text-white hover:bg-teal-700">
          Continue to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;

// const CartPage: React.FC<{ onClose: () => void }> = ({ onClose }) => {
//   const navigate = useNavigate();
//   const cart = useCartStore(useCallback((state) => state.cart, []));
//   const getCartTotal = useCartStore(
//     useCallback((state) => state.getCartTotal, []),
//   );
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setTimeout(() => {
//       if (containerRef.current) {
//         containerRef.current.focus();
//       }
//     }, 0);
//   }, []);

//   const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const removeItem = useCallback((id: string) => {
//     useCartStore.getState().removeFromCart(id);
//   }, []);

//   const updateQuantity = useCallback((id: string, quantity: number) => {
//     useCartStore.getState().updateQuantity(id, quantity);
//   }, []);

//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black bg-opacity-50"
//       onClick={handleClickOutside}
//       aria-hidden="true"
//     >
//       <div
//         ref={containerRef}
//         tabIndex={-1}
//         className="absolute right-4 top-20 z-50 min-h-[400px] w-[22rem] rounded-lg bg-white p-4 shadow-lg focus:outline-none"
//         role="dialog"
//         aria-label="Cart contents"
//       >
//         <div className="flex items-center justify-between border-b pb-2">
//           <h3 className="text-lg font-semibold">Your Cart</h3>
//           <button
//             onClick={onClose}
//             className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//             aria-label="Close cart"
//           >
//             ✕
//           </button>
//         </div>
//         {cart.length === 0 ? (
//           <div className="flex h-full flex-col items-center justify-center py-12 text-center">
//             <svg
//               className="mb-4 h-16 w-16 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//               />
//             </svg>
//             <p className="mb-4 text-gray-600">
//               Your cart is empty—let's find something amazing!
//             </p>
//             <button
//               onClick={() => {
//                 navigate("/home");
//                 onClose();
//               }}
//               className="rounded bg-teal-500 px-6 py-2 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         ) : (
//           <>
//             <ul className="max-h-[300px] overflow-y-auto py-2">
//               {cart.map((item) => (
//                 <li
//                   key={item.id}
//                   className="mb-4 flex items-center justify-between border-b pb-2"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="h-12 w-12 rounded object-cover"
//                   />
//                   <div className="flex-1 px-2">
//                     <p className="text-sm font-medium">{item.title}</p>
//                     <p className="text-xs text-gray-500">
//                       ${item.price.toFixed(2)} x {item.quantity}
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       className="rounded bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300"
//                       disabled={item.quantity <= 1}
//                     >
//                       -
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       className="rounded bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300"
//                     >
//                       +
//                     </button>
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-4 border-t pt-2">
//               <p className="text-lg font-semibold">
//                 Subtotal:{" "}
//                 <span className="text-xl font-bold">
//                   ${getCartTotal().toFixed(2)}
//                 </span>
//               </p>
//             </div>
//             <div className="mt-4 flex space-x-2">
//               <button
//                 onClick={() => {
//                   navigate("/cart");
//                   onClose();
//                 }}
//                 className="flex-1 rounded bg-gray-200 py-2 text-center text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               >
//                 View Cart
//               </button>
//               <button
//                 onClick={() => {
//                   navigate("/checkout");
//                   onClose();
//                 }}
//                 className="flex-1 rounded bg-teal-500 py-2 text-center text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               >
//                 Checkout
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;
