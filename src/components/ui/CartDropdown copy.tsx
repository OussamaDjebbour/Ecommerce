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
    if (location.pathname !== "/checkout") navigate("checkout");
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
// import { CartItem, Product } from "src/types";
// import { useNavigate } from "react-router-dom";
// import { useClickAway } from "react-use";

// interface CartDropdownProps {
//   onClose: () => void;
// }

// const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
//   const [selectedIndex, setSelectedIndex] = useState(-1);

//   const cart = useCartStore(useCallback((state) => state.cart, []));
//   const getCartTotal = useCartStore(
//     useCallback((state) => state.getCartTotal, []),
//   );

//   const dropdownRef = useRef<HTMLUListElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     containerRef.current?.focus();
//   }, []);

//   useClickAway(containerRef, () => onClose());

//   const selectProduct = useCallback(
//     (product: CartItem) => {
//       // setInputValue(product.title);
//       // debouncedSearch.cancel(); // Cancel pending debounced call
//       // setSearchQuery(product.title); // Immediate search
//       onClose();
//       setSelectedIndex(-1);
//     },
//     [onClose],
//   );

//   const handleProductClick = useCallback(
//     (product: CartItem) => {
//       selectProduct(product);
//     },
//     [selectProduct],
//   );

//   // Auto-scroll to selected item in Cart Dropdown
//   const scrollToSelectedItem = useCallback(() => {
//     if (dropdownRef.current && selectedIndex >= 0) {
//       const selectedElement = dropdownRef.current.children[
//         selectedIndex
//       ] as HTMLElement;
//       if (selectedElement) {
//         selectedElement.scrollIntoView({
//           behavior: "smooth",
//           block: "nearest",
//         });
//       }
//     }
//   }, [selectedIndex]);

//   // Scroll to selected item when selectedIndex changes
//   useEffect(() => {
//     scrollToSelectedItem();
//   }, [scrollToSelectedItem]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
//     if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) {
//       e.preventDefault();
//     }
//     if (e.key === "ArrowDown") {
//       setSelectedIndex((prev) => (prev < cart.length - 1 ? prev + 1 : 0));
//     } else if (e.key === "ArrowUp") {
//       setSelectedIndex((prev) => (prev > 0 ? prev - 1 : cart.length - 1));
//     } else if (e.key === "Enter" && selectedIndex >= 0) {
//       e.preventDefault();
//       const selectedProduct = cart[selectedIndex];
//       selectProduct(selectedProduct);
//     }

//     if (e.key === "Escape") {
//       onClose();
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black bg-opacity-10"
//       aria-hidden="true"
//     >
//       <div
//         ref={containerRef}
//         onKeyDown={(e) => handleKeyDown(e)}
//         id="cart-dropdown"
//         role="dialog"
//         aria-label="Cart contents"
//         tabIndex={-1} // Make the div focusable
//         className="cart-dropdown absolute right-4 top-20 z-50 min-h-52 w-[22rem] rounded-lg bg-white px-4 pb-4 pt-3 shadow-lg focus:outline-none"
//         aria-modal="true"
//         aria-labelledby="cart-dropdown"
//         aria-describedby="cart-dropdown"
//       >
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
//               className="mt-4 rounded-md bg-teal-500 px-6 py-2.5 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               // className="mt-4 rounded-md bg-teal-500 px-6 py-3 text-white"
//               onClick={() => {
//                 navigate("/");
//                 onClose();
//               }}
//             >
//               Continue Shopping
//             </button>
//           </div>
//         ) : (
//           <>
//             <ul
//               ref={dropdownRef}
//               role="listbox"
//               aria-label="Cart products"
//               className="custom-scrollbar max-h-64 overflow-y-auto overflow-x-hidden"
//             >
//               {cart.map((product, index) => (
//                 <li
//                   key={product.id}
//                   role="option"
//                   aria-selected={index === selectedIndex}
//                   // onMouseEnter={() => setSelectedIndex(index)}
//                   // onMouseLeave={() => setSelectedIndex(-1)}
//                   onClick={() => handleProductClick}
//                   // className="mr-2 flex items-center space-x-4 border-b py-2.5"
//                   className={`mr-2 flex cursor-pointer items-center space-x-4 border-b py-2.5 pr-2 transition-colors duration-150 hover:border-l-2 hover:border-l-blue-500 hover:bg-blue-100 ${
//                     index === selectedIndex
//                       ? "border-l-2 border-l-blue-500 bg-blue-100"
//                       : ""
//                   }`}
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

