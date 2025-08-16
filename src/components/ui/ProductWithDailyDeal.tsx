// import { ProductWithDailyDealProps } from "src/types";

// const ProductWithDailyDeal: FC<ProductWithDailyDealProps> = ({
//   image,
//   title,
//   price,
//   nbrOfReviews,
//   nbrOfProductsInStock,
// }) => {
//   return (
//     <div className="mb-7 flex gap-3.5">
//       <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
//         {/* <img src="images/daily-deal.png" alt="Daily deal" /> */}
//         <img src={image} alt={title} className="h-full w-full object-cover" />
//       </div>

//       <div className="flex flex-col justify-between py-2 text-xs font-medium">
//         <h5 className="text-black">{title}</h5>
//         <p className="text-[#5C5C5C]">
//           <span className="font-semibold">{nbrOfReviews}</span> Reviews
//           <span className="font-semibold"> {nbrOfProductsInStock}</span> pcs in
//           stock
//         </p>
//       </div>

//       <p className="my-auto ml-auto text-xs font-medium text-[#5C5C5C]">
//         Price ${price}
//       </p>
//     </div>
//   );
// };

// export default ProductWithDailyDeal;

import { FC } from "react";

// interface ProductWithDailyDealProps {
//   image: string;
//   title: string;
//   price: number;
//   nbrOfReviews: number;
//   nbrOfProductsInStock: number;
// }

// const ProductWithDailyDeal: FC<ProductWithDailyDealProps> = ({
//   image,
//   title,
//   price,
//   nbrOfReviews,
//   nbrOfProductsInStock,
// }) => {
//   return (
//     <div className="mb-7 flex gap-3.5">
//       <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
//         {/* Lazy Loading Image */}
//         <img
//           src={image}
//           alt={title}
//           className="h-full w-full object-cover"
//           loading="lazy"
//         />
//       </div>

//       <div className="flex flex-col justify-between py-2 text-xs font-medium">
//         <h5 className="text-black">{title}</h5>
//         <p className="text-[#5C5C5C]">
//           <span className="font-semibold">{nbrOfReviews}</span> Reviews ·
//           <span className="font-semibold"> {nbrOfProductsInStock}</span> pcs in
//           stock
//         </p>
//       </div>

//       <p className="my-auto ml-auto text-xs font-medium text-[#5C5C5C]">
//         Price ${price}
//       </p>
//     </div>
//   );
// };

// export default ProductWithDailyDeal;

// import { useState } from "react";
// import { getPriceDetails } from "../../helpers/getPriceDetails";
// import { Product } from "../../types";

// interface ProductWithDailyDealProps {
//   product: Product;
//   image: string;
//   title: string;
//   price: number;
//   nbrOfReviews: number;
//   nbrOfProductsInStock: number;
// }

// const ProductWithDailyDeal: FC<ProductWithDailyDealProps> = ({
//   product,
//   image,
//   title,
//   price,
//   nbrOfReviews,
//   nbrOfProductsInStock,
// }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const { originalPrice, discountedPrice, hasDiscount } =
//     getPriceDetails(product);

//   return (
//     <div className="mb-7 flex gap-3.5">
//       <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
//         {/* Low-Quality Placeholder */}
//         {!imageLoaded && (
//           <div className="h-14 w-14 animate-pulse rounded-full bg-gray-300"></div>
//         )}

//         {/* High-Quality Image */}
//         <img
//           src={image}
//           alt={title}
//           className={`h-full w-full object-cover transition-opacity duration-300 ${
//             imageLoaded ? "opacity-100" : "opacity-0"
//           }`}
//           loading="lazy"
//           onLoad={() => setImageLoaded(true)}
//         />
//       </div>

//       <div className="flex flex-col justify-between py-2 text-xs font-medium">
//         <h5 className="text-black">{title}</h5>
//         <p className="text-[#5C5C5C]">
//           <span className="font-semibold">{nbrOfReviews}</span> Reviews ·
//           <span className="font-semibold"> {nbrOfProductsInStock}</span> pcs in
//           stock
//         </p>
//       </div>

