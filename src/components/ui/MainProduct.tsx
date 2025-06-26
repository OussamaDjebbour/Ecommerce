// import { useState } from "react";
// import ColorRadioButtons from "./ColorRadioButtons";
// import ColorPicker from "./ColorPicker";
// import ProductQuantity from "./ProductQuantity";
// import { useQuery } from "@tanstack/react-query";
// import { fetchMainProduct } from "../../services/fetchMainProduct";

// const colors = [
//   { name: "teal", bg: "bg-[#00AD97]", ring: "ring-[#00AD97]" },
//   { name: "blue", bg: "bg-[#4BA3E5]", ring: "ring-[#4BA3E5]" },
//   { name: "orange", bg: "bg-[#E27373] ", ring: "ring-[#E27373] " },
//   { name: "green", bg: "bg-[#75E573] ", ring: "ring-[#75E573] " },
// ];

// function MainProduct() {
//   const PRICE = 349.95;

//   const [quantity, setQuantity] = useState(1);
//   const [price, setPrice] = useState(PRICE);

//   const [selectedColor, setSelectedColor] = useState<string>(colors[0].name);

//   const { data: mainProduct } = useQuery({
//     queryKey: ["search"],
//     queryFn: fetchMainProduct,
//   });

//   console.log("mainProduct", mainProduct);

//   return (
//     // pr-8
//     <div className="mb-8 flex max-w-[45.5rem] items-center gap-12 bg-white pb-6 pl-7 pr-3 pt-3">
//       <div className="relative">
//         <img
//           // className="bg-white"
//           // className={`filter ${
//           //   selectedColor === "red" ? "hue-rotate-20 saturate-200 sepia" : ""
//           // }`}
//           // className={`filter ${selectedColor && "hue-rotate-180 saturate-200"}`}
//           // src={mainProduct?.thumbnail}
//           src={`/images/Main_Product_${selectedColor}.png`}
//           alt="Main Product"
//         />
//         {/* Color Overlay */}
//         {/* <div
//           className={`absolute left-0 top-0 h-full w-full ${
//             colors.find((color) => color.name === selectedColor)?.bg
//           } opacity-50`}
//         ></div> */}
//       </div>

//       <div>
//         <h3 className="mb-1 text-xl font-medium text-black">
//           Beats Studio3 Wireless Headphone
//         </h3>

//         {/* mb-[1.125rem] */}
//         <div className="mb-4 flex gap-2">
//           <img src="images/Rating_Icon.png" />
//           <img src="images/Rating_Icon.png" />
//           <img src="images/Rating_Icon.png" />
//           <img src="images/Rating_Icon.png" />
//           <img src="images/Rating_Icon.png" />
//           <span className="text-sm font-normal text-[#5C5C5C]">
//             (2000+ Reviews)
//           </span>
//         </div>

//         <p className="mb-[1.125rem] mr-3 text-xs font-normal text-[#5C5C5C]">
//           Ergonomic ear cups with on-ear controls. Up to 22 hours of listening
//           time. Apple W1 chip & Class 1 Wireless Bluetooth.
//         </p>

//         <p className="mb-[1.125rem] text-lg font-medium text-[#009393]">
//           {/* Price $349.95 */}
//           Price ${price.toFixed(2)}
//         </p>

//         <div className="mb-8 flex justify-between">
//           <div className="flex items-center">
//             <p className="text-base font-medium text-black">Color</p>

//             {/* <div className="ml-4 flex gap-2">
//   <div className="h-6 w-6 rounded-full bg-sky-500" />
//   <div className="h-6 w-6 rounded-full bg-red-500" />
//   <div className="h-6 w-6 rounded-full bg-pink-500" />
//   <div className="h-6 w-6 rounded-full bg-teal-500" />
// </div> */}
//             {/* <div className="ml-4 flex gap-2">
//   {["sky-500", "red-500", "pink-500", "teal-500"].map((color) => (
//     <label key={color}>
//       <input
//         type="radio"
//         name="color"
//         value={color}
//         checked={selectedColor === color}
//         className="hnameden"
//         onChange={() => setSelectedColor(color)}
//       />
//       <div
//         className={`h-6 w-6 rounded-full bg-${color} cursor-pointer`}
//       />
//     </label>
//   ))}
// </div> */}

//             {/* <ColorRadioButtons /> */}
//             {/* <ColorPicker  /> */}
//             <ColorPicker
//               selectedColor={selectedColor}
//               setSelectedColor={setSelectedColor}
//               colors={colors}
//             />
//           </div>
//           {/* <ProductQuantity /> */}
//           <ProductQuantity
//             quantity={quantity}
//             setQuantity={setQuantity}
//             setPrice={setPrice}
//           />
//         </div>

//         <div className="flex gap-5">
//           <button className="rounded-xl border-2 border-[#009393] px-4 py-3">
//             <img src="images/fi-sr-heart.png " alt="Heart Icon" />
//           </button>

//           <button className="w-[8.125rem] rounded-lg border-2 border-[#009393] py-2 font-medium text-[#009393]">
//             Add to cart
//           </button>

//           <button className="w-[8.125rem] rounded-lg bg-[#009393] py-2 font-medium text-white">
//             Buy now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainProduct;

// import { useEffect, useRef, useState } from "react";
// import ProductQuantity from "./ProductQuantity";
// import { useQuery } from "@tanstack/react-query";
// import { fetchMainProduct } from "../../services/fetchMainProduct";
// import { set } from "react-hook-form";
// import Spinner from "./Spinner";
// import { on } from "events";

// function MainProduct() {
//   // const PRICE = 349.95;

//   const [quantity, setQuantity] = useState(1);
//   // const [price, setPrice] = useState(PRICE);

//   const { data: mainProduct, isLoading } = useQuery({
//     queryKey: ["search"],
//     queryFn: fetchMainProduct,
//   });

