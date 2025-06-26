// import React from "react";
// import { Check, X } from "lucide-react";

// interface CustomToastProps {
//   success: boolean;
//   message: string;
//   productImage: string;
//   productTitle: string;
//   quantity: number;
// }

// export const CustomToast: React.FC<CustomToastProps> = ({
//   success,
//   message,
//   productImage,
//   productTitle,
//   quantity,
// }) => {
//   return (
//     <div className="flex max-w-sm items-center gap-3 p-2">
//       {/* Product Image */}
//       <div className="flex-shrink-0">
//         <img
//           src={productImage}
//           alt={productTitle}
//           className="h-12 w-12 rounded-lg border border-gray-200 object-cover"
//         />
//       </div>

//       {/* Content */}
//       <div className="min-w-0 flex-1">
//         <div className="flex items-start gap-2">
//           {/* Success/Error Icon */}
//           <div
//             className={`mt-0.5 flex-shrink-0 ${success ? "text-green-500" : "text-red-500"}`}
//           >
//             {success ? (
//               <Check className="h-4 w-4" />
//             ) : (
//               <X className="h-4 w-4" />
//             )}
//           </div>

//           {/* Text Content */}
//           <div className="flex-1">
//             <p
//               className={`text-sm font-medium ${success ? "text-green-800" : "text-red-800"}`}
//             >
//               {success ? "Added to Cart!" : "Error"}
//             </p>
//             <p className="mt-0.5 line-clamp-2 text-xs text-gray-600">
//               {message}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomToast;

// import React from "react";
// import { Check, X, AlertTriangle, Trash2 } from "lucide-react";

// interface CustomToastProps {
//   // success: boolean;
//   type: "success" | "error" | "removal" | "warning";
//   message: string;
//   productImage?: string;
//   productTitle: string;
//   quantity?: number;
// }

// export const CustomToast: React.FC<CustomToastProps> = ({
//   // success,
//   type,
//   message,
//   productImage,
//   productTitle,
//   quantity,
// }) => {
//   const getConfig = () => {
//     switch (type) {
//       case "success":
//         return {
//           icon: <Check className="h-4 w-4" />,

//           iconBg: "bg-green-500",

//           title: "Added to Cart!",
//         };

//       case "removal":
//         return {
//           icon: <Trash2 className="h-4 w-4" />,

//           iconBg: "bg-orange-500",

//           title: "Removed from Cart",
//         };

//       case "warning":
//         return {
//           icon: <AlertTriangle className="h-4 w-4" />,

//           iconBg: "bg-amber-500",

//           title: "Stock Limit",
//         };

//       case "error":
//         break;

//       default:
//         return {
//           icon: <X className="h-4 w-4" />,

//           iconBg: "bg-red-500",

//           title: "Cannot Add",
//         };
//     }
//   };

//   const { icon, iconBg, title } = getConfig();

//   return (
//     <div className="flex max-w-sm items-center gap-3 p-3">
//       {/* Conditional Product Image - Only show for success and removal */}
//       {productImage && (type === "success" || type === "removal") && (
//         <div className="flex-shrink-0">
//           <img
//             src={productImage}
//             alt={productTitle}
//             className="h-12 w-12 rounded-lg border border-gray-200 object-cover"
//           />
//         </div>
//       )}

//       {/* Content */}
//       <div className="min-w-0 flex-1">
//         <div className="flex items-start gap-2">
//           {/* Success/Error Icon */}
//           <div
//             className={`mt-0.5 flex-shrink-0 ${
//               // success ? "text-green-500" : "text-red-500"
//               iconBg
//             }`}
//           >
//             {/* {success ? (
//               <Check className="h-5 w-5" />
//             ) : (
//               <AlertTriangle className="h-5 w-5" />
//             )} */}
//             {icon}
//           </div>

//           {/* Text Content */}
//           <div className="flex-1">
//             <p
//               className={`text-sm font-semibold ${
//                 // success ? "text-green-800" : "text-red-800"
//                 iconBg
//               }`}
//             >
//               {/* {success ? "Removed From Cart!" : "Cannot Add to Cart"} */}
//               {title}
//             </p>
//             <p className="mt-1 text-xs leading-relaxed text-gray-600">
//               {message}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomToast;

// import React from "react";
// import { Check, X, AlertTriangle, Trash2 } from "lucide-react";

