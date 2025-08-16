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

// import { useQuery } from "@tanstack/react-query";
// import { productService } from "../services/productService";
// import { useSearchStore } from "../store/searchStore";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// export const useSearchProducts = () => {
//   const navigate = useNavigate();

//   const {
//     debouncedQuery,
//     selectedCategory,
//     minPrice,
//     maxPrice,
//     setIsSearching,
//     searchResults,
//     setSearchResults,
//   } = useSearchStore();

//   const {
//     data: response = { products: [], total: 0 },
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["products", debouncedQuery],
//     queryFn: () =>
//       productService.searchProducts(debouncedQuery, setIsSearching),
//     enabled: !!debouncedQuery.trim(),

//     // keepPreviousData: true,
//   });

//   // useEffect(() => {
//   //   if (!response.products) return;
//   //   setSearchResults(response.products);
//   // }, [setSearchResults, response.products]); // Add this line to update searchResults when response changeseff

//   // setSearchResults(response.products);

//   console.log("response", response);

//   // Filter products based on category and price range
//   const filteredProducts = response.products.filter(
//     (product) =>
//       (!selectedCategory || product.category === selectedCategory) &&
//       product.price >= minPrice &&
//       product.price <= maxPrice,
//   );

//   // if (debouncedQuery) navigate("productPage");
//   // const filteredProducts = response.products.filter(
//   //   (product) =>
//   //     (!selectedCategory || product.category === selectedCategory) &&
//   //     product.price >= priceRange.min &&
//   //     product.price <= priceRange.max,
//   // );

//   return {
//     products: response.products,
//     // products: searchResults,
//     filteredProducts,
//     total: response.total,
//     isLoading,
//     error,
//   };
// };

import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productService";
import { useRouterSearchParams } from "./useRouterSearchParams";
import { useEffect, useMemo } from "react";
import { getPriceDetails } from "../helpers/getPriceDetails";

export const useSearchProducts = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, sort } =
    useRouterSearchParams();

  // const { discountedPrice } = getPriceDetails();

  const {
    data: response = { products: [], total: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", searchQuery],
    // queryKey: ["products", searchQuery, selectedCategory, minPrice, maxPrice],
    queryFn: () => productService.searchProducts(searchQuery),
    enabled: !!searchQuery && searchQuery.trim().length > 0,
  });

  // Filter products based on category and price range
  const filteredProducts = useMemo(() => {
    return response.products
      .map((product) => {
        const { discountedPrice } = getPriceDetails(product);
        return { ...product, discountedPrice };
      })
      .filter((product) => {
        if (selectedCategory && product.category !== selectedCategory)
          return false;
        return (
          product.discountedPrice >= minPrice &&
          product.discountedPrice <= maxPrice
        );
      })
      .sort((a, b) => {
        switch (sort) {
          case "priceLowToHigh":
            return a.discountedPrice - b.discountedPrice;
          case "priceHighToLow":
            return b.discountedPrice - a.discountedPrice;
          case "newest":
            return (
              new Date(b.meta.createdAt).getTime() -
              new Date(a.meta.createdAt).getTime()
            );
          case "oldest":
            return (
              new Date(a.meta.createdAt).getTime() -
              new Date(b.meta.createdAt).getTime()
            );
          default:
            return 0;
        }
      });
  }, [response.products, selectedCategory, minPrice, maxPrice, sort]);

  // const filteredProducts = useMemo(
  //   () =>
  //     response.products
  //       .filter(
  //         (product) =>
  //           (!selectedCategory || product.category === selectedCategory) &&
  //           product.price >= minPrice &&
  //           product.price <= maxPrice,
  //         // product.price >= minPrice &&
  //         // product.price <= maxPrice,
  //       )
  //       .sort((a, b) => {
  //         switch (sort) {
  //           case "priceLowToHigh":
  //             return a.price - b.price;
  //           case "priceHighToLow":
  //             return b.price - a.price;
  //           case "newest":
  //             return (
  //               new Date(b.meta.createdAt).getTime() -
  //               new Date(a.meta.createdAt).getTime()
  //             );
  //           case "oldest":
  //             return (
  //               new Date(a.meta.createdAt).getTime() -
  //               new Date(b.meta.createdAt).getTime()
  //             );
  //           default:
  //             return 0;
  //         }
  //       }),
  //   [response.products, selectedCategory, minPrice, maxPrice, sort],
  // );

  //  .sort((a, b) => {
  //         switch (sort) {
  //           case "priceLowToHigh":
  //             return a.price - b.price;
  //           case "priceHighToLow":
  //             return b.price - a.price;
  //           case "newest":
  //             return (
  //               new Date(b.dateCreated).getTime() -
  //               new Date(a.dateCreated).getTime()
  //             );
  //           case "oldest":
  //             return (
  //               new Date(a.dateCreated).getTime() -
  //               new Date(b.dateCreated).getTime()
  //             );
  //           default:
  //             return 0;
  //         });

  console.log("filteredSuggestions reference:", filteredProducts);

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
