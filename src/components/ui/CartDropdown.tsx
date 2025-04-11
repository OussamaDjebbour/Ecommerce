// src/components/CartDropdown.tsx
import React from "react";
import { useCartStore } from "../../store/cartStore";
// import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

interface CartDropdownProps {
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const cart = useCartStore((state) => state.cart);
  const getCartTotal = useCartStore((state) => state.getCartTotal);

  // Close the dropdown when clicking outside
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-10"
      onClick={handleClickOutside}
    >
      <div className="absolute right-4 top-20 z-50 w-80 rounded-lg bg-white p-4 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Your Cart</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b py-2"
                >
                  <img
                    src={item.image}
                    alt={item.title}
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
            </div>

            {/* Subtotal */}
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Subtotal: ${getCartTotal().toFixed(2)}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex space-x-2">
              {/* <Link
                to="/cart"
                className="flex-1 rounded bg-gray-200 py-2 text-center text-gray-800"
                onClick={onClose}
              >
                View Cart
              </Link> */}
              {/* <Link
                to="/checkout"
                className="flex-1 rounded bg-teal-500 py-2 text-center text-white"
                onClick={onClose}
              >
                Checkout
              </Link> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
