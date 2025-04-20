// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import MainProduct from "../ui/MainProduct";
// import {
//   faArrowRight,
//   faChevronRight,
// } from "@fortawesome/free-solid-svg-icons";
// import SplitContentCard from "../ui/SplitContentCard";
// import LogoStack from "../ui/LogoStack";

// function Main() {
//   return (
//     <main className="col-span-1 row-span-1 mb-4">
//       <MainProduct />

//       {/* bg-red-700 */}
//       <div className="relative mb-4 flex w-[48.25rem] gap-7 overflow-hidden pb-10 pt-6">
//         <div className="absolute right-0 top-[calc(50%-1rem)] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white">
//           <FontAwesomeIcon icon={faChevronRight} />
//         </div>
//         {/* w-[11.875rem] */}
//         <div className="min-w-48 flex-1 rounded-xl bg-white px-2.5 pb-2.5 pt-2.5">
//           <img
//             className="mx-auto mb-4"
//             src="images/Beats_Solo3_Wireless.png"
//             alt="Beats Solo3 Wireless"
//           />
//           <h4 className="mb-1 font-openSans text-sm font-semibold text-black">
//             Beats Solo3 Wireless
//           </h4>

//           <p className="mb-1 text-sm font-semibold text-[#5C5C5C]">
//             Price $333.20
//           </p>

//           <div className="flex items-center gap-2">
//             <img src="images/Rating_Icon_Green.png" />
//             <span className="font-roboto text-sm font-medium text-[#00E0C6]">
//               4.9
//             </span>
//             <span className="ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#009393] text-white">
//               +
//             </span>
//           </div>
//         </div>
//         {/* w-48 */}
//         <div className="min-w-48 flex-1 rounded-xl bg-white px-2.5 pb-2.5 pt-2.5">
//           <img
//             className="mx-auto mb-4"
//             src="images/Beats_Solo3_Wireless.png"
//             alt="Beats Solo3 Wireless"
//           />
//           <h4 className="mb-1 font-openSans text-sm font-semibold text-black">
//             Beats Solo3 Wireless
//           </h4>

//           <p className="mb-1 text-sm font-semibold text-[#5C5C5C]">
//             Price $333.20
//           </p>

//           <div className="flex items-center gap-2">
//             <img src="images/Rating_Icon_Green.png" />
//             <span className="font-roboto text-sm font-medium text-[#00E0C6]">
//               4.9
//             </span>
//             <span className="ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#009393] text-white">
//               +
//             </span>
//           </div>
//         </div>
//         {/* w-48 */}
//         <div className="min-w-48 flex-1 rounded-xl bg-white px-2.5 pb-2.5 pt-2.5">
//           <img
//             className="mx-auto mb-4"
//             src="images/Beats_Solo3_Wireless.png"
//             alt="Beats Solo3 Wireless"
//           />
//           <h4 className="mb-1 font-openSans text-sm font-semibold text-black">
//             Beats Solo3 Wireless
//           </h4>

//           <p className="mb-1 text-sm font-semibold text-[#5C5C5C]">
//             Price $333.20
//           </p>

//           <div className="flex items-center gap-2">
//             <img src="images/Rating_Icon_Green.png" />
//             <span className="font-roboto text-sm font-medium text-[#00E0C6]">
//               4.9
//             </span>
//             <span className="ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#009393] text-white">
//               +
//             </span>
//           </div>
//         </div>
//         {/* w-48 */}
//         <div className="min-w-48 rounded-xl bg-white px-2.5 pb-2.5 pt-2.5">
//           <img
//             className="mx-auto mb-4"
//             src="images/Beats_Solo3_Wireless.png"
//             alt="Beats Solo3 Wireless"
//           />
//           <h4 className="mb-1 font-openSans text-sm font-semibold text-black">
//             Beats Solo3 Wireless
//           </h4>

//           <p className="mb-1 text-sm font-semibold text-[#5C5C5C]">
//             Price $333.20
//           </p>

