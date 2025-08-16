// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useQuery } from "@tanstack/react-query";
// import { getDailyDealsProducts } from "../../services/getDailyDealsProducts";
// import ProductWithDailyDeal from "./ProductWithDailyDeal";
// import { Product } from "src/types";

// function DailyDeals() {
//   const {
//     data: dailyDealsProducts,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["dailyDealsProducts"],
//     queryFn: getDailyDealsProducts,
//   });

//   console.log("dailyDealsProducts", dailyDealsProducts);

//   if (isLoading) return <p className="text-center">Loading daily deals...</p>;
//   if (error)
//     return (
//       <p className="text-center text-red-500">Failed to load daily deals.</p>
//     );

//   return (
//     <div className="ml-8">
//       <div className="mb-7 flex items-center justify-between">
//         <h3 className="font-roboto text-2xl font-semibold text-[#016170]">
//           Daily Deals
//         </h3>
//         <button
//           className="text-sm font-medium text-[#5C5C5C]"
//           aria-label="View all daily deals"
//         >
//           View all
//           <span className="ml-2">
//             <FontAwesomeIcon icon={faArrowRight} />
//           </span>
//         </button>
//       </div>

//       {dailyDealsProducts?.map((product: Product) => (
//         <ProductWithDailyDeal
//           key={product.id}
//           image={product.images[0]}
//           title={product.title}
//           price={product.price}
//           nbrOfReviews={product.reviews?.length || 0}
//           nbrOfProductsInStock={product.stock}
//         />
//       ))}

//       {/* <div className="mb-7 flex gap-3.5">
//         <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
//           <img src="images/daily-deal.png" alt="Daily deal" />
//         </div>

//         <div className="flex flex-col justify-between py-2 text-xs font-medium">
//           <h5 className="text-black">beats new studio blue headset</h5>
//           <p className="text-[#5C5C5C]">256 Reviews 1628 orders</p>
//         </div>

//         <p className="my-auto text-xs font-medium text-[#5C5C5C]">Price $320</p>
//       </div> */}
//       {/* <div className="mb-7 flex gap-3.5">
//         <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
//           <img src="images/daily-deal.png" alt="Daily deal" />
//         </div>

//         <div className="flex flex-col justify-between py-2 text-xs font-medium">
//           <h5 className="text-black">beats new studio blue headset</h5>
//           <p className="text-[#5C5C5C]">256 Reviews 1628 orders</p>
//         </div>

//         <p className="my-auto text-xs font-medium text-[#5C5C5C]">Price $320</p>
//       </div>
//       <div className="mb-7 flex gap-3.5">
//         <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
//           <img src="images/daily-deal.png" alt="Daily deal" />
//         </div>

//         <div className="flex flex-col justify-between py-2 text-xs font-medium">
//           <h5 className="text-black">beats new studio blue headset</h5>
//           <p className="text-[#5C5C5C]">256 Reviews 1628 orders</p>
//         </div>

//         <p className="my-auto text-xs font-medium text-[#5C5C5C]">Price $320</p>
//       </div>
//       <div className="mb-7 flex gap-3.5">
//         <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
//           <img src="images/daily-deal.png" alt="Daily deal" />
//         </div>

//         <div className="flex flex-col justify-between py-2 text-xs font-medium">
//           <h5 className="text-black">beats new studio blue headset</h5>
//           <p className="text-[#5C5C5C]">256 Reviews 1628 orders</p>
//         </div>

//         <p className="my-auto text-xs font-medium text-[#5C5C5C]">Price $320</p>
//       </div>
//       <div className="mb-7 flex gap-3.5">
//         <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
//           <img src="images/daily-deal.png" alt="Daily deal" />
//         </div>

//         <div className="flex flex-col justify-between py-2 text-xs font-medium">
//           <h5 className="text-black">beats new studio blue headset</h5>
//           <p className="text-[#5C5C5C]">256 Reviews 1628 orders</p>
//         </div>

//         <p className="my-auto text-xs font-medium text-[#5C5C5C]">Price $320</p>
//       </div>
//       <div className="mb-7 flex gap-3.5">
//         <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
//           <img src="images/daily-deal.png" alt="Daily deal" />
//         </div>

//         <div className="flex flex-col justify-between py-2 text-xs font-medium">
//           <h5 className="text-black">beats new studio blue headset</h5>
//           <p className="text-[#5C5C5C]">256 Reviews 1628 orders</p>
//         </div>

//         <p className="my-auto text-xs font-medium text-[#5C5C5C]">Price $320</p>
//       </div> */}
//     </div>
//   );
// }

// export default DailyDeals;

// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useQuery } from "@tanstack/react-query";
// import { getDailyDealsProducts } from "../../services/getDailyDealsProducts";
// import ProductWithDailyDeal from "./ProductWithDailyDeal";
// import { Product } from "src/types";
// import SkeletonProduct from "./SkeletonProduct";
// import Spinner from "./Spinner";
// import ErrorMessage from "./ErrorMessage";

// interface DailyDealsProps {
//   isMainProductLoaded: boolean;
// }

// function DailyDeals({ isMainProductLoaded }: DailyDealsProps) {
//   const {
//     data: dailyDealsProducts,
//     isLoading,
//     error,
//   } = useQuery<Product[]>({
//     queryKey: ["dailyDealsProducts"],
//     queryFn: getDailyDealsProducts,
//     enabled: isMainProductLoaded, // Only fetch after MainProduct loads
//   });

//   console.log("dailyDealsProducts", dailyDealsProducts);

//   if (error)
//     return (
//       // <p className="text-center text-red-500">Failed to load daily deals.</p>
//       <ErrorMessage message={error.message} />
//     );

