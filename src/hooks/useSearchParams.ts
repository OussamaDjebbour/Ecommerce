// import {
//   useSearchParams as useRouterSearchParams,
//   useNavigate,
// } from "react-router-dom";
// import { useMemo, useCallback } from "react";
// // import { debounce } from "lodash";
// import debounce from "lodash.debounce";

// export const useSearchParams = () => {
//   const [searchParams, setSearchParams] = useRouterSearchParams();
//   const navigate = useNavigate();

//   // Get current values from URL
//   const searchQuery = searchParams.get("q") || "";
//   const selectedCategory = searchParams.get("category") || "";
//   const minPrice = Number(searchParams.get("minPrice")) || 0;
//   const maxPrice = Number(searchParams.get("maxPrice")) || 10000;
//   const currentPage = Number(searchParams.get("page")) || 1;

//   // Debounced function to update search params
//   const debouncedUpdateParams = useMemo(
//     () =>
//       debounce((params: Record<string, string | number>) => {
//         const newParams = new URLSearchParams(searchParams);

//         Object.entries(params).forEach(([key, value]) => {
//           if (value && value !== "" && value !== 0) {
//             newParams.set(key, String(value));
//           } else {
//             newParams.delete(key);
//           }
//         });

//         setSearchParams(newParams);
//       }, 700),
//     [searchParams, setSearchParams],
//   );

//   // Update search query
//   const setSearchQuery = useCallback(
//     (query: string) => {
//       const newParams = new URLSearchParams(searchParams);

//       if (query.trim()) {
//         newParams.set("q", query);
//         newParams.delete("page"); // Reset page when searching

//         // Navigate to product page if not already there
//         if (!window.location.pathname.includes("productPage")) {
//           navigate(`/productPage?${newParams.toString()}`);
//         } else {
//           setSearchParams(newParams);
//         }
//       } else {
//         // Clear search - remove query param
//         newParams.delete("q");
//         newParams.delete("page");
//         setSearchParams(newParams);

//         // Navigate back to home if on product page
//         if (window.location.pathname.includes("productPage")) {
//           navigate("/");
//         }
//       }
//     },
//     [searchParams, setSearchParams, navigate],
//   );

//   // Clear all search params
//   const clearSearch = useCallback(() => {
//     setSearchParams(new URLSearchParams());
//     if (window.location.pathname.includes("productPage")) {
//       navigate("/");
//     }
//   }, [setSearchParams, navigate]);

//   // Update other filters
//   const setSelectedCategory = useCallback(
//     (category: string) => {
//       debouncedUpdateParams({ category, page: 1 });
//     },
//     [debouncedUpdateParams],
//   );

//   const setMinPrice = useCallback(
//     (min: number) => {
//       debouncedUpdateParams({ minPrice: min, page: 1 });
//     },
//     [debouncedUpdateParams],
//   );

//   const setMaxPrice = useCallback(
//     (max: number) => {
//       debouncedUpdateParams({ maxPrice: max, page: 1 });
//     },
//     [debouncedUpdateParams],
//   );

//   const setCurrentPage = useCallback(
//     (page: number) => {
//       const newParams = new URLSearchParams(searchParams);
//       newParams.set("page", String(page));
//       setSearchParams(newParams);
//     },
//     [searchParams, setSearchParams],
//   );

//   return {
//     // Current values
//     searchQuery,
//     selectedCategory,
//     minPrice,
//     maxPrice,
//     currentPage,

//     // Setters
//     setSearchQuery,
//     setSelectedCategory,
//     setMinPrice,
//     setMaxPrice,
//     setCurrentPage,
//     clearSearch,

//     // Derived values
//     hasActiveSearch: !!searchQuery,
//     hasActiveFilters: !!(selectedCategory || minPrice > 0 || maxPrice < 10000),
//   };
// };

// export default useSearchParams;

// import {
//   useSearchParams as useRouterSearchParams,
//   useNavigate,
// } from "react-router-dom";
// import { useMemo, useCallback } from "react";
// import debounce from "lodash.debounce";

