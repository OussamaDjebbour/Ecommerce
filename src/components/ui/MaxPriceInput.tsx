// import { memo, useCallback, useMemo, useState } from "react";
// import { useSearchStore } from "../../context/useSearchStore";
// import debounce from "lodash.debounce";

// // MaxPriceInput Component
// const MaxPriceInput = memo(() => {
//   const { minPrice, maxPrice, setMaxPrice } = useSearchStore();

//   const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

//   const [error, setError] = useState("");

//   // useEffect(() => {
//   //   setLocalMinPrice(minPrice);
//   // }, [minPrice]);

//   // Debounced function to update global priceRange
//   const debouncedSetMaxPrice = useMemo(
//     () => debounce(setMaxPrice, 1000),
//     [setMaxPrice],
//   );

//   // Handle max price input change
//   // const handleMaxPriceChange = useCallback(
//   //   (e: React.ChangeEvent<HTMLInputElement>) => {
//   //     const max = Number(e.target.value);
//   //     if (max < 0 || max < minPrice) {
//   //       // Reset to last valid value
//   //       setLocalMaxPrice(maxPrice);
//   //       return;
//   //     }
//   //     setLocalMaxPrice(max); // Update local state immediately
//   //     // if (max < 0 || max < minPrice) return;
//   //     // debouncedSetPriceRange(() => {
//   //     //   if (max < 0 || max < minPrice) return maxPrice;
//   //     //   return max;
//   //     // }); // Update global state after debounce
//   //     debouncedSetPriceRange(max); // Update global state after debounce
//   //   },
//   //   [minPrice, maxPrice, debouncedSetPriceRange],
//   // );

//   // const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const max = Number(e.target.value);
//   //   if (max < 0 || max < minPrice) {
//   //     // Reset to last valid value
//   //     debouncedSetPriceRange(maxPrice);
//   //     setLocalMaxPrice(maxPrice);
//   //     return;
//   //   }
//   //   setLocalMaxPrice(max); // Update local state immediately
//   //   debouncedSetPriceRange(max); // Update global state after debounce
//   // };

//   // Handle max price input change
//   // const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const value = Number(e.target.value);
//   //   const max = Number(value);

//   //   // Update local state immediately
//   //   setLocalMaxPrice(value);

//   //   // Validate the new value
//   //   if (max < 0 || max < minPrice) {
//   //     // Revert to the previous valid value (from global state)
//   //     setLocalMaxPrice(maxPrice);
//   //     return;
//   //   }

//   //   // Update global state after debounce
//   //   debouncedSetMaxPrice(max);
//   // };

//   // // Validate max price on blur
//   // const validateMaxPrice = () => {
//   //   if (localMaxPrice < 0 || localMaxPrice < minPrice) {
//   //     setLocalMaxPrice(maxPrice); // Reset to last valid value
//   //   }
//   // };

//   const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const max = Number(e.target.value);
//     setLocalMaxPrice(max); // Update local state immediately
//     if (max < 0 || max < minPrice) {
//       setError("Max price must be greater than min price.");
//       return;
//     }
//     setError(""); // Clear error message
//     // debouncedSetPriceRange(max); // Update global state after debounce
//     if (!error) debouncedSetMaxPrice(max); // Update global state after debounce
//   };

//   return (
//     <div className="flex flex-col">
//       {error && <p className="text-sm text-red-500">{error}</p>}
//       <label className="flex items-center gap-2">
//         <span className="whitespace-nowrap text-gray-700">Max Price:</span>
//         <input
//           type="number"
//           // value={maxPrice}
//           value={localMaxPrice}
//           // onChange={(e) => setMaxPrice(Number(e.target.value))}
//           onChange={handleMaxPriceChange}
//           // onBlur={validateMaxPrice} // Validate on blur
//           className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//           aria-label="Maximum price"
//         />
//         {/* {error && (
//         <p className="absolute -top-10 text-sm text-red-500">{error}</p>
//       )} */}
//       </label>
//     </div>
//   );
// });

// export default MaxPriceInput;

// import { Controller, useFormContext } from "react-hook-form";

// const MaxPriceInput = () => {
//   const {
//     control,
//     watch,
//     formState: { errors },
//   } = useFormContext(); // Access form context from the parent component

//   const minPriceValue = watch("minPrice"); // Watch minPrice for validation

