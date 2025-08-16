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

// import { CartItemType, Mode, QuantityControlProduct } from "../../types";
// import { useCallback } from "react";
// import {
//   showAlertToast,
//   showMaxStockToast,
//   showRemovalToast,
// } from "../../helpers/toastHelpers";
// import { useCartStore } from "../../store/cartStore";

// interface QuantityControlProps {
//   product: QuantityControlProduct;
//   mode: Mode;
//   onUpdateBuyNow?: (qty: number) => void;
//   onRemoveBuyNow?: () => void;
// }

// function QuantityControl({
//   product,
//   mode,
//   onUpdateBuyNow,
//   onRemoveBuyNow,
// }: QuantityControlProps) {
//   const { updateQuantity, removeFromCart } = useCartStore();

//   const isMin =
//     mode === "buy-now" ? product.quantity <= 1 : product.quantity === 0;

//   const isMax = product.quantity >= product.stock;
//   const handleIncrement = useCallback(
//     (
//       productId: number,
//       productQuantity: number,
//       stock: number,
//       title: string,
//     ) => {
//       if (productQuantity < stock) {
//         if (mode === "buy-now" && onUpdateBuyNow) {
//           onUpdateBuyNow(productQuantity + 1);
//         } else {
//           updateQuantity(productId, productQuantity + 1);
//         }
//       } else {
//         showMaxStockToast(title);
//         // showAlertToast(`Sorry, only ${stock} of this item left in stock`);
//       }
//     },
//     [updateQuantity, onUpdateBuyNow, mode],
//   );

//   const handleDecrement = useCallback(
//     (
//       productId: number,
//       productQuantity: number,
//       title: string,
//       image: string,
//     ) => {
//       if (productQuantity <= 1) {
//         if (mode === "buy-now") {
//           showAlertToast("You Cannot delete this Product");
//         } else {
//           removeFromCart(productId);
//           showRemovalToast(title, image);
//         }
//         return;
//       }
//       if (mode === "buy-now" && onUpdateBuyNow) {
//         onUpdateBuyNow(productQuantity - 1);
//       } else {
//         updateQuantity(productId, productQuantity - 1);
//       }
//     },
//     [updateQuantity, removeFromCart, onUpdateBuyNow, mode],
//   );

//   // const handleIncrement = useCallback(
//   //   (
//   //     productId: number,
//   //     productQuantity: number,
//   //     stock: number,
//   //     title: string,
//   //   ) => {
//   //     if (productQuantity < stock) {
//   //       if (mode === "buy-now" && onUpdateBuyNow) {
//   //         console.log("hiiii");
//   //         onUpdateBuyNow(productQuantity + 1);
//   //       }
//   //       // else if (mode === "main-product" && onUpdateBuyNow) {
//   //       //   onUpdateBuyNow(productQuantity + 1);
//   //       // }
//   //       else {
//   //         updateQuantity(productId, productQuantity + 1);
//   //       }
//   //     } else {
//   //       showMaxStockToast(title);
//   //     }
//   //   },
//   //   [updateQuantity, onUpdateBuyNow, mode],
//   // );

//   // const handleDecrement = useCallback(
//   //   (
//   //     productId: number,
//   //     productQuantity: number,
//   //     title: string,
//   //     image: string,
//   //   ) => {
//   //     if (productQuantity <= 1) {
//   //       // if (mode === "buy-now" && onRemoveBuyNow) {
//   //       if (mode === "buy-now") {
//   //         //   onRemoveBuyNow();
//   //         //   showRemovalToast(title, image);
//   //         showAlertToast("You Cannot delete Main Product");
//   //       } else {
//   //         removeFromCart(productId);
//   //         showRemovalToast(title, image);
//   //       }
//   //       return;
//   //     }
//   //     if (mode === "buy-now" && onUpdateBuyNow) {
//   //       onUpdateBuyNow(productQuantity - 1);
//   //     } else {
//   //       updateQuantity(productId, productQuantity - 1);
//   //     }
//   //   },
//   //   [updateQuantity, removeFromCart, onUpdateBuyNow, mode],
//   // );