// export const useSearchParams = () => {
//   const [searchParams, setSearchParams] = useRouterSearchParams();
//   const navigate = useNavigate();

//   // Get current values from URL
//   const searchQuery = searchParams.get("query") || "";
//   const selectedCategory = searchParams.get("category") || "";
//   const minPrice = Number(searchParams.get("minPrice")) || 0;
//   const maxPrice = Number(searchParams.get("maxPrice")) || 10000;
//   const currentPage = Number(searchParams.get("page")) || 1;

//   // Helper function to update URL params while preserving all filter states
//   const updateUrlParams = useCallback(
//     (updates: Record<string, string | number | null>) => {
//       const newParams = new URLSearchParams(searchParams);

//       // Always preserve filter states in URL
//       if (!newParams.has("category") && selectedCategory)
//         newParams.set("category", selectedCategory);
//       if (!newParams.has("minPrice") && minPrice > 0)
//         newParams.set("minPrice", String(minPrice));
//       if (!newParams.has("maxPrice") && maxPrice < 10000)
//         newParams.set("maxPrice", String(maxPrice));

//       Object.entries(updates).forEach(([key, value]) => {
//         if (value !== null && value !== "" && value !== 0) {
//           newParams.set(key, String(value));
//         } else {
//           newParams.delete(key);
//         }
//       });

//       setSearchParams(newParams);
//     },
//     [searchParams, setSearchParams, selectedCategory, minPrice, maxPrice],
//   );

//   // Debounced function to update filter params
//   const debouncedUpdateParams = useMemo(
//     () =>
//       debounce((params: Record<string, string | number>) => {
//         updateUrlParams(params);
//       }, 700),
//     [updateUrlParams],
//   );

//   // Update search query - navigate to ProductPage if not already there
//   const setSearchQuery = useCallback(
//     (query: string) => {
//       if (query.trim()) {
//         const newParams = new URLSearchParams(searchParams);
//         newParams.set("query", query);
//         newParams.delete("page"); // Reset page when searching

//         // Preserve existing filters
//         if (selectedCategory) newParams.set("category", selectedCategory);
//         if (minPrice >= 0) newParams.set("minPrice", String(minPrice));
//         if (maxPrice <= 10000) newParams.set("maxPrice", String(maxPrice));

//         // Navigate to product page if not already there
//         if (!window.location.pathname.includes("productPage")) {
//           navigate(`/productPage?${newParams.toString()}`);
//         } else {
//           setSearchParams(newParams);
//         }
//       }
//     },
//     [
//       searchParams,
//       setSearchParams,
//       navigate,
//       selectedCategory,
//       minPrice,
//       maxPrice,
//     ],
//   );

//   // Clear search query only (keep user on ProductPage with filters intact)
//   const clearSearchQuery = useCallback(() => {
//     const newParams = new URLSearchParams(searchParams);
//     newParams.delete("query");
//     newParams.delete("page");

//     // Keep all other filters in URL
//     if (selectedCategory) newParams.set("category", selectedCategory);
//     if (minPrice >= 0) newParams.set("minPrice", String(minPrice));
//     if (maxPrice <= 10000) newParams.set("maxPrice", String(maxPrice));

//     setSearchParams(newParams);
//     // Don't navigate away - stay on ProductPage
//   }, [searchParams, setSearchParams, selectedCategory, minPrice, maxPrice]);

//   // Clear all search and filters - go back to home
//   const clearAll = useCallback(() => {
//     setSearchParams(new URLSearchParams());
//     if (window.location.pathname.includes("productPage")) {
//       navigate("/");
//     }
//   }, [setSearchParams, navigate]);

//   // Update other filters
//   const setSelectedCategory = useCallback(
//     (category: string) => {
//       // Reset page when changing category
//       updateUrlParams({ category, page: 1 });
//     },
//     [updateUrlParams],
//   );

//   const setMinPrice = useCallback(
//     (min: number) => {
//       updateUrlParams({ minPrice: min, page: 1 });
//     },
//     [updateUrlParams],
//   );

//   const setMaxPrice = useCallback(
//     (max: number) => {
//       updateUrlParams({ maxPrice: max, page: 1 });
//     },
//     [updateUrlParams],
//   );

