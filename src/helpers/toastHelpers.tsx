// import CustomToast from "../components/ui/CustomToast";
// import { toast } from "react-toastify";

// interface ShowToastOptions {
//   success: boolean;
//   message: string;
//   productTitle: string;
//   productImage?: string;
//   quantity?: number;
// }

// export const showCustomToast = ({
//   success,
//   message,
//   productTitle,
//   productImage,
//   quantity,
// }: ShowToastOptions) => {
//   const customToastContent = (
//     <CustomToast
//       // success={success}
//       type="success"
//       message={message}
//       productImage={success ? productImage : undefined}
//       productTitle={productTitle}
//       quantity={success ? quantity : undefined}
//     />
//   );

//   const toastOptions = {
//     className: `bg-white shadow-lg border ${
//       success ? "border-green-200" : "border-red-200"
//     }`,
//   };

//   if (success) {
//     toast.success(customToastContent, toastOptions);
//   } else {
//     toast.error(customToastContent, toastOptions);
//   }
// };

// // Specific toast helpers for common use cases
// export const showAddToCartToast = (
//   success: boolean,
//   message: string,
//   productTitle: string,
//   productImage?: string,
//   quantity?: number,
// ) => {
//   showCustomToast({
//     success,
//     message,
//     productTitle,
//     productImage: success ? productImage : undefined,
//     quantity: success ? quantity : undefined,
//   });
// };

// export const showRemovalToast = (
//   productTitle: string,
//   productImage: string,
// ) => {
//   showCustomToast({
//     success: true,
//     message: `${productTitle} removed from cart`,
//     productTitle,
//     productImage,
//   });
// };

// export const showMaxStockToast = (productTitle: string) => {
//   showCustomToast({
//     success: false,
//     message: "Max stock reached for this product",
//     productTitle,
//   });
// };

// const trial = () => {
//   return <></>;
// };

// import { toast } from "react-toastify";
// import CustomToast from "../components/ui/CustomToast";

// interface ShowToastOptions {
//   type: "success" | "error" | "removal" | "warning";
//   message: string;
//   productTitle: string;
//   productImage?: string;
//   quantity?: number;
// }

// export const showCustomToast = ({
//   type,
//   message,
//   productTitle,
//   productImage,
//   quantity,
// }: ShowToastOptions) => {
//   const customToastContent = (
//     <CustomToast
//       type={type}
//       message={message}
//       productImage={productImage}
//       productTitle={productTitle}
//       quantity={quantity}
//     />
//   );

//   const getToastOptions = () => {
//     switch (type) {
//       case "success":
//         return {
//           className: "bg-transparent shadow-lg",
//           style: { background: "transparent", boxShadow: "none" },
//         };
//       case "removal":
//         return {
//           className: "bg-transparent shadow-lg",
//           style: { background: "transparent", boxShadow: "none" },
//         };
//       case "warning":
//         return {
//           className: "bg-transparent shadow-lg",
//           style: { background: "transparent", boxShadow: "none" },
//         };
//       case "error":
//       default:
//         return {
//           className: "bg-transparent shadow-lg",
//           style: { background: "transparent", boxShadow: "none" },
//         };
//     }
//   };

//   const toastOptions = getToastOptions();

//   // Use the appropriate toast method based on type
//   if (type === "success") {
//     toast.success(customToastContent, toastOptions);
//   } else if (type === "removal") {
//     toast.info(customToastContent, toastOptions);
//   } else if (type === "warning") {
//     toast.warn(customToastContent, toastOptions);
//   } else {
//     toast.error(customToastContent, toastOptions);
//   }
// };

// // Specific toast helpers for common use cases
// export const showAddToCartToast = (
//   success: boolean,
//   message: string,
//   productTitle: string,
//   productImage?: string,
//   quantity?: number,
// ) => {
//   showCustomToast({
//     type: success ? "success" : "error",
//     message,
//     productTitle,
//     productImage: success ? productImage : undefined,
//     quantity: success ? quantity : undefined,
//   });
// };

// export const showRemovalToast = (
//   productTitle: string,
//   productImage: string,
// ) => {
//   showCustomToast({
//     type: "removal",
//     message: `${productTitle} has been removed from your cart`,
//     productTitle,
//     productImage,
//   });
// };

// export const showMaxStockToast = (productTitle: string) => {
//   showCustomToast({
//     type: "warning",
//     message: "Maximum available quantity reached",
//     productTitle,
//   });
// };

