import React from "react";
import { useCartStore } from "../../store/cartStore";

const CheckoutPage: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCartStore();

  const handleCheckout = () => {
    // Simulate a checkout process (e.g., send order to backend)
    alert("Order placed successfully!");
    clearCart(); // Clear the cart after checkout
    // useNavigationStore.getState().setPage("home"); // Redirect to home page
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Checkout</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 rounded border p-4"
              >
                <img
                  src={item.image}
                  alt={`${item.title} in cart`}
                  className="h-16 w-16 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="text-lg font-medium">{item.title}</p>
                  <p className="text-gray-500">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <p className="text-lg font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-xl font-semibold">
              Total: ${getCartTotal().toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 rounded bg-teal-500 px-4 py-2 text-white"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
