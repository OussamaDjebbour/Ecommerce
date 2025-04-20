// // src/components/CartDropdown.tsx
// import React from "react";
// import { useCartStore } from "../../store/cartStore";
// // import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

// interface CartDropdownProps {
//   onClose: () => void;
// }

// const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
//   const cart = useCartStore((state) => state.cart);
//   const getCartTotal = useCartStore((state) => state.getCartTotal);

//   // Close the dropdown when clicking outside
//   const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black bg-opacity-10"
//       onClick={handleClickOutside}
//     >
//       <div className="absolute right-4 top-20 z-50 w-80 rounded-lg bg-white p-4 shadow-lg">
//         <h3 className="mb-4 text-lg font-semibold">Your Cart</h3>
//         {cart.length === 0 ? (
//           <p className="text-gray-500">Your cart is empty</p>
//         ) : (
//           <>
//             {/* Cart Items */}
//             <div className="max-h-64 overflow-y-auto">
//               {cart.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center space-x-4 border-b py-2"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="h-12 w-12 rounded object-cover"
//                   />
//                   <div className="flex-1">
//                     <p className="text-sm font-medium">{item.title}</p>
//                     <p className="text-sm text-gray-500">
//                       ${item.price.toFixed(2)} x {item.quantity}
//                     </p>
//                   </div>
//                   <p className="text-sm font-semibold">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Subtotal */}
//             <div className="mt-4">
//               <p className="text-lg font-semibold">
//                 Subtotal: ${getCartTotal().toFixed(2)}
//               </p>
//             </div>

//             {/* Buttons */}
//             <div className="mt-4 flex space-x-2">
//               {/* <Link
//                 to="/cart"
//                 className="flex-1 rounded bg-gray-200 py-2 text-center text-gray-800"
//                 onClick={onClose}
//               >
//                 View Cart
//               </Link> */}
//               {/* <Link
//                 to="/checkout"
//                 className="flex-1 rounded bg-teal-500 py-2 text-center text-white"
//                 onClick={onClose}
//               >
//                 Checkout
//               </Link> */}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartDropdown;

// src/components/CartDropdown.tsx
import React, { useEffect, useRef } from "react";
import { useCartStore } from "../../store/cartStore";

interface CartDropdownProps {
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const cart = useCartStore((state) => state.cart);
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Focus the dropdown when it opens
  useEffect(() => {
    dropdownRef.current?.focus();
  }, []);