// interface CustomToastProps {
//   type: "success" | "error" | "removal" | "warning";
//   message: string;
//   productImage?: string;
//   productTitle: string;
//   quantity?: number;
// }

// export const CustomToast: React.FC<CustomToastProps> = ({
//   type,
//   message,
//   productImage,
//   productTitle,
//   quantity,
// }) => {
//   const getIconAndColors = () => {
//     switch (type) {
//       case "success":
//         return {
//           icon: <Check className="h-5 w-5" />,
//           iconColor: "text-green-500",
//           titleColor: "text-green-800",
//           bgColor: "bg-green-50",
//           borderColor: "border-green-200",
//           title: "Added to Cart!",
//         };
//       case "removal":
//         return {
//           icon: <Trash2 className="h-5 w-5" />,
//           iconColor: "text-orange-500",
//           titleColor: "text-orange-800",
//           bgColor: "bg-orange-50",
//           borderColor: "border-orange-200",
//           title: "Removed from Cart",
//         };
//       case "warning":
//         return {
//           icon: <AlertTriangle className="h-5 w-5" />,
//           iconColor: "text-amber-500",
//           titleColor: "text-amber-800",
//           bgColor: "bg-amber-50",
//           borderColor: "border-amber-200",
//           title: "Stock Limit Reached",
//         };
//       case "error":
//       default:
//         return {
//           icon: <X className="h-5 w-5" />,
//           iconColor: "text-red-500",
//           titleColor: "text-red-800",
//           bgColor: "bg-red-50",
//           borderColor: "border-red-200",
//           title: "Cannot Add to Cart",
//         };
//     }
//   };

//   const { icon, iconColor, titleColor, bgColor, borderColor, title } =
//     getIconAndColors();

//   return (
//     <div
//       className={`flex items-start gap-3 rounded-lg border p-4 ${bgColor} ${borderColor} min-w-[320px] max-w-[400px]`}
//     >
//       {/* Product Image - Show for success and removal */}
//       {productImage && (type === "success" || type === "removal") && (
//         <div className="flex-shrink-0">
//           <img
//             src={productImage}
//             alt={productTitle}
//             className="h-14 w-14 rounded-lg border-2 border-white object-cover shadow-sm"
//           />
//         </div>
//       )}

//       {/* Content */}
//       <div className="min-w-0 flex-1">
//         <div className="flex items-start gap-3">
//           {/* Icon */}
//           <div className={`mt-0.5 flex-shrink-0 ${iconColor}`}>{icon}</div>

//           {/* Text Content */}
//           <div className="flex-1">
//             <p className={`text-sm font-semibold ${titleColor} mb-1`}>
//               {title}
//             </p>
//             <p className="text-sm leading-relaxed text-gray-700">
//               {quantity && type === "success" && (
//                 <span className="font-medium text-gray-900">{quantity}x </span>
//               )}
//               {message}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomToast;

// import React from "react";
// import { Check, X, AlertTriangle, Trash2 } from "lucide-react";

// interface CustomToastProps {
//   type: "success" | "error" | "removal" | "warning";
//   message: string;
//   productImage?: string;
//   productTitle: string;
//   quantity?: number;
// }

// export const CustomToast: React.FC<CustomToastProps> = ({
//   type,
//   message,
//   productImage,
//   productTitle,
//   quantity,
// }) => {
//   const getConfig = () => {
//     switch (type) {
//       case "success":
//         return {
//           icon: <Check className="h-4 w-4" />,
//           iconBg: "bg-green-500",
//           title: "Added to Cart!",
//         };
//       case "removal":
//         return {
//           icon: <Trash2 className="h-4 w-4" />,
//           iconBg: "bg-orange-500",
//           title: "Removed from Cart",
//         };
//       case "warning":
//         return {
//           icon: <AlertTriangle className="h-4 w-4" />,
//           iconBg: "bg-amber-500",
//           title: "Stock Limit",
//         };
//       case "error":
//       default:
//         return {
//           icon: <X className="h-4 w-4" />,
//           iconBg: "bg-red-500",
//           title: "Cannot Add",
//         };
//     }
//   };

//   const { icon, iconBg, title } = getConfig();

//   return (
//     <div className="flex min-w-[300px] max-w-[380px] items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
//       {/* Product Image - Only for success and removal */}
//       {productImage && (type === "success" || type === "removal") && (
//         <img
//           src={productImage}
//           alt={productTitle}
//           className="h-10 w-10 flex-shrink-0 rounded-md object-cover"
//         />
//       )}

