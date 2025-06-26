import axios from "axios";
import { BASE_URL } from "../constants";
// import { SearchResponse } from "src/types";

export const fetchMainProduct = async () => {
  try {
    const response = await axios.get(
      // `${BASE_URL}/products/${Math.floor(Math.random() * 100)}`,
      `${BASE_URL}/products/79`,
    );

    // setIsSearching(true);
    return response.data;
  } catch (error) {
    // console.error("Error fetching Main Product:", error);
    throw new Error("Failed to fetch Main Product ");
  }
};
