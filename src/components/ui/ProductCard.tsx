import React, { memo, useCallback } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import {
  showAddToCartToast,
  showMaxStockToast,
} from "../../helpers/toastHelpers";
import { useQueryClient } from "@tanstack/react-query";
import { CartItemType, Product } from "../../types";
import { getPriceDetails } from "../../helpers/getPriceDetails";
import useNavigateToProduct from "../../hooks/useNavigateToProduct";
import WishlistButton from "../ui/WishlistButton";
import DiscountBadge from "../ui/DiscountBadge";
import ProductImage from "../ui/ProductImage";
import ProductInfo from "../ui/ProductInfo";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const queryClient = useQueryClient();
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const navigateToProduct = useNavigateToProduct();

  const isFull = cart.some(
    (item) => item.id === product.id && item.quantity === item.stock,
  );
  const { originalPrice, discountedPrice, hasDiscount, savings } =
    getPriceDetails(product);

  const handleProductClick = useCallback(() => {
    queryClient.setQueryData(["product", product.id], product);
    navigateToProduct(product);
  }, [queryClient, product, navigateToProduct]);

  const handleAddToCart = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();

      if (isFull) {
        showMaxStockToast(product.title);
        return;
      }

      const cartItem: CartItemType = {
        ...product,
        quantity: 1,
        image: product.thumbnail,
        discountedPrice: discountedPrice || originalPrice,
      };

      const result = addToCart(cartItem);
      showAddToCartToast(
        result.success,
        result.message,
        product.title,
        product.thumbnail,
        1,
      );
    },
    [addToCart, product, discountedPrice, originalPrice, isFull],
  );

  return (
    <div className="group relative w-full min-w-[18rem] max-w-[20rem] cursor-pointer overflow-hidden rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {hasDiscount && <DiscountBadge savings={savings} />}

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
      </div>

      <ProductImage
        src={product.thumbnail}
        alt={product.title}
        stock={product.stock}
        onImageClick={handleProductClick}
      />

      <ProductInfo
        title={product.title}
        rating={product.rating}
        originalPrice={originalPrice}
        discountedPrice={discountedPrice}
        hasDiscount={hasDiscount}
        onTitleClick={handleProductClick}
      />

      <div className="mt-4">
        <button
          onClick={handleAddToCart}
          className={`group/btn flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
            isFull
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-[#009393] text-white hover:bg-[#007a7a] hover:shadow-md active:scale-95"
          }`}
          aria-label={`Add ${product.title} to cart`}
        >
          <ShoppingCart
            className={`h-4 w-4 transition-transform ${!isFull && "group-hover/btn:scale-110"}`}
          />
          {isFull ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
