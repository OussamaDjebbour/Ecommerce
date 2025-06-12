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
          // min="0"
          min={0}
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