//   //   const handleDecrement = useCallback(
//   //     (
//   //       productId: number,
//   //       productQuantity: number,
//   //       title: string,
//   //       image: string,
//   //     ) => {
//   //       if (productQuantity <= 1) {
//   //         if ((mode === "buy-now" || mode === "main-product") && onRemoveBuyNow) {
//   //           onRemoveBuyNow();
//   //           showRemovalToast(title, image);
//   //         } else {
//   //           removeFromCart(productId);
//   //           showRemovalToast(title, image);
//   //         }
//   //         return;
//   //       }
//   //       if ((mode === "buy-now" || mode === "main-product") && onUpdateBuyNow) {
//   //         onUpdateBuyNow(productQuantity - 1);
//   //       } else {
//   //         updateQuantity(productId, productQuantity - 1);
//   //       }
//   //     },
//   //     [updateQuantity, removeFromCart, onUpdateBuyNow, onRemoveBuyNow, mode],
//   //   );

//   return (
//     <div className="mr-6 flex h-8 w-[5.5rem] items-center justify-around rounded-3xl bg-[#F2F2F2] text-base font-normal text-black">
//       <button
//         className={`h-6 w-6 rounded-full bg-white hover:bg-gray-200 ${isMin ? "cursor-not-allowed opacity-50" : ""}`}
//         onClick={(e) => {
//           e.stopPropagation();
//           handleDecrement(
//             product.id,
//             product.quantity,
//             product.title,
//             product.image,
//           );
//         }}
//         // disabled={isMin}
//       >
//         -
//       </button>
//       <span>{product.quantity}</span>
//       <button
//         className={`h-6 w-6 rounded-full bg-white ${isMax ? "cursor-not-allowed opacity-50" : ""}`}
//         onClick={() =>
//           handleIncrement(
//             product.id,
//             product.quantity,
//             product.stock,
//             product.title,
//           )
//         }
//         // onClick={increment}
//         // disabled={isMax}
//       >
//         +
//       </button>
//     </div>
//     // <div className="flex items-center justify-between">
//     //   <div className="flex items-center rounded-full border border-gray-200 bg-white">
//     //     <button
//     //       onClick={() =>
//     //         handleDecrement(
//     //           product.id,
//     //           product.quantity,
//     //           product.title,
//     //           product.image,
//     //         )
//     //       }
//     //       className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100"
//     //       aria-label="Decrease quantity"
//     //     >
//     //       <Minus className="h-3 w-3" />
//     //     </button>
//     //     <span className="w-8 text-center text-sm font-medium">
//     //       {product.quantity}
//     //     </span>
//     //     <button
//     //       onClick={() =>
//     //         handleIncrement(
//     //           product.id,
//     //           product.quantity,
//     //           product.stock,
//     //           product.title,
//     //         )
//     //       }
//     //       className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
//     //         product.quantity >= product.stock
//     //           ? "cursor-not-allowed border-gray-200 text-gray-400"
//     //           : "border-gray-300 hover:bg-gray-100"
//     //       }`}
//     //       aria-label="Increase quantity"
//     //     >
//     //       <Plus className="h-3 w-3" />
//     //     </button>
//     //   </div>
//     // </div>
//   );
// }

// export default QuantityControl;

// import { CartItemType, Mode, QuantityControlProduct } from "../../types";
// import { useCallback } from "react";
// import { Minus, Plus } from "lucide-react";
// import {
//   showAlertToast,
//   showMaxStockToast,
//   showRemovalToast,
// } from "../../helpers/toastHelpers";
// import { useCartStore } from "../../store/cartStore";

// interface QuantityControlProps {
//   product: QuantityControlProduct;
//   mode: Mode;
//   onUpdateBuyNow?: (qty: number) => void;
//   onRemoveBuyNow?: () => void;
// }

// function QuantityControl({
//   product,
//   mode,
//   onUpdateBuyNow,
//   onRemoveBuyNow,
// }: QuantityControlProps) {
//   const { updateQuantity, removeFromCart } = useCartStore();

//   const isMin =
//     mode === "buy-now" ? product.quantity <= 1 : product.quantity === 0;

