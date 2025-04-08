// import { FC } from "react";

// const Spinner: FC = () => {
//   return (
//     <div
//       className="mt-24 flex justify-center"
//       // className="m-auto flex basis-full items-center justify-center"
//       role="status"
//       aria-label="Loading"
//     >
//       <div className="relative">
//         {/* <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-400 border-transparent border-t-transparent"></div>; */}
//         <div className="h-16 w-16 animate-spin rounded-full border-4 border-transparent border-b-blue-500 border-t-blue-500"></div>
//         <div className="absolute left-0 top-0 h-16 w-16 rounded-full border-4 border-blue-300 opacity-50"></div>
//       </div>
//     </div>
//   );
// };

// export default Spinner;

// import { FC } from "react";

// const Spinner: FC = () => {
//   return (
//     <div
//       className="mt-24 flex justify-center"
//       role="status"
//       aria-label="Loading"
//     >
//       <div className="relative">
//         <div className="h-16 w-16 animate-spin rounded-full border-4 border-transparent border-b-gray-700 border-t-gray-700"></div>
//         <div className="absolute left-0 top-0 h-16 w-16 rounded-full border-4 border-gray-500 opacity-50"></div>

//         {/* <div className="h-16 w-16 animate-spin rounded-full border-4 border-transparent border-b-blue-700 border-t-blue-700"></div>
//         <div className="absolute left-0 top-0 h-16 w-16 rounded-full border-4 border-blue-500 opacity-50"></div> */}
//       </div>
//     </div>
//   );
// };

// export default Spinner;

// import { FC } from "react";

// const Spinner: FC = () => {
//   return (
//     <div
//       className="mt-24 flex justify-center"
//       role="status"
//       aria-label="Loading"
//       aria-busy="true"
//     >
//       <div className="relative">
//         {/* Spinning border with muted blue-gray */}
//         <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-600 border-transparent"></div>
//         {/* Static border with very light blue */}
//         <div className="absolute left-0 top-0 h-16 w-16 rounded-full border-4 border-gray-300 opacity-50"></div>
//       </div>
//     </div>
//   );
// };

// export default Spinner;

// import { FC } from "react";

// const Spinner: FC = () => {
//   return (
//     <div
//       className="mt-24 flex justify-center"
//       role="status"
//       aria-label="Loading"
//       aria-busy="true"
//     >
//       <div className="relative">
//         <div className="h-16 w-16 animate-spin rounded-full border-4 border-transparent border-b-gray-700 border-t-gray-700"></div>
//         <div className="absolute left-0 top-0 h-16 w-16 rounded-full border-4 border-gray-500 opacity-50"></div>

//         {/* Spinning border with very dark gray/black */}
//         {/* <div className="h-16 w-16 animate-spin rounded-full border-4 border-transparent border-b-gray-800 border-t-gray-800"></div> */}
//         {/* Static border with light gray */}
//         {/* <div className="absolute left-0 top-0 h-16 w-16 rounded-full border-4 border-gray-200 opacity-50"></div> */}
//       </div>
//     </div>
//   );
// };

// export default Spinner;

// import { FC } from "react";

// const Spinner: FC = () => {
//   return (
//     <div
//       className="mt-24 flex justify-center"
//       role="status"
//       aria-label="Loading"
//     >
//       <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-300 border-t-transparent"></div>
//     </div>
//   );
// };

// export default Spinner;

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
