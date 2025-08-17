import axios from "axios";
import { BASE_URL } from "../constants";
import { Product } from "src/types";

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

export const getNewestProducts = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/products?limit=4&sortBy=createdAt&order=desc`,
  );
  return data.products;
};

export const getBestSellingProducts = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/products/category/mobile-accessories?sortBy=rating&order=desc`,
  );
  return data.products;
};

export const getUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users?limit=4`);
  return data.users;
};

export const getProducts = async () => {
  const { data } = await axios.get(`${BASE_URL}/products`);
  return data.products;
};

export const getCategories = async () => {
  const { data } = await axios.get(`${BASE_URL}/products/categories`);
  return data;
};

export const searchProducts = async (searchQuery: string) => {
  if (!searchQuery) return [];
  const { data } = await axios.get(
    `${BASE_URL}/products/search?q=${searchQuery}&limit=100`,
  );
  return data.products;
};
