// import { useSearchStore } from "../context/useSearchStore";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const ProductPage = () => {
//   const { searchQuery } = useSearchStore();
//   const [products, setProducts] = useState<any[]>([]);

//   useEffect(() => {
//     if (!searchQuery) return;
//     axios
//       .get(`https://dummyjson.com/products/search?q=${searchQuery}`)
//       .then((res) => setProducts(res.data.products))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, [searchQuery]);

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold">Results for "{searchQuery}"</h2>
//       <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//         {products.map((product) => (
//           <div key={product.id} className="rounded-md border p-3 shadow-md">
//             <img
//               src={product.thumbnail}
//               alt={product.title}
//               className="h-40 w-full rounded-md object-cover"
//             />
//             <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
//             <p className="font-semibold text-blue-500">${product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

// Best Bolt

import { searchProducts } from "../services/getDailyDealsProducts";
import { useSearchStore } from "../context/useSearchStore";
import { useQuery } from "@tanstack/react-query";

const ProductPage = () => {
  const {
    searchQuery,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    selectedCategory,
    priceRange,
  } = useSearchStore();

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "searchResults",
      searchQuery,
      currentPage,
      selectedCategory,
      priceRange,
    ],
    queryFn: () => searchProducts(searchQuery),
    enabled: !!searchQuery,
  });

  // Filter products based on category and price range
  const filteredProducts = products.filter(
    (product) =>
      (!selectedCategory || product.category === selectedCategory) &&
      product.price >= priceRange.min &&
      product.price <= priceRange.max,
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products.</p>;

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Results for "{searchQuery}"
        {selectedCategory && ` in ${selectedCategory}`}
      </h2>

      {/* Products Grid */}
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="rounded-md border p-3 shadow-md">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-40 w-full rounded-md object-cover"
            />
            <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
            <p className="font-semibold text-blue-500">${product.price}</p>
            <p className="text-sm text-gray-600">{product.category}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`rounded border px-3 py-1 ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;

// Best Chatgpt

// import { searchProducts } from "../services/getDailyDealsProducts";
// import { useSearchStore } from "../context/useSearchStore";
// import { useQuery } from "@tanstack/react-query";

// const ProductPage = () => {
//   const { searchQuery } = useSearchStore();

//   const {
//     data: products = [],
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["searchResults", searchQuery],
//     queryFn: () => searchProducts(searchQuery),
//     enabled: !!searchQuery, // Only fetch if searchQuery is not empty
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching products.</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold">Results for "{searchQuery}"</h2>
//       <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//         {products.map((product) => (
//           <div key={product.id} className="rounded-md border p-3 shadow-md">
//             <img
//               src={product.thumbnail}
//               alt={product.title}
//               className="h-40 w-full rounded-md object-cover"
//             />
//             <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
//             <p className="font-semibold text-blue-500">${product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

// import { useSearchContext } from "../context/useSearchContext";
// import { useQuery } from "@tanstack/react-query";
// import { searchProducts } from "../services/getDailyDealsProducts";
// import SearchResults from "./SearchResults";

// const ProductPage = () => {
//   const { searchQuery } = useSearchContext();

//   const {
//     data: products = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["searchProducts", searchQuery],
//     queryFn: () => searchProducts(searchQuery),
//     enabled: !!searchQuery, // Only fetch when searchQuery is not empty
//   });

//   if (isLoading) return <p className="text-center">Loading...</p>;
//   if (isError)
//     return <p className="text-center text-red-500">Error fetching products.</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold">Results for "{searchQuery}"</h2>
//       {/* <SearchResults /> */}
//       <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//         {products.map((product) => (
//           <div key={product.id} className="rounded-md border p-3 shadow-md">
//             <img
//               src={product.thumbnail}
//               alt={product.title}
//               className="h-40 w-full rounded-md object-cover"
//             />
//             <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
//             <p className="font-semibold text-blue-500">${product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

// import { useEffect, useContext, useState } from "react";
// import { useSearchContext } from "../context/useSearchContext";

// const ProductPage = () => {
//   const { searchQuery, searchResults, fetchResults, currentPage, totalPages } =
//     useSearchContext();
//   const [selectedCategory, setSelectedCategory] = useState<
//     string | undefined
//   >();
//   const [priceRange, setPriceRange] = useState<[number, number] | undefined>();

//   useEffect(() => {
//     if (searchQuery) {
//       fetchResults(currentPage, { category: selectedCategory, priceRange });
//     }
//   }, [searchQuery, currentPage, selectedCategory, priceRange]);

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold">
//         {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
//       </h2>

//       {/* Filtering Section */}
//       <div className="mb-4 flex flex-wrap gap-4">
//         {/* Category Filter */}
//         <select
//           className="rounded border p-2"
//           onChange={(e) => setSelectedCategory(e.target.value || undefined)}
//         >
//           <option value="">All Categories</option>
//           <option value="smartphones">Smartphones</option>
//           <option value="laptops">Laptops</option>
//           <option value="fragrances">Fragrances</option>
//           <option value="skincare">Skincare</option>
//         </select>

//         {/* Price Filter */}
//         <select
//           className="rounded border p-2"
//           onChange={(e) => {
//             const range = e.target.value.split("-").map(Number);
//             setPriceRange(
//               range.length === 2 ? (range as [number, number]) : undefined,
//             );
//           }}
//         >
//           <option value="">All Prices</option>
//           <option value="0-50">Under $50</option>
//           <option value="50-100">$50 - $100</option>
//           <option value="100-500">$100 - $500</option>
//         </select>
//       </div>

//       {/* Products Grid */}
//       <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//         {searchResults.length > 0 ? (
//           searchResults.map((product) => (
//             <div key={product.id} className="rounded-md border p-3 shadow-md">
//               <img
//                 src={product.thumbnail}
//                 alt={product.title}
//                 className="h-40 w-full rounded-md object-cover"
//               />
//               <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
//               <p className="font-semibold text-blue-500">${product.price}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No products found.</p>
//         )}
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="mt-6 flex justify-center gap-4">
//           <button
//             disabled={currentPage === 1}
//             onClick={() =>
//               fetchResults(currentPage - 1, {
//                 category: selectedCategory,
//                 priceRange,
//               })
//             }
//             className="rounded border px-4 py-2 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span>
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() =>
//               fetchResults(currentPage + 1, {
//                 category: selectedCategory,
//                 priceRange,
//               })
//             }
//             className="rounded border px-4 py-2 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductPage;

// import { useContext, useEffect } from "react";
// import axios from "axios";
// import { useSearchContext } from "../context/useSearchContext";

// const ProductPage = () => {
//   const { searchQuery, searchResults, setSearchResults } = useSearchContext();

//   useEffect(() => {
//     if (!searchQuery) return;

//     axios
//       .get(`https://dummyjson.com/products/search?q=${searchQuery}`)
//       .then((res) => setSearchResults(res.data.products))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, [searchQuery, setSearchResults]);

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold">
//         {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
//       </h2>
//       <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//         {searchResults.length > 0 ? (
//           searchResults.map((product) => (
//             <div key={product.id} className="rounded-md border p-3 shadow-md">
//               <img
//                 src={product.thumbnail}
//                 alt={product.title}
//                 className="h-40 w-full rounded-md object-cover"
//               />
//               <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
//               <p className="font-semibold text-blue-500">${product.price}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
