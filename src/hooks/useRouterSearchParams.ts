import { useSearchParams, useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useRouterSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get current values from URL
  const searchQuery = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 10000;
  const sort = searchParams.get("sortby") || "relevance";
  const currentPage = Number(searchParams.get("page")) || 1;

  // Helper function to create consistent URL with all search-related params
  const createSearchUrl = useCallback(
    (params: {
      query?: string;
      category?: string;
      minPrice?: number;
      maxPrice?: number;
      page?: number;
      sort?: string;
    }) => {
      const newParams = new URLSearchParams();

      const query = params.query ?? searchQuery;
      const category = params.category ?? selectedCategory;
      const min = params.minPrice ?? minPrice;
      const max = params.maxPrice ?? maxPrice;
      const sortby = params.sort ?? sort;
      const page = params.page ?? currentPage;

      // Only add query if it exists (required for search)
      if (query.trim()) {
        newParams.set("q", query);
      }

      if (category) {
        newParams.set("category", category);
      }

      if (min >= 0) {
        newParams.set("minPrice", String(min));
      }

      if (max <= 10000) {
        newParams.set("maxPrice", String(max));
      }

      if (sortby) {
        newParams.set("sortby", sortby);
      }

      // Always show page parameter when on ProductPage
      newParams.set("page", String(page));

      return newParams;
    },
    [searchQuery, selectedCategory, minPrice, maxPrice, sort, currentPage],
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
    if (
      !selectedCategory &&
      sort === "relevance" &&
      minPrice === 0 &&
      maxPrice === 10000
    ) {
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
    sort,
  ]);

  // Clear all search and filters - go back to home
  const clearAll = useCallback(() => {
    setSearchParams(new URLSearchParams());
    if (window.location.pathname.includes("productPage")) {
      navigate("/");
    }
  }, [setSearchParams, navigate]);

  //  Clear all filters but keep search query
  const clearAllFilters = useCallback(() => {
    const newParams = createSearchUrl({
      category: "",
      minPrice: 0,
      maxPrice: 10000,
      sort: "relevance",
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

  const setSort = useCallback(
    (sort: string) => {
      const newParams = createSearchUrl({
        sort,
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
    sort,
    currentPage,

    // Setters
    setSearchQuery,
    setSelectedCategory,
    setMinPrice,
    setMaxPrice,
    setSort,
    setCurrentPage,
    clearSearchQuery,
    clearAll,
    clearAllFilters,

    // Derived values
    hasActiveSearch: !!searchQuery,
    hasActiveFilters: !!(selectedCategory || minPrice > 0 || maxPrice < 10000),
  };
};

export default useRouterSearchParams;
