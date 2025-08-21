import { Product } from "../types";

export const getUniqueCategories = (products: Product[]) => {
  return [...new Set(products.map((p) => p.category))];
};
