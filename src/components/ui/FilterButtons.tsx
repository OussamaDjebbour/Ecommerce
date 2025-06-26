// import { Fragment, useCallback, useMemo, useState } from "react";
// import { Listbox, Transition, Dialog } from "@headlessui/react";
// import { useSearchProducts } from "../../hooks/useSearchProducts";
// import { useSearchStore } from "../../context/useSearchStore";
// import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
// import { getUniqueCategories } from "../../helpers/getUniqueCategories";
// import debounce from "lodash.debounce";

// function FilterButtons() {
//   const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
//   const { selectedCategory, setSelectedCategory, priceRange, setPriceRange } =
//     useSearchStore();
//   const { products } = useSearchProducts();

//   const categories = useMemo(() => getUniqueCategories(products), [products]);

//   // Debounced price range update
//   const debouncedSetPriceRange = useMemo(
//     () => debounce(setPriceRange, 300),
//     [setPriceRange],
//   );

//   const handleMinPriceChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const min = Number(e.target.value);
//       debouncedSetPriceRange({ ...priceRange, min });
//     },
//     [priceRange, debouncedSetPriceRange],
//   );

//   const handleMaxPriceChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       setPriceRange({ min: priceRange.min, max: Number(e.target.value) });
//     },
//     [priceRange.min, setPriceRange],
//   );

//   // const handleMaxPriceChange = useCallback(
//   //   (e: React.ChangeEvent<HTMLInputElement>) => {
//   //     const max = Number(e.target.value);
//   //     debouncedSetPriceRange({ ...priceRange, max });
//   //   },
//   //   [priceRange, debouncedSetPriceRange],
//   // );

//   const FiltersContent = useMemo(
//     () => () => (
//       <>
//         <Listbox value={selectedCategory} onChange={setSelectedCategory}>
//           <div className="relative">
//             <Listbox.Button className="flex w-full items-center rounded-md border bg-white py-2 pl-4 pr-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-56">
//               <span className="block truncate">
//                 {selectedCategory || "All Categories"}
//               </span>
//               <ChevronDown
//                 className="ml-auto h-4 w-4 text-gray-500 transition-transform duration-200"
//                 aria-hidden="true"
//               />
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
//               <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg sm:w-56">
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

//         <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row">
//           <label className="flex items-center gap-2">
//             <span className="whitespace-nowrap text-gray-700">Min Price:</span>
//             <input
//               type="number"
//               value={priceRange.min}
//               onChange={handleMinPriceChange}
//               className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//               aria-label="Minimum price"
//             />
//           </label>

//           <label className="flex items-center gap-2">
//             <span className="whitespace-nowrap text-gray-700">Max Price:</span>
//             <input
//               type="number"
//               value={priceRange.max}
//               onChange={handleMaxPriceChange}
//               className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//               aria-label="Maximum price"
//             />
//           </label>
//         </div>
//       </>
//     ),
//     [
//       categories,
//       handleMaxPriceChange,
//       handleMinPriceChange,
//       priceRange,
//       selectedCategory,
//       setSelectedCategory,
//     ],
//   );

//   return (
//     <>
//       {/* Desktop Filters */}
//       <div className="mx-auto hidden w-full max-w-4xl sm:flex">
//         <div className="mb-4 flex items-center gap-4">
//           <FiltersContent />
//         </div>
//       </div>

//       {/* Mobile Filters Button */}
//       <div className="mx-auto w-full max-w-4xl px-4 sm:hidden">
//         <button
//           onClick={() => setIsMobileFiltersOpen(true)}
//           className="flex w-full items-center justify-center gap-2 rounded-md bg-[#00E0C6] px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#00c4ad]"
//         >
//           <SlidersHorizontal className="h-4 w-4" />
//           Filters
//         </button>
//       </div>

//       {/* Mobile Filters Modal */}
//       <Dialog
//         as="div"
//         className="relative z-40 sm:hidden"
//         open={isMobileFiltersOpen}
//         onClose={() => setIsMobileFiltersOpen(false)}
//       >
//         <div className="fixed inset-0 bg-black bg-opacity-25" />

