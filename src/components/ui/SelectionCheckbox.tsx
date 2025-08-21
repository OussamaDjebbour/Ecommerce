import React from "react";
import { Check } from "lucide-react";

interface SelectionCheckboxProps {
  isSelected: boolean;
  onSelect: () => void;
}

const SelectionCheckbox: React.FC<SelectionCheckboxProps> = ({
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`absolute left-3 top-3 z-10 h-6 w-6 rounded-full border-2 transition-all duration-200 ${
        isSelected
          ? "border-[#009393] bg-[#009393] text-white"
          : "border-gray-300 bg-white hover:border-[#009393]"
      }`}
    >
      {isSelected && <Check className="mx-auto h-3 w-3" />}
    </button>
  );
};

export default SelectionCheckbox;