// import { toast } from "react-toastify";
// import CustomToast from "../components/ui/CustomToast";

// interface ShowToastOptions {
//   type: "success" | "error" | "removal" | "warning";
//   message: string;
//   productTitle: string;
//   productImage?: string;
//   quantity?: number;
// }

// export const showCustomToast = ({
//   type,
//   message,
//   productTitle,
//   productImage,
//   quantity,
// }: ShowToastOptions) => {
//   const customToastContent = (
//     <CustomToast
//       type={type}
//       message={message}
//       productImage={productImage}
//       productTitle={productTitle}
//       quantity={quantity}
//     />
//   );

//   // const toastOptions = {
//   //   className: "bg-transparent shadow-none border-none p-0",
//   //   bodyClassName: "p-0",
//   //   hideProgressBar: true,
//   //   closeButton: false,
//   //   autoClose: 3000,
//   // };

//   const toastOptions = {
//     className: "bg-transparent shadow-none border-none p-0",
//     bodyClassName: "p-0",
//     hideProgressBar: true,
//     closeButton: false,
//     autoClose: 3000,
//     // icon: false, // <- This is crucial to fix spacing
//   };

//   // Use the appropriate toast method based on type
//   if (type === "success") {
//     toast.success(customToastContent, toastOptions);
//   } else if (type === "removal") {
//     toast.info(customToastContent, toastOptions);
//   } else if (type === "warning") {
//     toast.warn(customToastContent, toastOptions);
//   } else {
//     toast.error(customToastContent, toastOptions);
//   }
// };

// // Specific toast helpers for common use cases
// export const showAddToCartToast = (
//   success: boolean,
//   message: string,
//   productTitle: string,
//   productImage?: string,
//   quantity?: number,
// ) => {
//   showCustomToast({
//     type: success ? "success" : "error",
//     message,
//     productTitle,
//     productImage: success ? productImage : undefined,
//     quantity: success ? quantity : undefined,
//   });
// };

// export const showRemovalToast = (
//   productTitle: string,
//   productImage: string,
// ) => {
//   showCustomToast({
//     type: "removal",
//     message: `${productTitle} has been removed from your cart`,
//     productTitle,
//     productImage,
//   });
// };

// export const showMaxStockToast = (productTitle: string) => {
//   showCustomToast({
//     type: "warning",
//     message: "Maximum available quantity reached",
//     productTitle,
//   });
// };

// export const showWarningToast = (message: string) => {
//   showCustomToast({
//     type: "warning",
//     message,
//     productTitle: "",
//   });
// };

// import { toast } from "react-toastify";
// import CustomToast from "../components/ui/CustomToast";

// interface ShowToastOptions {
//   type: "success" | "error" | "removal" | "warning";
//   message: string;
//   productTitle: string;
//   productImage?: string;
//   quantity?: number;
// }

// export const showCustomToast = ({
//   type,
//   message,
//   productTitle,
//   productImage,
//   quantity,
// }: ShowToastOptions) => {
//   const customToastContent = (
//     <CustomToast
//       type={type}
//       message={message}
//       productImage={productImage}
//       productTitle={productTitle}
//       quantity={quantity}
//     />
//   );

//   const toastOptions = {
//     className: "bg-transparent p-0 shadow-none border-none",
//     bodyClassName: "p-0 m-0",
//     hideProgressBar: true,
//     closeButton: false,
//     autoClose: 3000,
//     icon: false, // Critical: Prevents extra spacing for default icon
//   };

//   // Show toast using appropriate method
//   switch (type) {
//     case "success":
//       toast.success(customToastContent, toastOptions);
//       break;
//     case "removal":
//       toast.info(customToastContent, toastOptions);
//       break;
//     case "warning":
//       toast.warn(customToastContent, toastOptions);
//       break;
//     case "error":
//     default:
//       toast.error(customToastContent, toastOptions);
//       break;
//   }
// };

// // ✅ Usage Helpers
// export const showAddToCartToast = (
//   success: boolean,
//   message: string,
//   productTitle: string,
//   productImage?: string,
//   quantity?: number,
// ) => {
//   showCustomToast({
//     type: success ? "success" : "error",
//     message,
//     productTitle,
//     productImage: success ? productImage : undefined,
//     quantity: success ? quantity : undefined,
//   });
// };

