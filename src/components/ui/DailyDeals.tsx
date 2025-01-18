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

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { getDailyDealsProducts } from "../../services/getDailyDealsProducts";
import ProductWithDailyDeal from "./ProductWithDailyDeal";
import { Product } from "src/types";
import SkeletonProduct from "./SkeletonProduct";

function DailyDeals() {
  const {
    data: dailyDealsProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dailyDealsProducts"],
    queryFn: getDailyDealsProducts,
  });

  console.log("dailyDealsProducts", dailyDealsProducts);

  if (error)
    return (
      <p className="text-center text-red-500">Failed to load daily deals.</p>
    );

  return (
    <div className="ml-8">
      <div className="mb-7 flex items-center justify-between">
        <h3 className="font-roboto text-2xl font-semibold text-[#016170]">
          Daily Deals
        </h3>
        <button
          className="text-sm font-medium text-[#5C5C5C]"
          aria-label="View all daily deals"
        >
          View all
          <span className="ml-2">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </button>
      </div>

      {/* Skeleton Loader */}
      {isLoading && (
        <>
          {[...Array(5)].map((_, index) => (
            <SkeletonProduct key={index} />
          ))}
        </>
      )}

      {/* Render Data when Available */}
      {!isLoading &&
        dailyDealsProducts?.map((product: Product) => (
          <ProductWithDailyDeal
            key={product.id}
            // image={product.images[0]}
            image={product.thumbnail}
            title={product.title}
            price={product.price}
            nbrOfReviews={product.reviews?.length || 0} // Avoids potential undefined error
            nbrOfProductsInStock={product.stock}
          />
        ))}
    </div>
  );
}

export default DailyDeals;
