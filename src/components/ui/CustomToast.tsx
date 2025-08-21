import React from "react";
import { Check, X, AlertTriangle, Trash2 } from "lucide-react";
import { ShowToastOptions } from "../../types";

export const CustomToast: React.FC<ShowToastOptions> = ({
  type,
  message,
  productImage,
  productTitle,
  cartOrWishlist = "Cart",
}) => {
  const getConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: <Check className="h-5 w-5" />,
          iconBg: "bg-green-500",
          title: `Added to ${cartOrWishlist}!`,
          bgColor: "bg-white",
          borderColor: "border-green-200",
        };
      case "removal":
        return {
          icon: <Trash2 className="h-5 w-5" />,
          iconBg: "bg-orange-500",
          title: `Removed from ${cartOrWishlist}!`,
          borderColor: "border-orange-200",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          iconBg: "bg-yellow-500",
          title: "Stock Warning!",
          borderColor: "border-amber-200",
        };
      case "alert":
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          iconBg: "bg-yellow-500",
          title: "Delete Alert!",
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
