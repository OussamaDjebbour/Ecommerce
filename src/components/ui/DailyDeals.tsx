import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Clock } from "lucide-react";
import { getDailyDealsProducts } from "../../services/getDailyDealsProducts";
import ProductWithDailyDeal from "./ProductWithDailyDeal";
import { Product } from "../../types";
import SkeletonProduct from "../ui/SkeletonProduct";
import ErrorMessage from "../ui/ErrorMessage";

interface DailyDealsProps {
  isMainProductLoaded: boolean;
}

function DailyDeals({ isMainProductLoaded }: DailyDealsProps) {
  const {
    data: dailyDealsProducts,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["dailyDealsProducts"],
    queryFn: getDailyDealsProducts,
    enabled: isMainProductLoaded,
  });

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="w-full lg:max-w-none xl:ml-auto xl:max-w-md">
      {/* Header Section */}
      {dailyDealsProducts && (
        <div className="mb-6 ml-12 xl:ml-0">
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-[#009393] to-[#016170] p-2 shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className="bg-gradient-to-r from-[#016170] to-[#009393] bg-clip-text text-2xl font-bold text-transparent">
              Daily Deals
            </h3>
          </div>

          {/* Subtitle with timer effect */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Limited time offers • Updated daily</span>
            <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <SkeletonProduct key={index} />
          ))}
        </div>
      )}

      {/* Products List */}
      {dailyDealsProducts && (
        <div className="grid w-full grid-cols-[1fr] justify-items-center space-y-2.5 lg:grid-cols-2 lg:gap-8 lg:space-y-0 lg:px-6 xl:grid-cols-1 xl:gap-2.5 xl:px-0">
          {dailyDealsProducts.map((product: Product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductWithDailyDeal
                product={product}
                image={product.thumbnail}
                title={product.title}
                price={product.price}
                nbrOfReviews={product.reviews?.length || 0}
                nbrOfProductsInStock={product.stock}
              />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {dailyDealsProducts && dailyDealsProducts.length === 0 && (
        <div className="py-12 text-center">
          <TrendingUp className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <p className="text-gray-500">No daily deals available right now.</p>
          <p className="mt-1 text-sm text-gray-400">
            Check back later for amazing offers!
          </p>
        </div>
      )}
    </div>
  );
}

export default DailyDeals;
