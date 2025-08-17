import { memo, useCallback, useMemo, useState } from "react";
import { DollarSign } from "lucide-react";
import debounce from "lodash.debounce";
import useRouterSearchParams from "../../hooks/useRouterSearchParams";

const MaxPriceInput = memo(() => {
  const { minPrice, maxPrice, setMaxPrice } = useRouterSearchParams();
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice || "");
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
      const numValue = Number(e.target.value);
      setLocalMaxPrice(numValue);

      if (numValue < 0) {
        setError("Price cannot be negative");
        return;
      }

      if (minPrice && numValue <= minPrice) {
        setError("Max price must be greater than min price");
        return;
      }

      debouncedSetMaxPrice(numValue);
    },
    [minPrice, debouncedSetMaxPrice],
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <DollarSign className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="number"
          value={localMaxPrice}
          onChange={handleMaxPriceChange}
          min={0}
          placeholder="Max"
          className={`w-full rounded-lg border py-2.5 pl-9 pr-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 sm:w-28 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300 hover:border-gray-400 focus:border-[#009393] focus:ring-[#009393]/20"
          }`}
          aria-label="Maximum price"
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

MaxPriceInput.displayName = "MaxPriceInput";

export default MaxPriceInput;
