import React from "react";

interface DiscountBadgeProps {
  savings: number;
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ savings }) => {
  return (
           <div className="absolute right-3 top-3 z-10 animate-pulse rounded-full bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 text-xs font-bold text-white shadow-lg">
            Save ${savings.toFixed(2)}
            
          </div>
  );
};

export default DiscountBadge;
