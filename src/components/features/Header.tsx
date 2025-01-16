import HeaderIconsGroup from "../ui/HeaderIconsGroup";
import HeaderTitle from "../ui/HeaderTitle";
import SearchBar from "../ui/SearchBar";

function Header() {
  return (
    <header className="col-span-2 mr-6 flex justify-between">
      <HeaderTitle />
      <div className="mt-6 flex items-center gap-12">
        <SearchBar />
        <HeaderIconsGroup />
      </div>
    </header>
  );
}

export default Header;
