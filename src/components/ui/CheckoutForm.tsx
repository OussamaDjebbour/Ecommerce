import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { ArrowLeft, Lock } from "lucide-react";
import { CheckoutItem } from "../../types";

interface CheckoutFormProps {
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  items: CheckoutItem[];
  totalAmount: number;
  onBack: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  customerInfo,
  totalAmount,
  onBack,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
          receipt_email: customerInfo.email,
          shipping: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            phone: customerInfo.phone,
            address: {
              line1: customerInfo.address,
              city: customerInfo.city,
              state: customerInfo.state,
              postal_code: customerInfo.zipCode,
              country: customerInfo.country,
            },
          },
        },
      });

      if (error) {
        setErrorMessage(error.message || "An unexpected error occurred.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Summary */}
      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 font-medium text-gray-900">Billing Information</h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            {customerInfo.firstName} {customerInfo.lastName}
          </p>
          <p>{customerInfo.email}</p>
          <p>{customerInfo.address}</p>
          <p>
            {customerInfo.city}, {customerInfo.state} {customerInfo.zipCode}
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="mt-2 text-sm text-[#009393] hover:underline"
        >
          Edit information
        </button>
      </div>

      {/* Stripe Payment Element */}
      <div className="space-y-4">
        <PaymentElement
          options={{
            layout: "tabs",
            defaultValues: {
              billingDetails: {
                name: `${customerInfo.firstName} ${customerInfo.lastName}`,
                email: customerInfo.email,
                phone: customerInfo.phone,
                address: {
                  line1: customerInfo.address,
                  city: customerInfo.city,
                  state: customerInfo.state,
                  postal_code: customerInfo.zipCode,
                  country: customerInfo.country,
                },
              },
            },
          }}
        />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`flex flex-1 items-center justify-center gap-3 rounded-lg px-6 py-3 font-semibold transition-colors ${
            isProcessing || !stripe
              ? "cursor-not-allowed bg-gray-400 text-white"
              : "bg-[#009393] text-white hover:bg-[#007a7a]"
          }`}
        >
          {isProcessing ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            <>
              <Lock className="h-5 w-5" />
              Pay ${totalAmount.toFixed(2)}
            </>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-gray-500">
        Your payment information is secure and encrypted. Powered by Stripe.
      </p>
    </form>
  );
};

export default CheckoutForm;
