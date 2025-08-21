// import { createContext, useContext, useState, ReactNode } from "react";

// interface SearchContextType {
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
// }

// const SearchContext = createContext<SearchContextType | undefined>(undefined);

// export const SearchProvider = ({ children }: { children: ReactNode }) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   return (
//     <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
//       {children}
//     </SearchContext.Provider>
//   );
// };

// export const useSearchContext = () => {
//   const context = useContext(SearchContext);
//   if (!context) {
//     throw new Error("useSearch must be used within a SearchProvider");
//   }
//   return context;
// };

import React, { createContext, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
}

const fetchSearchResults = async (
  searchQuery: string,
  page: number,
  filters?: FilterOptions,
) => {
  if (!searchQuery) return { products: [], totalPages: 1 };

  let url = `https://dummyjson.com/products/search?q=${searchQuery}`;
  if (filters?.category) {
    url += `&category=${filters.category}`;
  }

  const { data } = await axios.get(url);

  // Apply additional filtering
  const filteredProducts = data.products.filter((product: any) => {
    return (
      !filters?.priceRange ||
      (product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1])
    );
  });

  const pageSize = 10;
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return { products: paginatedProducts, totalPages };
};

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
}

interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  fetchResults: (page: number, filters?: FilterOptions) => void;
  currentPage: number;
  totalPages: number;
}

const SearchContext = createContext<SearchContextProps | undefined>(
  undefined,
);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions | undefined>();

  const { data } = useQuery({
    queryKey: ["searchResults", searchQuery, currentPage, filters],
    queryFn: () => fetchSearchResults(searchQuery, currentPage, filters),
    enabled: !!searchQuery, // Fetch only when there's a search query
  });

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults: data?.products || [],
        fetchResults: (page, filters) => {
          setCurrentPage(page);
          setFilters(filters);
        },
        currentPage,
        totalPages: data?.totalPages || 1,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

// import React, { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   thumbnail: string;
// }

// interface SearchContextProps {
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
//   searchResults: Product[];
//   suggestions: Product[];
//   fetchSearchSuggestions: (query: string) => Promise<void>;
//   fetchResults: (page: number, filters?: FilterOptions) => Promise<void>;
//   currentPage: number;
//   totalPages: number;
// }

// interface FilterOptions {
//   category?: string;
//   priceRange?: [number, number];
// }

// export const SearchContext = createContext<SearchContextProps | undefined>(
//   undefined,
// );

// export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<Product[]>([]);
//   const [suggestions, setSuggestions] = useState<Product[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const pageSize = 10; // Results per page

//   // Fetch search suggestions (Live Search)
//   const fetchSearchSuggestions = async (query: string) => {
//     if (!query) {
//       setSuggestions([]);
//       return;
//     }
//     try {
//       const response = await axios.get(
//         `https://dummyjson.com/products/search?q=${query}`,
//       );
//       setSuggestions(response.data.products.slice(0, 5)); // Show top 5 results
//     } catch (error) {
//       console.error("Error fetching search suggestions:", error);
//     }
//   };

//   // Fetch search results with pagination & filters
//   const fetchResults = async (page: number, filters?: FilterOptions) => {
//     try {
//       let url = `https://dummyjson.com/products/search?q=${searchQuery}`;
//       if (filters?.category) {
//         url += `&category=${filters.category}`;
//       }
//       const response = await axios.get(url);
//       const filteredProducts = response.data.products.filter(
//         (product: Product) => {
//           return (
//             !filters?.priceRange ||
//             (product.price >= filters.priceRange[0] &&
//               product.price <= filters.priceRange[1])
//           );
//         },
//       );

//       setTotalPages(Math.ceil(filteredProducts.length / pageSize));
//       setSearchResults(
//         filteredProducts.slice((page - 1) * pageSize, page * pageSize),
//       );
//       setCurrentPage(page);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   return (
//     <SearchContext.Provider
//       value={{
//         searchQuery,
//         setSearchQuery,
//         searchResults,
//         suggestions,
//         fetchSearchSuggestions,
//         fetchResults,
//         currentPage,
//         totalPages,
//       }}
//     >
//       {children}
//     </SearchContext.Provider>
//   );
// };

// export const useSearchContext = () => {
//   const context = useContext(SearchContext);
//   if (!context) {
//     throw new Error("useSearch must be used within a SearchProvider");
//   }
//   return context;
// };