//   const isMax = product.quantity >= product.stock;

//   const handleIncrement = useCallback(
//     (
//       productId: number,
//       productQuantity: number,
//       stock: number,
//       title: string,
//     ) => {
//       if (productQuantity < stock) {
//         if (mode === "buy-now" && onUpdateBuyNow) {
//           onUpdateBuyNow(productQuantity + 1);
//         } else {
//           updateQuantity(productId, productQuantity + 1);
//         }
//       } else {
//         showMaxStockToast(title);
//       }
//     },
//     [updateQuantity, onUpdateBuyNow, mode],
//   );

//   const handleDecrement = useCallback(
//     (
//       productId: number,
//       productQuantity: number,
//       title: string,
//       image: string,
//     ) => {
//       if (productQuantity <= 1) {
//         if (mode === "buy-now") {
//           showAlertToast("You Cannot delete this Product");
//         } else {
//           removeFromCart(productId);
//           showRemovalToast(title, image);
//         }
//         return;
//       }
//       if (mode === "buy-now" && onUpdateBuyNow) {
//         onUpdateBuyNow(productQuantity - 1);
//       } else {
//         updateQuantity(productId, productQuantity - 1);
//       }
//     },
//     [updateQuantity, removeFromCart, onUpdateBuyNow, mode],
//   );

//   return (
//     <div className="group flex items-center rounded-lg border border-gray-200 bg-white px-1 py-1 shadow-sm transition-all duration-200 hover:border-[#009393] hover:shadow-md">
//       <button
//         className={`group flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-all duration-200 ${
//           isMin
//             ? "cursor-not-allowed opacity-40"
//             : "hover:scale-105 hover:border-[#009393] hover:bg-[#009393] hover:text-white hover:shadow-sm active:scale-95"
//         }`}
//         onClick={(e) => {
//           e.stopPropagation();
//           if (!isMin) {
//             handleDecrement(
//               product.id,
//               product.quantity,
//               product.title,
//               product.image,
//             );
//           }
//         }}
//         disabled={isMin}
//         aria-label="Decrease quantity"
//       >
//         <Minus className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
//       </button>

//       <span className="mx-3 min-w-[2rem] text-center text-base font-semibold text-gray-900">
//         {product.quantity}
//       </span>

//       <button
//         className={`group flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-all duration-200 ${
//           isMax
//             ? "cursor-not-allowed opacity-40"
//             : "hover:scale-105 hover:border-[#009393] hover:bg-[#009393] hover:text-white hover:shadow-sm active:scale-95"
//         }`}
//         onClick={() => {
//           if (!isMax) {
//             handleIncrement(
//               product.id,
//               product.quantity,
//               product.stock,
//               product.title,
//             );
//           }
//         }}
//         disabled={isMax}
//         aria-label="Increase quantity"
//       >
//         <Plus className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
//       </button>
//     </div>
//   );
// }

// export default QuantityControl;

import { CartItemType, Mode, QuantityControlProduct } from "../../types";
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

// function QuantityControl({
//   product,
//   mode,
//   onUpdateBuyNow,
//   onRemoveBuyNow,
// }: QuantityControlProps) {
//   const { updateQuantity, removeFromCart } = useCartStore();

//   const isMin =
//     mode === "buy-now" ? product.quantity <= 1 : product.quantity === 0;

//   const isMax = product.quantity >= product.stock;

//   const handleIncrement = useCallback(
//     (
//       productId: number,
//       productQuantity: number,
//       stock: number,
//       title: string,
//     ) => {
//       if (productQuantity < stock) {
//         if (mode === "buy-now" && onUpdateBuyNow) {
//           console.log("hiiii");
//           onUpdateBuyNow(productQuantity + 1);
//         }
//         // else if (mode === "main-product" && onUpdateBuyNow) {
//         //   onUpdateBuyNow(productQuantity + 1);
//         // }
//         else {
//           updateQuantity(productId, productQuantity + 1);
//         }
//       } else {
//         showMaxStockToast(title);
//       }
//     },
//     [updateQuantity, onUpdateBuyNow, mode],
//   );

