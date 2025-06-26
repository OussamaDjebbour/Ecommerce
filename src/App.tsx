import { useEffect, useState } from "react";
// import { MobileHeader } from "./components/MobileHeader";
// import { Sidebar } from "./components/Sidebar";
// import { Header } from "./components/Header";
// import { MainContent } from "./components/MainContent";
// import { MobileContent } from "./components/MobileContent";
// import { BottomNav } from "./components/BottomNav";
import "./index.css";
// import { MENU_ITEMS } from "./constants";
import Header from "./components/features/Header";
import Sidebar from "./components/features/Sidebar";
import Main from "./components/features/Main";
import HeadphonesAd from "./components/ui/HeadphonesAd ";
import DailyDeals from "./components/ui/DailyDeals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SwiperSlider from "./components/ui/SwiperSlider";
import { SearchProvider, useSearchContext } from "./context/useSearchContext";
import ProductPage from "./components/features/ProductPage";
import { useSearchProducts } from "./hooks/useSearchProducts";
import { useSearchStore } from "./store/searchStore";
import CartPage from "./components/features/CartPage";
import CheckoutPage from "./components/features/CheckoutPage";
import { ToastContainer } from "react-toastify";
import { create } from "domain";
import { createBrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";

// Create a new QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 300000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
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
        className="mt-16"
        // toastClassName="!bg-transparent !shadow-none !border-none !p-0 !m-1"
        // bodyClassName="!p-0 !m-0"
        closeButton={false}
        icon={false}
      />
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        // toastStyle={{
        //   // backgroundColor: "black",
        //   // color: "white",
        //   fontSize: "14px",
        //   // fontFamily: "Poppins",
        //   fontWeight: "600",
        //   // padding: "10px",
        // }}
      /> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// function App() {
//   return (
//     // <FetchDataWithUseQuery />
//     // <FetchDataWithAxios />
//     // <div className="min-h-screen bg-white">
//     //   {/* Mobile Layout */}
//     //   <div className="lg:hidden">
//     //     <MobileHeader />
//     //     <MobileContent />
//     //     <BottomNav />
//     //   </div>

//     //   {/* Desktop Layout */}
//     // <div className="hidden lg:block">
//     //   <Sidebar />
//     //   <Header />
//     //   <MainContent />
//     // </div>
//     // </div>
//     // <QueryClientProvider client={queryClient}>
//     //   <SearchProvider>
//     <>
//       <div className="mx-auto grid min-h-screen max-w-screen-2xl grid-cols-[auto_1fr_22.875rem] grid-rows-[auto_1fr] gap-y-6 overflow-hidden bg-[#FAFAFA] pr-6 font-bold">
//         <Header />
//         <Sidebar />

//         {!isSearching ? (
//           <Main isMainProductLoaded={isMainProductLoaded} onLoad={handleLoad} />
//         ) : (
//           // <CartPage />
//           // <CheckoutPage />
//           <ProductPage />
//         )}
//         {/* {<ProductPage />} */}
//         {/* <CartPage /> */}
//         {/* <CheckoutPage /> */}
//       </div>
// <ToastContainer position="top-right" autoClose={3000} />
// <ReactQueryDevtools initialIsOpen={false} />
//     </>
//     // </SearchProvider>
//     // </QueryClientProvider>
//   );
// }

export default App;
