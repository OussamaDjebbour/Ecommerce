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

import { useState, useRef } from "react";
import { useClickAway } from "react-use";
import { useSearchProducts } from "../../hooks/useSearchProducts";
import { useSearchParams } from "../../hooks/useSearchParams";
import { useSearchStore } from "../../store/searchStore";

const SearchBar = () => {
  const { searchQuery, setSearchQuery, clearSearchQuery } = useSearchParams();

  const {
    products,
    isLoading,
    filteredProducts: filteredSuggestions,
  } = useSearchProducts();

  const { setIsSearching } = useSearchStore();

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [inputValue, setInputValue] = useState(searchQuery);

  const ref = useRef(null);
  useClickAway(ref, () => setShowDropdown(false));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    setSearchQuery(query);
    setShowDropdown(query.length > 0);
    setIsSearching(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, products.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      const selectedProduct = products[selectedIndex];
      setInputValue(selectedProduct.title);
      setSearchQuery(selectedProduct.title);
      setShowDropdown(false);
    } else if (e.key === "Escape") {
      handleClearSearch();
    }
  };

  const handleClearSearch = () => {
    setInputValue("");
    clearSearchQuery(); // Only clear the search query, keep filters and stay on page
    setShowDropdown(false);
    setSelectedIndex(-1);
  };

  return (
    <form className="relative">
      <img
        src="/images/fi-br-search.png"
        alt="Search Icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer"
      />

      <input
        className="w-[25.625rem] rounded-xl bg-white py-2.5 pl-16 pr-12 font-medium text-[#5C5C5C] outline-none focus:ring-1 focus:ring-[#00E0C6]"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        aria-label="Search products"
      />

      {/* Clear button - only show when there's text */}
      {inputValue && (
        <button
          type="button"
          onClick={handleClearSearch}
          className="absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}

      <img
        src="/images/fi-br-settings-sliders.png"
        alt="settings Icon"
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
      />

      {showDropdown && filteredSuggestions.length > 0 && !isLoading && (
        <ul
          ref={ref}
          className="absolute z-50 mt-1 max-h-96 w-full overflow-y-auto rounded-md border bg-white shadow-lg"
        >
          {filteredSuggestions.map((product, index) => (
            <li
              key={product.id}
              className={`cursor-pointer p-2 hover:bg-gray-100 ${
                index === selectedIndex ? "bg-gray-200" : ""
              }`}
              onMouseDown={() => {
                setInputValue(product.title);
                setSearchQuery(product.title);
                setShowDropdown(false);
              }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-12 w-12 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{product.title}</p>
                  <p className="text-sm text-blue-600">${product.price}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </form>
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