//   const setCurrentPage = useCallback(
//     (page: number) => {
//       updateUrlParams({ page });
//     },
//     [updateUrlParams],
//   );

//   return {
//     // Current values
//     searchQuery,
//     selectedCategory,
//     minPrice,
//     maxPrice,
//     currentPage,

//     // Setters
//     setSearchQuery,
//     setSelectedCategory,
//     setMinPrice,
//     setMaxPrice,
//     setCurrentPage,
//     clearSearchQuery, // New: clears only search query
//     clearAll, // Renamed: clears everything and goes home

//     // Derived values
//     hasActiveSearch: !!searchQuery,
//     hasActiveFilters: !!(selectedCategory || minPrice > 0 || maxPrice < 10000),
//   };
// };

// export default useSearchParams;

// import {
//   useSearchParams as useRouterSearchParams,
//   useNavigate,
// } from "react-router-dom";
// import { useMemo, useCallback } from "react";
// import debounce from "lodash.debounce";

// export const useSearchParams = () => {
//   const [searchParams, setSearchParams] = useRouterSearchParams();
//   const navigate = useNavigate();

//   // Get current values from URL
//   const searchQuery = searchParams.get("q") || "";
//   const selectedCategory = searchParams.get("category") || "";
//   const minPrice = Number(searchParams.get("minPrice")) || 0;
//   const maxPrice = Number(searchParams.get("maxPrice")) || 10000;
//   const currentPage = Number(searchParams.get("page")) || 1;

//   // Helper function to create consistent URL with all search-related params
//   const createSearchUrl = useCallback(
//     (params: {
//       query?: string;
//       category?: string;
//       minPrice?: number;
//       maxPrice?: number;
//       page?: number;
//     }) => {
//       const newParams = new URLSearchParams();

//       // Always maintain consistent order: q, category, minPrice, maxPrice, page
//       const query = params.query ?? searchQuery;
//       const category = params.category ?? selectedCategory;
//       const min = params.minPrice ?? minPrice;
//       const max = params.maxPrice ?? maxPrice;
//       const page = params.page ?? currentPage;

//       // Only add query if it exists (required for search)
//       if (query.trim()) {
//         newParams.set("q", query);
//       }

//       // Always show all filter params when on ProductPage for consistency
//       if (category) {
//         newParams.set("category", category);
//       }

//       if (min > 0) {
//         newParams.set("minPrice", String(min));
//       }

//       if (max < 10000) {
//         newParams.set("maxPrice", String(max));
//       }

//       // Always show page parameter when on ProductPage
//       newParams.set("page", String(page));

//       return newParams;
//     },
//     [searchQuery, selectedCategory, minPrice, maxPrice, currentPage],
//   );

//   // Debounced function to update filter params
//   const debouncedUpdateParams = useMemo(
//     () =>
//       debounce((params: Record<string, string | number>) => {
//         const newParams = createSearchUrl(params);
//         setSearchParams(newParams);
//       }, 700),
//     [createSearchUrl, setSearchParams],
//   );

//   // Update search query - navigate to ProductPage if not already there
//   const setSearchQuery = useCallback(
//     (query: string) => {
//       if (query.trim()) {
//         // Always reset to page 1 when searching
//         const newParams = createSearchUrl({
//           query,
//           page: 1,
//         });

//         // Navigate to product page if not already there
//         if (!window.location.pathname.includes("productPage")) {
//           navigate(`/productPage?${newParams.toString()}`);
//         } else {
//           setSearchParams(newParams);
//         }
//       }
//     },
//     [createSearchUrl, navigate, setSearchParams],
//   );

//   // Clear search query only (keep user on ProductPage with filters intact)
//   const clearSearchQuery = useCallback(() => {
//     const newParams = createSearchUrl({
//       query: "",
//       page: 1,
//     });

