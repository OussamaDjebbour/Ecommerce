import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ArrowLeft, Lock, User, MapPin } from "lucide-react";
import { CartItemType } from "../types";
import { useCartStore } from "../store/cartStore";
import { useCheckoutProducts } from "../hooks/useCheckoutProducts";
import { useContinueShopping } from "../hooks/useContinueShopping";
import { useCartTotalSavings } from "../hooks/useCartTotalSavings";
import { useCartTotalPrice } from "../hooks/useCartTotalPrice";
import CheckoutForm from "../components/ui/CheckoutForm";
import CartItem from "../components/ui/CartItem";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const handleContinueShopping = useContinueShopping("/cart");

  const [customerInfo, setCustomerInfo] = useState<CustomerFormData | null>(
    null,
  );
  const { items, mode } = useCheckoutProducts();

  const { updateBuyNowQuantity } = useCartStore();

  const totalAmount = useCartTotalPrice(mode);
  const totalSavings = useCartTotalSavings(mode);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CustomerFormData>({
    mode: "onChange",
    defaultValues: { country: "US" },
  });

  const onCustomerInfoSubmit = (data: CustomerFormData) => {
    setCustomerInfo(data);
  };

  // Handle checkout for a single item
  // const handleCheckoutItem = (item: CartItemType) => {
  //   const { setBuyNowProduct } = useCartStore.getState();
  //   setBuyNowProduct({ ...item, quantity: item.quantity });

  //   navigate("/checkout?mode=buy-now");
  // };

  if (!items.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            No Product Selected
          </h2>
          <button
            onClick={handleContinueShopping}
            className="flex items-center gap-2 rounded-lg bg-[#009393] px-6 py-3 text-white transition-colors hover:bg-[#007a7a]"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-full min-h-screen bg-gray-50 lg:col-span-2">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <button
            onClick={handleContinueShopping}
            className="mb-4 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            Continue shopping
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="mt-2 text-gray-600">Complete your purchase securely</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            {!customerInfo ? (
              <form
                onSubmit={handleSubmit(onCustomerInfoSubmit)}
                className="space-y-8"
              >
                {/* Personal Information */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <User className="h-5 w-5 text-[#009393]" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Personal Information
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        First Name *
                      </label>
                      <input
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Last Name *
                      </label>
                      <input
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Email is invalid",
                          },
                        })}
                        className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${errors.email ? "border-red-500" : "border-gray-300"}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register("phone", {
                          required: "Phone number is required",
                        })}
                        className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#009393]" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Billing Address
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Street Address *
                      </label>
                      <input
                        {...register("address", {
                          required: "Address is required",
                        })}
                        className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${errors.address ? "border-red-500" : "border-gray-300"}`}
                        placeholder="123 Main Street"
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          City *
                        </label>
                        <input
                          {...register("city", {
                            required: "City is required",
                          })}
                          className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${errors.city ? "border-red-500" : "border-gray-300"}`}
                          placeholder="New York"
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          State *
                        </label>
                        <input
                          {...register("state", {
                            required: "State is required",
                          })}
                          className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${errors.state ? "border-red-500" : "border-gray-300"}`}
                          placeholder="NY"
                        />
                        {errors.state && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          ZIP Code *
                        </label>
                        <input
                          {...register("zipCode", {
                            required: "ZIP code is required",
                          })}
                          className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${errors.zipCode ? "border-red-500" : "border-gray-300"}`}
                          placeholder="10001"
                        />
                        {errors.zipCode && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.zipCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Country *
                      </label>
                      <select
                        {...register("country", {
                          required: "Country is required",
                        })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393]"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="IT">Italy</option>
                        <option value="ES">Spain</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <button
                    type="submit"
                    disabled={!isValid}
                    className={`w-full rounded-lg px-6 py-4 text-lg font-semibold transition-colors ${isValid ? "bg-[#009393] text-white hover:bg-[#007a7a]" : "cursor-not-allowed bg-gray-300 text-gray-500"}`}
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            ) : (
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: Math.round(totalAmount * 100),
                  currency: "usd",
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: "#009393",
                      colorBackground: "#ffffff",
                      colorText: "#1f2937",
                      colorDanger: "#ef4444",
                      fontFamily: "system-ui, sans-serif",
                      spacingUnit: "4px",
                      borderRadius: "8px",
                    },
                  },
                }}
              >
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <Lock className="h-5 w-5 text-[#009393]" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Payment Information
                    </h2>
                    <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
                      <Lock className="h-4 w-4" />
                      Secured by Stripe
                    </div>
                  </div>
                  <CheckoutForm
                    customerInfo={customerInfo}
                    items={items}
                    totalAmount={totalAmount}
                    onBack={() => setCustomerInfo(null)}
                  />
                </div>
              </Elements>
            )}
          </div>

          <div className="relative lg:col-span-6">
            <div className="sticky top-8 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Order Summary
              </h2>
              <ul className="space-y-4">
                {items?.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    className="bg-gray-50"
                    mode={mode}
                    onUpdateBuyNow={
                      mode === "buy-now" ? updateBuyNowQuantity : undefined
                    }
                  />
                ))}
              </ul>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <hr className="my-4" />

                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>You Saved</span>
                  <span className="font-bold text-[#009393]">
                    ${totalSavings.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="font-bold text-[#009393]">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-center gap-2 text-green-700">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm font-medium">Secure Checkout</span>
                </div>
                <p className="mt-1 text-xs text-green-600">
                  Your payment information is protected with 256-bit SSL
                  encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
