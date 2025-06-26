// import { useState, useRef, useEffect } from "react";
// // import { useSearchStore } from "../../context/useSearchStore";
// import { useClickAway } from "react-use";
// import { useSearchProducts } from "../../hooks/useSearchProducts";
// import { useSearchStore } from "../../store/searchStore";
// import { useNavigate } from "react-router-dom";

// const SearchBar = () => {
//   // const {
//   //   searchQuery,
//   //   setSearchQuery,
//   //   selectedCategory,
//   //   setSelectedCategory,
//   //   // priceRange,
//   //   // setPriceRange,
//   // } = useSearchStore();

//   // const searchQuery = useSearchStore((state) => state.searchQuery);
//   // const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
//   const navigate = useNavigate();

//   const {
//     searchQuery,
//     setSearchQuery,
//     debouncedQuery,
//     searchResults,
//     setSearchResults,
//   } = useSearchStore();
//   // const searchQuery = useSearchStore((state) => state.searchQuery);
//   // const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

//   // const selectedCategory = useSearchStore((state) => state.selectedCategory);
//   // const setSelectedCategory = useSearchStore(
//   //   (state) => state.setSelectedCategory,
//   // );

//   const [searchQueryLocal, setSearchQueryLocal] = useState("");

//   console.log("searchQuerysearchQuerysearchQuerysearchQuery", searchQuery);

//   const {
//     products,
//     isLoading,
//     filteredProducts: filteredSuggestions,
//   } = useSearchProducts();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);

//   console.log("filteredSuggestions", filteredSuggestions, searchResults);

//   const ref = useRef(null);
//   useClickAway(ref, () => setShowDropdown(false));

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     if (!query) return;
//     // setSearchResults(products);

//     setSearchQuery(query);
//     // navigate("productPage");
//     // setSearchQueryLocal(query)
//     setShowDropdown(query.length > 0);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "ArrowDown") {
//       setSelectedIndex((prev) => Math.min(prev + 1, products.length - 1));
//     } else if (e.key === "ArrowUp") {
//       setSelectedIndex((prev) => Math.max(prev - 1, 0));
//     } else if (e.key === "Enter" && selectedIndex >= 0) {
//       setSearchQuery(products[selectedIndex].title);
//       setShowDropdown(false);
//     }
//   };

//   useEffect(() => {
//     if (debouncedQuery.trim()) {
//       const path = window.location.pathname;
//       if (!path.includes("productPage")) {
//         navigate("productPage");
//         setSearchQuery("");
//       }
//     }
//   }, [debouncedQuery, navigate, setSearchQuery]);

//   // Get unique categories from products
//   const categories = [...new Set(products.map((p) => p.category))];

//   return (
//     <form className="relative">
//       <img
//         src="/images/fi-br-search.png"
//         alt="Search Icon"
//         className="absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer"
//       />

//       <input
//         className="w-[25.625rem] rounded-xl bg-white py-2.5 pl-16 font-medium text-[#5C5C5C] outline-none focus:ring-1 focus:ring-[#00E0C6]"
//         type="text"
//         value={searchQuery}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         placeholder="Search products..."
//         aria-label="Search products"
//       />

//       <img
//         src="/images/fi-br-settings-sliders.png"
//         alt="settings Icon"
//         className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
//       />

//       {showDropdown && filteredSuggestions.length > 0 && !isLoading && (
//         <ul
//           ref={ref}
//           className="absolute z-50 mt-1 max-h-96 w-full overflow-y-auto rounded-md border bg-white shadow-lg"
//         >
//           {filteredSuggestions.map((product, index) => (
//             <li
//               key={product.id}
//               className={`cursor-pointer p-2 hover:bg-gray-100 ${
//                 index === selectedIndex ? "bg-gray-200" : ""
//               }`}
//               onMouseDown={() => {
//                 setSearchQuery(product.title);
//                 setShowDropdown(false);
//               }}
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src={product.thumbnail}
//                   alt={product.title}
//                   className="h-12 w-12 rounded object-cover"
//                 />
//                 <div>
//                   <p className="font-medium">{product.title}</p>
//                   <p className="text-sm text-blue-600">${product.price}</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/*  */}
//     </form>
//   );
// };