//     // If no query and no active filters, go back to home
//     if (!selectedCategory && minPrice === 0 && maxPrice === 10000) {
//       // navigate("/");
//       // if (window.location.pathname.includes("/")) return;
//       // else navigate("/");
//       // if (window.location.pathname.includes("/")) {
//       //   navigate("/");
//       // }
//       if (window.location.pathname !== "/") navigate("/");
//       else return;
//     } else {
//       setSearchParams(newParams);
//     }
//   }, [
//     createSearchUrl,
//     setSearchParams,
//     navigate,
//     selectedCategory,
//     minPrice,
//     maxPrice,
//   ]);

//   // Clear all search and filters - go back to home
//   const clearAll = useCallback(() => {
//     setSearchParams(new URLSearchParams());
//     if (window.location.pathname.includes("productPage")) {
//       navigate("/");
//     }
//   }, [setSearchParams, navigate]);

//   // Update other filters
//   const setSelectedCategory = useCallback(
//     (category: string) => {
//       const newParams = createSearchUrl({
//         category,
//         page: 1,
//       });
//       setSearchParams(newParams);
//     },
//     [createSearchUrl, setSearchParams],
//   );

//   const setMinPrice = useCallback(
//     (min: number) => {
//       const newParams = createSearchUrl({
//         minPrice: min,
//         page: 1,
//       });
//       setSearchParams(newParams);
//     },
//     [createSearchUrl, setSearchParams],
//   );

//   const setMaxPrice = useCallback(
//     (max: number) => {
//       const newParams = createSearchUrl({
//         maxPrice: max,
//         page: 1,
//       });
//       setSearchParams(newParams);
//     },
//     [createSearchUrl, setSearchParams],
//   );

//   const setCurrentPage = useCallback(
//     (page: number) => {
//       const newParams = createSearchUrl({ page });
//       setSearchParams(newParams);
//     },
//     [createSearchUrl, setSearchParams],
//   );

//   return {
//     // Current values
//     searchQuery,
//     selectedCategory,
//     minPrice,
//     maxPrice,
//     currentPage,

//     // Setters
//     setSearchQuery,
//     setSelectedCategory,
//     setMinPrice,
//     setMaxPrice,
//     setCurrentPage,
//     clearSearchQuery,
//     clearAll,

//     // Derived values
//     hasActiveSearch: !!searchQuery,
//     hasActiveFilters: !!(selectedCategory || minPrice > 0 || maxPrice < 10000),
//   };
// };

// export default useSearchParams;

// import {
//   useSearchParams as useRouterSearchParams,
//   useNavigate,
// } from "react-router-dom";
// import { useCallback } from "react";
// import { MAX_PRICE, MIN_PRICE } from "../constants";

// export const useSearchParams = () => {
//   const [searchParams, setSearchParams] = useRouterSearchParams();
//   const navigate = useNavigate();

//   // Get current values from URL
//   const searchQuery = searchParams.get("q") || "";
//   const selectedCategory = searchParams.get("category") || "";
//   const minPrice = Number(searchParams.get("minPrice")) || MIN_PRICE;
//   const maxPrice = Number(searchParams.get("maxPrice")) || MAX_PRICE;
//   const currentPage = Number(searchParams.get("page")) || 1;

//   // Helper function to create consistent URL with all search-related params
//   const createSearchUrl = useCallback(
//     (params: {
//       query?: string;
//       category?: string;
//       minPrice?: number;
//       maxPrice?: number;
//       page?: number;
//     }) => {
//       const newParams = new URLSearchParams();

//       // Always maintain consistent order: q, category, minPrice, maxPrice, page
//       const query = params.query ?? searchQuery;
//       const category = params.category ?? selectedCategory;
//       const min = params.minPrice ?? minPrice;
//       const max = params.maxPrice ?? maxPrice;
//       const page = params.page ?? currentPage;

//       // Only add query if it exists (required for search)
//       if (query.trim()) {
//         newParams.set("q", query);
//       }

//       // Always show all filter params when on ProductPage for consistency
//       if (category) {
//         newParams.set("category", category);
//       }

//       if (min > MIN_PRICE) {
//         newParams.set("minPrice", String(min));
//       }

//       if (max < MAX_PRICE) {
//         newParams.set("maxPrice", String(max));
//       }

//       // Always show page parameter when on ProductPage
//       newParams.set("page", String(page));

