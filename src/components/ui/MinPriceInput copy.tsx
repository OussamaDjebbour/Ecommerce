// import { memo, useCallback, useMemo, useState } from "react";
// import { useSearchStore } from "../../context/useSearchStore";
// import debounce from "lodash.debounce";

// // MinPriceInput Component
// const MinPriceInput = memo(() => {
//   const { minPrice, maxPrice, setMinPrice } = useSearchStore();
//   const [localMinPrice, setLocalMinPrice] = useState(minPrice);

//   // useEffect(() => {
//   //   setLocalMinPrice(minPrice);
//   // }, [minPrice]);

//   // Debounced function to update global priceRange
//   const debouncedSetPriceRange = useMemo(
//     () => debounce(setMinPrice, 1000),
//     [setMinPrice],
//   );

//   // Handle min price input change
//   const handleMinPriceChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const min = Number(e.target.value);
//       if (min < 0 || min > maxPrice) return;
//       setLocalMinPrice(min); // Update local state immediately
//       debouncedSetPriceRange(min); // Update global state after debounce
//     },
//     [maxPrice, debouncedSetPriceRange],
//   );

//   return (
//     <label className="flex items-center gap-2">
//       <span className="whitespace-nowrap text-gray-700">Min Price:</span>
//       <input
//         type="number"
//         // value={minPrice}
//         value={localMinPrice}
//         // onChange={(e) => setLocalMinPrice(Number(e.target.value))}
//         onChange={handleMinPriceChange}
//         className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//         aria-label="Minimum price"
//       />
//     </label>
//   );
// });

// export default MinPriceInput;

// import { Controller, useFormContext } from "react-hook-form";

// const MinPriceInput = () => {
//   const {
//     control,
//     watch,
//     formState: { errors },
//   } = useFormContext(); // Access form context from the parent component

//   const maxPriceValue = watch("maxPrice"); // Watch maxPrice for validation

//   return (
//     <label className="flex items-center gap-2">
//       <span className="whitespace-nowrap text-gray-700">Min Price:</span>
//       <Controller
//         name="minPrice"
//         control={control}
//         rules={{
//           required: "Min price is required",
//           validate: (value) => {
//             const min = Number(value);
//             if (min < 0) return "Min price must be greater than or equal to 0";
//             if (min > Number(maxPriceValue))
//               return "Min price must be less than or equal to max price";
//             return true;
//           },
//         }}
//         render={({ field }) => (
//           <input
//             {...field}
//             type="number"
//             className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//             aria-label="Minimum price"
//           />
//         )}
//       />
//       {errors.minPrice && (
//         <p className="mt-1 text-sm text-red-500">{errors.minPrice.message}</p>
//       )}
//     </label>
//   );
// };

// export default MinPriceInput;

import { memo, useCallback, useMemo, useState } from "react";
import { useSearchStore } from "../../context/useSearchStore";
import debounce from "lodash.debounce";
import useSearchParams from "../../hooks/useSearchParams";

const MinPriceInput = memo(() => {
  // const { minPrice, maxPrice, setMinPrice } = useSearchStore();
  const { minPrice, maxPrice, setMinPrice } = useSearchParams();
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [error, setError] = useState("");

  const debouncedSetMinPrice = useMemo(
    () =>
      debounce((value: number) => {
        setMinPrice(value);
        setError("");
      }, 500),
    [setMinPrice],
  );

  const handleMinPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      setLocalMinPrice(value);

      if (value < 0) {
        setError("Price cannot be negative");
        return;
      }

      if (value >= maxPrice) {
        setError("Min price must be less than max price");
        return;
      }

      debouncedSetMinPrice(value);
    },
    [maxPrice, debouncedSetMinPrice],
  );

  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-2">
        <span className="whitespace-nowrap text-gray-700">Min Price:</span>
        <input
          type="number"
          value={localMinPrice}
          onChange={handleMinPriceChange}
          min="0"
          className={`w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          aria-label="Minimum price"
        />
      </label>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
});

export default MinPriceInput;

// import { memo } from "react";
// import { useFormContext, Controller } from "react-hook-form";

// const MinPriceInput = memo(() => {
//   const {
//     control,
//     watch,
//     formState: { errors },
//   } = useFormContext(); // Access form context from the parent component

//   const maxPriceValue = watch("maxPrice"); // Watch maxPrice for validation

//   return (
//     <div className="flex flex-col">
//       <label className="flex items-center gap-2">
//         <span className="whitespace-nowrap text-gray-700">Min Price:</span>
//         <Controller
//           name="minPrice"
//           control={control}
//           rules={{
//             required: "Min price is required",
//             validate: (value) => {
//               const min = Number(value);
//               if (min < 0)
//                 return "Min price must be greater than or equal to 0";
//               if (min > Number(maxPriceValue))
//                 return "Min price must be less than or equal to max price";
//               return true;
//             },
//           }}
//           render={({ field }) => (
//             <input
//               {...field}
//               type="number"
//               className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//               aria-label="Minimum price"
//             />
//           )}
//         />
//       </label>
//       {errors.minPrice && (
//         <p className="mt-1 text-sm text-red-500">{errors.minPrice.message}</p>
//       )}
//     </div>
//   );
// });

// export default MinPriceInput;

// import { memo } from "react";
// import { useFormContext, Controller } from "react-hook-form";

// const MinPriceInput = memo(() => {
//   const {
//     control,
//     watch,
//     formState: { errors },
//   } = useFormContext(); // Access form context from the parent component

//   const maxPriceValue = watch("maxPrice"); // Watch maxPrice for validation

//   return (
//     <div className="flex flex-col">
//       <label className="flex items-center gap-2">
//         <span className="whitespace-nowrap text-gray-700">Min Price:</span>
//         <Controller
//           name="minPrice"
//           control={control}
//           rules={{
//             required: "Min price is required",
//             validate: (value) => {
//               const min = Number(value);
//               if (min < 0)
//                 return "Min price must be greater than or equal to 0";
//               if (min > Number(maxPriceValue))
//                 return "Min price must be less than or equal to max price";
//               return true;
//             },
//           }}
//           render={({ field }) => (
//             <input
//               {...field}
//               type="number"
//               className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//               aria-label="Minimum price"
//             />
//           )}
//         />
//       </label>
//       {errors.minPrice && (
//         <p className="mt-1 text-sm text-red-500">{errors.minPrice.message}</p>
//       )}
//     </div>
//   );
// });

// export default MinPriceInput;
