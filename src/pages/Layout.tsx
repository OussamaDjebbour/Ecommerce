import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/features/Header";
import Sidebar from "../components/features/Sidebar";
import HeadphonesAd from "../components/ui/HeadphonesAd ";
import DailyDeals from "../components/ui/DailyDeals";
import MobileHeader from "../components/ui/MobileHeader";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  const [isMainProductLoaded, setIsMainProductLoaded] = useState(false);
  const location = useLocation();
  const isOnBaseRoute = location.pathname === "/";

  return (
    <div className="relative max-w-screen-2xl  bg-[#FAFAFA] mx-auto min-h-screen  font-bold">
      {/* Desktop Layout (1280px+) */}

      <div className="hidden flex-col gap-y-6 overflow-hidden px-4 sm:px-6 lg:px-0 xl:grid xl:max-w-screen-2xl xl:grid-cols-[auto_1fr_minmax(auto,23.875rem)] xl:grid-rows-[auto_1fr] xl:gap-8 2xl:gap-12">
        <Header />
        <Sidebar />
        <Outlet context={{ isMainProductLoaded, setIsMainProductLoaded }} />
        {isOnBaseRoute && (
          <div className="col-span-1 row-span-1 pr-4">
            <HeadphonesAd />
            <DailyDeals isMainProductLoaded={isMainProductLoaded} />
          </div>
        )}
      </div>

      {/* Mobile Layout (<1280px) */}
      <div className="xl:hidden">
        <MobileHeader />
        <div className="overflow-x-hidden px-0 pb-4">
          <Outlet context={{ isMainProductLoaded, setIsMainProductLoaded }} />
          {isOnBaseRoute && (
            <div className="mt-6">
              <DailyDeals isMainProductLoaded={isMainProductLoaded} />
            </div>
          )}
        </div>
      </div>

<ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16 absolute overflow-x-hidden "
        closeButton={false}
        icon={false}
        toastClassName={"w-96"}
      />

    </div>
  );
}
