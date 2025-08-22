import React from "react";
import { useCartStore } from "../store/cartStore";
import { useContinueShopping } from "../hooks/useContinueShopping";
import EmptyCart from "./EmptyCart";
import CartHeader from "./CartHeader";
import Cart from "../components/ui/Cart";

const CartPage: React.FC = () => {
  const { cart } = useCartStore();

  const handleContinueShopping = useContinueShopping();

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