//       {/* Icon */}
//       <div className={`${iconBg} flex-shrink-0 rounded-full p-1.5`}>
//         <div className="text-white">{icon}</div>
//       </div>

//       {/* Content */}
//       <div className="min-w-0 flex-1">
//         <p className="mb-0.5 text-sm font-semibold text-gray-900">{title}</p>
//         <p className="text-xs leading-relaxed text-gray-600">
//           {quantity && type === "success" && (
//             <span className="font-medium">{quantity}x </span>
//           )}
//           {message}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CustomToast;

// import React from "react";
// import { Check, X, AlertTriangle, Trash2 } from "lucide-react";

// interface CustomToastProps {
//   type: "success" | "error" | "removal" | "warning";
//   message: string;
//   productImage?: string;
//   productTitle: string;
//   quantity?: number;
// }

// export const CustomToast: React.FC<CustomToastProps> = ({
//   type,
//   message,
//   productImage,
//   productTitle,
//   quantity,
// }) => {
//   const getConfig = () => {
//     switch (type) {
//       case "success":
//         return {
//           icon: <Check className="h-4 w-4" />,
//           iconBg: "bg-green-500",
//           title: "Added to Cart!",
//         };
//       case "removal":
//         return {
//           icon: <Trash2 className="h-4 w-4" />,
//           iconBg: "bg-orange-500",
//           title: "Removed from Cart",
//         };
//       case "warning":
//         return {
//           icon: <AlertTriangle className="h-4 w-4" />,
//           iconBg: "bg-yellow-500",
//           title: "Stock Warning",
//         };
//       case "error":
//       default:
//         return {
//           icon: <X className="h-4 w-4" />,
//           iconBg: "bg-red-500",
//           title: "Error",
//         };
//     }
//   };

//   const { icon, iconBg, title } = getConfig();

//   return (
//     <div className="flex w-full max-w-md items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-xl">
//       {/* Left section with icon or image */}
//       <div className="flex items-center gap-3">
//         {productImage && (type === "success" || type === "removal") && (
//           <img
//             src={productImage}
//             alt={productTitle}
//             className="h-12 w-12 rounded-md border border-gray-200 object-cover"
//           />
//         )}
//         {<div className={`${iconBg} rounded-full p-2 text-white`}>{icon}</div>}
//       </div>

//       {/* Main message */}
//       <div className="min-w-0 flex-1">
//         <p className="text-sm font-semibold text-gray-900">{title}</p>
//         <p className="break-words text-xs leading-tight text-gray-600">
//           {quantity && type === "success" && (
//             <span className="font-medium">{quantity}x </span>
//           )}
//           {message}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CustomToast;

// import React from "react";
// import { Check, X, AlertTriangle, Trash2 } from "lucide-react";

// interface CustomToastProps {
//   type: "success" | "error" | "removal" | "warning";
//   message: string;
//   productImage?: string;
//   productTitle: string;
//   quantity?: number;
// }

// export const CustomToast: React.FC<CustomToastProps> = ({
//   type,
//   message,
//   productImage,
//   productTitle,
//   quantity,
// }) => {
//   const getConfig = () => {
//     switch (type) {
//       case "success":
//         return {
//           icon: <Check className="h-5 w-5" />,
//           iconBg: "bg-green-500",
//           title: "Added to Cart!",
//         };
//       case "removal":
//         return {
//           icon: <Trash2 className="h-5 w-5" />,
//           iconBg: "bg-orange-500",
//           title: "Removed from Cart",
//         };
//       case "warning":
//         return {
//           icon: <AlertTriangle className="h-5 w-5" />,
//           iconBg: "bg-yellow-500",
//           title: "Stock Warning",
//         };
//       case "error":
//       default:
//         return {
//           icon: <X className="h-5 w-5" />,
//           iconBg: "bg-red-500",
//           title: "Cannot Add",
//         };
//     }
//   };

//   const { icon, iconBg, title } = getConfig();

//   return (
//     <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-xl">
//       {/* Left Icon */}
//       <div
//         className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}
//       >
//         <span className="text-white">{icon}</span>
//       </div>

//       {/* Center Content */}
//       <div className="flex min-w-0 flex-1 flex-col justify-center">
//         <p className="text-sm font-semibold text-gray-900">{title}</p>
//         <p className="truncate text-sm text-gray-700">
//           {quantity && type === "success" && (
//             <span className="font-medium">{quantity}x </span>
//           )}
//           {message}
//         </p>
//       </div>

