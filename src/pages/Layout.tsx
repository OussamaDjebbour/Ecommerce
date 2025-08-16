import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/features/Header";
import Sidebar from "../components/features/Sidebar";
import HeadphonesAd from "../components/ui/HeadphonesAd ";
import DailyDeals from "../components/ui/DailyDeals";
import MobileHeader from "../components/MobileHeader";
import { MobileContent } from "../components/MobileContent";
import { BottomNav } from "../components/BottomNav";

// export default function Layout() {
//   const [isMainProductLoaded, setIsMainProductLoaded] = useState(false);
//   const navigate = useNavigate();

//   const location = useLocation();

//   // Check if we're on the base route
//   const isOnBaseRoute = location.pathname === "/";

//   // location.pathname.includes("productPage") ||
//   // location.pathname.includes("cart") ||
//   // location.pathname.includes("checkout");

//   // const { debouncedQuery, isSearching } = useSearchStore();

//   // useEffect(() => {
//   //   if (debouncedQuery.trim()) {
//   //     const path = window.location.pathname;
//   //     if (!path.includes("productPage")) {
//   //       navigate("productPage");
//   //     }
//   //   }
//   // }, [debouncedQuery, navigate]);

//   return (
//     <div className="relative mx-auto grid min-h-screen gap-y-6 overflow-hidden bg-[#FAFAFA] pr-6 font-bold xl:max-w-screen-2xl xl:grid-cols-[auto_auto_auto] xl:grid-rows-[auto_1fr]">
//       {/* <div className="relative mx-auto grid min-h-screen gap-y-6 overflow-hidden bg-[#FAFAFA] pr-6 font-bold lg:max-w-screen-2xl lg:grid-cols-[auto_1fr_auto] lg:grid-rows-[auto_1fr]"> */}
//       {/* <div className="relative mx-auto grid min-h-screen gap-y-6 overflow-hidden bg-[#FAFAFA] pr-6 font-bold lg:max-w-screen-2xl lg:grid-cols-[auto_1fr_22.875rem] lg:grid-rows-[auto_1fr]"> */}
//       <Header />
//       <Sidebar />
//       {/* Mobile Layout */}

//       {/* <div></div> */}
//       <Outlet context={{ isMainProductLoaded, setIsMainProductLoaded }} />
//       {/* <Main /> */}
//       {isOnBaseRoute && (
//         <div className="col-span-1 row-span-1">
//           <HeadphonesAd />
//           <DailyDeals isMainProductLoaded={isMainProductLoaded} />
//         </div>
//       )}
//     </div>
//   );
// }

// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   useMemo,
//   memo,
// } from "react";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   ShoppingCart,
//   Eye,
//   Heart,
//   Package,
//   TrendingUp,
//   Clock,
//   Star,
//   ArrowRight,
//   Menu,
//   X,
//   Search,
//   Bell,
//   User,
//   Home,
//   Grid3X3,
//   Settings,
//   HelpCircle,
//   Phone,
// } from "lucide-react";

// Import your existing hooks and utilities
// import { useCartStore, useSearchProducts, useRouterSearchParams, etc. }

export default function Layout() {
  const [isMainProductLoaded, setIsMainProductLoaded] = useState(false);
  const location = useLocation();
  const isOnBaseRoute = location.pathname === "/";

  return (
    <div className="relative mx-auto min-h-screen bg-[#FAFAFA] font-bold">
      {/* Desktop Layout (1280px+) */}
      {/* <div className="hidden xl:grid xl:min-h-screen xl:max-w-screen-2xl xl:grid-cols-[auto_auto_22.875rem] xl:grid-rows-[auto_1fr] xl:gap-y-6 xl:overflow-hidden xl:pr-6"> */}
      <div className="hidden flex-col gap-y-6 overflow-hidden px-4 sm:px-6 lg:px-0 xl:grid xl:max-w-screen-2xl xl:grid-cols-[auto_1fr_minmax(auto,23.875rem)] xl:grid-rows-[auto_1fr] xl:gap-8 2xl:gap-12">
        <Header />
        <Sidebar />
        {/* <div className="min-w-0 xl:col-span-1 xl:row-span-1"> */}
        <Outlet context={{ isMainProductLoaded, setIsMainProductLoaded }} />
        {/* </div> */}
        {isOnBaseRoute && (
          <div className="col-span-1 row-span-1 pr-4">
            {/* <div className="min-w-[20rem] px-4 sm:px-6 lg:col-span-1 lg:row-span-1 lg:px-0"> */}
            <HeadphonesAd />
            <DailyDeals isMainProductLoaded={isMainProductLoaded} />
          </div>
        )}
      </div>

      {/* Mobile Layout (<1280px) */}
      <div className="xl:hidden">
        <MobileHeader />
        <div className="overflow-x-hidden px-0 pb-4">
          {/* <div className="px-4 pb-4"> */}
          <Outlet context={{ isMainProductLoaded, setIsMainProductLoaded }} />
          {isOnBaseRoute && (
            <div className="mt-6">
              {/* <HeadphonesAd /> */}
              <DailyDeals isMainProductLoaded={isMainProductLoaded} />
            </div>
          )}
        </div>
      </div>
    </div>
    // <div className="relative mx-auto min-h-screen bg-[#FAFAFA] font-bold">
    //   <div className="flex flex-col overflow-visible px-4 sm:px-6 lg:grid lg:max-w-screen-2xl lg:grid-cols-[auto_1fr_minmax(auto,22.875rem)] lg:grid-rows-[auto,1fr] lg:gap-x-4 lg:px-0 xl:gap-x-6">
    //     <Header />
    //     <Sidebar />
    //     <div className="lg:hidden">
    //       <MobileHeader />
    //       {/* <BottomNav /> */}
    //     </div>
    //     <div className="min-w-0 lg:col-span-1 lg:row-span-1">
    //       <Outlet context={{ isMainProductLoaded, setIsMainProductLoaded }} />
    //     </div>
    //     {isOnBaseRoute && (
    //       <div className="min-w-[20rem] px-4 sm:px-6 lg:col-span-1 lg:row-span-1 lg:px-0">
    //         <HeadphonesAd />
    //         <DailyDeals isMainProductLoaded={isMainProductLoaded} />
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}

// function Header() {
//   return (
//     <header className="col-span-2 mr-6 flex justify-between">
//       <HeaderTitle />
//       <div className="mt-6 flex items-center gap-8 2xl:gap-12">
//         <SearchBar />
//         <HeaderIconsGroup />
//       </div>
//     </header>
//   );
// }

// function HeaderTitle() {
//   return (
//     <div>
//       <h2 className="mt-5 text-xl font-semibold text-black 2xl:text-2xl">
//         Top Products
//       </h2>
//       <p className="text-base font-medium 2xl:text-lg">From top brands</p>
//     </div>
//   );
// }

// function SearchBar() {
//   // Your existing SearchBar logic here
//   return (
//     <div className="relative">
//       <form className="relative" onSubmit={(e) => e.preventDefault()}>
//         <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
//         <input
//           className="w-80 rounded-xl bg-white py-2.5 pl-12 pr-12 font-medium text-[#5C5C5C] outline-none transition-shadow duration-200 focus:ring-2 focus:ring-[#00E0C6] 2xl:w-[25.625rem] 2xl:pl-16"
//           type="text"
//           placeholder="Search products..."
//           aria-label="Search products"
//           autoComplete="off"
//         />
//         <Settings className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-400" />
//       </form>
//     </div>
//   );
// }

// function HeaderIconsGroup() {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const cartItemCount = 0; // Replace with your cart logic

//   return (
//     <div className="flex items-center gap-3 2xl:gap-5">
//       <div className="relative rounded-xl bg-[#E8FCFF]">
//         <button
//           onClick={() => setIsCartOpen(!isCartOpen)}
//           className="relative cursor-pointer rounded p-2 focus:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
//         >
//           <ShoppingCart className="h-5 w-5 text-[#016170] 2xl:h-6 2xl:w-6" />
//           {cartItemCount > 0 && (
//             <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-xs text-white">
//               {cartItemCount}
//             </span>
//           )}
//         </button>
//       </div>

//       <button className="cursor-pointer rounded-xl bg-[#E8FCFF] p-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
//         <Bell className="h-5 w-5 text-[#016170] 2xl:h-6 2xl:w-6" />
//       </button>

//       <div className="h-8 w-8 cursor-pointer rounded-xl bg-gray-300 2xl:h-10 2xl:w-10"></div>
//     </div>
//   );
// }

// function Sidebar() {
//   return (
//     <aside className="col-span-1 row-span-full mr-8 bg-white pb-7 font-medium 2xl:mr-12">
//       <Logo />
//       <MenuItemsContainer />
//       <CustomerServiceCard />
//     </aside>
//   );
// }

// function Logo() {
//   return (
//     <div className="ml-6 mt-4 flex items-center gap-3 2xl:ml-[1.75rem] 2xl:gap-4">
//       <div className="rounded-md bg-[#E8FCFF] p-2.5 2xl:p-3.5">
//         <ShoppingCart className="h-5 w-5 text-[#016170] 2xl:h-6 2xl:w-6" />
//       </div>
//       <h1 className="font-publicSans text-xl font-bold text-[#016170] 2xl:text-2xl">
//         ShopNest.
//       </h1>
//     </div>
//   );
// }

// function MenuItemsContainer() {
//   const menuItems = [
//     { icon: <Home className="h-5 w-5" />, label: "Home" },
//     { icon: <Grid3X3 className="h-5 w-5" />, label: "Categories" },
//     { icon: <ShoppingCart className="h-5 w-5" />, label: "Orders" },
//     { icon: <Settings className="h-5 w-5" />, label: "Settings" },
//     { icon: <HelpCircle className="h-5 w-5" />, label: "Help" },
//   ];

//   return (
//     <div className="mb-8 ml-6 mt-10 flex flex-col gap-6 2xl:mb-12 2xl:ml-9 2xl:mt-14 2xl:gap-8">
//       {menuItems.map((item) => (
//         <button
//           key={item.label}
//           className="flex items-center gap-4 rounded-lg text-lg hover:bg-gray-50 2xl:gap-6"
//         >
//           <span className="text-[#5C5C5C]">{item.icon}</span>
//           <span className="text-base font-medium text-[#5C5C5C] 2xl:text-lg">
//             {item.label}
//           </span>
//         </button>
//       ))}
//     </div>
//   );
// }

// function CustomerServiceCard() {
//   return (
//     <div className="mx-6 flex h-[200px] w-[200px] flex-col items-center justify-between rounded-2xl bg-[#A1D2FF] bg-[url('/images/Mask_group.png')] bg-cover bg-center pb-4 pt-3 2xl:mx-7 2xl:h-[250px] 2xl:w-[239px] 2xl:pb-[1.625rem] 2xl:pt-4">
//       <div className="rounded-full border-2 border-white bg-[#00E0C6] p-1.5 2xl:border-[0.375rem] 2xl:p-2">
//         <Phone className="h-4 w-4 text-white 2xl:h-5 2xl:w-5" />
//       </div>
//       <button className="rounded-xl bg-[#D9F4FF] px-3 py-2 text-xs font-semibold text-[#016170] 2xl:px-4 2xl:py-2.5">
//         Customer Service
//       </button>
//     </div>
//   );
// }

// function MobileHeader() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const cartItemCount = 0; // Replace with your cart logic

//   const menuItems = [
//     { icon: <Home className="h-5 w-5" />, label: "Home", href: "/" },
//     {
//       icon: <Grid3X3 className="h-5 w-5" />,
//       label: "Categories",
//       href: "/categories",
//     },
//     {
//       icon: <ShoppingCart className="h-5 w-5" />,
//       label: "Orders",
//       href: "/orders",
//     },
//     {
//       icon: <Settings className="h-5 w-5" />,
//       label: "Settings",
//       href: "/settings",
//     },
//     { icon: <HelpCircle className="h-5 w-5" />, label: "Help", href: "/help" },
//     {
//       icon: <Phone className="h-5 w-5" />,
//       label: "Customer Service",
//       href: "/support",
//     },
//   ];

//   return (
//     <>
//       <header className="sticky top-0 z-50 bg-white shadow-sm">
//         <div className="flex items-center justify-between px-4 py-3">
//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             <div className="rounded-md bg-[#E8FCFF] p-2">
//               <ShoppingCart className="h-5 w-5 text-[#016170]" />
//             </div>
//             <h1 className="text-lg font-bold text-[#016170]">ShopNest.</h1>
//           </div>

//           {/* Right Actions */}
//           <div className="flex items-center gap-3">
//             {/* Search Toggle */}
//             <button
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//               className="rounded-lg bg-[#E8FCFF] p-2 text-[#016170] transition-colors hover:bg-[#D1F5F9]"
//             >
//               <Search className="h-5 w-5" />
//             </button>

//             {/* Cart */}
//             <div className="relative">
//               <button className="rounded-lg bg-[#E8FCFF] p-2 text-[#016170] transition-colors hover:bg-[#D1F5F9]">
//                 <ShoppingCart className="h-5 w-5" />
//                 {cartItemCount > 0 && (
//                   <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
//                     {cartItemCount}
//                   </span>
//                 )}
//               </button>
//             </div>

//             {/* Notifications */}
//             <button className="rounded-lg bg-[#E8FCFF] p-2 text-[#016170] transition-colors hover:bg-[#D1F5F9]">
//               <Bell className="h-5 w-5" />
//             </button>

//             {/* Menu Toggle */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="rounded-lg bg-[#009393] p-2 text-white transition-colors hover:bg-[#007a7a]"
//             >
//               {isMenuOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Search Bar (Expandable) */}
//         {isSearchOpen && (
//           <div className="border-t bg-gray-50 px-4 py-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="w-full rounded-lg bg-white py-2.5 pl-10 pr-4 text-sm outline-none ring-2 ring-transparent focus:ring-[#00E0C6]"
//                 autoFocus
//               />
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Mobile Menu Overlay */}
//       {isMenuOpen && (
//         <div
//           className="fixed inset-0 z-50 bg-black/50"
//           onClick={() => setIsMenuOpen(false)}
//         >
//           <div
//             className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Menu Header */}
//             <div className="flex items-center justify-between border-b px-6 py-4">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#009393] to-[#016170]"></div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900">Welcome</h3>
//                   <p className="text-sm text-gray-500">Explore our features</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsMenuOpen(false)}
//                 className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             {/* Menu Items */}
//             <nav className="p-4">
//               <div className="space-y-2">
//                 {menuItems.map((item) => (
//                   <a
//                     key={item.label}
//                     href={item.href}
//                     className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-[#E8FCFF] hover:text-[#016170]"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <span className="text-gray-500">{item.icon}</span>
//                     <span className="font-medium">{item.label}</span>
//                   </a>
//                 ))}
//               </div>

