import { useState } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  Bell,
  Home,
  Grid3X3,
  Settings,
  HelpCircle,
  Phone,
} from "lucide-react";
import { MENU_ITEMS } from "../constants";
import MenuItem from "./ui/MenuItem";
import MobileSearchInput from "./ui/MobileSearchInput";
import CartButton from "./ui/CartButton";
import { useLocation, useNavigate } from "react-router-dom";

// export function MobileHeader() {
//   return (
//     <header className="fixed top-0 left-0 right-0 bg-white z-50 px-4 py-3 border-b">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <img src="/images/logo.png" alt="Soundix" className="h-8" />
//           <h1 className="text-xl font-bold">Soundix.</h1>
//         </div>

//         <div className="flex items-center gap-4">
//           <button className="p-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </button>
//           <button className="p-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//             </svg>
//           </button>
//           <button className="w-8 h-8 rounded-full bg-gray-200">
//             <img src="/avatar.jpg" alt="Profile" className="w-full h-full rounded-full object-cover" />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

function MobileHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartItemCount = 8; // Replace with your cart logic

  const handleGoToHomePage = () => {
    if (location.pathname !== "/") navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div
            onClick={handleGoToHomePage}
            className="flex cursor-pointer items-center gap-3 sm:gap-6"
          >
            <div className="rounded-md bg-[#E8FCFF] p-2">
              <ShoppingCart className="h-5 w-5 text-[#016170] sm:h-6 sm:w-6" />
            </div>
            <h1 className="text-lg font-bold text-[#016170] sm:text-xl">
              ShopNest.
            </h1>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-lg bg-[#E8FCFF] p-2 text-[#016170] transition-colors hover:bg-[#D1F5F9]"
            >
              <Search className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Cart */}
            <CartButton />
            {/* <div className="relative">
              <button className="rounded-lg bg-[#E8FCFF] p-2 text-[#016170] transition-colors hover:bg-[#D1F5F9]">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div> */}

            {/* Notifications */}
            <button className="rounded-lg bg-[#E8FCFF] p-2 text-[#016170] transition-colors hover:bg-[#D1F5F9]">
              <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg bg-[#009393] p-2 text-white transition-colors hover:bg-[#007a7a]"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar (Expandable) */}
        {isSearchOpen && (
          <div className="border-t bg-gray-50 px-4 py-3">
            <div
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0"
            ></div>
            <MobileSearchInput />
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-lg bg-white py-2.5 pl-10 pr-4 text-sm outline-none ring-2 ring-transparent focus:ring-[#00E0C6]"
                autoFocus
              />
            </div> */}
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#009393] to-[#016170]"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Welcome</h3>
                  <p className="text-sm text-gray-500">Explore our features</p>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="p-4">
              <div className="space-y-2">
                {MENU_ITEMS.map((item) => (
                  <MenuItem
                    key={item.label}
                    item={item}
                    handleCloseMenu={() => setIsMenuOpen(false)}
                  />
                ))}
                {/* {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-[#E8FCFF] hover:text-[#016170]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-gray-500">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </a>
                ))} */}
              </div>

              {/* Customer Service Card in Menu */}
              <div className="mt-8 rounded-xl bg-gradient-to-br from-[#A1D2FF] to-[#00E0C6]/90 p-4 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="rounded-full bg-white/20 p-3">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h4 className="mb-2 font-semibold text-[#016170]">
                  Need Help?
                </h4>
                <p className="mb-3 text-sm text-[#016170]/80">
                  Get 24/7 customer support
                </p>
                <button className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-[#016170] transition-colors hover:bg-white">
                  Contact Support
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileHeader;
