// import { useSearchProducts } from "../../hooks/useSearchProducts";
// import { useSearchStore } from "../../context/useSearchStore";

// function FilterButtons() {
//   const { selectedCategory, setSelectedCategory, priceRange, setPriceRange } =
//     useSearchStore();

//   const { products } = useSearchProducts();

//   // Get unique categories from products
//   const categories = [...new Set(products.map((p) => p.category))];

//   return (
//     <div className="mx-auto w-full max-w-4xl">
//       {/* Price Range Filter */}
//       <div className="mb-4 flex items-center gap-4">
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6]"
//         >
//           <option className="hover:bg-[#00E0C6]" value="">
//             All Categories
//           </option>
//           {categories.map((category) => (
//             <option
//               className="hover:bg-[#00E0C6]"
//               key={category}
//               value={category}
//             >
//               {category}
//             </option>
//           ))}
//         </select>

//         <label className="flex items-center gap-2">
//           Min Price:
//           <input
//             type="number"
//             value={priceRange.min}
//             onChange={(e) =>
//               setPriceRange({ ...priceRange, min: Number(e.target.value) })
//             }
//             className="w-24 rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6]"
//           />
//         </label>
//         <label className="flex items-center gap-2">
//           Max Price:
//           <input
//             type="number"
//             value={priceRange.max}
//             onChange={(e) =>
//               setPriceRange({ ...priceRange, max: Number(e.target.value) })
//             }
//             className="w-24 rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6]"
//           />
//         </label>
//       </div>
//     </div>
//   );
// }

// export default FilterButtons;

// import { useMemo } from "react";
// import { useSearchProducts } from "../../hooks/useSearchProducts";
// import { useSearchStore } from "../../context/useSearchStore";
// import { Dropdown } from "./Dropdown";

// function FilterButtons() {
//   const { selectedCategory, setSelectedCategory, priceRange, setPriceRange } =
//     useSearchStore();
//   const { products } = useSearchProducts();

//   // Memoize categories to prevent unnecessary recalculations
//   const categories = useMemo(
//     () => [...new Set(products.map((p) => p.category))],
//     [products],
//   );

//   // Memoize price range handlers
//   const handleMinPriceChange = useMemo(
//     () => (e: React.ChangeEvent<HTMLInputElement>) =>
//       setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) })),
//     [setPriceRange],
//   );

//   const handleMaxPriceChange = useMemo(
//     () => (e: React.ChangeEvent<HTMLInputElement>) =>
//       setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) })),
//     [setPriceRange],
//   );

//   return (
//     <div className="mx-auto w-full max-w-4xl">
//       <div className="mb-4 flex items-center gap-4">
//         <Dropdown
//           value={selectedCategory}
//           onChange={setSelectedCategory}
//           options={categories}
//           placeholder="All Categories"
//         />

//         <label className="flex items-center gap-2">
//           <span className="text-gray-700">Min Price:</span>
//           <input
//             type="number"
//             value={priceRange.min}
//             onChange={handleMinPriceChange}
//             className="w-24 rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6]"
//             aria-label="Minimum price"
//           />
//         </label>

//         <label className="flex items-center gap-2">
//           <span className="text-gray-700">Max Price:</span>
//           <input
//             type="number"
//             value={priceRange.max}
//             onChange={handleMaxPriceChange}
//             className="w-24 rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6]"
//             aria-label="Maximum price"
//           />
//         </label>
//       </div>
//     </div>
//   );
// }

// export default FilterButtons;

// import { Fragment } from "react";
// import { Listbox, Transition } from "@headlessui/react";
// import { useSearchProducts } from "../../hooks/useSearchProducts";
// import { useSearchStore } from "../../context/useSearchStore";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
// // import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

// function FilterButtons() {
//   const { selectedCategory, setSelectedCategory, priceRange, setPriceRange } =
//     useSearchStore();

//   const { products } = useSearchProducts();

//   // Get unique categories from products
//   const categories = [...new Set(products.map((p) => p.category))];

