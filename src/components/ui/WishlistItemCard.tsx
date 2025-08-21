import React, { useCallback } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";
import {
  showAddToCartToast,
  showRemovalToast,
} from "../../helpers/toastHelpers";
import { getPriceDetails } from "../../helpers/getPriceDetails";
import useNavigateToProduct from "../../hooks/useNavigateToProduct";
import { CartItemType, wishlistItemType } from "../../types";
import SelectionCheckbox from "../ui/SelectionCheckbox";
import DiscountBadge from "../ui/DiscountBadge";
import ProductImage from "../ui/ProductImage";
import ProductInfo from "../ui/ProductInfo";

interface WishlistItemCardProps {
  item: wishlistItemType;
  isSelected: boolean;
  onSelect: () => void;
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({
  item,
  isSelected,
  onSelect,
}) => {
  const { addToCart } = useCartStore();
  const { removeFromWishlist } = useWishlistStore();
  const navigateToProduct = useNavigateToProduct();
  const { originalPrice, discountedPrice, hasDiscount, savings } =
    getPriceDetails(item);

  const handleAddToCart = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();

      const cartItem: CartItemType = {
        ...item,
        quantity: 1,
        image: item.thumbnail,
        discountedPrice: discountedPrice || originalPrice,
      };

      const result = addToCart(cartItem);
      showAddToCartToast(
        result.success,
        result.message,
        item.title,
        item.thumbnail,
        1,
      );
    },
    [addToCart, item, discountedPrice, originalPrice],
  );

  const handleMoveToCart = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      handleAddToCart(event);
      removeFromWishlist(item.id);
    },
    [handleAddToCart, removeFromWishlist, item.id],
  );

  const handleRemoveItem = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      removeFromWishlist(item.id);
      showRemovalToast(item.title, item.thumbnail, "Wishlist");
    },
    [removeFromWishlist, item],
  );

  const handleProductClick = useCallback(() => {
    navigateToProduct(item);
  }, [navigateToProduct, item]);

  return (
    <div
      className={`group relative w-full min-w-[18rem] max-w-[21rem] overflow-hidden rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        isSelected ? "ring-2 ring-[#009393] ring-offset-2" : ""
      }`}
    >
      <SelectionCheckbox isSelected={isSelected} onSelect={onSelect} />

      {hasDiscount && <DiscountBadge savings={savings} />}

      <ProductImage
        src={item.thumbnail}
        alt={item.title}
        stock={item.stock}
        onImageClick={handleProductClick}
      />

      <ProductInfo
        title={item.title}
        rating={item.rating}
        originalPrice={originalPrice}
        discountedPrice={discountedPrice}
        hasDiscount={hasDiscount}
        onTitleClick={handleProductClick}
      />

      {/* Action Buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleMoveToCart}
          disabled={item.stock <= 0}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
            item.stock <= 0
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-[#009393] text-white hover:bg-[#007a7a] hover:shadow-md active:scale-95"
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          {item.stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </button>

        <button
          onClick={handleRemoveItem}
          className="flex items-center justify-center rounded-lg border border-red-300 p-2.5 text-red-600 transition-all duration-200 hover:border-red-400 hover:bg-red-50"
          title="Remove from wishlist"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default WishlistItemCard;
