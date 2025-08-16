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

// import { useEffect } from "react";
// import { useSearchStore } from "../context/useSearchStore";
// import ProductCard from "../components/ui/ProductCard";
// import FilterButtons from "../components/ui/FilterButtons";
// import { useSearchProducts } from "../hooks/useSearchProducts";

// const ProductPage = () => {
//   const {
//     searchQuery,
//     currentPage,
//     itemsPerPage,
//     setCurrentPage,
//     setItemsPerPage,
//     selectedCategory,
//   } = useSearchStore();

//   const { filteredProducts, isLoading, error } = useSearchProducts();

// // Dynamically adjust items per page based on screen size
// useEffect(() => {
//   const updateItemsPerPage = () => {
//     const screenWidth = window.innerWidth;
//     if (screenWidth >= 1280) {
//       setItemsPerPage(5); // Large screens (5 items)
//     } else if (screenWidth >= 1024) {
//       setItemsPerPage(4); // Medium screens (4 items)
//     } else if (screenWidth >= 768) {
//       setItemsPerPage(3); // Tablets (3 items)
//     } else {
//       setItemsPerPage(2); // Mobile (2 items)
//     }
//   };

//   updateItemsPerPage(); // Run on mount
//   window.addEventListener("resize", updateItemsPerPage);
//   return () => window.removeEventListener("resize", updateItemsPerPage);
// }, [setItemsPerPage]);

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
//     <div className="col-span-2 row-span-1">
//       <FilterButtons />

//       <h2 className="mb-4 text-lg font-semibold">
//         Results for "{searchQuery}"
//         {selectedCategory && ` in ${selectedCategory}`}
//       </h2>

//       <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4">
//         {paginatedProducts.map((product) => (
//           <ProductCard
//             key={product.id}
//             imgSrc={product.thumbnail}
//             title={product.title}
//             price={product.price}
//             rating={product.rating}
//           />
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

// import { useMemo, useRef } from "react";
// import ProductCard from "../components/ui/ProductCard";
// import FilterButtons from "../components/ui/FilterButtons";
// import { useSearchStore } from "../context/useSearchStore";
// import { useSearchProducts } from "../hooks/useSearchProducts";
// import { useGridItems } from "../hooks/useGridItems";

// const ProductPage = () => {
//   const {
//     searchQuery,
//     currentPage,
//     itemsPerPage,
//     setCurrentPage,
//     selectedCategory,
//   } = useSearchStore();

//   const { filteredProducts, isLoading, error } = useSearchProducts();
//   const gridRef = useRef<HTMLDivElement>(null);

//   console.log("gridRefgridRefgridRefgridRefgridRefgridRef");

//   // Use the grid items hook to dynamically update itemsPerPage
//   useGridItems(gridRef);

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedProducts = filteredProducts.slice(
//     startIndex,
//     startIndex + itemsPerPage,
//   );

//   const paginationButtons = useMemo(() => {
//     return Array.from({ length: totalPages }, (_, i) => i + 1);
//   }, [totalPages]);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching products.</p>;

//   return (
//     <div className="col-span-2 row-span-1">
//       <FilterButtons />

//       <h2 className="mb-4 text-lg font-semibold">
//         Results for "{searchQuery}"
//         {selectedCategory && ` in ${selectedCategory}`}
//       </h2>

//       {/* Products Grid */}
//       <div
//         ref={gridRef}
//         className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4"
//       >
//         {paginatedProducts.map((product) => (
//           <ProductCard
//             key={product.id}
//             imgSrc={product.thumbnail}
//             title={product.title}
//             price={product.price}
//             rating={product.rating}
//           />
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
//           {/* {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`rounded border px-3 py-1 ${
//                 currentPage === i + 1 ? "bg-blue-500 text-white" : ""
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))} */}
//           {paginationButtons.map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`rounded border px-3 py-1 ${
//                 currentPage === page ? "bg-blue-500 text-white" : ""
//               }`}
//             >
//               {page}
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