//               {/* Customer Service Card in Menu */}
//               <div className="mt-8 rounded-xl bg-gradient-to-br from-[#A1D2FF] to-[#00E0C6]/90 p-4 text-center">
//                 <div className="mb-3 flex justify-center">
//                   <div className="rounded-full bg-white/20 p-3">
//                     <Phone className="h-6 w-6 text-white" />
//                   </div>
//                 </div>
//                 <h4 className="mb-2 font-semibold text-[#016170]">
//                   Need Help?
//                 </h4>
//                 <p className="mb-3 text-sm text-[#016170]/80">
//                   Get 24/7 customer support
//                 </p>
//                 <button className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-[#016170] transition-colors hover:bg-white">
//                   Contact Support
//                 </button>
//               </div>
//             </nav>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// function MainProduct({ onLoad }) {
//   const navigate = useNavigate();
//   const cart = useCartStore((state) => state.cart);
//   const { addToCart, setBuyNowProduct } = useCartStore();
//   const [quantity, setQuantity] = useState(1);
//   const [currentImage, setCurrentImage] = useState("");
//   const navigateToProduct = useNavigateToProduct();

//   const {
//     data: product,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["mainProduct"],
//     queryFn: fetchMainProduct,
//   });

//   const isFull = cart.some(
//     (item) => item.id === product?.id && item.quantity + quantity > item.stock,
//   );

//   const {
//     hasDiscount = false,
//     originalPrice = 0,
//     discountedPrice = 0,
//     savings = 0,
//   } = product
//     ? getPriceDetails(product)
//     : {
//         hasDiscount: false,
//         originalPrice: 0,
//         discountedPrice: 0,
//         savings: 0,
//       };

//   useEffect(() => {
//     if (product && !currentImage) {
//       setCurrentImage(product.images?.[0] || product.thumbnail);
//     }
//   }, [product, currentImage]);

//   useEffect(() => {
//     if (isSuccess) {
//       onLoad();
//     }
//   }, [isSuccess, onLoad]);

//   const handleAddToCart = () => {
//     if (!product) return;

//     const quantityInCart =
//       useCartStore.getState().cart.find((item) => item.id === product.id)
//         ?.quantity || 0;

//     if (quantityInCart + quantity <= product.stock) {
//       const cartItem = {
//         ...product,
//         quantity,
//         image: currentImage || product.thumbnail,
//         discountedPrice: discountedPrice || originalPrice,
//       };
//       const result = addToCart(cartItem);
//       showAddToCartToast(
//         result.success,
//         result.message,
//         product.title,
//         currentImage || product.thumbnail,
//         quantity,
//       );
//     } else if (quantityInCart >= product.stock) {
//       showMaxStockToast(product.title);
//     } else {
//       showWarningToast(
//         `Only ${product.stock - quantityInCart} more items available`,
//       );
//     }
//   };

//   const handleBuyNow = () => {
//     if (!product) return;

//     const cartItem = {
//       ...product,
//       quantity,
//       image: currentImage || product.thumbnail,
//       discountedPrice: discountedPrice || originalPrice,
//     };

//     setBuyNowProduct(cartItem);
//     navigate("/checkout?mode=buy-now");
//   };

//   const handleViewDetails = (product) => {
//     if (!product) return;
//     navigateToProduct(product);
//   };

//   if (isLoading) return <Spinner />;
//   if (!product) return <ErrorMessage message="Product not found." />;
//   if (product.stock <= 0)
//     return <ErrorMessage message="This product is currently out of stock." />;
//   if (isError) return <ErrorMessage message={error.message} />;

//   return (
//     <div className="relative mx-auto mb-8 bg-white p-4 xl:mx-0 xl:mt-20 xl:flex xl:w-full xl:max-w-none xl:items-center xl:gap-6 xl:pb-6 xl:pl-7 xl:pr-3 xl:pt-3 2xl:max-w-[45.5rem] 2xl:gap-12">
//       {hasDiscount && (
//         <div className="absolute right-3 top-3 z-10 animate-pulse rounded-full bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 text-xs font-bold text-white shadow-lg md:text-sm">
//           Save ${savings.toFixed(2)}
//         </div>
//       )}

