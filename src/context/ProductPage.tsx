// import { searchProducts } from "../services/getDailyDealsProducts";
// import { useSearchStore } from "../context/useSearchStore";
// import { useQuery } from "@tanstack/react-query";

// const ProductPage = () => {
//   const {
//     searchQuery,
//     currentPage,
//     itemsPerPage,
//     setCurrentPage,
//     selectedCategory,
//     priceRange,
//   } = useSearchStore();

//   const {
//     data: products = [],
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: [
//       "searchResults",
//       searchQuery,
//       currentPage,
//       selectedCategory,
//       priceRange,
//     ],
//     queryFn: () => searchProducts(searchQuery),
//     enabled: !!searchQuery,
//   });

//   // Filter products based on category and price range
//   const filteredProducts = products.filter(
//     (product) =>
//       (!selectedCategory || product.category === selectedCategory) &&
//       product.price >= priceRange.min &&
//       product.price <= priceRange.max,
//   );

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedProducts = filteredProducts.slice(
//     startIndex,
//     startIndex + itemsPerPage,
//   );

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching products.</p>;

//   return (
//     <div className="p-4">
//       <h2 className="mb-4 text-lg font-semibold">
//         Results for "{searchQuery}"
//         {selectedCategory && ` in ${selectedCategory}`}
//       </h2>

//       {/* Products Grid */}
//       <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//         {paginatedProducts.map((product) => (
//           <div key={product.id} className="rounded-md border p-3 shadow-md">
//             <img
//               src={product.thumbnail}
//               alt={product.title}
//               className="h-40 w-full rounded-md object-cover"
//             />
//             <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
//             <p className="font-semibold text-blue-500">${product.price}</p>
//             <p className="text-sm text-gray-600">{product.category}</p>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-8 flex justify-center gap-2">
//           <button
//             onClick={() => setCurrentPage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="rounded border px-3 py-1 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`rounded border px-3 py-1 ${
//                 currentPage === i + 1 ? "bg-blue-500 text-white" : ""
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             onClick={() => setCurrentPage(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="rounded border px-3 py-1 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductPage;

// import { useSearchStore } from "../context/useSearchStore";
// import { useQuery } from "@tanstack/react-query";
// import { productService } from "../services/productService";

// const ProductPage = () => {
//   const {
//     searchQuery,
//     currentPage,
//     itemsPerPage,
//     setCurrentPage,
//     selectedCategory,
//     priceRange,
//   } = useSearchStore();

//   const {
//     data: products = [],
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: [
//       "searchResults",
//       searchQuery,
//       currentPage,
//       selectedCategory,
//       priceRange,
//     ],
//     // queryFn: () => searchProducts(searchQuery),
//     queryFn: () =>
//       productService.searchProducts(searchQuery).then((res) => res.products),
//     enabled: !!searchQuery,
//   });

//   console.log("productsproductsproductsproductsproducts", products);

//   // Filter products based on category and price range
//   const filteredProducts = products.filter(
//     (product) =>
//       (!selectedCategory || product.category === selectedCategory) &&
//       product.price >= priceRange.min &&
//       product.price <= priceRange.max,
//   );

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedProducts = filteredProducts.slice(
//     startIndex,
//     startIndex + itemsPerPage,
//   );

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching products.</p>;

//   return (
//     <div className="p-4">
//       <h2 className="mb-4 text-lg font-semibold">
//         Results for "{searchQuery}"
//         {selectedCategory && ` in ${selectedCategory}`}
//       </h2>

//       {/* Products Grid */}
//       <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//         {paginatedProducts.map((product) => (
//           <div key={product.id} className="rounded-md border p-3 shadow-md">
//             <img
//               src={product.thumbnail}
//               alt={product.title}
//               className="h-40 w-full rounded-md object-cover"
//             />
//             <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
//             <p className="font-semibold text-blue-500">${product.price}</p>
//             <p className="text-sm text-gray-600">{product.category}</p>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-8 flex justify-center gap-2">
//           <button
//             onClick={() => setCurrentPage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="rounded border px-3 py-1 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`rounded border px-3 py-1 ${
//                 currentPage === i + 1 ? "bg-blue-500 text-white" : ""
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             onClick={() => setCurrentPage(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="rounded border px-3 py-1 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductPage;

import { useSearchStore } from "../context/useSearchStore";
import { useSearchProducts } from "../hooks/useSearchProducts";

const ProductPage = () => {
  const {
    searchQuery,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    selectedCategory,
  } = useSearchStore();

  const { filteredProducts, isLoading, error } = useSearchProducts();

  console.log("isLoadingisLoadingisLoadingisLoadingisLoading", isLoading);
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
