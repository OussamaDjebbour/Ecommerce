// import { useEffect, useMemo, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { fetchMainProduct } from "../../services/fetchMainProduct";
// import { useCartStore } from "../../store/cartStore";
// import { Product, CartItemType } from "../../types";
// import Spinner from "./Spinner";
// import ErrorMessage from "./ErrorMessage";
// import QuantityControl from "./QuantityControl";
// import {
//   showAddToCartToast,
//   showMaxStockToast,
//   showWarningToast,
// } from "../../helpers/toastHelpers";
// import { getPriceDetails } from "../../helpers/getPriceDetails";

// interface MainProductProps {
//   onLoad: () => void;
// }

// function MainProduct({ onLoad }: MainProductProps) {
//   const navigate = useNavigate();
//   const cart = useCartStore((state) => state.cart);
//   const { addToCart } = useCartStore();
//   const [quantity, setQuantity] = useState(1);
//   const [currentImage, setCurrentImage] = useState<string>("");

//   const {
//     data: product,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useQuery<Product>({
//     queryKey: ["mainProduct"],
//     queryFn: fetchMainProduct,
//     // staleTime: 1000 * 60,
//   });

//   const isFull = cart.some(
//     (item) => item.id === product?.id && item.quantity + quantity > item.stock,
//   );

//   const {
//     hasDiscount = false,
//     originalPrice = 0,
//     discountedPrice = 0,
//     savings = 0,
//   } = product
//     ? getPriceDetails(product)
//     : {
//         hasDiscount: false,
//         originalPrice: 0,
//         discountedPrice: 0,
//         savings: 0,
//       };

//   // const {
//   //   hasDiscount = false,
//   //   originalPrice = 0,
//   //   discountedPrice = 0,
//   //   savings = 0,
//   // } = getPriceDetails(product);

//   useEffect(() => {
//     if (product && !currentImage) {
//       setCurrentImage(product.images?.[0] || product.thumbnail);
//     }
//   }, [product, currentImage]);

//   useEffect(() => {
//     if (isSuccess) {
//       onLoad();
//     }
//   }, [isSuccess, onLoad]);

//   const totalPrice = useMemo(
//     () => (product?.price || 0) * quantity,
//     [product, quantity],
//   );

//   const handleAddToCart = () => {
//     if (!product) return;

//     const quantityInCart =
//       useCartStore.getState().cart.find((item) => item.id === product.id)
//         ?.quantity || 0;

//     if (quantityInCart + quantity <= product.stock) {
//       const cartItem: CartItemType = {
//         ...product,
//         quantity,
//         image: currentImage || product.thumbnail,
//         discountedPrice: discountedPrice || originalPrice,
//       };
//       const result = addToCart(cartItem);
//       showAddToCartToast(
//         result.success,
//         result.message,
//         product.title,
//         currentImage || product.thumbnail,
//         quantity,
//       );
//     } else if (quantityInCart >= product.stock) {
//       showMaxStockToast(product.title);
//     } else {
//       showWarningToast(
//         `Only ${product.stock - quantityInCart} more items available`,
//       );
//     }
//   };

//   const handleBuyNow = () => {
//     if (!product) return;

//     const cartItem: CartItemType = {
//       ...product,
//       quantity,
//       image: currentImage || product.thumbnail,
//       discountedPrice: discountedPrice || originalPrice,
//     };
//     navigate("/checkout", {
//       state: { mode: "buy-now", product: cartItem },
//     });
//   };

//   if (isLoading) return <Spinner />;

//   if (!product) {
//     return <ErrorMessage message="Product not found." />;
//   }

//   if (product.stock <= 0) {
//     return <ErrorMessage message="This product is currently out of stock." />;
//   }

//   if (isError) return <ErrorMessage message={error.message} />;

//   return (
//     <div className="relative mb-8 flex max-w-[45.5rem] items-center gap-12 bg-white pb-6 pl-7 pr-3 pt-3">
//       {hasDiscount && (
//         <span className="absolute right-4 top-8 rounded-full bg-red-500 px-2 py-1 text-base font-medium text-white">
//           Save ${savings.toFixed(2)}
//         </span>
//       )}

