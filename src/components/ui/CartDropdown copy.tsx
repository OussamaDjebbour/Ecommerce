import React, { useCallback, useEffect, useRef, useState } from "react";
import { useCartStore } from "../../store/cartStore";
// import { CartItemProduct, CartItemType, Product } from "src/types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { showRemovalToast } from "../../helpers/toastHelpers";
import QuantityControl from "./QuantityControl";
import Item from "./Item";
import { getPriceDetails } from "src/helpers/getPriceDetails";
import CartDropdownItem from "./CartDropdownItem";

interface CartDropdownProps {
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const cart = useCartStore((state) => state.cart);
  const getCartTotalPrice = useCartStore((state) => state.getCartTotalPrice);
  const getCartTotalItems = useCartStore((state) => state.getCartTotalItems);
  const getTotalSavings = useCartStore((state) => state.getTotalSavings);

  // const isFull = cart.some(
  //   (item) => item.id === id && item.quantity === item.stock,
  // );

  const dropdownRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  // useClickAway(containerRef, () => onClose());

  // Auto-scroll to selected item in Cart Dropdown
  const scrollToSelectedItem = useCallback(() => {
    if (dropdownRef.current && selectedIndex >= 0) {
      const selectedElement = dropdownRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    scrollToSelectedItem();
  }, [scrollToSelectedItem]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < cart.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : cart.length - 1));
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const handleStartShopping = () => {
    if (location.pathname !== "/productPage" && location.pathname !== "/")
      navigate("/");
    onClose();
  };

  const handleViewCart = () => {
    if (location.pathname !== "/cart")
      navigate("/cart", { state: { from: location.pathname } });
    onClose();
  };

