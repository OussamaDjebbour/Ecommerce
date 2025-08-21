import React, { memo } from "react";
import { Heart } from "lucide-react";
import { useWishlistStore } from "../../store/wishlistStore";
import { wishlistItemType } from "../../types";
import {
  showAddToWishlistToast,
  showRemovalToast,
} from "../../helpers/toastHelpers";

interface WishlistButtonProps {
  product: wishlistItemType;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "text";
  responsive?: boolean;
}

const WishlistButton = memo(
  ({
    product,
    className = "",
    size = "md",
    variant = "icon",
    responsive = false,
  }: WishlistButtonProps) => {
    const { addToWishlist, removeFromWishlist, isInWishlist } =
      useWishlistStore();
    const isWishlisted = isInWishlist(product.id);

    // Normal fixed size classes
    const sizeClasses = {
      sm: "p-2",
      md: "px-4 py-3",
      lg: "px-6 py-4",
    };

    const iconSizes = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    };

    // Responsive classes for MainProduct
    const responsivePadding = "px-3 py-2 xl:px-2 xl:py-2 2xl:px-4 2xl:py-3";
    const responsiveIcon = "h-4 w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6";

    const handleWishlistToggle = (e: React.MouseEvent) => {
      e.stopPropagation();

      if (isWishlisted) {
        removeFromWishlist(product.id);
        showRemovalToast(product.title, product.thumbnail, "Wishlist");
      } else {
        const result = addToWishlist(product);
        showAddToWishlistToast(
          result.success,
          result.message,
          product.title,
          product.thumbnail,
        );
      }
    };

    return (
      <button
        onClick={handleWishlistToggle}
        className={`group flex items-center justify-center rounded-xl border-2 border-[#009393] text-[#009393] transition-all duration-200 hover:bg-[#009393] hover:text-white ${
          responsive ? responsivePadding : sizeClasses[size]
        } ${className}`}
        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={`transition-all duration-200 group-hover:scale-110 ${
            responsive ? responsiveIcon : iconSizes[size]
          } ${isWishlisted ? "fill-current" : ""}`}
        />
        {variant === "text" && (
          <span className="ml-2 font-medium">
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </span>
        )}
      </button>
    );
  },
);

WishlistButton.displayName = "WishlistButton";

export default WishlistButton;
