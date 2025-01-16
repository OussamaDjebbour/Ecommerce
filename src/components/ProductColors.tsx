import React from "react";

export function ProductColors() {
  const colors = [
    { id: "blue", class: "bg-sky-500" },
    { id: "red", class: "bg-red-500" },
    { id: "pink", class: "bg-pink-500" },
    { id: "green", class: "bg-teal-500" },
  ];

  return (
    <div className="space-y-2">
      <p className="font-medium">Color</p>
      <div className="flex gap-3">
        {colors.map((color, i) => (
          <button
            key={color.id}
            className={`h-6 w-6 rounded-full ${color.class} ${
              i === 0 ? "ring-2 ring-teal-500 ring-offset-2" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
