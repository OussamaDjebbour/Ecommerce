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
