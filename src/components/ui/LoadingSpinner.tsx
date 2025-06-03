import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
    </div>
  );
};

export default LoadingSpinner;
