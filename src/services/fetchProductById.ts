import axios from "axios";
import { BASE_URL } from "../constants";

export const fetcProductById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch this Product ");
  }
};