//       {/* <p className="my-auto ml-auto text-xs font-medium text-[#5C5C5C]">
//         Price ${price}
//       </p> */}
//       <div className="my-auto ml-auto flex flex-col items-center text-xs font-medium text-[#5C5C5C]">
//         <span
//           className={`font-semibold text-gray-500 ${hasDiscount && "line-through"}`}
//         >
//           ${originalPrice.toFixed(2)}
//         </span>
//         {hasDiscount && (
//           <span className="text-sm font-bold text-[#009393]">
//             ${discountedPrice.toFixed(2)}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductWithDailyDeal;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, TrendingUp, Package, ArrowRight } from "lucide-react";
import { getPriceDetails } from "../../helpers/getPriceDetails";
import { Product } from "../../types";
import useNavigateToProduct from "../../hooks/useNavigateToProduct";
import {
  getStockColor,
  getStockIcon,
} from "../../helpers/getStockColorAndIcon";

interface ProductWithDailyDealProps {
  product: Product;
  image: string;
  title: string;
  price: number;
  nbrOfReviews: number;
  nbrOfProductsInStock: number;
}

const ProductWithDailyDeal: React.FC<ProductWithDailyDealProps> = ({
  product,
  image,
  title,
  price,
  nbrOfReviews,
  nbrOfProductsInStock,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { originalPrice, discountedPrice, hasDiscount } =
    getPriceDetails(product);

  const navigateToProduct = useNavigateToProduct();

  return (
    <div
      onClick={() => navigateToProduct(product)}
      // md:min-w-[440px] min-[540px]:min-w-[28rem]
      className={`group relative w-full max-w-md cursor-pointer rounded-xl bg-transparent p-4 shadow-gray-200/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50`}
    >
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute -right-3.5 -top-2.5 z-10">
          <div className="animate-pulse rounded-full bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 text-xs font-bold text-white shadow-lg">
            -{Math.round(product.discountPercentage)}% OFF
          </div>
        </div>
      )}

      <div className="flex items-center min-[540px]:gap-4 xl:gap-0">
        <div className="relative mr-4 flex-shrink-0">
          <div
            className={`h-16 w-16 overflow-hidden rounded-full bg-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-[#009393]/20 xl:h-14 xl:w-14`}
          >
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="h-full w-full animate-pulse bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100"></div>
            )}

            <img
              src={image}
              alt={title}
              className={`h-full w-full object-cover transition-all duration-500 ${imageLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"} group-hover:scale-110`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Trending indicator for highly rated products */}
          {product.rating >= 4 && (
            <div className="absolute -bottom-1 -right-1 rounded-full bg-yellow-400 p-1 shadow-sm">
              <TrendingUp className="h-3 w-3 text-yellow-800" />
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="min-w-0 flex-1">
          <div className="mb-2">
            <h5
              className={`truncate font-semibold text-gray-800 transition-colors duration-200 group-hover:text-[#009393]`}
            >
              {title}
            </h5>

            {/* Brand */}
            <p className="mt-1 text-xs font-medium text-gray-500">
              {product.brand}
            </p>
          </div>

          {/* Reviews and Stock Info */}
          <div className="flex items-center gap-4 text-xs xl:gap-2">
            {/* Reviews */}
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-700">
                {nbrOfReviews}
              </span>
              <span className="text-gray-500">reviews</span>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-1">
              <Package className="h-3 w-3 text-gray-400" />
              <span
                className={`font-semibold ${getStockColor(nbrOfProductsInStock)}`}
              >
                {nbrOfProductsInStock}
              </span>
              <span className="text-gray-500">in stock</span>
              <span className="text-xs">
                {getStockIcon(nbrOfProductsInStock)}
              </span>
            </div>
          </div>
        </div>

        {/* Price Section */}
        {/* ml-8 min-[540px]:ml-0 */}
        <div className="flex flex-col items-end gap-2 min-[540px]:ml-6 xl:ml-0">
          <div className="text-right">
            <div
              className={`text-sm font-bold transition-all duration-200 ${hasDiscount ? "text-xs text-gray-400 line-through" : "text-gray-800"} `}
            >
              ${originalPrice.toFixed(2)}
            </div>

            {hasDiscount && (
              <div className="text-lg font-bold leading-tight text-[#009393]">
                ${discountedPrice.toFixed(2)}
              </div>
            )}
          </div>

          <div
            className={`translate-x-2 transform opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100`}
          >
            <ArrowRight className="h-4 w-4 text-[#009393]" />
          </div>
        </div>
      </div>

      {/* Hover overlay effect */}
      <div
        className={`absolute inset-0 rounded-xl border-2 border-transparent to-transparent transition-all duration-300 group-hover:border-[#009393]/20 group-hover:bg-gradient-to-r group-hover:from-[#009393]/5`}
      />
    </div>
  );
};

export default ProductWithDailyDeal;
