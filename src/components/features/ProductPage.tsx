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

import { useRef, useMemo, memo, useEffect } from "react";
import ProductCard from "../ui/ProductCard";
import FilterButtons from "../ui/FilterButtons";
import { useSearchStore } from "../../store/searchStore";
import { useSearchProducts } from "../../hooks/useSearchProducts";
import { useGridItems } from "../../hooks/useGridItems";
import Spinner from "../ui/Spinner";
import NoResults from "../ui/NoResults";
import ErrorMessage from "../ui/ErrorMessage";

// Memoize ProductCard to prevent unnecessary re-renders
const MemoizedProductCard = memo(ProductCard);

// Memoize FilterButtons if it doesn't depend on frequently changing props
const MemoizedFilterButtons = memo(FilterButtons);

const ProductPage = () => {
  // const searchQuery = useSearchStore((state) => state.searchQuery);
  // const currentPage = useSearchStore((state) => state.currentPage);
  // const itemsPerPage = useSearchStore((state) => state.itemsPerPage);
  // const setCurrentPage = useSearchStore((state) => state.setCurrentPage);
  // const selectedCategory = useSearchStore((state) => state.selectedCategory);
  const {
    searchQuery,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    selectedCategory,
    setItemsPerPage,
  } = useSearchStore();

  const { filteredProducts, isLoading, error } = useSearchProducts();
  const gridRef = useRef<HTMLDivElement>(null);

  // Apply the grid items hook
  useGridItems(gridRef);

  // Log when itemsPerPage changes to help with debugging
  useEffect(() => {
    console.log("Items per page updated:", itemsPerPage);
  }, [itemsPerPage]);

  // Memoize pagination calculations
  const { paginatedProducts, totalPages, paginationButtons } = useMemo<{
    paginatedProducts: typeof filteredProducts;
    totalPages: number;
    paginationButtons: number[];
  }>(() => {
    const total = Math.ceil(filteredProducts?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginated = filteredProducts.slice(
      startIndex,
      startIndex + itemsPerPage,
    );

    const paginationButtons = Array.from({ length: total }, (_, i) => i + 1);

    return {
      paginatedProducts: paginated,
      totalPages: total,
      paginationButtons: paginationButtons,
    };
  }, [filteredProducts, currentPage, itemsPerPage]);

  if (isLoading)
    return (
      <div className="col-span-2 row-span-1">
        <Spinner />;
      </div>
    );

  // if (error) return <p>Error fetching products.</p>;
  if (error) return <ErrorMessage message={error.message} />;

  console.log(
    "filteredProductsfilteredProductsfilteredProductsfilteredProducts",
    filteredProducts,
  );

  return filteredProducts.length > 0 ? (
    <div className="col-span-2 row-span-1">
      <MemoizedFilterButtons />

      <h2 className="mb-4 text-lg font-semibold">
        Results for "{searchQuery}"
        {selectedCategory && ` in ${selectedCategory}`}
      </h2>

      <div
        ref={gridRef}
        className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-6"
      >
        {paginatedProducts.map((product) => (
          <MemoizedProductCard
            key={product.id}
            id={product.id}
            imgSrc={product.thumbnail}
            title={product.title}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Previous
          </button>

          {paginationButtons.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`rounded border px-3 py-1 ${
                currentPage === page ? "bg-blue-500 text-white" : ""
              }`}
            >
              {page}
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
  ) : (
    <NoResults searchQuery={searchQuery} selectedCategory={selectedCategory} />
  );
};

export default ProductPage;
