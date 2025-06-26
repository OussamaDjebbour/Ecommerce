import { useEffect, useRef, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartDropdown from "./CartDropdown copy";
// import CartDropdown from "./CartDropdown";

function HeaderIconsGroup() {
  const [isCartOpen, setIsCartOpen] = useState(false); // State to toggle the dropdown
  const cart = useCartStore((state) => state.cart); // Get the cart from Zustand store
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total items

  const cartButtonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when pressing Escape key

  // useEffect(() => {
  //   const handleEscape = (e: KeyboardEvent) => {
  //     if (e.key === "Escape" && isCartOpen) {
  //       setIsCartOpen(false);
  //     }
  //     // cartButtonRef.current?.focus(); // Return focus to cart button
  //   };

  //   document.addEventListener("keydown", handleEscape);

  //   return () => document.removeEventListener("keydown", handleEscape);
  // }, [isCartOpen]);

  return (
    <div className="flex items-center gap-5">
      {/* <img
        src="/images/fi-br-shopping-cart.png"
        alt="Cart Icon"
        className="cursor-pointer rounded-xl bg-[#E8FCFF] p-2"
      /> */}

      {/* Cart Icon with Badge */}
      <div className="relative rounded-xl bg-[#E8FCFF]">
        <button
          // onClick={() => setIsCartOpen(!isCartOpen)}
          // className="relative focus:outline-none"
          ref={cartButtonRef}
          onClick={() => setIsCartOpen(!isCartOpen)}
          aria-expanded={isCartOpen}
          aria-controls="cart-dropdown"
          aria-label={`Cart, ${cartItemCount} items`}
          className="relative cursor-pointer rounded p-2 focus:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {/* <svg
            className="h-6 w-6 text-gray-600"
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
          </svg> */}

          <FontAwesomeIcon
            // className="rounded-md bg-[#E8FCFF] p-3.5"
            color="#016170"
            size="2xl"
            icon={faCartShopping}
          />

          {cartItemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-xs text-white">
              {cartItemCount}
            </span>
          )}
        </button>
        {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
      </div>

      <button // className="cursor-pointer rounded-xl bg-[#E8FCFF] p-2"
        aria-label="Notifications"
        className="cursor-pointer rounded-xl bg-[#E8FCFF] p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <img src="/images/notification.png" alt="notification Icon" />
      </button>

      <img
        src="/images/retry.png"
        alt="User profile"
        className="cursor-pointer rounded-xl"
      />
    </div>
  );
}

export default HeaderIconsGroup;

// src/components/Header.tsx
// import React, { useState, useRef, useEffect } from "react";
// import { useCartStore } from "../store/cartStore";
// import CartDropdown from "./CartDropdown";

// const HeaderIconsGroup: React.FC = () => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const cart = useCartStore((state) => state.cart);
//   const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
//   const cartButtonRef = useRef<HTMLButtonElement>(null);

//   // Close dropdown when pressing Escape key
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && isCartOpen) {
//         setIsCartOpen(false);
//         cartButtonRef.current?.focus(); // Return focus to cart button
//       }
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, [isCartOpen]);

//   return (
//     <header className="flex items-center justify-between bg-white p-4 shadow">
//       {/* Logo */}
//       <div className="flex items-center">
//         <img
//           src="/path/to/shopnest-logo.png"
//           alt="ShopNest Logo"
//           className="h-8 w-8"
//         />
//         <span className="text-xl font-bold">ShopNest</span>
//       </div>

//       {/* Search Bar */}
//       <div className="mx-4 flex-1">
//         <input
//           type="text"
//           placeholder="Search products..."
//           className="w-full rounded border p-2"
//           aria-label="Search products"
//         />
//       </div>

//       {/* Right Side: Cart, Notifications, Profile */}
//       <div className="flex items-center space-x-4">
//         {/* Cart Icon with Badge */}
//         <div className="relative">
//           <button
//             ref={cartButtonRef}
//             onClick={() => setIsCartOpen(!isCartOpen)}
//             aria-expanded={isCartOpen}
//             aria-controls="cart-dropdown"
//             aria-label={`Cart, ${cartItemCount} items`}
//             className="relative rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//           >
//             <svg
//               className="h-6 w-6 text-gray-600"
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
//             {cartItemCount > 0 && (
//               <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-xs text-white">
//                 {cartItemCount}
//               </span>
//             )}
//           </button>
//           {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
//         </div>

//         {/* Notifications Icon */}
//         <button
//           aria-label="Notifications"
//           className="rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//         >
//           <svg
//             className="h-6 w-6 text-gray-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//             />
//           </svg>
//         </button>

//         {/* Profile Icon */}
//         <button
//           aria-label="User profile"
//           className="rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//         >
//           <img
//             src="/path/to/profile-icon.png"
//             alt="User profile"
//             className="h-8 w-8 rounded-full"
//           />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default HeaderIconsGroup;
