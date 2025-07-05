import React, { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  MapPin,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

interface CheckoutProps {
  product?: {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  };
  onBack: () => void;
}

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Billing Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Payment Information
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

const CheckoutPage: React.FC<CheckoutProps> = ({ product, onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Personal Information
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    // Billing Address
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";

    // Payment Information
    if (!formData.cardNumber.trim())
      newErrors.cardNumber = "Card number is required";
    else if (formData.cardNumber.replace(/\s/g, "").length < 16)
      newErrors.cardNumber = "Card number is invalid";
    if (!formData.expiryDate.trim())
      newErrors.expiryDate = "Expiry date is required";
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
    else if (formData.cvv.length < 3) newErrors.cvv = "CVV is invalid";
    if (!formData.cardName.trim())
      newErrors.cardName = "Cardholder name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!product) {
      alert("No product selected");
      return;
    }

    setIsProcessing(true);

    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
      );

      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      // Create line items for Stripe Checkout
      const lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${product.quantity}x ${product.title}`,
              images: product.image ? [product.image] : [],
            },
            unit_amount: Math.round(product.price * product.quantity * 100), // Convert to cents
          },
          quantity: 1,
        },
      ];

      // Redirect to Stripe Checkout with prefilled customer info
      const { error } = await stripe.redirectToCheckout({
        mode: "payment",
        lineItems,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
        customerEmail: formData.email,
        billingAddressCollection: "required",
        shippingAddressCollection: {
          allowedCountries: ["US", "CA", "GB", "AU", "DE", "FR", "IT", "ES"],
        },
      });

      if (error) {
        console.error("Stripe checkout error:", error);
        alert(error.message || "An error occurred during checkout");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            No Product Selected
          </h2>
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg bg-[#009393] px-6 py-3 text-white transition-colors hover:bg-[#007a7a]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shopping
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = product.price * product.quantity;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Product
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="mt-2 text-gray-600">Complete your purchase securely</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
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
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone}
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
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        State *
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                        className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${
                          errors.state ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="NY"
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.state}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                        className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${
                          errors.zipCode ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="10001"
                      />
                      {errors.zipCode && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.zipCode}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Country *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
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

              {/* Payment Information */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-[#009393]" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Payment Information
                  </h2>
                  <Lock className="ml-auto h-4 w-4 text-gray-400" />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      value={formData.cardName}
                      onChange={(e) =>
                        handleInputChange("cardName", e.target.value)
                      }
                      className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${
                        errors.cardName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.cardName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.cardName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        handleInputChange(
                          "cardNumber",
                          formatCardNumber(e.target.value),
                        )
                      }
                      className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${
                        errors.cardNumber ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) =>
                          handleInputChange(
                            "expiryDate",
                            formatExpiryDate(e.target.value),
                          )
                        }
                        className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${
                          errors.expiryDate
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors.expiryDate && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) =>
                          handleInputChange(
                            "cvv",
                            e.target.value.replace(/\D/g, ""),
                          )
                        }
                        className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-[#009393] ${
                          errors.cvv ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`flex w-full items-center justify-center gap-3 rounded-lg px-6 py-4 text-lg font-semibold transition-colors ${
                    isProcessing
                      ? "cursor-not-allowed bg-gray-400"
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
                      Complete Payment - ${totalAmount.toFixed(2)}
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs text-gray-500">
                  Your payment information is secure and encrypted. Powered by
                  Stripe.
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Order Summary
              </h2>

              <div className="mb-6 flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {product.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    ${product.price.toFixed(2)} each
                  </p>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
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
