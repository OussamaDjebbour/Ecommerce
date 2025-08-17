import { X } from "lucide-react";
import { useCallback } from "react";
import { CartItemType } from "src/types";
import QuantityControl from "./QuantityControl";
import { useCartStore } from "../../store/cartStore";
import { showRemovalToast } from "../../helpers/toastHelpers";
import { getPriceDetails } from "../../helpers/getPriceDetails";

interface CartDropdownItem {
  product: CartItemType;
  index: number;
  selectedIndex: number;
}

function CartDropdownItem({ product, index, selectedIndex }: CartDropdownItem) {
  const { originalPrice, discountedPrice, hasDiscount } =
    getPriceDetails(product);

  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleRemoveItem = useCallback(
    (productId: number, title: string, image: string) => {
      removeFromCart(productId);
      showRemovalToast(title, image);
    },
    [removeFromCart],
  );

  return (
    <li
      className={`group relative rounded-lg border border-gray-100 p-3 transition-all duration-200 hover:border-teal-200 hover:bg-teal-50 ${
        index === selectedIndex ? "border-teal-200 bg-teal-50" : ""
      }`}
    >
      <button
        onClick={() => {
          handleRemoveItem(product.id, product.title, product.image);
        }}
        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-400 opacity-0 shadow-sm transition-all duration-200 hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
        aria-label={`Remove ${product.title} from cart`}
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-16 w-16 rounded-lg border border-gray-200 object-cover group-hover:border-teal-200"
          />
        </div>

        {/* Product Details */}
        <div className="min-w-0 flex-1">
          <h4
            title={product.title}
            className="mb-1 line-clamp-2 max-w-[93%] truncate text-sm font-semibold text-gray-900"
          >
            {product.title}
          </h4>
          <p className="mb-3 text-sm font-bold text-teal-600">
            {hasDiscount ? `$${discountedPrice}` : `$${originalPrice}`}
          </p>

          <div className="flex items-center justify-between">
            <QuantityControl product={product} mode="cart" />

            {/* Item Total */}
            <div className="text-right">
              <p className="text-base font-bold text-teal-600">
                {hasDiscount
                  ? `$${(discountedPrice * product.quantity).toFixed(2)}`
                  : `$${(originalPrice * product.quantity).toFixed(2)}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartDropdownItem;
