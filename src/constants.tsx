export const BASE_URL = "https://dummyjson.com";

export const API_URL = `${BASE_URL}/products`;

export const CATEGORIES_URL = `${BASE_URL}/products/categories`;

export const MIN_PRICE = 0;

export const MAX_PRICE = 10000;

import {
  ShoppingCart,
  Eye,
  Heart,
  Package,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  Menu,
  X,
  Search,
  Bell,
  User,
  Home,
  Grid3X3,
  Settings,
  HelpCircle,
  Phone,
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
// export const MENU_ITEMS = [
//   { icon: "🏠", label: "Home", active: true },
//   { icon: "🔍", label: "Explore" },
//   { icon: "❤️", label: "Saved" },
//   { icon: "🛒", label: "Cart" },
//   { icon: "📊", label: "Selling" },
//   { icon: "👤", label: "Profile" },
//   { icon: "⏱️", label: "Purchase History" },
//   { icon: "💬", label: "Contact us" },
//   { icon: "⚙️", label: "Settings" },
// ];
