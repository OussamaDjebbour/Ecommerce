export const BASE_URL = "https://dummyjson.com";

export const API_URL = `${BASE_URL}/products`;

export const CATEGORIES_URL = `${BASE_URL}/products/categories`;

export const MIN_PRICE = 0;

export const MAX_PRICE = 10000;

import {
  ShoppingCart,
  Home,
  Settings,
  HelpCircle,
  Contact,
  HeartIcon,
} from "lucide-react";

export const MENU_ITEMS = [
  { icon: <Home />, label: "Home" },
  { icon: <ShoppingCart />, label: "Cart" },
  { icon: <HeartIcon />, label: "Saved" },
  { icon: <Settings />, label: "Settings" },
  { icon: <Contact />, label: "Contact us" },
  { icon: <HelpCircle />, label: "Help" },
];

export const SortOptions: { name: string; value: string }[] = [
  { name: "Most Relevant", value: "relevance" },
  { name: "Price: Low to High", value: "priceLowToHigh" },
  { name: "Price: High to Low", value: "priceHighToLow" },
  { name: "Newest First", value: "newest" },
  { name: "Oldest First", value: "oldest" },
];
