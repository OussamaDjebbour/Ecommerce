// import CustomerServiceCard from "../ui/CustomerServiceCard";
import Logo from "../ui/Logo";
import MenuItemsContainer from "../ui/MenuItemsContainer";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
} from "lucide-react";
import CustomerServiceCard from "../ui/CustomerServiceCard";

function Sidebar() {
  return (
    // <aside className="col-span-1 row-span-full mr-12 hidden bg-white pb-7 font-medium lg:block">
    // <aside className="col-span-1 row-span-full mr-6 hidden bg-white pb-7 font-medium lg:block xl:mr-12">
    // <aside className="col-span-1 row-span-full mr-6 hidden bg-white pb-7 font-medium xl:block 2xl:mr-12">
    <aside className="col-span-1 row-span-full hidden bg-white pb-7 font-medium xl:block">
      <Logo />
      <MenuItemsContainer />
      <CustomerServiceCard />
    </aside>
  );
}

export default Sidebar;
