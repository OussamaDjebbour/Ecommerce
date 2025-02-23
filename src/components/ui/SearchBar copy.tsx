import { useSearchContext } from "../../context/useSearchContext";

function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearchContext();

  return (
    <form className="relative">
      <img
        src="/images/fi-br-search.png"
        alt="Search Icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer"
      />

      <input
        className="w-[25.625rem] rounded-xl bg-white py-2.5 pl-16 font-medium text-[#5C5C5C] outline-none focus:ring-1 focus:ring-[#00E0C6]"
        type="text"
        placeholder="Search Product"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <img
        src="/images/fi-br-settings-sliders.png"
        alt="settings Icon"
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
      />
    </form>
  );
}

export default SearchBar;

// Chatgpt

// import { useState, useEffect, useCallback } from "react";
// import { useSearchStore } from "../../context/useSearchStore";
// import { Product } from "src/types";

// const SearchBar = () => {
//   const { searchQuery, setSearchQuery, fetchSuggestions, suggestions } =
//     useSearchStore();
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

//   return (
//     <div className="relative w-full max-w-md">
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         placeholder="Search products..."
//         className="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-400"
//       />
//       {showDropdown && suggestions.length > 0 && (
//         <ul className="absolute mt-1 w-full rounded-md border bg-white shadow-lg">
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               className={`flex cursor-pointer items-center p-2 hover:bg-gray-100 ${
//                 index === selectedIndex ? "bg-gray-200" : ""
//               }`}
//               onMouseDown={() => {
//                 setSearchQuery(suggestion.title);
//                 setShowDropdown(false);
//               }}
//             >
//               <img
//                 src={suggestion.thumbnail}
//                 alt={suggestion.title}
//                 className="mr-2 h-10 w-10 rounded-md object-cover"
//               />
//               <div>
//                 <p className="text-sm font-medium">{suggestion.title}</p>
//                 <p className="text-xs text-gray-600">${suggestion.price}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

// Best Bolt

// import { useState, useEffect, useCallback, useRef } from "react";
// import { useSearchStore } from "../../context/useSearchStore";
// import { useClickAway } from "react-use";

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

//   const ref = useRef(null);
//   useClickAway(ref, () => setShowDropdown(false));

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

// Zustand
// import { useState, useEffect, useCallback } from "react";
// import { useSearchStore } from "../../context/useSearchStore";
// import { Product } from "src/types";

// interface Suggestion {
//   id: string;
//   thumbnail: string;
//   title: string;
//   price: number;
// }

// const SearchBar = () => {
//   const { searchQuery, setSearchQuery, fetchSuggestions, suggestions } =
//     useSearchStore();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);

//   console.log("suggestions", suggestions);

//   // Debounce function to reduce API calls
//   const debounce = (fn: (...args: any) => void, delay: number) => {
//     let timeout: NodeJS.Timeout;
//     return (...args: any) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => fn(...args), delay);
//     };
//   };

//   // Debounced fetch function
//   const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), []);

//   // Handle input change
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     debouncedFetch(query);
//     setShowDropdown(query.length > 0);
//   };

//   // Handle keyboard navigation
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "ArrowDown") {
//       setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
//     } else if (e.key === "ArrowUp") {
//       setSelectedIndex((prev) => Math.max(prev - 1, 0));
//     } else if (e.key === "Enter" && selectedIndex >= 0) {
//       setSearchQuery(suggestions[selectedIndex]);
//       setShowDropdown(false);
//     }
//   };

//   return (
//     <div className="relative w-full max-w-md">
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         placeholder="Search products..."
//         className="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-400"
//       />
//       {suggestions.length > 0 && (
//         <div className="absolute z-10 mt-2 w-full rounded-lg border bg-white shadow-lg">
//           {suggestions.map((suggestion) => (
//             <div
//               key={suggestion.id}
//               className="flex items-center gap-4 p-2 hover:bg-gray-100"
//             >
//               <img
//                 src={suggestion.thumbnail}
//                 alt={suggestion.title}
//                 className="h-10 w-10 rounded"
//               />
//               <div>
//                 <p className="text-sm font-medium">{suggestion.title}</p>
//                 <p className="text-xs text-gray-500">${suggestion.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       {/* {showDropdown && suggestions.length > 0 && (
//         <ul className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg">
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               className={`cursor-pointer p-2 hover:bg-gray-100 ${
//                 index === selectedIndex ? "bg-gray-200" : ""
//               }`}
//               onMouseDown={() => {
//                 setSearchQuery(suggestion);
//                 setShowDropdown(false);
//               }}
//             >
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       )} */}
//     </div>
//   );
// };

// export default SearchBar;

// Context Api
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import React, { useState, useEffect, useContext } from "react";
// import { useSearchContext } from "../../context/useSearchContext";