//       <div className="relative">
//         <div className="carousel w-full">
//           <img
//             src={currentImage || product?.thumbnail}
//             alt={product?.title}
//             className="min-w-44 max-w-44"
//           />
//           <div className="thumbnails mt-2 flex justify-center">
//             {product?.images?.map((image: string) => (
//               <button
//                 key={image}
//                 onClick={() => setCurrentImage(image)}
//                 className={`rounded-md transition-all duration-200 ${
//                   currentImage === image
//                     ? "ring-2 ring-[#009393] ring-offset-2"
//                     : "hover:opacity-75"
//                 }`}
//               >
//                 <img
//                   src={image}
//                   alt={product.title}
//                   className="mr-2 w-12 cursor-pointer"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div>
//         <h3 className="mb-1 text-xl font-medium text-black">
//           {product?.title}
//         </h3>
//         <div className="mb-4 flex gap-2">
//           {[...Array(5)].map((_, index) => (
//             <svg
//               key={index}
//               className={`h-6 w-6 ${
//                 index < (product?.rating || 0)
//                   ? "text-yellow-400"
//                   : "text-gray-300"
//               }`}
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               {/* <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 0 00-1.175 0l-2.8 2.0c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /> */}
//             </svg>
//           ))}
//           <span className="text-sm font-normal text-[#5C5C5C]">
//             ({Math.round((product?.rating || 0) * 100)} Reviews)
//           </span>
//         </div>
//         <p className="mb-[1.125rem] mr-3 text-xs font-normal text-[#5C5C5C]">
//           {product?.description}
//         </p>
//         <div className="mb-[1.125rem] flex items-center gap-2 text-lg font-medium">
//           <p className="text-xl">
//             Price{" "}
//             {hasDiscount && (
//               <span className="ml-0.5 font-bold text-[#009393]">
//                 ${discountedPrice}
//               </span>
//             )}
//           </p>

//           <span
//             className={`ml-1 text-lg font-normal text-[#5C5C5C] ${hasDiscount && "line-through"}`}
//           >
//             ${originalPrice.toFixed(2)}
//           </span>
//         </div>

//         <div className="mb-8 flex justify-between">
//           <QuantityControl
//             product={{
//               ...product,
//               quantity,
//               image: currentImage,
//               discountedPrice: discountedPrice || originalPrice,
//             }}
//             mode="buy-now"
//             onUpdateBuyNow={setQuantity}
//             onRemoveBuyNow={() => setQuantity(1)}
//           />
//           <p className="text-base font-bold text-[#5C5C5C]">
//             {product.stock} <span className="font-medium">items left</span>
//           </p>
//         </div>

//         {/* <div className="mb-8 flex justify-between">
//           <QuantityControl
//             product={product && product}
//             mode="buy-now"
//             onUpdateBuyNow={setQuantity}
//             onRemoveBuyNow={() => setQuantity(1)}
//           />
//           <p className="text-base font-bold text-[#5C5C5C]">
//             {product?.stock} <span className="font-medium">items left</span>
//           </p>
//         </div> */}
//         <div className="flex gap-5">
//           <button className="rounded-xl border-2 border-[#009393] px-4 py-3">
//             <img src="images/fi-sr-heart.png" alt="Heart Icon" />
//           </button>
//           <button
//             className={`w-[8.125rem] rounded-lg border-2 border-[#009393] py-2 font-medium text-[#009393] ${isFull && "cursor-not-allowed opacity-50"}`}
//             onClick={handleAddToCart}
//           >
//             Add to cart
//           </button>
//           <button
//             onClick={handleBuyNow}
//             className={`w-[8.125rem] rounded-lg bg-[#009393] py-2 font-medium text-white`}
//           >
//             Buy now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainProduct;

// import { useEffect, useMemo, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { fetchMainProduct } from "../../services/fetchMainProduct";
// import { useCartStore } from "../../store/cartStore";
// import { Product, CartItemType } from "../../types";
// import Spinner from "./Spinner";
// import ErrorMessage from "./ErrorMessage";
// import QuantityControl from "./QuantityControl";
// import {
//   showAddToCartToast,
//   showMaxStockToast,
//   showWarningToast,
// } from "../../helpers/toastHelpers";
// import { getPriceDetails } from "../../helpers/getPriceDetails";
// import { useWishlistStore } from "../../store/wishlistStore";

// interface MainProductProps {
//   onLoad: () => void;
// }

// function MainProduct({ onLoad }: MainProductProps) {
//   const navigate = useNavigate();
//   const cart = useCartStore((state) => state.cart);
//   const { addToCart, setBuyNowProduct } = useCartStore();
//   const { addToWishlist } = useWishlistStore();
//   const [quantity, setQuantity] = useState(1);
//   const [currentImage, setCurrentImage] = useState<string>("");

//   const {
//     data: product,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useQuery<Product>({
//     queryKey: ["mainProduct"],
//     queryFn: fetchMainProduct,
//   });

//   const isFull = cart.some(
//     (item) => item.id === product?.id && item.quantity + quantity > item.stock,
//   );

