import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/features/Header";
import Sidebar from "../components/features/Sidebar";
import HeadphonesAd from "../components/ui/HeadphonesAd ";
import DailyDeals from "../components/ui/DailyDeals";

export default function Layout() {
  const [isMainProductLoaded, setIsMainProductLoaded] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  // Check if we're on the base route
  const isOnBaseRoute = location.pathname === "/";

  // location.pathname.includes("productPage") ||
  // location.pathname.includes("cart") ||
  // location.pathname.includes("checkout");

  // const { debouncedQuery, isSearching } = useSearchStore();

  // useEffect(() => {
  //   if (debouncedQuery.trim()) {
  //     const path = window.location.pathname;
  //     if (!path.includes("productPage")) {
  //       navigate("productPage");
  //     }
  //   }
  // }, [debouncedQuery, navigate]);

  return (
    <div className="relative mx-auto grid min-h-screen max-w-screen-2xl grid-cols-[auto_1fr_22.875rem] grid-rows-[auto_1fr] gap-y-6 overflow-hidden bg-[#FAFAFA] pr-6 font-bold">
      <Header />
      <Sidebar />
      {/* <div></div> */}
      <Outlet context={{ isMainProductLoaded, setIsMainProductLoaded }} />
      {/* <Main /> */}

      {isOnBaseRoute && (
        <div className="col-span-1 row-span-1">
          <HeadphonesAd />
          <DailyDeals isMainProductLoaded={isMainProductLoaded} />
        </div>
      )}
    </div>
  );
}
