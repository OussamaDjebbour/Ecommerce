import React from "react";
import { useCartStore } from "../../store/cartStore";

const CartPage: React.FC = () => {
  const { cart, getCartTotal, updateQuantity, removeFromCart } = useCartStore();

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Cart</h2>
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
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="rounded bg-gray-200 px-2 py-1"
                    aria-label={`Decrease quantity of ${item.title}`}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded bg-gray-200 px-2 py-1"
                    aria-label={`Increase quantity of ${item.title}`}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded bg-red-500 px-2 py-1 text-white"
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-xl font-semibold">
              Total: ${getCartTotal().toFixed(2)}
            </p>
            <button
              //   onClick={() => useNavigationStore.getState().setPage("checkout")}
              className="mt-4 rounded bg-teal-500 px-4 py-2 text-white"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
