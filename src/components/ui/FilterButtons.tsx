import { Fragment, useMemo, useState, memo, useCallback } from "react";
import { Listbox, Transition, Dialog } from "@headlessui/react";
import {
  ChevronDown,
  FilterX,
  SlidersHorizontal,
  X,
  Filter,
} from "lucide-react";
import { useSearchProducts } from "../../hooks/useSearchProducts";
import { getUniqueCategories } from "../../helpers/getUniqueCategories";
import MinPriceInput from "./MinPriceInput";
import MaxPriceInput from "./MaxPriceInput";
import useRouterSearchParams from "../../hooks/useRouterSearchParams";
import { SortOptions } from "../../constants";

const FilterButtons = memo(() => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const {
    selectedCategory,
    setSelectedCategory,
    sort,
    setSort,
    clearAllFilters,
  } = useRouterSearchParams();

  const { products } = useSearchProducts();
  const categories = useMemo(() => getUniqueCategories(products), [products]);

  const handleMobileFiltersToggle = useCallback(() => {
    setIsMobileFiltersOpen((prev) => !prev);
  }, []);

  const handleMobileFiltersClose = useCallback(() => {
    setIsMobileFiltersOpen(false);
  }, []);

  const FiltersContent = memo(() => (
    <div className="flex flex-col gap-6 min-[860px]:flex-row min-[860px]:items-end min-[860px]:gap-4">
      {/* Category Filter */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
          <div className="relative">
            <Listbox.Button className="group flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-left shadow-sm transition-all duration-200 hover:border-[#009393] focus:border-[#009393] focus:outline-none focus:ring-2 focus:ring-[#009393]/20 sm:w-52">
              <span className="block truncate text-sm">
                {selectedCategory || "All Categories"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200 group-hover:text-[#009393]" />
            </Listbox.Button>

            <Transition
              as={Fragment}
              enter="transition duration-200 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-150 ease-in"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                <Listbox.Option
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-[#009393] text-white"
                        : "text-gray-900 hover:bg-gray-50"
                    }`
                  }
                  value=""
                >
                  All Categories
                </Listbox.Option>
                {categories.map((category) => (
                  <Listbox.Option
                    key={category}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                        active
                          ? "bg-[#009393] text-white"
                          : "text-gray-900 hover:bg-gray-50"
                      }`
                    }
                    value={category}
                  >
                    {category}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      {/* Sort Filter */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Sort by</label>
        <Listbox value={sort} onChange={setSort}>
          <div className="relative">
            <Listbox.Button className="group flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-left shadow-sm transition-all duration-200 hover:border-[#009393] focus:border-[#009393] focus:outline-none focus:ring-2 focus:ring-[#009393]/20 sm:w-48">
              <span className="block truncate text-sm">
                {SortOptions.find((option) => option.value === sort)?.name ||
                  "Most Relevant"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200 group-hover:text-[#009393]" />
            </Listbox.Button>

            <Transition
              as={Fragment}
              enter="transition duration-200 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-150 ease-in"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {SortOptions.map((sortOption) => (
                  <Listbox.Option
                    key={sortOption.value}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                        active
                          ? "bg-[#009393] text-white"
                          : "text-gray-900 hover:bg-gray-50"
                      }`
                    }
                    value={sortOption.value}
                  >
                    {sortOption.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Price Range</label>
        <div className="flex gap-2">
          <MinPriceInput />
          <MaxPriceInput />
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearAllFilters}
        className="group flex max-w-28 items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
        title="Clear all filters"
      >
        <FilterX className="h-4 w-4 transition-transform group-hover:scale-110" />
        <span>Clear</span>
      </button>
    </div>
  ));

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden min-[860px]:block">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <Filter className="h-5 w-5 text-[#009393]" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <FiltersContent />
        </div>
      </div>

      {/* Mobile Filters Button */}
      <div className="pl-8 min-[860px]:hidden">
        <button
          onClick={handleMobileFiltersToggle}
          className="mr-auto flex items-center justify-center gap-2 rounded-lg bg-[#009393] px-5 py-3 text-white shadow-sm transition-all duration-200 hover:bg-[#007a7a] active:scale-95"
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span className="font-medium">Filters & Sort</span>
        </button>
      </div>

      {/* Mobile Filters Modal */}
      <Dialog
        as="div"
        className="relative z-50 min-[860px]:hidden"
        open={isMobileFiltersOpen}
        onClose={handleMobileFiltersClose}
      >
        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />

        <div className="fixed inset-0 z-50 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5 text-[#009393]" />
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Filters & Sort
                </Dialog.Title>
              </div>
              <button
                onClick={handleMobileFiltersClose}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 py-6">
              <FiltersContent />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
});

FilterButtons.displayName = "FilterButtons";

export default FilterButtons;
