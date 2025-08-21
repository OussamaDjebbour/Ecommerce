import React from "react";

interface DiscountBadgeProps {
  savings: number;
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ savings }) => {
  return (
    <div className="absolute right-3 top-3 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
      Save ${savings.toFixed(2)}
    </div>
  );
};

export default DiscountBadge;
