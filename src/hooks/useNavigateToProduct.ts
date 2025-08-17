import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { slugify } from "../helpers/slugify";
import { Product } from "../types";

function useNavigateToProduct() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const navigateToProduct = (product: Product) => {
    // Prepopulate product in query cache
    queryClient.setQueryData(["product", product.id], product);

    // SEO slug
    const slug = slugify(product.title);

    // Navigate to SEO-friendly route
    navigate(`/product/${slug}-${product.id}`, {
      state: {
        from: location.pathname,
      },
    });
  };

  return navigateToProduct;
}

export default useNavigateToProduct;
