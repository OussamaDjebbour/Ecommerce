// import { Minus, Plus } from "lucide-react";
// import { CartItem } from "../../types";
// import { useCallback } from "react";
// import {
//   showMaxStockToast,
//   showRemovalToast,
// } from "../../helpers/toastHelpers";
// import { useCartStore } from "../../store/cartStore";

// // interface QuantityControlProps {
// //   product: CartItem;
// // }

// type Mode = "cart" | "buy-now";

// interface QuantityControlProps {
//   product: CartItem;
//   mode: Mode;
//   onUpdateBuyNow?: (qty: number) => void;
//   onRemoveBuyNow?: () => void;
// }

// function QuantityControl({ product, mode }: QuantityControlProps) {
//   const updateQuantity = useCartStore((state) => state.updateQuantity);
//   const removeFromCart = useCartStore((state) => state.removeFromCart);

//   const handleIncrement = useCallback(
//     (
//       productId: number,
//       productQuantity: number,
//       stock: number,
//       title: string,
//     ) => {
//       if (productQuantity < stock) {
//         updateQuantity(productId, productQuantity + 1);
//       } else {
//         showMaxStockToast(title);
//       }
//     },
//     [updateQuantity],
//   );

//   const handleDecrement = useCallback(
//     (
//       productId: number,
//       productQuantity: number,
//       title: string,
//       image: string,
//     ) => {
//       if (productQuantity <= 1) {
//         removeFromCart(productId);
//         showRemovalToast(title, image);
//         return;
//       }
//       updateQuantity(productId, productQuantity - 1);
//     },

//     [updateQuantity, removeFromCart],
//   );

//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex items-center rounded-full border border-gray-200 bg-white">
//         <button
//           onClick={() =>
//             handleDecrement(
//               product.id,
//               product.quantity,
//               product.title,
//               product.image,
//             )
//           }
//           className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100"
//           aria-label="Decrease quantity"
//         >
//           <Minus className="h-3 w-3" />
//         </button>

//         <span className="w-8 text-center text-sm font-medium">
//           {product.quantity}
//         </span>
//         <button
//           onClick={() =>
//             handleIncrement(
//               product.id,
//               product.quantity,
//               product.stock,
//               product.title,
//             )
//           }
//           className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
//             product.quantity >= product.stock
//               ? "cursor-not-allowed border-gray-200 text-gray-400"
//               : "border-gray-300 hover:bg-gray-100"
//           }`}
//           aria-label="Increase quantity"
//         >
//           <Plus className="h-3 w-3" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default QuantityControl;

import { CartItemType, Mode } from "../../types";
import { useCallback } from "react";
import {
  showAlertToast,
  showMaxStockToast,
  showRemovalToast,
} from "../../helpers/toastHelpers";
import { useCartStore } from "../../store/cartStore";

interface QuantityControlProps {
  product: CartItemType;
  mode: Mode;
  onUpdateBuyNow?: (qty: number) => void;
  onRemoveBuyNow?: () => void;
}

function QuantityControl({
  product,
  mode,
  onUpdateBuyNow,
  onRemoveBuyNow,
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
        }
        // else if (mode === "main-product" && onUpdateBuyNow) {
        //   onUpdateBuyNow(productQuantity + 1);
        // }
        else {
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
        if (mode === "buy-now" && onRemoveBuyNow) {
          //   onRemoveBuyNow();
          //   showRemovalToast(title, image);
          showAlertToast("You Cannot delete Main Product");
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
    [updateQuantity, removeFromCart, onUpdateBuyNow, onRemoveBuyNow, mode],
  );

  //   const handleDecrement = useCallback(
  //     (
  //       productId: number,
  //       productQuantity: number,
  //       title: string,
  //       image: string,
  //     ) => {
  //       if (productQuantity <= 1) {
  //         if ((mode === "buy-now" || mode === "main-product") && onRemoveBuyNow) {
  //           onRemoveBuyNow();
  //           showRemovalToast(title, image);
  //         } else {
  //           removeFromCart(productId);
  //           showRemovalToast(title, image);
  //         }
  //         return;
  //       }
  //       if ((mode === "buy-now" || mode === "main-product") && onUpdateBuyNow) {
  //         onUpdateBuyNow(productQuantity - 1);
  //       } else {
  //         updateQuantity(productId, productQuantity - 1);
  //       }
  //     },
  //     [updateQuantity, removeFromCart, onUpdateBuyNow, onRemoveBuyNow, mode],
  //   );

  return (
    <div className="mr-6 flex h-8 w-[5.5rem] items-center justify-around rounded-3xl bg-[#F2F2F2] text-base font-normal text-black">
      <button
        className={`h-6 w-6 rounded-full bg-white ${isMin ? "cursor-not-allowed opacity-50" : ""}`}
        onClick={() =>
          handleDecrement(
            product.id,
            product.quantity,
            product.title,
            product.image,
          )
        }
        // disabled={isMin}
      >
        -
      </button>
      <span>{product.quantity}</span>
      <button
        className={`h-6 w-6 rounded-full bg-white ${isMax ? "cursor-not-allowed opacity-50" : ""}`}
        onClick={() =>
          handleIncrement(
            product.id,
            product.quantity,
            product.stock,
            product.title,
          )
        }
        // onClick={increment}
        // disabled={isMax}
      >
        +
      </button>
    </div>
    // <div className="flex items-center justify-between">
    //   <div className="flex items-center rounded-full border border-gray-200 bg-white">
    //     <button
    //       onClick={() =>
    //         handleDecrement(
    //           product.id,
    //           product.quantity,
    //           product.title,
    //           product.image,
    //         )
    //       }
    //       className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100"
    //       aria-label="Decrease quantity"
    //     >
    //       <Minus className="h-3 w-3" />
    //     </button>
    //     <span className="w-8 text-center text-sm font-medium">
    //       {product.quantity}
    //     </span>
    //     <button
    //       onClick={() =>
    //         handleIncrement(
    //           product.id,
    //           product.quantity,
    //           product.stock,
    //           product.title,
    //         )
    //       }
    //       className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
    //         product.quantity >= product.stock
    //           ? "cursor-not-allowed border-gray-200 text-gray-400"
    //           : "border-gray-300 hover:bg-gray-100"
    //       }`}
    //       aria-label="Increase quantity"
    //     >
    //       <Plus className="h-3 w-3" />
    //     </button>
    //   </div>
    // </div>
  );
}

export default QuantityControl;