  // Close dropdown on Escape key (already handled in Header, but adding here for completeness)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-10"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-hidden="true"
    >
      <div
        ref={dropdownRef}
        id="cart-dropdown"
        role="dialog"
        aria-label="Cart contents"
        tabIndex={-1} // Make the div focusable
        className="cart-dropdown absolute right-4 top-20 z-50 min-h-52 w-80 rounded-lg bg-white p-4 shadow-lg focus:outline-none"
        // className="absolute right-4 top-12 z-50 flex min-h-[200px] w-80 items-center justify-center rounded-lg bg-white p-4 shadow-lg focus:outline-none"
      >
        {/* <h3 className="mb-4 text-center text-lg font-semibold">Your Cart</h3> */}
        {/* <h3
          className={`mb-4 text-center text-lg font-semibold ${cart.length === 0 ? "text-base" : ""}`}
        >
          Your Cart
        </h3> */}
        <h3
          className={`mb-2 text-lg font-semibold ${cart.length === 0 ? "w-full text-center" : ""}`}
        >
          Your Cart
        </h3>
        {cart.length === 0 ? (
          <div className="text-center">
            <svg
              className="mx-auto mb-2 h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-gray-500">
              Your cart is empty—let's find something amazing!
            </p>
            <button
              // onClick={() => {
              //   useNavigationStore.getState().setPage("home");
              //   onClose();
              // }}
              className="mt-4 rounded-md bg-teal-500 px-6 py-3 text-white"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          // <p className="text-gray-500">Your cart is empty</p>
          <>
            {/* Cart Items */}
            {/* <div className="max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b py-2"
                >
                  <img
                    src={item.image}
                    alt={`${item.title} in cart`}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div> */}

            <div className="custom-scrollbar max-h-64 overflow-y-auto overflow-x-hidden">
              {cart.map((item) => (
                // <div className="flex items-center space-x-4 border-b py-3">
                //   <img
                //     src={item.image}
                //     alt={`${item.title} in cart`}
                //     className="h-8 w-8 rounded object-cover"
                //   />
                //   <div className="flex flex-1 items-center justify-between">
                //     <div className="group relative flex-1">
                //       <p className="truncate text-sm font-medium">
                //         {item.title}
                //       </p>
                //       <div className="absolute left-0 top-full z-10 mt-1 hidden w-[200px] rounded border border-teal-500 bg-white p-2 text-sm text-gray-700 shadow-lg group-hover:block">
                //         {item.title}
                //       </div>
                //       <p className="text-sm text-gray-500">
                //         ${item.price.toFixed(2)} x {item.quantity}
                //       </p>
                //     </div>
                //     <p className="pl-4 text-sm font-semibold">
                //       ${(item.price * item.quantity).toFixed(2)}
                //     </p>
                //   </div>
                // </div>
                // <div className="flex items-center space-x-4 border-b py-3">
                //   <img
                //     src={item.image}
                //     alt={`${item.title} in cart`}
                //     className="h-8 w-8 rounded object-cover"
                //   />
                //   <div className="flex flex-1 items-center gap-x-4">
                //     <div className="group relative flex flex-1 flex-col">
                //       <p className="truncate text-sm font-medium">
                //         {item.title}
                //       </p>
                //       <div className="absolute left-0 top-full z-10 mt-1 hidden w-[200px] rounded border border-teal-500 bg-white p-2 text-sm text-gray-700 shadow-lg group-hover:block">
                //         {item.title}
                //       </div>
                //       <p className="text-sm text-gray-500">
                //         ${item.price.toFixed(2)} x {item.quantity}
                //       </p>
                //     </div>
                //     <p className="ml-auto flex text-sm font-semibold">
                //       ${(item.price * item.quantity).toFixed(2)}
                //     </p>
                //   </div>
                // </div>
                <div
                  key={item.id}
                  className="mr-2 flex items-center space-x-4 border-b py-2.5"
                >
                  <img
                    src={item.image}
                    loading="lazy"
                    alt={`${item.title} in cart`}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div className="group relative min-w-24 max-w-60 flex-1">
                    <p
                      title={item.title}
                      className="truncate text-sm font-medium"
                    >
                      {item.title}
                    </p>
                    {/* <div className="absolute left-0 top-full z-[10000] mt-1 hidden w-[200px] rounded border border-teal-500 bg-white p-2 text-sm text-gray-700 shadow-lg group-hover:block">
                      {item.title}
                    </div> */}

                    {/* <p class */}
                    {/* <div className="max-w-36 flex-1">
                    <p
                      title={item.title}
                      className="truncate text-sm font-medium"
                    >
                      {item.title}
                    </p> */}
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Subtotal:{" "}
                <span className="text-xl font-bold">
                  ${getCartTotal().toFixed(2)}
                </span>
              </p>
            </div>
            {/* <div className="mt-4">
              <p className="text-lg font-bold">
                SUBTOTAL: ${getCartTotal().toFixed(2)}
              </p>
            </div> */}

            {/* Subtotal */}
            {/* <div className="mt-4">
              <p className="text-lg font-semibold">
                Subtotal:{" "}
                <span className="text-xl font-bold">
                  ${getCartTotal().toFixed(2)}
                </span>
              </p>
            </div> */}

            {/* Buttons */}
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => {
                  // Navigate to cart page (we'll implement this in Part 2)
                  window.location.href = "/cart";
                  onClose();
                }}
                className="flex-1 rounded bg-gray-200 py-2 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                View Cart
              </button>
              <button
                onClick={() => {
                  // Navigate to checkout page (we'll implement this in Part 2)
                  window.location.href = "/checkout";
                  onClose();
                }}
                className="flex-1 rounded bg-teal-500 py-2 text-center text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;

// import React, { useEffect, useRef } from "react";
// import { useCartStore } from "../../store/cartStore";
// // import { useNavigationStore } from "../store/navigationStore";

// interface CartDropdownProps {
//   onClose: () => void;
// }

// const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
//   const cart = useCartStore((state) => state.cart);
//   const getCartTotal = useCartStore((state) => state.getCartTotal);
//   // const setPage = useNavigationStore((state) => state.setPage);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     dropdownRef.current?.focus();
//   }, []);

//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         onClose();
//       }
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, [onClose]);

//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black bg-opacity-10"
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//       aria-hidden="true"
//     >
//       <div
//         ref={dropdownRef}
//         id="cart-dropdown"
//         role="dialog"
//         aria-label="Cart contents"
//         tabIndex={-1}
//         className="cart-dropdown absolute right-4 top-12 z-50 flex min-h-[200px] w-80 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg focus:outline-none"
//       >
//         <h3
//           className={`mb-4 text-lg font-semibold ${
//             cart.length === 0 ? "w-full text-center" : "absolute left-4 top-4"
//           }`}
//         >
//           Your Cart
//         </h3>
//         {cart.length === 0 ? (
//           <div className="text-center">
//             <svg
//               className="mx-auto mb-2 h-16 w-16 text-gray-400"
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
//             <p className="mb-4 text-gray-500">
//               Your cart is empty—let's find something amazing!
//             </p>
//             <button
//               onClick={() => {
//                 // setPage("home");
//                 onClose();
//               }}
//               className="rounded bg-teal-500 px-6 py-3 text-white"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="custom-scrollbar max-h-80 overflow-y-auto">
//               {cart.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center gap-x-4 border-b py-3"
//                 >
//                   <img
//                     src={item.image}
//                     alt={`${item.title} in cart`}
//                     className="h-8 w-8 rounded object-cover"
//                   />
//                   <div className="group relative min-w-[100px] max-w-[180px]">
//                     <p className="truncate text-sm font-medium">{item.title}</p>
//                     <div className="absolute left-0 top-full z-10 mt-1 hidden w-[200px] rounded border border-teal-500 bg-white p-2 text-sm text-gray-700 shadow-lg group-hover:block">
//                       {item.title}
//                     </div>
//                     <p className="text-sm text-gray-500">
//                       ${item.price.toFixed(2)} x {item.quantity}
//                     </p>
//                   </div>
//                   <p className="ml-auto mr-4 flex-shrink-0 text-sm font-semibold">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4">
//               <p className="text-lg font-bold">
//                 Subtotal: ${getCartTotal().toFixed(2)}
//               </p>
//             </div>
//             <div className="mt-4 flex space-x-2">
//               <button
//                 onClick={() => {
//                   // setPage("cart");
//                   onClose();
//                 }}
//                 className="flex-1 rounded bg-gray-200 py-2 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               >
//                 View Cart
//               </button>
//               <button
//                 onClick={() => {
//                   // setPage("checkout");
//                   onClose();
//                 }}
//                 className="flex-1 rounded bg-teal-500 py-2 text-center text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
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

// export default CartDropdown;
