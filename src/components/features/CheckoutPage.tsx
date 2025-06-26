// import React from "react";
// import { useCartStore } from "../../store/cartStore";

// const CheckoutPage: React.FC = () => {
//   const { cart, getCartTotal, clearCart } = useCartStore();

//   const handleCheckout = () => {
//     // Simulate a checkout process (e.g., send order to backend)
//     alert("Order placed successfully!");
//     clearCart(); // Clear the cart after checkout
//     // useNavigationStore.getState().setPage("home"); // Redirect to home page
//   };

//   return (
//     <div className="p-4">
//       <h2 className="mb-4 text-2xl font-bold">Checkout</h2>
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
//                 <p className="text-lg font-semibold">
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-6">
//             <p className="text-xl font-semibold">
//               Total: ${getCartTotal().toFixed(2)}
//             </p>
//             <button
//               onClick={handleCheckout}
//               className="mt-4 rounded bg-teal-500 px-4 py-2 text-white"
//             >
//               Place Order
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;

import React, { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { CartItem } from "src/types";

const CheckoutPage: React.FC = () => {
  return (
    <div className="flex p-6">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="mb-6 text-3xl font-semibold">Checkout</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded bg-white p-4 shadow">
            <h2 className="mb-4 text-xl font-semibold">Shipping Information</h2>
            <form className="grid gap-4">
              <input
                className="rounded border p-2"
                type="text"
                placeholder="Full Name"
              />
              <input
                className="rounded border p-2"
                type="email"
                placeholder="Email"
              />
              <input
                className="rounded border p-2"
                type="text"
                placeholder="Address"
              />
              <input
                className="rounded border p-2"
                type="text"
                placeholder="City"
              />
              <input
                className="rounded border p-2"
                type="text"
                placeholder="Postal Code"
              />
              <input
                className="rounded border p-2"
                type="tel"
                placeholder="Phone Number"
              />
            </form>
          </div>

          <div className="rounded bg-white p-4 shadow">
            <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" defaultChecked />
                Credit/Debit Card
              </label>
              <input
                className="rounded border p-2"
                type="text"
                placeholder="Card Number"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="rounded border p-2"
                  type="text"
                  placeholder="Expiration date"
                />
                <input
                  className="rounded border p-2"
                  type="text"
                  placeholder="CVV"
                />
              </div>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" />
                Pay on Delivery
              </label>
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="mb-2 flex justify-between">
                <span>Subtotal</span>
                <span>$1661.94</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span>Tax</span>
                <span>$5.00</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>$1666.94</span>
              </div>
              <button className="mt-6 w-full rounded bg-teal-600 py-3 text-white hover:bg-teal-700">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

// const CheckoutPage: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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

//   if (cart.length === 0) {
//     navigate("/cart");
//     return null;
//   }

//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black bg-opacity-50"
//       onClick={handleClickOutside}
//       aria-hidden="true"
//     >
//       <div
//         ref={containerRef}
//         tabIndex={-1}
//         className="absolute right-4 top-20 z-50 min-h-[500px] w-[22rem] rounded-lg bg-white p-4 shadow-lg focus:outline-none"
//         role="dialog"
//         aria-label="Checkout"
//       >
//         <div className="flex items-center justify-between border-b pb-2">
//           <h3 className="text-lg font-semibold">Checkout</h3>
//           <button
//             onClick={onClose}
//             className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//             aria-label="Close checkout"
//           >
//             ✕
//           </button>
//         </div>
//         <div className="py-2">
//           <h4 className="mb-2 text-sm font-medium">Cart Summary</h4>
//           <ul className="max-h-[200px] overflow-y-auto">
//             {cart.map((item) => (
//               <li
//                 key={item.id}
//                 className="mb-4 flex items-center justify-between border-b pb-2"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="h-12 w-12 rounded object-cover"
//                 />
//                 <div className="flex-1 px-2">
//                   <p className="text-sm font-medium">{item.title}</p>
//                   <p className="text-xs text-gray-500">
//                     ${item.price.toFixed(2)} x {item.quantity}
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                     className="rounded bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300"
//                     disabled={item.quantity <= 1}
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     className="rounded bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300"
//                   >
//                     +
//                   </button>
//                   <button
//                     onClick={() => removeItem(item.id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//           <div className="mt-4 border-t pt-2">
//             <p className="text-lg font-semibold">
//               Subtotal:{" "}
//               <span className="text-xl font-bold">
//                 ${getCartTotal().toFixed(2)}
//               </span>
//             </p>
//           </div>
//         </div>
//         <div className="mt-4">
//           <h4 className="mb-2 text-sm font-medium">Shipping Details</h4>
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="mb-2 w-full rounded border border-gray-300 p-2"
//           />
//           <input
//             type="text"
//             placeholder="Address"
//             className="mb-2 w-full rounded border border-gray-300 p-2"
//           />
//           <input
//             type="text"
//             placeholder="City"
//             className="mb-2 w-full rounded border border-gray-300 p-2"
//           />
//         </div>
//         <div className="mt-4">
//           <h4 className="mb-2 text-sm font-medium">Payment Method</h4>
//           <select className="mb-2 w-full rounded border border-gray-300 p-2">
//             <option>Credit Card</option>
//             <option>PayPal</option>
//           </select>
//         </div>
//         <div className="mt-4 border-t pt-2">
//           <p className="text-lg font-semibold">
//             Total:{" "}
//             <span className="text-xl font-bold">
//               ${getCartTotal().toFixed(2)}
//             </span>
//           </p>
//           <button
//             onClick={() => {
//               alert("Order placed!"); // Replace with actual order logic
//               onClose();
//               navigate("/home");
//             }}
//             className="mt-4 w-full rounded bg-teal-500 py-2 text-center text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
