import { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartDropdown from "./CartDropdown";

function HeaderIconsGroup() {
  const [isCartOpen, setIsCartOpen] = useState(false); // State to toggle the dropdown
  const cart = useCartStore((state) => state.cart); // Get the cart from Zustand store
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total items

  console.log("cartcart", cart);

  return (
    <div className="flex items-center gap-5">
      <img
        src="/images/fi-br-shopping-cart.png"
        alt="Cart Icon"
        className="cursor-pointer rounded-xl bg-[#E8FCFF] p-2"
      />
      <img
        src="/images/notification.png"
        alt="notification Icon"
        className="cursor-pointer rounded-xl bg-[#E8FCFF] p-2"
      />

      {/* Cart Icon with Badge */}
      <div className="relative cursor-pointer rounded-xl bg-[#E8FCFF] p-2">
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative focus:outline-none"
        >
          {/* <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg> */}

          <FontAwesomeIcon
            // className="rounded-md bg-[#E8FCFF] p-3.5"
            color="#016170"
            size="2xl"
            icon={faCartShopping}
          />

          {cartItemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-xs text-white">
              {cartItemCount}
            </span>
          )}
        </button>
        {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
      </div>

      <img
        src="/images/retry.png"
        alt="Account Icon"
        className="cursor-pointer rounded-xl"
      />
    </div>
  );
}

export default HeaderIconsGroup;