// import ProductCard from "../components/ui/ProductCard";
// import FilterButtons from "../components/ui/FilterButtons";
// import { useSearchStore } from "../context/useSearchStore";
// import { useSearchProducts } from "../hooks/useSearchProducts";

// const ProductPage = () => {
//   const {
//     searchQuery,
//     currentPage,
//     itemsPerPage,
//     setCurrentPage,
//     selectedCategory,
//   } = useSearchStore();

//   const { filteredProducts, isLoading, error } = useSearchProducts();

//   console.log("isLoadingisLoadingisLoadingisLoadingisLoading", isLoading);
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
//     <div className="col-span-2 row-span-1">
//       <FilterButtons />

//       <h2 className="mb-4 text-lg font-semibold">
//         Results for "{searchQuery}"
//         {selectedCategory && ` in ${selectedCategory}`}
//       </h2>

//       {/* Products Grid */}
//       {/* lg:grid-cols-4 */}
//       <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4">
//         {/* <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"> */}
//         {paginatedProducts.map((product) => (
//           // <div key={product.id} className="rounded-md border p-3 shadow-md">
//           //   <img
//           //     src={product.thumbnail}
//           //     alt={product.title}
//           //     className="h-40 w-full rounded-md object-cover"
//           //   />
//           //   <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
//           //   <p className="font-semibold text-blue-500">${product.price}</p>
//           //   <p className="text-sm text-gray-600">{product.category}</p>
//           // </div>
//           <ProductCard
//             imgSrc={product.thumbnail}
//             title={product.title}
//             price={product.price}
//             rating={product.rating}
//           />
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

// import { useRef, useMemo, memo, useEffect } from "react";
// import ProductCard from "../ui/ProductCard";
// import FilterButtons from "../ui/FilterButtons";
// import { useSearchProducts } from "../../hooks/useSearchProducts";
// import { useGridItems } from "../../hooks/useGridItems";
// import { useSearchStore } from "../../context/useSearchStore";

// // Memoize ProductCard to prevent unnecessary re-renders
// const MemoizedProductCard = memo(ProductCard);

// // Memoize FilterButtons if it doesn't depend on frequently changing props
// const MemoizedFilterButtons = memo(FilterButtons);

// const ProductPage = () => {
//   const {
//     searchQuery,
//     currentPage,
//     itemsPerPage,
//     setItemsPerPage,
//     setCurrentPage,
//     selectedCategory,
//   } = useSearchStore();

//   // const itemsPerPage = 10;

//   const { filteredProducts, isLoading, error } = useSearchProducts();
//   const gridRef = useRef<HTMLDivElement>(null);

//   useGridItems(gridRef);

//   // Memoize pagination calculations
//   const { paginatedProducts, totalPages, paginationButtons } = useMemo<{
//     paginatedProducts: typeof filteredProducts;
//     totalPages: number;
//     paginationButtons: number[];
//   }>(() => {
//     const total = Math.ceil(filteredProducts?.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const paginated = filteredProducts.slice(
//       startIndex,
//       startIndex + itemsPerPage,
//     );

//     const paginationButtons = Array.from({ length: total }, (_, i) => i + 1);

//     return {
//       paginatedProducts: paginated,
//       totalPages: total,
//       paginationButtons: paginationButtons,
//     };
//   }, [filteredProducts, currentPage, itemsPerPage]);

//   // Dynamically adjust items per page based on screen size
//   // useEffect(() => {
//   //   const updateItemsPerPage = () => {
//   //     const screenWidth = window.innerWidth;
//   //     if (screenWidth >= 1280) {
//   //       setItemsPerPage(5); // Large screens (5 items)
//   //     } else if (screenWidth >= 1024) {
//   //       setItemsPerPage(4); // Medium screens (4 items)
//   //     } else if (screenWidth >= 768) {
//   //       setItemsPerPage(3); // Tablets (3 items)
//   //     } else {
//   //       setItemsPerPage(2); // Mobile (2 items)
//   //     }
//   //   };