  const handleCheckout = () => {
    if (location.pathname !== "/checkout")
      navigate("/checkout", {
        state: { from: location.pathname },
      });
    onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 cursor-pointer bg-black bg-opacity-20"
      aria-hidden="true"
    >
      <div
        ref={containerRef}
        onKeyDown={handleKeyDown}
        id="cart-dropdown"
        role="dialog"
        aria-label="Cart contents"
        tabIndex={-1}
        className="absolute right-4 top-20 z-50 w-[26rem] cursor-default rounded-xl border border-gray-100 bg-white shadow-2xl focus:outline-none"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-gray-900">Your Cart</h3>
            {cart.length > 0 && (
              <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-semibold text-teal-800">
                {getCartTotalItems()}{" "}
                {getCartTotalItems() === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
            {/* <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg> */}
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[28rem] min-h-[12rem]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
              <div className="mb-4 rounded-full bg-gray-100 p-4">
                <svg
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="mb-2 text-lg font-semibold text-gray-900">
                Your cart is empty
              </h4>
              <p className="mb-6 text-sm text-gray-500">
                Discover amazing products and add them to your cart
              </p>
              <button
                onClick={handleStartShopping}
                className="rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="max-h-[17.2rem] overflow-y-auto px-6 py-4">
                <ul ref={dropdownRef} className="space-y-4">
                  {cart.map((product, index) => (
                    // <Item product={product} index={index} />
                    <CartDropdownItem
                      key={product.id}
                      product={product}
                      index={index}
                      selectedIndex={selectedIndex}
                    />
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="px-6 pb-4 text-lg text-gray-700">
                <hr className="border-gray-200 px-6 pb-2.5" />
                {/* Subtotal */}
                {/* <p className="font-semibold">
                  You saved <span>${getTotalSavings().toFixed(2)}</span>
                </p> */}

                <div className="mb-1 flex justify-between text-xl font-bold text-gray-900">
                  <span>You Saved</span>
                  <span className="text-[#009393]">
                    ${getTotalSavings().toFixed(2)}
                  </span>
                </div>
                <div className="mb-4 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-[#009393]">
                    ${getCartTotalPrice().toFixed(2)}
                  </span>
                </div>

                {/* <div className="mb-1 flex items-center justify-between text-lg">
                  <span className="font-semibold">You saved</span>
                  <span className="text-xl font-bold text-teal-400">
                    ${getTotalSavings().toFixed(2)}
                  </span>
                </div>

                <div className="mb-4 flex items-center justify-between text-lg">
                  <span className="font-semibold">Subtotal</span>
                  <span className="text-xl font-bold text-teal-400">
                    ${getCartTotalPrice().toFixed(2)}
                  </span>
                </div> */}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleViewCart}
                    className="flex-1 rounded-lg border border-gray-300 bg-white py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    View Cart
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="flex-1 rounded-lg bg-teal-600 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;

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
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useCartStore } from "../../store/cartStore";
// import { Product } from "src/types";

// interface CartDropdownProps {
//   onClose: () => void;
// }

// const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
//   const [selectedIndex, setSelectedIndex] = useState(-1);

//   const cart = useCartStore((state) => state.cart);
//   const getCartTotal = useCartStore((state) => state.getCartTotal);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Focus the dropdown when it opens
//   useEffect(() => {
//     dropdownRef.current?.focus();
//   }, []);

//   const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const selectProduct = useCallback(
//     (product: Product) => {
//       // setInputValue(product.title);
//       // debouncedSearch.cancel(); // Cancel pending debounced call
//       // setSearchQuery(product.title); // Immediate search
//       onClose();
//       setSelectedIndex(-1);
//     },
//     [onClose],
//   );

//   const handleProductClick = useCallback(
//     (product: Product) => {
//       selectProduct(product);
//     },
//     [selectProduct],
//   );

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
//     if (e.key === "Escape") {
//       onClose();
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black bg-opacity-10"
//       onClick={(e) => handleClickOutside(e)}
//       aria-hidden="true"
//     >
//       <div
//         ref={dropdownRef}
//         onKeyDown={(e) => handleKeyDown(e)}
//         id="cart-dropdown"
//         role="dialog"
//         aria-label="Cart contents"
//         tabIndex={-1} // Make the div focusable
//         className="cart-dropdown absolute right-4 top-20 z-50 min-h-52 w-[22rem] rounded-lg bg-white px-4 pb-4 pt-3 shadow-lg focus:outline-none"
//         // className="absolute right-4 top-12 z-50 flex min-h-[200px] w-80 items-center justify-center rounded-lg bg-white p-4 shadow-lg focus:outline-none"
//       >
//         {/* <h3 className="mb-4 text-center text-lg font-semibold">Your Cart</h3> */}
//         {/* <h3
//           className={`mb-4 text-center text-lg font-semibold ${cart.length === 0 ? "text-base" : ""}`}
//         >
//           Your Cart
//         </h3> */}
//         {/* <h3
//           className={`mb-2 text-lg font-semibold ${cart.length === 0 ? "w-full text-center" : ""}`}
//         >
//           Your Cart
//         </h3> */}
//         <div className="flex items-center justify-between">
//           <h3 className={`mb-2 text-lg font-semibold`}>Your Cart</h3>
//           <button
//             type="button"
//             onClick={onClose}
//             className="h-8 w-8 cursor-pointer self-start rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//             aria-label="Clear search"
//           >
//             ✕
//           </button>
//         </div>
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
//             <p className="text-gray-500">
//               Your cart is empty—let's find something amazing!
//             </p>
//             <button
//               // onClick={() => {
//               //   useNavigationStore.getState().setPage("home");
//               //   onClose();
//               // }}
//               className="mt-4 rounded-md bg-teal-500 px-6 py-3 text-white"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         ) : (
//           // <p className="text-gray-500">Your cart is empty</p>
//           <>
//             {/* Cart Items */}
//             {/* <div className="max-h-64 overflow-y-auto">
//               {cart.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center space-x-4 border-b py-2"
//                 >
//                   <img
//                     src={item.image}
//                     alt={`${item.title} in cart`}
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
//             </div> */}

//             <ul className="custom-scrollbar max-h-64 overflow-y-auto overflow-x-hidden">
//               {cart.map((product) => (
//                 // <div className="flex items-center space-x-4 border-b py-3">
//                 //   <img
//                 //     src={item.image}
//                 //     alt={`${item.title} in cart`}
//                 //     className="h-8 w-8 rounded object-cover"
//                 //   />
//                 //   <div className="flex flex-1 items-center justify-between">
//                 //     <div className="group relative flex-1">
//                 //       <p className="truncate text-sm font-medium">
//                 //         {item.title}
//                 //       </p>
//                 //       <div className="absolute left-0 top-full z-10 mt-1 hidden w-[200px] rounded border border-teal-500 bg-white p-2 text-sm text-gray-700 shadow-lg group-hover:block">
//                 //         {item.title}
//                 //       </div>
//                 //       <p className="text-sm text-gray-500">
//                 //         ${item.price.toFixed(2)} x {item.quantity}
//                 //       </p>
//                 //     </div>
//                 //     <p className="pl-4 text-sm font-semibold">
//                 //       ${(item.price * item.quantity).toFixed(2)}
//                 //     </p>
//                 //   </div>
//                 // </div>
//                 // <div className="flex items-center space-x-4 border-b py-3">
//                 //   <img
//                 //     src={item.image}
//                 //     alt={`${item.title} in cart`}
//                 //     className="h-8 w-8 rounded object-cover"
//                 //   />
//                 //   <div className="flex flex-1 items-center gap-x-4">
//                 //     <div className="group relative flex flex-1 flex-col">
//                 //       <p className="truncate text-sm font-medium">
//                 //         {item.title}
//                 //       </p>
//                 //       <div className="absolute left-0 top-full z-10 mt-1 hidden w-[200px] rounded border border-teal-500 bg-white p-2 text-sm text-gray-700 shadow-lg group-hover:block">
//                 //         {item.title}
//                 //       </div>
//                 //       <p className="text-sm text-gray-500">
//                 //         ${item.price.toFixed(2)} x {item.quantity}
//                 //       </p>
//                 //     </div>
//                 //     <p className="ml-auto flex text-sm font-semibold">
//                 //       ${(item.price * item.quantity).toFixed(2)}
//                 //     </p>
//                 //   </div>
//                 // </div>
//                 <li
//                   key={product.id}
//                   onClick={() => handleProductClick}
//                   className="mr-2 flex items-center space-x-4 border-b py-2.5"
//                 >
//                   <img
//                     src={product.image}
//                     loading="lazy"
//                     alt={`${product.title} in cart`}
//                     className="h-12 w-12 rounded object-cover"
//                   />
//                   <div className="group relative min-w-24 max-w-60 flex-1">
//                     <p
//                       title={product.title}
//                       className="truncate text-sm font-medium"
//                     >
//                       {product.title}
//                     </p>
//                     {/* <div className="absolute left-0 top-full z-[10000] mt-1 hidden w-[200px] rounded border border-teal-500 bg-white p-2 text-sm text-gray-700 shadow-lg group-hover:block">
//                       {item.title}
//                     </div> */}

//                     {/* <p class */}
//                     {/* <div className="max-w-36 flex-1">
//                     <p
//                       title={item.title}
//                       className="truncate text-sm font-medium"
//                     >
//                       {item.title}
//                     </p> */}
//                     <p className="text-sm text-gray-500">
//                       ${product.price.toFixed(2)} x {product.quantity}
//                     </p>
//                   </div>
//                   <p className="text-sm font-semibold">
//                     ${(product.price * product.quantity).toFixed(2)}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-4">
//               <p className="text-lg font-semibold">
//                 Subtotal:{" "}
//                 <span className="text-xl font-bold">
//                   ${getCartTotal().toFixed(2)}
//                 </span>
//               </p>
//             </div>
//             {/* <div className="mt-4">
//               <p className="text-lg font-bold">
//                 SUBTOTAL: ${getCartTotal().toFixed(2)}
//               </p>
//             </div> */}

//             {/* Subtotal */}
//             {/* <div className="mt-4">
//               <p className="text-lg font-semibold">
//                 Subtotal:{" "}
//                 <span className="text-xl font-bold">
//                   ${getCartTotal().toFixed(2)}
//                 </span>
//               </p>
//             </div> */}

//             {/* Buttons */}
//             <div className="mt-4 flex space-x-2">
//               <button
//                 onClick={() => {
//                   // Navigate to cart page (we'll implement this in Part 2)
//                   window.location.href = "/cart";
//                   onClose();
//                 }}
//                 className="flex-1 rounded bg-gray-200 py-2 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               >
//                 View Cart
//               </button>
//               <button
//                 onClick={() => {
//                   // Navigate to checkout page (we'll implement this in Part 2)
//                   window.location.href = "/checkout";
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