//             {/* Buttons */}
//             <div className="mt-4 flex space-x-2">
//               <button
//                 onClick={() => {
//                   navigate("/cart");
//                   onClose();
//                 }}
//                 className="flex-1 rounded bg-gray-200 py-2 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               >
//                 View Cart
//               </button>
//               <button
//                 onClick={() => {
//                   navigate("/checkout");
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

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useCartStore } from "../../store/cartStore";
// import { CartItem, Product } from "src/types";
// import { useNavigate } from "react-router-dom";
// import { useClickAway } from "react-use";
// import { toast } from "react-toastify";

// interface CartDropdownProps {
//   onClose: () => void;
// }

// const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
//   const [selectedIndex, setSelectedIndex] = useState(-1);

//   const cart = useCartStore((state) => state.cart);
//   console.log("cartttstock", cart);
//   const getCartTotal = useCartStore((state) => state.getCartTotal);
//   const updateQuantity = useCartStore((state) => state.updateQuantity);
//   const removeFromCart = useCartStore((state) => state.removeFromCart);

//   // const isFull = cart.some(
//   //   (item) => item.id === id && item.quantity === item.stock,
//   // );

//   const dropdownRef = useRef<HTMLUListElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     containerRef.current?.focus();
//   }, []);

//   useClickAway(containerRef, () => onClose());

//   const handleQuantityChange = useCallback(
//     (productId: number, newQuantity: number, stock: number, title: string) => {
//       if (newQuantity <= 0) {
//         removeFromCart(productId);
//         toast.error("Item removed from cart successfully");
//       } else {
//         if (newQuantity <= stock) updateQuantity(productId, newQuantity);
//         else toast.error(`Max stock reached for "${title}"`);
//       }
//     },
//     [updateQuantity, removeFromCart],
//   );

//   const handleRemoveItem = useCallback(
//     (productId: number) => {
//       removeFromCart(productId);
//       toast.error(`Item removed from cart successfully`);
//     },
//     [removeFromCart],
//   );

//   // Auto-scroll to selected item in Cart Dropdown
//   const scrollToSelectedItem = useCallback(() => {
//     if (dropdownRef.current && selectedIndex >= 0) {
//       const selectedElement = dropdownRef.current.children[
//         selectedIndex
//       ] as HTMLElement;
//       if (selectedElement) {
//         selectedElement.scrollIntoView({
//           behavior: "smooth",
//           block: "nearest",
//         });
//       }
//     }
//   }, [selectedIndex]);

//   useEffect(() => {
//     scrollToSelectedItem();
//   }, [scrollToSelectedItem]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
//     if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) {
//       e.preventDefault();
//     }
//     if (e.key === "ArrowDown") {
//       setSelectedIndex((prev) => (prev < cart.length - 1 ? prev + 1 : 0));
//     } else if (e.key === "ArrowUp") {
//       setSelectedIndex((prev) => (prev > 0 ? prev - 1 : cart.length - 1));
//     } else if (e.key === "Escape") {
//       onClose();
//     }
//   };

//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black bg-opacity-20"
//       aria-hidden="true"
//     >
//       <div
//         ref={containerRef}
//         onKeyDown={handleKeyDown}
//         id="cart-dropdown"
//         role="dialog"
//         aria-label="Cart contents"
//         tabIndex={-1}
//         className="absolute right-4 top-20 z-50 w-[26rem] rounded-xl border border-gray-100 bg-white shadow-2xl focus:outline-none"
//         aria-modal="true"
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
//           <div className="flex items-center gap-2">
//             <h3 className="text-xl font-bold text-gray-900">Your Cart</h3>
//             {cart.length > 0 && (
//               <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-semibold text-teal-800">
//                 {totalItems} {totalItems === 1 ? "item" : "items"}
//               </span>
//             )}
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
//             aria-label="Close cart"
//           >
//             <svg
//               className="h-5 w-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Content */}
//         <div className="max-h-[28rem] min-h-[12rem]">
//           {cart.length === 0 ? (
//             <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
//               <div className="mb-4 rounded-full bg-gray-100 p-4">
//                 <svg
//                   className="h-12 w-12 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1.5"
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//               </div>
//               <h4 className="mb-2 text-lg font-semibold text-gray-900">
//                 Your cart is empty
//               </h4>
//               <p className="mb-6 text-sm text-gray-500">
//                 Discover amazing products and add them to your cart
//               </p>
//               <button
//                 onClick={() => {
//                   if (
//                     location.pathname !== "/productPage" &&
//                     location.pathname !== "/"
//                   )
//                     navigate("/");
//                   onClose();
//                 }}
//                 className="rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
//               >
//                 Start Shopping
//               </button>
//             </div>
//           ) : (
//             <>
//               {/* Cart Items */}
//               <div className="max-h-80 overflow-y-auto px-6 py-4">
//                 <ul ref={dropdownRef} className="space-y-3">
//                   {cart.map((product, index) => (
//                     <li
//                       key={product.id}
//                       className={`group relative cursor-pointer rounded-lg border border-gray-100 p-3 transition-all duration-200 hover:border-teal-200 hover:bg-teal-50 ${
//                         index === selectedIndex
//                           ? "border-teal-200 bg-teal-50"
//                           : ""
//                       }`}
//                     >
//                       {/* Remove button */}
//                       <button
//                         onClick={() => {
//                           handleRemoveItem(product.id);
//                         }}
//                         className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-400 opacity-0 shadow-sm transition-all duration-200 hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
//                         aria-label={`Remove ${product.title} from cart`}
//                       >
//                         <svg
//                           className="h-3 w-3"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M6 18L18 6M6 6l12 12"
//                           />
//                         </svg>
//                       </button>

