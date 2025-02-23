// import { memo, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { useSearchStore } from "../../context/useSearchStore";
// import debounce from "lodash.debounce";

// const PriceFilter = memo(() => {
//   const { minPrice, maxPrice, setMinPrice, setMaxPrice } = useSearchStore();
//   const {
//     control,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: { min: minPrice, max: maxPrice },
//     mode: "onChange", // Validate on change
//   });

//   const min = watch("min");
//   const max = watch("max");

//   // Debounced functions for state update
//   const debouncedSetMinPrice = debounce(setMinPrice, 1000);
//   const debouncedSetMaxPrice = debounce(setMaxPrice, 1000);

//   useEffect(() => {
//     debouncedSetMinPrice(min);
//   }, [min, debouncedSetMinPrice]);

//   useEffect(() => {
//     debouncedSetMaxPrice(max);
//   }, [max, debouncedSetMaxPrice]);

//   return (
//     <div className="flex flex-col gap-3">
//       {/* Min Price Input */}
//       <label className="flex flex-col">
//         <span className="text-gray-700">Min Price:</span>
//         <Controller
//           name="min"
//           control={control}
//           rules={{
//             required: "Min price is required",
//             min: { value: 0, message: "Price can't be negative" },
//             validate: (value) =>
//               value <= max || "Min price can't be greater than max price",
//           }}
//           render={({ field }) => (
//             <input
//               type="number"
//               {...field}
//               className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//             />
//           )}
//         />
//         {errors.min && (
//           <span className="text-red-500">{errors.min.message}</span>
//         )}
//       </label>

//       {/* Max Price Input */}
//       <label className="flex flex-col">
//         <span className="text-gray-700">Max Price:</span>
//         <Controller
//           name="max"
//           control={control}
//           rules={{
//             required: "Max price is required",
//             min: { value: 0, message: "Price can't be negative" },
//             validate: (value) =>
//               value >= min || "Max price can't be less than min price",
//           }}
//           render={({ field }) => (
//             <input
//               type="number"
//               {...field}
//               className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//             />
//           )}
//         />
//         {errors.max && (
//           <span className="text-red-500">{errors.max.message}</span>
//         )}
//       </label>
//     </div>
//   );
// });

// export default PriceFilter;

import { useForm, FormProvider } from "react-hook-form";
import { useSearchStore } from "../../context/useSearchStore";
import debounce from "lodash.debounce";
import { useEffect, useMemo } from "react";
import MinPriceInput from "./MinPriceInput";
import MaxPriceInput from "./MaxPriceInput";

const PriceFilter = () => {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice } = useSearchStore();

  const methods = useForm({
    defaultValues: {
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
    },
  });

  const { watch } = methods;

  // Watch minPrice and maxPrice to trigger updates dynamically
  const minPriceValue = watch("minPrice");
  const maxPriceValue = watch("maxPrice");

  // Debounced function to update global state and fetch data
  const debouncedFetchData = useMemo(
    () =>
      debounce((newMinPrice: number, newMaxPrice: number) => {
        setMinPrice(newMinPrice);
        setMaxPrice(newMaxPrice);
        // fetchData(); // Fetch data from the API
      }, 1000), // Adjust debounce delay as needed
    [setMinPrice, setMaxPrice],
  );

  // Effect to handle input changes
  useEffect(() => {
    const newMinPrice = Number(minPriceValue);
    const newMaxPrice = Number(maxPriceValue);

    // Validate inputs before updating
    if (newMinPrice >= 0 && newMinPrice <= newMaxPrice && newMaxPrice >= 0) {
      debouncedFetchData(newMinPrice, newMaxPrice);
    }
  }, [minPriceValue, maxPriceValue, debouncedFetchData]);

  return (
    <FormProvider {...methods}>
      <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row">
        <MinPriceInput />
        <MaxPriceInput />
      </div>
    </FormProvider>
  );
};

export default PriceFilter;