//       <div className="relative mb-6 xl:mb-0 xl:flex-shrink-0">
//         <div className="carousel w-full">
//           <img
//             src={currentImage || product?.thumbnail}
//             alt={product?.title}
//             className="mx-auto w-full max-w-48 xl:w-32 xl:max-w-32 2xl:w-44 2xl:max-w-44"
//           />
//           <div className="thumbnails mt-2 flex justify-center">
//             {product?.images?.map((image) => (
//               <button
//                 key={image}
//                 onClick={() => setCurrentImage(image)}
//                 className={`rounded-md transition-all duration-200 ${
//                   currentImage === image
//                     ? "ring-2 ring-[#009393] ring-offset-2"
//                     : "hover:opacity-75"
//                 }`}
//               >
//                 <img
//                   src={image}
//                   alt={product.title}
//                   className="mr-2 w-8 cursor-pointer xl:w-10 2xl:w-12"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="min-w-0 flex-1">
//         <h3 className="mb-1 text-lg font-medium text-black xl:text-xl">
//           {product?.title}
//         </h3>

//         <div className="mb-4 flex items-center gap-3">
//           <div className="flex items-center gap-1">
//             {renderStars(product.rating, 5)}
//           </div>
//           <span className="text-base font-semibold text-gray-900 xl:text-lg">
//             {product.rating}
//           </span>
//           <span className="text-sm text-gray-500">
//             ({product.reviews?.length || 0} reviews)
//           </span>
//         </div>

//         <p className="mb-4 text-sm font-normal text-[#5C5C5C] xl:mb-[1.125rem] xl:text-xs 2xl:mr-3">
//           {product?.description}
//         </p>

//         <div className="mb-4 flex items-center gap-2 text-base font-medium xl:mb-[1.125rem] xl:text-lg">
//           <p className="text-lg xl:text-xl">
//             Price{" "}
//             {hasDiscount && (
//               <span className="ml-0.5 font-bold text-[#009393]">
//                 ${discountedPrice}
//               </span>
//             )}
//           </p>
//           <span
//             className={`ml-1 text-base font-normal text-[#5C5C5C] xl:text-lg ${hasDiscount && "line-through"}`}
//           >
//             ${originalPrice.toFixed(2)}
//           </span>
//         </div>

//         <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:justify-between xl:mb-6 xl:flex-col xl:gap-3 2xl:mb-8 2xl:flex-row 2xl:gap-4">
//           <QuantityControl
//             product={{
//               ...product,
//               quantity,
//               image: currentImage,
//               discountedPrice: discountedPrice || originalPrice,
//             }}
//             mode="buy-now"
//             onUpdateBuyNow={setQuantity}
//             onRemoveBuyNow={() => setQuantity(1)}
//           />
//           <p className="text-sm font-bold text-[#5C5C5C] xl:text-base">
//             {product.stock} <span className="font-medium">items left</span>
//           </p>
//         </div>

//         <div className="flex flex-col gap-3 sm:flex-row xl:flex-col xl:gap-3 2xl:flex-row 2xl:gap-5">
//           <div className="flex gap-3 xl:gap-2 2xl:gap-3">
//             <button
//               onClick={() => handleViewDetails(product)}
//               className="group flex items-center justify-center rounded-xl border-2 border-[#009393] px-3 py-2 text-[#009393] transition-all duration-200 hover:bg-[#009393] hover:text-white xl:px-2 xl:py-2 2xl:px-4 2xl:py-3"
//               title="View product details"
//             >
//               <Eye className="h-4 w-4 transition-transform group-hover:scale-110 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6" />
//             </button>
//             <button className="group flex items-center justify-center rounded-xl border-2 border-[#009393] px-3 py-2 text-[#009393] transition-all duration-200 hover:bg-[#009393] hover:text-white xl:px-2 xl:py-2 2xl:px-4 2xl:py-3">
//               <Heart className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:fill-current xl:h-5 xl:w-5 2xl:h-6 2xl:w-6" />
//             </button>
//           </div>

//           <div className="flex flex-1 gap-3">
//             <button
//               className={`group/btn flex flex-1 items-center justify-center gap-1 rounded-lg border-2 border-[#009393] px-2 py-2 text-sm font-medium text-[#009393] transition-all duration-200 hover:scale-105 hover:bg-[#009393] xl:gap-1 xl:px-2 xl:text-xs 2xl:gap-2 2xl:px-4 2xl:text-sm ${isFull ? "cursor-not-allowed opacity-50 hover:scale-100 hover:bg-transparent" : "hover:text-white"}`}
//               onClick={handleAddToCart}
//               aria-label={`Add ${product.title} to cart`}
//             >
//               <ShoppingCart
//                 className={`h-4 w-4 transition-transform ${!isFull && "group-hover/btn:scale-110"}`}
//               />
//               <span className="hidden sm:inline xl:hidden 2xl:inline">
//                 {isFull ? "Out of Stock" : "Add to Cart"}
//               </span>
//               <span className="sm:hidden xl:inline 2xl:hidden">
//                 {isFull ? "Out" : "Add"}
//               </span>
//             </button>
//             <button
//               className="flex-1 rounded-lg bg-[#009393] px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-[#007a7a] hover:shadow-lg xl:px-3 xl:text-xs 2xl:px-7 2xl:text-sm"
//               onClick={handleBuyNow}
//             >
//               Buy now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const HeadphonesAd = () => {
//   return (
//     <div className="relative mb-6 ml-auto h-40 w-11/12 rounded-2xl bg-gradient-to-br from-[#A1D2FF] to-[#00E0C6]/90 p-4 shadow-lg lg:h-48 lg:pb-6 lg:pl-4 lg:pt-3 xl:mb-[4.3125rem] xl:h-56 xl:pb-8 xl:pl-5">
//       <div className="z-10 flex h-full flex-col justify-between">
//         <h2 className="pr-4 text-lg font-semibold text-[#016170] lg:text-xl xl:mr-6 xl:text-2xl">
//           Summer headphones from top brands
//         </h2>
//         <button className="flex items-center text-sm font-medium text-[#016170] hover:underline lg:text-base">
//           Buy it now
//           <span className="ml-2">
//             <ArrowRight className="h-4 w-4" />
//           </span>
//         </button>

//         <img
//           src="images/red-headphones.png"
//           alt="Red Headphones"
//           className="absolute bottom-3 right-10 h-12 w-auto lg:right-12 lg:h-14 xl:right-16 xl:h-auto"
//         />
//         <img
//           src="images/green-headphones.png"
//           alt="Green Headphones"
//           className="absolute -right-1 bottom-0 h-12 w-auto lg:-right-2 lg:h-14 xl:-right-4 xl:h-auto"
//         />
//       </div>
//     </div>
//   );
// };

// function DailyDeals({ isMainProductLoaded }) {
//   // Simplified version - add your full DailyDeals logic here
//   return (
//     <div className="w-full lg:ml-auto lg:max-w-sm xl:max-w-none">
//       <div className="mb-6">
//         <div className="mb-2 flex items-center gap-2 xl:gap-2 2xl:gap-3">
//           <div className="rounded-lg bg-gradient-to-br from-[#009393] to-[#016170] p-2 shadow-lg">
//             <TrendingUp className="h-4 w-4 text-white xl:h-4 xl:w-4 2xl:h-5 2xl:w-5" />
//           </div>
//           <h3 className="bg-gradient-to-r from-[#016170] to-[#009393] bg-clip-text text-xl font-bold text-transparent xl:text-lg 2xl:text-2xl">
//             Daily Deals
//           </h3>
//         </div>

//         <div className="flex items-center gap-2 text-sm text-gray-600 xl:text-xs 2xl:text-sm">
//           <Clock className="h-4 w-4" />
//           <span>Limited time offers • Updated daily</span>
//           <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
//         </div>
//       </div>

//       {/* Sample deal items */}
//       <div className="space-y-4">
//         {[1, 2, 3].map((item) => (
//           <div
//             key={item}
//             className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md xl:gap-2 xl:p-2 2xl:gap-4 2xl:p-4"
//           >
//             <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 xl:h-8 xl:w-8 2xl:h-12 2xl:w-12"></div>
//             <div className="min-w-0 flex-1">
//               <h4 className="truncate text-sm font-semibold text-gray-800 xl:text-xs 2xl:text-base">
//                 Sample Product {item}
//               </h4>
//               <p className="text-xs text-gray-500 xl:text-xs 2xl:text-sm">
//                 Great deal!
//               </p>
//             </div>
//             <div className="text-right">
//               <div className="text-base font-bold text-[#009393] xl:text-sm 2xl:text-lg">
//                 $49.99
//               </div>
//               <div className="text-xs text-gray-400 line-through xl:text-xs 2xl:text-sm">
//                 $79.99
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// Add your other components (ProductCard, etc.) here with responsive improvements

// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   useMemo,
//   memo,
// } from "react";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   ShoppingCart,
//   Eye,
//   Heart,
//   Package,
//   TrendingUp,
//   Clock,
//   Star,
//   ArrowRight,
//   Menu,
//   X,
//   Search,
//   Bell,
//   User,
//   Home,
//   Grid3X3,
//   Settings,
//   HelpCircle,
//   Phone,
// } from "lucide-react";

// // Import your existing hooks and utilities
// // import { useCartStore, useSearchProducts, useRouterSearchParams, etc. }

// export default function Layout() {
//   const [isMainProductLoaded, setIsMainProductLoaded] = useState(false);
//   const location = useLocation();
//   const isOnBaseRoute = location.pathname === "/";

