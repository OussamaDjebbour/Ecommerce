// import { useState, useEffect, useCallback, useRef } from "react";
// import { useSearchStore } from "../../context/useSearchStore";
// import { useClickAway, useDebounce } from "react-use";
// import debounce from "lodash.debounce";

// const SearchBar = () => {
//   const {
//     searchQuery,
//     setSearchQuery,
//     fetchSuggestions,
//     suggestions,
//     selectedCategory,
//     setSelectedCategory,
//     priceRange,
//     setPriceRange,
//     categories,
//   } = useSearchStore();

//   console.log("categories", categories, suggestions);

//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   // const [debouncedQuery, setDebouncedQuery] = useState("");

//   const ref = useRef(null);
//   useClickAway(ref, () => setShowDropdown(false));

//   // Debounce the query state with a delay of 300ms

//   // Debounce the query update
//   // useDebounce(
//   //   () => {
//   //     setDebouncedQuery(searchQuery);
//   //   },
//   //   1000,
//   //   [searchQuery],
//   // );
//   // useDebounce(() => setDebouncedQuery(searchQuery), 300, [searchQuery]);

//   // Debounce API call instead of state
//   // const debouncedFetch = useCallback(
//   //   debounce((query) => fetchSuggestions(query), 300),
//   //   [],
//   // );

//   // Fetch suggestions when `debouncedQuery` changes
//   // useEffect(() => {
//   //   if (debouncedQuery.trim()) {
//   //     fetchSuggestions(debouncedQuery);
//   //   }
//   // }, [debouncedQuery, fetchSuggestions]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     // debouncedFetch(query);
//     // fetchSuggestions(debouncedQuery);
//     // debouncedFetch(query);
//     setShowDropdown(query.length > 0);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "ArrowDown") {
//       setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
//     } else if (e.key === "ArrowUp") {
//       setSelectedIndex((prev) => Math.max(prev - 1, 0));
//     } else if (e.key === "Enter" && selectedIndex >= 0) {
//       setSearchQuery(suggestions[selectedIndex].title);
//       setShowDropdown(false);
//     }
//   };

//   const filteredSuggestions = suggestions.filter(
//     (suggestion) =>
//       (!selectedCategory || suggestion.category === selectedCategory) &&
//       suggestion.price >= priceRange.min &&
//       suggestion.price <= priceRange.max,
//   );

//   return (
//     <div className="mx-auto w-full max-w-4xl">
//       <div className="mb-4 flex gap-4">
//         <div className="relative flex-1">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             placeholder="Search products..."
//             className="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-400"
//           />
//           {showDropdown && filteredSuggestions.length > 0 && (
//             <ul
//               ref={ref}
//               className="absolute z-50 mt-1 max-h-96 w-full overflow-y-auto rounded-md border bg-white shadow-lg"
//             >
//               {filteredSuggestions.map((suggestion, index) => (
//                 <li
//                   key={suggestion.id}
//                   className={`cursor-pointer p-2 hover:bg-gray-100 ${
//                     index === selectedIndex ? "bg-gray-200" : ""
//                   }`}
//                   onMouseDown={() => {
//                     setSearchQuery(suggestion.title);
//                     setShowDropdown(false);
//                   }}
//                 >
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={suggestion.thumbnail}
//                       alt={suggestion.title}
//                       className="h-12 w-12 rounded object-cover"
//                     />
//                     <div>
//                       <p className="font-medium">{suggestion.title}</p>
//                       <p className="text-sm text-blue-600">
//                         ${suggestion.price}
//                       </p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Filters */}
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="rounded-md border p-2 focus:ring-2 focus:ring-blue-400"
//         >
//           <option value="">All Categories</option>
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Price Range Filter */}
//       <div className="mb-4 flex items-center gap-4">
//         <label className="flex items-center gap-2">
//           Min Price:
//           <input
//             type="number"
//             value={priceRange.min}
//             onChange={(e) =>
//               setPriceRange({ ...priceRange, min: Number(e.target.value) })
//             }
//             className="w-24 rounded-md border p-2"
//           />
//         </label>
//         <label className="flex items-center gap-2">
//           Max Price:
//           <input
//             type="number"
//             value={priceRange.max}
//             onChange={(e) =>
//               setPriceRange({ ...priceRange, max: Number(e.target.value) })
//             }
//             className="w-24 rounded-md border p-2"
//           />
//         </label>
//       </div>
//     </div>
//   );
// };
// export default SearchBar;

// Bolt

import { useState, useRef } from "react";
import { useSearchStore } from "../../context/useSearchStore";
import { useClickAway } from "react-use";
import { useSearchProducts } from "../../hooks/useSearchProducts";

const SearchBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
  } = useSearchStore();

  const {
    products,
    isLoading,
    filteredProducts: filteredSuggestions,
  } = useSearchProducts();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const ref = useRef(null);
  useClickAway(ref, () => setShowDropdown(false));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowDropdown(query.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, products.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      setSearchQuery(products[selectedIndex].title);
      setShowDropdown(false);
    }
  };

  // Get unique categories from products
  const categories = [...new Set(products.map((p) => p.category))];

  // const filteredSuggestions = products.filter(
  //   (product) =>
  //     (!selectedCategory || product.category === selectedCategory) &&
  //     product.price >= priceRange.min &&
  //     product.price <= priceRange.max,
  // );

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-4 flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-400"
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
        </div>

        {/* Filters */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-md border p-2 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4 flex items-center gap-4">
        <label className="flex items-center gap-2">
          Min Price:
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: Number(e.target.value) })
            }
            className="w-24 rounded-md border p-2"
          />
        </label>
        <label className="flex items-center gap-2">
          Max Price:
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: Number(e.target.value) })
            }
            className="w-24 rounded-md border p-2"
          />
        </label>
      </div>
    </div>
  );
};