// export default SearchBar;

// import { useState, useRef, useEffect } from "react";
// import { useClickAway } from "react-use";
// import { useSearchProducts } from "../../hooks/useSearchProducts";
// import { useSearchParams } from "../../hooks/useSearchParams";
// import { useSearchStore } from "../../store/searchStore";

// const SearchBar = () => {
//   const { searchQuery, setSearchQuery, clearSearchQuery } = useSearchParams();

//   const {
//     products,
//     isLoading,
//     filteredProducts: filteredSuggestions,
//   } = useSearchProducts();

//   const { setIsSearching } = useSearchStore();

//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [inputValue, setInputValue] = useState(searchQuery);

//   const ref = useRef(null);
//   useClickAway(ref, () => setShowDropdown(false));

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setInputValue(query);
//     setSearchQuery(query);
//     setShowDropdown(query.length > 0);
//     setIsSearching(true);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "ArrowDown") {
//       setSelectedIndex((prev) => Math.min(prev + 1, products.length - 1));
//     } else if (e.key === "ArrowUp") {
//       setSelectedIndex((prev) => Math.max(prev - 1, 0));
//     } else if (e.key === "Enter" && selectedIndex >= 0) {
//       const selectedProduct = products[selectedIndex];
//       setInputValue(selectedProduct.title);
//       setSearchQuery(selectedProduct.title);
//       setShowDropdown(false);
//     } else if (e.key === "Escape") {
//       handleClearSearch();
//     }
//   };

//   const handleClearSearch = () => {
//     setInputValue("");
//     clearSearchQuery(); // Only clear the search query, keep filters and stay on page
//     setShowDropdown(false);
//     setSelectedIndex(-1);
//   };

//   // useEffect(() => {
//   //   if (window.location.pathname === "/" && inputValue) {
//   //     setInputValue("");
//   //   }
//   // }, [setInputValue, inputValue]);

//   return (
//     <form className="relative">
//       <img
//         src="/images/fi-br-search.png"
//         alt="Search Icon"
//         className="absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer"
//       />

//       <input
//         className="w-[25.625rem] rounded-xl bg-white py-2.5 pl-16 pr-12 font-medium text-[#5C5C5C] outline-none focus:ring-1 focus:ring-[#00E0C6]"
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         placeholder="Search products..."
//         aria-label="Search products"
//       />

//       {/* Clear button - only show when there's text */}
//       {inputValue && (
//         <button
//           type="button"
//           onClick={handleClearSearch}
//           className="absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
//           aria-label="Clear search"
//         >
//           ✕
//         </button>
//       )}

//       <img
//         src="/images/fi-br-settings-sliders.png"
//         alt="settings Icon"
//         className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
//       />

//       {showDropdown && filteredSuggestions.length > 0 && !isLoading && (
//         <ul
//           ref={ref}
//           className="absolute z-50 mt-1 max-h-96 w-full overflow-y-auto rounded-md border bg-white shadow-lg"
//         >
//           {filteredSuggestions.map((product, index) => (
//             <li
//               key={product.id}
//               className={`cursor-pointer p-2 hover:bg-gray-100 ${
//                 index === selectedIndex ? "bg-gray-200" : ""
//               }`}
//               onMouseDown={() => {
//                 setInputValue(product.title);
//                 setSearchQuery(product.title);
//                 setShowDropdown(false);
//               }}
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src={product.thumbnail}
//                   alt={product.title}
//                   className="h-12 w-12 rounded object-cover"
//                 />
//                 <div>
//                   <p className="font-medium">{product.title}</p>
//                   <p className="text-sm text-blue-600">${product.price}</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </form>
//   );
// };

// export default SearchBar;

// import { useState, useRef, useMemo, useEffect } from "react";
// import { useClickAway } from "react-use";
// import { useSearchProducts } from "../../hooks/useSearchProducts";
// import { useSearchParams } from "../../hooks/useSearchParams";
// import debounce from "lodash.debounce";
// import { Product } from "src/types";

