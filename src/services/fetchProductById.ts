import axios from "axios";
import { BASE_URL } from "../constants";
// import { SearchResponse } from "src/types";

export const fetcProductById = async (id: number) => {
  try {
    const response = await axios.get(
      // `${BASE_URL}/products/${Math.floor(Math.random() * 100)}`,
      `${BASE_URL}/products/${id}`,
    );

    // setIsSearching(true);
    console.log("response.data", response.data, id);
    return response.data;
  } catch (error) {
    // console.error("Error fetching Main Product:", error);
    throw new Error("Failed to fetch this Product ");
  }
};