//   //   updateItemsPerPage(); // Run on mount
//   //   window.addEventListener("resize", updateItemsPerPage);
//   //   return () => window.removeEventListener("resize", updateItemsPerPage);
//   // }, [setItemsPerPage]);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching products.</p>;

//   return (
//     <div className="col-span-2 row-span-1">
//       <MemoizedFilterButtons />

//       <h2 className="mb-4 text-lg font-semibold">
//         Results for "{searchQuery}"
//         {selectedCategory && ` in ${selectedCategory}`}
//       </h2>

//       <div
//         ref={gridRef}
//         className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4"
//       >
//         {paginatedProducts.map((product) => (
//           <MemoizedProductCard
//             key={product.id}
//             imgSrc={product.thumbnail}
//             title={product.title}
//             price={product.price}
//             rating={product.rating}
//           />
//         ))}
//       </div>

//       {totalPages > 1 && (
//         <div className="mt-8 flex justify-center gap-2">
//           <button
//             onClick={() => setCurrentPage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="rounded border px-3 py-1 disabled:opacity-50"
//           >
//             Previous
//           </button>

//           {paginationButtons.map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`rounded border px-3 py-1 ${
//                 currentPage === page ? "bg-blue-500 text-white" : ""
//               }`}
//             >
//               {page}
//             </button>
//           ))}

//           {/* {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`rounded border px-3 py-1 ${
//                 currentPage === i + 1 ? "bg-blue-500 text-white" : ""
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))} */}

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

// import { useRef, useMemo, memo, useEffect } from "react";
// import ProductCard from "../ui/ProductCard";
// import FilterButtons from "../ui/FilterButtons";
// import { useSearchStore } from "../../store/searchStore";
// import { useSearchProducts } from "../../hooks/useSearchProducts";
// import { useGridItems } from "../../hooks/useGridItems";
// import Spinner from "../ui/Spinner";
// import NoResults from "../ui/NoResults";
// import ErrorMessage from "../ui/ErrorMessage";

// // Memoize ProductCard to prevent unnecessary re-renders
// const MemoizedProductCard = memo(ProductCard);

// // Memoize FilterButtons if it doesn't depend on frequently changing props
// const MemoizedFilterButtons = memo(FilterButtons);

// const ProductPage = () => {
//   // const searchQuery = useSearchStore((state) => state.searchQuery);
//   // const currentPage = useSearchStore((state) => state.currentPage);
//   // const itemsPerPage = useSearchStore((state) => state.itemsPerPage);
//   // const setCurrentPage = useSearchStore((state) => state.setCurrentPage);
//   // const selectedCategory = useSearchStore((state) => state.selectedCategory);
//   const {
//     searchQuery,
//     currentPage,
//     itemsPerPage,
//     setCurrentPage,
//     selectedCategory,
//     setItemsPerPage,
//   } = useSearchStore();

//   const { filteredProducts, isLoading, error } = useSearchProducts();
//   const gridRef = useRef<HTMLDivElement>(null);

//   // Apply the grid items hook
//   useGridItems(gridRef);

//   // Log when itemsPerPage changes to help with debugging
//   useEffect(() => {
//     console.log("Items per page updated:", itemsPerPage);
//   }, [itemsPerPage]);

//   // Memoize pagination calculations
//   const { paginatedProducts, totalPages, paginationButtons } = useMemo<{
//     paginatedProducts: typeof filteredProducts;
//     totalPages: number;
//     paginationButtons: number[];
//   }>(() => {
//     const total = Math.ceil(filteredProducts?.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const paginated = filteredProducts.slice(
//       startIndex,
//       startIndex + itemsPerPage,
//     );

//     const paginationButtons = Array.from({ length: total }, (_, i) => i + 1);

//     return {
//       paginatedProducts: paginated,
//       totalPages: total,
//       paginationButtons: paginationButtons,
//     };
//   }, [filteredProducts, currentPage, itemsPerPage]);

