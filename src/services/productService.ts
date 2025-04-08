import axios from "axios";
import { BASE_URL } from "../constants";
import { Product } from "src/types";

interface SearchResponse {
  products: Product[];
  total: number;
}

export const productService = {
  async searchProducts(
    query: string,
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>,
  ): Promise<SearchResponse> {
    if (!query.trim()) {
      return { products: [], total: 0 };
    }

    try {
      const response = await axios.get<SearchResponse>(
        `${BASE_URL}/products/search?q=${query}&limit=30`,
      );

      setIsSearching(true);
      return response.data;
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      throw error;
    }
  },
};
