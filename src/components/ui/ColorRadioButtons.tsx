import React, { useState } from "react";

function ColorRadioButtons() {
  const [selectedColor, setSelectedColor] = useState("");

  const colors = [
    { name: "sky", color: "bg-sky-500" },
    { name: "red", color: "bg-red-500" },
    { name: "pink", color: "bg-pink-500" },
    { name: "teal", color: "bg-teal-500" },
  ];

  return (
    <div className="ml-4 flex gap-2">
      {colors.map((color, index) => (
        <label
          key={index}
          className={`h-6 w-6 rounded-full ${color.color}`}
          onClick={() => setSelectedColor(color.name)}
        >
          <input
            className="bg-white p-2"
            type="radio"
            name="color"
            value={color.name}
            checked={selectedColor === color.name}
            onChange={() => setSelectedColor(color.name)}
          />
        </label>
      ))}
    </div>
  );
}

export default ColorRadioButtons;