//   return (
//     // !isLoading && (
//     <div className="ml-8">
//       {dailyDealsProducts && (
//         <h3 className="mb-7 font-roboto text-2xl font-semibold text-[#016170]">
//           Daily Deals
//         </h3>
//       )}
//       {/* Skeleton Loader */}
//       {isLoading && (
//         <>
//           {[...Array(5)].map((_, index) => (
//             <SkeletonProduct key={index} />
//           ))}
//         </>
//       )}
//       {/* Render Data when Available */}

//       {dailyDealsProducts?.map((product: Product) => (
//         <ProductWithDailyDeal
//           key={product.id}
//           product={product}
//           // image={product.images[0]}
//           image={product.thumbnail}
//           title={product.title}
//           price={product.price}
//           nbrOfReviews={product.reviews?.length || 0} // Avoids potential undefined error
//           nbrOfProductsInStock={product.stock}
//         />
//       ))}
//     </div>
//   );
//   // );
// }

// export default DailyDeals;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Clock } from "lucide-react";
import { getDailyDealsProducts } from "../../services/getDailyDealsProducts";
import ProductWithDailyDeal from "./ProductWithDailyDeal";
import { Product } from "../../types";
import SkeletonProduct from "../ui/SkeletonProduct";
import ErrorMessage from "../ui/ErrorMessage";

interface DailyDealsProps {
  isMainProductLoaded: boolean;
}

// function DailyDeals({ isMainProductLoaded }: DailyDealsProps) {
//   const {
//     data: dailyDealsProducts,
//     isLoading,
//     error,
//   } = useQuery<Product[]>({
//     queryKey: ["dailyDealsProducts"],
//     queryFn: getDailyDealsProducts,
//     enabled: isMainProductLoaded,
//   });

//   if (error) {
//     return <ErrorMessage message={error.message} />;
//   }

//   return (
//     <div className="mx-auto max-w-md xl:ml-auto">
//       {/* Header Section */}
//       {dailyDealsProducts && (
//         <div className="mb-6">
//           <div className="mb-2 flex items-center gap-3">
//             <div className="rounded-lg bg-gradient-to-br from-[#009393] to-[#016170] p-2 shadow-lg">
//               <TrendingUp className="h-5 w-5 text-white" />
//             </div>
//             <h3 className="bg-gradient-to-r from-[#016170] to-[#009393] bg-clip-text text-2xl font-bold text-transparent">
//               Daily Deals
//             </h3>
//           </div>

//           {/* Subtitle with timer effect */}
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <Clock className="h-4 w-4" />
//             <span>Limited time offers • Updated daily</span>
//             <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
//           </div>
//         </div>
//       )}

//       {/* Loading State */}
//       {isLoading && (
//         <div className="space-y-4">
//           {[...Array(5)].map((_, index) => (
//             <SkeletonProduct key={index} />
//           ))}
//         </div>
//       )}

//       {/* Products List */}
//       {dailyDealsProducts && (
//         <div className="space-y-1">
//           {dailyDealsProducts.map((product: Product, index) => (
//             <div
//               key={product.id}
//               className="animate-fade-in-up"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <ProductWithDailyDeal
//                 product={product}
//                 image={product.thumbnail}
//                 title={product.title}
//                 price={product.price}
//                 nbrOfReviews={product.reviews?.length || 0}
//                 nbrOfProductsInStock={product.stock}
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Empty State */}
//       {dailyDealsProducts && dailyDealsProducts.length === 0 && (
//         <div className="py-12 text-center">
//           <TrendingUp className="mx-auto mb-4 h-12 w-12 text-gray-300" />
//           <p className="text-gray-500">No daily deals available right now.</p>
//           <p className="mt-1 text-sm text-gray-400">
//             Check back later for amazing offers!
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

function DailyDeals({ isMainProductLoaded }: DailyDealsProps) {
  const {
    data: dailyDealsProducts,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["dailyDealsProducts"],
    queryFn: getDailyDealsProducts,
    enabled: isMainProductLoaded,
  });

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    // <div className="w-full md:max-w-none xl:ml-auto xl:max-w-md">
    <div className="w-full lg:max-w-none xl:ml-auto xl:max-w-md">
      {/* Header Section */}
      {dailyDealsProducts && (
        <div className="mb-6 ml-12 xl:ml-0">
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-[#009393] to-[#016170] p-2 shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className="bg-gradient-to-r from-[#016170] to-[#009393] bg-clip-text text-2xl font-bold text-transparent">
              Daily Deals
            </h3>
          </div>

          {/* Subtitle with timer effect */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Limited time offers • Updated daily</span>
            <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <SkeletonProduct key={index} />
          ))}
        </div>
      )}

      {/* Products List */}
      {dailyDealsProducts && (
        // <div className="space-y-2.5">
        <div className="grid w-full grid-cols-[1fr] justify-items-center space-y-2.5 lg:grid-cols-2 lg:gap-8 lg:space-y-0 lg:px-6 xl:grid-cols-1 xl:gap-2.5 xl:px-0">
          {dailyDealsProducts.map((product: Product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductWithDailyDeal
                product={product}
                image={product.thumbnail}
                title={product.title}
                price={product.price}
                nbrOfReviews={product.reviews?.length || 0}
                nbrOfProductsInStock={product.stock}
              />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {dailyDealsProducts && dailyDealsProducts.length === 0 && (
        <div className="py-12 text-center">
          <TrendingUp className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <p className="text-gray-500">No daily deals available right now.</p>
          <p className="mt-1 text-sm text-gray-400">
            Check back later for amazing offers!
          </p>
        </div>
      )}
    </div>
  );
}

export default DailyDeals;