// export const showRemovalToast = (
//   productTitle: string,
//   productImage: string,
// ) => {
//   showCustomToast({
//     type: "removal",
//     message: `${productTitle} has been removed from your cart.`,
//     productTitle,
//     productImage,
//   });
// };

// export const showMaxStockToast = (productTitle: string) => {
//   showCustomToast({
//     type: "warning",
//     message: "Maximum available quantity reached.",
//     productTitle,
//   });
// };

// export const showWarningToast = (message: string) => {
//   showCustomToast({
//     type: "warning",
//     message,
//     productTitle: "",
//   });
// };

// import { toast } from "react-toastify";
// import CustomToast from "../components/ui/CustomToast";

// interface ShowToastOptions {
//   type: "success" | "error" | "removal" | "warning";
//   message: string;
//   productTitle: string;
//   productImage?: string;
//   quantity?: number;
// }

// export const showCustomToast = ({
//   type,
//   message,
//   productTitle,
//   productImage,
//   quantity,
// }: ShowToastOptions) => {
//   const toastId = toast(
//     ({ toastProps }) => (
//       <CustomToast
//         type={type}
//         message={message}
//         productImage={productImage}
//         productTitle={productTitle}
//         quantity={quantity}
//         toastId={toastProps.toastId}
//       />
//     ),
//     {
//       className: "bg-transparent p-0 shadow-none border-none",
//       bodyClassName: "p-0 m-0",
//       hideProgressBar: true,
//       closeButton: false,
//       autoClose: 3000,
//       icon: false,
//     },
//   );
// };

// // ✅ Usage Helpers
// export const showAddToCartToast = (
//   success: boolean,
//   message: string,
//   productTitle: string,
//   productImage?: string,
//   quantity?: number,
// ) => {
//   showCustomToast({
//     type: success ? "success" : "error",
//     message,
//     productTitle,
//     productImage: success ? productImage : undefined,
//     quantity: success ? quantity : undefined,
//   });
// };

// export const showRemovalToast = (
//   productTitle: string,
//   productImage: string,
// ) => {
//   showCustomToast({
//     type: "removal",
//     message: `${productTitle} has been removed from your cart.`,
//     productTitle,
//     productImage,
//   });
// };

// export const showMaxStockToast = (productTitle: string) => {
//   showCustomToast({
//     type: "warning",
//     message: "Maximum available quantity reached.",
//     productTitle,
//   });
// };

// import { toast } from "react-toastify";
// import CustomToast from "../components/ui/CustomToast";

// interface ShowToastOptions {
//   type: "success" | "error" | "removal" | "warning";
//   message: string;
//   productTitle: string;
//   productImage?: string;
//   quantity?: number;
// }

// export const showCustomToast = ({
//   type,
//   message,
//   productTitle,
//   productImage,
//   quantity,
// }: ShowToastOptions) => {
//   toast(
//     ({ toastProps }) => (
//       <CustomToast
//         type={type}
//         message={message}
//         productTitle={productTitle}
//         productImage={productImage}
//         quantity={quantity}
//         toastId={toastProps.toastId}
//       />
//     ),
//     {
//       className: "bg-transparent p-0 shadow-none border-none",
//       bodyClassName: "p-0 m-0",
//       hideProgressBar: true,
//       closeButton: false,
//       autoClose: 3000,
//       icon: false,
//     },
//   );
// };

// // Helper to show a success/error toast for adding to cart
// export const showAddToCartToast = (
//   success: boolean,
//   message: string,
//   productTitle: string,
//   productImage?: string,
//   quantity?: number,
// ) => {
//   showCustomToast({
//     type: success ? "success" : "error",
//     message,
//     productTitle,
//     productImage: success ? productImage : undefined,
//     quantity: success ? quantity : undefined,
//   });
// };

// // Helper for removal
// export const showRemovalToast = (
//   productTitle: string,
//   productImage: string,
// ) => {
//   showCustomToast({
//     type: "removal",
//     message: `${productTitle} has been removed from your cart.`,
//     productTitle,
//     productImage,
//   });
// };

// // Warn about stock limits
// export const showMaxStockToast = (productTitle: string) => {
//   showCustomToast({
//     type: "warning",
//     message: "Max stock reached for this product.",
//     productTitle,
//   });
// };

// // Generic warning toast
// export const showWarningToast = (message: string) => {
//   showCustomToast({
//     type: "warning",
//     message,
//     productTitle: "",
//   });
// };

