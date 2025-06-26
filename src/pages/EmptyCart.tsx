import { Package } from "lucide-react";

interface EmptyCartProps {
  onHandleBack: () => void;
}

function EmptyCart({ onHandleBack }: EmptyCartProps) {
  return (
    <div className="rounded-lg bg-white p-12 text-center shadow-sm">
      <Package className="mx-auto mb-4 h-16 w-16 text-gray-300" />
      <h2 className="mb-2 text-2xl font-semibold text-gray-900">
        Your cart is empty
      </h2>
      <p className="mb-6 text-gray-600">
        Looks like you haven't added any items to your cart yet.
      </p>
      <button
        onClick={onHandleBack}
        className="rounded-lg bg-[#009393] px-8 py-3 font-medium text-white transition-colors hover:bg-[#007a7a]"
      >
        Start Shopping
      </button>
    </div>
  );
}

export default EmptyCart;
