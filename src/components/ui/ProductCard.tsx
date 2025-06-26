import React from "react";
import { useCartStore } from "../../store/cartStore";
import {
  showAddToCartToast,
  showMaxStockToast,
} from "../../helpers/toastHelpers";

interface ProductCardProps {
  id: number;
  imgSrc: string;
  title: string;
  price: number;
  rating: number;
  stock: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  imgSrc,
  title,
  price,
  rating,
  stock,
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const quantity = cart.find((item) => item.id === id)?.quantity || 0;
  const isFull = cart.some(
    (item) => item.id === id && item.quantity === item.stock,
  );

  const handleAddToCart = () => {
    const result = addToCart({
      title,
      price,
      id,
      image: imgSrc,
      quantity: 1,
      stock: stock,
    });

    if (quantity < stock) {
      showAddToCartToast(result.success, result.message, title, imgSrc, 1);
    } else {
      showMaxStockToast(title);
    }
  };

  return (
    <div className="min-w-48 max-w-80 flex-1 rounded-xl bg-white px-2.5 pb-2.5 pt-2.5 shadow-md">
      <img className="mx-auto mb-4 w-2/3" src={imgSrc} alt={title} />

      <h4
        title={title}
        className="mb-1 max-w-full truncate font-openSans text-sm font-semibold text-black"
      >
        {title}
      </h4>
      <p className="mb-1 text-sm font-semibold text-[#5C5C5C]">Price {price}</p>
      <div className="flex items-center gap-2">
        <img src="images/Rating_Icon_Green.png" alt="Rating" />
        <span className="font-roboto text-sm font-medium text-[#00E0C6]">
          {rating}
        </span>
        <button
          className={`ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#009393] text-white hover:bg-[#00E0C6] ${
            isFull && "cursor-not-allowed opacity-50"
          }`}
          onClick={handleAddToCart}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

// import React from "react";
// import { toast } from "react-toastify";
// import { useCartStore } from "../../store/cartStore";
// import CustomToast from "./CustomToast";

// interface ProductCardProps {
//   id: number;
//   imgSrc: string;
//   title: string;
//   price: number;
//   rating: number;
//   stock: number;
// }

// const ProductCard: React.FC<ProductCardProps> = ({
//   id,
//   imgSrc,
//   title,
//   price,
//   rating,
//   stock,
// }) => {
//   const addToCart = useCartStore((state) => state.addToCart);
//   const cart = useCartStore((state) => state.cart);

//   // Check if product is at max capacity in cart
//   const cartItem = cart.find((item) => item.id === id);
//   const isAtMaxCapacity = cartItem?.quantity === stock;

//   const handleAddToCart = () => {
//     const result = addToCart({
//       id,
//       title,
//       price,
//       image: imgSrc,
//       quantity: 1,
//       stock,
//     });

//     // Create custom toast content
//     const customToastContent = (
//       <CustomToast
//         success={result.success}
//         message={result.message}
//         productImage={result.success ? imgSrc : undefined}
//         productTitle={title}
//         quantity={result.success ? 1 : undefined}
//       />
//     );

//     // Show appropriate toast
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

//   return (
//     <div className="min-w-48 max-w-80 flex-1 rounded-xl bg-white px-2.5 pb-2.5 pt-2.5 shadow-md">
//       <img className="mx-auto mb-4 w-2/3" src={imgSrc} alt={title} />

//       <h4
//         title={title}
//         className="mb-1 max-w-full truncate font-openSans text-sm font-semibold text-black"
//       >
//         {title}
//       </h4>

//       <p className="mb-1 text-sm font-semibold text-[#5C5C5C]">
//         Price ${price}
//       </p>

//       <div className="flex items-center gap-2">
//         <img src="images/Rating_Icon_Green.png" alt="Rating" />
//         <span className="font-roboto text-sm font-medium text-[#00E0C6]">
//           {rating}
//         </span>

//         <button
//           className={`ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#009393] text-white transition-colors ${
//             isAtMaxCapacity
//               ? "cursor-not-allowed opacity-50"
//               : "hover:bg-[#00E0C6]"
//           }`}
//           onClick={handleAddToCart}
//           // disabled={isAtMaxCapacity}
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// import { toast } from "react-toastify";
// import { useCartStore } from "../../store/cartStore";
// import CustomToast from "./CustomToast";

// interface ProductCardProps {
//   id: number;
//   imgSrc: string;
//   title: string;
//   price: number;
//   rating: number;
//   stock: number;
// }

// const ProductCard = ({
//   id,
//   imgSrc,
//   title,
//   price,
//   rating,
//   stock,
// }: ProductCardProps) => {
//   const addToCart = useCartStore((state) => state.addToCart);
//   const cart = useCartStore((state) => state.cart);

//   const isFull = cart.some(
//     (item) => item.id === id && item.quantity === item.stock,
//   );

//   console.log("isFull", isFull);

//   const handleAddToCart = () => {
//     const result = addToCart({
//       title,
//       price,
//       id,
//       image: imgSrc,
//       quantity: 1,
//       stock: stock,
//     });

//     const message = result.success ? result.message : result.message;
//     toast[result.success ? "success" : "error"](message);
//   };

//   // console.log("Cartttttttttttt", cart);

//   // console.log("Hi Thereeeeeee");

//   // <div className="min-w-48 flex-1 rounded-xl bg-white/30 px-2.5 pb-2.5 pt-2.5 shadow-md backdrop-blur-3xl">
//   // <div className="min-w-48 flex-1 rounded-xl bg-white px-2.5 pb-2.5 pt-2.5 shadow-md">
//   return (
//     <div className="min-w-48 max-w-80 flex-1 rounded-xl bg-white px-2.5 pb-2.5 pt-2.5 shadow-md">
//       {/* <div className="absolute inset-0 flex items-center justify-center bg-white/30 font-semibold text-white opacity-70 backdrop-blur-sm transition duration-300 hover:opacity-100"></div> */}

//       {/* Right Blur Gradient */}

//       {/* <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-black/20 to-transparent"></div> */}

//       {/* h-32 */}
//       <img className="mx-auto mb-4 w-2/3" src={imgSrc} alt={title} />

//       {/* White gradient overlay - only on the last card */}
//       {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/90"></div> */}

//       <h4
//         title={title}
//         className="mb-1 max-w-full truncate font-openSans text-sm font-semibold text-black"
//       >
//         {title}
//       </h4>
//       <p className="mb-1 text-sm font-semibold text-[#5C5C5C]">Price {price}</p>
//       <div className="flex items-center gap-2">
//         <img src="images/Rating_Icon_Green.png" alt="Rating" />
//         <span className="font-roboto text-sm font-medium text-[#00E0C6]">
//           {rating}
//         </span>
//         <button
//           className={`ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#009393] text-white hover:bg-[#00E0C6] ${
//             isFull && "cursor-not-allowed opacity-50"
//           }`}
//           onClick={handleAddToCart}
//           // disabled={isFull}
//           // onClick={() =>
//           // addToCart({
//           //   title,
//           //   price,
//           //   id,
//           //   image: imgSrc,
//           //   quantity: 1,
//           //   stock: stock,
//           // })
//           // }
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );

//   // <div className="relative w-64 rounded-xl bg-white/20 p-4 shadow-lg shadow-black/20 backdrop-blur-lg">
//   //   <img
//   //     src={imgSrc}
//   //     alt="Product"
//   //     className="h-32 w-full rounded-lg object-cover"
//   //   />

//   //   <h2 className="mt-2 text-lg font-semibold text-black/80">
//   //     Beats <span className="text-black/50">Solo</span>
//   //   </h2>

//   //   <p className="text-sm font-medium text-gray-700">
//   //     Price <span className="text-gray-400">$169</span>
//   //   </p>

//   //   <div className="mt-2 flex items-center">
//   //     <span className="text-sm font-semibold text-teal-400">⭐ 5.0</span>
//   //   </div>

//   //   {/* Left Blur Effect */}
//   //   <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-black/30 to-transparent" />
//   // </div>
// };

// export default ProductCard;

// interface ProductCardProps {
//   imgSrc: string;
//   title: string;
//   price: number;
//   rating: number;
//   isLastVisible?: boolean;
// }

// function ProductCard({
//   imgSrc,
//   title,
//   price,
//   rating,
//   isLastVisible = false,
// }: ProductCardProps) {
//   return (
//     // <div className="relative min-w-48 flex-1 rounded-xl bg-white/30 px-2.5 pb-2.5 pt-2.5 shadow-md backdrop-blur-3xl">
//     //   {/* Product Image */}
//     //   <img
//     //     className="relative z-10 mx-auto mb-4 h-32"
//     //     src={imgSrc}
//     //     alt={title}
//     //   />

//     //   {/* Content */}
//     //   <div className="relative z-10">
//     //     <h4 className="mb-1 max-w-48 truncate font-openSans text-sm font-semibold text-black">
//     //       {title}
//     //     </h4>
//     //     <p className="mb-1 text-sm font-semibold text-[#5C5C5C]">
//     //       Price ${price}
//     //     </p>
//     //     <div className="flex items-center gap-2">
//     //       <span className="text-[#00E0C6]">★</span>
//     //       <span className="font-roboto text-sm font-medium text-[#00E0C6]">
//     //         {rating}
//     //       </span>
//     //       <button className="ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#009393] text-white transition-colors hover:bg-[#007777]">
//     //         +
//     //       </button>
//     //     </div>
//     //   </div>

//     //   {/* Gradient Overlays */}
//     //   {isLastVisible && (
//     //     <div className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-transparent to-white/90" />
//     //   )}
//     //   <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-white/20" />

//     //   {/* Left and Right Blur Effects */}
//     //   <div className="absolute left-0 top-0 h-full w-10 rounded-l-xl bg-gradient-to-r from-black/5 to-transparent" />
//     //   <div className="absolute right-0 top-0 h-full w-10 rounded-r-xl bg-gradient-to-l from-black/5 to-transparent" />
//     // </div>
//     <div className="flex space-x-7 overflow-hidden">
//       {/* Normal Product Card */}
//       {/* <div className="relative w-64 rounded-xl bg-white p-4 shadow-lg">
//         <img
//           src="/your-image.png"
//           alt="Product"
//           className="h-32 w-full rounded-lg object-cover"
//         />
//         <h2 className="mt-2 text-lg font-semibold text-black">Beats Studio3</h2>
//         <p className="text-sm font-medium text-gray-700">
//           Price <span className="text-gray-400">$119.88</span>
//         </p>
//         <div className="mt-2 flex items-center">
//           <span className="text-sm font-semibold text-teal-400">⭐ 5.0</span>
//         </div>
//       </div> */}

//       {/* Blurred & Faded Last Product */}
//       <div className="relative w-64 rounded-xl bg-white/30 p-4 shadow-lg brightness-125 backdrop-blur-2xl">
//         <img
//           src={imgSrc}
//           alt="Product"
//           className="h-32 w-full rounded-lg object-cover opacity-30"
//         />
//         <h2 className="mt-2 text-lg font-semibold text-black/40">Beats Solo</h2>
//         <p className="text-sm font-medium text-gray-400">
//           Price <span className="text-gray-300">$169</span>
//         </p>
//         <div className="mt-2 flex items-center">
//           <span className="text-sm font-semibold text-teal-200">⭐ 5.0</span>
//         </div>

//         {/* Right Blur Effect */}
//         <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white/50 to-transparent"></div>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;

// const ProductCard = ({
//   imgSrc,
//   title,
//   price,
//   rating,
// }: {
//   imgSrc: string;
//   title: string;
//   price: number;
//   rating: number;
// }) => (
//   <div className="h-full rounded-xl bg-white px-2.5 pb-2.5 pt-2.5 shadow-md">
//     <img className="mx-auto mb-4" src={imgSrc} alt={title} />
//     <h4 className="mb-1 font-openSans text-sm font-semibold text-black">
//       {title}
//     </h4>
//     <p className="mb-1 text-sm font-semibold text-[#5C5C5C]">Price ${price}</p>
//     <div className="flex items-center gap-2">
//       <img src="images/Rating_Icon_Green.png" alt="Rating" />
//       <span className="font-roboto text-sm font-medium text-[#00E0C6]">
//         {rating}
//       </span>
//       <button className="ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#009393] text-white">
//         +
//       </button>
//     </div>
//   </div>
// );

// export default ProductCard;