//   return (
//     <div className="mx-auto flex w-full max-w-4xl items-center gap-4">
//       {/* Category Filter with Headless UI */}
//       <Listbox value={selectedCategory} onChange={setSelectedCategory}>
//         <div className="relative">
//           <Listbox.Button className="flex w-full items-center justify-between rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6]">
//             <span>{selectedCategory || "All Categories"}</span>
//             {/* <ChevronUpDownIcon className="h-5 w-5 text-gray-500" /> */}
//             <div>
//               {" "}
//               <FontAwesomeIcon icon={faChevronUp} />
//               <FontAwesomeIcon icon={faChevronDown} />
//             </div>
//           </Listbox.Button>

//           <Transition
//             as={Fragment}
//             enter="transition duration-100 ease-out"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="transition duration-75 ease-in"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >
//             <Listbox.Options className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
//               <Listbox.Option
//                 className={({ active }) =>
//                   `cursor-pointer p-2 ${
//                     active ? "bg-[#00E0C6] text-white" : "text-gray-900"
//                   }`
//                 }
//                 value=""
//               >
//                 All Categories
//               </Listbox.Option>
//               {categories.map((category) => (
//                 <Listbox.Option
//                   key={category}
//                   className={({ active }) =>
//                     `cursor-pointer p-2 ${
//                       active ? "bg-[#00E0C6] text-white" : "text-gray-900"
//                     }`
//                   }
//                   value={category}
//                 >
//                   {category}
//                 </Listbox.Option>
//               ))}
//             </Listbox.Options>
//           </Transition>
//         </div>
//       </Listbox>

//       {/* Price Range Filters */}
//       <label className="flex items-center gap-2">
//         Min Price:
//         <input
//           type="number"
//           value={priceRange.min}
//           onChange={(e) =>
//             setPriceRange({ ...priceRange, min: Number(e.target.value) })
//           }
//           className="w-24 rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6]"
//         />
//       </label>

//       <label className="flex items-center gap-2">
//         Max Price:
//         <input
//           type="number"
//           value={priceRange.max}
//           onChange={(e) =>
//             setPriceRange({ ...priceRange, max: Number(e.target.value) })
//           }
//           className="w-24 rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6]"
//         />
//       </label>
//     </div>
//   );
// }

// export default FilterButtons;

// Bolt

// import { Fragment, useMemo } from "react";
// import { Listbox, Transition } from "@headlessui/react";
// import { useSearchProducts } from "../../hooks/useSearchProducts";
// import { useSearchStore } from "../../context/useSearchStore";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

// function FilterButtons() {
//   const { selectedCategory, setSelectedCategory, priceRange, setPriceRange } =
//     useSearchStore();
//   const { products } = useSearchProducts();

//   // Memoize categories to prevent unnecessary recalculations
//   const categories = useMemo(
//     () => [...new Set(products.map((p) => p.category))],
//     [products],
//   );

//   // Memoize price range handlers
// const handleMinPriceChange = useMemo(
//   () => (e: React.ChangeEvent<HTMLInputElement>) =>
//     setPriceRange({ ...priceRange, min: Number(e.target.value) }),
//   [priceRange, setPriceRange],
// );

// const handleMaxPriceChange = useMemo(
//   () => (e: React.ChangeEvent<HTMLInputElement>) =>
//     setPriceRange({ ...priceRange, max: Number(e.target.value) }),
//   [priceRange, setPriceRange],
// );

//   return (
//     <div className="mx-auto w-full max-w-4xl">
//       <div className="mb-4 flex items-center gap-4">
//         <Listbox value={selectedCategory} onChange={setSelectedCategory}>
//           <div className="relative">
//             {/* min-w-48 */}
//             <Listbox.Button className="flex w-56 items-center rounded-md border bg-white py-2 pl-4 pr-2 outline-none focus:ring-2 focus:ring-[#00E0C6]">
//               <span className="">{selectedCategory || "All Categories"}</span>
//               <FontAwesomeIcon
//                 icon={faChevronDown}
//                 className="ml-auto h-4 w-4 justify-self-end transition-transform duration-200"
//                 aria-hidden="true"
//               />
//               {/* <ChevronDown
//                 className="h-4 w-4 transition-transform duration-200"
//                 aria-hidden="true"
//               /> */}
//             </Listbox.Button>