//   if (isLoading)
//     return (
//       <div className="col-span-2 row-span-1">
//         <Spinner />
//       </div>
//     );

//   // if (error) return <p>Error fetching products.</p>;
//   if (error) return <ErrorMessage message={error.message} />;

//   console.log(
//     "filteredProductsfilteredProductsfilteredProductsfilteredProducts",
//     filteredProducts,
//   );

//   return filteredProducts.length > 0 ? (
//     <div className="col-span-2 row-span-1">
//       <MemoizedFilterButtons />

//       <h2 className="mb-4 text-lg font-semibold">
//         Results for "{searchQuery}"
//         {selectedCategory && ` in ${selectedCategory}`}
//       </h2>

//       <div
//         ref={gridRef}
//         className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-6"
//       >
//         {paginatedProducts.map((product) => (
//           <MemoizedProductCard
//             key={product.id}
//             id={product.id}
//             imgSrc={product.thumbnail}
//             title={product.title}
//             price={product.price}
//             rating={product.rating}
//             stock={product.stock}
//           />
//         ))}
//       </div>

//       {totalPages > 1 && (
//         <div className="mt-8 flex justify-center gap-2">
//           <button
//             onClick={() => setCurrentPage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="rounded border px-3 py-1 disabled:opacity-50"
//           >
//             Previous
//           </button>

//           {paginationButtons.map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`rounded border px-3 py-1 ${
//                 currentPage === page ? "bg-blue-500 text-white" : ""
//               }`}
//             >
//               {page}
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
//   ) : (
//     <NoResults searchQuery={searchQuery} selectedCategory={selectedCategory} />
//   );
// };

// export default ProductPage;

// import { useRef, useMemo, memo } from "react";
// import ProductCard from "../ui/ProductCard";
// import FilterButtons from "../ui/FilterButtons";
// import { useSearchParams } from "../../hooks/useSearchParams";
// import { useSearchProducts } from "../../hooks/useSearchProducts";
// import { useGridItems } from "../../hooks/useGridItems";
// import Spinner from "../ui/Spinner";
// import NoResults from "../ui/NoResults";
// import ErrorMessage from "../ui/ErrorMessage";

// const MemoizedProductCard = memo(ProductCard);
// const MemoizedFilterButtons = memo(FilterButtons);

// const ProductPage = () => {
//   const { searchQuery, currentPage, selectedCategory, setCurrentPage } =
//     useSearchParams();

//   const { filteredProducts, isLoading, error } = useSearchProducts();
//   const gridRef = useRef<HTMLDivElement>(null);

//   useGridItems(gridRef);

//   const itemsPerPage = 12; // You can make this configurable via URL params too

//   const { paginatedProducts, totalPages, paginationButtons } = useMemo(() => {
//     const total = Math.ceil(filteredProducts?.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const paginated = filteredProducts.slice(
//       startIndex,
//       startIndex + itemsPerPage,
//     );

//     return {
//       paginatedProducts: paginated,
//       totalPages: total,
//       paginationButtons: Array.from({ length: total }, (_, i) => i + 1),
//     };
//   }, [filteredProducts, currentPage]);

//   if (isLoading) {
//     return (
//       <div className="col-span-2 row-span-1">
//         <Spinner />
//       </div>
//     );
//   }

//   if (error) return <ErrorMessage message={error.message} />;

//   return filteredProducts.length > 0 ? (
//     <div className="col-span-2 row-span-1">
//       <MemoizedFilterButtons />

//       <h2 className="mb-4 text-lg font-semibold">
//         Results for "{searchQuery}"
//         {selectedCategory && ` in ${selectedCategory}`}
//       </h2>

//       <div
//         ref={gridRef}
//         className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-6"
//       >
//         {paginatedProducts.map((product) => (
//           <MemoizedProductCard
//             key={product.id}
//             id={product.id}
//             imgSrc={product.thumbnail}
//             title={product.title}
//             price={product.price}
//             rating={product.rating}
//             stock={product.stock}
//           />
//         ))}
//       </div>

