import { Trash2 } from "lucide-react";
import { showRemovalToast } from "../../helpers/toastHelpers";
import { useCartStore } from "../../store/cartStore";
import { CartItemType } from "../../types";
import QuantityControl from "./QuantityControl";
import { useLocation } from "react-router-dom";
import useNavigateToProduct from "../../hooks/useNavigateToProduct";
import { getPriceDetails } from "../../helpers/getPriceDetails";

interface CartItemProps {
  item: CartItemType;
  onCheckout?: (item: CartItemType) => void;
  className?: string;
  mode?: "cart" | "buy-now";
  onUpdateBuyNow?: (qty: number) => void;
}

function CartItem({
  item,
  onCheckout,
  className = "",
  mode = "cart",
  onUpdateBuyNow,
}: CartItemProps) {
  const location = useLocation();
  const isOnCheckoutPage = location.pathname.includes("checkout");

  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const navigateToProduct = useNavigateToProduct();

  const { originalPrice, discountedPrice, hasDiscount } = getPriceDetails(item);

  const handleRemoveItem = (item: CartItemType) => {
    if (mode !== "buy-now") {
      removeFromCart(item.id);
      showRemovalToast(item.title, item.image);
    }
  };

  const handleNavigateToProduct = (item: CartItemType) => {
    if (mode === "cart") navigateToProduct(item);
  };

  return (
    <li
      className={`group rounded-lg border border-gray-200 bg-white hover:border-teal-200 hover:bg-teal-50 ${isOnCheckoutPage ? "px-4 py-4 sm:py-6" : "p-4 shadow-sm sm:p-6"} ${className}`}
      aria-label={`View details for ${item.title}`}
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
        {/* Product Image */}
        <div
          onClick={() => handleNavigateToProduct(item)}
          onKeyDown={(e) => e.key === "Enter" && handleNavigateToProduct(item)}
          role="link"
          tabIndex={0}
          className={`flex-shrink-0 self-center sm:self-auto ${mode === "cart" ? "cursor-pointer rounded-lg hover:scale-105 hover:border hover:border-teal-500 hover:opacity-80" : ""}`}
        >
          <img
            src={item.image}
            alt={item.title || "Product"}
            className={`h-24 w-24 rounded-lg border border-gray-200 object-cover group-hover:border-teal-200 sm:h-28 sm:w-28 ${location.pathname.includes("checkout") ? "lg:h-20 lg:w-20" : "xl:h-24 xl:w-24"} `}
            loading="lazy"
          />
        </div>

        {/* Product Details */}
        <div className="w-full min-w-0 flex-1">
          <h3
            onClick={() => handleNavigateToProduct(item)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleNavigateToProduct(item)
            }
            role="link"
            tabIndex={0}
            className={`mb-2 text-center sm:text-start ${mode === "cart" ? "cursor-pointer decoration-slice underline-offset-2 hover:underline" : ""} truncate text-base font-semibold text-gray-900 sm:text-lg`}
            aria-label={`View details for ${item.title || "product"}`}
          >
            {item.title || "Unnamed Product"}
          </h3>
          <p className="mb-3 text-center text-sm text-gray-600 sm:mb-4 sm:text-start">
            {item.stock !== undefined
              ? `In stock: ${item.stock} items available`
              : "Stock information unavailable"}
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              {hasDiscount ? (
                <>
                  <span className="text-base font-bold text-[#009393] sm:text-lg">
                    ${discountedPrice}
                  </span>
                  {!isOnCheckoutPage && (
                    <span className="text-sm text-gray-500 line-through">
                      ${originalPrice}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-base text-gray-500 sm:text-lg">
                  ${originalPrice}
                </span>
              )}
              <span className="text-sm text-gray-500">each</span>
            </div>

            <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:gap-3">
              <QuantityControl
                product={item}
                mode={mode}
                onUpdateBuyNow={onUpdateBuyNow}
              />
              {mode !== "buy-now" && (
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                  title="Remove item"
                  aria-label={`Remove ${item.title || "product"} from cart`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {!isOnCheckoutPage && (
            <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="text-lg font-semibold text-gray-900">
                Subtotal:{" "}
                <span className="text-xl font-bold text-[#009393]">
                  {(item?.discountedPrice * item?.quantity).toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => onCheckout && onCheckout(item)}
                className="rounded-lg bg-[#009393] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#007a7a]"
                aria-label={`Buy ${item.title || "product"}`}
              >
                Buy This Item
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default CartItem;
