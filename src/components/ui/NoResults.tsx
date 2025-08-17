import { FC } from "react";
import { useRouterSearchParams } from "../../hooks/useRouterSearchParams";

const NoResults: FC<{ searchQuery: string; selectedCategory?: string }> = ({
  searchQuery,
  selectedCategory,
}) => {
  const { clearAll, clearAllFilters, hasActiveFilters } =
    useRouterSearchParams();

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
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Clear Filters Only
          </button>
        )}

        <button
          onClick={clearAll}
          className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Clear All & Browse Products
        </button>
      </div>
    </div>
  );
};

export default NoResults;