//   const {
//     hasDiscount = false,
//     originalPrice = 0,
//     discountedPrice = 0,
//     savings = 0,
//   } = product
//     ? getPriceDetails(product)
//     : {
//         hasDiscount: false,
//         originalPrice: 0,
//         discountedPrice: 0,
//         savings: 0,
//       };

//   useEffect(() => {
//     if (product && !currentImage) {
//       setCurrentImage(product.images?.[0] || product.thumbnail);
//     }
//   }, [product, currentImage]);

//   useEffect(() => {
//     if (isSuccess) {
//       onLoad();
//     }
//   }, [isSuccess, onLoad]);

//   const totalPrice = useMemo(
//     () => (product?.price || 0) * quantity,
//     [product, quantity],
//   );

//   const handleAddToCart = () => {
//     if (!product) return;

//     const quantityInCart =
//       useCartStore.getState().cart.find((item) => item.id === product.id)
//         ?.quantity || 0;

//     if (quantityInCart + quantity <= product.stock) {
//       const cartItem: CartItemType = {
//         ...product,
//         quantity,
//         image: currentImage || product.thumbnail,
//         discountedPrice: discountedPrice || originalPrice,
//       };
//       const result = addToCart(cartItem);
//       showAddToCartToast(
//         result.success,
//         result.message,
//         product.title,
//         currentImage || product.thumbnail,
//         quantity,
//       );
//     } else if (quantityInCart >= product.stock) {
//       showMaxStockToast(product.title);
//     } else {
//       showWarningToast(
//         `Only ${product.stock - quantityInCart} more items available`,
//       );
//     }
//   };

//   const handleBuyNow = () => {
//     if (!product) return;

//     const cartItem: CartItemType = {
//       ...product,
//       quantity,
//       image: currentImage || product.thumbnail,
//       discountedPrice: discountedPrice || originalPrice,
//     };

//     setBuyNowProduct(cartItem);

//     navigate("/checkout?mode=buy-now");
//   };

//   const handleAddToWishlist = () => {
//     if (!product) return;
//     const wishlistItem: CartItemType = {
//       ...product,
//       quantity: 1, // Default quantity for wishlist
//       image: currentImage || product.thumbnail,
//       discountedPrice: discountedPrice || originalPrice,
//     };
//     addToWishlist(wishlistItem); // Hypothetical action

//     // showAddToCartToast(`${product.title} added to wishlist!`);
//   };

//   if (isLoading) return <Spinner />;

//   if (!product) {
//     return <ErrorMessage message="Product not found." />;
//   }

//   if (product.stock <= 0) {
//     return <ErrorMessage message="This product is currently out of stock." />;
//   }

//   if (isError) return <ErrorMessage message={error.message} />;

//   return (
//     <div className="relative mb-8 flex max-w-[45.5rem] items-center gap-12 bg-white pb-6 pl-7 pr-3 pt-3">
//       {hasDiscount && (
//         <span className="absolute right-4 top-8 rounded-full bg-red-500 px-2 py-1 text-base font-medium text-white">
//           Save ${savings.toFixed(2)}
//         </span>
//       )}

//       <div className="relative">
//         <div className="carousel w-full">
//           <img
//             src={currentImage || product?.thumbnail}
//             alt={product?.title}
//             className="min-w-44 max-w-44"
//           />
//           <div className="thumbnails mt-2 flex justify-center">
//             {product?.images?.map((image: string) => (
//               <button
//                 key={image}
//                 onClick={() => setCurrentImage(image)}
//                 className={`rounded-md transition-all duration-200 ${
//                   currentImage === image
//                     ? "ring-2 ring-[#009393] ring-offset-2"
//                     : "hover:opacity-75"
//                 }`}
//               >
//                 <img
//                   src={image}
//                   alt={product.title}
//                   className="mr-2 w-12 cursor-pointer"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div>
//         <h3 className="mb-1 text-xl font-medium text-black">
//           {product?.title}
//         </h3>
//         <div className="mb-4 flex gap-2">
//           {[...Array(5)].map((_, index) => (
//             <svg
//               key={index}
//               className={`h-6 w-6 ${
//                 index < (product?.rating || 0)
//                   ? "text-yellow-400"
//                   : "text-gray-300"
//               }`}
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//           ))}
//           <span className="text-sm font-normal text-[#5C5C5C]">
//             ({Math.round((product?.rating || 0) * 100)} Reviews)
//           </span>
//         </div>
//         <p className="mb-[1.125rem] mr-3 text-xs font-normal text-[#5C5C5C]">
//           {product?.description}
//         </p>
//         <div className="mb-[1.125rem] flex items-center gap-2 text-lg font-medium">
//           <p className="text-xl">
//             Price{" "}
//             {hasDiscount && (
//               <span className="ml-0.5 font-bold text-[#009393]">
//                 ${discountedPrice}
//               </span>
//             )}
//           </p>

