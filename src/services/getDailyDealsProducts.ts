import axios from "axios";
import { BASE_URL } from "../constants";

export const getDailyDealsProducts = async () => {
  const { data } =
    await axios.get(`${BASE_URL}/products?limit=6&sortBy=rating&order=desc
`);
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

export const searchProducts = async (query: string) => {
  const { data } = await axios.get(`${BASE_URL}/products/search?q=${query}`);
  return data.products;
};