// const SearchBar = () => {
//   const { searchQuery, setSearchQuery, clearSearchQuery } = useSearchParams();

//   const {
//     products,
//     isLoading,
//     filteredProducts: filteredSuggestions,
//   } = useSearchProducts();

//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [inputValue, setInputValue] = useState(searchQuery);

//   const ref = useRef(null);
//   useClickAway(ref, () => setShowDropdown(false));

//   // Clear input when navigating to home page
//   useEffect(() => {
//     if (location.pathname === "/" && !searchQuery) {
//       setInputValue("");
//     }
//   }, [searchQuery]);

//   // Debounced search function - only triggers API call after user stops typing
//   const debouncedSearch = useMemo(
//     () =>
//       debounce((query: string) => {
//         setSearchQuery(query);
//       }, 500), // 500ms delay
//     [setSearchQuery],
//   );

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setInputValue(query);

//     // Show dropdown immediately for better UX
//     setShowDropdown(query.length > 0);

//     // Only trigger search after user stops typing
//     if (query.trim()) {
//       debouncedSearch(query);
//     } else {
//       // Clear search immediately when input is empty
//       debouncedSearch.cancel();
//       clearSearchQuery();
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "ArrowDown") {
//       setSelectedIndex((prev) => Math.min(prev + 1, products.length - 1));
//     } else if (e.key === "ArrowUp") {
//       setSelectedIndex((prev) => Math.max(prev - 1, 0));
//     } else if (e.key === "Enter" && selectedIndex >= 0) {
//       e.preventDefault();
//       const selectedProduct = products[selectedIndex];
//       setInputValue(selectedProduct.title);
//       debouncedSearch.cancel(); // Cancel pending debounced call
//       setSearchQuery(selectedProduct.title); // Immediate search
//       setShowDropdown(false);
//     } else if (e.key === "Escape") {
//       handleClearSearch();
//     }
//   };

//   const handleClearSearch = () => {
//     setInputValue("");
//     debouncedSearch.cancel(); // Cancel any pending search
//     clearSearchQuery(); // Only clear the search query, keep filters and stay on page
//     setShowDropdown(false);
//     setSelectedIndex(-1);
//   };

//   const handleDropdownClick = (product: Product) => {
//     setInputValue(product.title);
//     debouncedSearch.cancel(); // Cancel pending debounced call
//     setSearchQuery(product.title); // Immediate search
//     setShowDropdown(false);
//   };

//   return (
//     <form className="relative">
//       <img
//         src="/images/fi-br-search.png"
//         alt="Search Icon"
//         className="absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer"
//       />

//       <input
//         className="w-[25.625rem] rounded-xl bg-white py-2.5 pl-16 pr-12 font-medium text-[#5C5C5C] outline-none focus:ring-1 focus:ring-[#00E0C6]"
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         placeholder="Search products..."
//         aria-label="Search products"
//         role="combobox"
//         aria-autocomplete="list"
//         aria-controls="suggestions-list"
//         aria-expanded={showDropdown}
//       />

//       {/* Clear button - only show when there's text */}
//       {inputValue && (
//         <button
//           type="button"
//           onClick={handleClearSearch}
//           className="absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
//           aria-label="Clear search"
//         >
//           ✕
//         </button>
//       )}

//       <img
//         src="/images/fi-br-settings-sliders.png"
//         alt="settings Icon"
//         className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
//       />

//       {showDropdown && filteredSuggestions.length > 0 && !isLoading && (
//         <ul
//           ref={ref}
//           className="absolute z-50 mt-1 max-h-96 w-full overflow-y-auto rounded-md border bg-white shadow-lg"
//           id="suggestions-list"
//           role="listbox"
//         >
//           {filteredSuggestions.map((product, index) => (
//             <li
//               key={product.id}
//               className={`cursor-pointer p-2 hover:bg-gray-100 ${
//                 index === selectedIndex ? "bg-gray-200" : ""
//               }`}
//               role="option"
//               aria-selected={index === selectedIndex}
//               onClick={handleDropdownClick.bind(null, product)}
//               // onMouseDown={() => handleDropdownClick(product)}
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src={product.thumbnail}
//                   alt={product.title}
//                   className="h-12 w-12 rounded object-cover"
//                   // role="presentation"
//                   // aria-hidden
//                   loading="lazy"
//                 />
//                 <div>
//                   <p className="font-medium">{product.title}</p>
//                   <p className="text-sm text-blue-600">${product.price}</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </form>
//   );
// };

// export default SearchBar;

import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { useClickAway } from "react-use";
import { useSearchProducts } from "../../hooks/useSearchProducts";
import { useSearchParams } from "../../hooks/useSearchParams";
import debounce from "lodash.debounce";
import { Product } from "src/types";

const SearchBar = () => {
  console.log("SearchBar rendered");
  const { searchQuery, setSearchQuery, clearSearchQuery } = useSearchParams();

  const { filteredProducts: filteredSuggestions, isLoading } =
    useSearchProducts();

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [inputValue, setInputValue] = useState(searchQuery);

  const dropdownRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickAway(containerRef, () => setShowDropdown(false));

  // Debounced search function - only triggers API call after user stops typing
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setSearchQuery(query);
      }, 400), // // 400ms delay
    [setSearchQuery],
  );

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

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setInputValue(query);
      setSelectedIndex(-1); // Reset selection when typing

      // Show dropdown immediately for better UX
      setShowDropdown(query.length > 0);

      // Only trigger search after user stops typing
      if (query.trim()) {
        debouncedSearch(query);
      } else {
        // Clear search immediately when input is empty
        debouncedSearch.cancel();
        clearSearchQuery();
      }
    },
    [debouncedSearch, clearSearchQuery],
  );

  const selectProduct = useCallback(
    (product: Product) => {
      setInputValue(product.title);
      debouncedSearch.cancel(); // Cancel pending debounced call
      setSearchQuery(product.title); // Immediate search
      setShowDropdown(false);
      setSelectedIndex(-1);
    },
    [debouncedSearch, setSearchQuery],
  );

  const handleClearSearch = useCallback(() => {
    setInputValue("");
    debouncedSearch.cancel(); // Cancel any pending search
    clearSearchQuery(); // Only clear the search query, keep filters and stay on page
    setShowDropdown(false);
    setSelectedIndex(-1);
  }, [debouncedSearch, clearSearchQuery]);

  // const handleDropdownClick = useCallback(
  const handleDropdownClick = useCallback(
    (product: Product) => {
      selectProduct(product);
    },
    [selectProduct],
  );

  // const handleKeyDown = useCallback(
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
  // [
  //   showDropdown,
  //   filteredSuggestions,
  //   selectedIndex,
  //   selectProduct,
  //   handleClearSearch,
  // ],
  // );

  // Clear input when navigating to home page

  useEffect(() => {
    if (
      // (location.pathname === "/" ||
      //   location.pathname === "/cart" ||
      //   location.pathname === "/checkout")
      location.pathname !== "/productPage" &&
      !searchQuery
    ) {
      setInputValue("");
    }
  }, [searchQuery]);

  // Memoize dropdown items to prevent unnecessary re-renders
  // const dropdownItems = useMemo(() => {
  //   if (!showDropdown || filteredSuggestions.length === 0 || isLoading) {
  //     return null;
  //   }

  // }, [
  //   showDropdown,
  //   filteredSuggestions,
  //   isLoading,
  //   selectedIndex,
  //   handleDropdownClick,
  // ]);

  return (
    <div ref={containerRef} className="relative">
      <form className="relative" onSubmit={(e) => e.preventDefault()}>
        <img
          src="/images/fi-br-search.png"
          alt="Search Icon"
          className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer"
        />

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
            ✕
          </button>
        )}

        <img
          src="/images/fi-br-settings-sliders.png"
          alt="Settings Icon"
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        />
      </form>

      {showDropdown && filteredSuggestions.length > 0 && !isLoading && (
        <ul
          ref={dropdownRef}
          className="absolute z-50 mt-1 max-h-96 w-full overflow-y-auto rounded-md border bg-white shadow-lg"
          role="listbox"
          aria-label="Search suggestions"
        >
          {filteredSuggestions.map((product, index) => (
            <li
              key={product.id}
              className={`cursor-pointer p-2 transition-colors duration-150 hover:border-l-2 hover:border-blue-500 hover:bg-blue-100 ${
                index === selectedIndex
                  ? "border-l-2 border-blue-500 bg-blue-50"
                  : ""
              }`}
              onMouseDown={() => handleDropdownClick(product)}
              // onMouseEnter={() => setSelectedIndex(index)}
              // onMouseLeave={() => setSelectedIndex(index)}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-12 w-12 flex-shrink-0 rounded object-cover"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <p title={product.title} className="truncate font-medium">
                    {product.title}
                  </p>
                  <p className="text-sm text-blue-600">${product.price}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

// import { useState, useRef } from "react";
// import { useClickAway } from "react-use";
// import { useSearchProducts } from "../../hooks/useSearchProducts";
// import { useSearchParams } from "../../hooks/useSearchParams";

// const SearchBar = () => {
//   const { searchQuery, setSearchQuery, clearSearch } = useSearchParams();

//   const {
//     products,
//     isLoading,
//     filteredProducts: filteredSuggestions,
//   } = useSearchProducts();

//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [inputValue, setInputValue] = useState(searchQuery);

//   const ref = useRef(null);
//   useClickAway(ref, () => setShowDropdown(false));

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setInputValue(query);
//     setSearchQuery(query);
//     setShowDropdown(query.length > 0);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "ArrowDown") {
//       setSelectedIndex((prev) => Math.min(prev + 1, products.length - 1));
//     } else if (e.key === "ArrowUp") {
//       setSelectedIndex((prev) => Math.max(prev - 1, 0));
//     } else if (e.key === "Enter" && selectedIndex >= 0) {
//       const selectedProduct = products[selectedIndex];
//       setInputValue(selectedProduct.title);
//       setSearchQuery(selectedProduct.title);
//       setShowDropdown(false);
//     } else if (e.key === "Escape") {
//       handleClearSearch();
//     }
//   };

//   const handleClearSearch = () => {
//     setInputValue("");
//     clearSearch();
//     setShowDropdown(false);
//     setSelectedIndex(-1);
//   };

//   return (
//     <form className="relative">
//       <img
//         src="/images/fi-br-search.png"
//         alt="Search Icon"
//         className="absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer"
//       />

//       <input
//         className="w-[25.625rem] rounded-xl bg-white py-2.5 pl-16 pr-12 font-medium text-[#5C5C5C] outline-none focus:ring-1 focus:ring-[#00E0C6]"
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         placeholder="Search products..."
//         aria-label="Search products"
//       />

//       {/* Clear button - only show when there's text */}
//       {inputValue && (
//         <button
//           type="button"
//           onClick={handleClearSearch}
//           className="absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
//           aria-label="Clear search"
//         >
//           ✕
//         </button>
//       )}

//       <img
//         src="/images/fi-br-settings-sliders.png"
//         alt="settings Icon"
//         className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
//       />

//       {showDropdown && filteredSuggestions.length > 0 && !isLoading && (
//         <ul
//           ref={ref}
//           className="absolute z-50 mt-1 max-h-96 w-full overflow-y-auto rounded-md border bg-white shadow-lg"
//         >
//           {filteredSuggestions.map((product, index) => (
//             <li
//               key={product.id}
//               className={`cursor-pointer p-2 hover:bg-gray-100 ${
//                 index === selectedIndex ? "bg-gray-200" : ""
//               }`}
//               onMouseDown={() => {
//                 setInputValue(product.title);
//                 setSearchQuery(product.title);
//                 setShowDropdown(false);
//               }}
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src={product.thumbnail}
//                   alt={product.title}
//                   className="h-12 w-12 rounded object-cover"
//                 />
//                 <div>
//                   <p className="font-medium">{product.title}</p>
//                   <p className="text-sm text-blue-600">${product.price}</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </form>
//   );
// };

// export default SearchBar;