//   const [price, setPrice] = useState(0);

//   const [currentImage, setCurrentImage] = useState(
//     () => mainProduct?.images[0],
//   );

//   // let oneProductPrice;
//   // const oneProductPriceRef = useRef<number>(0);

//   useEffect(() => {
//     if (mainProduct?.price) {
//       // oneProductPriceRef.current = mainProduct?.price;
//       setPrice(mainProduct.price);
//     }
//   }, [mainProduct?.price]);

//   // Set currentImage only when mainProduct.images[0] exists
//   useEffect(() => {
//     if (mainProduct?.images?.[0] && !currentImage) {
//       setCurrentImage(mainProduct.images[0]);
//     }
//   }, [mainProduct?.images, currentImage]);

//   console.log(
//     "mainProduct",
//     mainProduct,
//     currentImage,
//     Math.floor(mainProduct?.rating),
//     price,
//   );

//   if (isLoading) return <Spinner />;

//   return (
//     mainProduct &&
//     oneProductPriceRef.current && (
//       <div className="mb-8 flex max-w-[45.5rem] items-center gap-12 bg-white pb-6 pl-7 pr-3 pt-3">
//         <div className="relative">
//           <div className="carousel w-full">
//             <img
//               src={
//                 currentImage || mainProduct?.images[0] || mainProduct?.thumbnail
//               }
//               // src="/images/Main_Product_green.png"
//               alt="Main Product"
//               className="min-w-44 max-w-44"
//               // className="w-full"
//             />
//             {/* <div className="thumbnails mt-2 flex justify-center">
//           <img
//             src="/images/Main_Product_teal.png"
//             alt="Thumbnail 1"
//             className="mr-2 w-12 cursor-pointer"
//             onClick={() => setCurrentImage("/images/Main_Product_teal.png")}
//           />
//           <img
//             src="/images/Main_Product_blue.png"
//             alt="Thumbnail 2"
//             className="mr-2 w-12 cursor-pointer"
//             onClick={() => setCurrentImage("/images/Main_Product_blue.png")}
//           />
//           <img
//             src="/images/Main_Product_orange.png"
//             alt="Thumbnail 3"
//             className="w-12 cursor-pointer"
//             onClick={() => setCurrentImage("/images/Main_Product_orange.png")}
//           />
//         </div> */}
//             <div className="thumbnails mt-2 flex justify-center">
//               {mainProduct?.images.map((image) => (
//                 <button
//                   key={image}
//                   onClick={() => setCurrentImage(image)}
//                   className={`rounded-md transition-all duration-200 ${currentImage === image ? "ring-2 ring-[#009393] ring-offset-2" : "hover:opacity-75"} `}
//                 >
//                   <img
//                     src={image}
//                     alt={mainProduct.title}
//                     className="mr-2 w-12 cursor-pointer"
//                     onClick={() => setCurrentImage(image)}
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div>
//           <h3 className="mb-1 text-xl font-medium text-black">
//             {/* Beats Studio3 Wireless Headphone */}
//             {mainProduct?.title}
//           </h3>

//           <div className="mb-4 flex gap-2">
//             {/* <img src="images/Rating_Icon.png" />
//             <img src="images/Rating_Icon.png" />
//             <img src="images/Rating_Icon.png" />
//             <img src="images/Rating_Icon.png" />
//             <img src="images/Rating_Icon.png" /> */}
//             {[...Array(5)].map((_, index) => (
//               <svg
//                 key={index}
//                 className={`h-6 w-6 ${index < mainProduct.rating ? "text-yellow-400" : "text-gray-300"}`}
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//             ))}
//             <span className="text-sm font-normal text-[#5C5C5C]">
//               {/* (2000+ Reviews) */}({Math.round(mainProduct.rating * 100)}{" "}
//               Reviews)
//             </span>
//           </div>

//           <p className="mb-[1.125rem] mr-3 text-xs font-normal text-[#5C5C5C]">
//             {/* Ergonomic ear cups with on-ear controls. Up to 22 hours of listening
//         time. Apple W1 chip & Class 1 Wireless Bluetooth. */}
//             {mainProduct?.description}
//           </p>

//           <p className="mb-[1.125rem] text-lg font-medium text-[#009393]">
//             Price ${price?.toFixed(2)}
//           </p>

//           <div className="mb-8 flex justify-between">
//             <ProductQuantity
//               quantity={quantity}
//               oneProductPriceRef={oneProductPriceRef}
//               productsInStock={mainProduct?.stock}
//               setQuantity={setQuantity}
//               setPrice={setPrice}
//             />

//             <p className="text-base font-bold text-[#5C5C5C]">
//               {mainProduct?.stock}{" "}
//               <span className="font-medium">items left</span>
//             </p>
//           </div>

//           <div className="flex gap-5">
//             <button className="rounded-xl border-2 border-[#009393] px-4 py-3">
//               <img src="images/fi-sr-heart.png" alt="Heart Icon" />
//             </button>

//             <button className="w-[8.125rem] rounded-lg border-2 border-[#009393] py-2 font-medium text-[#009393]">
//               Add to cart
//             </button>

//             <button className="w-[8.125rem] rounded-lg bg-[#009393] py-2 font-medium text-white">
//               Buy now
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   );
// }

// export default MainProduct;

// import { useEffect, useState } from "react";
// import ProductQuantity from "./ProductQuantity";
// import { useQuery } from "@tanstack/react-query";
// import { fetchMainProduct } from "../../services/fetchMainProduct";
// import Spinner from "./Spinner";

// function MainProduct() {
//   const [quantity, setQuantity] = useState(1);
//   const [basePrice, setBasePrice] = useState(0);
//   const [currentImage, setCurrentImage] = useState("");

//   const { data: mainProduct, isLoading } = useQuery({
//     queryKey: ["search"],
//     queryFn: fetchMainProduct,
//   });

