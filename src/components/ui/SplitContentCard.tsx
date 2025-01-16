import React from "react";

// export interface ImageProps {
//   className?: string;
//   src: string;
//   alt: string;
// }

const SplitContentCard: React.FC = () => {
  return (
    <div className="flex w-[21.5625rem] items-center rounded-xl bg-white py-5 pl-8 pr-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex">
        <img className="z-30" src="images/sony.png" alt="Sony" />
        <img className="z-20 ml-[-0.5rem]" src="images/apple.png" alt="Apple" />
        <img className="z-10 ml-[-0.5rem]" src="images/bing.png" alt="Bing" />
        <img
          className="z-0 ml-[-0.5rem]"
          src="images/lenovo.png"
          alt="Lenovo"
        />
      </div>

      {/* self-center */}
      <div className="mx-auto h-[3.75rem] w-0.5 bg-[#5C5C5C]"></div>

      <div className="flex h-[3.75rem] flex-col items-center py-1.5 font-roboto">
        <h4 className="text-sm font-semibold text-[#5C5C5C]">
          Popular top 10 brands
        </h4>
        <p className="mt-auto text-xs font-medium text-[#5C5C5C]">
          5,400+ Orders & reviews
        </p>
      </div>
    </div>
  );
};

export default SplitContentCard;