//   return (
//     <div className="relative mx-auto min-h-screen bg-[#FAFAFA] font-bold">
//       {/* Desktop Layout (1280px+) */}
//       <div className="hidden xl:grid xl:min-h-screen xl:max-w-screen-2xl xl:grid-cols-[auto_auto_22.875rem] xl:grid-rows-[auto_1fr] xl:gap-y-6 xl:overflow-hidden xl:pr-6">
//         <Header />
//         <Sidebar />
//         <Outlet context={{ isMainProductLoaded, setIsMainProductLoaded }} />
//         {isOnBaseRoute && (
//           <div className="col-span-1 row-span-1">
//             <HeadphonesAd />
//             <DailyDeals isMainProductLoaded={isMainProductLoaded} />
//           </div>
//         )}
//       </div>

//       {/* Mobile Layout (<1280px) */}
//       <div className="xl:hidden">
//         <MobileHeader />
//         <div className="px-4 pb-4">
//           <Outlet context={{ isMainProductLoaded, setIsMainProductLoaded }} />
//           {isOnBaseRoute && (
//             <div className="mt-6">
//               <HeadphonesAd />
//               <DailyDeals isMainProductLoaded={isMainProductLoaded} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Header() {
//   return (
//     <header className="col-span-2 mr-6 flex justify-between">
//       <HeaderTitle />
//       <div className="mt-6 flex items-center gap-8 2xl:gap-12">
//         <SearchBar />
//         <HeaderIconsGroup />
//       </div>
//     </header>
//   );
// }

// function HeaderTitle() {
//   return (
//     <div>
//       <h2 className="mt-5 text-xl font-semibold text-black 2xl:text-2xl">
//         Top Products
//       </h2>
//       <p className="text-base font-medium 2xl:text-lg">From top brands</p>
//     </div>
//   );
// }

// function SearchBar() {
//   // Your existing SearchBar logic here
//   return (
//     <div className="relative">
//       <form className="relative" onSubmit={(e) => e.preventDefault()}>
//         <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
//         <input
//           className="w-80 rounded-xl bg-white py-2.5 pl-12 pr-12 font-medium text-[#5C5C5C] outline-none transition-shadow duration-200 focus:ring-2 focus:ring-[#00E0C6] 2xl:w-[25.625rem] 2xl:pl-16"
//           type="text"
//           placeholder="Search products..."
//           aria-label="Search products"
//           autoComplete="off"
//         />
//         <Settings className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-400" />
//       </form>
//     </div>
//   );
// }

// function HeaderIconsGroup() {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const cartItemCount = 0; // Replace with your cart logic

//   return (
//     <div className="flex items-center gap-3 2xl:gap-5">
//       <div className="relative rounded-xl bg-[#E8FCFF]">
//         <button
//           onClick={() => setIsCartOpen(!isCartOpen)}
//           className="relative cursor-pointer rounded p-2 focus:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
//         >
//           <ShoppingCart className="h-5 w-5 text-[#016170] 2xl:h-6 2xl:w-6" />
//           {cartItemCount > 0 && (
//             <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-xs text-white">
//               {cartItemCount}
//             </span>
//           )}
//         </button>
//       </div>

//       <button className="cursor-pointer rounded-xl bg-[#E8FCFF] p-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
//         <Bell className="h-5 w-5 text-[#016170] 2xl:h-6 2xl:w-6" />
//       </button>

//       <div className="h-8 w-8 cursor-pointer rounded-xl bg-gray-300 2xl:h-10 2xl:w-10"></div>
//     </div>
//   );
// }

// function Sidebar() {
//   return (
//     <aside className="col-span-1 row-span-full mr-8 bg-white pb-7 font-medium 2xl:mr-12">
//       <Logo />
//       <MenuItemsContainer />
//       <CustomerServiceCard />
//     </aside>
//   );
// }

// function Logo() {
//   return (
//     <div className="ml-6 mt-4 flex items-center gap-3 2xl:ml-[1.75rem] 2xl:gap-4">
//       <div className="rounded-md bg-[#E8FCFF] p-2.5 2xl:p-3.5">
//         <ShoppingCart className="h-5 w-5 text-[#016170] 2xl:h-6 2xl:w-6" />
//       </div>
//       <h1 className="font-publicSans text-xl font-bold text-[#016170] 2xl:text-2xl">
//         ShopNest.
//       </h1>
//     </div>
//   );
// }

// function MenuItemsContainer() {
//   const menuItems = [
//     { icon: <Home className="h-5 w-5" />, label: "Home" },
//     { icon: <Grid3X3 className="h-5 w-5" />, label: "Categories" },
//     { icon: <ShoppingCart className="h-5 w-5" />, label: "Orders" },
//     { icon: <Settings className="h-5 w-5" />, label: "Settings" },
//     { icon: <HelpCircle className="h-5 w-5" />, label: "Help" },
//   ];

//   return (
//     <div className="mb-8 ml-6 mt-10 flex flex-col gap-6 2xl:mb-12 2xl:ml-9 2xl:mt-14 2xl:gap-8">
//       {menuItems.map((item) => (
//         <button
//           key={item.label}
//           className="flex items-center gap-4 rounded-lg text-lg hover:bg-gray-50 2xl:gap-6"
//         >
//           <span className="text-[#5C5C5C]">{item.icon}</span>
//           <span className="text-base font-medium text-[#5C5C5C] 2xl:text-lg">
//             {item.label}
//           </span>
//         </button>
//       ))}
//     </div>
//   );
// }

// function CustomerServiceCard() {
//   return (
//     <div className="mx-6 flex h-[200px] w-[200px] flex-col items-center justify-between rounded-2xl bg-[#A1D2FF] bg-[url('/images/Mask_group.png')] bg-cover bg-center pb-4 pt-3 2xl:mx-7 2xl:h-[250px] 2xl:w-[239px] 2xl:pb-[1.625rem] 2xl:pt-4">
//       <div className="rounded-full border-2 border-white bg-[#00E0C6] p-1.5 2xl:border-[0.375rem] 2xl:p-2">
//         <Phone className="h-4 w-4 text-white 2xl:h-5 2xl:w-5" />
//       </div>
//       <button className="rounded-xl bg-[#D9F4FF] px-3 py-2 text-xs font-semibold text-[#016170] 2xl:px-4 2xl:py-2.5">
//         Customer Service
//       </button>
//     </div>
//   );
// }

// function MobileHeader() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const cartItemCount = 0; // Replace with your cart logic

//   const menuItems = [
//     { icon: <Home className="h-5 w-5" />, label: "Home", href: "/" },
//     {
//       icon: <Grid3X3 className="h-5 w-5" />,
//       label: "Categories",
//       href: "/categories",
//     },
//     {
//       icon: <ShoppingCart className="h-5 w-5" />,
//       label: "Orders",
//       href: "/orders",
//     },
//     {
//       icon: <Settings className="h-5 w-5" />,
//       label: "Settings",
//       href: "/settings",
//     },
//     { icon: <HelpCircle className="h-5 w-5" />, label: "Help", href: "/help" },
//     {
//       icon: <Phone className="h-5 w-5" />,
//       label: "Customer Service",
//       href: "/support",
//     },
//   ];

//   return (
//     <>
//       <header className="sticky top-0 z-50 bg-white shadow-sm">
//         <div className="flex items-center justify-between px-4 py-3">
//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             <div className="rounded-md bg-[#E8FCFF] p-2">
//               <ShoppingCart className="h-5 w-5 text-[#016170]" />
//             </div>
//             <h1 className="text-lg font-bold text-[#016170]">ShopNest.</h1>
//           </div>

//           {/* Right Actions */}
//           <div className="flex items-center gap-3">
//             {/* Search Toggle */}
//             <button
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//               className="rounded-lg bg-[#E8FCFF] p-2 text-[#016170] transition-colors hover:bg-[#D1F5F9]"
//             >
//               <Search className="h-5 w-5" />
//             </button>

//             {/* Cart */}
//             <div className="relative">
//               <button className="rounded-lg bg-[#E8FCFF] p-2 text-[#016170] transition-colors hover:bg-[#D1F5F9]">
//                 <ShoppingCart className="h-5 w-5" />
//                 {cartItemCount > 0 && (
//                   <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
//                     {cartItemCount}
//                   </span>
//                 )}
//               </button>
//             </div>

//             {/* Notifications */}
//             <button className="rounded-lg bg-[#E8FCFF] p-2 text-[#016170] transition-colors hover:bg-[#D1F5F9]">
//               <Bell className="h-5 w-5" />
//             </button>

//             {/* Menu Toggle */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="rounded-lg bg-[#009393] p-2 text-white transition-colors hover:bg-[#007a7a]"
//             >
//               {isMenuOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Search Bar (Expandable) */}
//         {isSearchOpen && (
//           <div className="border-t bg-gray-50 px-4 py-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="w-full rounded-lg bg-white py-2.5 pl-10 pr-4 text-sm outline-none ring-2 ring-transparent focus:ring-[#00E0C6]"
//                 autoFocus
//               />
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Mobile Menu Overlay */}
//       {isMenuOpen && (
//         <div
//           className="fixed inset-0 z-50 bg-black/50"
//           onClick={() => setIsMenuOpen(false)}
//         >
//           <div
//             className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Menu Header */}
//             <div className="flex items-center justify-between border-b px-6 py-4">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#009393] to-[#016170]"></div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900">Welcome</h3>
//                   <p className="text-sm text-gray-500">Explore our features</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsMenuOpen(false)}
//                 className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             {/* Menu Items */}
//             <nav className="p-4">
//               <div className="space-y-2">
//                 {menuItems.map((item) => (
//                   <a
//                     key={item.label}
//                     href={item.href}
//                     className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-[#E8FCFF] hover:text-[#016170]"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <span className="text-gray-500">{item.icon}</span>
//                     <span className="font-medium">{item.label}</span>
//                   </a>
//                 ))}
//               </div>

