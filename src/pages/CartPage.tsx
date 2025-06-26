import React from "react";
import {
  ArrowLeft,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Package,
} from "lucide-react";
import { useCartStore } from "../store/cartStore";
import {
  showRemovalCartToast,
  showRemovalToast,
} from "../helpers/toastHelpers";
import { CartItem } from "src/types";
import CartHeader from "./CartHeader";
import { useLocation, useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import Cart from "../components/ui/Cart";

interface CartProps {
  onBack: () => void;
  onCheckout: (product: {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }) => void;
}

const CartPage: React.FC<CartProps> = ({ onBack, onCheckout }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotalItems,
    getCartTotalPrice,
  } = useCartStore();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from;

  const handleContinueShopping = () => {
    if (from && from !== "/checkout") {
      navigate(-1);
    } else {
      navigate("/"); // fallback route
    }
  };

  const handleRemoveItem = (item: CartItem) => {
    removeFromCart(item.id);
    showRemovalToast(item.title, item.image);
  };

  const handleQuantityChange = (
    id: number,
    newQuantity: number,
    maxStock: number,
  ) => {
    if (newQuantity <= 0) {
      const item = cart.find((item) => item.id === id);
      if (item) {
        handleRemoveItem(item);
      }
    } else {
      updateQuantity(id, Math.min(newQuantity, maxStock));
    }
  };

  const handleCheckoutItem = (item: CartItem) => {
    onCheckout({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    });
  };

  const handleCheckoutAll = () => {
    // For simplicity, we'll checkout the first item or create a combined checkout
    // In a real app, you'd handle multiple items differently
    if (cart.length > 0) {
      const totalAmount = getCartTotalPrice();
      console.log("totalAmount", totalAmount, getCartTotalPrice());
      const totalItems = getCartTotalItems();

      onCheckout({
        id: 999, // Special ID for cart checkout
        title: `Cart Items (${totalItems} items)`,
        price: totalAmount,
        image: cart[0].image, // Use first item's image
        quantity: 1,
      });
    }
  };

  return (
    <div className="col-span-2 min-h-screen">
      <div
        className={`mx-auto ${cart.length > 0 ? "max-w-6xl" : "max-w-4xl"} px-4 py-8`}
      >
        <CartHeader />

        {cart.length === 0 && (
          <EmptyCart onHandleBack={handleContinueShopping} />
        )}

        {cart.length > 0 && <Cart onHandleBack={handleContinueShopping} />}
      </div>
    </div>
  );
};

export default CartPage;
