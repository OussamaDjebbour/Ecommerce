import React, { useState } from "react";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Shield,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Share2,
  Eye,
} from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { showAddToCartToast } from "../helpers/toastHelpers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/ui/Spinner";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { fetcProductById } from "../services/fetchProductById";
import { getPriceDetails } from "../helpers/getPriceDetails";
import { useContinueShopping } from "../hooks/useContinueShopping";
import { CartItemType } from "../types";
import QuantityControl from "../components/ui/QuantityControl";
import { renderStars } from "../helpers/renderStars";

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface DummyJSONProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  // reviews: Array<{
  // rating: number;
  // comment: string;
  // date: string;
  // reviewerName: string;
  // reviewerEmail: string;
  // }>;
  // reviews: {
  //   rating: number;
  //   comment: string;
  //   date: string;
  //   reviewerName: string;
  //   reviewerEmail: string;
  // }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

// type ActiveTab = "description" | "reviews" | "specifications";

interface ActiveTab {
  id: "description" | "reviews" | "specifications";
  label: string;
}

interface ProductInfoPageProps {
  //   product: DummyJSONProduct | null;
  onBack: () => void;
  // onCheckout: (product: {
  //   id: number;
  //   title: string;
  //   price: number;
  //   image: string;
  //   quantity: number;
  // }) => void;
  // onGoToCart: () => void;
}

