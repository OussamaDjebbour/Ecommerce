import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productService";
import { useRouterSearchParams } from "./useRouterSearchParams";
import { getPriceDetails } from "../helpers/getPriceDetails";

export const useSearchProducts = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, sort } =
    useRouterSearchParams();

  const {
    data: response = { products: [], total: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", searchQuery],
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

  return {
    products: response.products,
    filteredProducts,
    total: response.total,
    isLoading,
    error,
  };
};
