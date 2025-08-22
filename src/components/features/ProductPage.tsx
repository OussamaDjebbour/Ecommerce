import { useRef, useMemo, memo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ArrowRight } from "lucide-react";
import { useSearchStore } from "../../store/searchStore";
import useRouterSearchParams from "../../hooks/useRouterSearchParams";
import { useSearchProducts } from "../../hooks/useSearchProducts";
import ProductCard from "../ui/ProductCard";
import FilterButtons from "../ui/FilterButtons";
import Spinner from "../ui/Spinner";
import NoResults from "../ui/NoResults";
import ErrorMessage from "../ui/ErrorMessage";

const MemoizedProductCard = memo(ProductCard);
const MemoizedFilterButtons = memo(FilterButtons);

const ProductPage = memo(() => {
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);

  const { searchQuery, currentPage, selectedCategory, setCurrentPage } =
    useRouterSearchParams();
  const { filteredProducts, isLoading, error } = useSearchProducts();
  const { itemsPerPage, setItemsPerPage } = useSearchStore();

  const { paginatedProducts, totalPages } = useMemo(() => {
    if (!filteredProducts?.length) {
      return { paginatedProducts: [], totalPages: 0, paginationButtons: [] };
    }

    const total = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginated = filteredProducts.slice(
      startIndex,
      startIndex + itemsPerPage,
    );

    return {
      paginatedProducts: paginated,
      totalPages: total,
      paginationButtons: Array.from({ length: total }, (_, i) => i + 1),
    };
  }, [filteredProducts, currentPage, itemsPerPage]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 958) {
        setItemsPerPage(6);
      } else if (screenWidth >= 648) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(2);
      }
    };

    updateItemsPerPage(); // Run on mount
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [setItemsPerPage]);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      // Smooth scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setCurrentPage],
  );

  const renderPageNumbers = () => {
    const totalButtons: (number | string)[] = [];

    if (totalPages <= 5) {
      // Show all if total is small
      for (let i = 1; i <= totalPages; i++) totalButtons.push(i);
    } else {
      // Always show first
      totalButtons.push(1);

      // Show dots before current if needed
      if (currentPage > 3) totalButtons.push("...");

      // Show current - 1, current, current + 1
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 1 && i < totalPages) totalButtons.push(i);
      }

      // Show dots after current if needed
      if (currentPage < totalPages - 2) totalButtons.push("...");

      // Always show last
      totalButtons.push(totalPages);
    }

    return totalButtons.map((page, idx) =>
      typeof page === "number" ? (
        <button
          key={idx}
          onClick={() => handlePageChange(page)}
          className={`rounded-lg px-2 py-1 text-sm font-medium transition-all duration-200 min-[550px]:px-3 min-[550px]:py-2 min-[580px]:min-w-[40px] ${
            currentPage === page
              ? "bg-[#009393] text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ) : (
        <span key={idx} className="select-none px-2 text-gray-400">
          {page}
        </span>
      ),
    );
  };

  if (error) {
    return (
      <div className="col-span-2 row-span-1">
        <ErrorMessage message={error.message} />
      </div>
    );
  }

  return (
    <div className="col-span-2 row-span-1 min-h-screen bg-gray-50 pt-8 xl:pt-0">
      <div className="mx-auto max-w-7xl px-4 pb-6">
        {/* Header Section */}

        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="group mb-6 flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 transition-all duration-200 hover:bg-white hover:text-gray-900 hover:shadow-sm"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Go Back</span>
          </button>

          {/* Search Results Header */}
          {searchQuery && (
            <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center gap-3">
                <Search className="h-6 w-6 text-[#009393]" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h1>
              </div>
              {!isLoading && (
                <p className="text-gray-600">
                  Found{" "}
                  <span className="font-semibold text-[#009393]">
                    {filteredProducts?.length || 0}
                  </span>{" "}
                  results for{" "}
                  <span className="font-bold text-gray-900">
                    "{searchQuery}"
                  </span>
                  {selectedCategory && (
                    <>
                      {" "}
                      in{" "}
                      <span className="font-semibold text-[#009393]">
                        {selectedCategory}
                      </span>
                    </>
                  )}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Filters Section */}
        {
          <div className="mb-12 xl:mb-10">
            <MemoizedFilterButtons />
          </div>
        }

        {/* Content Section */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner />
          </div>
        ) : filteredProducts?.length > 0 ? (
          <>
            <div
              ref={gridRef}
              className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] justify-items-center gap-6"
            >
              {paginatedProducts.map((product) => (
                <MemoizedProductCard
                  key={product.id}
                  product={product}                  
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 rounded-lg bg-white py-4 shadow-sm">
                {/* Previous */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 px-2 py-2 text-gray-700 transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white min-[500px]:px-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-xs min-[500px]:text-base">
                    Previous
                  </span>
                </button>

                {/* Page Numbers */}
                <div className="flex flex-wrap justify-center gap-1">
                  {renderPageNumbers()}
                </div>

                {/* Next */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 px-2 py-2 text-gray-700 transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white min-[500px]:px-4"
                >
                  <span className="text-xs min-[500px]:text-base">Next</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <NoResults
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        )}
      </div>
    </div>
  );
});

ProductPage.displayName = "ProductPage";

export default ProductPage;
