import React, { memo, ReactNode } from "react";
import { Package, Star } from "lucide-react";
import { getPriceDetails } from "../../helpers/getPriceDetails";
import useNavigateToProduct from "../../hooks/useNavigateToProduct";
import { Product, wishlistItemType } from "../../types";

interface BaseProductCardProps {
  product: Product | wishlistItemType;
  children?: ReactNode;
  topLeftAction?: ReactNode;
  topRightBadge?: ReactNode;
  bottomActions?: ReactNode;
  isSelected?: boolean;
  onSelect?: () => void;
  className?: string;
}

const BaseProductCard = memo(
  ({
    product,
    children,
    topLeftAction,
    topRightBadge,
    bottomActions,
    isSelected = false,
    onSelect,
    className = "",
  }: BaseProductCardProps) => {
    const navigateToProduct = useNavigateToProduct();
    const { originalPrice, discountedPrice, hasDiscount, savings } =
      getPriceDetails(product);

    const handleProductClick = () => {
      navigateToProduct(product);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleProductClick();
      }
    };

    return (
      <div
        className={`group relative overflow-hidden rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
          isSelected ? "ring-2 ring-[#009393] ring-offset-2" : ""
        } ${className}`}
      >
        {/* Selection Checkbox */}
        {onSelect && (
          <button
            onClick={onSelect}
            className={`absolute left-3 top-3 z-10 h-6 w-6 rounded-full border-2 transition-all duration-200 ${
              isSelected
                ? "border-[#009393] bg-[#009393] text-white"
                : "border-gray-300 bg-white hover:border-[#009393]"
            }`}
          >
            {isSelected && (
              <svg
                className="mx-auto h-3 w-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        )}

        {/* Top Left Action (Wishlist Button) */}
        {topLeftAction && !onSelect && (
          <div className="absolute left-3 top-3 z-10">{topLeftAction}</div>
        )}

        {/* Top Right Badge (Discount) */}
        {topRightBadge ||
          (hasDiscount && (
            <div className="absolute right-3 top-3 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
              Save ${savings.toFixed(2)}
            </div>
          ))}

        {/* Product Image */}
        <div
          className="relative mb-4 cursor-pointer overflow-hidden rounded-lg bg-gray-50 p-4"
          onClick={handleProductClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label={`View details for ${product.title}`}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="mx-auto h-40 w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Stock Indicator */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium backdrop-blur-sm">
            <Package className="h-3 w-3 text-gray-500" />
            <span
              className={
                product.stock > 10 ? "text-green-600" : "text-orange-600"
              }
            >
              {product.stock} left
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          {/* Title */}
          <h3
            title={product.title}
            className="line-clamp-2 cursor-pointer text-sm font-semibold text-gray-900 transition-colors hover:text-[#009393]"
            onClick={handleProductClick}
          >
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
                    index < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.rating.toFixed(1)})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#009393]">
              ${discountedPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Custom Content */}
          {children}

          {/* Bottom Actions */}
          {bottomActions}
        </div>
      </div>
    );
  },
);

BaseProductCard.displayName = "BaseProductCard";

export default BaseProductCard;
