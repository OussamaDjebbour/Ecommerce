import React from "react";
import { Star } from "lucide-react";

interface ProductInfoProps {
  title: string;
  rating: number;
  originalPrice: number;
  discountedPrice: number;
  hasDiscount: boolean;
  onTitleClick?: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  rating,
  originalPrice,
  discountedPrice,
  hasDiscount,
  onTitleClick,
}) => {
  return (
    <div className="space-y-3">
      {/* Title */}
      <h3
        title={title}
        className={`line-clamp-2 text-sm font-semibold text-gray-900 transition-colors ${
          onTitleClick ? "cursor-pointer hover:text-[#009393]" : ""
        }`}
        onClick={onTitleClick}
      >
        {title}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${
                index < Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">({rating.toFixed(1)})</span>
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
    </div>
  );
};

export default ProductInfo;