//   // useEffect(() => {
//   //   if (mainProduct?.price) {
//   //     setBasePrice(mainProduct.price);
//   //   }
//   //   if (mainProduct?.images?.[0] && !currentImage) {
//   //     setCurrentImage(mainProduct.images[0]);
//   //   }
//   // }, [mainProduct, currentImage]);

//   // Effect for setting base price
//   useEffect(() => {
//     if (mainProduct?.price) {
//       setBasePrice(mainProduct.price);
//     }
//   }, [mainProduct]);

//   // Effect for setting initial image
//   useEffect(() => {
//     if (mainProduct?.images?.[0] && !currentImage) {
//       setCurrentImage(mainProduct.images[0]);
//     }
//   }, [mainProduct, currentImage]);

//   const totalPrice = basePrice * quantity;

//   if (isLoading) return <Spinner />;

//   return (
//     mainProduct && (
//       <div className="mb-8 flex max-w-[45.5rem] items-center gap-12 bg-white pb-6 pl-7 pr-3 pt-3">
//         <div className="relative">
//           <div className="carousel w-full">
//             <img
//               src={
//                 currentImage || mainProduct?.images[0] || mainProduct?.thumbnail
//               }
//               alt="Main Product"
//               className="min-w-44 max-w-44"
//             />
//             <div className="thumbnails mt-2 flex justify-center">
//               {mainProduct?.images.map((image) => (
//                 <button
//                   key={image}
//                   onClick={() => setCurrentImage(image)}
//                   className={`rounded-md transition-all duration-200 ${currentImage === image ? "ring-2 ring-[#009393] ring-offset-2" : "hover:opacity-75"} `}
//                 >
//                   <img
//                     src={image}
//                     alt={mainProduct.title}
//                     className="mr-2 w-12 cursor-pointer"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div>
//           <h3 className="mb-1 text-xl font-medium text-black">
//             {mainProduct?.title}
//           </h3>

//           <div className="mb-4 flex gap-2">
//             {[...Array(5)].map((_, index) => (
//               <svg
//                 key={index}
//                 className={`h-6 w-6 ${index < mainProduct.rating ? "text-yellow-400" : "text-gray-300"}`}
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//             ))}
//             <span className="text-sm font-normal text-[#5C5C5C]">
//               ({Math.round(mainProduct.rating * 100)} Reviews)
//             </span>
//           </div>

//           <p className="mb-[1.125rem] mr-3 text-xs font-normal text-[#5C5C5C]">
//             {mainProduct?.description}
//           </p>

//           <p className="mb-[1.125rem] text-lg font-medium text-[#009393]">
//             {/* Price ${price?.toFixed(2)} */}
//             Price ${totalPrice.toFixed(2)}
//           </p>

//           <div className="mb-8 flex justify-between">
//             {/* <ProductQuantity
//               quantity={quantity}
//               oneProductPriceRef={oneProductPriceRef}
//               productsInStock={mainProduct?.stock}
//               setQuantity={setQuantity}
//               setPrice={setPrice}
//             /> */}

//             <ProductQuantity
//               quantity={quantity}
//               basePrice={basePrice}
//               productsInStock={mainProduct?.stock}
//               setQuantity={setQuantity}
//             />

//             <p className="text-base font-bold text-[#5C5C5C]">
//               {mainProduct?.stock}{" "}
//               <span className="font-medium">items left</span>
//             </p>
//           </div>

//           <div className="flex gap-5">
//             <button className="rounded-xl border-2 border-[#009393] px-4 py-3">
//               <img src="images/fi-sr-heart.png" alt="Heart Icon" />
//             </button>

//             <button className="w-[8.125rem] rounded-lg border-2 border-[#009393] py-2 font-medium text-[#009393]">
//               Add to cart
//             </button>

//             <button className="w-[8.125rem] rounded-lg bg-[#009393] py-2 font-medium text-white">
//               Buy now
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   );
// }

// export default MainProduct;

// import { useEffect, useMemo, useReducer } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchMainProduct } from "../../services/fetchMainProduct";
// import Spinner from "./Spinner";
// import { ProductAction, ProductState } from "src/types";
// import { useQuantity } from "../../hooks/useQuantity";
// import ProductQuantity from "./ProductQuantity";
// import { useCartStore } from "../../store/cartStore";
// import ErrorMessage from "./ErrorMessage";
// import { toast } from "react-toastify";

// interface MainProductProps {
//   onLoad: () => void;
// }

// // // Define product state and actions

// const initialState: ProductState = {
//   quantity: 1,
//   basePrice: 0,
//   currentImage: "",
// };

// const productReducer = (
//   state: ProductState,
//   action: ProductAction,
// ): ProductState => {
//   switch (action.type) {
//     case "SET_PRICE":
//       return { ...state, basePrice: action.payload };
//     case "SET_IMAGE":
//       return { ...state, currentImage: action.payload };
//     case "SET_QUANTITY":
//       return { ...state, quantity: action.payload };
//     case "RESET":
//       return { ...initialState, ...action.payload };
//     default:
//       return state;
//   }
// };

// function MainProduct({ onLoad }: MainProductProps) {
//   const [mainProductState, dispatch] = useReducer(productReducer, initialState);

//   const addToCart = useCartStore((state) => state.addToCart);
//   const cart = useCartStore((state) => state.cart);

//   console.log("cart", cart);

//   const {
//     data: mainProduct,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["mainProduct"],
//     queryFn: fetchMainProduct,
//     staleTime: 1000 * 1,
//   });

//   console.log("mainProductState", mainProductState);

//   // Initialize price and image when mainProduct changes
//   useEffect(() => {
//     if (!mainProduct) return;