//       {totalPages > 1 && (
//         <div className="mt-8 flex justify-center gap-2">
//           <button
//             onClick={() => setCurrentPage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="rounded border px-3 py-1 disabled:opacity-50"
//           >
//             Previous
//           </button>

//           {paginationButtons.map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`rounded border px-3 py-1 ${
//                 currentPage === page ? "bg-blue-500 text-white" : ""
//               }`}
//             >
//               {page}
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
//   ) : (
//     <NoResults searchQuery={searchQuery} selectedCategory={selectedCategory} />
//   );
// };

// export default ProductPage;

// import { useRef, useMemo, memo, useEffect } from "react";
// import ProductCard from "../ui/ProductCard";
// import FilterButtons from "../ui/FilterButtons";
// import { useRouterSearchParams } from "../../hooks/useRouterSearchParams";
// import { useSearchProducts } from "../../hooks/useSearchProducts";
// import { useGridItems } from "../../hooks/useGridItems";
// import Spinner from "../ui/Spinner";
// import NoResults from "../ui/NoResults";
// import ErrorMessage from "../ui/ErrorMessage";
// import { useSearchStore } from "../../store/searchStore";
// import { Link, useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// const MemoizedProductCard = memo(ProductCard);
// const MemoizedFilterButtons = memo(FilterButtons);

// const ProductPage = () => {
//   const { searchQuery, currentPage, selectedCategory, setCurrentPage } =
//     useRouterSearchParams();

//   const { filteredProducts, isLoading, error } = useSearchProducts();
//   const gridRef = useRef<HTMLDivElement>(null);

//   const { itemsPerPage, setItemsPerPage } = useSearchStore();

//   useGridItems(gridRef);

//   useEffect(() => {
//     // const updateItemsPerPage = () => {
//     //   const screenWidth = window.innerWidth;
//     //   if (screenWidth >= 1310) {
//     //     setItemsPerPage(3); // Large screens (3 items)
//     //   } else if (screenWidth >= 1000) {
//     //     setItemsPerPage(2); // Medium screens (2 items)
//     //   } else {
//     //     setItemsPerPage(1); // Mobile (1 item)
//     //   }
//     // };
//     const updateItemsPerPage = () => {
//       const screenWidth = window.innerWidth;
//       if (screenWidth >= 1280) {
//         setItemsPerPage(5); // Large screens (5 items)
//       } else if (screenWidth >= 1024) {
//         setItemsPerPage(4); // Medium screens (4 items)
//       } else if (screenWidth >= 768) {
//         setItemsPerPage(3); // Tablets (3 items)
//       } else {
//         setItemsPerPage(2); // Mobile (2 items)
//       }
//     };

//     updateItemsPerPage(); // Run on mount
//     window.addEventListener("resize", updateItemsPerPage);
//     return () => window.removeEventListener("resize", updateItemsPerPage);
//   }, [setItemsPerPage]);

//   const navigate = useNavigate();

//   // const itemsPerPage = 12; // You can make this configurable via URL params too

//   const { paginatedProducts, totalPages, paginationButtons } = useMemo(() => {
//     const total = Math.ceil(filteredProducts?.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const paginated = filteredProducts.slice(
//       startIndex,
//       startIndex + itemsPerPage,
//     );

//     return {
//       paginatedProducts: paginated,
//       totalPages: total,
//       paginationButtons: Array.from({ length: total }, (_, i) => i + 1),
//     };
//   }, [filteredProducts, currentPage, itemsPerPage]);

//   // if (isLoading) {
//   //   return (
//   //     <div className="col-span-2 row-span-1">
//   //       <Spinner />
//   //     </div>
//   //   );
//   // }

//   console.log("searchQuerysearchQuerysearchQuery", searchQuery);

//   if (error) return <ErrorMessage message={error.message} />;