//           <span
//             className={`ml-1 text-lg font-normal text-[#5C5C5C] ${hasDiscount && "line-through"}`}
//           >
//             ${originalPrice.toFixed(2)}
//           </span>
//         </div>

//         <div className="mb-8 flex justify-between">
//           <QuantityControl
//             product={{
//               ...product,
//               quantity,
//               image: currentImage,
//               discountedPrice: discountedPrice || originalPrice,
//             }}
//             mode="buy-now"
//             onUpdateBuyNow={setQuantity}
//             onRemoveBuyNow={() => setQuantity(1)}
//           />
//           <p className="text-base font-bold text-[#5C5C5C]">
//             {product.stock} <span className="font-medium">items left</span>
//           </p>
//         </div>

//         <div className="flex gap-5">
//           <button
//             className="rounded-xl border-2 border-[#009393] px-4 py-3"
//             onClick={handleAddToWishlist}
//           >
//             <img src="images/fi-sr-heart.png" alt="Heart Icon" />
//           </button>
//           <button
//             className={`w-[8.125rem] rounded-lg border-2 border-[#009393] py-2 font-medium text-[#009393] ${isFull && "cursor-not-allowed opacity-50"}`}
//             onClick={handleAddToCart}
//           >
//             Add to cart
//           </button>
//           <button
//             onClick={handleBuyNow}
//             className={`w-[8.125rem] rounded-lg bg-[#009393] py-2 font-medium text-white`}
//           >
//             Buy now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainProduct;

// import { useEffect, useMemo, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { Eye } from "lucide-react";
// import { fetchMainProduct } from "../../services/fetchMainProduct";
// import { useCartStore } from "../../store/cartStore";
// import { Product, CartItemType } from "../../types";
// import Spinner from "./Spinner";
// import ErrorMessage from "./ErrorMessage";
// import QuantityControl from "./QuantityControl";
// import {
//   showAddToCartToast,
//   showMaxStockToast,
//   showWarningToast,
// } from "../../helpers/toastHelpers";
// import { getPriceDetails } from "../../helpers/getPriceDetails";

// interface MainProductProps {
//   onLoad: () => void;
// }

// function MainProduct({ onLoad }: MainProductProps) {
//   const navigate = useNavigate();
//   const cart = useCartStore((state) => state.cart);
//   const { addToCart, setBuyNowProduct } = useCartStore();
//   const [quantity, setQuantity] = useState(1);
//   const [currentImage, setCurrentImage] = useState<string>("");

//   const {
//     data: product,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useQuery<Product>({
//     queryKey: ["mainProduct"],
//     queryFn: fetchMainProduct,
//   });

//   const isFull = cart.some(
//     (item) => item.id === product?.id && item.quantity + quantity > item.stock,
//   );

//   const {
//     hasDiscount = false,
//     originalPrice = 0,
//     discountedPrice = 0,
//     savings = 0,
//   } = product
//     ? getPriceDetails(product)
//     : {
//         hasDiscount: false,
//         originalPrice: 0,
//         discountedPrice: 0,
//         savings: 0,
//       };

//   useEffect(() => {
//     if (product && !currentImage) {
//       setCurrentImage(product.images?.[0] || product.thumbnail);
//     }
//   }, [product, currentImage]);

//   useEffect(() => {
//     if (isSuccess) {
//       onLoad();
//     }
//   }, [isSuccess, onLoad]);

//   const totalPrice = useMemo(
//     () => (product?.price || 0) * quantity,
//     [product, quantity],
//   );

//   const handleAddToCart = () => {
//     if (!product) return;

//     const quantityInCart =
//       useCartStore.getState().cart.find((item) => item.id === product.id)
//         ?.quantity || 0;

//     if (quantityInCart + quantity <= product.stock) {
//       const cartItem: CartItemType = {
//         ...product,
//         quantity,
//         image: currentImage || product.thumbnail,
//         discountedPrice: discountedPrice || originalPrice,
//       };
//       const result = addToCart(cartItem);
//       showAddToCartToast(
//         result.success,
//         result.message,
//         product.title,
//         currentImage || product.thumbnail,
//         quantity,
//       );
//     } else if (quantityInCart >= product.stock) {
//       showMaxStockToast(product.title);
//     } else {
//       showWarningToast(
//         `Only ${product.stock - quantityInCart} more items available`,
//       );
//     }
//   };

//   const handleBuyNow = () => {
//     if (!product) return;