//           <div className="flex items-center gap-2">
//             <img src="images/Rating_Icon_Green.png" />
//             <span className="font-roboto text-sm font-medium text-[#00E0C6]">
//               4.9
//             </span>
//             <span className="ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#009393] text-white">
//               +
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="mb-8 flex items-center gap-6">
//         <h3 className="font-roboto text-2xl font-semibold text-[#016170]">
//           Explore Popular Categories
//         </h3>
//         <button className="flex items-center gap-1 text-sm font-medium text-[#5C5C5C] underline">
//           See all
//           <span>
//             <FontAwesomeIcon icon={faArrowRight} />
//             {/* <img src="images/arrow-right.png" alt="Arrow right" /> */}
//           </span>
//         </button>
//       </div>

// {/* <SplitContentCard /> */}
// <div className="flex gap-9">
//   <SplitContentCard
//     title="Popular top 10 brands"
//     description="5,400+ Orders & reviews"
//   >
//     <LogoStack
//       images={[
//         { src: "images/sony.png", alt: "Sony" },
//         { src: "images/apple.png", alt: "Apple" },
//         { src: "images/bing.png", alt: "Bing" },
//         { src: "images/lenovo.png", alt: "Lenovo" },
//       ]}
//     />
//   </SplitContentCard>
//   <SplitContentCard
//     title="Newest Sellers"
//     description="4,600+ Orders & reviews"
//   >
//     <LogoStack
//       images={[
//         { src: "images/avatar-1.png", alt: "Avatar1" },
//         { src: "images/avatar-2.png", alt: "Avatar2" },
//         { src: "images/avatar-3.png", alt: "Avatar3" },
//         { src: "images/avatar-4.png", alt: "Avatar4" },
//       ]}
//     />
//   </SplitContentCard>
// </div>
//     </main>
//   );
// }

// export default Main;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import MainProduct from "../ui/MainProduct";
import SplitContentCard from "../ui/SplitContentCard";
import LogoStack from "../ui/LogoStack";
import ProductCard from "../ui/ProductCard";
import { useQuery } from "@tanstack/react-query";
import {
  getBestSellingProducts,
  getHighlyRatedProducts,
  getNewestProducts,
} from "../../services/getDailyDealsProducts";
import { Product } from "src/types";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Spinner from "../ui/Spinner";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Use this
// import "swiper/swiper.min.css";
// import { Navigation } from "swiper/modules";
// import "swiper/css/navigation"; // Note: path might vary based on version

// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper";
// import { Navigation } from "swiper/modules";
// import { Navigation } from "swiper/modules";

// import { Navigation } from "swiper/modules";

