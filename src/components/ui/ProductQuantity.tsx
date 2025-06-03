// import { useState } from "react";

// interface ProductQuantityProps {
//   quantity: number;
//   setQuantity: React.Dispatch<React.SetStateAction<number>>;
//   setPrice: React.Dispatch<React.SetStateAction<number>>;
// }

// function ProductQuantity({
//   quantity,
//   setQuantity,
//   setPrice,
// }: ProductQuantityProps) {
//   // const [quantity, setQuantity] = useState(1);

//   const handleQuantityChange = (newQuantity: number) => {
//     setQuantity(newQuantity);
//     setPrice(newQuantity * 349.95);
//   };

//   return (
//     <div className="mr-6 flex h-8 w-[5.5rem] items-center justify-around rounded-3xl bg-[#F2F2F2] text-base font-normal text-black">
//       <button
//         className="h-6 w-6 rounded-full bg-white"
//         // onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//         // onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//         onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
//       >
//         -
//       </button>
//       <span>{quantity}</span>
//       <button
//         className="h-6 w-6 rounded-full bg-white"
//         // onClick={() => setQuantity((q) => q + 1)}
//         onClick={() => handleQuantityChange(quantity + 1)}
//       >
//         +
//       </button>
//     </div>
//   );
// }

// export default ProductQuantity;

import { useState } from "react";

// interface ProductQuantityProps {
//   quantity: number;
//   oneProductPriceRef: React.RefObject<number>;
//   productsInStock: number;
//   setQuantity: React.Dispatch<React.SetStateAction<number>>;
//   setPrice: React.Dispatch<React.SetStateAction<number>>;
// }

// function ProductQuantity({
//   quantity,
//   oneProductPriceRef,
//   productsInStock,
//   setQuantity,
//   setPrice,
// }: ProductQuantityProps) {
//   const handleQuantityChange = (newQuantity: number) => {
//     setQuantity(newQuantity);
//     // setPrice(newQuantity * 349.95);
//     setPrice((price) => price + 1);
//   };

//   // console.log("oneProductPriceRef.current", oneProductPriceRef.current);

//   const handleMinQuantityChange = () => {
//     if (quantity === 1) return;
//     // setQuantity((q) => Math.max(1, q - 1));
//     setQuantity((qty) => qty - 1);
//     // if (oneProductPriceRef.current !== null) {
//     // setPrice((price) => price - oneProductPriceRef.current);
//     // }

//     // Type-safe version:
//     setPrice((prevPrice) => {
//       const priceChange = oneProductPriceRef?.current;
//       return prevPrice - priceChange;
//     });
//     // setPrice(newQuantity * 349.95);
//     // setPrice((price) => price + 1);
//   };

//   const handleMaxQuantityChange = () => {
//     if (quantity === productsInStock) return;
//     // setQuantity((q) => Math.max(1, q - 1));
//     setQuantity((qty) => qty + 1);

//     setPrice((price) => price + oneProductPriceRef.current);

//     // setPrice(newQuantity * 349.95);
//     // setPrice((price) => price + 1);
//   };

//   return (
//     <div className="mr-6 flex h-8 w-[5.5rem] items-center justify-around rounded-3xl bg-[#F2F2F2] text-base font-normal text-black">
//       <button
//         className="h-6 w-6 rounded-full bg-white"
//         onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
//         // onClick={handleMinQuantityChange}
//       >
//         -
//       </button>
//       <span>{quantity}</span>
//       <button
//         className="h-6 w-6 rounded-full bg-white"
//         onClick={() => handleQuantityChange(quantity + 1)}
//         // onClick={handleMaxQuantityChange}
//       >
//         +
//       </button>
//     </div>
//   );
// }

// export default ProductQuantity;

// interface ProductQuantityProps {
//   quantity: number;
//   oneProductPriceRef: React.RefObject<number>;
//   productsInStock: number;
//   setQuantity: React.Dispatch<React.SetStateAction<number>>;
//   setPrice: React.Dispatch<React.SetStateAction<number>>;
// }

