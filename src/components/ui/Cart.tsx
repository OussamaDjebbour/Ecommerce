import { useCartStore } from "../../store/cartStore";
import CartItem from "./CartItem";
import CartOrderSummary from "./CartOrderSummary";

interface CartProps {
  onHandleBack: () => void;
}

function Cart({ onHandleBack }: CartProps) {
  const cart = useCartStore((state) => state.cart);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      <ul className="space-y-4 lg:col-span-3">
        {cart?.map((item) => <CartItem key={item.id} item={item} />)}
      </ul>

      <CartOrderSummary onHandleBack={onHandleBack} />
    </div>
  );
}

export default Cart;
