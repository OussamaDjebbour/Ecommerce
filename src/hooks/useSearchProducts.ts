// import { useQuery } from "@tanstack/react-query";
// import { productService } from "../services/productService";
// import { useSearchStore } from "../context/useSearchStore";

// export const useSearchProducts = () => {
//   const { searchQuery, selectedCategory, priceRange, setProducts } =
//     useSearchStore();

//   const query = useQuery({
//     queryKey: ["searchResults", searchQuery, selectedCategory, priceRange],
//     queryFn: async () => {
//       if (!searchQuery.trim()) return [];

//       const products = await productService
//         .searchProducts(searchQuery)
//         .then((res) => res.products);

//       // Store fetched products in Zustand for shared state
//       setProducts(products);

//       return products;
//     },
//     enabled: !!searchQuery,
//   });

//   return query;
// };

// import { useQuery } from "@tanstack/react-query";
// import { productService } from "../services/productService";
// import { useSearchStore } from "../context/useSearchStore";

// export const useSearchProducts = () => {
//   const { searchQuery, selectedCategory, priceRange } = useSearchStore();

//   const {
//     data: response = { products: [], total: 0 },
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["products", searchQuery],
//     queryFn: () => productService.searchProducts(searchQuery),
//     enabled: !!searchQuery?.trim(),
//   });

//   // Filter products based on category and price range
//   const filteredProducts = response.products.filter(
//     (product) =>
//       (!selectedCategory || product.category === selectedCategory) &&
//       product.price >= priceRange.min &&
//       product.price <= priceRange.max,
//   );

//   return {
//     products: response.products,
//     filteredProducts,
//     total: response.total,
//     isLoading,
//     error,
//   };
// };

import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productService";
import { useSearchStore } from "../context/useSearchStore";

export const useSearchProducts = () => {
  const { debouncedQuery, selectedCategory, priceRange } = useSearchStore();

  const {
    data: response = { products: [], total: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", debouncedQuery],
    queryFn: () => productService.searchProducts(debouncedQuery),
    enabled: !!debouncedQuery?.trim(),
  });

  // Filter products based on category and price range
  const filteredProducts = response.products.filter(
    (product) =>
      (!selectedCategory || product.category === selectedCategory) &&
      product.price >= priceRange.min &&
      product.price <= priceRange.max,
  );

  return {
    products: response.products,
    filteredProducts,
    total: response.total,
    isLoading,
    error,
  };
};

// import { useQuery } from "@tanstack/react-query";
// import { useSearchStore } from "../context/useSearchStore";
// import { productService } from "../services/productService";

// export const useSearchProducts = () => {
//   const { searchQuery } = useSearchStore();

//   return useQuery({
//     queryKey: ["searchResults", searchQuery],
//     queryFn: () =>
//       productService.searchProducts(searchQuery).then((res) => res.products),
//     enabled: !!searchQuery,
//     staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
//   });
// };
