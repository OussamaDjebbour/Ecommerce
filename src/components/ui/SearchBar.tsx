import { useRef, useCallback, useEffect } from "react";
import { useSearchProducts } from "../../hooks/useSearchProducts";
import { Product } from "src/types";
import SearchDropdownSuggest from "./SearchDropdownSuggest";
import { useProductSearchInput } from "../../hooks/useProductSearchInput";
import { SearchIcon, X } from "lucide-react";

const SearchBar = () => {
  const {
    inputValue,
    setInputValue,
    handleInputChange,
    handleClearSearch,
    showDropdown,
    setShowDropdown,
    selectedIndex,
    setSelectedIndex,
    debouncedSearch,
    searchQuery,
    setSearchQuery,
  } = useProductSearchInput();

  const { filteredProducts: filteredSuggestions, isLoading } =
    useSearchProducts();

  const dropdownRef = useRef<HTMLUListElement>(null);

  // Auto-scroll to selected item in dropdown
  const scrollToSelectedItem = useCallback(() => {
    if (dropdownRef.current && selectedIndex >= 0) {
      const selectedElement = dropdownRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedIndex]);

  // Scroll to selected item when selectedIndex changes
  useEffect(() => {
    scrollToSelectedItem();
  }, [scrollToSelectedItem]);

  const selectProduct = useCallback(
    (product: Product) => {
      setInputValue(product.title);
      debouncedSearch.cancel(); // Cancel pending debounced call
      setSearchQuery(product.title); // Immediate search
      setShowDropdown(false);
      setSelectedIndex(-1);
    },
    [
      debouncedSearch,
      setSearchQuery,
      setInputValue,
      setSelectedIndex,
      setShowDropdown,
    ],
  );

  const handleDropdownClick = useCallback(
    (product: Product) => {
      selectProduct(product);
    },
    [selectProduct],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1,
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selectedProduct = filteredSuggestions[selectedIndex];
      selectProduct(selectedProduct);
    } else if (e.key === "Escape") {
      handleClearSearch();
    }
  };

  // Clear input when navigating to home page
  useEffect(() => {
    if (location.pathname !== "/productPage" && !searchQuery) {
      setInputValue("");
    }
  }, [searchQuery, setInputValue]);

  return (
    <div className="relative">
      {showDropdown && (
        <div
          onClick={() => setShowDropdown(false)}
          className="fixed inset-0 cursor-pointer"
        />
      )}
      <form className="relative" onSubmit={(e) => e.preventDefault()}>
        <SearchIcon className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer" />

        <input
          className="w-[25.625rem] rounded-xl bg-white py-2.5 pl-16 pr-12 font-medium text-[#5C5C5C] outline-none transition-shadow duration-200 focus:ring-2 focus:ring-[#00E0C6]"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          aria-label="Search products"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          autoComplete="off"
        />

        {/* Clear button - only show when there's text */}
        {inputValue && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-gray-400 transition-colors duration-150 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X />
          </button>
        )}
      </form>

      {showDropdown && filteredSuggestions.length > 0 && !isLoading && (
        <ul
          ref={dropdownRef}
          className="absolute z-50 mt-1 max-h-96 w-full overflow-y-auto rounded-md border bg-white shadow-lg"
          role="listbox"
          aria-label="Search suggestions"
        >
          {filteredSuggestions.map((product, index) => (
            <SearchDropdownSuggest
              key={product.id}
              product={product}
              index={index}
              selectedIndex={selectedIndex}
              handleDropdownClick={handleDropdownClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
