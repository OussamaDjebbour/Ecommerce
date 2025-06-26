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
//       success={success}
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

//   const toastOptions = {
//     className: "bg-transparent shadow-none border-none p-0",
//     bodyClassName: "p-0",
//     hideProgressBar: true,
//     closeButton: false,
//     autoClose: 3000,
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
