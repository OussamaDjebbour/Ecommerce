import { Trash2 } from "lucide-react";
import { showRemovalToast } from "../../helpers/toastHelpers";
import { useCartStore } from "../../store/cartStore";
import { CartItem as CartItemType } from "../../types";
import QuantityControl from "./QuantityControl";

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleRemoveItem = (item: CartItemType) => {
    removeFromCart(item.id);
    showRemovalToast(item.title, item.image);
  };

  const handleCheckoutItem = (item: CartItemType) => {
    // onCheckout({
    //   id: item.id,
    //   title: item.title,
    //   price: item.price,
    //   image: item.image,
    //   quantity: item.quantity,
    // });
    console.log("Checkout item:", item);
  };

  return (
    <li key={item.id} className="rounded-lg bg-white p-6 shadow-sm">
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

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-[#009393]">
                ${item.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500">each</span>
            </div>

            <div className="flex items-center gap-3">
              <QuantityControl product={item} />

              <button
                onClick={() => handleRemoveItem(item)}
                className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                title="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

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
    </li>
  );
}

export default CartItem;
