import { MENU_ITEMS } from "../../constants";
import MenuItem from "./MenuItem";

function MenuItemsContainer() {
  return (
    <div className="mb-12 ml-9 mt-14 flex flex-col gap-8">
      {MENU_ITEMS.map((item) => (
        <MenuItem key={item.label} item={item} />
      ))}
    </div>
  );
}

export default MenuItemsContainer;
