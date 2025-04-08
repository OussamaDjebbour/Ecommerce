import { useState } from "react";

interface ProductQuantityProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}

function ProductQuantity({
  quantity,
  setQuantity,
  setPrice,
}: ProductQuantityProps) {
  // const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    setPrice(newQuantity * 349.95);
  };

  return (
    <div className="mr-6 flex h-8 w-[5.5rem] items-center justify-around rounded-3xl bg-[#F2F2F2] text-base font-normal text-black">
      <button
        className="h-6 w-6 rounded-full bg-white"
        // onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        // onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        className="h-6 w-6 rounded-full bg-white"
        // onClick={() => setQuantity((q) => q + 1)}
        onClick={() => handleQuantityChange(quantity + 1)}
      >
        +
      </button>
    </div>
  );
}

export default ProductQuantity;