//   return (
//     <div className="col-span-2 row-span-1">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
//       >
//         <ArrowLeft className="h-5 w-5" />
//         Go Back
//       </button>
//       <MemoizedFilterButtons />
//       {isLoading ? (
//         <Spinner />
//       ) : filteredProducts.length > 0 ? (
//         <>
//           {/* <button
//             onClick={() => navigate(-1)}
//             className="text-blue-500 underline"
//           >
//             <ArrowLeft /> Go Back
//           </button> */}

//           <h2 className="mb-4 text-lg font-semibold">
//             Results for "
//             <span className="font-bold text-gray-900">{searchQuery}</span>"
//             {selectedCategory && ` in ${selectedCategory}`}
//           </h2>

//           <div
//             ref={gridRef}
//             className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-6"
//           >
//             {paginatedProducts.map((product) => (
//               <MemoizedProductCard
//                 product={product}
//                 key={product.id}
//                 id={product.id}
//                 imgSrc={product.thumbnail}
//                 title={product.title}
//                 price={product.price}
//                 rating={product.rating}
//                 stock={product.stock}
//               />
//             ))}
//           </div>

//           {totalPages > 1 && (
//             <div className="mt-8 flex justify-center gap-2">
//               <button
//                 onClick={() => setCurrentPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="rounded border px-3 py-1 disabled:opacity-50"
//               >
//                 Previous
//               </button>

//               {paginationButtons.map((page) => (
//                 <button
//                   key={page}
//                   onClick={() => setCurrentPage(page)}
//                   className={`rounded border px-3 py-1 ${
//                     currentPage === page ? "bg-blue-500 text-white" : ""
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}

//               <button
//                 onClick={() => setCurrentPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="rounded border px-3 py-1 disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         <NoResults
//           searchQuery={searchQuery}
//           selectedCategory={selectedCategory}
//         />
//       )}
//     </div>
//   );
//   //  : (
//   //   <NoResults searchQuery={searchQuery} selectedCategory={selectedCategory} />
//   // );
//   // return filteredProducts.length > 0 ? (
//   //   <div className="col-span-2 row-span-1">
//   //     <MemoizedFilterButtons />
//   //     {
//   //       // isLoading ? (
//   //       //   <Spinner />
//   //       // ) : (
//   //       <>
//   //         <h2 className="mb-4 text-lg font-semibold">
//   //           Results for "{searchQuery}"
//   //           {selectedCategory && ` in ${selectedCategory}`}
//   //         </h2>

//   //         <div
//   //           ref={gridRef}
//   //           className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-6"
//   //         >
//   //           {paginatedProducts.map((product) => (
//   //             <MemoizedProductCard
//   //               key={product.id}
//   //               id={product.id}
//   //               imgSrc={product.thumbnail}
//   //               title={product.title}
//   //               price={product.price}
//   //               rating={product.rating}
//   //               stock={product.stock}
//   //             />
//   //           ))}
//   //         </div>

//   //         {totalPages > 1 && (
//   //           <div className="mt-8 flex justify-center gap-2">
//   //             <button
//   //               onClick={() => setCurrentPage(currentPage - 1)}
//   //               disabled={currentPage === 1}
//   //               className="rounded border px-3 py-1 disabled:opacity-50"
//   //             >
//   //               Previous
//   //             </button>

//   //             {paginationButtons.map((page) => (
//   //               <button
//   //                 key={page}
//   //                 onClick={() => setCurrentPage(page)}
//   //                 className={`rounded border px-3 py-1 ${
//   //                   currentPage === page ? "bg-blue-500 text-white" : ""
//   //                 }`}
//   //               >
//   //                 {page}
//   //               </button>
//   //             ))}

//   //             <button
//   //               onClick={() => setCurrentPage(currentPage + 1)}
//   //               disabled={currentPage === totalPages}
//   //               className="rounded border px-3 py-1 disabled:opacity-50"
//   //             >
//   //               Next
//   //             </button>
//   //           </div>
//   //         )}
//   //       </>
//   //     }
//   //   </div>
//   // ) : (
//   //   <NoResults searchQuery={searchQuery} selectedCategory={selectedCategory} />
//   // );
// };

