import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeadphonesAd = () => {
  return (
    <div
      // style={{
      //   background:
      //     "linear-gradient(to right, rgba(161, 210, 255, 1) 0%, rgba(0, 224, 198, 0.9) 100%)",
      //   // "linear-gradient(to right, rgba(161, 210, 255, 1) 0%, rgba(0, 224, 198, 0.9)) 100%",
      // }}

      // className="relative mx-auto flex h-60 w-full max-w-md items-center justify-between rounded-lg bg-gradient-to-br from-[#A1D2FF] to-[#00E0C6]/90 p-6 shadow-lg md:max-w-lg"
      className="relative mb-[4.3125rem] hidden h-56 w-full rounded-2xl bg-gradient-to-br from-[#A1D2FF] to-[#00E0C6]/90 pb-8 pl-5 pt-3 shadow-lg xl:block"
    >
      {/* <div className="relative mx-auto flex h-60 w-full max-w-md items-center justify-between rounded-lg bg-gradient-to-r from-[#A1D2FF] to-[#00E0C6] p-6 shadow-lg md:max-w-lg"> */}
      {/* <div className="relative mx-auto flex h-60 w-full max-w-md items-center justify-between rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 p-6 shadow-lg md:max-w-lg"> */}
      {/* Text Section */}
      {/* flex flex-col justify-between */}
      <div className="z-10 flex h-full flex-col justify-between">
        {/* ml-4 mt-3 */}
        <h2 className="mr-6 text-2xl font-semibold text-[#016170]">
          Summer headphones from top brands
        </h2>
        <button className="flex items-center text-base font-medium text-[#016170] hover:underline">
          Buy it now
          {/* <span className="ml-2">&rarr;</span> */}
          <span className="ml-2">
            <FontAwesomeIcon icon={faArrowRight} />
            {/* <img
              className="h-4 w-4 fill-[#016170]"
              src="images/arrow-right.png"
              alt="Arrow Right"
            /> */}
          </span>
        </button>
      </div>
      {/* Headphones Image */}
      {/* space-x-4 */}
      {/* <div className="absolute -right-4 bottom-0 flex items-end justify-end"> */}
      <img
        src="images/red-headphones.png"
        alt="Red Headphones"
        // className="h-20 w-auto md:h-28"
        className="absolute bottom-3 right-16 h-auto w-auto"
      />
      <img
        src="images/green-headphones.png"
        alt="Green Headphones"
        // className="h-20 w-auto md:h-28"
        className="absolute -right-4 bottom-0 h-auto w-auto"
      />
      {/* </div> */}
    </div>
  );
};

export default HeadphonesAd;