//       {/* Right Product Image (optional) */}
//       {productImage && (type === "success" || type === "removal") && (
//         <img
//           src={productImage}
//           alt={productTitle}
//           className="h-10 w-10 rounded-md border border-gray-200 object-cover"
//         />
//       )}
//     </div>
//   );
// };

// export default CustomToast;

// import React from "react";
// import { Check, X as CloseIcon, AlertTriangle, Trash2, X } from "lucide-react";
// import { toast } from "react-toastify";

// interface CustomToastProps {
//   type: "success" | "error" | "removal" | "warning";
//   message: string;
//   productImage?: string;
//   productTitle: string;
//   quantity?: number;
//   toastId?: React.ReactText;
// }

// export const CustomToast: React.FC<CustomToastProps> = ({
//   type,
//   message,
//   productImage,
//   productTitle,
//   quantity,
//   toastId,
// }) => {
//   const getConfig = () => {
//     switch (type) {
//       case "success":
//         return {
//           icon: <Check className="h-4 w-4" />, // smaller
//           iconBg: "bg-green-500",
//           title: "Added to Cart!",
//         };
//       case "removal":
//         return {
//           icon: <Trash2 className="h-4 w-4" />,
//           iconBg: "bg-orange-500",
//           title: "Removed from Cart",
//         };
//       case "warning":
//         return {
//           icon: <AlertTriangle className="h-4 w-4" />,
//           iconBg: "bg-yellow-500",
//           title: "Stock Warning",
//         };
//       case "error":
//       default:
//         return {
//           icon: <X className="h-4 w-4" />,
//           iconBg: "bg-red-500",
//           title: "Cannot Add",
//         };
//     }
//   };

//   const { icon, iconBg, title } = getConfig();

//   return (
//     <div className="relative flex w-full max-w-md items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-xl">
//       {/* Icon Circle */}
//       <div
//         className={`flex h-8 w-8 items-center justify-center rounded-full ${iconBg}`}
//       >
//         <span className="text-white">{icon}</span>
//       </div>

//       {/* Content */}
//       <div className="min-w-0 flex-1">
//         <p className="text-sm font-semibold leading-tight text-gray-900">
//           {title}
//         </p>
//         <p className="whitespace-normal break-words text-sm leading-tight text-gray-700">
//           {quantity && type === "success" && (
//             <span className="font-medium">{quantity}x </span>
//           )}
//           {productTitle && <span>{productTitle} – </span>}
//           {message}
//         </p>
//       </div>

//       {/* Image */}
//       {productImage && (type === "success" || type === "removal") && (
//         <img
//           src={productImage}
//           alt={productTitle}
//           className="h-10 w-10 rounded-md border border-gray-200 object-cover"
//         />
//       )}

//       {/* Dismiss X Button */}
//       <button
//         className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
//         onClick={() => toast.dismiss(toastId)}
//       >
//         <CloseIcon className="h-3.5 w-3.5" />
//       </button>
//     </div>
//   );
// };

// export default CustomToast;

import React from "react";
import { Check, X, AlertTriangle, Trash2 } from "lucide-react";

interface CustomToastProps {
  type: "success" | "error" | "removal" | "warning";
  message: string;
  productImage?: string;
  productTitle: string;
  quantity?: number;
}