//         <div className="fixed inset-0 z-40 flex">
//           <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
//             <div className="flex items-center justify-between px-4">
//               <h2 className="text-lg font-medium text-gray-900">Filters</h2>
//               <button
//                 type="button"
//                 className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#00E0C6]"
//                 onClick={() => setIsMobileFiltersOpen(false)}
//               >
//                 <span className="sr-only">Close menu</span>
//                 <X className="h-6 w-6 text-gray-500" aria-hidden="true" />
//               </button>
//             </div>

//             <div className="mt-4 px-4">
//               <FiltersContent />
//             </div>

//             <div className="mt-6 px-4">
//               <button
//                 onClick={() => setIsMobileFiltersOpen(false)}
//                 className="w-full rounded-md bg-[#00E0C6] px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#00c4ad]"
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </>
//   );
// }

// export default FilterButtons;

// import { Fragment, useMemo, useState } from "react";
// import { Listbox, Transition, Dialog } from "@headlessui/react";
// import { useSearchProducts } from "../../hooks/useSearchProducts";
// import { useSearchStore } from "../../context/useSearchStore";
// import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
// import { getUniqueCategories } from "../../helpers/getUniqueCategories";
// import PriceInputs from "./PriceInputs";
// import MinPriceInput from "./MinPriceInput";
// import MaxPriceInput from "./MaxPriceInput";
// import PriceFilter from "./PriceFilter";
// import useSearchParams from "src/hooks/useSearchParams";

// function FilterButtons() {
//   const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
//   const { selectedCategory, setSelectedCategory, priceRange, setPriceRange } =
//     useSearchStore();
//   const { products } = useSearchProducts();

//   const categories = useMemo(() => getUniqueCategories(products), [products]);

//   const FiltersContent = useMemo(
//     () => () => (
//       <>
//         <Listbox value={selectedCategory} onChange={setSelectedCategory}>
//           <div className="relative">
//             <Listbox.Button className="flex w-full items-center rounded-md border bg-white py-2 pl-4 pr-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-56">
//               <span className="block truncate">
//                 {selectedCategory || "All Categories"}
//               </span>
//               <ChevronDown
//                 className="ml-auto h-4 w-4 text-gray-500 transition-transform duration-200"
//                 aria-hidden="true"
//               />
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
//               <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg sm:w-56">
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

//         <PriceInputs priceRange={priceRange} setPriceRange={setPriceRange} />
//       </>
//     ),
//     [
//       categories,
//       selectedCategory,
//       setSelectedCategory,
//       priceRange,
//       setPriceRange,
//     ],
//   );

//   return (
//     <>
//       {/* Desktop Filters */}
//       <div className="mx-auto hidden w-full max-w-4xl sm:flex">
//         <div className="mb-4 flex items-center gap-4">
//           <FiltersContent />
//         </div>
//       </div>

//       {/* Mobile Filters Button */}
//       <div className="mx-auto w-full max-w-4xl px-4 sm:hidden">
//         <button
//           onClick={() => setIsMobileFiltersOpen(true)}
//           className="flex w-full items-center justify-center gap-2 rounded-md bg-[#00E0C6] px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#00c4ad]"
//         >
//           <SlidersHorizontal className="h-4 w-4" />
//           Filters
//         </button>
//       </div>

//       {/* Mobile Filters Modal */}
//       <Dialog
//         as="div"
//         className="relative z-40 sm:hidden"
//         open={isMobileFiltersOpen}
//         onClose={() => setIsMobileFiltersOpen(false)}
//       >
//         <div className="fixed inset-0 bg-black bg-opacity-25" />

//         <div className="fixed inset-0 z-40 flex">
//           <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
//             <div className="flex items-center justify-between px-4">
//               <h2 className="text-lg font-medium text-gray-900">Filters</h2>
//               <button
//                 type="button"
//                 className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#00E0C6]"
//                 onClick={() => setIsMobileFiltersOpen(false)}
//               >
//                 <span className="sr-only">Close menu</span>
//                 <X className="h-6 w-6 text-gray-500" aria-hidden="true" />
//               </button>
//             </div>