export default SearchBar;

// import { useSearchStore } from "../../context/useSearchStore";
// import { useClickAway } from "react-use";
// import { useRef, useState } from "react";

// const SearchBar = () => {
//   const {
//     searchQuery,
//     setSearchQuery,
//     suggestions,
//     selectedCategory,
//     setSelectedCategory,
//     priceRange,
//     setPriceRange,
//     categories,
//   } = useSearchStore();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const ref = useRef(null);
//   useClickAway(ref, () => setShowDropdown(false));

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     setShowDropdown(e.target.value.length > 0);
//   };

//   return (
//     <div className="mx-auto w-full max-w-4xl">
//       <div className="mb-4 flex gap-4">
//         <div className="relative flex-1">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleInputChange}
//             placeholder="Search products..."
//             className="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-400"
//           />
//           {showDropdown && suggestions.length > 0 && (
//             <ul
//               ref={ref}
//               className="absolute z-50 mt-1 max-h-96 w-full overflow-y-auto rounded-md border bg-white shadow-lg"
//             >
//               {suggestions.map((suggestion) => (
//                 <li
//                   key={suggestion.id}
//                   className="cursor-pointer p-2 hover:bg-gray-100"
//                   onMouseDown={() => {
//                     setSearchQuery(suggestion.title);
//                     setShowDropdown(false);
//                   }}
//                 >
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={suggestion.thumbnail}
//                       alt={suggestion.title}
//                       className="h-12 w-12 rounded object-cover"
//                     />
//                     <div>
//                       <p className="font-medium">{suggestion.title}</p>
//                       <p className="text-sm text-blue-600">
//                         ${suggestion.price}
//                       </p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

// import { useState, useEffect, useCallback } from "react";
// import { useSearchStore } from "../../context/useSearchStore";

// const SearchBar = () => {
//   const {
//     searchQuery,
//     setSearchQuery,
//     fetchSuggestions,
//     suggestions,
//     selectedCategory,
//     setSelectedCategory,
//     priceRange,
//     setPriceRange,
//     categories,
//   } = useSearchStore();

//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);

//   const debounce = (fn: (...args: any) => void, delay: number) => {
//     let timeout: NodeJS.Timeout;
//     return (...args: any) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => fn(...args), delay);
//     };
//   };

//   const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     debouncedFetch(query);
//     setShowDropdown(query.length > 0);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "ArrowDown") {
//       setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
//     } else if (e.key === "ArrowUp") {
//       setSelectedIndex((prev) => Math.max(prev - 1, 0));
//     } else if (e.key === "Enter" && selectedIndex >= 0) {
//       setSearchQuery(suggestions[selectedIndex].title);
//       setShowDropdown(false);
//     }
//   };

//   const filteredSuggestions = suggestions.filter(
//     (suggestion) =>
//       (!selectedCategory || suggestion.category === selectedCategory) &&
//       suggestion.price >= priceRange.min &&
//       suggestion.price <= priceRange.max,
//   );

//   return (
//     <div className="mx-auto w-full max-w-4xl">
//       <div className="mb-4 flex gap-4">
//         <div className="relative flex-1">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             placeholder="Search products..."
//             className="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-400"
//           />
//           {showDropdown && filteredSuggestions.length > 0 && (
//             <ul className="absolute z-50 mt-1 max-h-96 w-full overflow-y-auto rounded-md border bg-white shadow-lg">
//               {filteredSuggestions.map((suggestion, index) => (
//                 <li
//                   key={suggestion.id}
//                   className={`cursor-pointer p-2 hover:bg-gray-100 ${
//                     index === selectedIndex ? "bg-gray-200" : ""
//                   }`}
//                   onMouseDown={() => {
//                     setSearchQuery(suggestion.title);
//                     setShowDropdown(false);
//                   }}
//                 >
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={suggestion.thumbnail}
//                       alt={suggestion.title}
//                       className="h-12 w-12 rounded object-cover"
//                     />
//                     <div>
//                       <p className="font-medium">{suggestion.title}</p>
//                       <p className="text-sm text-blue-600">
//                         ${suggestion.price}
//                       </p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Filters */}
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="rounded-md border p-2 focus:ring-2 focus:ring-blue-400"
//         >
//           <option value="">All Categories</option>
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Price Range Filter */}
//       <div className="mb-4 flex items-center gap-4">
//         <label className="flex items-center gap-2">
//           Min Price:
//           <input
//             type="number"
//             value={priceRange.min}
//             onChange={(e) =>
//               setPriceRange({ ...priceRange, min: Number(e.target.value) })
//             }
//             className="w-24 rounded-md border p-2"
//           />
//         </label>
//         <label className="flex items-center gap-2">
//           Max Price:
//           <input
//             type="number"
//             value={priceRange.max}
//             onChange={(e) =>
//               setPriceRange({ ...priceRange, max: Number(e.target.value) })
//             }
//             className="w-24 rounded-md border p-2"
//           />
//         </label>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;
