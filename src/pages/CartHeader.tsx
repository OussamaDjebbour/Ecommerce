import { ArrowLeft } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { showRemovalCartToast } from "../helpers/toastHelpers";
import { useContinueShopping } from "../hooks/useContinueShopping";

function CartHeader() {
  const handleContinueShopping = useContinueShopping();

  const { cart, clearCart, getCartTotalItems } = useCartStore();

  const handleClearCart = () => {
    clearCart();
    showRemovalCartToast();
  };

  return (
    <div className="mb-8">
      <button
        onClick={handleContinueShopping}
        className="mb-4 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5" />
        Continue Shopping
      </button>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          {cart.length > 0 && (
            <p className="ml-2.5 mt-2 text-gray-600">
              <span className="text-lg font-semibold">
                {getCartTotalItems()}{" "}
              </span>
              {getCartTotalItems() === 1 ? "item" : "items"} in your cart
            </p>
          )}
        </div>
        {cart.length > 1 && (
          <button
            onClick={handleClearCart}
            className="rounded-xl bg-red-100 px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-200 hover:text-red-800"
          >
            Clear Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default CartHeader;