//   return (
//     <label className="flex items-center gap-2">
//       <span className="whitespace-nowrap text-gray-700">Max Price:</span>
//       <Controller
//         name="maxPrice"
//         control={control}
//         rules={{
//           required: "Max price is required",
//           validate: (value) => {
//             const max = Number(value);
//             if (max < 0) return "Max price must be greater than or equal to 0";
//             if (max < Number(minPriceValue))
//               return "Max price must be greater than or equal to min price";
//             return true;
//           },
//         }}
//         render={({ field }) => (
//           <input
//             {...field}
//             type="number"
//             className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//             aria-label="Maximum price"
//           />
//         )}
//       />
//       {errors.maxPrice && (
//         <p className="mt-1 text-sm text-red-500">{errors.maxPrice.message}</p>
//       )}
//     </label>
//   );
// };

// export default MaxPriceInput;

import { memo, useCallback, useMemo, useState } from "react";
import { useSearchStore } from "../../context/useSearchStore";
import debounce from "lodash.debounce";

const MaxPriceInput = memo(() => {
  const { minPrice, maxPrice, setMaxPrice } = useSearchStore();
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [error, setError] = useState("");

  const debouncedSetMaxPrice = useMemo(
    () =>
      debounce((value: number) => {
        setMaxPrice(value);
        setError("");
      }, 500),
    [setMaxPrice],
  );

  const handleMaxPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      setLocalMaxPrice(value);

      if (value < 0) {
        setError("Price cannot be negative");
        return;
      }

      if (value <= minPrice) {
        setError("Max price must be greater than min price");
        return;
      }

      debouncedSetMaxPrice(value);
    },
    [minPrice, debouncedSetMaxPrice],
  );

  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-2">
        <span className="whitespace-nowrap text-gray-700">Max Price:</span>
        <input
          type="number"
          value={localMaxPrice}
          onChange={handleMaxPriceChange}
          min="0"
          className={`w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          aria-label="Maximum price"
        />
      </label>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
});

export default MaxPriceInput;

// import { memo } from "react";
// import { useFormContext, Controller } from "react-hook-form";

// const MaxPriceInput = memo(() => {
//   const {
//     control,
//     watch,
//     formState: { errors },
//   } = useFormContext(); // Access form context from the parent component

//   const minPriceValue = watch("minPrice"); // Watch minPrice for validation

//   return (
//     <div className="flex flex-col">
//       <label className="flex items-center gap-2">
//         <span className="whitespace-nowrap text-gray-700">Max Price:</span>
//         <Controller
//           name="maxPrice"
//           control={control}
//           rules={{
//             required: "Max price is required",
//             validate: (value) => {
//               const max = Number(value);
//               if (max < 0)
//                 return "Max price must be greater than or equal to 0";
//               if (max < Number(minPriceValue))
//                 return "Max price must be greater than or equal to min price";
//               return true;
//             },
//           }}
//           render={({ field }) => (
//             <input
//               {...field}
//               type="number"
//               className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//               aria-label="Maximum price"
//             />
//           )}
//         />
//       </label>
//       {errors.maxPrice && (
//         <p className="mt-1 text-sm text-red-500">{errors.maxPrice.message}</p>
//       )}
//     </div>
//   );
// });

// export default MaxPriceInput;

// import { memo } from "react";
// import { useFormContext, Controller } from "react-hook-form";

// const MaxPriceInput = memo(() => {
//   const {
//     control,
//     watch,
//     formState: { errors },
//   } = useFormContext(); // Access form context from the parent component

//   const minPriceValue = watch("minPrice"); // Watch minPrice for validation

//   return (
//     <div className="flex flex-col">
//       <label className="flex items-center gap-2">
//         <span className="whitespace-nowrap text-gray-700">Max Price:</span>
//         <Controller
//           name="maxPrice"
//           control={control}
//           rules={{
//             required: "Max price is required",
//             validate: (value) => {
//               const max = Number(value);
//               if (max < 0)
//                 return "Max price must be greater than or equal to 0";
//               if (max < Number(minPriceValue))
//                 return "Max price must be greater than or equal to min price";
//               return true;
//             },
//           }}
//           render={({ field }) => (
//             <input
//               {...field}
//               type="number"
//               className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//               aria-label="Maximum price"
//             />
//           )}
//         />
//       </label>
//       {errors.maxPrice && (
//         <p className="mt-1 text-sm text-red-500">{errors.maxPrice.message}</p>
//       )}
//     </div>
//   );
// });

// export default MaxPriceInput;
