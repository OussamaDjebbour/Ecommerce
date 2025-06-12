import { memo, useCallback, useMemo, useState } from "react";
import { useSearchStore } from "../../context/useSearchStore";
import debounce from "lodash.debounce";
import useSearchParams from "../../hooks/useSearchParams";

const MaxPriceInput = memo(() => {
  // const { minPrice, maxPrice, setMaxPrice } = useSearchStore();
  const { minPrice, maxPrice, setMaxPrice } = useSearchParams();
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
          // min='0'
          min={0}
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