function Main() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getHighlyRatedProducts,
  });

  const filteredData = data?.filter(
    (data: Product) =>
      data.category !== "beauty" &&
      data.category !== "fragrances" &&
      data.category !== "furniture" &&
      data.category !== "groceries",
  );
  console.log("new", data, filteredData);

  return (
    <main className="col-span-1 row-span-1 mb-4">
      <MainProduct />
      {/* Scrollable Product List */}
      {/* <div className="relative mb-4 flex w-[48.25rem] gap-7 overflow-x-hidden"> */}
      {/* Swiper Slider */}
      {/* <Swiper

          modules={[Navigation]}

          slidesPerView={3.5} // Show 3 full products & half of the 4th

          spaceBetween={28} // 28px gap

          navigation={{ nextEl: ".next", prevEl: ".prev" }}

          className="overflow-hidden"

        >

          {data?.map((product: Product, index: number) => (

            <SwiperSlide key={index}>

              <ProductCard

                imgSrc={product.thumbnail}

                title={product.title}

                price={product.price}

                rating={product.rating}

              />

            </SwiperSlide>

          ))}

        </Swiper> */}
      {/* <Swiper
        modules={[Navigation]}
        slidesPerView={"auto"} // Show 3 full slides + 0.5 of the next
        spaceBetween={28} // Maintain 28px gap between slides
        navigation={{ nextEl: ".next", prevEl: ".prev" }}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 1000 }}
        // className="relative mb-4 flex w-[48.25rem] gap-7 overflow-hidden"
        className="relative mb-4 flex w-[48.25rem] gap-7 overflow-hidden px-4 pb-6 pt-6"
      >
        <div className="relative mb-4 flex w-[48.25rem] gap-7 overflow-x-hidden pb-10 pt-6">
          {data?.map((product: Product, index: number) => (
            <SwiperSlide
              key={index}
              style={{ width: "12rem" }}
              // className="min-w-48 flex-1 rounded-xl bg-white px-2.5 pb-2.5 pt-2.5 shadow-md"

              className="rounded-xl bg-white p-4 shadow-md"
            >
              <ProductCard
                imgSrc={product.thumbnail}
                title={product.title}
                price={product.price}
                rating={product.rating}
              />
            </SwiperSlide>
          ))}

          <button className="absolute right-0 top-[calc(50%-1rem)] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          <button className="absolute left-0 top-[calc(50%-1rem)] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
      </Swiper> */}
      {isLoading && <Spinner />}
      {isError && (
        <p className="text-center text-red-500">Error fetching products.</p>
      )}
      {/* (isError) && <h1>Something went wrong</h1>; */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={"auto"}
        spaceBetween={28}
        navigation={{ nextEl: ".next", prevEl: ".prev" }}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 1000 }}
        className="relative mb-4 w-[48.25rem]"
        style={{ padding: "1.5rem 0rem 2.5rem" }}
      >
        {/* Gradient Overlay for Fade Effect */}
        <div
          className="absolute right-0 z-10 w-36 bg-gradient-to-l from-white to-transparent"
          style={{ height: "calc(100% - 4rem)", top: "1.5rem" }}
        />

        {/* Right Scroll Button */}
        <button className="next absolute right-0 top-[calc(50%-1rem)] z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        {/* Left Scroll Button */}
        <button className="prev absolute left-0 top-[calc(50%-1rem)] z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {data?.map((product: Product, index: number) => (
          <SwiperSlide key={index} style={{ width: "12rem" }}>
            <ProductCard
              id={product.id}
              imgSrc={product.thumbnail}
              title={product.title}
              price={product.price}
              rating={product.rating}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Render Products */}
      {/* {data?.map((product: Product, index: number) => (
        <ProductCard
          key={index}
          imgSrc={product.thumbnail}
          title={product.title}
          price={product.price}
          rating={product.rating}
        />
      ))} */}
      {/* </div> */}
      {/* Explore Categories */}
      <div className="mb-8 flex items-center gap-6">
        <h3 className="font-roboto text-2xl font-semibold text-[#016170]">
          Explore Popular Categories
        </h3>
        <button className="flex items-center gap-1 text-sm font-medium text-[#5C5C5C] underline">
          See all
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      {/* Split Content Cards */}
      <div className="flex gap-9">
        <SplitContentCard
          title="Popular top 10 brands"
          description="5,400+ Orders & reviews"
        >
          <LogoStack
            images={[
              { src: "images/sony.png", alt: "Sony" },
              { src: "images/apple.png", alt: "Apple" },
              { src: "images/bing.png", alt: "Bing" },
              { src: "images/lenovo.png", alt: "Lenovo" },
            ]}
          />
        </SplitContentCard>
        <SplitContentCard
          title="Newest Sellers"
          description="4,600+ Orders & reviews"
        >
          <LogoStack
            images={[
              { src: "images/avatar-1.png", alt: "Avatar1" },
              { src: "images/avatar-2.png", alt: "Avatar2" },
              { src: "images/avatar-3.png", alt: "Avatar3" },
              { src: "images/avatar-4.png", alt: "Avatar4" },
            ]}
          />
        </SplitContentCard>
      </div>
    </main>
  );
}