//               {/* Customer Service Card in Menu */}
//               <div className="mt-8 rounded-xl bg-gradient-to-br from-[#A1D2FF] to-[#00E0C6]/90 p-4 text-center">
//                 <div className="mb-3 flex justify-center">
//                   <div className="rounded-full bg-white/20 p-3">
//                     <Phone className="h-6 w-6 text-white" />
//                   </div>
//                 </div>
//                 <h4 className="mb-2 font-semibold text-[#016170]">
//                   Need Help?
//                 </h4>
//                 <p className="mb-3 text-sm text-[#016170]/80">
//                   Get 24/7 customer support
//                 </p>
//                 <button className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-[#016170] transition-colors hover:bg-white">
//                   Contact Support
//                 </button>
//               </div>
//             </nav>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// function MainProduct({ onLoad }) {
//   const navigate = useNavigate();
//   const cart = useCartStore((state) => state.cart);
//   const { addToCart, setBuyNowProduct } = useCartStore();
//   const [quantity, setQuantity] = useState(1);
//   const [currentImage, setCurrentImage] = useState("");
//   const navigateToProduct = useNavigateToProduct();

//   const {
//     data: product,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["mainProduct"],
//     queryFn: fetchMainProduct,
//   });

//   const isFull = cart.some(
//     (item) => item.id === product?.id && item.quantity + quantity > item.stock,
//   );

//   const {
//     hasDiscount = false,
//     originalPrice = 0,
//     discountedPrice = 0,
//     savings = 0,
//   } = product
//     ? getPriceDetails(product)
//     : {
//         hasDiscount: false,
//         originalPrice: 0,
//         discountedPrice: 0,
//         savings: 0,
//       };

//   useEffect(() => {
//     if (product && !currentImage) {
//       setCurrentImage(product.images?.[0] || product.thumbnail);
//     }
//   }, [product, currentImage]);

//   useEffect(() => {
//     if (isSuccess) {
//       onLoad();
//     }
//   }, [isSuccess, onLoad]);

//   const handleAddToCart = () => {
//     if (!product) return;

//     const quantityInCart =
//       useCartStore.getState().cart.find((item) => item.id === product.id)
//         ?.quantity || 0;

//     if (quantityInCart + quantity <= product.stock) {
//       const cartItem = {
//         ...product,
//         quantity,
//         image: currentImage || product.thumbnail,
//         discountedPrice: discountedPrice || originalPrice,
//       };
//       const result = addToCart(cartItem);
//       showAddToCartToast(
//         result.success,
//         result.message,
//         product.title,
//         currentImage || product.thumbnail,
//         quantity,
//       );
//     } else if (quantityInCart >= product.stock) {
//       showMaxStockToast(product.title);
//     } else {
//       showWarningToast(
//         `Only ${product.stock - quantityInCart} more items available`,
//       );
//     }
//   };

//   const handleBuyNow = () => {
//     if (!product) return;

//     const cartItem = {
//       ...product,
//       quantity,
//       image: currentImage || product.thumbnail,
//       discountedPrice: discountedPrice || originalPrice,
//     };

//     setBuyNowProduct(cartItem);
//     navigate("/checkout?mode=buy-now");
//   };

//   const handleViewDetails = (product) => {
//     if (!product) return;
//     navigateToProduct(product);
//   };

//   if (isLoading) return <Spinner />;
//   if (!product) return <ErrorMessage message="Product not found." />;
//   if (product.stock <= 0)
//     return <ErrorMessage message="This product is currently out of stock." />;
//   if (isError) return <ErrorMessage message={error.message} />;

//   return (
//     <div className="relative mx-auto mb-8 bg-white p-4 xl:mx-0 xl:mt-20 xl:flex xl:max-w-[45.5rem] xl:items-center xl:gap-8 xl:pb-6 xl:pl-7 xl:pr-3 xl:pt-3 2xl:gap-12">
//       {hasDiscount && (
//         <div className="absolute right-3 top-3 z-10 animate-pulse rounded-full bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 text-xs font-bold text-white shadow-lg md:text-sm">
//           Save ${savings.toFixed(2)}
//         </div>
//       )}

//       <div className="relative mb-6 xl:mb-0">
//         <div className="carousel w-full">
//           <img
//             src={currentImage || product?.thumbnail}
//             alt={product?.title}
//             className="mx-auto w-full max-w-48 xl:max-w-32 2xl:min-w-44 2xl:max-w-44"
//           />
//           <div className="thumbnails mt-2 flex justify-center">
//             {product?.images?.map((image) => (
//               <button
//                 key={image}
//                 onClick={() => setCurrentImage(image)}
//                 className={`rounded-md transition-all duration-200 ${
//                   currentImage === image
//                     ? "ring-2 ring-[#009393] ring-offset-2"
//                     : "hover:opacity-75"
//                 }`}
//               >
//                 <img
//                   src={image}
//                   alt={product.title}
//                   className="mr-2 w-12 cursor-pointer"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="flex-1">
//         <h3 className="mb-1 text-lg font-medium text-black xl:text-xl">
//           {product?.title}
//         </h3>

//         <div className="mb-4 flex items-center gap-3">
//           <div className="flex items-center gap-1">
//             {renderStars(product.rating, 5)}
//           </div>
//           <span className="text-base font-semibold text-gray-900 xl:text-lg">
//             {product.rating}
//           </span>
//           <span className="text-sm text-gray-500">
//             ({product.reviews?.length || 0} reviews)
//           </span>
//         </div>

//         <p className="mb-4 text-sm font-normal text-[#5C5C5C] xl:mb-[1.125rem] xl:mr-3 xl:text-xs">
//           {product?.description}
//         </p>

//         <div className="mb-4 flex items-center gap-2 text-base font-medium xl:mb-[1.125rem] xl:text-lg">
//           <p className="text-lg xl:text-xl">
//             Price{" "}
//             {hasDiscount && (
//               <span className="ml-0.5 font-bold text-[#009393]">
//                 ${discountedPrice}
//               </span>
//             )}
//           </p>
//           <span
//             className={`ml-1 text-base font-normal text-[#5C5C5C] xl:text-lg ${hasDiscount && "line-through"}`}
//           >
//             ${originalPrice.toFixed(2)}
//           </span>
//         </div>

//         <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:justify-between xl:mb-8">
//           <QuantityControl
//             product={{
//               ...product,
//               quantity,
//               image: currentImage,
//               discountedPrice: discountedPrice || originalPrice,
//             }}
//             mode="buy-now"
//             onUpdateBuyNow={setQuantity}
//             onRemoveBuyNow={() => setQuantity(1)}
//           />
//           <p className="text-sm font-bold text-[#5C5C5C] xl:text-base">
//             {product.stock} <span className="font-medium">items left</span>
//           </p>
//         </div>

//         <div className="flex flex-col gap-3 sm:flex-row xl:gap-5">
//           <div className="flex gap-3">
//             <button
//               onClick={() => handleViewDetails(product)}
//               className="group flex items-center justify-center rounded-xl border-2 border-[#009393] px-4 py-3 text-[#009393] transition-all duration-200 hover:bg-[#009393] hover:text-white"
//               title="View product details"
//             >
//               <Eye className="h-5 w-5 transition-transform group-hover:scale-110 xl:h-6 xl:w-6" />
//             </button>
//             <button className="group flex items-center justify-center rounded-xl border-2 border-[#009393] px-4 py-3 text-[#009393] transition-all duration-200 hover:bg-[#009393] hover:text-white">
//               <Heart className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:fill-current xl:h-6 xl:w-6" />
//             </button>
//           </div>

//           <div className="flex flex-1 gap-3">
//             <button
//               className={`group/btn flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-[#009393] px-4 py-2 font-medium text-[#009393] transition-all duration-200 hover:scale-105 hover:bg-[#009393] ${isFull ? "cursor-not-allowed opacity-50 hover:scale-100 hover:bg-transparent" : "hover:text-white"}`}
//               onClick={handleAddToCart}
//               aria-label={`Add ${product.title} to cart`}
//             >
//               <ShoppingCart
//                 className={`h-4 w-4 transition-transform ${!isFull && "group-hover/btn:scale-110"}`}
//               />
//               <span className="hidden sm:inline">
//                 {isFull ? "Out of Stock" : "Add to Cart"}
//               </span>
//               <span className="sm:hidden">{isFull ? "Out" : "Add"}</span>
//             </button>
//             <button
//               className="flex-1 rounded-lg bg-[#009393] px-4 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-[#007a7a] hover:shadow-lg xl:px-7"
//               onClick={handleBuyNow}
//             >
//               Buy now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const HeadphonesAd = () => {
//   return (
//     <div className="relative mb-6 h-40 w-full rounded-2xl bg-gradient-to-br from-[#A1D2FF] to-[#00E0C6]/90 p-4 shadow-lg lg:h-48 lg:pb-6 lg:pl-4 lg:pt-3 xl:mb-[4.3125rem] xl:h-56 xl:pb-8 xl:pl-5">
//       <div className="z-10 flex h-full flex-col justify-between">
//         <h2 className="pr-4 text-lg font-semibold text-[#016170] lg:text-xl xl:mr-6 xl:text-2xl">
//           Summer headphones from top brands
//         </h2>
//         <button className="flex items-center text-sm font-medium text-[#016170] hover:underline lg:text-base">
//           Buy it now
//           <span className="ml-2">
//             <ArrowRight className="h-4 w-4" />
//           </span>
//         </button>