//                       <div className="flex items-start gap-4">
//                         {/* Product Image */}
//                         <div className="flex-shrink-0">
//                           <img
//                             src={product.image}
//                             loading="lazy"
//                             alt={product.title}
//                             className="h-16 w-16 rounded-lg object-cover"
//                           />
//                         </div>

//                         {/* Product Details */}
//                         <div className="min-w-0 flex-1">
//                           <h4
//                             title={product.title}
//                             className="mb-1 line-clamp-2 text-sm font-semibold text-gray-900"
//                           >
//                             {product.title}
//                           </h4>
//                           <p className="mb-3 text-sm font-bold text-teal-600">
//                             ${product.price.toFixed(2)}
//                           </p>

//                           {/* Quantity Controls */}
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center rounded-lg border border-gray-200 bg-white">
//                               <button
//                                 onClick={() =>
//                                   handleQuantityChange(
//                                     product.id,
//                                     product.quantity - 1,
//                                     product.stock,
//                                     product.title,
//                                   )
//                                 }
//                                 className="flex h-8 w-8 items-center justify-center rounded-l-lg text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
//                                 aria-label="Decrease quantity"
//                               >
//                                 <svg
//                                   className="h-3 w-3"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M20 12H4"
//                                   />
//                                 </svg>
//                               </button>
//                               <span className="flex h-8 w-12 items-center justify-center border-x border-gray-200 text-sm font-semibold text-gray-900">
//                                 {product.quantity}
//                               </span>
//                               <button
//                                 onClick={() =>
//                                   // updateQuantity(
//                                   //   product?.id,
//                                   //   product.quantity,
//                                   // )
//                                   handleQuantityChange(
//                                     product.id,
//                                     product.quantity + 1,
//                                     product?.stock,
//                                     product.title,
//                                   )
//                                 }
//                                 className={`hover:text-gray-700" aria-label="Increase quantity flex h-8 w-8 items-center justify-center rounded-r-lg text-gray-500 transition-colors hover:bg-gray-50 ${product.quantity === product.stock && "cursor-not-allowed opacity-50"} `}
//                               >
//                                 <svg
//                                   className="h-3 w-3"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M12 4v16m8-8H4"
//                                   />
//                                 </svg>
//                               </button>
//                             </div>

//                             {/* Item Total */}
//                             <div className="text-right">
//                               <p className="text-sm font-bold text-gray-900">
//                                 ${(product.price * product.quantity).toFixed(2)}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Footer */}
//               <div className="border-t border-gray-100 px-6 py-4">
//                 {/* Subtotal */}
//                 <div className="mb-4 flex items-center justify-between">
//                   <span className="text-lg font-semibold text-gray-900">
//                     Subtotal:
//                   </span>
//                   <span className="text-xl font-bold text-gray-900">
//                     ${getCartTotal().toFixed(2)}
//                   </span>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => {
//                       navigate("/cart");
//                       onClose();
//                     }}
//                     className="flex-1 rounded-lg border border-gray-300 bg-white py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
//                   >
//                     View Cart
//                   </button>
//                   <button
//                     onClick={() => {
//                       navigate("/checkout");
//                       onClose();
//                     }}
//                     className="flex-1 rounded-lg bg-teal-600 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
//                   >
//                     Checkout
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartDropdown;

// import React from "react";
// import { toast } from "react-toastify";
// import { Minus, Plus, X } from "lucide-react";
// import { useCartStore } from "../../store/cartStore";
// import CustomToast from "./CustomToast";

// const CartDropdown: React.FC = () => {
//   const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } =
//     useCartStore();