//       return newParams;
//     },
//     [searchQuery, selectedCategory, minPrice, maxPrice, currentPage],
//   );

//   // Update search query - navigate to ProductPage if not already there
//   const setSearchQuery = useCallback(
//     (query: string) => {
//       if (query.trim()) {
//         // Always reset to page 1 when searching
//         const newParams = createSearchUrl({
//           query,
//           page: 1,
//         });

//         // Navigate to product page if not already there
//         if (!window.location.pathname.includes("productPage")) {
//           navigate(`/productPage?${newParams.toString()}`);
//         } else {
//           setSearchParams(newParams);
//         }
//       }
//     },
//     [createSearchUrl, navigate, setSearchParams],
//   );

//   // Clear search query only (keep user on ProductPage with filters intact)
//   const clearSearchQuery = useCallback(() => {
//     const newParams = createSearchUrl({
//       query: "",
//       page: 1,
//     });

//     // If no query and no active filters, go back to home
//     if (!selectedCategory && minPrice === MIN_PRICE && maxPrice === MAX_PRICE) {
//       if (window.location.pathname !== "/") navigate("/");
//       else return;
//     } else {
//       setSearchParams(newParams);
//     }
//   }, [
//     createSearchUrl,
//     setSearchParams,
//     navigate,
//     selectedCategory,
//     minPrice,
//     maxPrice,
//   ]);

//   // Clear all search and filters - go back to home
//   const clearAll = useCallback(() => {
//     setSearchParams(new URLSearchParams());
//     if (window.location.pathname.includes("productPage")) {
//       navigate("/");
//     }
//   }, [setSearchParams, navigate]);

//   // Update other filters - immediate updates (no debouncing needed for dropdowns/buttons)
//   const setSelectedCategory = useCallback(
//     (category: string) => {
//       const newParams = createSearchUrl({
//         category,
//         page: 1,
//       });
//       setSearchParams(newParams);
//     },
//     [createSearchUrl, setSearchParams],
//   );

//   const setMinPrice = useCallback(
//     (min: number) => {
//       const newParams = createSearchUrl({
//         minPrice: min,
//         page: 1,
//       });
//       setSearchParams(newParams);
//     },
//     [createSearchUrl, setSearchParams],
//   );

//   const setMaxPrice = useCallback(
//     (max: number) => {
//       const newParams = createSearchUrl({
//         maxPrice: max,
//         page: 1,
//       });
//       setSearchParams(newParams);
//     },
//     [createSearchUrl, setSearchParams],
//   );

//   const setCurrentPage = useCallback(
//     (page: number) => {
//       const newParams = createSearchUrl({ page });
//       setSearchParams(newParams);
//     },
//     [createSearchUrl, setSearchParams],
//   );

//   return {
//     // Current values
//     searchQuery,
//     selectedCategory,
//     minPrice,
//     maxPrice,
//     currentPage,

//     // Setters
//     setSearchQuery,
//     setSelectedCategory,
//     setMinPrice,
//     setMaxPrice,
//     setCurrentPage,
//     clearSearchQuery,
//     clearAll,

//     // Derived values
//     hasActiveSearch: !!searchQuery,
//     hasActiveFilters: !!(
//       selectedCategory ||
//       minPrice > MIN_PRICE ||
//       maxPrice < MAX_PRICE
//     ),
//   };
// };

// export default useSearchParams;

import {
  useSearchParams as useRouterSearchParams,
  useNavigate,
} from "react-router-dom";
import { useCallback } from "react";

