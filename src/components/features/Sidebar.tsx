import CustomerServiceCard from "../ui/CustomerServiceCard";
import Logo from "../ui/Logo";
import MenuItemsContainer from "../ui/MenuItemsContainer";

function Sidebar() {
  return (
    <aside className="col-span-1 row-span-full mr-12 bg-white pb-7 font-medium">
      <Logo />
      <MenuItemsContainer />
      <CustomerServiceCard />
    </aside>
  );
}

export default Sidebar;
