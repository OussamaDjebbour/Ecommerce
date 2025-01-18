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
// <div className="relative mb-4 flex w-[48.25rem] gap-7 overflow-hidden pb-10 pt-6">
//   <div className="absolute right-0 top-[calc(50%-1rem)] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white">
//     <FontAwesomeIcon icon={faChevronRight} />
//   </div>
//         {/* w-[11.875rem] */}
// <div className="min-w-48 flex-1 rounded-xl bg-white px-2.5 pb-2.5 pt-2.5">
//   <img
//     className="mx-auto mb-4"
//     src="images/Beats_Solo3_Wireless.png"
//     alt="Beats Solo3 Wireless"
//   />
//   <h4 className="mb-1 font-openSans text-sm font-semibold text-black">
//     Beats Solo3 Wireless
//   </h4>

//   <p className="mb-1 text-sm font-semibold text-[#5C5C5C]">
//     Price $333.20
//   </p>

//   <div className="flex items-center gap-2">
//     <img src="images/Rating_Icon_Green.png" />
//     <span className="font-roboto text-sm font-medium text-[#00E0C6]">
//       4.9
//     </span>
//     <span className="ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#009393] text-white">
//       +
//     </span>
//   </div>
// </div>
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

// <div className="mb-8 flex items-center gap-6">
//   <h3 className="font-roboto text-2xl font-semibold text-[#016170]">
//     Explore Popular Categories
//   </h3>
//   <button className="flex items-center gap-1 text-sm font-medium text-[#5C5C5C] underline">
//     See all
//     <span>
//       <FontAwesomeIcon icon={faArrowRight} />
//       {/* <img src="images/arrow-right.png" alt="Arrow right" /> */}
//     </span>
//   </button>
// </div>

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
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import MainProduct from "../ui/MainProduct";
import SplitContentCard from "../ui/SplitContentCard";
import LogoStack from "../ui/LogoStack";
import ProductCard from "../ui/ProductCard";

function Main() {
  return (
    <main className="col-span-1 row-span-1 mb-4">
      <MainProduct />

      {/* Scrollable Product List */}
      <div className="relative mb-4 flex w-[48.25rem] gap-7 overflow-x-hidden pb-10 pt-6">
        {/* Right Scroll Button */}
        <button className="absolute right-0 top-[calc(50%-1rem)] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        {/* Render Products */}
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <ProductCard
              key={index}
              imgSrc="images/Beats_Solo3_Wireless.png"
              title="Beats Solo3 Wireless"
              price="$333.20"
              rating="4.9"
            />
          ))}
      </div>

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
