import { MENU_ITEMS } from "../../constants";
import MenuItem from "./MenuItem";

function MenuItemsContainer() {
  return (
    // <nav className="flex flex-col gap-6 pb-8 pl-6 pt-10 xl:gap-7 xl:pb-12 xl:pl-9 xl:pt-14">
    <nav className="flex flex-col gap-2 px-4 pb-10 pt-10 xl:pt-12 2xl:px-5">
      {MENU_ITEMS.map((item) => (
        <MenuItem key={item.label} item={item} />
      ))}
    </nav>
  );
}

export default MenuItemsContainer;
