// import { memo, useCallback, useMemo, useState } from "react";
// import { useSearchStore } from "../../context/useSearchStore";
// import debounce from "lodash.debounce";
// import useRouterSearchParams from "../../hooks/useRouterSearchParams";

// const MinPriceInput = memo(() => {
//   // const { minPrice, maxPrice, setMinPrice } = useSearchStore();
//   const { minPrice, maxPrice, setMinPrice } = useRouterSearchParams();
//   const [localMinPrice, setLocalMinPrice] = useState(minPrice);
//   const [error, setError] = useState("");

//   const debouncedSetMinPrice = useMemo(
//     () =>
//       debounce((value: number) => {
//         setMinPrice(value);
//         setError("");
//       }, 500),
//     [setMinPrice],
//   );

//   const handleMinPriceChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const value = Number(e.target.value);
//       setLocalMinPrice(value);

//       if (value < 0) {
//         setError("Price cannot be negative");
//         return;
//       }

//       if (value >= maxPrice) {
//         setError("Min price must be less than max price");
//         return;
//       }

//       debouncedSetMinPrice(value);
//     },
//     [maxPrice, debouncedSetMinPrice],
//   );

//   return (
//     <div className="flex flex-col gap-1">
//       <label className="flex flex-col gap-1">
//         <span className="whitespace-nowrap text-gray-700">Min Price</span>
//         <input
//           type="number"
//           value={localMinPrice}
//           onChange={handleMinPriceChange}
//           // min="0"
//           min={0}
//           className={`w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24 ${
//             error ? "border-red-500" : "border-gray-300"
//           }`}
//           aria-label="Minimum price"
//         />
//       </label>
//       {error && <p className="text-sm text-red-500">{error}</p>}
//     </div>
//   );
// });

// export default MinPriceInput;

import { memo, useCallback, useMemo, useState, useEffect } from "react";
import { DollarSign } from "lucide-react";
import debounce from "lodash.debounce";
import useRouterSearchParams from "../../hooks/useRouterSearchParams";

const MinPriceInput = memo(() => {
  const { minPrice, maxPrice, setMinPrice } = useRouterSearchParams();
  const [localMinPrice, setLocalMinPrice] = useState(minPrice || "");
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
      const value = e.target.value;
      setLocalMinPrice(value);

      if (value === "") {
        setMinPrice(0);
        setError("");
        return;
      }

      const numValue = Number(value);

      if (numValue < 0) {
        setError("Price cannot be negative");
        return;
      }

      if (maxPrice && numValue >= maxPrice) {
        setError("Min price must be less than max price");
        return;
      }

      debouncedSetMinPrice(numValue);
    },
    [maxPrice, debouncedSetMinPrice, setMinPrice],
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <DollarSign className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="number"
          value={localMinPrice}
          onChange={handleMinPriceChange}
          min={0}
          placeholder="Min"
          className={`w-full rounded-lg border py-2.5 pl-9 pr-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 sm:w-28 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300 hover:border-gray-400 focus:border-[#009393] focus:ring-[#009393]/20"
          }`}
          aria-label="Minimum price"
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

MinPriceInput.displayName = "MinPriceInput";

export default MinPriceInput;
