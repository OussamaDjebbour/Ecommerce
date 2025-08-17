import { ChevronLeft, ChevronRight } from "lucide-react";
import { LayoutContextType, Product } from "src/types";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Spinner from "../ui/Spinner";
import ErrorMessage from "../ui/ErrorMessage";
import MainProduct from "../ui/MainProduct";
import ProductCard from "../ui/ProductCard";
import { getHighlyRatedProducts } from "../../services/getHighlyRatedProducts";

function Main() {
  const { isMainProductLoaded, setIsMainProductLoaded } =
    useOutletContext<LayoutContextType>();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getHighlyRatedProducts,
    enabled: isMainProductLoaded, // Only fetch after MainProduct loads
  });

  function handleLoad() {
    setIsMainProductLoaded(true);
  }

  return (
    <main className="min-w-0 py-10 pb-4 xl:col-span-1 xl:row-span-1 xl:px-0 xl:py-0">
      <MainProduct onLoad={handleLoad} />

      {isLoading && <Spinner />}
      {isError && <ErrorMessage message={error.message} />}
      <Swiper
        modules={[Navigation]}
        slidesPerView={"auto"}
        spaceBetween={28}
        navigation={{ nextEl: ".next", prevEl: ".prev" }}
        pagination={{ clickable: true }}
        loop={products && products.length > 3}
        autoplay={{ delay: 3000 }}
        className="relative mb-4 w-auto xl:w-auto xl:max-w-[48.25rem]"
        style={{ padding: "1.5rem 0rem 2.5rem" }}
      >
        {/* Gradient Overlay for Fade Effect */}
        <div
          className="absolute right-0 z-10 w-36 bg-gradient-to-l from-white to-transparent"
          style={{ height: "calc(100% - 4rem)", top: "1.5rem" }}
        />

        {/* Right Scroll Button */}
        <button className="next absolute right-0 top-[calc(50%-1rem)] z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md">
          <ChevronRight />
        </button>

        {/* Left Scroll Button */}
        <button className="prev absolute left-0 top-[calc(50%-1rem)] z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md">
          <ChevronLeft />
        </button>

        {products?.map((product: Product, index: number) => (
          <SwiperSlide key={index} style={{ width: "18rem" }}>
            <ProductCard
              product={product}
              key={product.id}
              id={product.id}
              imgSrc={product.thumbnail}
              title={product.title}
              price={product.price}
              rating={product.rating}
              stock={product.stock}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}

export default Main;
