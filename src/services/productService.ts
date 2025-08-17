import axios from "axios";
import { BASE_URL } from "../constants";
import { SearchResponse } from "../types";

export const productService = {
  async searchProducts(query: string): Promise<SearchResponse> {
    if (!query.trim()) {
      return { products: [], total: 0 };
    }

    try {
      const response = await axios.get<SearchResponse>(
        `${BASE_URL}/products/search?q=${query}&limit=30`,
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      throw error;
    }
  },
};