//     if (mainProduct.price && mainProduct.price > 0) {
//       dispatch({ type: "SET_PRICE", payload: mainProduct.price });
//     }
//     if (mainProduct.images?.[0] && !mainProductState.currentImage) {
//       dispatch({ type: "SET_IMAGE", payload: mainProduct.images[0] });
//     }
//   }, [mainProduct, mainProductState.currentImage]);

//   useEffect(() => {
//     if (isSuccess) {
//       onLoad();
//     }
//   }, [isSuccess, onLoad]);

//   // Memoize total price
//   const totalPrice = useMemo(
//     () => mainProductState.basePrice * mainProductState.quantity,
//     [mainProductState.basePrice, mainProductState.quantity],
//   );

//   // Use custom quantity hook with callback to update mainProductState
//   const { quantity, increment, decrement, isMin, isMax } = useQuantity(
//     mainProductState.quantity,
//     mainProduct?.stock ?? 0,
//     (newQuantity) => dispatch({ type: "SET_QUANTITY", payload: newQuantity }),
//   );

//   const isFull = cart.some(
//     (item) =>
//       item.id === mainProduct?.id && item.quantity + quantity > item.stock,
//   );

//   console.log(
//     "isFullisFullisFullisFullisFullisFullisFullisFullisFullisFullisFull",
//     isFull,
//     quantity,
//     mainProduct?.stock,
//   );

//   const handleAddToCart = () => {
//     const result = addToCart({
//       ...mainProduct,
//       image: mainProductState.currentImage,
//       quantity,
//     });

//     const message = result.success ? result.message : result.message;
//     toast[result.success ? "success" : "error"](message);
//   };

//   if (mainProduct?.stock <= 0) {
//     return <ErrorMessage message="This product is currently out of stock." />;
//   }

//   if (isLoading) return <Spinner />;

//   // if (isError || !mainProduct || mainProduct.stock <= 0) {
//   //   return (
//   //     <div className="text-red-500">Error loading product or out of stock</div>
//   //   );
//   // }

//   if (isError) return <ErrorMessage message={error.message} />;

//   return (
//     <div className="mb-8 flex max-w-[45.5rem] items-center gap-12 bg-white pb-6 pl-7 pr-3 pt-3">
//       <div className="relative">
//         <div className="carousel w-full">
//           <img
//             src={mainProductState.currentImage || mainProduct?.thumbnail}
//             alt={mainProduct?.title}
//             className="min-w-44 max-w-44"
//           />
//           <div className="thumbnails mt-2 flex justify-center">
//             {mainProduct.images?.map((image: string) => (
//               <button
//                 key={image}
//                 onClick={() => dispatch({ type: "SET_IMAGE", payload: image })}
//                 className={`rounded-md transition-all duration-200 ${
//                   mainProductState.currentImage === image
//                     ? "ring-2 ring-[#009393] ring-offset-2"
//                     : "hover:opacity-75"
//                 }`}
//               >
//                 <img
//                   src={image}
//                   alt={mainProduct.title}
//                   className="mr-2 w-12 cursor-pointer"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div>
//         <h3 className="mb-1 text-xl font-medium text-black">
//           {mainProduct.title}
//         </h3>

//         <div className="mb-4 flex gap-2">
//           {[...Array(5)].map((_, index) => (
//             <svg
//               key={index}
//               className={`h-6 w-6 ${
//                 index < mainProduct.rating ? "text-yellow-400" : "text-gray-300"
//               }`}
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//             // <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 0 00.951-.69l1.07-3.292z" />
//             // </svg>
//           ))}
//           <span className="text-sm font-normal text-[#5C5C5C]">
//             ({Math.round(mainProduct.rating * 100)} Reviews)
//           </span>
//         </div>

//         <p className="mb-[1.125rem] mr-3 text-xs font-normal text-[#5C5C5C]">
//           {mainProduct.description}
//         </p>

//         <p className="mb-[1.125rem] text-lg font-medium text-[#009393]">
//           Price ${totalPrice.toFixed(2)}
//         </p>

//         <div className="mb-8 flex justify-between">
//           <ProductQuantity
//             quantity={quantity}
//             increment={increment}
//             decrement={decrement}
//             isMin={isMin}
//             isMax={isMax}
//           />
//           <p className="text-base font-bold text-[#5C5C5C]">
//             {mainProduct.stock} <span className="font-medium">items left</span>
//           </p>
//         </div>

//         <div className="flex gap-5">
//           <button className="rounded-xl border-2 border-[#009393] px-4 py-3">
//             <img src="images/fi-sr-heart.png" alt="Heart Icon" />
//           </button>
//           <button
//             className={`w-[8.125rem] rounded-lg border-2 border-[#009393] py-2 font-medium text-[#009393] ${
//               isFull ? "cursor-not-allowed opacity-50" : ""
//             }`}
//             // onClick={() => addToCart(mainProduct)}
//             // onClick={() => {
//             //   addToCart({
//             //     ...mainProduct,
//             //     image: mainProductState.currentImage,
//             //     quantity: quantity,
//             //   });
//             //   // toast.error(
//             //   //   `You can't add more than ${mainProduct.stock} items of this product`,
//             //   // );
//             // }}
//             onClick={handleAddToCart}
//             // disabled={isFull}
//           >
//             Add to cart
//           </button>
//           <button className="w-[8.125rem] rounded-lg bg-[#009393] py-2 font-medium text-white">
//             Buy now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainProduct;

import { useEffect, useMemo, useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMainProduct } from "../../services/fetchMainProduct";
import Spinner from "./Spinner";
import { ProductAction, ProductState } from "../../types";
import { useQuantity } from "../../hooks/useQuantity";
import { useCartStore } from "../../store/cartStore";
import ErrorMessage from "./ErrorMessage";
import {
  showAddToCartToast,
  showMaxStockToast,
  showWarningToast,
} from "../../helpers/toastHelpers";
import MainProductQuantity from "./MainProductQuantity";

