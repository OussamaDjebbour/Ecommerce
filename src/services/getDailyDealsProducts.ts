import axios from "axios";
import { BASE_URL } from "../constants";
import { Product } from "src/types";

export const getDailyDealsProducts = async () => {
  try {
    const { data } = await axios.get(
      // `${BASE_URL}/products?limit=6&sortBy=rating&order=desc`,
      `${BASE_URL}/products?limit=100&sortBy=sold&order=desc`,
    );
    return data.products
      .filter(
        (product: Product) => product.category !== "beauty",
        // product.category !== "fragrances" &&
        // product.category !== "furniture" &&
        // product.category !== "groceries" &&
        // product.category !== "home-decoration",
        // product.category === "mens-watches",
        // "beauty",
        // "fragrances",
        // "furniture",
        // "groceries",
        // "home-decoration",
        // "kitchen-accessories",
        // "laptops",
        // "mens-shirts",
        // "mens-shoes",
        // "mens-watches",
        // "mobile-accessories",
        // "motorcycle",
        // "skin-care",
        // "smartphones",
        // "sports-accessories",
        // "sunglasses",
        // "tablets",
        // "tops",
        // "vehicle",
        // "womens-bags",
        // "womens-dresses",
        // "womens-jewellery",
        // "womens-shoes",
        // "womens-watches",
      )
      .slice(0, 6);
  } catch (error) {
    throw new Error("Failed to load daily deals");
  }
};

export const getHighlyRatedProducts = async () => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/products?sortBy=rating&order=desc`,
    );
    return data.products;
  } catch (error) {
    // throw new Error(error);
    // throw new Error("Error fetching products");
    throw new Error("Failed to fetch products");
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

// export const searchProducts = async (query: string) => {
//   const { data } = await axios.get(`${BASE_URL}/products/search?q=${query}`);
//   return data.products;
// };

export const searchProducts = async (searchQuery: string) => {
  if (!searchQuery) return [];
  const { data } = await axios.get(
    `${BASE_URL}/products/search?q=${searchQuery}&limit=100`,
  );
  return data.products;
};
