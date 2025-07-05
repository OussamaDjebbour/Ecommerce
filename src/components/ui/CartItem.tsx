// import { Trash2 } from "lucide-react";
// import { showRemovalToast } from "../../helpers/toastHelpers";
// import { useCartStore } from "../../store/cartStore";
// import { CartItem as CartItemType } from "../../types";
// import QuantityControl from "./QuantityControl";
// import { useLocation } from "react-router-dom";

// interface CartItemProps {
//   item: CartItemType;
// }

// function CartItem({ item }: CartItemProps) {
//   const removeFromCart = useCartStore((state) => state.removeFromCart);

//   const handleRemoveItem = (item: CartItemType) => {
//     removeFromCart(item.id);
//     showRemovalToast(item.title, item.image);
//   };

//   const handleCheckoutItem = (item: CartItemType) => {
//     // onCheckout({
//     //   id: item.id,
//     //   title: item.title,
//     //   price: item.price,
//     //   image: item.image,
//     //   quantity: item.quantity,
//     // });
//     console.log("Checkout item:", item);
//   };

//   const location = useLocation();
//   const isOnCheckoutPage = location.pathname.includes("checkout");

//   return (
//     // p-6
//     <li
//       key={item.id}
//       className={`list-none rounded-lg bg-white ${isOnCheckoutPage ? "" : "p-6"} shadow-sm`}
//     >
//       {/* gap-6 */}
//       <div
//         className={`flex items-start ${isOnCheckoutPage ? "gap-4" : "gap-6"} `}
//       >
//         {/* Product Image */}
//         <div className="flex-shrink-0">
//           <img
//             src={item.image}
//             alt={item.title}
//             loading="lazy"
//             className={`${isOnCheckoutPage ? "h-16 w-16" : "h-24 w-24"} rounded-lg border border-gray-200 object-cover`}
//           />
//         </div>

//         {/* Product Details */}
//         <div className="min-w-0 flex-1">
//           <h3
//             className={`mb-2 truncate text-lg font-semibold text-gray-900`}
//             // className={`mb-2 truncate ${isOnCheckoutPage ? "text-base" : "text-lg"} font-semibold text-gray-900`}
//           >
//             {item.title}
//           </h3>
//           <p
//             className={`mb-4 text-sm text-gray-600`}
//             // className={`mb-4 ${isOnCheckoutPage ? "text-xs" : "text-sm"} text-gray-600`}
//           >
//             In stock: {item.stock} items available
//           </p>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <span className="text-lg font-semibold text-[#009393]">
//                 ${item.price.toFixed(2)}
//               </span>
//               <span className="text-sm text-gray-500">each</span>
//             </div>

//             <div className="flex items-center gap-3">
//               <QuantityControl product={item} />

//               <button
//                 onClick={() => handleRemoveItem(item)}
//                 className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
//                 title="Remove item"
//               >
//                 <Trash2 className="h-4 w-4" />
//               </button>
//             </div>
//           </div>

//           <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
//             <div className="text-lg font-semibold text-gray-900">
//               Subtotal: ${(item.price * item.quantity).toFixed(2)}
//             </div>
//             <button
//               onClick={() => handleCheckoutItem(item)}
//               className="rounded-lg bg-[#009393] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#007a7a]"
//             >
//               Buy This Item
//             </button>
//           </div>
//         </div>
//       </div>
//     </li>
//   );
// }

// export default CartItem;

import { Trash2 } from "lucide-react";
import { showRemovalToast } from "../../helpers/toastHelpers";
import { useCartStore } from "../../store/cartStore";
import { CartItemType } from "../../types";
import QuantityControl from "./QuantityControl";
import { useLocation } from "react-router-dom";

interface CartItemProps {
  item: CartItemType;
  onCheckout?: (item: CartItemType) => void;
  className?: string;
  mode?: "cart" | "buy-now"; // Add mode prop
  onUpdateBuyNow?: (qty: number) => void; // For buy-now quantity updates
  onRemoveBuyNow?: () => void; // For buy-now removal
}

function CartItem({
  item,
  onCheckout,
  className = "",
  mode = "cart",
  onUpdateBuyNow,
  onRemoveBuyNow,
}: CartItemProps) {
  const location = useLocation();
  const isOnCheckoutPage = location.pathname.includes("checkout");

  const removeFromCart = useCartStore((state) => state.removeFromCart);

  // const handleRemoveItem = (item: CartItemType) => {
  //   if (mode === "buy-now" && onRemoveBuyNow) {
  //     onRemoveBuyNow();
  //   } else {
  //     removeFromCart(item.id);
  //   }
  //   showRemovalToast(item.title || "Unnamed Product", item.image);
  // };

  const handleRemoveItem = (item: CartItemType) => {
    if (mode !== "buy-now") {
      removeFromCart(item.id);

      showRemovalToast(item.title, item.image);
    }
  };

  const handleCheckoutItem = (item: CartItemType) => {
    if (onCheckout) {
      onCheckout(item);
    } else {
      console.log("Checkout item:", item);
    }
  };

  return (
    <li
      className={`group cursor-pointer rounded-lg border border-gray-200 bg-white hover:border-teal-200 hover:bg-teal-50 ${isOnCheckoutPage ? "px-4 py-4 sm:py-6" : "p-4 shadow-sm sm:p-6"} ${className}`}
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.title || "Product"}
            className="h-20 w-20 rounded-lg border border-gray-200 object-cover group-hover:border-teal-200 sm:h-24 sm:w-24"
            loading="lazy"
          />
        </div>

        {/* Product Details */}
        <div className="min-w-0 flex-1">
          <h3 className="mb-2 truncate text-base font-semibold text-gray-900 sm:text-lg">
            {item.title || "Unnamed Product"}
          </h3>
          <p className="mb-3 text-sm text-gray-600 sm:mb-4">
            {item.stock !== undefined
              ? `In stock: ${item.stock} items available`
              : "Stock information unavailable"}
          </p>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold text-[#009393] sm:text-lg">
                ${item.price?.toFixed(2) || "0.00"}
              </span>
              <span className="text-sm text-gray-500">each</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <QuantityControl
                product={item}
                mode={mode}
                onUpdateBuyNow={onUpdateBuyNow}
                onRemoveBuyNow={onRemoveBuyNow}
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
            // <div className="sm:jsutify-between mt-3 flex flex-col items-start gap-3 border-t border-gray-200 pt-3 sm:mt-4 sm:flex-row sm:items-center sm:pt-4">
            //   <div className="text-base font-semibold text-gray-900 sm:text-lg">
            //     Subtotal: $
            //     {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
            //   </div>
            //   <button
            //     onClick={() => handleCheckoutItem(item)}
            //     className="w-full rounded-lg bg-[#009393] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#007a7a] sm:w-auto"
            //     aria-label={`Buy ${item.title || "product"}`}
            //   >
            //     Buy This Item
            //   </button>
            // </div>

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
          )}
        </div>
      </div>
    </li>
  );
}

export default CartItem;
