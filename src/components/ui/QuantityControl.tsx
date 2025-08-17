import { Mode, QuantityControlProduct } from "../../types";
import { useCallback } from "react";
import { Minus, Plus } from "lucide-react";
import {
  showAlertToast,
  showMaxStockToast,
  showRemovalToast,
} from "../../helpers/toastHelpers";
import { useCartStore } from "../../store/cartStore";

interface QuantityControlProps {
  product: QuantityControlProduct;
  mode: Mode;
  onUpdateBuyNow?: (qty: number) => void;
}

function QuantityControl({
  product,
  mode,
  onUpdateBuyNow,
}: QuantityControlProps) {
  const { updateQuantity, removeFromCart } = useCartStore();

  const isMin =
    mode === "buy-now" ? product.quantity <= 1 : product.quantity === 0;

  const isMax = product.quantity >= product.stock;

  const handleIncrement = useCallback(
    (
      productId: number,
      productQuantity: number,
      stock: number,
      title: string,
    ) => {
      if (productQuantity < stock) {
        if (mode === "buy-now" && onUpdateBuyNow) {
          onUpdateBuyNow(productQuantity + 1);
        } else {
          updateQuantity(productId, productQuantity + 1);
        }
      } else {
        showMaxStockToast(title);
      }
    },
    [updateQuantity, onUpdateBuyNow, mode],
  );

  const handleDecrement = useCallback(
    (
      productId: number,
      productQuantity: number,
      title: string,
      image: string,
    ) => {
      if (productQuantity <= 1) {
        if (mode === "buy-now") {
          showAlertToast("You Cannot delete this Product");
        } else {
          removeFromCart(productId);
          showRemovalToast(title, image);
        }
        return;
      }
      if (mode === "buy-now" && onUpdateBuyNow) {
        onUpdateBuyNow(productQuantity - 1);
      } else {
        updateQuantity(productId, productQuantity - 1);
      }
    },
    [updateQuantity, removeFromCart, onUpdateBuyNow, mode],
  );

  return (
    <div className="mr-6 flex h-8 w-[5.5rem] items-center justify-around rounded-3xl bg-[#F2F2F2] text-base font-normal text-black">
      <button
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-white transition-all duration-200 ${
          isMin
            ? "cursor-not-allowed opacity-50"
            : "hover:scale-105 hover:bg-[#009393] hover:text-white active:scale-95"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleDecrement(
            product.id,
            product.quantity,
            product.title,
            product.image,
          );
        }}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3 w-3 transition-transform hover:scale-110" />
      </button>
      <span>{product.quantity}</span>
      <button
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-white transition-all duration-200 ${
          isMax
            ? "cursor-not-allowed opacity-50"
            : "hover:scale-105 hover:bg-[#009393] hover:text-white active:scale-95"
        }`}
        onClick={() => {
          handleIncrement(
            product.id,
            product.quantity,
            product.stock,
            product.title,
          );
        }}
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3 transition-transform hover:scale-110" />
      </button>
    </div>
  );
}

export default QuantityControl;