//         <img
//           src="images/red-headphones.png"
//           alt="Red Headphones"
//           className="absolute bottom-3 right-10 h-12 w-auto lg:right-12 lg:h-14 xl:right-16 xl:h-auto"
//         />
//         <img
//           src="images/green-headphones.png"
//           alt="Green Headphones"
//           className="absolute -right-1 bottom-0 h-12 w-auto lg:-right-2 lg:h-14 xl:-right-4 xl:h-auto"
//         />
//       </div>
//     </div>
//   );
// };

// function DailyDeals({ isMainProductLoaded }) {
//   // Simplified version - add your full DailyDeals logic here
//   return (
//     <div className="w-full lg:ml-auto lg:max-w-sm xl:max-w-md">
//       <div className="mb-6">
//         <div className="mb-2 flex items-center gap-3">
//           <div className="rounded-lg bg-gradient-to-br from-[#009393] to-[#016170] p-2 shadow-lg">
//             <TrendingUp className="h-5 w-5 text-white" />
//           </div>
//           <h3 className="bg-gradient-to-r from-[#016170] to-[#009393] bg-clip-text text-xl font-bold text-transparent xl:text-2xl">
//             Daily Deals
//           </h3>
//         </div>

//         <div className="flex items-center gap-2 text-sm text-gray-600">
//           <Clock className="h-4 w-4" />
//           <span>Limited time offers • Updated daily</span>
//           <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
//         </div>
//       </div>

//       {/* Sample deal items */}
//       <div className="space-y-4">
//         {[1, 2, 3].map((item) => (
//           <div
//             key={item}
//             className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md xl:gap-4 xl:p-4"
//           >
//             <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 xl:h-12 xl:w-12"></div>
//             <div className="min-w-0 flex-1">
//               <h4 className="truncate text-sm font-semibold text-gray-800 xl:text-base">
//                 Sample Product {item}
//               </h4>
//               <p className="text-xs text-gray-500 xl:text-sm">Great deal!</p>
//             </div>
//             <div className="text-right">
//               <div className="text-base font-bold text-[#009393] xl:text-lg">
//                 $49.99
//               </div>
//               <div className="text-xs text-gray-400 line-through xl:text-sm">
//                 $79.99
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// Add your other components (ProductCard, etc.) here with responsive improvements

// import React, { useState } from "react";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCartShopping,
//   faChevronRight,
//   faChevronLeft,
//   faArrowRight,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   Eye,
//   Heart,
//   ShoppingCart,
//   Package,
//   Star,
//   TrendingUp,
//   Clock,
//   ArrowRight,
// } from "lucide-react";

// export default function Layout() {
//   const [isMainProductLoaded, setIsMainProductLoaded] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Check if we're on the base route
//   const isOnBaseRoute = location.pathname === "/";

//   return (
//     <div className="relative mx-auto min-h-screen bg-[#FAFAFA] font-bold">
//       {/* Desktop Layout */}
//       <div className="hidden lg:mx-auto lg:grid lg:max-w-screen-2xl lg:grid-cols-[auto_1fr_22.875rem] lg:grid-rows-[auto_1fr] lg:gap-y-6 lg:overflow-hidden lg:pr-6">
//         <Header />
// <Sidebar />;

//         <Outlet context={{ isMainProductLoaded, setIsMainProductLoaded }} />

//         {isOnBaseRoute && (
//           <div className="col-span-1 row-span-1">
//             <HeadphonesAd />
//             <DailyDeals isMainProductLoaded={isMainProductLoaded} />
//           </div>
//         )}
//       </div>

//       {/* Mobile Layout */}
//       <div className="lg:hidden">
//         <MobileHeader />
//         <div className="px-4 pb-20">
//           <Outlet context={{ isMainProductLoaded, setIsMainProductLoaded }} />

//           {isOnBaseRoute && (
//             <div className="mt-6 space-y-6">
//               <HeadphonesAd />
//               <DailyDeals isMainProductLoaded={isMainProductLoaded} />
//             </div>
//           )}
//         </div>
//         <BottomNav />
//       </div>
//     </div>
//   );
// }

// function Header() {
//   return (
//     <header className="col-span-2 mr-6 hidden justify-between lg:flex">
//       <HeaderTitle />
//       <div className="mt-6 flex items-center gap-12">
//         <SearchBar />
//         <HeaderIconsGroup />
//       </div>
//     </header>
//   );
// }

// function HeaderTitle() {
//   return (
//     <div>
//       <h2 className="mt-5 text-2xl font-semibold text-black">Top Products</h2>
//       <p className="text-lg font-medium">From top brands</p>
//     </div>
//   );
// }

// function MobileHeader() {
//   return (
//     <header className="sticky top-0 z-50 bg-white px-4 py-3 shadow-sm">
//       <div className="flex items-center justify-between">
//         <Logo />
//         <div className="flex items-center gap-3">
//           <MobileSearchButton />
//           <HeaderIconsGroup />
//         </div>
//       </div>
//       <div className="mt-3">
//         <MobileSearchBar />
//       </div>
//     </header>
//   );
// }

// function MobileSearchButton() {
//   return (
//     <button className="rounded-lg bg-gray-100 p-2">
//       <img src="/images/fi-br-search.png" alt="Search" className="h-5 w-5" />
//     </button>
//   );
// }

// function MobileSearchBar() {
//   // Simplified mobile search - you can expand this with the full SearchBar logic
//   return (
//     <div className="relative">
//       <img
//         src="/images/fi-br-search.png"
//         alt="Search Icon"
//         className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
//       />
//       <input
//         className="w-full rounded-lg bg-gray-100 py-2.5 pl-10 pr-4 text-sm font-medium text-[#5C5C5C] outline-none focus:ring-2 focus:ring-[#00E0C6]"
//         type="text"
//         placeholder="Search products..."
//       />
//     </div>
//   );
// }

// const SearchBar = () => {
//   // Your existing SearchBar component logic here
//   // I'm keeping the original structure but making the width responsive

//   return (
//     <div className="relative">
//       <form className="relative" onSubmit={(e) => e.preventDefault()}>
//         <img
//           src="/images/fi-br-search.png"
//           alt="Search Icon"
//           className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer"
//         />

//         <input
//           className="w-full max-w-[25.625rem] rounded-xl bg-white py-2.5 pl-16 pr-12 font-medium text-[#5C5C5C] outline-none transition-shadow duration-200 focus:ring-2 focus:ring-[#00E0C6] xl:w-[25.625rem]"
//           type="text"
//           placeholder="Search products..."
//           aria-label="Search products"
//           autoComplete="off"
//         />

//         <img
//           src="/images/fi-br-settings-sliders.png"
//           alt="Settings Icon"
//           className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
//         />
//       </form>
//     </div>
//   );
// };

// function HeaderIconsGroup() {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   // Simplified for demo - add your cart logic here
//   const cartItemCount = 0;

//   return (
//     <div className="flex items-center gap-3 lg:gap-5">
//       {/* Cart Icon with Badge */}
//       <div className="relative rounded-xl bg-[#E8FCFF]">
//         <button
//           onClick={() => setIsCartOpen(!isCartOpen)}
//           className="relative cursor-pointer rounded p-2 focus:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
//         >
//           <FontAwesomeIcon
//             color="#016170"
//             size="lg"
//             icon={faCartShopping}
//             className="lg:text-2xl"
//           />

//           {cartItemCount > 0 && (
//             <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-xs text-white">
//               {cartItemCount}
//             </span>
//           )}
//         </button>
//       </div>

//       <button className="cursor-pointer rounded-xl bg-[#E8FCFF] p-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
//         <img
//           src="/images/notification.png"
//           alt="notification Icon"
//           className="h-5 w-5 lg:h-6 lg:w-6"
//         />
//       </button>

//       <img
//         src="/images/retry.png"
//         alt="User profile"
//         className="h-8 w-8 cursor-pointer rounded-xl lg:h-10 lg:w-10"
//       />
//     </div>
//   );
// }

// function Sidebar() {
//   return (
//     <aside className="col-span-1 row-span-full mr-12 hidden bg-white pb-7 font-medium lg:block">
//       <Logo />
//       <MenuItemsContainer />
//       <CustomerServiceCard />
//     </aside>
//   );
// }

// function Logo() {
//   return (
//     <div className="ml-[1.75rem] mt-4 flex items-center gap-4">
//       <FontAwesomeIcon
//         className="rounded-md bg-[#E8FCFF] p-3.5"
//         color="#016170"
//         size="xl"
//         icon={faCartShopping}
//       />
//       <h1 className="font-publicSans text-2xl font-bold text-[#016170]">
//         ShopNest.
//       </h1>
//     </div>
//   );
// }

// function MenuItemsContainer() {
//   // Simplified - add your MENU_ITEMS logic here
//   return (
//     <div className="mb-12 ml-9 mt-14 flex flex-col gap-8">
//       {/* Add your menu items here */}
//     </div>
//   );
// }

// function CustomerServiceCard() {
//   return (
//     <div className="mx-7 flex h-[250px] w-[239px] flex-col items-center justify-between rounded-2xl bg-[#A1D2FF] bg-[url('/images/Mask_group.png')] bg-cover bg-center pb-[1.625rem] pt-4">
//       <img
//         className="rounded-full border-[0.375rem] border-white bg-[#00E0C6] p-2"
//         src="/images/plus_icon.png"
//         alt="Icon Plus"
//       />
//       <button className="rounded-xl bg-[#D9F4FF] px-4 py-2.5 text-xs font-semibold text-[#016170]">
//         Customer Service
//       </button>
//     </div>
//   );
// }

// function MainProduct({ onLoad }) {
//   // Simplified version - add your full MainProduct logic here
//   return (
//     <div className="mx-auto mb-8 mt-4 max-w-full bg-white p-4 lg:mt-20 lg:max-w-[45.5rem] lg:p-6">
//       <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-12">
//         {/* Product Image */}
//         <div className="w-full flex-shrink-0 lg:w-auto">
//           <img
//             src="/images/placeholder-product.jpg"
//             alt="Product"
//             className="mx-auto w-full max-w-44 lg:mx-0"
//           />
//         </div>

