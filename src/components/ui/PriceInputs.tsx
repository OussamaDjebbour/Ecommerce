// import { useCallback, useState, useEffect, useMemo, memo } from "react";
// import debounce from "lodash.debounce";

// interface PriceInputsProps {
//   priceRange: { min: number; max: number };
//   setPriceRange: (range: { min: number; max: number }) => void;
// }

// const PriceInputs = memo(({ priceRange, setPriceRange }: PriceInputsProps) => {
//   const [localMinPrice, setLocalMinPrice] = useState(priceRange.min);
//   const [localMaxPrice, setLocalMaxPrice] = useState(priceRange.max);

//   //   // Update local state when global priceRange changes
//   // useEffect(() => {
//   //   setLocalMinPrice(priceRange.min);
//   //   setLocalMaxPrice(priceRange.max);
//   // }, [priceRange]);

//   // // Debounced function to update global priceRange
//   // const debouncedSetPriceRange = useMemo(
//   //   () => debounce(setPriceRange, 1000),
//   //   [setPriceRange],
//   // );

//   //   // Handle min price input change
//   //   const handleMinPriceChange = useCallback(
//   //     (e: React.ChangeEvent<HTMLInputElement>) => {
//   //       const min = Number(e.target.value);
//   //       setLocalMinPrice(min); // Update local state immediately
//   //       debouncedSetPriceRange({ ...priceRange, min }); // Update global state after debounce
//   //     },
//   //     [priceRange, debouncedSetPriceRange],
//   //   );

//   //   // Handle max price input change
//   //   const handleMaxPriceChange = useCallback(
//   //     (e: React.ChangeEvent<HTMLInputElement>) => {
//   //       const max = Number(e.target.value);
//   //       setLocalMaxPrice(max); // Update local state immediately
//   //       debouncedSetPriceRange({ ...priceRange, max }); // Update global state after debounce
//   //     },
//   //     [priceRange, debouncedSetPriceRange],
//   //   );

//   const handleMinPriceChange = useMemo(
//     () => (e: React.ChangeEvent<HTMLInputElement>) =>
//       setPriceRange({ ...priceRange, min: Number(e.target.value) }),
//     [priceRange, setPriceRange],
//   );

//   const handleMaxPriceChange = useMemo(
//     () => (e: React.ChangeEvent<HTMLInputElement>) =>
//       setPriceRange({ ...priceRange, max: Number(e.target.value) }),
//     [priceRange, setPriceRange],
//   );

//   return (
//     <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row">
//       <label className="flex items-center gap-2">
//         <span className="whitespace-nowrap text-gray-700">Min Price:</span>
//         <input
//           type="number"
//           //   value={localMinPrice}
//           value={priceRange.min}
//           onChange={handleMinPriceChange}
//           className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//           aria-label="Minimum price"
//         />
//       </label>

//       <label className="flex items-center gap-2">
//         <span className="whitespace-nowrap text-gray-700">Max Price:</span>
//         <input
//           type="number"
//           value={priceRange.max}
//           onChange={handleMaxPriceChange}
//           className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//           aria-label="Maximum price"
//         />
//       </label>
//     </div>
//   );
// });

// export default PriceInputs;

import { useForm, FormProvider } from "react-hook-form";
import MinPriceInput from "./MinPriceInput";
import MaxPriceInput from "./MaxPriceInput";

const PriceInputs = () => {
  const methods = useForm({
    defaultValues: {
      minPrice: 0, // Initial value for minPrice
      maxPrice: 1000, // Initial value for maxPrice
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row">
        <MinPriceInput />
        <MaxPriceInput />
      </div>
    </FormProvider>
  );
};

export default PriceInputs;

// import { useForm, FormProvider } from "react-hook-form";
// import MinPriceInput from "./MinPriceInput";
// import MaxPriceInput from "./MaxPriceInput";

// const PriceInputs = () => {
//   const methods = useForm({
//     defaultValues: {
//       minPrice: 0, // Initial value for minPrice
//       maxPrice: 1000, // Initial value for maxPrice
//     },
//   });

//   return (
//     <FormProvider {...methods}>
//       <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row">
//         <MinPriceInput />
//         <MaxPriceInput />
//       </div>
//     </FormProvider>
//   );
// };

// export default PriceInputs;
