import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Product, CartItemType } from "../../types";
import { Eye, ShoppingCart } from "lucide-react";
import { fetchMainProduct } from "../../services/fetchMainProduct";
import { useCartStore } from "../../store/cartStore";
import {
  showAddToCartToast,
  showMaxStockToast,
  showWarningToast,
} from "../../helpers/toastHelpers";
import { getPriceDetails } from "../../helpers/getPriceDetails";
import { renderStars } from "../../helpers/renderStars";
import useNavigateToProduct from "../../hooks/useNavigateToProduct";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import QuantityControl from "./QuantityControl";
import WishlistButton from "./WishlistButton";

interface MainProductProps {
  onLoad: () => void;
}

function MainProduct({ onLoad }: MainProductProps) {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const { addToCart, setBuyNowProduct } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState<string>("");
  const navigateToProduct = useNavigateToProduct();

  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<Product>({
    queryKey: ["mainProduct"],
    queryFn: fetchMainProduct,
  });

  const isFull = cart.some(
    (item) => item.id === product?.id && item.quantity + quantity > item.stock,
  );

  const {
    hasDiscount = false,
    originalPrice = 0,
    discountedPrice = 0,
    savings = 0,
  } = product
    ? getPriceDetails(product)
    : {
        hasDiscount: false,
        originalPrice: 0,
        discountedPrice: 0,
        savings: 0,
      };

  useEffect(() => {
    if (product && !currentImage) {
      setCurrentImage(product.images?.[0] || product.thumbnail);
    }
  }, [product, currentImage]);

  useEffect(() => {
    if (isSuccess) {
      onLoad();
    }
  }, [isSuccess, onLoad]);

  const handleAddToCart = () => {
    if (!product) return;

    const quantityInCart =
      useCartStore.getState().cart.find((item) => item.id === product.id)
        ?.quantity || 0;

    if (quantityInCart + quantity <= product.stock) {
      const cartItem: CartItemType = {
        ...product,
        quantity,
        image: currentImage || product.thumbnail,
        discountedPrice: discountedPrice || originalPrice,
      };
      const result = addToCart(cartItem);
      showAddToCartToast(
        result.success,
        result.message,
        product.title,
        currentImage || product.thumbnail,
        quantity,
      );
    } else if (quantityInCart >= product.stock) {
      showMaxStockToast(product.title);
    } else {
      showWarningToast(
        `Only ${product.stock - quantityInCart} more items available`,
      );
    }
  };

  const handleBuyNow = () => {
    if (!product) return;

    const cartItem: CartItemType = {
      ...product,
      quantity,
      image: currentImage || product.thumbnail,
      discountedPrice: discountedPrice || originalPrice,
    };

    // Set buy-now product in cart store
    setBuyNowProduct(cartItem);

    navigate("/checkout?mode=buy-now");
  };

  const handleViewDetails = (product: Product) => {
    if (!product) return;

    navigateToProduct(product);
  };

  if (isLoading) return <Spinner />;

  if (!product) {
    return <ErrorMessage message="Product not found." />;
  }

  if (product.stock <= 0) {
    return <ErrorMessage message="This product is currently out of stock." />;
  }

  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="relative mx-6 mb-8 bg-white p-4 sm:mx-8 md:mx-auto md:flex md:w-full md:max-w-[45.5rem] xl:mx-0 xl:items-center xl:gap-6 xl:pb-6 xl:pl-7 xl:pr-3 xl:pt-3 2xl:max-w-[45.5rem]">
      {hasDiscount && (
        <div className="absolute right-3 top-3 z-10 animate-pulse rounded-full bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 text-xs font-bold text-white shadow-lg md:text-sm xl:-right-12 xl:-top-3 min-[1370px]:right-3 min-[1370px]:top-3">
          Save ${savings.toFixed(2)}
        </div>
      )}

      <div className="relative mb-6 xl:mb-0 xl:flex-shrink-0">
        <div className="w-full">
          <img
            src={currentImage || product?.thumbnail}
            alt={product?.title}
            className="mx-auto w-full max-w-48 xl:w-32 xl:max-w-32 2xl:w-44 2xl:max-w-44"
          />
          <div className="mt-2 flex justify-center gap-1.5">
            {product?.images?.map((image) => (
              <button
                key={image}
                onClick={() => setCurrentImage(image)}
                className={`rounded-md transition-all duration-200 ${
                  currentImage === image
                    ? "ring-2 ring-[#009393] ring-offset-2"
                    : "hover:opacity-75"
                }`}
              >
                <img
                  src={image}
                  alt={product.title}
                  className="mr-2 h-8 w-8 cursor-pointer xl:h-9 xl:w-9"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="mb-1 text-lg font-medium text-black xl:text-xl">
          {product?.title}
        </h3>

        <div className="mb-4 flex items-center gap-3">
          <div className="flex items-center gap-1">
            {renderStars(product.rating, 5)}
          </div>
          <span className="text-base font-semibold text-gray-900 xl:text-lg">
            {product.rating}
          </span>
          <span className="text-sm text-gray-500">
            ({product.reviews?.length || 0} reviews)
          </span>
        </div>

        <p className="mb-4 text-sm font-normal text-[#5C5C5C] xl:mb-[1.125rem] xl:text-xs 2xl:mr-3">
          {product?.description}
        </p>

        <div className="mb-4 flex items-center gap-2 text-base font-medium xl:mb-[1.125rem] xl:text-lg">
          <p className="text-lg xl:text-xl">
            Price{" "}
            {hasDiscount && (
              <span className="ml-0.5 font-bold text-[#009393]">
                ${discountedPrice}
              </span>
            )}
          </p>
          <span
            className={`ml-1 text-base font-normal text-[#5C5C5C] xl:text-lg ${hasDiscount && "line-through"}`}
          >
            ${originalPrice.toFixed(2)}
          </span>
        </div>

        <div className="mb-6 flex flex-row items-center justify-between gap-4 xl:mb-6 xl:gap-3 2xl:mb-8 2xl:gap-4">
          <QuantityControl
            product={{
              ...product,
              quantity,
              image: currentImage,
              discountedPrice: discountedPrice || originalPrice,
            }}
            mode="buy-now"
            onUpdateBuyNow={setQuantity}
          />
          <p className="text-sm font-bold text-[#5C5C5C] xl:text-base">
            {product.stock} <span className="font-medium">items left</span>
          </p>
        </div>

        <div className="flex flex-col gap-3 min-[500px]:flex-row sm:flex-row xl:flex-row xl:gap-3 2xl:gap-5">
          <div className="flex gap-3 xl:gap-2 2xl:gap-3">
            <button
              onClick={() => handleViewDetails(product)}
              className="group flex items-center justify-center rounded-xl border-2 border-[#009393] px-3 py-2 text-[#009393] transition-all duration-200 hover:bg-[#009393] hover:text-white xl:px-2 xl:py-2 2xl:px-4 2xl:py-3"
              title="View product details"
            >
              <Eye className="h-4 w-4 transition-transform group-hover:scale-110 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6" />
            </button>

            <WishlistButton
              product={{
                ...product,
                image: product.thumbnail,
                discountedPrice: discountedPrice || originalPrice,
              }}
              variant="icon"
              responsive
            />
          </div>

          <div className="flex flex-1 gap-3">
            <button
              onClick={handleAddToCart}
              className={`group/btn flex flex-1 items-center justify-center gap-1 rounded-lg border-2 border-[#009393] px-2 py-2 text-sm font-medium text-[#009393] transition-all duration-200 hover:scale-105 hover:bg-[#009393] xl:gap-1 xl:px-2 xl:text-xs 2xl:gap-2 2xl:px-4 2xl:text-sm ${isFull ? "cursor-not-allowed opacity-50 hover:scale-100 hover:bg-transparent" : "hover:text-white"}`}
              aria-label={`Add ${product.title} to cart`}
            >
              <ShoppingCart
                className={`h-4 w-4 transition-transform ${!isFull && "group-hover/btn:scale-110"}`}
              />
              <span className="">
                {isFull ? "Out of Stock" : "Add to Cart"}
              </span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 rounded-lg bg-[#009393] px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-[#007a7a] hover:shadow-lg xl:px-3 xl:text-xs 2xl:px-7 2xl:text-sm"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainProduct;
