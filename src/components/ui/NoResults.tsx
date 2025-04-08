// import { Search } from "lucide-react"; // Import an icon for better UI

// const NoResults = ({ query }: { query: string }) => {
//   return (
//     <div className="mt-16 flex flex-col items-center justify-center rounded-lg bg-gray-100 p-6 text-center shadow-md">
//       <Search className="h-12 w-12 text-gray-500" /> {/* Search icon */}
//       <h3 className="mt-4 text-xl font-semibold text-gray-700">
//         No results found
//       </h3>
//       <p className="mt-2 text-gray-600">
//         We couldn't find any results for "
//         <span className="font-medium">{query}</span>". Try adjusting your search
//         terms or removing filters.
//       </p>
//       <button
//         onClick={() => window.location.reload()} // Reload page or clear filters
//         className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//       >
//         Reset Search
//       </button>
//     </div>
//   );
// };

// export default NoResults;

// import { FC } from "react";
// import { useSearchStore } from "../context/useSearchStore"; // Adjust path as needed

// const NoResults: FC<{ searchQuery: string; selectedCategory?: string }> = ({
//   searchQuery,
//   selectedCategory,
// }) => {
//   const { setSearchQuery, setSelectedCategory } = useSearchStore();

//   const handleClearFilters = () => {
//     setSearchQuery("");
//     setSelectedCategory("");
//   };

//   return (
//     <div
//       className="col-span-2 row-span-1 flex flex-col items-center justify-center py-12"
//       role="alert"
//       aria-live="assertive"
//     >
//       {/* Error Icon (optional, replace with your own SVG or icon library) */}
//       <svg
//         className="mb-4 h-12 w-12 text-gray-400"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//         aria-hidden="true"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 4h.01"
//         />
//       </svg>

//       {/* Error Heading */}
//       <h2 className="mb-2 text-lg font-semibold text-gray-800">
//         No Products Found
//       </h2>

//       {/* Error Description */}
//       <p className="mb-4 text-center text-gray-600">
//         We couldn’t find any products matching "{searchQuery}"
//         {selectedCategory && ` in the "${selectedCategory}" category`}. Try
//         adjusting your search term or filters to find what you’re looking for.
//       </p>

//       {/* Suggestions and Actions */}
//       <div className="flex flex-col gap-4 sm:flex-row">
//         <button
//           onClick={handleClearFilters}
//           className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           Clear Filters
//         </button>
//         <a
//           href="/products"
//           className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           Browse All Products
//         </a>
//       </div>
//     </div>
//   );
// };

// export default NoResults;

import { FC } from "react";
import { useSearchStore } from "../../context/useSearchStore";
const NoResults: FC<{ searchQuery: string; selectedCategory?: string }> = ({
  searchQuery,
  selectedCategory,
}) => {
  const { setSearchQuery, setSelectedCategory } = useSearchStore();

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
  };

  return (
    <div
      className="col-span-2 row-span-1 mt-14 flex flex-col items-center py-12"
      role="alert"
      aria-live="assertive"
    >
      <svg
        className="mb-4 h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 4h.01"
        />
      </svg>

      {/* Error Heading */}
      <h2 className="mb-2 text-lg font-semibold text-gray-800">
        No Products Found
      </h2>

      {/* Error Description */}
      <p className="mb-4 text-center text-gray-600">
        We couldn't find any products matching "{searchQuery}"
        {selectedCategory && ` in the "${selectedCategory}" category`}. Try
        adjusting your search term or filters to find what you're looking for.
      </p>

      {/* Suggestions and Actions */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={handleClearFilters}
          className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Clear Filters
        </button>
        <a
          // href="/products"
          className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Browse All Products
        </a>
      </div>
    </div>
  );
};

export default NoResults;
