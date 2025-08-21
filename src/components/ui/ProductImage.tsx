import React from "react";
import { Package } from "lucide-react";

interface ProductImageProps {
  src: string;
  alt: string;
  stock: number;
  onImageClick?: () => void;
  className?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  stock,
  onImageClick,
  className = "",
}) => {
  return (
    <div
      className={`relative mb-4 overflow-hidden rounded-lg bg-gray-50 p-4 ${
        onImageClick ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onImageClick}
      role={onImageClick ? "button" : undefined}
      tabIndex={onImageClick ? 0 : undefined}
    >
      <img
        src={src}
        alt={alt}
        className="mx-auto h-40 w-full object-contain transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* Stock Indicator */}
      <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium backdrop-blur-sm">
        <Package className="h-3 w-3 text-gray-500" />
        <span className={stock > 10 ? "text-green-600" : "text-orange-600"}>
          {stock} left
        </span>
      </div>
    </div>
  );
};

export default ProductImage;