//   const handleDecrement = useCallback(
//     (
//       productId: number,
//       productQuantity: number,
//       title: string,
//       image: string,
//     ) => {
//       if (productQuantity <= 1) {
//         // if (mode === "buy-now" && onRemoveBuyNow) {
//         if (mode === "buy-now") {
//           //   onRemoveBuyNow();
//           //   showRemovalToast(title, image);
//           showAlertToast("You Cannot delete Main Product");
//         } else {
//           removeFromCart(productId);
//           showRemovalToast(title, image);
//         }
//         return;
//       }
//       if (mode === "buy-now" && onUpdateBuyNow) {
//         onUpdateBuyNow(productQuantity - 1);
//       } else {
//         updateQuantity(productId, productQuantity - 1);
//       }
//     },
//     [updateQuantity, removeFromCart, onUpdateBuyNow, mode],
//   );

//   //   const handleDecrement = useCallback(
//   //     (
//   //       productId: number,
//   //       productQuantity: number,
//   //       title: string,
//   //       image: string,
//   //     ) => {
//   //       if (productQuantity <= 1) {
//   //         if ((mode === "buy-now" || mode === "main-product") && onRemoveBuyNow) {
//   //           onRemoveBuyNow();
//   //           showRemovalToast(title, image);
//   //         } else {
//   //           removeFromCart(productId);
//   //           showRemovalToast(title, image);
//   //         }
//   //         return;
//   //       }
//   //       if ((mode === "buy-now" || mode === "main-product") && onUpdateBuyNow) {
//   //         onUpdateBuyNow(productQuantity - 1);
//   //       } else {
//   //         updateQuantity(productId, productQuantity - 1);
//   //       }
//   //     },
//   //     [updateQuantity, removeFromCart, onUpdateBuyNow, onRemoveBuyNow, mode],
//   //   );

//   return (
//     <div className="mr-6 flex h-8 w-[5.5rem] items-center justify-around rounded-3xl bg-[#F2F2F2] text-base font-normal text-black">
//       <button
//         className={`h-6 w-6 rounded-full bg-white hover:bg-gray-200 ${isMin ? "cursor-not-allowed opacity-50" : ""}`}
//         onClick={(e) => {
//           e.stopPropagation();
//           handleDecrement(
//             product.id,
//             product.quantity,
//             product.title,
//             product.image,
//           );
//         }}
//         // disabled={isMin}
//       >
//         -
//       </button>
//       <span>{product.quantity}</span>
//       <button
//         className={`h-6 w-6 rounded-full bg-white ${isMax ? "cursor-not-allowed opacity-50" : ""}`}
//         onClick={() =>
//           handleIncrement(
//             product.id,
//             product.quantity,
//             product.stock,
//             product.title,
//           )
//         }
//         // onClick={increment}
//         // disabled={isMax}
//       >
//         +
//       </button>
//     </div>
//     // <div className="flex items-center justify-between">
//     //   <div className="flex items-center rounded-full border border-gray-200 bg-white">
//     //     <button
//     //       onClick={() =>
//     //         handleDecrement(
//     //           product.id,
//     //           product.quantity,
//     //           product.title,
//     //           product.image,
//     //         )
//     //       }
//     //       className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100"
//     //       aria-label="Decrease quantity"
//     //     >
//     //       <Minus className="h-3 w-3" />
//     //     </button>
//     //     <span className="w-8 text-center text-sm font-medium">
//     //       {product.quantity}
//     //     </span>
//     //     <button
//     //       onClick={() =>
//     //         handleIncrement(
//     //           product.id,
//     //           product.quantity,
//     //           product.stock,
//     //           product.title,
//     //         )
//     //       }
//     //       className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
//     //         product.quantity >= product.stock
//     //           ? "cursor-not-allowed border-gray-200 text-gray-400"
//     //           : "border-gray-300 hover:bg-gray-100"
//     //       }`}
//     //       aria-label="Increase quantity"
//     //     >
//     //       <Plus className="h-3 w-3" />
//     //     </button>
//     //   </div>
//     // </div>
//   );
// }

// export default QuantityControl;