//         {/* Product Details */}
//         <div className="w-full lg:flex-1">
//           <h3 className="mb-2 text-center text-lg font-medium text-black lg:text-left lg:text-xl">
//             Sample Product Title
//           </h3>

//           <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
//             <div className="flex items-center gap-1">
//               {/* Add stars here */}
//             </div>
//             <span className="text-lg font-semibold text-gray-900">4.5</span>
//             <span className="text-sm text-gray-500">(120 reviews)</span>
//           </div>

//           <p className="mb-4 text-center text-xs font-normal text-[#5C5C5C] lg:text-left">
//             Product description goes here...
//           </p>

//           <div className="mb-4 text-center lg:text-left">
//             <span className="text-xl font-bold text-[#009393]">$99.99</span>
//           </div>

//           <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
//             <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#009393] px-4 py-2 text-[#009393] hover:bg-[#009393] hover:text-white">
//               <Eye className="h-4 w-4" />
//             </button>
//             <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#009393] px-4 py-2 text-[#009393] hover:bg-[#009393] hover:text-white">
//               <Heart className="h-4 w-4" />
//             </button>
//             <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#009393] px-4 py-2 text-[#009393] hover:bg-[#009393] hover:text-white">
//               <ShoppingCart className="h-4 w-4" />
//               Add to Cart
//             </button>
//             <button className="rounded-lg bg-[#009393] px-6 py-2 font-medium text-white hover:bg-[#007a7a]">
//               Buy now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const HeadphonesAd = () => {
//   return (
//     <div className="relative mb-6 h-40 w-full rounded-2xl bg-gradient-to-br from-[#A1D2FF] to-[#00E0C6]/90 p-4 shadow-lg lg:mb-[4.3125rem] lg:h-56 lg:pb-8 lg:pl-5 lg:pt-3">
//       <div className="z-10 flex h-full flex-col justify-between">
//         <h2 className="pr-4 text-lg font-semibold text-[#016170] lg:mr-6 lg:text-2xl">
//           Summer headphones from top brands
//         </h2>
//         <button className="flex items-center text-sm font-medium text-[#016170] hover:underline lg:text-base">
//           Buy it now
//           <span className="ml-2">
//             <FontAwesomeIcon icon={faArrowRight} />
//           </span>
//         </button>

//         <img
//           src="images/red-headphones.png"
//           alt="Red Headphones"
//           className="absolute bottom-3 right-12 h-16 w-auto lg:right-16 lg:h-auto"
//         />
//         <img
//           src="images/green-headphones.png"
//           alt="Green Headphones"
//           className="absolute -right-2 bottom-0 h-16 w-auto lg:-right-4 lg:h-auto"
//         />
//       </div>
//     </div>
//   );
// };

// function DailyDeals({ isMainProductLoaded }) {
//   // Simplified version - add your full DailyDeals logic here
//   return (
//     <div className="w-full lg:ml-auto lg:max-w-md">
//       <div className="mb-6">
//         <div className="mb-2 flex items-center gap-3">
//           <div className="rounded-lg bg-gradient-to-br from-[#009393] to-[#016170] p-2 shadow-lg">
//             <TrendingUp className="h-5 w-5 text-white" />
//           </div>
//           <h3 className="bg-gradient-to-r from-[#016170] to-[#009393] bg-clip-text text-xl font-bold text-transparent lg:text-2xl">
//             Daily Deals
//           </h3>
//         </div>

//         <div className="flex items-center gap-2 text-sm text-gray-600">
//           <Clock className="h-4 w-4" />
//           <span>Limited time offers • Updated daily</span>
//           <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
//         </div>
//       </div>

//       {/* Sample deal items */}
//       <div className="space-y-4">
//         {[1, 2, 3].map((item) => (
//           <div
//             key={item}
//             className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
//           >
//             <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-200"></div>
//             <div className="min-w-0 flex-1">
//               <h4 className="truncate font-semibold text-gray-800">
//                 Sample Product {item}
//               </h4>
//               <p className="text-sm text-gray-500">Great deal!</p>
//             </div>
//             <div className="text-right">
//               <div className="text-lg font-bold text-[#009393]">$49.99</div>
//               <div className="text-xs text-gray-400 line-through">$79.99</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function BottomNav() {
//   return (
//     <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-2">
//       <div className="flex items-center justify-around">
//         <button className="flex flex-col items-center gap-1 p-2">
//           <div className="h-6 w-6 rounded bg-gray-300"></div>
//           <span className="text-xs text-gray-600">Home</span>
//         </button>
//         <button className="flex flex-col items-center gap-1 p-2">
//           <div className="h-6 w-6 rounded bg-gray-300"></div>
//           <span className="text-xs text-gray-600">Categories</span>
//         </button>
//         <button className="flex flex-col items-center gap-1 p-2">
//           <div className="h-6 w-6 rounded bg-gray-300"></div>
//           <span className="text-xs text-gray-600">Cart</span>
//         </button>
//         <button className="flex flex-col items-center gap-1 p-2">
//           <div className="h-6 w-6 rounded bg-gray-300"></div>
//           <span className="text-xs text-gray-600">Profile</span>
//         </button>
//       </div>
//     </nav>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCartShopping,
//   faChevronRight,
//   faChevronLeft,
//   faArrowRight,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   Eye,
//   Heart,
//   ShoppingCart,
//   Package,
//   Star,
//   TrendingUp,
//   Clock,
//   ArrowRight,
// } from "lucide-react";

// export default function Layout() {
//   const [isMainProductLoaded, setIsMainProductLoaded] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Check if we're on the base route
//   const isOnBaseRoute = location.pathname === "/";

//   return (
//     <div className="relative mx-auto min-h-screen bg-[#FAFAFA] font-bold">
//       {/* Desktop Layout */}
//       <div className="hidden lg:mx-auto lg:grid lg:grid-cols-[auto_1fr_20rem] lg:grid-rows-[auto_1fr] lg:gap-y-6 lg:overflow-hidden lg:pr-4 xl:max-w-screen-2xl xl:grid-cols-[auto_1fr_22.875rem] xl:pr-6">
//         <Header />
//         <Sidebar />

//         <Outlet context={{ isMainProductLoaded, setIsMainProductLoaded }} />

//         {isOnBaseRoute && (
//           <div className="col-span-1 row-span-1">
//             <HeadphonesAd />
//             <DailyDeals isMainProductLoaded={isMainProductLoaded} />
//           </div>
//         )}
//       </div>

//       {/* Mobile Layout */}
//       <div className="lg:hidden">
//         <MobileHeader />
//         <div className="px-4 pb-20">
//           <Outlet context={{ isMainProductLoaded, setIsMainProductLoaded }} />

//           {isOnBaseRoute && (
//             <div className="mt-6 space-y-6">
//               <HeadphonesAd />
//               <DailyDeals isMainProductLoaded={isMainProductLoaded} />
//             </div>
//           )}
//         </div>
//         <BottomNav />
//       </div>
//     </div>
//   );
// }

// function Header() {
//   return (
//     <header className="col-span-2 mr-4 hidden justify-between lg:flex xl:mr-6">
//       <HeaderTitle />
//       <div className="mt-6 flex items-center gap-6 xl:gap-12">
//         <SearchBar />
//         <HeaderIconsGroup />
//       </div>
//     </header>
//   );
// }

// function HeaderTitle() {
//   return (
//     <div>
//       <h2 className="mt-5 text-xl font-semibold text-black lg:text-2xl">
//         Top Products
//       </h2>
//       <p className="text-base font-medium lg:text-lg">From top brands</p>
//     </div>
//   );
// }

// function MobileHeader() {
//   return (
//     <header className="sticky top-0 z-50 bg-white px-4 py-3 shadow-sm">
//       <div className="flex items-center justify-between">
//         <Logo />
//         <div className="flex items-center gap-3">
//           <MobileSearchButton />
//           <HeaderIconsGroup />
//         </div>
//       </div>
//       <div className="mt-3">
//         <MobileSearchBar />
//       </div>
//     </header>
//   );
// }

// function MobileSearchButton() {
//   return (
//     <button className="rounded-lg bg-gray-100 p-2">
//       <img src="/images/fi-br-search.png" alt="Search" className="h-5 w-5" />
//     </button>
//   );
// }

// function MobileSearchBar() {
//   // Simplified mobile search - you can expand this with the full SearchBar logic
//   return (
//     <div className="relative">
//       <img
//         src="/images/fi-br-search.png"
//         alt="Search Icon"
//         className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
//       />
//       <input
//         className="w-full rounded-lg bg-gray-100 py-2.5 pl-10 pr-4 text-sm font-medium text-[#5C5C5C] outline-none focus:ring-2 focus:ring-[#00E0C6]"
//         type="text"
//         placeholder="Search products..."
//       />
//     </div>
//   );
// }

// const SearchBar = () => {
//   // Your existing SearchBar component logic here
//   // I'm keeping the original structure but making the width responsive

//   return (
//     <div className="relative">
//       <form className="relative" onSubmit={(e) => e.preventDefault()}>
//         <img
//           src="/images/fi-br-search.png"
//           alt="Search Icon"
//           className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer"
//         />

//         <input
//           className="w-full max-w-[20rem] rounded-xl bg-white py-2.5 pl-16 pr-12 font-medium text-[#5C5C5C] outline-none transition-shadow duration-200 focus:ring-2 focus:ring-[#00E0C6] xl:max-w-[25.625rem]"
//           type="text"
//           placeholder="Search products..."
//           aria-label="Search products"
//           autoComplete="off"
//         />