export default Main;

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowRight,
//   faChevronLeft,
//   faChevronRight,
// } from "@fortawesome/free-solid-svg-icons";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";

// import MainProduct from "../ui/MainProduct";
// import SplitContentCard from "../ui/SplitContentCard";
// import LogoStack from "../ui/LogoStack";
// import ProductCard from "../ui/ProductCard";
// import { useQuery } from "@tanstack/react-query";
// import { getHighlyRatedProducts } from "../../services/getDailyDealsProducts";
// import { Product } from "src/types";

// function Main() {
//   const { data } = useQuery({
//     queryKey: ["products"],
//     queryFn: getHighlyRatedProducts,
//   });

//   return (
//     <main className="col-span-1 row-span-1 mb-4">
//       <MainProduct />

//       {/* Product Slider */}
//       <div className="relative mb-4 w-[48.25rem] pb-10 pt-6">
//         {/* Swiper Slider */}
//         {/* <Swiper
//           modules={[Navigation]}
//           slidesPerView={3.5} // Show 3 full products & half of the 4th
//           spaceBetween={28} // 28px gap
//           navigation={{ nextEl: ".next", prevEl: ".prev" }}
//           className="overflow-hidden"
//         >
//           {data?.map((product: Product, index: number) => (
//             <SwiperSlide key={index}>
//               <ProductCard
//                 imgSrc={product.thumbnail}
//                 title={product.title}
//                 price={product.price}
//                 rating={product.rating}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper> */}
//         {/* Gradient Overlay for Fade Effect */}
//         {/* <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" /> */}
//         <Swiper
//           modules={[Navigation]}
//           slidesPerView={"auto"} // Show 3 full slides + 0.5 of the next
//           spaceBetween={28} // Maintain 28px gap between slides
//           navigation={{ nextEl: ".next", prevEl: ".prev" }}
//           pagination={{ clickable: true }}
//           loop={true}
//           autoplay={{ delay: 1000 }}
//           className="overflow-hidden"
//         >
//           {data?.map((product: Product, index: number) => (
//             <SwiperSlide
//               key={index}
//               style={{ width: "12rem" }}
//               // className="!w-48"
//             >
//               <ProductCard
//                 imgSrc={product.thumbnail}
//                 title={product.title}
//                 price={product.price}
//                 rating={product.rating}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Navigation Buttons */}
//         <button className="prev absolute left-[-40px] top-[50%] z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
//           <FontAwesomeIcon icon={faChevronLeft} />
//         </button>
//         <button className="next absolute right-[-40px] top-[50%] z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
//           <FontAwesomeIcon icon={faChevronRight} />
//         </button>
//       </div>

//       <div className="mb-8 flex items-center gap-6">
// //         <h3 className="font-roboto text-2xl font-semibold text-[#016170]">
// //           Explore Popular Categories
// //         </h3>

// //         <button className="flex items-center gap-1 text-sm font-medium text-[#5C5C5C] underline">
// //           See all
// //           <FontAwesomeIcon icon={faArrowRight} />
// //         </button>
//       </div>

//      {/* Split Content Cards */}

//        <div className="flex gap-9">
//         <SplitContentCard
//           title="Popular top 10 brands"
//           description="5,400+ Orders & reviews"
//         >
//           <LogoStack
//             images={[
//               { src: "images/sony.png", alt: "Sony" },

//               { src: "images/apple.png", alt: "Apple" },

//               { src: "images/bing.png", alt: "Bing" },

//               { src: "images/lenovo.png", alt: "Lenovo" },
//             ]}
//           />
//         </SplitContentCard>

//         <SplitContentCard
//           title="Newest Sellers"
//           description="4,600+ Orders & reviews"
//         >
//           <LogoStack
//             images={[
//               { src: "images/avatar-1.png", alt: "Avatar1" },

//               { src: "images/avatar-2.png", alt: "Avatar2" },

