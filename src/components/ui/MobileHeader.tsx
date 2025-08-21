import { useState } from "react";
import { ShoppingCart, Menu, X, Search, Bell, Phone } from "lucide-react";
import { MENU_ITEMS } from "../../constants";
import MenuItem from "./MenuItem";
import MobileSearchInput from "./MobileSearchInput";
import CartButton from "./CartButton";
import { useLocation, useNavigate } from "react-router-dom";

function MobileHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
