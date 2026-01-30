import { CheckCircle } from "lucide-react";
import { useContinueShopping } from "../hooks/useContinueShopping";

const SuccessPage = () => {
  const handleContinueShopping = useContinueShopping("");

  return (
   <div className="flex min-h-screen xl:min-h-0 items-center justify-center col-span-2 bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <CheckCircle className="mx-auto text-green-500" size={64} />

        <h1 className="mt-6 text-2xl font-semibold text-gray-800">
          Payment Successful 🎉
        </h1>

        <p className="mt-3 text-gray-600">
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>

        <button
          onClick={handleContinueShopping}
          className="mt-8 w-full rounded-xl bg-black text-white py-3 font-medium hover:bg-gray-900 transition"
        >
          Continue Shopping
        </button>

        <p className="mt-6 text-sm text-gray-400">
          A confirmation email will be sent if applicable.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
