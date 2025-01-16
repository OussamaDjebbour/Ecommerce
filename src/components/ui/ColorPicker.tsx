import React, { Dispatch, useState } from "react";

interface ColorPickerProps {
  selectedColor: string;
  // setSelectedColor:
  setSelectedColor: Dispatch<string>;
  colors: { name: string; bg: string; ring: string }[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  setSelectedColor,
  colors,
}) => {
  const handleChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="ml-4 flex gap-3">
      {colors.map((color) => (
        <label
          key={color.name}
          className="relative flex cursor-pointer items-center justify-center"
        >
          <input
            type="radio"
            name="color"
            value={color.name}
            checked={selectedColor === color.name}
            onChange={() => handleChange(color.name)}
            className="hidden"
          />
          <div
            className={`h-6 w-6 rounded-full ${color.bg} ${
              selectedColor === color.name &&
              `ring-2 ${color.ring} ring-offset-2`
            }`}
          ></div>
        </label>
      ))}
    </div>
  );
};

export default ColorPicker;
