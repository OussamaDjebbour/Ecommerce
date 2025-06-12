import axios from "axios";
import { BASE_URL } from "../constants";
import { SearchResponse } from "src/types";
import { useNavigate } from "react-router-dom";

export const productService = {
  async searchProducts(
    query: string,
    // setIsSearching: (isSearching: boolean) => void,
  ): Promise<SearchResponse> {
    if (!query.trim()) {
      return { products: [], total: 0 };
    }

    try {
      const response = await axios.get<SearchResponse>(
        `${BASE_URL}/products/search?q=${query}&limit=30`,
      );

      // setIsSearching(true);
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      throw error;
    }
  },
};
