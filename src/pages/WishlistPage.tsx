import React from "react";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../store/wishlistStore";
import EmptyWishlist from "../components/ui/EmptyWishlist";
import WishlistContent from "../components/ui/WishlistContent";

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { wishlist } = useWishlistStore();

  const handleGoBack = () => navigate(-1);
  const handleStartShopping = () => navigate("/");

  if (wishlist.length === 0) {
    return (
      <EmptyWishlist
        onGoBack={handleGoBack}
        onStartShopping={handleStartShopping}
      />
    );
  }

  return <WishlistContent />;
};

export default WishlistPage;
