// import { create } from "zustand";
// import axios from "axios";
// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   thumbnail: string;
//   category: string;
// }

// interface SearchState {
//   searchQuery: string;
//   suggestions: Product[];
//   currentPage: number;
//   itemsPerPage: number;
//   totalItems: number;
//   selectedCategory: string;
//   priceRange: { min: number; max: number };
//   categories: string[];
//   setSearchQuery: (query: string) => void;
//   setCurrentPage: (page: number) => void;
//   setSelectedCategory: (category: string) => void;
//   setPriceRange: (range: { min: number; max: number }) => void;
//   fetchSuggestions: (query: string) => Promise<void>;
// }

// export const useSearchStore = create<SearchState>((set) => ({
//   searchQuery: "",
//   suggestions: [],
//   currentPage: 1,
//   itemsPerPage: 8,
//   totalItems: 0,
//   selectedCategory: "",
//   priceRange: { min: 0, max: 10000 },
//   categories: [],
//   setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
//   setCurrentPage: (page) => set({ currentPage: page }),
//   setSelectedCategory: (category) =>
//     set({ selectedCategory: category, currentPage: 1 }),
//   setPriceRange: (range) => set({ priceRange: range, currentPage: 1 }),
//   fetchSuggestions: async (query) => {
//     if (!query.trim()) return set({ suggestions: [] });

//     try {
//       const response = await axios.get(
//         `https://dummyjson.com/products/search?q=${query}&limit=100`,
//       );

//       // Get unique categories
//       const categories = [
//         ...new Set(response.data.products.map((p: Product) => p.category)),
//       ] as string[];
//       // const categories = [
//       //   ...new Set(response.data.products.map((p: Product) => p.category)),
//       // ];

//       set({
//         suggestions: response.data.products,
//         categories,
//         totalItems: response.data.total,
//       });
//     } catch (error) {
//       console.error("Error fetching search suggestions:", error);
//     }
//   },
// }));

// import { productService } from "../services/productService";
// import { create } from "zustand";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   thumbnail: string;
//   category: string;
// }

// interface SearchState {
//   searchQuery: string;
//   suggestions: Product[];
//   currentPage: number;
//   itemsPerPage: number;
//   totalItems: number;
//   selectedCategory: string;
//   priceRange: { min: number; max: number };
//   categories: string[];
//   isLoading: boolean;
//   error: string | null;
//   setSearchQuery: (query: string) => void;
//   setCurrentPage: (page: number) => void;
//   setSelectedCategory: (category: string) => void;
//   setPriceRange: (range: { min: number; max: number }) => void;
//   fetchSuggestions: (query: string) => Promise<void>;
// }

// export const useSearchStore = create<SearchState>((set) => ({
//   searchQuery: "",
//   suggestions: [],
//   currentPage: 1,
//   itemsPerPage: 12,
//   totalItems: 0,
//   selectedCategory: "",
//   priceRange: { min: 0, max: 10000 },
//   categories: [],
//   isLoading: false,
//   error: null,
//   setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
//   setCurrentPage: (page) => set({ currentPage: page }),
//   setSelectedCategory: (category) =>
//     set({ selectedCategory: category, currentPage: 1 }),
//   setPriceRange: (range) => set({ priceRange: range, currentPage: 1 }),
//   fetchSuggestions: async (query) => {
//     set({ isLoading: true, error: null });

//     try {
//       const { products, total } = await productService.searchProducts(query);
//       const categories = [
//         ...new Set(products.map((p) => p.category)),
//       ] as string[];

//       set({
//         suggestions: products,
//         categories,
//         totalItems: total,
//         isLoading: false,
//       });
//     } catch (error) {
//       set({
//         error: "Failed to fetch suggestions",
//         isLoading: false,
//         suggestions: [],
//         categories: [],
//         totalItems: 0,
//       });
//     }
//   },
// }));

import { create } from "zustand";
import { productService } from "../services/productService";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

interface SearchState {
  searchQuery: string;
  suggestions: Product[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  selectedCategory: string;
  priceRange: { min: number; max: number };
  categories: string[];
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setSelectedCategory: (category: string) => void;
  setPriceRange: (range: { min: number; max: number }) => void;
  fetchSuggestions: (query: string) => Promise<void>;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: "",
  suggestions: [],
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: 0,
  selectedCategory: "",
  priceRange: { min: 0, max: 10000 },
  categories: [],
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedCategory: (category) =>
    set({ selectedCategory: category, currentPage: 1 }),
  setPriceRange: (range) => set({ priceRange: range, currentPage: 1 }),
  fetchSuggestions: async (query) => {
    if (!query.trim()) {
      set({ suggestions: [], categories: [], totalItems: 0 });
      return;
    }

    try {
      const { products, total } = await productService.searchProducts(query);
      const categories = [...new Set(products.map((p) => p.category))];

      set({
        suggestions: products,
        categories,
        totalItems: total,
      });
    } catch (error) {
      // Just reset the data in case of error
      set({
        suggestions: [],
        categories: [],
        totalItems: 0,
      });
    }
  },
}));