// export default ProductPage;

import { useRef, useMemo, memo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Package, ArrowRight } from "lucide-react";
import ProductCard from "../ui/ProductCard";
import FilterButtons from "../ui/FilterButtons";
import { useRouterSearchParams } from "../../hooks/useRouterSearchParams";
import { useSearchProducts } from "../../hooks/useSearchProducts";
import { useGridItems } from "../../hooks/useGridItems";
import { useSearchStore } from "../../store/searchStore";
import Spinner from "../ui/Spinner";
import NoResults from "../ui/NoResults";
import ErrorMessage from "../ui/ErrorMessage";

const MemoizedProductCard = memo(ProductCard);
const MemoizedFilterButtons = memo(FilterButtons);

const ProductPage = memo(() => {
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);

  const { searchQuery, currentPage, selectedCategory, setCurrentPage } =
    useRouterSearchParams();
  const { filteredProducts, isLoading, error } = useSearchProducts();
  const { itemsPerPage, setItemsPerPage } = useSearchStore();

  // useGridItems(gridRef);

  useEffect(() => {
    // const updateItemsPerPage = () => {
    //   const screenWidth = window.innerWidth;
    //   if (screenWidth >= 1310) {
    //     setItemsPerPage(3); // Large screens (3 items)
    //   } else if (screenWidth >= 1000) {
    //     setItemsPerPage(2); // Medium screens (2 items)
    //   } else {
    //     setItemsPerPage(1); // Mobile (1 item)
    //   }
    // };
    const updateItemsPerPage = () => {
      const screenWidth = window.innerWidth;
      // if (screenWidth >= 1280) {
      //   setItemsPerPage(6); // Large screens (5 items)
      // } else if (screenWidth >= 1024) {
      //   setItemsPerPage(8); // Medium screens (4 items)
      // }
      if (screenWidth >= 958) {
        setItemsPerPage(6); // Tablets (3 items)
      } else if (screenWidth >= 648) {
        setItemsPerPage(4); // Tablets (3 items)
      } else {
        setItemsPerPage(2); // Mobile (2 items)
      }
    };

    updateItemsPerPage(); // Run on mount
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [setItemsPerPage]);

  const { paginatedProducts, totalPages, paginationButtons } = useMemo(() => {
    if (!filteredProducts?.length) {
      return { paginatedProducts: [], totalPages: 0, paginationButtons: [] };
    }

    const total = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginated = filteredProducts.slice(
      startIndex,
      startIndex + itemsPerPage,
    );

    return {
      paginatedProducts: paginated,
      totalPages: total,
      paginationButtons: Array.from({ length: total }, (_, i) => i + 1),
    };
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      // Smooth scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setCurrentPage],
  );

  const renderPageNumbers = () => {
    const totalButtons: (number | string)[] = [];

    if (totalPages <= 5) {
      // Show all if total is small
      for (let i = 1; i <= totalPages; i++) totalButtons.push(i);
    } else {
      // Always show first
      totalButtons.push(1);

      // Show dots before current if needed
      if (currentPage > 3) totalButtons.push("...");

      // Show current - 1, current, current + 1
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 1 && i < totalPages) totalButtons.push(i);
      }

      // Show dots after current if needed
      if (currentPage < totalPages - 2) totalButtons.push("...");

      // Always show last
      totalButtons.push(totalPages);
    }

    return totalButtons.map((page, idx) =>
      typeof page === "number" ? (
        <button
          key={idx}
          onClick={() => handlePageChange(page)}
          className={`rounded-lg px-2 py-1 text-sm font-medium transition-all duration-200 min-[550px]:px-3 min-[550px]:py-2 min-[580px]:min-w-[40px] ${
            currentPage === page
              ? "bg-[#009393] text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          // className={`min-w-[40px] rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
          //   currentPage === page
          //     ? "bg-[#009393] text-white shadow-sm"
          //     : "text-gray-700 hover:bg-gray-100"
          // }`}
        >
          {page}
        </button>
      ) : (
        <span key={idx} className="select-none px-2 text-gray-400">
          {page}
        </span>
      ),
    );
  };

  if (error) {
    return (
      <div className="col-span-2 row-span-1">
        <ErrorMessage message={error.message} />
      </div>
    );
  }

  return (
    <div className="col-span-2 row-span-1 min-h-screen bg-gray-50 pt-8 xl:pt-0">
      <div className="mx-auto max-w-7xl px-4 pb-6">
        {/* Header Section */}

        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="group mb-6 flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition-all duration-200 hover:bg-white hover:text-gray-900 hover:shadow-sm"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Go Back</span>
          </button>

          {/* Search Results Header */}
          {searchQuery && (
            <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center gap-3">
                <Search className="h-6 w-6 text-[#009393]" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h1>
              </div>
              {!isLoading && (
                <p className="text-gray-600">
                  Found{" "}
                  <span className="font-semibold text-[#009393]">
                    {filteredProducts?.length || 0}
                  </span>{" "}
                  results for{" "}
                  <span className="font-bold text-gray-900">
                    "{searchQuery}"
                  </span>
                  {selectedCategory && (
                    <>
                      {" "}
                      in{" "}
                      <span className="font-semibold text-[#009393]">
                        {selectedCategory}
                      </span>
                    </>
                  )}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Filters Section */}
        {
          <div className="mb-12 xl:mb-10">
            <MemoizedFilterButtons />
          </div>
        }

        {/* Content Section */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner />
          </div>
        ) : filteredProducts?.length > 0 ? (
          <>
            {/* Products Grid */}
            <div
              ref={gridRef}
              // 280px
              className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] justify-items-center gap-6"
            >
              {paginatedProducts.map((product) => (
                <MemoizedProductCard
                  key={product.id}
                  product={product}
                  id={product.id}
                  imgSrc={product.thumbnail}
                  title={product.title}
                  price={product.price}
                  rating={product.rating}
                  stock={product.stock}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 rounded-lg bg-white py-4 shadow-sm">
                {/* Previous */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 px-2 py-2 text-gray-700 transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white min-[500px]:px-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-xs min-[500px]:text-base">
                    Previous
                  </span>
                </button>

                {/* Page Numbers */}
                <div className="flex flex-wrap justify-center gap-1">
                  {renderPageNumbers()}
                </div>

                {/* Next */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 px-2 py-2 text-gray-700 transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white min-[500px]:px-4"
                >
                  <span className="text-xs min-[500px]:text-base">Next</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              // <div className="flex items-center justify-center gap-2 rounded-lg bg-white p-6 shadow-sm">
              //   <button
              //     onClick={() => handlePageChange(currentPage - 1)}
              //     disabled={currentPage === 1}
              //     className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
              //   >
              //     <ArrowLeft className="h-4 w-4" />
              //     Previous
              //   </button>

              //   <div className="flex gap-1">
              //     {paginationButtons.map((page) => (
              //       <button
              //         key={page}
              //         onClick={() => handlePageChange(page)}
              //         className={`min-w-[40px] rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
              //           currentPage === page
              //             ? "bg-[#009393] text-white shadow-sm"
              //             : "text-gray-700 hover:bg-gray-100"
              //         }`}
              //       >
              //         {page}
              //       </button>
              //     ))}
              //   </div>

              //   <button
              //     onClick={() => handlePageChange(currentPage + 1)}
              //     disabled={currentPage === totalPages}
              //     className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
              //   >
              //     Next
              //     <ArrowLeft className="h-4 w-4 rotate-180" />
              //   </button>
              // </div>
            )}
          </>
        ) : (
          <NoResults
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        )}
      </div>
    </div>
  );
});

ProductPage.displayName = "ProductPage";

export default ProductPage;
