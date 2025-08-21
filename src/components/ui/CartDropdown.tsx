import React, { useCallback, useEffect, useRef, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import CartDropdownItem from "./CartDropdownItem";
import { useCartTotalItems } from "../../hooks/useCartTotalItems";
import { useCartTotalSavings } from "../../hooks/useCartTotalSavings";
import { useCartTotalPrice } from "../../hooks/useCartTotalPrice";

interface CartDropdownProps {
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartTotalPrice();
  const totalSavings = useCartTotalSavings();
  const totalItems = useCartTotalItems();

  const dropdownRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

    const [searchParams] = useSearchParams();
  const isBuyNow = searchParams.get("mode") === "buy-now";



  useEffect(() => {
    containerRef.current?.focus();
  }, []);

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
    if (location.pathname !== "/checkout" && !isBuyNow)
      navigate("checkout", { state: { from: location.pathname } });
    onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 cursor-pointer bg-black bg-opacity-20"
    >
      <div
        ref={containerRef}
        onKeyDown={handleKeyDown}
        id="cart-dropdown"
        role="dialog"
        aria-label="Cart contents"
        tabIndex={-1}
        className="absolute right-4 top-20 z-50 w-[22rem] cursor-default rounded-xl border border-gray-100 bg-white shadow-2xl focus:outline-none sm:w-[26rem]"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 sm:px-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              Your Cart
            </h3>
            {cart.length > 0 && (
              <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-semibold text-teal-800">
                {totalItems} {totalItems === 1 ? "item" : "items"}
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
              <div className="max-h-[16.7rem] overflow-y-auto px-6 py-4 sm:max-h-[17.2rem]">
                <ul ref={dropdownRef} className="space-y-3 sm:space-y-4">
                  {cart.map((product, index) => (
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
              <div className="px-6 pb-4 text-lg text-gray-800">
                <hr className="border-gray-200 px-6 pb-2.5" />

                <div className="mb-1 flex justify-between text-lg font-bold sm:text-xl">
                  <span>You Saved</span>
                  <span className="text-[#009393]">
                    ${totalSavings.toFixed(2)}
                  </span>
                </div>
                <div className="mb-4 flex justify-between text-lg font-bold sm:text-xl">
                  <span>Total</span>
                  <span className="text-[#009393]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

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