//     const cartItem: CartItemType = {
//       ...product,
//       quantity,
//       image: currentImage || product.thumbnail,
//       discountedPrice: discountedPrice || originalPrice,
//     };

//     // Set buy-now product in cart store
//     setBuyNowProduct(cartItem);

//     // Navigate with URL parameter
//     navigate("/checkout?mode=buy-now");
//   };

//   const handleViewDetails = () => {
//     if (!product) return;
//     navigate(`/product/${product.id}`);
//   };
//   if (isLoading) return <Spinner />;

//   if (!product) {
//     return <ErrorMessage message="Product not found." />;
//   }

//   if (product.stock <= 0) {
//     return <ErrorMessage message="This product is currently out of stock." />;
//   }

//   if (isError) return <ErrorMessage message={error.message} />;

//   return (
//     <div className="relative mb-8 flex max-w-[45.5rem] items-center gap-12 bg-white pb-6 pl-7 pr-3 pt-3">
//       {hasDiscount && (
//         <span className="absolute right-4 top-8 rounded-full bg-red-500 px-2 py-1 text-base font-medium text-white">
//           Save ${savings.toFixed(2)}
//         </span>
//       )}

//       <div className="group relative">
//         <div className="carousel w-full">
//           <img
//             src={currentImage || product?.thumbnail}
//             alt={product?.title}
//             className="min-w-44 max-w-44"
//           />

//           {/* View Info Button */}
//           <button
//             onClick={() => navigate(`/product/${product.title}-${product.id}`)} // or use slugify + navigateToProduct
//             title="View product details"
//             className="absolute right-1 top-1 hidden rounded-full bg-white/90 p-1 text-[#009393] shadow-md transition-all hover:bg-[#009393] hover:text-white group-hover:block"
//           >
//             <Eye className="h-5 w-5" />
//           </button>
//           <div className="thumbnails mt-2 flex justify-center">
//             {product?.images?.map((image: string) => (
//               <button
//                 key={image}
//                 onClick={() => setCurrentImage(image)}
//                 className={`rounded-md transition-all duration-200 ${
//                   currentImage === image
//                     ? "ring-2 ring-[#009393] ring-offset-2"
//                     : "hover:opacity-75"
//                 }`}
//               >
//                 <img
//                   src={image}
//                   alt={product.title}
//                   className="mr-2 w-12 cursor-pointer"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div>
//         <h3 className="mb-1 text-xl font-medium text-black">
//           {product?.title}
//         </h3>

//         {/* View Details Button - positioned elegantly next to the title */}
//         <div className="mb-4 flex items-center justify-between">
//           <div className="flex gap-2">
//             {[...Array(5)].map((_, index) => (
//               <svg
//                 key={index}
//                 className={`h-6 w-6 ${
//                   index < (product?.rating || 0)
//                     ? "text-yellow-400"
//                     : "text-gray-300"
//                 }`}
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//             ))}
//             <span className="text-sm font-normal text-[#5C5C5C]">
//               ({Math.round((product?.rating || 0) * 100)} Reviews)
//             </span>
//           </div>

//           <button
//             onClick={handleViewDetails}
//             className="group flex items-center gap-2 rounded-lg border border-[#009393] px-3 py-1.5 text-sm font-medium text-[#009393] transition-all duration-200 hover:bg-[#009393] hover:text-white"
//             title="View product details"
//           >
//             <Eye className="h-4 w-4 transition-transform group-hover:scale-110" />
//             <span>Details</span>
//           </button>
//         </div>

//         <p className="mb-[1.125rem] mr-3 text-xs font-normal text-[#5C5C5C]">
//           {product?.description}
//         </p>
//         <div className="mb-[1.125rem] flex items-center gap-2 text-lg font-medium">
//           <p className="text-xl">
//             Price{" "}
//             {hasDiscount && (
//               <span className="ml-0.5 font-bold text-[#009393]">
//                 ${discountedPrice}
//               </span>
//             )}
//           </p>

//           <span
//             className={`ml-1 text-lg font-normal text-[#5C5C5C] ${hasDiscount && "line-through"}`}
//           >
//             ${originalPrice.toFixed(2)}
//           </span>
//         </div>

//         <div className="mb-8 flex justify-between">
//           <QuantityControl
//             product={{
//               ...product,
//               quantity,
//               image: currentImage,
//               discountedPrice: discountedPrice || originalPrice,
//             }}
//             mode="buy-now"
//             onUpdateBuyNow={setQuantity}
//             onRemoveBuyNow={() => setQuantity(1)}
//           />
//           <p className="text-base font-bold text-[#5C5C5C]">
//             {product.stock} <span className="font-medium">items left</span>
//           </p>
//         </div>