//         <img
//           src="/images/fi-br-settings-sliders.png"
//           alt="Settings Icon"
//           className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
//         />
//       </form>
//     </div>
//   );
// };

// function HeaderIconsGroup() {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   // Simplified for demo - add your cart logic here
//   const cartItemCount = 0;

//   return (
//     <div className="flex items-center gap-2 lg:gap-3 xl:gap-5">
//       {/* Cart Icon with Badge */}
//       <div className="relative rounded-xl bg-[#E8FCFF]">
//         <button
//           onClick={() => setIsCartOpen(!isCartOpen)}
//           className="relative cursor-pointer rounded p-2 focus:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
//         >
//           <FontAwesomeIcon
//             color="#016170"
//             size="sm"
//             icon={faCartShopping}
//             className="lg:text-lg xl:text-2xl"
//           />

//           {cartItemCount > 0 && (
//             <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-xs text-white">
//               {cartItemCount}
//             </span>
//           )}
//         </button>
//       </div>

//       <button className="cursor-pointer rounded-xl bg-[#E8FCFF] p-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
//         <img
//           src="/images/notification.png"
//           alt="notification Icon"
//           className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6"
//         />
//       </button>

//       <img
//         src="/images/retry.png"
//         alt="User profile"
//         className="h-6 w-6 cursor-pointer rounded-xl lg:h-8 lg:w-8 xl:h-10 xl:w-10"
//       />
//     </div>
//   );
// }

// function Sidebar() {
//   return (
//     <aside className="col-span-1 row-span-full mr-6 hidden bg-white pb-7 font-medium lg:block xl:mr-12">
//       <Logo />
//       <MenuItemsContainer />
//       <CustomerServiceCard />
//     </aside>
//   );
// }

// function Logo() {
//   return (
//     <div className="ml-4 mt-4 flex items-center gap-3 xl:ml-[1.75rem] xl:gap-4">
//       <FontAwesomeIcon
//         className="rounded-md bg-[#E8FCFF] p-2.5 xl:p-3.5"
//         color="#016170"
//         size="lg"
//         icon={faCartShopping}
//       />
//       <h1 className="font-publicSans text-xl font-bold text-[#016170] xl:text-2xl">
//         ShopNest.
//       </h1>
//     </div>
//   );
// }

// function MenuItemsContainer() {
//   // Simplified - add your MENU_ITEMS logic here
//   return (
//     <div className="mb-8 ml-6 mt-10 flex flex-col gap-6 xl:mb-12 xl:ml-9 xl:mt-14 xl:gap-8">
//       {/* Add your menu items here */}
//     </div>
//   );
// }

// function CustomerServiceCard() {
//   return (
//     <div className="mx-4 flex h-[200px] w-[180px] flex-col items-center justify-between rounded-2xl bg-[#A1D2FF] bg-[url('/images/Mask_group.png')] bg-cover bg-center pb-4 pt-3 xl:mx-7 xl:h-[250px] xl:w-[239px] xl:pb-[1.625rem] xl:pt-4">
//       <img
//         className="rounded-full border-2 border-white bg-[#00E0C6] p-1.5 xl:border-[0.375rem] xl:p-2"
//         src="/images/plus_icon.png"
//         alt="Icon Plus"
//       />
//       <button className="rounded-xl bg-[#D9F4FF] px-3 py-2 text-xs font-semibold text-[#016170] xl:px-4 xl:py-2.5">
//         Customer Service
//       </button>
//     </div>
//   );
// }

// function MainProduct({ onLoad }) {
//   // Simplified version - add your full MainProduct logic here
//   return (
//     <div className="mx-auto mb-8 mt-4 max-w-full bg-white p-4 lg:mt-20 lg:max-w-[45.5rem] lg:p-6">
//       <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-12">
//         {/* Product Image */}
//         <div className="w-full flex-shrink-0 lg:w-auto">
//           <img
//             src="/images/placeholder-product.jpg"
//             alt="Product"
//             className="mx-auto w-full max-w-44 lg:mx-0"
//           />
//         </div>

//         {/* Product Details */}
//         <div className="w-full lg:flex-1">
//           <h3 className="mb-2 text-center text-lg font-medium text-black lg:text-left lg:text-xl">
//             Sample Product Title
//           </h3>

//           <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
//             <div className="flex items-center gap-1">
//               {/* Add stars here */}
//             </div>
//             <span className="text-lg font-semibold text-gray-900">4.5</span>
//             <span className="text-sm text-gray-500">(120 reviews)</span>
//           </div>

//           <p className="mb-4 text-center text-xs font-normal text-[#5C5C5C] lg:text-left">
//             Product description goes here...
//           </p>

//           <div className="mb-4 text-center lg:text-left">
//             <span className="text-xl font-bold text-[#009393]">$99.99</span>
//           </div>

//           <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
//             <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#009393] px-4 py-2 text-[#009393] hover:bg-[#009393] hover:text-white">
//               <Eye className="h-4 w-4" />
//             </button>
//             <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#009393] px-4 py-2 text-[#009393] hover:bg-[#009393] hover:text-white">
//               <Heart className="h-4 w-4" />
//             </button>
//             <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#009393] px-4 py-2 text-[#009393] hover:bg-[#009393] hover:text-white">
//               <ShoppingCart className="h-4 w-4" />
//               Add to Cart
//             </button>
//             <button className="rounded-lg bg-[#009393] px-6 py-2 font-medium text-white hover:bg-[#007a7a]">
//               Buy now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const HeadphonesAd = () => {
//   return (
//     <div className="relative mb-6 h-40 w-full rounded-2xl bg-gradient-to-br from-[#A1D2FF] to-[#00E0C6]/90 p-4 shadow-lg lg:h-48 lg:pb-6 lg:pl-4 lg:pt-3 xl:mb-[4.3125rem] xl:h-56 xl:pb-8 xl:pl-5">
//       <div className="z-10 flex h-full flex-col justify-between">
//         <h2 className="pr-4 text-lg font-semibold text-[#016170] lg:text-xl xl:mr-6 xl:text-2xl">
//           Summer headphones from top brands
//         </h2>
//         <button className="flex items-center text-sm font-medium text-[#016170] hover:underline lg:text-base">
//           Buy it now
//           <span className="ml-2">
//             <FontAwesomeIcon icon={faArrowRight} />
//           </span>
//         </button>

//         <img
//           src="images/red-headphones.png"
//           alt="Red Headphones"
//           className="absolute bottom-3 right-10 h-12 w-auto lg:right-12 lg:h-14 xl:right-16 xl:h-auto"
//         />
//         <img
//           src="images/green-headphones.png"
//           alt="Green Headphones"
//           className="absolute -right-1 bottom-0 h-12 w-auto lg:-right-2 lg:h-14 xl:-right-4 xl:h-auto"
//         />
//       </div>
//     </div>
//   );
// };

// function DailyDeals({ isMainProductLoaded }) {
//   // Simplified version - add your full DailyDeals logic here
//   return (
//     <div className="w-full lg:ml-auto lg:max-w-sm xl:max-w-md">
//       <div className="mb-6">
//         <div className="mb-2 flex items-center gap-3">
//           <div className="rounded-lg bg-gradient-to-br from-[#009393] to-[#016170] p-2 shadow-lg">
//             <TrendingUp className="h-5 w-5 text-white" />
//           </div>
//           <h3 className="bg-gradient-to-r from-[#016170] to-[#009393] bg-clip-text text-xl font-bold text-transparent xl:text-2xl">
//             Daily Deals
//           </h3>
//         </div>

//         <div className="flex items-center gap-2 text-sm text-gray-600">
//           <Clock className="h-4 w-4" />
//           <span>Limited time offers • Updated daily</span>
//           <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
//         </div>
//       </div>

//       {/* Sample deal items */}
//       <div className="space-y-4">
//         {[1, 2, 3].map((item) => (
//           <div
//             key={item}
//             className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md xl:gap-4 xl:p-4"
//           >
//             <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 xl:h-12 xl:w-12"></div>
//             <div className="min-w-0 flex-1">
//               <h4 className="truncate text-sm font-semibold text-gray-800 xl:text-base">
//                 Sample Product {item}
//               </h4>
//               <p className="text-xs text-gray-500 xl:text-sm">Great deal!</p>
//             </div>
//             <div className="text-right">
//               <div className="text-base font-bold text-[#009393] xl:text-lg">
//                 $49.99
//               </div>
//               <div className="text-xs text-gray-400 line-through xl:text-sm">
//                 $79.99
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function BottomNav() {
//   return (
//     <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-2">
//       <div className="flex items-center justify-around">
//         <button className="flex flex-col items-center gap-1 p-2">
//           <div className="h-6 w-6 rounded bg-gray-300"></div>
//           <span className="text-xs text-gray-600">Home</span>
//         </button>
//         <button className="flex flex-col items-center gap-1 p-2">
//           <div className="h-6 w-6 rounded bg-gray-300"></div>
//           <span className="text-xs text-gray-600">Categories</span>
//         </button>
//         <button className="flex flex-col items-center gap-1 p-2">
//           <div className="h-6 w-6 rounded bg-gray-300"></div>
//           <span className="text-xs text-gray-600">Cart</span>
//         </button>
//         <button className="flex flex-col items-center gap-1 p-2">
//           <div className="h-6 w-6 rounded bg-gray-300"></div>
//           <span className="text-xs text-gray-600">Profile</span>
//         </button>
//       </div>
//     </nav>
//   );
// }
