import debounce from "lodash.debounce";
import { Product } from "../types";
import { create } from "zustand";

interface SearchState {
  searchResults: Product[];
  isSearching: boolean;
  searchQuery: string;
  debouncedQuery: string;
  currentPage: number;
  itemsPerPage: number;
  selectedCategory: string;
  minPrice: number; // Separate state for min price
  maxPrice: number; // Separate state for max price

  setSearchResults: (results: Product[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setSelectedCategory: (category: string) => void;
  setMinPrice: (min: number) => void; // New setter for min price
  setMaxPrice: (max: number) => void; // New setter for max price
  setItemsPerPage: (count: number) => void;
}

export const useSearchStore = create<SearchState>((set) => {
  // Debounce the query update
  const debouncedSetQuery = debounce((query: string) => {
    set({ debouncedQuery: query });
  }, 700);

  return {
    searchResults: [],
    isSearching: false,
    searchQuery: "",
    debouncedQuery: "",
    currentPage: 1,
    itemsPerPage: 10,
    selectedCategory: "",
    minPrice: 0, // Default min price
    maxPrice: 10000, // Default max price

    setSearchResults: (results: Product[]) => set({ searchResults: results }),
    setIsSearching: (isSearching: boolean) => set({ isSearching }),
    setSearchQuery: (query) => {
      // if (query)
      set({ searchQuery: query, currentPage: 1, selectedCategory: "" });
      debouncedSetQuery(query);
    },
    setCurrentPage: (page) => set({ currentPage: page }),
    setSelectedCategory: (category) =>
      set({ selectedCategory: category, currentPage: 1 }),
    setMinPrice: (min) => set({ minPrice: min, currentPage: 1 }), // Update min price
    setMaxPrice: (max) => set({ maxPrice: max, currentPage: 1 }), // Update max price
    setItemsPerPage: (count) => set({ itemsPerPage: count }),
  };
});