//         {/* <div className="flex gap-5">
//           <button className="rounded-xl border-2 border-[#009393] px-4 py-3">
//             <img src="images/fi-sr-heart.png" alt="Heart Icon" />
//           </button>
//           <button
//             className={`w-[8.125rem] rounded-lg border-2 border-[#009393] py-2 font-medium text-[#009393] ${isFull && "cursor-not-allowed opacity-50"}`}
//             onClick={handleAddToCart}
//           >
//             Add to cart
//           </button>
//           <button
//             onClick={handleBuyNow}
//             className={`w-[8.125rem] rounded-lg bg-[#009393] py-2 font-medium text-white`}
//           >
//             Buy now
//           </button>
//         </div> */}

//         <div className="flex gap-4">
//           {/* Favorite */}
//           <button className="rounded-xl border-2 border-[#009393] px-4 py-3">
//             <img src="images/fi-sr-heart.png" alt="Heart Icon" />
//           </button>

//           {/* Add to cart */}
//           <button
//             className={`rounded-lg border-2 border-[#009393] px-4 py-2 font-medium text-[#009393] ${
//               isFull && "cursor-not-allowed opacity-50"
//             }`}
//             // className={`w-[8.125rem] rounded-lg border-2 border-[#009393] py-2 font-medium text-[#009393] ${
//             //   isFull && "cursor-not-allowed opacity-50"
//             // }`}
//             onClick={handleAddToCart}
//           >
//             Add to cart
//           </button>

//           {/* View Details */}
//           {/* <button
//             onClick={() =>
//               navigate(`/product/${slugify(product.title)}-${product.id}`)
//             }
//             className="w-[8.125rem] rounded-lg border-2 border-gray-300 py-2 font-medium text-gray-700 transition-colors hover:border-[#009393] hover:text-[#009393]"
//           >
//             <div className="flex items-center justify-center gap-1">
//               <Eye className="h-4 w-4" />
//               View
//             </div>
//           </button> */}

//           <button
//             onClick={handleViewDetails}
//             className="group flex items-center gap-2 rounded-lg border border-[#009393] px-3 py-1.5 text-sm font-medium text-[#009393] transition-all duration-200 hover:bg-[#009393] hover:text-white"
//             title="View product details"
//           >
//             <Eye className="h-4 w-4 transition-transform group-hover:scale-110" />
//             <span>Details</span>
//           </button>