interface MainProductProps {
  onLoad: () => void;
}

const initialState: ProductState = {
  id: 0,
  quantity: 1,
  basePrice: 0,
  currentImage: "",
};

const productReducer = (
  state: ProductState,
  action: ProductAction,
): ProductState => {
  switch (action.type) {
    case "SET_ID":
      return { ...state, id: action.payload };
    case "SET_PRICE":
      return { ...state, basePrice: action.payload };
    case "SET_IMAGE":
      return { ...state, currentImage: action.payload };
    case "SET_QUANTITY":
      return { ...state, quantity: action.payload };
    case "RESET":
      return { ...initialState, ...action.payload };
    default:
      return state;
  }
};

function MainProduct({ onLoad }: MainProductProps) {
  const [mainProductState, dispatch] = useReducer(productReducer, initialState);

  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const quantityInCart =
    cart.find((item) => item.id === mainProductState.id)?.quantity || 0;

  const {
    data: mainProduct,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["mainProduct"],
    queryFn: fetchMainProduct,
    staleTime: 1000 * 1,
  });

  console.log("mainProductState", mainProductState);

  // Initialize price and image when mainProduct changes
  useEffect(() => {
    if (!mainProduct) return;

    dispatch({ type: "SET_ID", payload: mainProduct.id });

    if (mainProduct.price && mainProduct.price > 0) {
      dispatch({ type: "SET_PRICE", payload: mainProduct.price });
    }
    if (mainProduct.images?.[0] && !mainProductState.currentImage) {
      dispatch({ type: "SET_IMAGE", payload: mainProduct.images[0] });
    }
  }, [mainProduct, mainProductState.currentImage]);

  useEffect(() => {
    if (isSuccess) {
      onLoad();
    }
  }, [isSuccess, onLoad]);

  // Memoize total price
  const totalPrice = useMemo(
    () => mainProductState.basePrice * mainProductState.quantity,
    [mainProductState.basePrice, mainProductState.quantity],
  );

  // Use custom quantity hook with callback to update mainProductState
  const { quantity, increment, decrement, isMin, isMax } = useQuantity(
    mainProductState.quantity,
    mainProduct?.stock ?? 0,
    (newQuantity) => dispatch({ type: "SET_QUANTITY", payload: newQuantity }),
  );

  // const quantityInCart =
  //   cart?.find((item) => item?.id === mainProduct.id)?.quantity || 0;

  const isFull = cart.some(
    (item) =>
      item.id === mainProduct?.id && item.quantity + quantity > item.stock,
  );

  console.log(
    "isFullisFullisFullisFullisFullisFullisFullisFullisFullisFullisFull",
    isFull,
    quantity,
    mainProduct?.stock,
  );

  const handleAddToCart = () => {
    if (!mainProduct) return;

    const result = addToCart({
      ...mainProduct,
      image: mainProductState.currentImage,
      quantity,
    });

    if (quantityInCart + quantity <= mainProduct.stock) {
      showAddToCartToast(
        result.success,
        result.message,
        mainProduct.title,
        mainProductState.currentImage,
        quantity,
      );
    } else if (quantityInCart >= mainProduct.stock) {
      showMaxStockToast(mainProduct.title);
    } else if (quantityInCart + quantity > mainProduct.stock) {
      showWarningToast(result.message);
    }

    // Create custom toast content
    // const customToastContent = (
    //   <CustomToast
    //     success={result.success}
    //     message={result.message}
    //     productImage={
    //       result.success
    //         ? mainProductState.currentImage || mainProduct.thumbnail
    //         : undefined
    //     }
    //     productTitle={mainProduct.title}
    //     quantity={quantity}
    //     // quantity={result.success ? quantity : undefined}
    //   />
    // );

    // if (result.success) {
    //   toast.success(customToastContent, {
    //     className: "bg-white shadow-lg border border-green-200",
    //   });
    // } else {
    //   toast.error(customToastContent, {
    //     className: "bg-white shadow-lg border border-red-200",
    //   });
    // }
  };

  if (mainProduct?.stock <= 0) {
    return <ErrorMessage message="This product is currently out of stock." />;
  }

  if (isLoading) return <Spinner />;

  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="mb-8 flex max-w-[45.5rem] items-center gap-12 bg-white pb-6 pl-7 pr-3 pt-3">
      <div className="relative">
        <div className="carousel w-full">
          <img
            src={mainProductState.currentImage || mainProduct?.thumbnail}
            alt={mainProduct?.title}
            className="min-w-44 max-w-44"
          />
          <div className="thumbnails mt-2 flex justify-center">
            {mainProduct.images?.map((image: string) => (
              <button
                key={image}
                onClick={() => dispatch({ type: "SET_IMAGE", payload: image })}
                className={`rounded-md transition-all duration-200 ${
                  mainProductState.currentImage === image
                    ? "ring-2 ring-[#009393] ring-offset-2"
                    : "hover:opacity-75"
                }`}
              >
                <img
                  src={image}
                  alt={mainProduct.title}
                  className="mr-2 w-12 cursor-pointer"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-1 text-xl font-medium text-black">
          {mainProduct.title}
        </h3>

        <div className="mb-4 flex gap-2">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`h-6 w-6 ${
                index < mainProduct.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm font-normal text-[#5C5C5C]">
            ({Math.round(mainProduct.rating * 100)} Reviews)
          </span>
        </div>

        <p className="mb-[1.125rem] mr-3 text-xs font-normal text-[#5C5C5C]">
          {mainProduct.description}
        </p>

        <p className="mb-[1.125rem] text-lg font-medium text-[#009393]">
          Price ${totalPrice.toFixed(2)}
        </p>

        <div className="mb-8 flex justify-between">
          <MainProductQuantity
            quantity={quantity}
            increment={increment}
            decrement={decrement}
            isMin={isMin}
            isMax={isMax}
          />
          <p className="text-base font-bold text-[#5C5C5C]">
            {mainProduct.stock} <span className="font-medium">items left</span>
          </p>
        </div>

        <div className="flex gap-5">
          <button className="rounded-xl border-2 border-[#009393] px-4 py-3">
            <img src="images/fi-sr-heart.png" alt="Heart Icon" />
          </button>
          <button
            className={`w-[8.125rem] rounded-lg border-2 border-[#009393] py-2 font-medium text-[#009393] ${
              isFull ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <button className="w-[8.125rem] rounded-lg bg-[#009393] py-2 font-medium text-white">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainProduct;

// import { useEffect, useMemo, useReducer } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchMainProduct } from "../../services/fetchMainProduct";
// import Spinner from "./Spinner";
// import { ProductAction, ProductState } from "../../types";
// import { useQuantity } from "../../hooks/useQuantity";
// import ProductQuantity from "./ProductQuantity";
// import { useCartStore } from "../../store/cartStore";
// import ErrorMessage from "./ErrorMessage";
// import { toast } from "react-toastify";
// import CustomToast from "./CustomToast";

// interface MainProductProps {
//   onLoad: () => void;
// }

// const initialState: ProductState = {
//   quantity: 1,
//   basePrice: 0,
//   currentImage: "",
// };

// const productReducer = (
//   state: ProductState,
//   action: ProductAction,
// ): ProductState => {
//   switch (action.type) {
//     case "SET_PRICE":
//       return { ...state, basePrice: action.payload };
//     case "SET_IMAGE":
//       return { ...state, currentImage: action.payload };
//     case "SET_QUANTITY":
//       return { ...state, quantity: action.payload };
//     case "RESET":
//       return { ...initialState, ...action.payload };
//     default:
//       return state;
//   }
// };

// function MainProduct({ onLoad }: MainProductProps) {
//   const [mainProductState, dispatch] = useReducer(productReducer, initialState);

//   const addToCart = useCartStore((state) => state.addToCart);
//   const cart = useCartStore((state) => state.cart);

//   console.log("cart", cart);

//   const {
//     data: mainProduct,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["mainProduct"],
//     queryFn: fetchMainProduct,
//     staleTime: 1000 * 1,
//   });

//   console.log("mainProductState", mainProductState);

//   // Initialize price and image when mainProduct changes
//   useEffect(() => {
//     if (!mainProduct) return;

//     if (mainProduct.price && mainProduct.price > 0) {
//       dispatch({ type: "SET_PRICE", payload: mainProduct.price });
//     }
//     if (mainProduct.images?.[0] && !mainProductState.currentImage) {
//       dispatch({ type: "SET_IMAGE", payload: mainProduct.images[0] });
//     }
//   }, [mainProduct, mainProductState.currentImage]);

//   useEffect(() => {
//     if (isSuccess) {
//       onLoad();
//     }
//   }, [isSuccess, onLoad]);

//   // Memoize total price
//   const totalPrice = useMemo(
//     () => mainProductState.basePrice * mainProductState.quantity,
//     [mainProductState.basePrice, mainProductState.quantity],
//   );

//   // Use custom quantity hook with callback to update mainProductState
//   const { quantity, increment, decrement, isMin, isMax } = useQuantity(
//     mainProductState.quantity,
//     mainProduct?.stock ?? 0,
//     (newQuantity) => dispatch({ type: "SET_QUANTITY", payload: newQuantity }),
//   );

//   const isFull = cart.some(
//     (item) =>
//       item.id === mainProduct?.id && item.quantity + quantity > item.stock,
//   );

//   console.log(
//     "isFullisFullisFullisFullisFullisFullisFullisFullisFullisFullisFull",
//     isFull,
//     quantity,
//     mainProduct?.stock,
//   );

//   const handleAddToCart = () => {
//     if (!mainProduct) return;

//     const result = addToCart({
//       ...mainProduct,
//       image: mainProductState.currentImage,
//       quantity,
//     });

//     // Show custom toast with product image
//     const customToastContent = (
//       <CustomToast
//         success={result.success}
//         message={result.message}
//         productImage={mainProductState.currentImage || mainProduct.thumbnail}
//         productTitle={mainProduct.title}
//         quantity={quantity}
//       />
//     );

//     if (result.success) {
//       toast.success(customToastContent, {
//         className: "bg-white shadow-lg border border-green-200",
//       });
//     } else {
//       toast.error(customToastContent, {
//         className: "bg-white shadow-lg border border-red-200",
//       });
//     }
//   };

//   if (mainProduct?.stock <= 0) {
//     return <ErrorMessage message="This product is currently out of stock." />;
//   }

//   if (isLoading) return <Spinner />;

//   if (isError) return <ErrorMessage message={error.message} />;

//   return (
//     <div className="mb-8 flex max-w-[45.5rem] items-center gap-12 bg-white pb-6 pl-7 pr-3 pt-3">
//       <div className="relative">
//         <div className="carousel w-full">
//           <img
//             src={mainProductState.currentImage || mainProduct?.thumbnail}
//             alt={mainProduct?.title}
//             className="min-w-44 max-w-44"
//           />
//           <div className="thumbnails mt-2 flex justify-center">
//             {mainProduct.images?.map((image: string) => (
//               <button
//                 key={image}
//                 onClick={() => dispatch({ type: "SET_IMAGE", payload: image })}
//                 className={`rounded-md transition-all duration-200 ${
//                   mainProductState.currentImage === image
//                     ? "ring-2 ring-[#009393] ring-offset-2"
//                     : "hover:opacity-75"
//                 }`}
//               >
//                 <img
//                   src={image}
//                   alt={mainProduct.title}
//                   className="mr-2 w-12 cursor-pointer"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div>
//         <h3 className="mb-1 text-xl font-medium text-black">
//           {mainProduct.title}
//         </h3>

//         <div className="mb-4 flex gap-2">
//           {[...Array(5)].map((_, index) => (
//             <svg
//               key={index}
//               className={`h-6 w-6 ${
//                 index < mainProduct.rating ? "text-yellow-400" : "text-gray-300"
//               }`}
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//           ))}
//           <span className="text-sm font-normal text-[#5C5C5C]">
//             ({Math.round(mainProduct.rating * 100)} Reviews)
//           </span>
//         </div>

//         <p className="mb-[1.125rem] mr-3 text-xs font-normal text-[#5C5C5C]">
//           {mainProduct.description}
//         </p>

//         <p className="mb-[1.125rem] text-lg font-medium text-[#009393]">
//           Price ${totalPrice.toFixed(2)}
//         </p>

//         <div className="mb-8 flex justify-between">
//           <ProductQuantity
//             quantity={quantity}
//             increment={increment}
//             decrement={decrement}
//             isMin={isMin}
//             isMax={isMax}
//           />
//           <p className="text-base font-bold text-[#5C5C5C]">
//             {mainProduct.stock} <span className="font-medium">items left</span>
//           </p>
//         </div>

//         <div className="flex gap-5">
//           <button className="rounded-xl border-2 border-[#009393] px-4 py-3">
//             <img src="images/fi-sr-heart.png" alt="Heart Icon" />
//           </button>
//           <button
//             className={`w-[8.125rem] rounded-lg border-2 border-[#009393] py-2 font-medium text-[#009393] ${
//               isFull ? "cursor-not-allowed opacity-50" : ""
//             }`}
//             onClick={handleAddToCart}
//           >
//             Add to cart
//           </button>
//           <button className="w-[8.125rem] rounded-lg bg-[#009393] py-2 font-medium text-white">
//             Buy now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainProduct;

{
  /* <ToastContainer />; */
}
// notify();
// toast.success("Product added to cart");
// toast(`Cannot add more than ${mainProduct.stock} items`, {
//   // toast(`Only ${mainProduct.stock} items available`, {
//   type: "error",
//   position: "top-center",
//   autoClose: 3000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
// });

// import { useEffect, useMemo, useReducer, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import LazyLoad from "react-lazyload";
// import { fetchMainProduct } from "../../services/fetchMainProduct";
// import Spinner from "./Spinner";

// // Define product state and actions
// interface ProductState {
//   quantity: number;
//   basePrice: number;
//   currentImage: string;
//   maxQuantity: number;
// }

// type ProductAction =
//   | { type: "SET_PRICE"; payload: number }
//   | { type: "SET_IMAGE"; payload: string }
//   | { type: "SET_QUANTITY"; payload: number }
//   | { type: "RESET"; payload: Partial<ProductState> };

// const initialState: ProductState = {
//   quantity: 1,
//   basePrice: 0,
//   currentImage: "",
//   maxQuantity: 0,
// };

// const productReducer = (
//   state: ProductState,
//   action: ProductAction,
// ): ProductState => {
//   switch (action.type) {
//     case "SET_PRICE":
//       return { ...state, basePrice: action.payload };
//     case "SET_IMAGE":
//       return { ...state, currentImage: action.payload };
//     case "SET_QUANTITY":
//       return { ...state, quantity: action.payload };
//     case "RESET":
//       return { ...initialState, ...action.payload };
//     default:
//       return state;
//   }
// };

// Custom hook for quantity logic
// function useQuantity(
//   initialQuantity: number,
//   maxQuantity: number,
//   onQuantityChange?: (newQuantity: number) => void,
// ) {
//   const [quantity, setQuantity] = useReducer((prev: number, newQty: number) => {
//     const clampedQty = Math.max(1, Math.min(newQty, maxQuantity));
//     onQuantityChange?.(clampedQty);
//     return clampedQty;
//   }, initialQuantity);

//   const increment = () => setQuantity(quantity + 1);
//   const decrement = () => setQuantity(quantity - 1);

//   return {
//     quantity,
//     increment,
//     decrement,
//     isMin: quantity <= 1,
//     isMax: quantity >= maxQuantity,
//   };
// }

// function MainProduct({ onLoad }: MainProductProps) {
//   const [state, dispatch] = useReducer(productReducer, initialState);
//   const [isMainProductLoaded, setIsMainProductLoaded] = useState(false);

//   const {
//     data: mainProduct,
//     isLoading,
//     isError,
//     isSuccess,
//   } = useQuery({
//     queryKey: ["mainProduct"],
//     queryFn: fetchMainProduct,
//     // onSuccess: () => {
//     //   onLoad(); // Signal that main product data is loaded
//     // },
//   });

//   useEffect(() => {
//     if (isSuccess) {
//       onLoad();
//     }
//   }, [isSuccess, onLoad]);

//   // Log mainProduct data to debug price issue
//   useEffect(() => {
//     if (mainProduct) {
//       console.log("mainProduct:", mainProduct);
//       console.log("Price:", mainProduct.price);
//     }
//   }, [mainProduct]);

//   // Initialize price, image, and maxQuantity when mainProduct changes
//   useEffect(() => {
//     if (!mainProduct) return;

//     if (mainProduct.price && mainProduct.price > 0) {
//       dispatch({ type: "SET_PRICE", payload: mainProduct.price });
//     } else {
//       console.warn("Invalid price detected:", mainProduct.price);
//       dispatch({ type: "SET_PRICE", payload: 349.95 }); // Fallback price
//     }
//     if (mainProduct.images?.[0] && !state.currentImage) {
//       dispatch({ type: "SET_IMAGE", payload: mainProduct.images[0] });
//     }
//     if (mainProduct.stock >= 0) {
//       dispatch({ type: "RESET", payload: { maxQuantity: mainProduct.stock } });
//     }
//   }, [mainProduct]);

//   // Preload the main image once mainProduct data is available
//   useEffect(() => {
//     if (state.currentImage) {
//       const img = new Image();
//       img.src = state.currentImage;
//     }
//   }, [state.currentImage]);

//   // Memoize total price
//   const totalPrice = useMemo(
//     () => state.basePrice * state.quantity,
//     [state.basePrice, state.quantity],
//   );

//   // Use custom quantity hook with callback
//   const { quantity, increment, decrement, isMin, isMax } = useQuantity(
//     state.quantity,
//     mainProduct?.stock ?? 0,
//     (newQuantity) => dispatch({ type: "SET_QUANTITY", payload: newQuantity }),
//   );

//   if (isLoading) return <Spinner />;
//   if (isError || !mainProduct || mainProduct.stock <= 0) {
//     return (
//       <div className="text-red-500">Error loading product or out of stock</div>
//     );
//   }

//   const fallbackImage = "/fallback-image.png";
//   const placeholderImage = "/low-res-placeholder.png"; // Low-res placeholder for progressive loading

//   return (
//     <>
//       {/* Preload critical image in head (optional, if supported by your app) */}
//       <link
//         rel="preload"
//         href={state.currentImage || mainProduct.thumbnail || fallbackImage}
//         as="image"
//       />

//       <div className="mb-8 flex max-w-[45.5rem] items-center gap-12 bg-white pb-6 pl-7 pr-3 pt-3">
//         <div className="relative">
//           <div className="carousel w-full">
//             <LazyLoad
//               height={176}
//               offset={100}
//               once
//               placeholder={
//                 <img
//                   src={placeholderImage}
//                   alt="Loading..."
//                   className="min-w-44 max-w-44 opacity-50"
//                   width={176}
//                   height={176}
//                 />
//               }
//             >
//               <img
//                 src={
//                   state.currentImage || mainProduct.thumbnail || fallbackImage
//                 }
//                 alt={mainProduct.title || "Product image"}
//                 className="min-w-44 max-w-44"
//                 width={176}
//                 height={176}
//               />
//             </LazyLoad>
//             <div className="thumbnails mt-2 flex justify-center">
//               {(mainProduct.images || []).map((image) => (
//                 <LazyLoad
//                   key={image}
//                   height={48}
//                   offset={100}
//                   once
//                   placeholder={<div className="mr-2 h-12 w-12 bg-gray-200" />}
//                 >
//                   <button
//                     onClick={() =>
//                       dispatch({ type: "SET_IMAGE", payload: image })
//                     }
//                     className={`rounded-md transition-all duration-200 ${
//                       state.currentImage === image
//                         ? "ring-2 ring-[#009393] ring-offset-2"
//                         : "hover:opacity-75"
//                     }`}
//                   >
//                     <img
//                       src={image || fallbackImage}
//                       alt={mainProduct.title || "Thumbnail"}
//                       className="mr-2 w-12 cursor-pointer"
//                       width={48}
//                       height={48}
//                     />
//                   </button>
//                 </LazyLoad>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div>
//           <h3 className="mb-1 text-xl font-medium text-black">
//             {mainProduct.title}
//           </h3>

//           <div className="mb-4 flex gap-2">
//             {[...Array(5)].map((_, index) => (
//               <svg
//                 key={index}
//                 className={`h-6 w-6 ${
//                   index < Math.floor(mainProduct.rating)
//                     ? "text-yellow-400"
//                     : "text-gray-300"
//                 }`}
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//             ))}
//             <span className="text-sm font-normal text-[#5C5C5C]">
//               ({Math.round(mainProduct.rating * 100)} Reviews)
//             </span>
//           </div>

//           <p className="mb-[1.125rem] mr-3 text-xs font-normal text-[#5C5C5C]">
//             {mainProduct.description}
//           </p>

//           <p className="mb-[1.125rem] text-lg font-medium text-[#009393]">
//             Price ${totalPrice.toFixed(2)}
//           </p>

//           <div className="mb-8 flex justify-between">
//             <ProductQuantity
//               quantity={quantity}
//               increment={increment}
//               decrement={decrement}
//               isMin={isMin}
//               isMax={isMax}
//             />
//             <p className="text-base font-bold text-[#5C5C5C]">
//               {mainProduct.stock}{" "}
//               <span className="font-medium">items left</span>
//             </p>
//           </div>

//           <div className="flex gap-5">
//             <button className="rounded-xl border-2 border-[#009393] px-4 py-3">
//               <img src="images/fi-sr-heart.png" alt="Heart Icon" />
//             </button>
//             <button className="w-[8.125rem] rounded-lg border-2 border-[#009393] py-2 font-medium text-[#009393]">
//               Add to cart
//             </button>
//             <button className="w-[8.125rem] rounded-lg bg-[#009393] py-2 font-medium text-white">
//               Buy now
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// interface ProductQuantityProps {
//   quantity: number;
//   increment: () => void;
//   decrement: () => void;
//   isMin: boolean;
//   isMax: boolean;
// }

// function ProductQuantity({
//   quantity,
//   increment,
//   decrement,
//   isMin,
//   isMax,
// }: ProductQuantityProps) {
//   return (
//     <div className="mr-6 flex h-8 w-[5.5rem] items-center justify-around rounded-3xl bg-[#F2F2F2] text-base font-normal text-black">
//       <button
//         className={`h-6 w-6 rounded-full bg-white ${isMin ? "cursor-not-allowed opacity-50" : ""}`}
//         onClick={decrement}
//         disabled={isMin}
//       >
//         -
//       </button>
//       <span>{quantity}</span>
//       <button
//         className={`h-6 w-6 rounded-full bg-white ${isMax ? "cursor-not-allowed opacity-50" : ""}`}
//         onClick={increment}
//         disabled={isMax}
//       >
//         +
//       </button>
//     </div>
//   );
// }

// export default MainProduct;
