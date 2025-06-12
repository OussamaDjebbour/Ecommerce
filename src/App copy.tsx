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

// Create a new QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 300000,
    },
  },
});

function App() {
  // const [products, setProducts] = useState([]);

  // const [searchQuery, setSearchQuery] = useState("");

  // const { searchQuery } = useSearchContext();
  // const { products, isLoading } = useSearchProducts();

  // console.log("searchQuery", searchQuery);
  // console.log("suggestions", suggestions);
  const [isMainProductLoaded, setIsMainProductLoaded] = useState(false);

  function handleLoad() {
    setIsMainProductLoaded(true);
  }

  const isSearching = useSearchStore((state) => state.isSearching);

  console.log("isSearchingisSearchingisSearching", isSearching);

  return (
    // <FetchDataWithUseQuery />
    // <FetchDataWithAxios />
    // <div className="min-h-screen bg-white">
    //   {/* Mobile Layout */}
    //   <div className="lg:hidden">
    //     <MobileHeader />
    //     <MobileContent />
    //     <BottomNav />
    //   </div>

    //   {/* Desktop Layout */}
    // <div className="hidden lg:block">
    //   <Sidebar />
    //   <Header />
    //   <MainContent />
    // </div>
    // </div>
    // <QueryClientProvider client={queryClient}>
    //   <SearchProvider>
    <>
      <div className="mx-auto grid min-h-screen max-w-screen-2xl grid-cols-[auto_1fr_22.875rem] grid-rows-[auto_1fr] gap-y-6 overflow-hidden bg-[#FAFAFA] pr-6 font-bold">
        {/* <div className="grid min-h-screen grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr] gap-x-12 gap-y-6 bg-[#FAFAFA] font-bold"> */}
        <Header />
        <Sidebar />
        {/* <SwiperSlider /> */}
        {/* <Main /> */}
        {/* {products?.length > 0 ? <ProductPage /> : <Main />} */}
        {!isSearching ? (
          <Main isMainProductLoaded={isMainProductLoaded} onLoad={handleLoad} />
        ) : (
          // <CartPage />
          // <CheckoutPage />
          <ProductPage />
        )}
        {/* {<ProductPage />} */}
        {/* <CartPage /> */}
        {/* <CheckoutPage /> */}
        {/* {products?.length > 0 && <ProductPage />} */}
        {/* <ProductPage /> */}
        {!isSearching && (
          <div className="col-span-1 row-span-1">
            <HeadphonesAd />

            <DailyDeals isMainProductLoaded={isMainProductLoaded} />
          </div>
        )}
        {/* <PopularCategories /> */}
        {/* <SummerPromo /> */}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
    //  </SearchProvider>
    // </QueryClientProvider>
    // <div>
    //   <h1>Products</h1>
    //   <ul>
    //     {products.map((product) => (
    //       <li key={product.id}>
    //         <h2>{product.title}</h2>
    //         <p>Price: ${product.price}</p>
    //         <img src={product.images[0]} alt={product.title} width="150" />
    //       </li>
    //     ))}
    //     {/* {products.map((product) => (
    //       <li key={product.id}>
    //         <h2>{product.title}</h2>
    //         <p>Price: ${product.price}</p>
    //         <img src={product.images[0]} alt={product.title} width="150" />
    //       </li>
    //     ))} */}
    //   </ul>
    // </div>
  );
}

export default App;
