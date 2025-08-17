import axios from "axios";
import { BASE_URL } from "../constants";

export const fetchMainProduct = async () => {
  try {
    const response = await axios.get(
      // `${BASE_URL}/products/${Math.floor(Math.random() * 100)}`,
      `${BASE_URL}/products/160`,
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Main Product ");
  }
};