//             <div className="mt-4 px-4">
//               <FiltersContent />
//             </div>

//             <div className="mt-6 px-4">
//               <button
//                 onClick={() => setIsMobileFiltersOpen(false)}
//                 className="w-full rounded-md bg-[#00E0C6] px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#00c4ad]"
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </>
//   );
// }

// export default FilterButtons;

// function FilterButtons() {
//   const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
//   const {
//     selectedCategory,
//     setSelectedCategory,
//     minPrice,
//     maxPrice,
//     setMinPrice,
//     setMaxPrice,
//   } = useSearchStore();
//   const { products } = useSearchProducts();

//   const categories = useMemo(() => getUniqueCategories(products), [products]);

//   const FiltersContent = () => (
//     <>
//       <Listbox value={selectedCategory} onChange={setSelectedCategory}>
//         <div className="relative">
//           <Listbox.Button className="flex w-full items-center rounded-md border bg-white py-2 pl-4 pr-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-56">
//             <span className="block truncate">
//               {selectedCategory || "All Categories"}
//             </span>
//             <ChevronDown
//               className="ml-auto h-4 w-4 text-gray-500 transition-transform duration-200"
//               aria-hidden="true"
//             />
//           </Listbox.Button>

//           <Transition
//             as={Fragment}
//             enter="transition duration-200 ease-out"
//             enterFrom="transform scale-95 opacity-0"
//             enterTo="transform scale-100 opacity-100"
//             leave="transition duration-150 ease-in"
//             leaveFrom="transform scale-100 opacity-100"
//             leaveTo="transform scale-95 opacity-0"
//           >
//             <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg sm:w-56">
//               <Listbox.Option
//                 className={({ active }) =>
//                   `cursor-pointer py-2 pl-4 transition-colors ${
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
//                     `cursor-pointer py-2 pl-4 transition-colors ${
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

//       <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row">
//         <label className="flex items-center gap-2">
//           <span className="whitespace-nowrap text-gray-700">Min Price:</span>
//           <input
//             type="number"
//             value={minPrice}
//             onChange={(e) => setMinPrice(Number(e.target.value))}
//             className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//             aria-label="Minimum price"
//           />
//         </label>

//         <label className="flex items-center gap-2">
//           <span className="whitespace-nowrap text-gray-700">Max Price:</span>
//           <input
//             type="number"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(Number(e.target.value))}
//             className="w-full rounded-md border p-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-24"
//             aria-label="Maximum price"
//           />
//         </label>
//       </div>
//     </>
//   );

//   return (
//     <>
//       {/* Desktop Filters */}
//       <div className="mx-auto hidden w-full max-w-4xl sm:flex">
//         <div className="mb-4 flex items-center gap-4">
//           <FiltersContent />
//         </div>
//       </div>

//       {/* Mobile Filters Button */}
//       <div className="mx-auto w-full max-w-4xl px-4 sm:hidden">
//         <button
//           onClick={() => setIsMobileFiltersOpen(true)}
//           className="flex w-full items-center justify-center gap-2 rounded-md bg-[#00E0C6] px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#00c4ad]"
//         >
//           <SlidersHorizontal className="h-4 w-4" />
//           Filters
//         </button>
//       </div>

//       {/* Mobile Filters Modal */}
//       <Dialog
//         as="div"
//         className="relative z-40 sm:hidden"
//         open={isMobileFiltersOpen}
//         onClose={() => setIsMobileFiltersOpen(false)}
//       >
//         <div className="fixed inset-0 bg-black bg-opacity-25" />

//         <div className="fixed inset-0 z-40 flex">
//           <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
//             <div className="flex items-center justify-between px-4">
//               <h2 className="text-lg font-medium text-gray-900">Filters</h2>
//               <button
//                 type="button"
//                 className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#00E0C6]"
//                 onClick={() => setIsMobileFiltersOpen(false)}
//               >
//                 <span className="sr-only">Close menu</span>
//                 <X className="h-6 w-6 text-gray-500" aria-hidden="true" />
//               </button>
//             </div>

