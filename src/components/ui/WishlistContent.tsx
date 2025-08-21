import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../../store/wishlistStore";
import {
  showRemovalToast,
  showRemovalWishlistToast,
} from "../../helpers/toastHelpers";
import WishlistHeader from "./WishlistHeader";
import WishlistItemCard from "./WishlistItemCard";

const WishlistContent: React.FC = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlistStore();

  const isAllSelected =
    selectedItems.size === wishlist.length && wishlist.length > 0;

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSelectItem = useCallback((itemId: number) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedItems.size === wishlist.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(wishlist.map((item) => item.id)));
    }
  }, [selectedItems.size, wishlist]);

  const handleRemoveSelected = useCallback(() => {
    if (isAllSelected) {
      clearWishlist();
      showRemovalWishlistToast();
      return;
    }
    selectedItems.forEach((itemId) => {
      const item = wishlist.find((w) => w.id === itemId);
      if (item) {
        removeFromWishlist(itemId);
        showRemovalToast(item.title, item.thumbnail, "Wishlist");
      }
    });
    setSelectedItems(new Set());
  }, [
    selectedItems,
    wishlist,
    removeFromWishlist,
    isAllSelected,
    clearWishlist,
  ]);

  const handleClearWishlist = () => {
    clearWishlist();
    showRemovalWishlistToast();
  };

  return (
    <div className="col-span-2 row-span-1 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <WishlistHeader
          itemCount={wishlist.length}
          selectedCount={selectedItems.size}
          onGoBack={handleGoBack}
          onSelectAll={handleSelectAll}
          onRemoveSelected={handleRemoveSelected}
          isAllSelected={isAllSelected}
        />

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-10 p-4 min-[660px]:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((item) => (
            <WishlistItemCard
              key={item.id}
              item={item}
              isSelected={selectedItems.has(item.id)}
              onSelect={() => handleSelectItem(item.id)}
            />
          ))}
        </div>

        {/* Clear All Button */}
        {wishlist.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={handleClearWishlist}
              className="rounded-lg border border-red-300 px-6 py-3 text-red-600 transition-all duration-200 hover:border-red-400 hover:bg-red-50"
            >
              Clear All Wishlist Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistContent;
