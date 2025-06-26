import { Minus, Plus } from "lucide-react";
import { CartItem } from "../../types";
import { useCallback } from "react";
import {
  showMaxStockToast,
  showRemovalToast,
} from "../../helpers/toastHelpers";
import { useCartStore } from "../../store/cartStore";

interface QuantityControlProps {
  product: CartItem;
}
function QuantityControl({ product }: QuantityControlProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleIncrement = useCallback(
    (
      productId: number,
      productQuantity: number,
      stock: number,
      title: string,
    ) => {
      if (productQuantity < stock) {
        updateQuantity(productId, productQuantity + 1);
      } else {
        showMaxStockToast(title);
      }
    },
    [updateQuantity],
  );

  const handleDecrement = useCallback(
    (
      productId: number,
      productQuantity: number,
      title: string,
      image: string,
    ) => {
      if (productQuantity <= 1) {
        removeFromCart(productId);
        showRemovalToast(title, image);
        return;
      }
      updateQuantity(productId, productQuantity - 1);
    },

    [updateQuantity, removeFromCart],
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center rounded-full border border-gray-200 bg-white">
        <button
          onClick={() =>
            handleDecrement(
              product.id,
              product.quantity,
              product.title,
              product.image,
            )
          }
          className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100"
          aria-label="Decrease quantity"
        >
          <Minus className="h-3 w-3" />
        </button>

        <span className="w-8 text-center text-sm font-medium">
          {product.quantity}
        </span>
        <button
          onClick={() =>
            handleIncrement(
              product.id,
              product.quantity,
              product.stock,
              product.title,
            )
          }
          className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
            product.quantity >= product.stock
              ? "cursor-not-allowed border-gray-200 text-gray-400"
              : "border-gray-300 hover:bg-gray-100"
          }`}
          aria-label="Increase quantity"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export default QuantityControl;