//           {/* Buy now */}
//           <button
//             onClick={handleBuyNow}
//             className="rounded-lg bg-[#009393] px-6 py-2 font-medium text-white"
//             // className="w-[8.125rem] rounded-lg bg-[#009393] py-2 font-medium text-white"
//           >
//             Buy now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainProduct;

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { fetchMainProduct } from "../../services/fetchMainProduct";
import { useCartStore } from "../../store/cartStore";
import { Product, CartItemType } from "../../types";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import QuantityControl from "./QuantityControl";
import {
  showAddToCartToast,
  showMaxStockToast,
  showWarningToast,
} from "../../helpers/toastHelpers";
import { getPriceDetails } from "../../helpers/getPriceDetails";
import useNavigateToProduct from "../../hooks/useNavigateToProduct";
import { renderStars } from "../../helpers/renderStars";

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

  const totalPrice = useMemo(
    () => (product?.price || 0) * quantity,
    [product, quantity],
  );

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

    // Navigate with URL parameter
    navigate("/checkout?mode=buy-now");
  };

  const handleViewDetails = (product: Product) => {
    if (!product) return;

    navigateToProduct(product);

    // navigate(`/product/${product.id}`);
  };
  if (isLoading) return <Spinner />;

  if (!product) {
    return <ErrorMessage message="Product not found." />;
  }

  if (product.stock <= 0) {
    return <ErrorMessage message="This product is currently out of stock." />;
  }

  if (isError) return <ErrorMessage message={error.message} />;

  // return (
  //   // <div className="relative mx-auto mb-8 bg-white p-4 xl:mx-0 xl:mt-20 xl:flex xl:w-full xl:max-w-none xl:items-center xl:gap-6 xl:pb-6 xl:pl-7 xl:pr-3 xl:pt-3 2xl:max-w-[45.5rem] 2xl:gap-12">
  //   <div className="min-w-md relative mx-auto mb-8 mt-20 flex max-w-[45.5rem] items-center gap-12 bg-white pb-6 pl-7 pr-3 pt-3 lg:mx-0 lg:mt-0">
  //     {hasDiscount && (
  //       // <div className="absolute right-4 top-8 rounded-full bg-red-500 px-2 py-1 text-base font-medium text-white">
  //       <div className="absolute right-3 top-3 z-10 animate-pulse rounded-full bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 text-xs font-bold text-white shadow-lg md:text-sm">
  //         Save ${savings.toFixed(2)}
  //       </div>
  //     )}

  //     <div className="relative">
  //       <div className="carousel w-full">
  //         <img
  //           src={currentImage || product?.thumbnail}
  //           alt={product?.title}
  //           className="max-w-32 md:min-w-44 md:max-w-44"
  //         />
  //         <div className="thumbnails mt-2 flex justify-center">
  //           {product?.images?.map((image: string) => (
  //             <button
  //               key={image}
  //               onClick={() => setCurrentImage(image)}
  //               className={`rounded-md transition-all duration-200 ${
  //                 currentImage === image
  //                   ? "ring-2 ring-[#009393] ring-offset-2"
  //                   : "hover:opacity-75"
  //               }`}
  //             >
  //               <img
  //                 src={image}
  //                 alt={product.title}
  //                 className="mr-2 w-12 cursor-pointer"
  //               />
  //             </button>
  //           ))}
  //         </div>
  //       </div>
  //     </div>

  //     <div>
  //       <h3 className="mb-1 text-xl font-medium text-black">
  //         {product?.title}
  //       </h3>

  //       <div className="mb-4 flex items-center gap-3">
  //         {/* {[...Array(5)].map((_, index) => (
  //           <svg
  //             key={index}
  //             className={`h-6 w-6 ${
  //               index < Math.floor(product?.rating)
  //                 ? "fill-current text-yellow-400"
  //                 : index < product?.rating
  //                   ? "fill-current text-yellow-400 opacity-50"
  //                   : "text-gray-300"
  //               // index < (product?.rating || 0)
  //               //   ? "text-yellow-400"
  //               //   : "text-gray-300"
  //             }`}
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //           >
  //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  //           </svg>
  //         ))} */}
  //         <div className="flex items-center gap-1">
  //           {renderStars(product.rating, 5)}
  //         </div>
  //         <span className="text-lg font-semibold text-gray-900">
  //           {product.rating}
  //         </span>

  //         <span className="text-sm text-gray-500">
  //           {/* ({Math.round((product?.rating || 0) * 100)} Reviews) */}(
  //           {product.reviews?.length || 0} reviews)
  //         </span>
  //       </div>

  //       <p className="mb-[1.125rem] mr-3 text-xs font-normal text-[#5C5C5C]">
  //         {product?.description}
  //       </p>
  //       <div className="mb-[1.125rem] flex items-center gap-2 text-lg font-medium">
  //         <p className="text-xl">
  //           Price{" "}
  //           {hasDiscount && (
  //             <span className="ml-0.5 font-bold text-[#009393]">
  //               ${discountedPrice}
  //             </span>
  //           )}
  //         </p>

  //         <span
  //           className={`ml-1 text-lg font-normal text-[#5C5C5C] ${hasDiscount && "line-through"}`}
  //         >
  //           ${originalPrice.toFixed(2)}
  //         </span>
  //       </div>

  //       <div className="mb-8 flex justify-between">
  //         <QuantityControl
  //           product={{
  //             ...product,
  //             quantity,
  //             image: currentImage,
  //             discountedPrice: discountedPrice || originalPrice,
  //           }}
  //           mode="buy-now"
  //           onUpdateBuyNow={setQuantity}
  //           onRemoveBuyNow={() => setQuantity(1)}
  //         />
  //         <p className="text-base font-bold text-[#5C5C5C]">
  //           {product.stock} <span className="font-medium">items left</span>
  //         </p>
  //       </div>

  //       {/* <div className="flex gap-5">
  //         <button
  //           onClick={() => handleViewDetails(product)}
  //           className="group flex items-center justify-center rounded-xl border-2 border-[#009393] px-4 py-3 text-[#009393] transition-all duration-200 hover:bg-[#009393] hover:text-white"
  //           title="View product details"
  //         >
  //           <Eye className="h-5 w-5 transition-transform group-hover:scale-110" />
  //         </button>
  //         <button
  //           title="Add product to Wishlist"
  //           className="rounded-xl border-2 border-[#009393] px-4 py-3"
  //         >
  //           <img src="images/fi-sr-heart.png" alt="Heart Icon" />
  //         </button>
  //         <button
  //           className={`w-[8.125rem] rounded-lg border-2 border-[#009393] py-2 font-medium text-[#009393] ${isFull && "cursor-not-allowed opacity-50"}`}
  //           onClick={handleAddToCart}
  //         >
  //           Add to cart
  //         </button>
  //         <button
  //           onClick={handleBuyNow}
  //           className={`w-[8.125rem] rounded-lg bg-[#009393] py-2 font-medium text-white`}
  //         >
  //           Buy now
  //         </button>
  //       </div> */}
  //       <div className="flex gap-5">
  //         <button
  //           onClick={() => handleViewDetails(product)}
  //           className="group flex items-center justify-center rounded-xl border-2 border-[#009393] px-4 py-3 text-[#009393] transition-all duration-200 hover:bg-[#009393] hover:text-white"
  //           title="View product details"
  //         >
  //           <Eye className="h-6 w-6 transition-transform group-hover:scale-110" />
  //         </button>
  //         <button className="group flex items-center justify-center rounded-xl border-2 border-[#009393] px-4 py-3 text-[#009393] transition-all duration-200 hover:bg-[#009393] hover:text-white">
  //           <Heart className="h-6 w-6 transition-transform group-hover:scale-110 group-hover:fill-current" />
  //         </button>
  //         <button
  //           className={`group/btn flex items-center justify-center gap-2 rounded-lg border-2 border-[#009393] px-4 py-2 font-medium text-[#009393] transition-all duration-200 hover:scale-105 hover:bg-[#009393] ${isFull ? "cursor-not-allowed opacity-50 hover:scale-100 hover:bg-transparent" : "hover:text-white"}`}
  //           onClick={handleAddToCart}
  //           aria-label={`Add ${product.title} to cart`}
  //         >
  //           <ShoppingCart
  //             className={`h-4 w-4 transition-transform ${!isFull && "group-hover/btn:scale-110"}`}
  //           />
  //           {isFull ? "Out of Stock" : "Add to Cart"}
  //         </button>
  //         <button
  //           className="rounded-lg bg-[#009393] px-7 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-[#007a7a] hover:shadow-lg"
  //           onClick={handleBuyNow}
  //         >
  //           Buy now
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="relative mx-6 mb-8 bg-white p-4 sm:mx-8 md:mx-auto md:flex md:w-full md:max-w-[45.5rem] xl:mx-0 xl:items-center xl:gap-6 xl:pb-6 xl:pl-7 xl:pr-3 xl:pt-3 2xl:max-w-[45.5rem]">
      {/* <div className="min-w-md relative mx-auto mb-8 mt-20 flex max-w-[45.5rem] items-center gap-12 bg-white pb-6 pl-7 pr-3 pt-3 lg:mx-0 lg:mt-0"> */}
      {hasDiscount && (
        <div className="absolute right-3 top-3 z-10 animate-pulse rounded-full bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 text-xs font-bold text-white shadow-lg md:text-sm xl:-right-12 xl:-top-3 min-[1370px]:right-3 min-[1370px]:top-3">
          Save ${savings.toFixed(2)}
        </div>
      )}

      {/* <div className="relative "> */}
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
                  // className="flex-1"
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
          {/* <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:justify-between xl:mb-6 xl:flex-col xl:gap-3 2xl:mb-8 2xl:flex-row 2xl:gap-4"> */}
          <QuantityControl
            product={{
              ...product,
              quantity,
              image: currentImage,
              discountedPrice: discountedPrice || originalPrice,
            }}
            mode="buy-now"
            onUpdateBuyNow={setQuantity}
            onRemoveBuyNow={() => setQuantity(1)}
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
            <button className="group flex items-center justify-center rounded-xl border-2 border-[#009393] px-3 py-2 text-[#009393] transition-all duration-200 hover:bg-[#009393] hover:text-white xl:px-2 xl:py-2 2xl:px-4 2xl:py-3">
              <Heart className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:fill-current xl:h-5 xl:w-5 2xl:h-6 2xl:w-6" />
            </button>
          </div>

          <div className="flex flex-1 gap-3">
            <button
              className={`group/btn flex flex-1 items-center justify-center gap-1 rounded-lg border-2 border-[#009393] px-2 py-2 text-sm font-medium text-[#009393] transition-all duration-200 hover:scale-105 hover:bg-[#009393] xl:gap-1 xl:px-2 xl:text-xs 2xl:gap-2 2xl:px-4 2xl:text-sm ${isFull ? "cursor-not-allowed opacity-50 hover:scale-100 hover:bg-transparent" : "hover:text-white"}`}
              onClick={handleAddToCart}
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
              className="flex-1 rounded-lg bg-[#009393] px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-[#007a7a] hover:shadow-lg xl:px-3 xl:text-xs 2xl:px-7 2xl:text-sm"
              onClick={handleBuyNow}
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
