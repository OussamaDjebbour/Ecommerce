import { MENU_ITEMS } from "../../constants";
import MenuItem from "./MenuItem";

function MenuItemsContainer() {
  return (
    <nav className="flex flex-col gap-2 px-4 pb-10 pt-10 xl:pt-12 2xl:px-5">
      {MENU_ITEMS.map((item) => (
        <MenuItem key={item.label} item={item} />
      ))}
    </nav>
  );
}

export default MenuItemsContainer;