export const useSearchParams = () => {
  const [searchParams, setSearchParams] = useRouterSearchParams();
  const navigate = useNavigate();

  // Get current values from URL
  const searchQuery = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 10000;
  const currentPage = Number(searchParams.get("page")) || 1;

  // Helper function to create consistent URL with all search-related params
  const createSearchUrl = useCallback(
    (params: {
      query?: string;
      category?: string;
      minPrice?: number;
      maxPrice?: number;
      page?: number;
    }) => {
      const newParams = new URLSearchParams();

      // Always maintain consistent order: q, category, minPrice, maxPrice, page
      const query = params.query ?? searchQuery;
      const category = params.category ?? selectedCategory;
      const min = params.minPrice ?? minPrice;
      const max = params.maxPrice ?? maxPrice;
      const page = params.page ?? currentPage;

      // Only add query if it exists (required for search)
      if (query.trim()) {
        newParams.set("q", query);
      }

      // Always show all filter params when on ProductPage for consistency
      if (category) {
        newParams.set("category", category);
      }

      if (min > 0) {
        newParams.set("minPrice", String(min));
      }

      if (max < 10000) {
        newParams.set("maxPrice", String(max));
      }

      // Always show page parameter when on ProductPage
      newParams.set("page", String(page));

      return newParams;
    },
    [searchQuery, selectedCategory, minPrice, maxPrice, currentPage],
  );

  // Update search query - navigate to ProductPage if not already there
  const setSearchQuery = useCallback(
    (query: string) => {
      if (query.trim()) {
        // Always reset to page 1 when searching
        const newParams = createSearchUrl({
          query,
          page: 1,
        });

        // Navigate to product page if not already there
        if (!window.location.pathname.includes("productPage")) {
          navigate(`/productPage?${newParams.toString()}`);
        } else {
          setSearchParams(newParams);
        }
      }
    },
    [createSearchUrl, navigate, setSearchParams],
  );

  // Clear search query only (keep user on ProductPage with filters intact)
  const clearSearchQuery = useCallback(() => {
    const newParams = createSearchUrl({
      query: "",
      page: 1,
    });

    // If no query and no active filters, go back to home
    if (!selectedCategory && minPrice === 0 && maxPrice === 10000) {
      if (window.location.pathname !== "/") navigate("/");
      else return;
    } else {
      setSearchParams(newParams);
    }
  }, [
    createSearchUrl,
    setSearchParams,
    navigate,
    selectedCategory,
    minPrice,
    maxPrice,
  ]);

  // Clear all search and filters - go back to home
  const clearAll = useCallback(() => {
    setSearchParams(new URLSearchParams());
    if (window.location.pathname.includes("productPage")) {
      navigate("/");
    }
  }, [setSearchParams, navigate]);

  // NEW: Clear all filters but keep search query
  const clearAllFilters = useCallback(() => {
    const newParams = createSearchUrl({
      category: "",
      minPrice: 0,
      maxPrice: 10000,
      page: 1,
    });

    // If no search query after clearing filters, go home
    if (!searchQuery.trim()) {
      navigate("/");
    } else {
      setSearchParams(newParams);
    }
  }, [createSearchUrl, setSearchParams, navigate, searchQuery]);

  // Update other filters - immediate updates (no debouncing needed for dropdowns/buttons)
  const setSelectedCategory = useCallback(
    (category: string) => {
      const newParams = createSearchUrl({
        category,
        page: 1,
      });
      setSearchParams(newParams);
    },
    [createSearchUrl, setSearchParams],
  );

  const setMinPrice = useCallback(
    (min: number) => {
      const newParams = createSearchUrl({
        minPrice: min,
        page: 1,
      });
      setSearchParams(newParams);
    },
    [createSearchUrl, setSearchParams],
  );

  const setMaxPrice = useCallback(
    (max: number) => {
      const newParams = createSearchUrl({
        maxPrice: max,
        page: 1,
      });
      setSearchParams(newParams);
    },
    [createSearchUrl, setSearchParams],
  );

  const setCurrentPage = useCallback(
    (page: number) => {
      const newParams = createSearchUrl({ page });
      setSearchParams(newParams);
    },
    [createSearchUrl, setSearchParams],
  );

  return {
    // Current values
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    currentPage,

    // Setters
    setSearchQuery,
    setSelectedCategory,
    setMinPrice,
    setMaxPrice,
    setCurrentPage,
    clearSearchQuery,
    clearAll,
    clearAllFilters, // NEW: Clear only filters, keep search

    // Derived values
    hasActiveSearch: !!searchQuery,
    hasActiveFilters: !!(selectedCategory || minPrice > 0 || maxPrice < 10000),
  };
};

export default useSearchParams;
