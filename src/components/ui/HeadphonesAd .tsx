import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeadphonesAd = () => {
  return (
    <div className="relative mb-[4.3125rem] hidden h-56 w-full rounded-2xl bg-gradient-to-br from-[#A1D2FF] to-[#00E0C6]/90 pb-8 pl-5 pt-3 shadow-lg xl:block">
      <div className="z-10 flex h-full flex-col justify-between">
        <h2 className="mr-6 text-2xl font-semibold text-[#016170]">
          Summer headphones from top brands
        </h2>
        <button className="flex items-center text-base font-medium text-[#016170] hover:underline">
          Buy it now
          <span className="ml-2">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </button>
      </div>

      <img
        src="images/red-headphones.png"
        alt="Red Headphones"
        className="absolute bottom-3 right-16 h-auto w-auto"
      />
      <img
        src="images/green-headphones.png"
        alt="Green Headphones"
        className="absolute -right-4 bottom-0 h-auto w-auto"
      />
    </div>
  );
};

export default HeadphonesAd;