// import { toast } from "react-toastify";
// import CustomToast from "../components/ui/CustomToast";

// interface ShowToastOptions {
//   type: "success" | "error" | "removal" | "warning";
//   message: string;
//   productTitle: string;
//   productImage?: string;
//   quantity?: number;
// }

// export const showCustomToast = ({
//   type,
//   message,
//   productTitle,
//   productImage,
//   quantity,
// }: ShowToastOptions) => {
//   const customToastContent = (
//     <CustomToast
//       type={type}
//       message={message}
//       productImage={productImage}
//       productTitle={productTitle}
//       quantity={quantity}
//     />
//   );

//   const toastOptions = {
//     className: "bg-transparent p-0 shadow-none border-none",
//     bodyClassName: "p-0 m-0",
//     hideProgressBar: true,
//     // closeButton: false,
//     autoClose: 3000,
//     icon: false, // Critical: Prevents extra spacing for default icon
//   };

//   // Show toast using appropriate method
//   switch (type) {
//     case "success":
//       toast.success(customToastContent, toastOptions);
//       break;
//     case "removal":
//       toast.info(customToastContent, toastOptions);
//       break;
//     case "warning":
//       toast.warn(customToastContent, toastOptions);
//       break;
//     case "error":
//     default:
//       toast.error(customToastContent, toastOptions);
//       break;
//   }
// };

// // ✅ Usage Helpers
// export const showAddToCartToast = (
//   success: boolean,
//   message: string,
//   productTitle: string,
//   productImage?: string,
//   quantity?: number,
// ) => {
//   showCustomToast({
//     type: success ? "success" : "error",
//     message,
//     productTitle,
//     productImage: success ? productImage : undefined,
//     quantity: success ? quantity : undefined,
//   });
// };

// export const showRemovalToast = (
//   productTitle: string,
//   productImage: string,
// ) => {
//   showCustomToast({
//     type: "removal",
//     message: `${productTitle} has been removed from your cart.`,
//     productTitle,
//     productImage,
//   });
// };

// export const showMaxStockToast = (productTitle: string) => {
//   showCustomToast({
//     type: "warning",
//     message: "Maximum available quantity reached.",
//     productTitle,
//   });
// };

// export const showWarningToast = (message: string) => {
//   showCustomToast({
//     type: "warning",
//     message,
//     productTitle: "",
//   });
// };

import { toast } from "react-toastify";
import CustomToast from "../components/ui/CustomToast";

interface ShowToastOptions {
  type: "success" | "error" | "removal" | "warning";
  message: string;
  productTitle: string;
  productImage?: string;
  quantity?: number;
}

export const showCustomToast = ({
  type,
  message,
  productTitle,
  productImage,
  quantity,
}: ShowToastOptions) => {
  const customToastContent = (
    <CustomToast
      type={type}
      message={message}
      productImage={productImage}
      productTitle={productTitle}
      quantity={quantity}
    />
  );

  toast(customToastContent, {
    className: "bg-transparent shadow-none border-none p-0 m-0",
    hideProgressBar: true,
    closeButton: false,
    autoClose: 3000,
    position: "top-right",
    style: {
      background: "transparent",
      boxShadow: "none",
      padding: 0,
      margin: 0,
    },
  });
};

// Specific toast helpers for common use cases
export const showAddToCartToast = (
  success: boolean,
  message: string,
  productTitle: string,
  productImage?: string,
  quantity?: number,
) => {
  showCustomToast({
    type: success ? "success" : "error",
    message,
    productTitle,
    productImage: success ? productImage : undefined,
    quantity: success ? quantity : undefined,
  });
};

export const showRemovalToast = (
  productTitle: string,
  productImage: string,
) => {
  showCustomToast({
    type: "removal",
    message: `${productTitle} has been removed from your cart`,
    productTitle,
    productImage,
  });
};

export const showRemovalCartToast = () => {
  showCustomToast({
    type: "removal",
    message: "All items have been removed from your cart",
    productTitle: "",
  });
};

export const showMaxStockToast = (productTitle: string) => {
  showCustomToast({
    type: "warning",
    message: "Maximum available quantity reached",
    productTitle,
  });
};

export const showWarningToast = (message: string) => {
  showCustomToast({
    type: "warning",
    message,
    productTitle: "",
  });
};
