import React from "react";
import { ArrowLeft, Heart, Check, Trash2 } from "lucide-react";

interface WishlistHeaderProps {
  itemCount: number;
  selectedCount: number;
  onGoBack: () => void;
  onSelectAll: () => void;
  onRemoveSelected: () => void;
  isAllSelected: boolean;
}

const WishlistHeader: React.FC<WishlistHeaderProps> = ({
  itemCount,
  selectedCount,
  onGoBack,
  onSelectAll,
  onRemoveSelected,
  isAllSelected,
}) => {
  return (
    <div className="mb-16 md:mb-10">
      <button
        onClick={onGoBack}
        className="group mb-6 flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition-all duration-200 hover:bg-white hover:text-gray-900 hover:shadow-sm"
      >
        <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Go Back</span>
      </button>

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <Heart className="h-8 w-8 text-[#009393]" />
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          <p className="pl-4 text-gray-600">
            {itemCount} {itemCount === 1 ? "item" : "items"} saved
          </p>
        </div>

        {itemCount > 0 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onSelectAll}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-gray-50"
            >
              <Check className="h-4 w-4" />
              {isAllSelected ? "Deselect All" : "Select All"}
            </button>

            {selectedCount > 0 && (
              <button
                onClick={onRemoveSelected}
                className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition-all duration-200 hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Remove Selected ({selectedCount})
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistHeader;