//   // Handle quantity increment with toast for max stock
//   const handleIncrement = (
//     id: number,
//     currentQuantity: number,
//     stock: number,
//     title: string,
//     image: string,
//   ) => {
//     if (currentQuantity >= stock) {
//       // Show max stock reached toast
//       const maxStockToast = (
//         <CustomToast
//           success={false}
//           message="Max stock reached for this product"
//           productTitle={title}
//         />
//       );

//       toast.error(maxStockToast, {
//         className: "bg-white shadow-lg border border-red-200",
//       });
//       return;
//     }

//     // Update quantity silently (no toast for normal increment)
//     updateQuantity(id, currentQuantity + 1);
//   };

//   // Handle quantity decrement with toast for removal
//   const handleDecrement = (
//     id: number,
//     currentQuantity: number,
//     title: string,
//     image: string,
//   ) => {
//     if (currentQuantity <= 1) {
//       // Remove item and show removal toast
//       removeFromCart(id);

//       const removalToast = (
//         <CustomToast
//           success={true}
//           message={`${title} removed from cart`}
//           productImage={image}
//           productTitle={title}
//         />
//       );

//       toast.success(removalToast, {
//         className: "bg-white shadow-lg border border-blue-200",
//       });
//       return;
//     }

//     // Update quantity silently (no toast for normal decrement)
//     updateQuantity(id, currentQuantity - 1);
//   };

//   // Handle direct removal via X button
//   const handleRemove = (id: number, title: string, image: string) => {
//     removeFromCart(id);

//     const removalToast = (
//       <CustomToast
//         success={true}
//         message={`${title} removed from cart`}
//         productImage={image}
//         productTitle={title}
//       />
//     );

//     toast.success(removalToast, {
//       className: "bg-white shadow-lg border border-blue-200",
//     });
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
//         <p className="text-center text-gray-500">Your cart is empty</p>
//       </div>
//     );
//   }

//   return (
//     <div className="absolute right-0 top-full z-50 mt-2 max-h-96 w-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
//       <div className="p-4">
//         <div className="mb-4 flex items-center justify-between">
//           <h3 className="text-lg font-semibold">Shopping Cart</h3>
//           <button
//             onClick={clearCart}
//             className="text-sm text-red-600 transition-colors hover:text-red-800"
//           >
//             Clear All
//           </button>
//         </div>

//         <div className="space-y-3">
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center gap-3 rounded-lg border border-gray-100 p-3"
//             >
//               {/* Product Image */}
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="h-12 w-12 flex-shrink-0 rounded-lg border border-gray-200 object-cover"
//               />

//               {/* Product Info */}
//               <div className="min-w-0 flex-1">
//                 <h4 className="truncate text-sm font-medium text-gray-900">
//                   {item.title}
//                 </h4>
//                 <p className="text-sm text-gray-600">
//                   ${item.price.toFixed(2)}
//                 </p>
//               </div>

//               {/* Quantity Controls */}
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() =>
//                     handleDecrement(
//                       item.id,
//                       item.quantity,
//                       item.title,
//                       item.image,
//                     )
//                   }
//                   className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100"
//                 >
//                   <Minus className="h-3 w-3" />
//                 </button>

//                 <span className="w-8 text-center text-sm font-medium">
//                   {item.quantity}
//                 </span>

//                 <button
//                   onClick={() =>
//                     handleIncrement(
//                       item.id,
//                       item.quantity,
//                       item.stock,
//                       item.title,
//                       item.image,
//                     )
//                   }
//                   className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
//                     item.quantity >= item.stock
//                       ? "cursor-not-allowed border-gray-200 text-gray-400"
//                       : "border-gray-300 hover:bg-gray-100"
//                   }`}
//                   disabled={item.quantity >= item.stock}
//                 >
//                   <Plus className="h-3 w-3" />
//                 </button>
//               </div>

//               {/* Remove Button */}
//               <button
//                 onClick={() => handleRemove(item.id, item.title, item.image)}
//                 className="flex h-6 w-6 items-center justify-center text-red-500 transition-colors hover:text-red-700"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Cart Total */}
//         <div className="mt-4 border-t border-gray-200 pt-4">
//           <div className="mb-3 flex items-center justify-between">
//             <span className="text-lg font-semibold">Total:</span>
//             <span className="text-lg font-bold text-[#009393]">
//               ${getCartTotal().toFixed(2)}
//             </span>
//           </div>

//           <button className="w-full rounded-lg bg-[#009393] px-4 py-2 font-medium text-white transition-colors hover:bg-[#007a7a]">
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartDropdown;

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
