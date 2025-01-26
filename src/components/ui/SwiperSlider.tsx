import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

const SwiperSlider: React.FC = () => {
  return (
    <div className="flex p-4">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="mx-auto flex w-full max-w-3xl gap-4"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <SwiperSlide key={index}>
            <div className="flex h-64 items-center justify-center rounded-lg bg-blue-500 text-2xl text-white">
              Slide {index + 1}
            </div>
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>
          <div className="flex h-64 items-center justify-center rounded-lg bg-green-500 text-2xl text-white">
            Slide 2
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-64 items-center justify-center rounded-lg bg-purple-500 text-2xl text-white">
            Slide 3
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-64 items-center justify-center rounded-lg bg-red-500 text-2xl text-white">
            Slide 4
          </div>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
