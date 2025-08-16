import { Search, X } from "lucide-react";
import { useProductSearchInput } from "../../hooks/useProductSearchInput";

const MobileSearchInput = () => {
  const { inputValue, handleInputChange, handleClearSearch } =
    useProductSearchInput();

  return (
    <div className="relative mx-auto w-full sm:w-[38rem]">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search products..."
        autoFocus
        value={inputValue}
        onChange={handleInputChange}
        className="w-full rounded-lg bg-white py-2.5 pl-10 pr-10 text-sm outline-none ring-2 ring-transparent focus:ring-[#00E0C6] sm:py-3 sm:pl-12 sm:pr-12 sm:text-base"
      />

      {inputValue && (
        <button
          onClick={handleClearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <X />
        </button>
      )}
    </div>
  );
};

export default MobileSearchInput;
