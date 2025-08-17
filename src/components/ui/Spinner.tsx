import { FC } from "react";

const Spinner: FC = () => {
  return (
    <div
      className="mt-24 flex justify-center"
      role="status"
      aria-label="Loading"
      aria-busy="true"
    >
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-indigo-600"></div>
        <div className="absolute left-0 top-0 h-16 w-16 rounded-full border-4 border-indigo-100 opacity-30"></div>
      </div>
    </div>
  );
};

export default Spinner;
