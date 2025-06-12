import { useState } from "react";
import { useSearchStore } from "../store/searchStore";
import Header from "../components/features/Header";
import Sidebar from "../components/features/Sidebar";
import Main from "../components/features/Main";
import HeadphonesAd from "../components/ui/HeadphonesAd ";
import DailyDeals from "../components/ui/DailyDeals";
import ProductPage from "../components/features/ProductPage";
import { Outlet } from "react-router-dom";

function MainPage() {
  const [isMainProductLoaded, setIsMainProductLoaded] = useState(false);

  function handleLoad() {
    setIsMainProductLoaded(true);
  }

  // const isSearching = useSearchStore((state) => state.isSearching);
  const { isSearching } = useSearchStore();

  console.log("isSearchingisSearchingisSearching", isSearching);
  return (
    <div className="mx-auto grid min-h-screen max-w-screen-2xl grid-cols-[auto_1fr_22.875rem] grid-rows-[auto_1fr] gap-y-6 overflow-hidden bg-[#FAFAFA] pr-6 font-bold">
      <Header />
      <Sidebar />
      {/* {!isSearching ? (
        <Main isMainProductLoaded={isMainProductLoaded} onLoad={handleLoad} />
      ) : (
        // <CartPage />
        // <CheckoutPage />
        <ProductPage />
      )} */}
      {/* {<ProductPage />} */}
      {/* <CartPage /> */}
      {/* <CheckoutPage /> */}
      {/* {products?.length > 0 && <ProductPage />} */}
      {/* <ProductPage /> */}

      <Outlet
        context={{ isMainProductLoaded, setIsMainProductLoaded, handleLoad }}
      />

      {!isSearching && (
        <div className="col-span-1 row-span-1">
          <HeadphonesAd />
          <DailyDeals isMainProductLoaded={isMainProductLoaded} />
        </div>
      )}
    </div>
  );
}

export default MainPage;
