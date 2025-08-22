import React from "react";
import { useWishlistStore } from "../store/wishlistStore";
import EmptyWishlist from "../components/ui/EmptyWishlist";
import WishlistContent from "../components/ui/WishlistContent";

const WishlistPage: React.FC = () => {

  const { wishlist } = useWishlistStore();


  if (wishlist.length === 0) {
    return (
      <EmptyWishlist
      />
    );
  }

  return <WishlistContent />;
};

export default WishlistPage;
