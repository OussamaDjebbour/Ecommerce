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

export interface CartItemType {
  id: number;
  // id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
  // thumbnail?: string;
}

export type AddToCartResult = { success: boolean; message: string };

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
  id: number;
  quantity: number;
  basePrice: number;
  currentImage: string;
}

export type ProductAction =
  | { type: "SET_ID"; payload: number }
  | { type: "SET_PRICE"; payload: number }
  | { type: "SET_IMAGE"; payload: string }
  | { type: "SET_QUANTITY"; payload: number }
  | { type: "RESET"; payload: Partial<ProductState> };

export interface LayoutContextType {
  isMainProductLoaded: boolean;
  setIsMainProductLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

// export interface CheckoutItem {
//   id: number;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
//   stock?: number;
//   currentImage?: string;
// }

export interface CheckoutItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

export interface UseCheckoutProductsResult {
  items: CheckoutItem[];
  mode: "buy-now" | "cart";
}

export type Mode = "cart" | "buy-now";