//             <Transition
//               as={Fragment}
//               enter="transition duration-200 ease-out"
//               enterFrom="transform scale-95 opacity-0"
//               enterTo="transform scale-100 opacity-100"
//               leave="transition duration-150 ease-in"
//               leaveFrom="transform scale-100 opacity-100"
//               leaveTo="transform scale-95 opacity-0"
//             >
//               <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-56 overflow-auto rounded-md border bg-white shadow-lg">
//                 <Listbox.Option
//                   className={({ active }) =>
//                     `cursor-pointer py-2 pl-4 transition-colors ${
//                       active ? "bg-[#00E0C6] text-white" : "text-gray-900"
//                     }`
//                   }
//                   value=""
//                 >
//                   All Categories
//                 </Listbox.Option>
//                 {categories.map((category) => (
//                   <Listbox.Option
//                     key={category}
//                     className={({ active }) =>
//                       `cursor-pointer py-2 pl-4 transition-colors ${
//                         active ? "bg-[#00E0C6] text-white" : "text-gray-900"
//                       }`
//                     }
//                     value={category}
//                   >
//                     {category}
//                   </Listbox.Option>
//                 ))}
//               </Listbox.Options>
//             </Transition>
//           </div>
//         </Listbox>

//         <label className="flex items-center gap-2">
//           <span className="text-gray-700">Min Price:</span>
//           <input
//             type="number"
//             value={priceRange.min}
//             onChange={handleMinPriceChange}
//             className="w-24 rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6]"
//             aria-label="Minimum price"
//           />
//         </label>

//         <label className="flex items-center gap-2">
//           <span className="text-gray-700">Max Price:</span>
//           <input
//             type="number"
//             value={priceRange.max}
//             onChange={handleMaxPriceChange}
//             className="w-24 rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6]"
//             aria-label="Maximum price"
//           />
//         </label>
//       </div>
//     </div>
//   );
// }

// export default FilterButtons;

import { Fragment, useCallback, useMemo, useState } from "react";
import { Listbox, Transition, Dialog } from "@headlessui/react";
import { useSearchProducts } from "../../hooks/useSearchProducts";
import { useSearchStore } from "../../context/useSearchStore";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { getUniqueCategories } from "../../helpers/getUniqueCategories";
import debounce from "lodash.debounce";