const ProductInfoPage: React.FC<ProductInfoPageProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<ActiveTab["id"]>("description");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  //   const cart = useCartStore((state) => state.cart);
  const getTotalItems = useCartStore((state) => state.getCartTotalItems);
  const setBuyNowProduct = useCartStore((state) => state.setBuyNowProduct);

  const { slugId } = useParams();
  const productId = Number(slugId?.split("-").pop());

  const navigate = useNavigate();

  const handleContinueShopping = useContinueShopping("/checkout", "/cart");

  console.log("productIdproductId", productId, slugId);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<DummyJSONProduct>({
    // } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetcProductById(Number(productId)),
    // staleTime: 1000 * 60 * 5, // 5 mins
    enabled: !!productId,
  });

  console.log("productproductproduct", product);

  const isFull = cart.some(
    (item) => item.id === product?.id && item.quantity + quantity > item.stock,
  );

  if (isLoading) return <Spinner />;
  //   if (isLoading) return <LoadingSpinner />;

  // if (product) {
  if (isError || !product) {
    return (
      <div className="flex justify-center pt-20">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Product Not Found
          </h2>
          <button
            onClick={handleContinueShopping}
            className="flex items-center gap-2 rounded-lg bg-[#009393] px-6 py-3 text-white transition-colors hover:bg-[#007a7a]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shopping
          </button>
        </div>
      </div>
    );
  }

  // const discountedPrice =
  //   product.price * (1 - product.discountPercentage / 100);

  const { hasDiscount, originalPrice, discountedPrice, savings } =
    getPriceDetails(product);

  const totalCartItems = getTotalItems();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const productAddedToCart: CartItemType = {
    ...product,
    quantity,
    image: product.images[selectedImage] || product.thumbnail,
    discountedPrice: discountedPrice || originalPrice,
  };

  const handleAddToCart = () => {
    const result = addToCart(productAddedToCart);
    // const result = addToCart({
    //   id: product.id,
    //   title: product.title,
    //   price: discountedPrice,
    //   image: product.images[selectedImage] || product.thumbnail,
    //   thumbnail: product.thumbnail,
    //   quantity,
    //   stock: product.stock,
    // });

    showAddToCartToast(
      result.success,
      result.message,
      product.title,
      product.images[selectedImage] || product.thumbnail,
      quantity,
    );
  };

  const handleBuyNow = () => {
    if (!product) return;

    const cartItem: CartItemType = productAddedToCart;
    // const cartItem: CartItemType = {
    //   ...product,
    //   quantity,
    //   image: product.images[selectedImage] || product.thumbnail,
    //   discountedPrice: discountedPrice || originalPrice,
    // };

    setBuyNowProduct(cartItem);

    navigate("/checkout?mode=buy-now");

    // onCheckout({
    //   id: product.id,
    //   title: product.title,
    //   price: discountedPrice,
    //   image: product.images[selectedImage] || product.thumbnail,
    //   quantity,
    // });
  };

  return (
    <div className="col-span-2 min-h-screen bg-gray-50">
      {/* Header */}

      <div className="mx-auto max-w-7xl px-4 py-4">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Go Back </span>
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src={product.images[selectedImage] || product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? "border-[#009393] ring-2 ring-[#009393] ring-opacity-30"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Brand and Category */}
            <div className="flex items-center gap-2 text-sm">
              <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
                {product.brand}
              </span>
              <span className="text-gray-400">•</span>
              <span className="capitalize text-gray-600">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">
              {product.title}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(product.rating, 6)}
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {product.rating}
              </span>
              <span className="text-gray-500">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-[#009393]">
                  ${discountedPrice.toFixed(2)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                      -{product.discountPercentage.toFixed(0)}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-600">
                {product.availabilityStatus} • {product.stock} items available
              </p>
            </div>

            <div className="flex items-center gap-4">
              <QuantityControl
                product={productAddedToCart}
                // product={product}
                mode="buy-now"
                onUpdateBuyNow={setQuantity}
              />
              <span className="text-sm text-gray-500">
                Maximum {product.stock} items
              </span>
            </div>
            {/* <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-lg border border-gray-300">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-3 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-[3rem] px-4 py-3 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="p-3 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Maximum {product.stock} items
                </span>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 rounded-xl bg-[#009393] px-6 py-4 text-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-[#007a7a]"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  // className={`rounded-lg border-2 border-[#009393] px-5 py-2 font-medium text-[#009393] transition-all duration-200 hover:scale-105 hover:bg-[#009393]`}
                  className={`flex-1 rounded-xl border-2 border-[#009393] px-6 py-4 text-lg font-semibold text-[#009393] transition-all duration-200 hover:scale-105 hover:bg-[#009393] ${isFull ? "cursor-not-allowed opacity-50 hover:scale-100 hover:bg-transparent" : "hover:text-white"}`}
                >
                  Add to Cart
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-3 transition-colors ${
                    isWishlisted
                      ? "border-red-200 bg-red-50 text-red-600"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                  <span className="font-medium">
                    {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                  </span>
                </button>

                <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50">
                  <Share2 className="h-5 w-5" />
                  <span className="font-medium">Share</span>
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 gap-4 border-t border-gray-200 pt-6 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4">
                <Truck className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Free Shipping</p>
                  <p className="text-sm text-green-700">
                    {product.shippingInformation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
                <Shield className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Warranty</p>
                  <p className="text-sm text-blue-700">
                    {product.warrantyInformation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-orange-50 p-4">
                <RotateCcw className="h-6 w-6 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-900">Returns</p>
                  <p className="text-sm text-orange-700">
                    {product.returnPolicy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: "description", label: "Description" },
                {
                  id: "reviews",
                  label: `Reviews (${product.reviews?.length || 0})`,
                },
                { id: "specifications", label: "Specifications" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab["id"])}
                  className={`px-8 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-[#009393] bg-gray-50 text-[#009393]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "description" && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    Product Description
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    {product.description}
                  </p>
                </div>

                {product.tags && product.tags.length > 0 && (
                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-gray-900">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Customer Reviews
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating, 5)}
                    </div>
                    <span className="text-lg font-semibold">
                      {product.rating} out of 5
                    </span>
                  </div>
                </div>

                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review: Review, index: number) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 pb-6 last:border-b-0"
                      >
                        <div className="mb-3 flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {review.reviewerName}
                            </h4>
                            <div className="mt-1 flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {renderStars(review.rating, 4)}
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="leading-relaxed text-gray-700">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <Eye className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                    <p className="text-gray-500">
                      No reviews yet. Be the first to review this product!
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="space-y-6">
                <h3 className="mb-6 text-2xl font-bold text-gray-900">
                  Product Specifications
                </h3>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="border-b border-gray-200 pb-2 text-lg font-semibold text-gray-900">
                      General Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Brand:</span>
                        <span className="font-medium">{product.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">SKU:</span>
                        <span className="font-medium">{product.sku}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight:</span>
                        <span className="font-medium">{product.weight} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium capitalize">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="border-b border-gray-200 pb-2 text-lg font-semibold text-gray-900">
                      Dimensions
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Width:</span>
                        <span className="font-medium">
                          {product.dimensions.width} cm
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Height:</span>
                        <span className="font-medium">
                          {product.dimensions.height} cm
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Depth:</span>
                        <span className="font-medium">
                          {product.dimensions.depth} cm
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min. Order Qty:</span>
                        <span className="font-medium">
                          {product.minimumOrderQuantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoPage;