export const CustomToast: React.FC<CustomToastProps> = ({
  type,
  message,
  productImage,
  productTitle,
  quantity,
}) => {
  const getConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: <Check className="h-5 w-5" />,
          iconBg: "bg-green-500",
          title: "Added to Cart!",
          bgColor: "bg-white",
          borderColor: "border-green-200",
        };
      case "removal":
        return {
          icon: <Trash2 className="h-5 w-5" />,
          iconBg: "bg-orange-500",
          title: "Removed from Cart!",
          borderColor: "border-orange-200",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          iconBg: "bg-yellow-500",
          title: "Stock Warning!",
          borderColor: "border-amber-200",
        };
      case "error":
      default:
        return {
          icon: <X className="h-5 w-5" />,
          iconBg: "bg-red-500",
          title: "Cannot Add!",
          borderColor: "border-red-200",
        };
    }
  };

  const { icon, iconBg, title, borderColor } = getConfig();

  return (
    <div
      className={`w[600px] flex w-full max-w-md items-center justify-between gap-4 rounded-xl border ${borderColor} bg-white py-3 pl-4 pr-6 shadow-xl`}
    >
      {/* Left Icon */}
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full ${iconBg}`}
      >
        <span className="text-white">{icon}</span>
      </div>

      {/* Center Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="text-base font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-700">
          {/* {quantity && type === "success" && (
            <span className="font-medium">{quantity}x </span>
          )} */}
          {message}
        </p>
      </div>

      {/* Right Product Image (optional) */}
      {productImage && (type === "success" || type === "removal") && (
        <img
          src={productImage}
          alt={productTitle}
          className="h-10 w-10 rounded-md border border-gray-200 bg-gray-100 object-cover"
        />
      )}
    </div>
  );
};

export default CustomToast;

// import React from "react";
// import { Check, X, AlertTriangle, Trash2 } from "lucide-react";

// interface CustomToastProps {
//   type: "success" | "error" | "removal" | "warning";
//   message: string;
//   productImage?: string;
//   productTitle: string;
//   quantity?: number;
// }

// export const CustomToast: React.FC<CustomToastProps> = ({
//   type,
//   message,
//   productImage,
//   productTitle,
//   quantity,
// }) => {
//   const getConfig = () => {
//     switch (type) {
//       case "success":
//         return {
//           icon: <Check className="h-5 w-5" />,
//           iconBg: "bg-green-500",
//           bgColor: "bg-white",
//           borderColor: "border-green-200",
//           accentColor: "bg-green-500",
//           textColor: "text-gray-900",
//           subtextColor: "text-gray-600",
//           title: "Added to Cart!",
//         };
//       case "removal":
//         return {
//           icon: <Trash2 className="h-5 w-5" />,
//           iconBg: "bg-orange-500",
//           bgColor: "bg-white",
//           borderColor: "border-orange-200",
//           accentColor: "bg-orange-500",
//           textColor: "text-gray-900",
//           subtextColor: "text-gray-600",
//           title: "Removed from Cart",
//         };
//       case "warning":
//         return {
//           icon: <AlertTriangle className="h-5 w-5" />,
//           iconBg: "bg-amber-500",
//           bgColor: "bg-white",
//           borderColor: "border-amber-200",
//           accentColor: "bg-amber-500",
//           textColor: "text-gray-900",
//           subtextColor: "text-gray-600",
//           title: "Stock Limit",
//         };
//       case "error":
//       default:
//         return {
//           icon: <X className="h-5 w-5" />,
//           iconBg: "bg-red-500",
//           bgColor: "bg-white",
//           borderColor: "border-red-200",
//           accentColor: "bg-red-500",
//           textColor: "text-gray-900",
//           subtextColor: "text-gray-600",
//           title: "Cannot Add",
//         };
//     }
//   };

//   const { icon, iconBg, bgColor, borderColor, textColor, subtextColor, title } =
//     getConfig();

//   return (
//     <div
//       className={`relative flex items-center gap-3 p-4 ${bgColor} border ${borderColor} min-w-[320px] max-w-[380px] overflow-hidden rounded-lg shadow-lg`}
//     >
//       {/* Left accent bar */}
//       <div className={`absolute bottom-0 left-0 top-0 w-1 ${iconBg}`}></div>

//       {/* Product Image - Only for success and removal */}
//       {productImage && (type === "success" || type === "removal") && (
//         <img
//           src={productImage}
//           alt={productTitle}
//           className="h-12 w-12 flex-shrink-0 rounded-md border border-gray-200 object-cover"
//         />
//       )}

//       {/* Status Icon */}
//       <div className={`${iconBg} flex-shrink-0 rounded-full p-2`}>
//         <div className="text-white">{icon}</div>
//       </div>

//       {/* Content Area */}
//       <div className="min-w-0 flex-1">
//         {/* Title */}
//         <p className={`text-sm font-semibold ${textColor} mb-1`}>{title}</p>

//         {/* Message */}
//         <p className={`text-sm ${subtextColor} leading-relaxed`}>
//           {quantity && type === "success" && (
//             <span className="font-medium text-gray-900">{quantity}x </span>
//           )}
//           <span className="font-medium">{productTitle}</span>
//           {type === "success" && " has been added to your cart"}
//           {type === "removal" && " has been removed from your cart"}
//           {(type === "warning" || type === "error") && ` - ${message}`}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CustomToast;
