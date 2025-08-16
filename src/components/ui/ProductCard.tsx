// import React from "react";
// import { useCartStore } from "../../store/cartStore";
// import {
//   showAddToCartToast,
//   showMaxStockToast,
// } from "../../helpers/toastHelpers";
// import { useNavigate } from "react-router-dom";
// import { useQueryClient } from "@tanstack/react-query";
// import { slugify } from "../../helpers/slugify";
// import { CartItemType, Product } from "src/types";
// import useNavigateToProduct from "../../hooks/useNavigateToProduct";
// import { getPriceDetails } from "../../helpers/getPriceDetails";

// interface ProductCardProps {
//   product: Product;
//   id: number;
//   imgSrc: string;
//   title: string;
//   price: number;
//   rating: number;
//   stock: number;
// }

// const ProductCard: React.FC<ProductCardProps> = ({
//   product,
//   id,
//   imgSrc,
//   title,
//   price,
//   rating,
//   stock,
// }) => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   console.log("product", product);

//   const addToCart = useCartStore((state) => state.addToCart);
//   const cart = useCartStore((state) => state.cart);
//   const quantity = cart.find((item) => item.id === id)?.quantity || 0;
//   const isFull = cart.some(
//     (item) => item.id === id && item.quantity === item.stock,
//   );

//   const navigateToProduct = useNavigateToProduct();

//   const { originalPrice, discountedPrice, hasDiscount, savings } =
//     getPriceDetails(product);

//   console.log("originalPrice,discountedPrice", originalPrice, discountedPrice);
//   const handleProductClick = () => {
//     // Store product in React Query's cache by ID
//     queryClient.setQueryData(["product", id], product);
//     // queryClient.setQueryData(["product", id], product);

//     // Navigate with SEO-friendly slug
//     const slug = slugify(title);
//     console.log("idididid", id, slug);
//     navigate(`/product/${slug}-${id}`);
//   };

//   const handleAddToCart = (event: React.MouseEvent) => {
//     event.stopPropagation();
//     // const result = addToCart({
//     //   title,
//     //   price,
//     //   id,
//     //   image: imgSrc,
//     //   quantity: 1,
//     //   stock: stock,
//     // });
//     const result = addToCart({
//       ...product,
//       quantity: 1,
//       image: product.thumbnail,
//       // price: originalPrice,
//       discountedPrice: discountedPrice || originalPrice,
//     });

//     if (quantity < stock) {
//       showAddToCartToast(result.success, result.message, title, imgSrc, 1);
//     } else {
//       showMaxStockToast(title);
//     }
//   };

//   return (
//     <div
//       // onClick={handleProductClick}
//       onClick={() => navigateToProduct(product)}
//       // className="flex min-w-48 max-w-80 cursor-pointer flex-col rounded-xl bg-white p-4 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg"
//       role="link"
//       tabIndex={0}
//       onKeyDown={(e) => e.key === "Enter" && handleProductClick()}
//       aria-label={`View details for ${product.title}`}
//       className="min-w-48 max-w-80 flex-1 cursor-pointer rounded-xl bg-white px-2.5 pb-2.5 pt-2.5 shadow-md duration-200 hover:scale-105 hover:shadow-md hover:ease-in"
//     >
//       <div className="relative mb-4">
//         <img
//           src={product.thumbnail}
//           alt={product.title}
//           className="mx-auto w-2/3 rounded-md object-cover"
//           loading="lazy"
//         />
//         {hasDiscount && (
//           <span className="absolute right-0 top-0 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
//             Save ${savings.toFixed(2)}
//           </span>
//         )}
//       </div>

//       {/* <img className="mx-auto mb-4 w-2/3" src={imgSrc} alt={title} /> */}

//       <h4
//         title={title}
//         className="mb-1 max-w-full truncate font-openSans text-sm font-semibold text-black"
//       >
//         {title}
//       </h4>

//       <div className="mb-3 flex items-center gap-2">
//         <span className="text-lg font-bold text-[#009393]">
//           ${discountedPrice.toFixed(2)}
//         </span>
//         {hasDiscount && (
//           <span
//             className={`text-sm text-gray-500 ${hasDiscount && "line-through"}`}
//           >
//             ${originalPrice.toFixed(2)}
//           </span>
//         )}
//       </div>
//       {/* <span className="mb-1 text-sm font-semibold text-[#5C5C5C]">
//         Price {discountedPrice}
//       </span> */}

