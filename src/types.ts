export type MenuItemType = {
  label: string;
  icon: React.ReactNode;
};

export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  stock: number;
  reviews: Review[];
  images: string[];
  thumbnail: string;
  discountPercentage: number;
  brand: string;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
}

export interface CartItemType extends Product {
  quantity: number;
  image: string;
  discountedPrice: number;
}

export interface QuantityControlProduct extends Product, CartItemType {}

export interface ProductInfo extends Product {
  tags: string[];

  sku: string;

  weight: number;

  dimensions: {
    width: number;

    height: number;

    depth: number;
  };

  warrantyInformation: string;

  shippingInformation: string;

  availabilityStatus: string;

  returnPolicy: string;

  minimumOrderQuantity: number;
}

export interface ActiveTab {
  id: "description" | "reviews" | "specifications";
  label: string;
}

export type AddToCartResult = { success: boolean; message: string };

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
