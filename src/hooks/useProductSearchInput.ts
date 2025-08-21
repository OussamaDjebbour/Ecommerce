import { useCallback, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import  useRouterSearchParams from "./useRouterSearchParams";

export const useProductSearchInput = () => {
  const { searchQuery, setSearchQuery, clearSearchQuery } =
    useRouterSearchParams();

  const [inputValue, setInputValue] = useState(searchQuery);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setSearchQuery(query);
      }, 400),
    [setSearchQuery],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setInputValue(query);
      setSelectedIndex(-1);
      setShowDropdown(query.length > 0);

      if (query.trim()) {
        debouncedSearch(query);
      } else {
        debouncedSearch.cancel();
        clearSearchQuery();
      }
    },
    [debouncedSearch, clearSearchQuery],
  );

  const handleClearSearch = useCallback(() => {
    setInputValue("");
    debouncedSearch.cancel();
    clearSearchQuery();
    setShowDropdown(false);
    setSelectedIndex(-1);
  }, [debouncedSearch, clearSearchQuery]);

  return {
    inputValue,
    setInputValue,
    handleInputChange,
    handleClearSearch,
    showDropdown,
    setShowDropdown,
    selectedIndex,
    setSelectedIndex,
    debouncedSearch,
    searchQuery,
    setSearchQuery,
  };
};
