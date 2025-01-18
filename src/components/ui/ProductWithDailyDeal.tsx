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

import { useState } from "react";
import { ProductWithDailyDealProps } from "src/types";

const ProductWithDailyDeal: FC<ProductWithDailyDealProps> = ({
  image,
  title,
  price,
  nbrOfReviews,
  nbrOfProductsInStock,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="mb-7 flex gap-3.5">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
        {/* Low-Quality Placeholder */}
        {!imageLoaded && (
          <div className="h-14 w-14 animate-pulse rounded-full bg-gray-300"></div>
        )}

        {/* High-Quality Image */}
        <img
          src={image}
          alt={title}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="flex flex-col justify-between py-2 text-xs font-medium">
        <h5 className="text-black">{title}</h5>
        <p className="text-[#5C5C5C]">
          <span className="font-semibold">{nbrOfReviews}</span> Reviews ·
          <span className="font-semibold"> {nbrOfProductsInStock}</span> pcs in
          stock
        </p>
      </div>

      <p className="my-auto ml-auto text-xs font-medium text-[#5C5C5C]">
        Price ${price}
      </p>
    </div>
  );
};

export default ProductWithDailyDeal;
