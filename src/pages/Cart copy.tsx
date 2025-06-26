import React from "react";
import {
  ArrowLeft,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Package,
} from "lucide-react";
import { useCartStore } from "../store/cartStore";
import {
  showRemovalCartToast,
  showRemovalToast,
} from "../helpers/toastHelpers";
import { CartItem } from "src/types";

interface CartProps {
  onBack: () => void;
  onCheckout: (product: {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }) => void;
}

const Cart: React.FC<CartProps> = ({ onBack, onCheckout }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotalItems,
    getCartTotalPrice,
  } = useCartStore();

  const handleRemoveItem = (item: CartItem) => {
    removeFromCart(item.id);
    showRemovalToast(item.title, item.image);
  };

  const handleClearCart = () => {
    clearCart();
    showRemovalCartToast();
  };

  const handleQuantityChange = (
    id: number,
    newQuantity: number,
    maxStock: number,
  ) => {
    if (newQuantity <= 0) {
      const item = cart.find((item) => item.id === id);
      if (item) {
        handleRemoveItem(item);
      }
    } else {
      updateQuantity(id, Math.min(newQuantity, maxStock));
    }
  };

  const handleCheckoutItem = (item: CartItem) => {
    onCheckout({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    });
  };

  const handleCheckoutAll = () => {
    // For simplicity, we'll checkout the first item or create a combined checkout
    // In a real app, you'd handle multiple items differently
    if (cart.length > 0) {
      const totalAmount = getCartTotalPrice();
      console.log("totalAmount", totalAmount, getCartTotalPrice());
      const totalItems = getCartTotalItems();

      onCheckout({
        id: 999, // Special ID for cart checkout
        title: `Cart Items (${totalItems} items)`,
        price: totalAmount,
        image: cart[0].image, // Use first item's image
        quantity: 1,
      });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="col-span-2 min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={onBack}
              className="mb-4 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              Continue Shopping
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>

          {/* Empty Cart */}
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
            <Package className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h2 className="mb-2 text-2xl font-semibold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mb-6 text-gray-600">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button
              onClick={onBack}
              className="rounded-lg bg-[#009393] px-8 py-3 font-medium text-white transition-colors hover:bg-[#007a7a]"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-2 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            Continue Shopping
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <p className="mt-2 text-gray-600">
                {getCartTotalItems()}{" "}
                {getCartTotalItems() === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            {cart.length > 1 && (
              <button
                onClick={handleClearCart}
                className="text-sm font-medium text-red-600 transition-colors hover:text-red-700"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-3">
            {cart.map((item) => (
              <div key={item.id} className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-start gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-24 w-24 rounded-lg border border-gray-200 object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                      In stock: {item.stock} items available
                    </p>

                    {/* Price and Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-semibold text-[#009393]">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">each</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-lg border border-gray-300">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                item.quantity - 1,
                                item.stock,
                              )
                            }
                            className="p-2 transition-colors hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[3rem] px-4 py-2 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                item.quantity + 1,
                                item.stock,
                              )
                            }
                            disabled={item.quantity >= item.stock}
                            className={`p-2 transition-colors ${
                              item.quantity >= item.stock
                                ? "cursor-not-allowed opacity-50"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total and Actions */}
                    <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                      <div className="text-lg font-semibold text-gray-900">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => handleCheckoutItem(item)}
                        className="rounded-lg bg-[#009393] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#007a7a]"
                      >
                        Buy This Item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <ShoppingCart className="h-5 w-5 text-[#009393]" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Order Summary
                </h2>
              </div>

              <div className="mb-6 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({getCartTotalItems()})</span>
                  <span>${getCartTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-[#009393]">
                    ${getCartTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckoutAll}
                className="mb-4 w-full rounded-lg bg-[#009393] px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#007a7a]"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={onBack}
                className="w-full rounded-lg border-2 border-[#009393] px-6 py-3 font-medium text-[#009393] transition-colors hover:bg-[#009393] hover:text-white"
              >
                Continue Shopping
              </button>

              {/* Security Badge */}
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-center gap-2 text-green-700">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">Secure Checkout</span>
                </div>
                <p className="mt-1 text-xs text-green-600">
                  Your information is protected with 256-bit SSL encryption
                </p>
              </div>

              {/* Estimated Delivery */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Free shipping</span> on orders
                  over $50
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Estimated delivery: 3-5 business days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
