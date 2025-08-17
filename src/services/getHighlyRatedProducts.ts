import axios from "axios";
import { BASE_URL } from "../constants";

export const getHighlyRatedProducts = async () => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/products?sortBy=rating&order=desc`,
    );
    return data.products;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};