//       <div className="flex items-center gap-2">
//         <img src="images/Rating_Icon_Green.png" alt="Rating" />
//         <span className="font-roboto text-sm font-medium text-[#00E0C6]">
//           {rating}
//         </span>
//         <button
//           className={`ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#009393] text-white hover:bg-[#00E0C6] ${
//             isFull && "cursor-not-allowed opacity-50"
//           }`}
//           onClick={handleAddToCart}
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React, { memo, useCallback } from "react";
import { ShoppingCart, Star, Package } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import {
  showAddToCartToast,
  showMaxStockToast,
} from "../../helpers/toastHelpers";
import { useQueryClient } from "@tanstack/react-query";
import { CartItemType, Product } from "../../types";
import useNavigateToProduct from "../../hooks/useNavigateToProduct";
import { getPriceDetails } from "../../helpers/getPriceDetails";
import { renderStars } from "../../helpers/renderStars";

interface ProductCardProps {
  product: Product;
  id: number;
  imgSrc: string;
  title: string;
  price: number;
  rating: number;
  stock: number;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product, id, imgSrc, title, price, rating, stock }) => {
    const queryClient = useQueryClient();
    const addToCart = useCartStore((state) => state.addToCart);
    const cart = useCartStore((state) => state.cart);
    const navigateToProduct = useNavigateToProduct();

    const quantity = cart.find((item) => item.id === id)?.quantity || 0;
    const isFull = cart.some(
      (item) => item.id === id && item.quantity === item.stock,
    );

    const { originalPrice, discountedPrice, hasDiscount, savings } =
      getPriceDetails(product);

    const handleProductClick = useCallback(() => {
      // Cache product data for faster navigation
      queryClient.setQueryData(["product", id], product);
      navigateToProduct(product);
    }, [queryClient, id, product, navigateToProduct]);

    const handleAddToCart = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation();

        if (isFull) {
          showMaxStockToast(title);
          return;
        }

        const cartItem: CartItemType = {
          ...product,
          quantity: 1,
          image: product.thumbnail,
          discountedPrice: discountedPrice || originalPrice,
        };

        const result = addToCart(cartItem);
        showAddToCartToast(result.success, result.message, title, imgSrc, 1);
      },
      [
        addToCart,
        product,
        discountedPrice,
        originalPrice,
        title,
        imgSrc,
        isFull,
      ],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleProductClick();
        }
      },
      [handleProductClick],
    );

    return (
      <div
        onClick={handleProductClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${title}`}
        className="group relative w-full min-w-[18rem] max-w-[20rem] cursor-pointer overflow-hidden rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute right-3 top-3 z-10 animate-pulse rounded-full bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 text-xs font-bold text-white shadow-lg">
            Save ${savings.toFixed(2)}
          </div>
        )}

        {/* Product Image */}
        <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-50 p-4">
          <img
            src={product.thumbnail}
            alt={title}
            className="mx-auto h-40 w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Stock Indicator */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium backdrop-blur-sm">
            <Package className="h-3 w-3 text-gray-500" />
            <span className={stock > 10 ? "text-green-600" : "text-orange-600"}>
              {stock} left
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          {/* Title */}
          <h3
            title={title}
            className="line-clamp-2 truncate text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#009393]"
          >
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">{renderStars(rating, 4)}</div>
            <span className="text-xs text-gray-500">({rating.toFixed(2)})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#009393]">
              ${discountedPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`group/btn flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
              isFull
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-[#009393] text-white hover:bg-[#007a7a] hover:shadow-md active:scale-95"
            }`}
            aria-label={`Add ${title} to cart`}
          >
            <ShoppingCart
              className={`h-4 w-4 transition-transform ${!isFull && "group-hover/btn:scale-110"}`}
            />
            {isFull ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";

export default ProductCard;

// import React from "react";
// import { useCartStore } from "../../store/cartStore";
// import {
//   showAddToCartToast,
//   showMaxStockToast,
// } from "../../helpers/toastHelpers";
// import { useNavigate } from "react-router-dom";
// import { useQueryClient } from "@tanstack/react-query";
// import { slugify } from "../../helpers/slugify";
// import { Product, CartItemType } from "../../types";
// import useNavigateToProduct from "../../hooks/useNavigateToProduct";
// import { getPriceDetails } from "../../helpers/getPriceDetails";

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const addToCart = useCartStore((state) => state.addToCart);
//   const cart = useCartStore((state) => state.cart);
//   const navigateToProduct = useNavigateToProduct();

//   const { originalPrice, discountedPrice, hasDiscount, savings } =
//     getPriceDetails(product);
//   const quantity = cart.find((item) => item.id === product.id)?.quantity || 0;
//   const isFull = cart.some(
//     (item) => item.id === product.id && item.quantity === item.stock,
//   );

//   const handleProductClick = () => {
//     // Store product in React Query's cache by ID
//     queryClient.setQueryData(["product", product.id], product);
//     // Navigate with SEO-friendly slug
//     const slug = slugify(product.title);
//     navigate(`/product/${slug}-${product.id}`);
//   };

//   const handleAddToCart = (event: React.MouseEvent) => {
//     event.stopPropagation();
//     if (quantity < product.stock) {
//       const cartItem: CartItemType = {
//         ...product,
//         quantity: 1,
//         discountedPrice: product.price,
//         image: product.thumbnail,
//         // selectedImage: product.thumbnail,
//       };
//       const result = addToCart(cartItem);
//       showAddToCartToast(
//         result.success,
//         result.message,
//         product.title,
//         product.thumbnail,
//         1,
//       );
//     } else {
//       showMaxStockToast(product.title);
//     }
//   };

//   return (
//     <div
// onClick={() => navigateToProduct(product)}
// className="flex min-w-48 max-w-80 cursor-pointer flex-col rounded-xl bg-white p-4 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg"
// role="link"
// tabIndex={0}
// onKeyDown={(e) => e.key === "Enter" && handleProductClick()}
// aria-label={`View details for ${product.title}`}
//     >
//       <div className="relative mb-4">
//         <img
//           src={product.thumbnail}
//           alt={product.title}
//           className="mx-auto h-40 w-2/3 rounded-md object-cover"
//           loading="lazy"
//         />
//         {hasDiscount && (
//           <span className="absolute -top-2 right-0 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
//             Save ${savings.toFixed(2)}
//           </span>
//         )}
//       </div>

//       <h4
//         title={product.title}
//         className="mb-2 max-w-full truncate font-openSans text-sm font-semibold text-gray-900"
//       >
//         {product.title}
//       </h4>

//       <div className="mb-3 flex items-center gap-2">
//         <span className="text-lg font-bold text-[#009393]">
//           ${discountedPrice.toFixed(2)}
//         </span>
//         {hasDiscount && (
//           <span className="text-sm text-gray-500 line-through">
//             ${originalPrice.toFixed(2)}
//           </span>
//         )}
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <img
//             src="images/Rating_Icon_Green.png"
//             alt="Rating"
//             className="h-5 w-5"
//           />
//           <span className="font-roboto text-sm font-medium text-[#00E0C6]">
//             {product.rating.toFixed(1)}
//           </span>
//         </div>
//         <button
//           onClick={handleAddToCart}
//           className={`flex h-8 w-8 items-center justify-center rounded-full bg-[#009393] text-white transition-colors hover:bg-[#00E0C6] ${
//             isFull ? "cursor-not-allowed opacity-50" : ""
//           }`}
//           disabled={isFull}
//           aria-label={`Add ${product.title} to cart`}
//           title="Add to cart"
//         >
//           <span className="text-lg">+</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// import React from "react";
// import { toast } from "react-toastify";
// import { useCartStore } from "../../store/cartStore";
// import CustomToast from "./CustomToast";

// interface ProductCardProps {
//   id: number;
//   imgSrc: string;
//   title: string;
//   price: number;
//   rating: number;
//   stock: number;
// }

// const ProductCard: React.FC<ProductCardProps> = ({
//   id,
//   imgSrc,
//   title,
//   price,
//   rating,
//   stock,
// }) => {
//   const addToCart = useCartStore((state) => state.addToCart);
//   const cart = useCartStore((state) => state.cart);

//   // Check if product is at max capacity in cart
//   const cartItem = cart.find((item) => item.id === id);
//   const isAtMaxCapacity = cartItem?.quantity === stock;

//   const handleAddToCart = () => {
//     const result = addToCart({
//       id,
//       title,
//       price,
//       image: imgSrc,
//       quantity: 1,
//       stock,
//     });

//     // Create custom toast content
//     const customToastContent = (
//       <CustomToast
//         success={result.success}
//         message={result.message}
//         productImage={result.success ? imgSrc : undefined}
//         productTitle={title}
//         quantity={result.success ? 1 : undefined}
//       />
//     );

//     // Show appropriate toast
//     if (result.success) {
//       toast.success(customToastContent, {
//         className: "bg-white shadow-lg border border-green-200",
//       });
//     } else {
//       toast.error(customToastContent, {
//         className: "bg-white shadow-lg border border-red-200",
//       });
//     }
//   };

//   return (
//     <div className="min-w-48 max-w-80 flex-1 rounded-xl bg-white px-2.5 pb-2.5 pt-2.5 shadow-md">
//       <img className="mx-auto mb-4 w-2/3" src={imgSrc} alt={title} />

//       <h4
//         title={title}
//         className="mb-1 max-w-full truncate font-openSans text-sm font-semibold text-black"
//       >
//         {title}
//       </h4>

//       <p className="mb-1 text-sm font-semibold text-[#5C5C5C]">
//         Price ${price}
//       </p>

//       <div className="flex items-center gap-2">
//         <img src="images/Rating_Icon_Green.png" alt="Rating" />
//         <span className="font-roboto text-sm font-medium text-[#00E0C6]">
//           {rating}
//         </span>

//         <button
//           className={`ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#009393] text-white transition-colors ${
//             isAtMaxCapacity
//               ? "cursor-not-allowed opacity-50"
//               : "hover:bg-[#00E0C6]"
//           }`}
//           onClick={handleAddToCart}
//           // disabled={isAtMaxCapacity}
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// import { toast } from "react-toastify";
// import { useCartStore } from "../../store/cartStore";
// import CustomToast from "./CustomToast";

// interface ProductCardProps {
//   id: number;
//   imgSrc: string;
//   title: string;
//   price: number;
//   rating: number;
//   stock: number;
// }

// const ProductCard = ({
//   id,
//   imgSrc,
//   title,
//   price,
//   rating,
//   stock,
// }: ProductCardProps) => {
//   const addToCart = useCartStore((state) => state.addToCart);
//   const cart = useCartStore((state) => state.cart);

//   const isFull = cart.some(
//     (item) => item.id === id && item.quantity === item.stock,
//   );

//   console.log("isFull", isFull);

//   const handleAddToCart = () => {
//     const result = addToCart({
//       title,
//       price,
//       id,
//       image: imgSrc,
//       quantity: 1,
//       stock: stock,
//     });

//     const message = result.success ? result.message : result.message;
//     toast[result.success ? "success" : "error"](message);
//   };

//   // console.log("Cartttttttttttt", cart);

//   // console.log("Hi Thereeeeeee");

//   // <div className="min-w-48 flex-1 rounded-xl bg-white/30 px-2.5 pb-2.5 pt-2.5 shadow-md backdrop-blur-3xl">
//   // <div className="min-w-48 flex-1 rounded-xl bg-white px-2.5 pb-2.5 pt-2.5 shadow-md">
//   return (
//     <div className="min-w-48 max-w-80 flex-1 rounded-xl bg-white px-2.5 pb-2.5 pt-2.5 shadow-md">
//       {/* <div className="absolute inset-0 flex items-center justify-center bg-white/30 font-semibold text-white opacity-70 backdrop-blur-sm transition duration-300 hover:opacity-100"></div> */}

//       {/* Right Blur Gradient */}

//       {/* <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-black/20 to-transparent"></div> */}

//       {/* h-32 */}
//       <img className="mx-auto mb-4 w-2/3" src={imgSrc} alt={title} />

//       {/* White gradient overlay - only on the last card */}
//       {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/90"></div> */}

//       <h4
//         title={title}
//         className="mb-1 max-w-full truncate font-openSans text-sm font-semibold text-black"
//       >
//         {title}
//       </h4>
//       <p className="mb-1 text-sm font-semibold text-[#5C5C5C]">Price {price}</p>
//       <div className="flex items-center gap-2">
//         <img src="images/Rating_Icon_Green.png" alt="Rating" />
//         <span className="font-roboto text-sm font-medium text-[#00E0C6]">
//           {rating}
//         </span>
//         <button
//           className={`ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#009393] text-white hover:bg-[#00E0C6] ${
//             isFull && "cursor-not-allowed opacity-50"
//           }`}
//           onClick={handleAddToCart}
//           // disabled={isFull}
//           // onClick={() =>
//           // addToCart({
//           //   title,
//           //   price,
//           //   id,
//           //   image: imgSrc,
//           //   quantity: 1,
//           //   stock: stock,
//           // })
//           // }
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );

//   // <div className="relative w-64 rounded-xl bg-white/20 p-4 shadow-lg shadow-black/20 backdrop-blur-lg">
//   //   <img
//   //     src={imgSrc}
//   //     alt="Product"
//   //     className="h-32 w-full rounded-lg object-cover"
//   //   />

//   //   <h2 className="mt-2 text-lg font-semibold text-black/80">
//   //     Beats <span className="text-black/50">Solo</span>
//   //   </h2>

//   //   <p className="text-sm font-medium text-gray-700">
//   //     Price <span className="text-gray-400">$169</span>
//   //   </p>

//   //   <div className="mt-2 flex items-center">
//   //     <span className="text-sm font-semibold text-teal-400">⭐ 5.0</span>
//   //   </div>

//   //   {/* Left Blur Effect */}
//   //   <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-black/30 to-transparent" />
//   // </div>
// };

// export default ProductCard;

// interface ProductCardProps {
//   imgSrc: string;
//   title: string;
//   price: number;
//   rating: number;
//   isLastVisible?: boolean;
// }

// function ProductCard({
//   imgSrc,
//   title,
//   price,
//   rating,
//   isLastVisible = false,
// }: ProductCardProps) {
//   return (
//     // <div className="relative min-w-48 flex-1 rounded-xl bg-white/30 px-2.5 pb-2.5 pt-2.5 shadow-md backdrop-blur-3xl">
//     //   {/* Product Image */}
//     //   <img
//     //     className="relative z-10 mx-auto mb-4 h-32"
//     //     src={imgSrc}
//     //     alt={title}
//     //   />

//     //   {/* Content */}
//     //   <div className="relative z-10">
//     //     <h4 className="mb-1 max-w-48 truncate font-openSans text-sm font-semibold text-black">
//     //       {title}
//     //     </h4>
//     //     <p className="mb-1 text-sm font-semibold text-[#5C5C5C]">
//     //       Price ${price}
//     //     </p>
//     //     <div className="flex items-center gap-2">
//     //       <span className="text-[#00E0C6]">★</span>
//     //       <span className="font-roboto text-sm font-medium text-[#00E0C6]">
//     //         {rating}
//     //       </span>
//     //       <button className="ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#009393] text-white transition-colors hover:bg-[#007777]">
//     //         +
//     //       </button>
//     //     </div>
//     //   </div>

//     //   {/* Gradient Overlays */}
//     //   {isLastVisible && (
//     //     <div className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-transparent to-white/90" />
//     //   )}
//     //   <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-white/20" />

//     //   {/* Left and Right Blur Effects */}
//     //   <div className="absolute left-0 top-0 h-full w-10 rounded-l-xl bg-gradient-to-r from-black/5 to-transparent" />
//     //   <div className="absolute right-0 top-0 h-full w-10 rounded-r-xl bg-gradient-to-l from-black/5 to-transparent" />
//     // </div>
//     <div className="flex space-x-7 overflow-hidden">
//       {/* Normal Product Card */}
//       {/* <div className="relative w-64 rounded-xl bg-white p-4 shadow-lg">
//         <img
//           src="/your-image.png"
//           alt="Product"
//           className="h-32 w-full rounded-lg object-cover"
//         />
//         <h2 className="mt-2 text-lg font-semibold text-black">Beats Studio3</h2>
//         <p className="text-sm font-medium text-gray-700">
//           Price <span className="text-gray-400">$119.88</span>
//         </p>
//         <div className="mt-2 flex items-center">
//           <span className="text-sm font-semibold text-teal-400">⭐ 5.0</span>
//         </div>
//       </div> */}

//       {/* Blurred & Faded Last Product */}
//       <div className="relative w-64 rounded-xl bg-white/30 p-4 shadow-lg brightness-125 backdrop-blur-2xl">
//         <img
//           src={imgSrc}
//           alt="Product"
//           className="h-32 w-full rounded-lg object-cover opacity-30"
//         />
//         <h2 className="mt-2 text-lg font-semibold text-black/40">Beats Solo</h2>
//         <p className="text-sm font-medium text-gray-400">
//           Price <span className="text-gray-300">$169</span>
//         </p>
//         <div className="mt-2 flex items-center">
//           <span className="text-sm font-semibold text-teal-200">⭐ 5.0</span>
//         </div>

//         {/* Right Blur Effect */}
//         <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white/50 to-transparent"></div>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;

// const ProductCard = ({
//   imgSrc,
//   title,
//   price,
//   rating,
// }: {
//   imgSrc: string;
//   title: string;
//   price: number;
//   rating: number;
// }) => (
//   <div className="h-full rounded-xl bg-white px-2.5 pb-2.5 pt-2.5 shadow-md">
//     <img className="mx-auto mb-4" src={imgSrc} alt={title} />
//     <h4 className="mb-1 font-openSans text-sm font-semibold text-black">
//       {title}
//     </h4>
//     <p className="mb-1 text-sm font-semibold text-[#5C5C5C]">Price ${price}</p>
//     <div className="flex items-center gap-2">
//       <img src="images/Rating_Icon_Green.png" alt="Rating" />
//       <span className="font-roboto text-sm font-medium text-[#00E0C6]">
//         {rating}
//       </span>
//       <button className="ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#009393] text-white">
//         +
//       </button>
//     </div>
//   </div>
// );

// export default ProductCard;