//             <div className="mt-4 px-4">
//               <FiltersContent />
//             </div>

//             <div className="mt-6 px-4">
//               <button
//                 onClick={() => setIsMobileFiltersOpen(false)}
//                 className="w-full rounded-md bg-[#00E0C6] px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#00c4ad]"
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </>
//   );
// }

// export default FilterButtons;

// function FilterButtons() {
//   const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
//   const { selectedCategory, setSelectedCategory } = useSearchStore();
//   const { products } = useSearchProducts();

//   const categories = useMemo(() => getUniqueCategories(products), [products]);

//   const FiltersContent = () => (
//     <>
//       <Listbox value={selectedCategory} onChange={setSelectedCategory}>
//         <div className="relative">
//           <Listbox.Button className="flex w-full items-center rounded-md border bg-white py-2 pl-4 pr-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-56">
//             <span className="block truncate">
//               {selectedCategory || "All Categories"}
//             </span>
//             <ChevronDown
//               className="ml-auto h-4 w-4 text-gray-500 transition-transform duration-200"
//               aria-hidden="true"
//             />
//           </Listbox.Button>

//           <Transition
//             as={Fragment}
//             enter="transition duration-200 ease-out"
//             enterFrom="transform scale-95 opacity-0"
//             enterTo="transform scale-100 opacity-100"
//             leave="transition duration-150 ease-in"
//             leaveFrom="transform scale-100 opacity-100"
//             leaveTo="transform scale-95 opacity-0"
//           >
//             <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg sm:w-56">
//               <Listbox.Option
//                 className={({ active }) =>
//                   `cursor-pointer py-2 pl-4 transition-colors ${
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
//                     `cursor-pointer py-2 pl-4 transition-colors ${
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

//       <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row">
//         <MinPriceInput />
//         <MaxPriceInput />
//       </div>
//     </>
//   );

//   return (
//     <>
//       {/* Desktop Filters */}
//       <div className="mx-auto hidden w-full max-w-4xl sm:flex">
//         <div className="mb-4 flex items-center gap-4">
//           <FiltersContent />
//         </div>
//       </div>

//       {/* Mobile Filters Button */}
//       <div className="mx-auto w-full max-w-4xl px-4 sm:hidden">
//         <button
//           onClick={() => setIsMobileFiltersOpen(true)}
//           className="flex w-full items-center justify-center gap-2 rounded-md bg-[#00E0C6] px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#00c4ad]"
//         >
//           <SlidersHorizontal className="h-4 w-4" />
//           Filters
//         </button>
//       </div>

//       {/* Mobile Filters Modal */}
//       <Dialog
//         as="div"
//         className="relative z-40 sm:hidden"
//         open={isMobileFiltersOpen}
//         onClose={() => setIsMobileFiltersOpen(false)}
//       >
//         <div className="fixed inset-0 bg-black bg-opacity-25" />

//         <div className="fixed inset-0 z-40 flex">
//           <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
//             <div className="flex items-center justify-between px-4">
//               <h2 className="text-lg font-medium text-gray-900">Filters</h2>
//               <button
//                 type="button"
//                 className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#00E0C6]"
//                 onClick={() => setIsMobileFiltersOpen(false)}
//               >
//                 <span className="sr-only">Close menu</span>
//                 <X className="h-6 w-6 text-gray-500" aria-hidden="true" />
//               </button>
//             </div>

//             <div className="mt-4 px-4">
//               <FiltersContent />
//             </div>

//             <div className="mt-6 px-4">
//               <button
//                 onClick={() => setIsMobileFiltersOpen(false)}
//                 className="w-full rounded-md bg-[#00E0C6] px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#00c4ad]"
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </>
//   );
// }

// export default FilterButtons;

// function FilterButtons() {
//   const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
//   const { selectedCategory, setSelectedCategory } = useSearchStore();
//   const { products } = useSearchProducts();

//   const categories = useMemo(() => getUniqueCategories(products), [products]);

