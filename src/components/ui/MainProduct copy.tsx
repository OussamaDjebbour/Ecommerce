import { useState } from "react";
import ColorRadioButtons from "./ColorRadioButtons";
import ColorPicker from "./ColorPicker";
import ProductQuantity from "./MainProductQuantity";

function MainProduct() {
  const colors = [
    { name: "teal", bg: "bg-[#00AD97]", ring: "ring-[#00AD97]" },
    { name: "blue", bg: "bg-[#4BA3E5]", ring: "ring-[#4BA3E5]" },
    { name: "orange", bg: "bg-[#E27373] ", ring: "ring-[#E27373] " },
    { name: "green", bg: "bg-[#75E573] ", ring: "ring-[#75E573] " },
  ];

  const PRICE = 349.95;

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(PRICE);

  const [selectedColor, setSelectedColor] = useState<string>(colors[0].name);

  return (
    // pr-8
    <div className="mb-8 flex max-w-[45.5rem] items-center gap-12 bg-white pb-6 pl-7 pr-3 pt-3">
      <div className="relative">
        <img
          // className="bg-white"
          // className={`filter ${
          //   selectedColor === "red" ? "hue-rotate-20 saturate-200 sepia" : ""
          // }`}
          // className={`filter ${selectedColor && "hue-rotate-180 saturate-200"}`}
          src={`/images/Main_Product_${selectedColor}.png`}
          alt="Main Product"
        />
        {/* Color Overlay */}
        {/* <div
          className={`absolute left-0 top-0 h-full w-full ${
            colors.find((color) => color.name === selectedColor)?.bg
          } opacity-50`}
        ></div> */}
      </div>

      <div>
        <h3 className="mb-1 text-xl font-medium text-black">
          Beats Studio3 Wireless Headphone
        </h3>

        {/* mb-[1.125rem] */}
        <div className="mb-4 flex gap-2">
          <img src="images/Rating_Icon.png" />
          <img src="images/Rating_Icon.png" />
          <img src="images/Rating_Icon.png" />
          <img src="images/Rating_Icon.png" />
          <img src="images/Rating_Icon.png" />
          <span className="text-sm font-normal text-[#5C5C5C]">
            (2000+ Reviews)
          </span>
        </div>

        <p className="mb-[1.125rem] mr-3 text-xs font-normal text-[#5C5C5C]">
          Ergonomic ear cups with on-ear controls. Up to 22 hours of listening
          time. Apple W1 chip & Class 1 Wireless Bluetooth.
        </p>

        <p className="mb-[1.125rem] text-lg font-medium text-[#009393]">
          {/* Price $349.95 */}
          Price ${price.toFixed(2)}
        </p>

        <div className="mb-8 flex justify-between">
          <div className="flex items-center">
            <p className="text-base font-medium text-black">Color</p>

            {/* <div className="ml-4 flex gap-2">
  <div className="h-6 w-6 rounded-full bg-sky-500" />
  <div className="h-6 w-6 rounded-full bg-red-500" />
  <div className="h-6 w-6 rounded-full bg-pink-500" />
  <div className="h-6 w-6 rounded-full bg-teal-500" />
</div> */}
            {/* <div className="ml-4 flex gap-2">
  {["sky-500", "red-500", "pink-500", "teal-500"].map((color) => (
    <label key={color}>
      <input
        type="radio"
        name="color"
        value={color}
        checked={selectedColor === color}
        className="hnameden"
        onChange={() => setSelectedColor(color)}
      />
      <div
        className={`h-6 w-6 rounded-full bg-${color} cursor-pointer`}
      />
    </label>
  ))}
</div> */}

            {/* <ColorRadioButtons /> */}
            {/* <ColorPicker  /> */}
            <ColorPicker
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              colors={colors}
            />
          </div>
          {/* <ProductQuantity /> */}
          <ProductQuantity
            quantity={quantity}
            setQuantity={setQuantity}
            setPrice={setPrice}
          />
        </div>

        <div className="flex gap-5">
          <button className="rounded-xl border-2 border-[#009393] px-4 py-3">
            <img src="images/fi-sr-heart.png " alt="Heart Icon" />
          </button>

          <button className="w-[8.125rem] rounded-lg border-2 border-[#009393] py-2 font-medium text-[#009393]">
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