//               { src: "images/avatar-3.png", alt: "Avatar3" },

//               { src: "images/avatar-4.png", alt: "Avatar4" },
//             ]}
//           />
//         </SplitContentCard>
//       </div>
//     </main>
//   );
// }

// export default Main;

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowRight,
//   faChevronRight,
// } from "@fortawesome/free-solid-svg-icons";
// import MainProduct from "../ui/MainProduct";
// import SplitContentCard from "../ui/SplitContentCard";
// import LogoStack from "../ui/LogoStack";
// import { useQuery } from "@tanstack/react-query";
// import { getHighlyRatedProducts } from "../../services/getDailyDealsProducts";
// import { Product } from "src/types";

// // Import Swiper components and styles
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import ProductCard from "../ui/ProductCard";

// function Main() {
//   const { data } = useQuery({
//     queryKey: ["products"],
//     queryFn: getHighlyRatedProducts,
//   });

//   const filteredData = data?.filter(
//     (data: Product) =>
//       data.category !== "beauty" &&
//       data.category !== "fragrances" &&
//       data.category !== "furniture" &&
//       data.category !== "groceries",
//   );

//   return (
//     <main className="col-span-1 row-span-1 mb-4">
//       <MainProduct />

//       {/* Swiper Slider */}
//       <div className="relative mb-4 w-[48.25rem] overflow-hidden pb-10 pt-6">
//         {/* Gradient Overlay for Fade Effect */}
//         <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

//         <Swiper
//           modules={[Navigation]}
//           spaceBetween={28} // 28px gap between slides
//           slidesPerView={3.5} // 3.5 slides (3 full + 1 half)
//           navigation={{
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//           }}
//           className="swiper-container"
//         >
//           {filteredData?.map((product: Product, index: number) => (
//             <SwiperSlide key={index} className="w-auto">
//               <ProductCard
//                 imgSrc={product.thumbnail}
//                 title={product.title}
//                 price={product.price}
//                 rating={product.rating}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Custom Navigation Buttons */}
//         <div className="swiper-button-next absolute right-0 top-[calc(50%-1rem)] z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md">
//           <FontAwesomeIcon icon={faChevronRight} />
//         </div>
//         <div className="swiper-button-prev absolute left-0 top-[calc(50%-1rem)] z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md">
//           <FontAwesomeIcon icon={faChevronRight} className="rotate-180" />
//         </div>
//       </div>

//       {/* Explore Categories */}
//       <div className="mb-8 flex items-center gap-6">
//         <h3 className="font-roboto text-2xl font-semibold text-[#016170]">
//           Explore Popular Categories
//         </h3>
//         <button className="flex items-center gap-1 text-sm font-medium text-[#5C5C5C] underline">
//           See all
//           <FontAwesomeIcon icon={faArrowRight} />
//         </button>
//       </div>

//       {/* Split Content Cards */}
//       <div className="flex gap-9">
//         <SplitContentCard
//           title="Popular top 10 brands"
//           description="5,400+ Orders & reviews"
//         >
//           <LogoStack
//             images={[
//               { src: "images/sony.png", alt: "Sony" },
//               { src: "images/apple.png", alt: "Apple" },
//               { src: "images/bing.png", alt: "Bing" },
//               { src: "images/lenovo.png", alt: "Lenovo" },
//             ]}
//           />
//         </SplitContentCard>
//         <SplitContentCard
//           title="Newest Sellers"
//           description="4,600+ Orders & reviews"
//         >
//           <LogoStack
//             images={[
//               { src: "images/avatar-1.png", alt: "Avatar1" },
//               { src: "images/avatar-2.png", alt: "Avatar2" },
//               { src: "images/avatar-3.png", alt: "Avatar3" },
//               { src: "images/avatar-4.png", alt: "Avatar4" },
//             ]}
//           />
//         </SplitContentCard>
//       </div>
//     </main>
//   );
// }

// export default Main;
