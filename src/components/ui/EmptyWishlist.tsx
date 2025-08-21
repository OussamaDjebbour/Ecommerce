import React from "react";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";

interface EmptyWishlistProps {
  onGoBack: () => void;
  onStartShopping: () => void;
}

const EmptyWishlist: React.FC<EmptyWishlistProps> = ({
  onGoBack,
  onStartShopping,
}) => {
  return (
    <div className="col-span-2 row-span-1 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onGoBack}
            className="group mb-6 flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition-all duration-200 hover:bg-white hover:text-gray-900 hover:shadow-sm"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Go Back</span>
          </button>

          <div className="mb-2 flex items-center gap-3">
            <Heart className="h-8 w-8 text-[#009393]" />
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          <p className="pl-4 text-gray-600">Save items you love for later</p>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-6 rounded-full bg-gray-100 p-6">
            <Heart className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Your wishlist is empty
          </h2>
          <p className="mb-8 max-w-md text-center text-gray-600">
            Start adding items you love to your wishlist. They'll appear here so
            you can easily find them later.
          </p>
          <button
            onClick={onStartShopping}
            className="flex items-center gap-2 rounded-lg bg-[#009393] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[#007a7a] hover:shadow-lg"
          >
            <ShoppingCart className="h-5 w-5" />
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyWishlist;
