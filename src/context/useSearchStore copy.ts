import { create } from "zustand";
import axios from "axios";
// import { Product } from "src/types";

// interface Suggestion {
//   id: string;
//   thumbnail: string;
//   title: string;
//   price: number;
// }

// interface SearchState {
//   searchQuery: string;
//   suggestions: Suggestion[];
//   setSearchQuery: (query: string) => void;
//   fetchSuggestions: (query: string) => Promise<void>;
// }

// export const useSearchStore = create<SearchState>((set) => ({
//   searchQuery: "",
//   suggestions: [],
//   setSearchQuery: (query) => set({ searchQuery: query }),
//   fetchSuggestions: async (query) => {
//     if (!query.trim()) return set({ suggestions: [] });

//     try {
//       const response = await axios.get(
//         `https://dummyjson.com/products/search?q=${query}`,
//       );
//       set({ suggestions: response.data.products });
//       // set({ suggestions: response.data.products.map((p: Product) => p.title) });
//     } catch (error) {
//       console.error("Error fetching search suggestions:", error);
//     }
//   },
// }));

// Best Chatgpt

// interface SearchState {
//   searchQuery: string;
//   suggestions: { title: string; thumbnail: string; price: number }[];
//   setSearchQuery: (query: string) => void;
//   fetchSuggestions: (query: string) => Promise<void>;
// }

// export const useSearchStore = create<SearchState>((set) => ({
//   searchQuery: "",
//   suggestions: [],
//   setSearchQuery: (query) => set({ searchQuery: query }),
//   fetchSuggestions: async (query) => {
//     if (!query.trim()) return set({ suggestions: [] });

//     try {
//       const response = await axios.get(
//         `https://dummyjson.com/products/search?q=${query}`,
//       );
//       set({
//         suggestions: response.data.products.map((p: Product) => ({
//           title: p.title,
//           thumbnail: p.thumbnail,
//           price: p.price,
//         })),
//       });
//     } catch (error) {
//       console.error("Error fetching search suggestions:", error);
//     }
//   },
// }));

// Best Bolt

// import { create } from "zustand";
// import axios from "axios";

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
  itemsPerPage: 8,
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
    if (!query.trim()) return set({ suggestions: [] });

    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${query}&limit=100`,
      );

      // Get unique categories
      const categories = [
        ...new Set(response.data.products.map((p: Product) => p.category)),
      ] as string[];
      // const categories = [
      //   ...new Set(response.data.products.map((p: Product) => p.category)),
      // ];

      set({
        suggestions: response.data.products,
        categories,
        totalItems: response.data.total,
      });
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  },
}));
