import { useNavigate } from "react-router-dom";
import { MenuItemType } from "../../types";
import useRouterSearchParams from "../../hooks/useRouterSearchParams";

interface MenuItemProps {
  item: MenuItemType;
  handleCloseMenu?: () => void;
}

const MenuItem = ({ item, handleCloseMenu }: MenuItemProps) => {
  const navigate = useNavigate();
  const { setSearchQuery } = useRouterSearchParams();

  function handleClick(item: MenuItemType) {
    if (item.label === "Home" && window.location.pathname !== "/") {
      setSearchQuery("");
      navigate("/");
    }
    if (item.label === "Cart" && !window.location.pathname.includes("cart")) {
      navigate("/cart");
    }
    if (
      item.label === "Saved" &&
      !window.location.pathname.includes("wishlist")
    ) {
      navigate("/wishlist");
    }
    if (handleCloseMenu) handleCloseMenu();
  }

  return (
    <a
      key={item.label}
      className="flex cursor-pointer items-center gap-4 rounded-2xl px-4 py-3 text-lg text-gray-700 transition-colors hover:bg-[#E8FCFF] hover:text-[#016170]"
      onClick={() => {
        handleClick(item);
      }}
    >
      <span>{item.icon}</span>
      <span className="text-lg font-medium text-[#5C5C5C]">{item.label}</span>
    </a>
  );
};

export default MenuItem;
