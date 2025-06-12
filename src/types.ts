export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  stock: number;
  reviews: string[];
  images: string[];
  thumbnail: string;
}

export interface ProductWithDailyDealProps {
  image: string;
  title: string;
  price: number;
  nbrOfReviews: number;
  nbrOfProductsInStock: number;
}

export interface SearchResponse {
  products: Product[];
  total: number;
}

export interface ProductState {
  quantity: number;
  basePrice: number;
  currentImage: string;
}

export type ProductAction =
  | { type: "SET_PRICE"; payload: number }
  | { type: "SET_IMAGE"; payload: string }
  | { type: "SET_QUANTITY"; payload: number }
  | { type: "RESET"; payload: Partial<ProductState> };

export interface LayoutContextType {
  isMainProductLoaded: boolean;
  setIsMainProductLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}
