import { toast } from "react-toastify";
import CustomToast from "../components/ui/CustomToast";
import { ShowToastOptions } from "../types";

export const showCustomToast = ({
  type,
  message,
  productTitle,
  productImage,
  quantity,
  cartOrWishlist,
}: ShowToastOptions) => {
  const customToastContent = (
    <CustomToast
      type={type}
      message={message}
      productImage={productImage}
      productTitle={productTitle}
      quantity={quantity}
      cartOrWishlist={cartOrWishlist}
    />
  );

  toast(customToastContent, {
    className: "bg-transparent shadow-none border-none p-0 m-0",
    hideProgressBar: true,
    closeButton: false,
    autoClose: 3000,
    position: "top-right",
    style: {
      width: `${type === "removal" && "350px"}`,
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
    cartOrWishlist: "Cart",
  });
};

export const showRemovalToast = (
  productTitle: string,
  productImage: string,
  cartOrWishlist: "Cart" | "Wishlist" = "Cart",
) => {
  showCustomToast({
    type: "removal",
    message: `${productTitle} has been removed from your ${cartOrWishlist}`,
    productTitle,
    productImage,
    cartOrWishlist,
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

export const showAlertToast = (message: string) => {
  showCustomToast({
    type: "alert",
    message,
    productTitle: "",
  });
};

export const showAddToWishlistToast = (
  success: boolean,
  message: string,
  productTitle: string,
  productImage?: string,
) => {
  showCustomToast({
    type: success ? "success" : "error",
    message,
    productTitle,
    productImage: success ? productImage : undefined,
    cartOrWishlist: "Wishlist",
  });
};

export const showRemovalWishlistToast = () => {
  showCustomToast({
    type: "removal",
    message: "All items have been removed from your wishlist",
    productTitle: "",
    cartOrWishlist: "Wishlist",
  });
};
