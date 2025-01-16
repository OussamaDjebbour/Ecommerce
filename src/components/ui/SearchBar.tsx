function SearchBar() {
  return (
    <form className="relative">
      <img
        src="/images/fi-br-search.png"
        alt="Search Icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer"
      />

      <input
        className="w-[25.625rem] rounded-xl bg-white py-2.5 pl-16 font-medium text-[#5C5C5C] outline-none focus:ring-1 focus:ring-[#00E0C6]"
        type="text"
        placeholder="Search Product"
      />

      <img
        src="/images/fi-br-settings-sliders.png"
        alt="settings Icon"
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
      />
    </form>
  );
}

export default SearchBar;