// const fetchSearchSuggestions = async (query: string) => {
//   if (!query) return [];
//   const { data } = await axios.get(
//     `https://dummyjson.com/products/search?q=${query}`,
//   );
//   return data.products.slice(0, 5); // Show top 5 results
// };

// const SearchBar = () => {
//   const { searchQuery, setSearchQuery } = useSearchContext();

//   // const { searchQuery, setSearchQuery } = useSearchContext();
//   const [debouncedQuery, setDebouncedQuery] = useState("");

//   // Debounce user input to avoid excessive API calls
//   React.useEffect(() => {
//     const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   const { data: suggestions = [] } = useQuery({
//     queryKey: ["searchSuggestions", debouncedQuery],
//     queryFn: () => fetchSearchSuggestions(debouncedQuery),
//     enabled: !!debouncedQuery, // Fetch only when there's a query
//   });

//   return (
//     <div className="relative w-full max-w-lg">
//       <input
//         type="text"
//         placeholder="Search for products..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="w-full rounded-lg border p-2"
//       />
// {suggestions.length > 0 && (
//   <div className="absolute z-10 mt-2 w-full rounded-lg border bg-white shadow-lg">
//     {suggestions.map((suggestion) => (
//       <div
//         key={suggestion.id}
//         className="flex items-center gap-4 p-2 hover:bg-gray-100"
//       >
//         <img
//           src={suggestion.thumbnail}
//           alt={suggestion.title}
//           className="h-10 w-10 rounded"
//         />
//         <div>
//           <p className="text-sm font-medium">{suggestion.title}</p>
//           <p className="text-xs text-gray-500">${suggestion.price}</p>
//         </div>
//       </div>
//     ))}
//   </div>
// )}
//     </div>
//   );
// };

// export default SearchBar;

// import React, { useState } from "react";
// import { useSearchContext } from "../../context/useSearchContext";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const fetchSearchSuggestions = async (query: string) => {
//   if (!query) return [];
//   const { data } = await axios.get(
//     `https://dummyjson.com/products/search?q=${query}`,
//   );
//   return data.products.slice(0, 5); // Show top 5 results
// };

// const SearchBar = () => {
// const { searchQuery, setSearchQuery } = useSearchContext();
// const [debouncedQuery, setDebouncedQuery] = useState("");

// // Debounce user input to avoid excessive API calls
// React.useEffect(() => {
//   const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
//   return () => clearTimeout(timer);
// }, [searchQuery]);

// const { data: suggestions = [] } = useQuery({
//   queryKey: ["searchSuggestions", debouncedQuery],
//   queryFn: () => fetchSearchSuggestions(debouncedQuery),
//   enabled: !!debouncedQuery, // Fetch only when there's a query
// });

//   return (
//     <div className="relative w-full max-w-lg">
//       <input
//         type="text"
//         placeholder="Search for products..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="w-full rounded-lg border p-2"
//       />
//       {suggestions.length > 0 && (
//         <div className="absolute z-10 mt-2 w-full rounded-lg border bg-white shadow-lg">
//           {suggestions.map((product) => (
//             <div
//               key={product.id}
//               className="flex cursor-pointer items-center gap-4 p-2 hover:bg-gray-100"
//             >
//               <img
//                 src={product.thumbnail}
//                 alt={product.title}
//                 className="h-10 w-10 rounded"
//               />
//               <div>
//                 <p className="text-sm font-medium">{product.title}</p>
//                 <p className="text-xs text-gray-500">${product.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

// import React, { useContext, useEffect, useState } from "react";
// import { useSearchContext } from "../../context/useSearchContext";

// const SearchBar = () => {
//   const { searchQuery, setSearchQuery, fetchSearchSuggestions, suggestions } =
//     useSearchContext();
//   const [debouncedQuery, setDebouncedQuery] = useState("");

//   // Debounce user input to avoid excessive API calls
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedQuery(searchQuery);
//     }, 300);
//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   useEffect(() => {
//     if (debouncedQuery) {
//       fetchSearchSuggestions(debouncedQuery);
//     }
//   }, [debouncedQuery, fetchSearchSuggestions]);

//   return (
//     <div className="relative w-full max-w-lg">
//       <input
//         type="text"
//         placeholder="Search for products..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="w-full rounded-lg border p-2"
//       />
//       {suggestions.length > 0 && (
//         <div className="absolute z-10 mt-2 w-full rounded-lg border bg-white shadow-lg">
//           {suggestions.map((product) => (
//             <div
//               key={product.id}
//               className="flex cursor-pointer items-center gap-4 p-2 hover:bg-gray-100"
//             >
//               <img
//                 src={product.thumbnail}
//                 alt={product.title}
//                 className="h-10 w-10 rounded"
//               />
//               <div>
//                 <p className="text-sm font-medium">{product.title}</p>
//                 <p className="text-xs text-gray-500">${product.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;
