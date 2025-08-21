import axios from "axios";
import { BASE_URL } from "../constants";
import { Product } from "../types";

export const getDailyDealsProducts = async () => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/products?limit=100&sortBy=sold&order=desc`,
    );
    return data.products
      .filter((product: Product) => product.category !== "beauty")
      .slice(0, 6);
  } catch (error) {
    throw new Error("Failed to load daily deals");
  }
};
