import { NavLink, useNavigate } from "react-router-dom";
import useSearchParams from "../../hooks/useRouterSearchParams";
import { MenuItemType } from "../../types";

interface MenuItemProps {
  item: MenuItemType;
  handleCloseMenu?: () => void;
}

const MenuItem = ({ item, handleCloseMenu }: MenuItemProps) => {
  const navigate = useNavigate();
  const { setSearchQuery } = useSearchParams();

  function handleClick(item: MenuItemType) {
    // function handleClick(e: React.MouseEvent<HTMLSpanElement>, item) {
    if (item.label === "Home" && window.location.pathname !== "/") {
      setSearchQuery("");
      navigate("/");
    }
    if (item.label === "Cart" && !window.location.pathname.includes("cart")) {
      console.log("cart");
      navigate("/cart");
    }
    if (handleCloseMenu) handleCloseMenu();
  }

  return (
    <a
      key={item.label}
      // className="flex items-center gap-4 rounded-lg text-lg hover:bg-gray-50 2xl:gap-5"
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
// const MenuItem = ({ item }: MenuItemProps) => {
//   const navigate = useNavigate();
//   const { setSearchQuery } = useSearchParams();

//   function handleClick(e: React.MouseEvent<HTMLSpanElement>) {
//     if (
//       e.target === e.currentTarget &&
//       e.currentTarget.textContent === "Home" &&
//       window.location.pathname !== "/"
//     ) {
//       setSearchQuery("");
//       navigate("/");
//     }
//   }

//   return (
//     <button
//       key={item.label}
//       // className="flex items-center gap-2 rounded-lg text-base hover:bg-gray-50 xl:gap-6 xl:text-lg"
//       className="flex items-center gap-4 rounded-lg text-lg hover:bg-gray-50 2xl:gap-5"
//     >
//       <span>{item.icon}</span>
//       <span
//         className="text-base font-medium text-[#5C5C5C] xl:text-lg"
//         onClick={(e) => {
//           handleClick(e);
//         }}
//       >
//         {item.label}
//       </span>
//     </button>
//   );
// };

export default MenuItem;