//   const FiltersContent = () => (
//     <>
//       <Listbox value={selectedCategory} onChange={setSelectedCategory}>
//         <div className="relative">
//           <Listbox.Button className="flex w-full items-center rounded-md border bg-white py-2 pl-4 pr-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-56">
//             <span className="block truncate">
//               {selectedCategory || "All Categories"}
//             </span>
//             <ChevronDown
//               className="ml-auto h-4 w-4 text-gray-500 transition-transform duration-200"
//               aria-hidden="true"
//             />
//           </Listbox.Button>

//           <Transition
//             as={Fragment}
//             enter="transition duration-200 ease-out"
//             enterFrom="transform scale-95 opacity-0"
//             enterTo="transform scale-100 opacity-100"
//             leave="transition duration-150 ease-in"
//             leaveFrom="transform scale-100 opacity-100"
//             leaveTo="transform scale-95 opacity-0"
//           >
//             <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg sm:w-56">
//               <Listbox.Option
//                 className={({ active }) =>
//                   `cursor-pointer py-2 pl-4 transition-colors ${
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
//                     `cursor-pointer py-2 pl-4 transition-colors ${
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

//       <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row">
//         <MinPriceInput />
//         <MaxPriceInput />
//       </div>
//     </>
//   );

//   return (
//     <>
//       {/* Desktop Filters */}
//       <div className="mx-auto hidden w-full max-w-4xl sm:flex">
//         <div className="mb-4 flex items-center gap-4">
//           <FiltersContent />
//         </div>
//       </div>

//       {/* Mobile Filters Button */}
//       <div className="mx-auto w-full max-w-4xl px-4 sm:hidden">
//         <button
//           onClick={() => setIsMobileFiltersOpen(true)}
//           className="flex w-full items-center justify-center gap-2 rounded-md bg-[#00E0C6] px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#00c4ad]"
//         >
//           <SlidersHorizontal className="h-4 w-4" />
//           Filters
//         </button>
//       </div>

//       {/* Mobile Filters Modal */}
//       <Dialog
//         as="div"
//         className="relative z-40 sm:hidden"
//         open={isMobileFiltersOpen}
//         onClose={() => setIsMobileFiltersOpen(false)}
//       >
//         <div className="fixed inset-0 bg-black bg-opacity-25" />

//         <div className="fixed inset-0 z-40 flex">
//           <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
//             <div className="flex items-center justify-between px-4">
//               <h2 className="text-lg font-medium text-gray-900">Filters</h2>
//               <button
//                 type="button"
//                 className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#00E0C6]"
//                 onClick={() => setIsMobileFiltersOpen(false)}
//               >
//                 <span className="sr-only">Close menu</span>
//                 <X className="h-6 w-6 text-gray-500" aria-hidden="true" />
//               </button>
//             </div>

//             <div className="mt-4 px-4">
//               <FiltersContent />
//             </div>

//             <div className="mt-6 px-4">
//               <button
//                 onClick={() => setIsMobileFiltersOpen(false)}
//                 className="w-full rounded-md bg-[#00E0C6] px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#00c4ad]"
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </>
//   );
// }

// export default FilterButtons;

import { Fragment, useMemo, useState } from "react";
import { Listbox, Transition, Dialog } from "@headlessui/react";
import { useSearchProducts } from "../../hooks/useSearchProducts";
import { useSearchStore } from "../../context/useSearchStore";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { getUniqueCategories } from "../../helpers/getUniqueCategories";
import PriceInputs from "./PriceInputs";
import MinPriceInput from "./MinPriceInput";
import MaxPriceInput from "./MaxPriceInput";
import PriceFilter from "./PriceFilter";
import useSearchParams from "../../hooks/useSearchParams";

function FilterButtons() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  // const { selectedCategory, setSelectedCategory } = useSearchStore();
  const { selectedCategory, setSelectedCategory } = useSearchParams();

  const { products } = useSearchProducts(); // I need to use the data directly without ro refetch it

  const categories = useMemo(() => getUniqueCategories(products), [products]);

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

      {/* <PriceFilter /> */}
      {/* <PriceInputs /> */}

      <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row">
        <MinPriceInput />
        <MaxPriceInput />
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
