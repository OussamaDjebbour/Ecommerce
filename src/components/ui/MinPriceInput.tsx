import { memo, useCallback, useMemo, useState } from "react";
import { DollarSign } from "lucide-react";
import { MIN_PRICE } from "../../constants";
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

      if (numValue < MIN_PRICE) {
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
