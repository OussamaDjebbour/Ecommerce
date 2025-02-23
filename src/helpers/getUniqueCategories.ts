import { Product } from "src/types";

export const getUniqueCategories = (products: Product[]) => {
  return [...new Set(products.map((p) => p.category))];
};
