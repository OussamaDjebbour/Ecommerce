import Logo from "../ui/Logo";
import MenuItemsContainer from "../ui/MenuItemsContainer";
import CustomerServiceCard from "../ui/CustomerServiceCard";

function Sidebar() {
  return (
    <aside className="col-span-1 row-span-full hidden bg-white pb-7 font-medium xl:block">
      <Logo />
      <MenuItemsContainer />
      <CustomerServiceCard />
    </aside>
  );
}

export default Sidebar;
