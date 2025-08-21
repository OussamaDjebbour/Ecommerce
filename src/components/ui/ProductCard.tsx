import React, { memo, useCallback } from "react";
import { ShoppingCart, Package } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import {
  showAddToCartToast,
  showMaxStockToast,
} from "../../helpers/toastHelpers";
import { useQueryClient } from "@tanstack/react-query";
import { CartItemType, Product } from "../../types";
import useNavigateToProduct from "../../hooks/useNavigateToProduct";
import { getPriceDetails } from "../../helpers/getPriceDetails";
import { renderStars } from "../../helpers/renderStars";
import WishlistButton from "./WishlistButton";

interface ProductCardProps {
  product: Product;
  id: number;
  imgSrc: string;
  title: string;
  price: number;
  rating: number;
  stock: number;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product, id, imgSrc, title, rating, stock }) => {
    const queryClient = useQueryClient();
    const addToCart = useCartStore((state) => state.addToCart);
    const cart = useCartStore((state) => state.cart);
    const navigateToProduct = useNavigateToProduct();

    const isFull = cart.some(
      (item) => item.id === id && item.quantity === item.stock,
    );

    const { originalPrice, discountedPrice, hasDiscount, savings } =
      getPriceDetails(product);

    const handleProductClick = useCallback(() => {
      queryClient.setQueryData(["product", id], product);
      navigateToProduct(product);
    }, [queryClient, id, product, navigateToProduct]);

    const handleAddToCart = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation();

        if (isFull) {
          showMaxStockToast(title);
          return;
        }

        const cartItem: CartItemType = {
          ...product,
          quantity: 1,
          image: product.thumbnail,
          discountedPrice: discountedPrice || originalPrice,
        };

        const result = addToCart(cartItem);
        showAddToCartToast(result.success, result.message, title, imgSrc, 1);
      },
      [
        addToCart,
        product,
        discountedPrice,
        originalPrice,
        title,
        imgSrc,
        isFull,
      ],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleProductClick();
        }
      },
      [handleProductClick],
    );

    return (
      <div
        onClick={handleProductClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${title}`}
        className="group relative w-full min-w-[18rem] max-w-[20rem] cursor-pointer overflow-hidden rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute right-3 top-3 z-10 animate-pulse rounded-full bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 text-xs font-bold text-white shadow-lg">
            Save ${savings.toFixed(2)}
          </div>
        )}

        {/* Wishlist Button */}
        <div className="absolute left-3 top-3 z-10">
          <WishlistButton
            product={{
              ...product,
              image: product.thumbnail,
              discountedPrice: discountedPrice || originalPrice,
            }}
            size="sm"
            variant="icon"
          />

          {/* <WishlistButton
            product={{
              ...product,
              image: product.thumbnail,
              discountedPrice: discountedPrice || originalPrice,
            }}
            size="sm"
          /> */}
        </div>

        {/* Product Image */}
        <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-50 p-4">
          <img
            src={product.thumbnail}
            alt={title}
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

        {/* Product Info */}
        <div className="space-y-3">
          {/* Title */}
          <h3
            title={title}
            className="line-clamp-2 truncate text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#009393]"
          >
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">{renderStars(rating, 4)}</div>
            <span className="text-xs text-gray-500">({rating.toFixed(2)})</span>
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

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`group/btn flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
              isFull
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-[#009393] text-white hover:bg-[#007a7a] hover:shadow-md active:scale-95"
            }`}
            aria-label={`Add ${title} to cart`}
          >
            <ShoppingCart
              className={`h-4 w-4 transition-transform ${!isFull && "group-hover/btn:scale-110"}`}
            />
            {isFull ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