// function ProductQuantity({
//   quantity,
//   oneProductPriceRef,
//   productsInStock,
//   setQuantity,
//   setPrice,
// }: ProductQuantityProps) {
//   const handleDecrease = () => {
//     if (quantity <= 1) return;
//     setQuantity((prev) => prev - 1);
//     setPrice((prev) => prev - (oneProductPriceRef.current || 0));
//   };

//   const handleIncrease = () => {
//     if (quantity >= productsInStock) return;
//     setQuantity((prev) => prev + 1);
//     setPrice((prev) => prev + (oneProductPriceRef.current || 0));
//   };

//   return (
//     <div className="mr-6 flex h-8 w-[5.5rem] items-center justify-around rounded-3xl bg-[#F2F2F2] text-base font-normal text-black">
//       <button
//         className={`h-6 w-6 rounded-full bg-white ${quantity <= 1 ? "cursor-not-allowed opacity-50" : ""}`}
//         onClick={handleDecrease}
//         disabled={quantity <= 1}
//       >
//         -
//       </button>
//       <span>{quantity}</span>
//       <button
//         className={`h-6 w-6 rounded-full bg-white ${quantity >= productsInStock ? "cursor-not-allowed opacity-50" : ""}`}
//         onClick={handleIncrease}
//         disabled={quantity >= productsInStock}
//       >
//         +
//       </button>
//     </div>
//   );
// }

// export default ProductQuantity;

// interface ProductQuantityProps {
//   quantity: number;
//   basePrice: number;
//   productsInStock: number;
//   setQuantity: React.Dispatch<React.SetStateAction<number>>;
// }

// function ProductQuantity({
//   quantity,
//   basePrice,
//   productsInStock,
//   setQuantity,
// }: ProductQuantityProps) {
//   const handleDecrease = () => {
//     if (quantity <= 1) return;
//     setQuantity((prev) => prev - 1);
//   };

//   const handleIncrease = () => {
//     if (quantity >= productsInStock) return;
//     setQuantity((prev) => prev + 1);
//   };

//   return (
//     <div className="mr-6 flex h-8 w-[5.5rem] items-center justify-around rounded-3xl bg-[#F2F2F2] text-base font-normal text-black">
//       <button
//         className={`h-6 w-6 rounded-full bg-white ${quantity <= 1 ? "cursor-not-allowed opacity-50" : ""}`}
//         onClick={handleDecrease}
//         disabled={quantity <= 1}
//       >
//         -
//       </button>
//       <span>{quantity}</span>
//       <button
//         className={`h-6 w-6 rounded-full bg-white ${quantity >= productsInStock ? "cursor-not-allowed opacity-50" : ""}`}
//         onClick={handleIncrease}
//         disabled={quantity >= productsInStock}
//       >
//         +
//       </button>
//     </div>
//   );
// }

// export default ProductQuantity;

interface ProductQuantityProps {
  quantity: number;
  increment: () => void;
  decrement: () => void;
  isMin: boolean;
  isMax: boolean;
}

function ProductQuantity({
  quantity,
  increment,
  decrement,
  isMin,
  isMax,
}: ProductQuantityProps) {
  return (
    <div className="mr-6 flex h-8 w-[5.5rem] items-center justify-around rounded-3xl bg-[#F2F2F2] text-base font-normal text-black">
      <button
        className={`h-6 w-6 rounded-full bg-white ${isMin ? "cursor-not-allowed opacity-50" : ""}`}
        onClick={decrement}
        disabled={isMin}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        className={`h-6 w-6 rounded-full bg-white ${isMax ? "cursor-not-allowed opacity-50" : ""}`}
        onClick={increment}
        disabled={isMax}
      >
        +
      </button>
    </div>
  );
}

export default ProductQuantity;
