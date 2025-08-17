import { ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CartDropdown from "./CartDropdown";
import { useCartTotalItems } from "../../hooks/useCartTotalItems";

function CartButton() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = useCartTotalItems();

  const cartButtonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when pressing Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isCartOpen]);
  return (
    <div>
      <div className="relative rounded-xl bg-[#E8FCFF] transition-colors hover:bg-[#D1F5F9]">
        <button
          ref={cartButtonRef}
          onClick={() => setIsCartOpen(!isCartOpen)}
          aria-expanded={isCartOpen}
          aria-controls="cart-dropdown"
          aria-label={`Cart, ${totalItems} items`}
          className="relative cursor-pointer rounded p-2 focus:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <ShoppingCart fill="#016170" className="h-7 w-7" />

          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-xs text-white">
              {totalItems}
            </span>
          )}
        </button>
        {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
      </div>
    </div>
  );
}

export default CartButton;