function FilterButtons() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { selectedCategory, setSelectedCategory, priceRange, setPriceRange } =
    useSearchStore();
  const { products } = useSearchProducts();

  // const categories = useMemo(
  //   () => [...new Set(products.map((p) => p.category))],
  //   [products],
  // );

  const categories = useMemo(() => getUniqueCategories(products), [products]);

  const handleMinPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPriceRange({ ...priceRange, min: Number(e.target.value) });
    },
    [priceRange, setPriceRange],
  );

  const handleMaxPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPriceRange({ ...priceRange, max: Number(e.target.value) });
    },
    [setPriceRange, setPriceRange],
  );

  // const debouncedSetPriceRange = debounce(setPriceRange, 300);

  // const handleMinPriceChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     debouncedSetPriceRange({ ...priceRange, min: Number(e.target.value) });
  //   },
  //   [priceRange, debouncedSetPriceRange],
  // );

  // const handleMinPriceChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const min = Number(e.target.value);
  //     if (min <= priceRange.max) {
  //       setPriceRange({ ...priceRange, min });
  //     }
  //   },
  //   [priceRange, setPriceRange],
  // );

  // const handleMaxPriceChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const max = Number(e.target.value);
  //     if (max >= priceRange.min) {
  //       setPriceRange({ ...priceRange, max });
  //     }
  //   },
  //   [priceRange, setPriceRange],
  // );

  // const handleMinPriceChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) =>
  //     setPriceRange({ ...priceRange, min: Number(e.target.value) }),
  //   [priceRange, setPriceRange],
  // );

  // const handleMaxPriceChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) =>
  //     setPriceRange({ ...priceRange, max: Number(e.target.value) }),
  //   [priceRange, setPriceRange],
  // );

  // const handleMinPriceChange = useCallback(
  //   () => (e: React.ChangeEvent<HTMLInputElement>) =>
  //     setPriceRange({ ...priceRange, min: Number(e.target.value) }),
  //   [priceRange, setPriceRange],
  // );

  // const handleMaxPriceChange = useCallback(
  //   () => (e: React.ChangeEvent<HTMLInputElement>) =>
  //     setPriceRange({ ...priceRange, max: Number(e.target.value) }),
  //   [priceRange, setPriceRange],
  // );

  const FiltersContent = () => (
    <>
      <Listbox value={selectedCategory} onChange={setSelectedCategory}>
        <div className="relative">
          <Listbox.Button className="flex w-full items-center rounded-md border bg-white py-2 pl-4 pr-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-56">
            <span className="block truncate">
              {selectedCategory || "All Categories"}
            </span>
            <ChevronDown
              className="ml-auto h-4 w-4 text-gray-500 transition-transform duration-200"
              aria-hidden="true"
            />
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
            <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg sm:w-56">
              <Listbox.Option
                className={({ active }) =>
                  `cursor-pointer py-2 pl-4 transition-colors ${
                    active ? "bg-[#00E0C6] text-white" : "text-gray-900"
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
                    `cursor-pointer py-2 pl-4 transition-colors ${
                      active ? "bg-[#00E0C6] text-white" : "text-gray-900"
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

      <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row">
        <label className="flex items-center gap-2">
          <span className="whitespace-nowrap text-gray-700">Min Price:</span>
          <input
            type="number"
            value={priceRange.min}
            onChange={handleMinPriceChange}
            className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
            aria-label="Minimum price"
          />
        </label>

        <label className="flex items-center gap-2">
          <span className="whitespace-nowrap text-gray-700">Max Price:</span>
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) =>
              // setPriceRange(e.target.value =>{max:Number()})
              setPriceRange({ ...priceRange, max: Number(e.target.value) })
            }
            // onChange={handleMaxPriceChange}
            className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
            aria-label="Maximum price"
          />
        </label>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="mx-auto hidden w-full max-w-4xl sm:flex">
        <div className="mb-4 flex items-center gap-4">
          <FiltersContent />
        </div>
      </div>

      {/* Mobile Filters Button */}
      <div className="mx-auto w-full max-w-4xl px-4 sm:hidden">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[#00E0C6] px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#00c4ad]"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Mobile Filters Modal */}
      <Dialog
        as="div"
        className="relative z-40 sm:hidden"
        open={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#00E0C6]"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6 text-gray-500" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 px-4">
              <FiltersContent />
            </div>

            <div className="mt-6 px-4">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full rounded-md bg-[#00E0C6] px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#00c4ad]"
              >
                Apply Filters
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

export default FilterButtons;

// import { Menu } from "@headlessui/react";
// import { useSearchStore } from "../../context/useSearchStore";
// import { useSearchProducts } from "../../hooks/useSearchProducts";

// function FilterButtons() {
//   const { selectedCategory, setSelectedCategory, priceRange, setPriceRange } =
//     useSearchStore();

//   const { products } = useSearchProducts();
//   const categories = [...new Set(products.map((p) => p.category))];

//   return (
//     <div className="mx-auto w-full max-w-4xl">
//       {/* Custom Category Dropdown */}
//       <Menu as="div" className="relative">
//         <Menu.Button className="w-full rounded-md border bg-white p-2 text-left focus:ring-2 focus:ring-[#00E0C6]">
//           {selectedCategory || "All Categories"}
//         </Menu.Button>
//         <Menu.Items className="absolute left-0 mt-1 w-full rounded-md border bg-white shadow-lg">
//           <Menu.Item>
//             {({ active }) => (
//               <div
//                 onClick={() => setSelectedCategory("")}
//                 className={`cursor-pointer p-2 ${
//                   active ? "bg-[#00E0C6] text-white" : "bg-white"
//                 }`}
//               >
//                 All Categories
//               </div>
//             )}
//           </Menu.Item>
//           {categories.map((category) => (
//             <Menu.Item key={category}>
//               {({ active }) => (
//                 <div
//                   onClick={() => setSelectedCategory(category)}
//                   className={`cursor-pointer p-2 ${
//                     active ? "bg-[#00E0C6] text-white" : "bg-white"
//                   }`}
//                 >
//                   {category}
//                 </div>
//               )}
//             </Menu.Item>
//           ))}
//         </Menu.Items>
//       </Menu>

//       {/* Price Range Filters */}
//       <div className="mt-4 flex items-center gap-4">
//         <label className="flex items-center gap-2">
//           Min Price:
//           <input
//             type="number"
//             value={priceRange.min}
//             onChange={(e) =>
//               setPriceRange({ ...priceRange, min: Number(e.target.value) })
//             }
//             className="w-24 rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6]"
//           />
//         </label>
//         <label className="flex items-center gap-2">
//           Max Price:
//           <input
//             type="number"
//             value={priceRange.max}
//             onChange={(e) =>
//               setPriceRange({ ...priceRange, max: Number(e.target.value) })
//             }
//             className="w-24 rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6]"
//           />
//         </label>
//       </div>
//     </div>
//   );
// }

// export default FilterButtons;

// import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";

// const FilterButtons = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* DESKTOP SIDEBAR FILTER */}
//       <aside className="hidden border-r bg-white px-4 py-2 lg:block">
//         <h2 className="mb-2 text-lg font-semibold">Filters</h2>
//         <div className="flex gap-4">
//           <div className="">
//             <label className="mb-1 block font-medium">Category:</label>
//             <select className="w-full rounded border p-2">
//               <option>All Categories</option>
//               <option>Electronics</option>
//               <option>Beauty</option>
//             </select>
//           </div>
//           <div className="">
//             <label className="mb-1 block font-medium">Min Price:</label>
//             <input type="number" className="w-32 rounded border p-2" />
//           </div>
//           <div className="">
//             <label className="mb-1 block font-medium">Max Price:</label>
//             <input type="number" className="w-32 rounded border p-2" />
//           </div>
//         </div>
//       </aside>

//       {/* MOBILE FILTER BUTTON */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="fixed bottom-6 right-6 rounded-full bg-blue-600 p-4 text-white shadow-md lg:hidden"
//       >
//         {/* <FaFilter size={20} /> */}
//         <FontAwesomeIcon icon={faFilter} />
//       </button>

//       {/* MOBILE SLIDE-IN FILTER DRAWER */}
//       <div
//         className={`fixed right-0 top-0 h-full w-80 transform bg-white shadow-lg ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         } z-50 transition-transform duration-300 ease-in-out`}
//       >
//         {/* HEADER */}
//         <div className="flex items-center justify-between border-b p-4">
//           <h2 className="text-lg font-semibold">Filters</h2>
//           <button onClick={() => setIsOpen(false)}>
//             {/* <FaTimes size={20} /> */}
//             <FontAwesomeIcon icon={faTimes} />
//           </button>
//         </div>

//         {/* FILTER CONTENT */}
//         <div className="p-4">
//           <div className="mb-4">
//             <label className="mb-1 block font-medium">Category:</label>
//             <select className="w-full rounded border p-2">
//               <option>All Categories</option>
//               <option>Electronics</option>
//               <option>Beauty</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="mb-1 block font-medium">Min Price:</label>
//             <input type="number" className="w-full rounded border p-2" />
//           </div>
//           <div className="mb-4">
//             <label className="mb-1 block font-medium">Max Price:</label>
//             <input type="number" className="w-full rounded border p-2" />
//           </div>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="w-full rounded bg-blue-600 p-2 text-white"
//           >
//             Apply Filters
//           </button>
//         </div>
//       </div>

//       {/* BACKDROP (Click to Close) */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default FilterButtons;
