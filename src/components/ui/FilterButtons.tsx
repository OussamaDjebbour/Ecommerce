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

// import { Fragment, useMemo, useState } from "react";
// import { Listbox, Transition, Dialog } from "@headlessui/react";
// import { useSearchProducts } from "../../hooks/useSearchProducts";
// import { useSearchStore } from "../../context/useSearchStore";
// import { ChevronDown, FilterXIcon, SlidersHorizontal, X } from "lucide-react";
// import { getUniqueCategories } from "../../helpers/getUniqueCategories";
// import PriceInputs from "./PriceInputs";
// import MinPriceInput from "./MinPriceInput";
// import MaxPriceInput from "./MaxPriceInput";
// import PriceFilter from "./PriceFilter";
// import useRouterSearchParams from "../../hooks/useRouterSearchParams";

// // import { useForm, FormProvider } from "react-hook-form";
// // import { z } from "zod";
// // import { zodResolver } from "@hookform/resolvers/zod";

// const sortOptions: { name: string; value: string }[] = [
//   { name: "Relevance", value: "relevance" },
//   { name: "Price: Low to High", value: "priceLowToHigh" },
//   { name: "Price: High to Low", value: "priceHighToLow" },
//   { name: "Newest First", value: "newest" },
//   { name: "Oldest First", value: "oldest" },
// ];
// // const sortOptions = [
// //   { name: "Featured", href: "#", current: true },
// //   { name: "Price: Low to High", href: "#", current: false },
// //   { name: "Price: High to Low", href: "#", current: false },
// //   { name: "Name: A to Z", href: "#", current: false },
// //   { name: "Name: Z to A", href: "#", current: false },
// // ];

// function FilterButtons() {
//   const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
//   // const { selectedCategory, setSelectedCategory } = useSearchStore();
//   const {
//     selectedCategory,
//     setSelectedCategory,
//     sort,
//     setSort,
//     clearAllFilters,
//   } = useRouterSearchParams();

//   const { products } = useSearchProducts(); // I need to use the data directly without ro refetch it

//   const categories = useMemo(() => getUniqueCategories(products), [products]);

//   const FiltersContent = () => (
//     <>
//       <label className="flex flex-col gap-1">
//         <span className="text-gray-700">Category</span>
//         <Listbox value={selectedCategory} onChange={setSelectedCategory}>
//           <div className="relative">
//             <Listbox.Button className="flex w-full items-center rounded-md border bg-white py-2 pl-4 pr-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-52">
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
//               <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg sm:w-52">
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
//       </label>
//       <label className="flex flex-col gap-1">
//         <span className="text-gray-700">Sort by</span>
//         <Listbox value={sort} onChange={setSort}>
//           <div className="relative">
//             <Listbox.Button className="flex w-full items-center rounded-md border bg-white py-2 pl-4 pr-2 outline-none focus:ring-2 focus:ring-[#00E0C6] sm:w-48">
//               <span className="block truncate">{sort || "Relevance"}</span>
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
//               <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg sm:w-48">
//                 {/* <Listbox.Option
//                 className={({ active }) =>
//                   `cursor-pointer py-2 pl-4 transition-colors ${
//                     active ? "bg-[#00E0C6] text-white" : "text-gray-900"
//                   }`
//                 }
//                 value=""
//               >
//                 Relevance
//               </Listbox.Option> */}
//                 {sortOptions.map((sortOption) => (
//                   <Listbox.Option
//                     key={sortOption.name}
//                     className={({ active }) =>
//                       `cursor-pointer py-2 pl-4 transition-colors ${
//                         active ? "bg-[#00E0C6] text-white" : "text-gray-900"
//                       }`
//                     }
//                     value={sortOption.value}
//                   >
//                     {sortOption.name}
//                   </Listbox.Option>
//                 ))}
//               </Listbox.Options>
//             </Transition>
//           </div>
//         </Listbox>
//       </label>

//       {/* <PriceFilter /> */}
//       {/* <PriceInputs /> */}

//       <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row">
//         <MinPriceInput />
//         <MaxPriceInput />
//       </div>
//       <button onClick={clearAllFilters} className="text-[#00E0C6]">
//         <FilterXIcon size={28} />
//       </button>
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

import { Fragment, useMemo, useState, memo, useCallback } from "react";
import { Listbox, Transition, Dialog } from "@headlessui/react";
import {
  ChevronDown,
  FilterX,
  SlidersHorizontal,
  X,
  Filter,
  Search,
} from "lucide-react";
import { useSearchProducts } from "../../hooks/useSearchProducts";
import { getUniqueCategories } from "../../helpers/getUniqueCategories";
import MinPriceInput from "./MinPriceInput";
import MaxPriceInput from "./MaxPriceInput";
import useRouterSearchParams from "../../hooks/useRouterSearchParams";

const sortOptions: { name: string; value: string }[] = [
  { name: "Most Relevant", value: "relevance" },
  { name: "Price: Low to High", value: "priceLowToHigh" },
  { name: "Price: High to Low", value: "priceHighToLow" },
  { name: "Newest First", value: "newest" },
  { name: "Oldest First", value: "oldest" },
];

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
                {sortOptions.find((option) => option.value === sort)?.name ||
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
                {sortOptions.map((sortOption) => (
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

            {/* Footer */}
            {/* <div className="border-t border-gray-200 p-6">
              <button
                onClick={handleMobileFiltersClose}
                className="w-full rounded-lg bg-[#009393] px-4 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#007a7a] active:scale-95"
              >
                Apply Filters
              </button>
            </div> */}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
});

FilterButtons.displayName = "FilterButtons";

export default FilterButtons;
