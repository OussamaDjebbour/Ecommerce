import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCartTotalItems } from "../../hooks/useCartTotalItems";
import { useCartTotalPrice } from "../../hooks/useCartTotalPrice";
import { useCartTotalSavings } from "../../hooks/useCartTotalSavings";

interface CartOrderSummaryProps {
  onHandleBack: () => void;
}
function CartOrderSummary({ onHandleBack }: CartOrderSummaryProps) {
  const totalItems = useCartTotalItems();
  const totalPrice = useCartTotalPrice();
  const totalSavings = useCartTotalSavings();

  const location = useLocation();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (location.pathname !== "/checkout") navigate("/checkout");
  };

  return (
    <div className="lg:col-span-2">
      <div className="sticky top-8 rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <ShoppingCart className="h-5 w-5 text-[#009393]" />
          <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex justify-between text-gray-600">
            <span>Items ({totalItems})</span>
            <span className="font-bold text-[#009393]">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="font-bold text-teal-500">Free</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>Calculated at checkout</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-xl font-bold text-gray-900">
            <span>You Saved</span>
            <span className="text-[#009393]">${totalSavings.toFixed(2)}</span>
          </div>
          <div className="mt-0 flex justify-between text-xl font-bold text-gray-900">
            <span>Total</span>
            <span className="text-[#009393]">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="mb-4 w-full rounded-lg bg-[#009393] px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#007a7a]"
        >
          Proceed to Checkout
        </button>

        <button
          onClick={onHandleBack}
          className="w-full rounded-lg border-2 border-[#009393] px-6 py-3 font-medium text-[#009393] transition-colors hover:bg-[#009393] hover:text-white"
        >
          Continue Shopping
        </button>

        {/* Security Badge */}
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2 text-green-700">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
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
            <span className="font-medium">Free shipping</span> on orders over
            $50
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Estimated delivery: 3-5 business days
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartOrderSummary;
