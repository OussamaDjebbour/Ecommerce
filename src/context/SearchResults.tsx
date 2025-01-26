import React, { useContext, useState } from "react";
import { SearchContext, useSearchContext } from "../context/useSearchContext";

const SearchResults = () => {
  const { searchResults, currentPage, totalPages, fetchResults } =
    useSearchContext();
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 1000],
  });

  const applyFilters = () => {
    fetchResults(1, filters);
  };

  return (
    <div className="w-full p-4">
      {/* Filters */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
          className="rounded-lg border p-2"
        >
          <option value="">All Categories</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
        </select>
        <div className="flex items-center gap-2">
          <span>Price Range:</span>
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [Number(e.target.value), prev.priceRange[1]],
              }))
            }
            className="w-16 rounded-lg border p-1"
          />
          <span>-</span>
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [prev.priceRange[0], Number(e.target.value)],
              }))
            }
            className="w-16 rounded-lg border p-1"
          />
        </div>
        <button
          onClick={applyFilters}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Apply
        </button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {searchResults.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border p-4 shadow-md hover:shadow-lg"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="mb-2 h-32 w-full object-cover"
            />
            <h3 className="text-lg font-bold">{product.title}</h3>
            <p className="text-sm text-gray-500">${product.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={() => fetchResults(currentPage - 1, filters)}
          disabled={currentPage === 1}
          className="rounded-lg bg-gray-300 px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => fetchResults(currentPage + 1, filters)}
          disabled={currentPage === totalPages}
          className="rounded-lg bg-gray-300 px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
