import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DailyDeals() {
  return (
    <div className="ml-8">
      <div className="mb-7 flex items-center justify-between">
        <h3 className="font-roboto text-2xl font-semibold text-[#016170]">
          Daily Deals
        </h3>
        <button className="text-sm font-medium text-[#5C5C5C]">
          View all
          <span className="ml-2">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </button>
      </div>

      <div className="mb-7 flex gap-3.5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
          <img src="images/daily-deal.png" alt="Daily deal" />
        </div>

        <div className="flex flex-col justify-between py-2 text-xs font-medium">
          <h5 className="text-black">beats new studio blue headset</h5>
          <p className="text-[#5C5C5C]">256 Reviews 1628 orders</p>
        </div>

        <p className="my-auto text-xs font-medium text-[#5C5C5C]">Price $320</p>
      </div>
      <div className="mb-7 flex gap-3.5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
          <img src="images/daily-deal.png" alt="Daily deal" />
        </div>

        <div className="flex flex-col justify-between py-2 text-xs font-medium">
          <h5 className="text-black">beats new studio blue headset</h5>
          <p className="text-[#5C5C5C]">256 Reviews 1628 orders</p>
        </div>

        <p className="my-auto text-xs font-medium text-[#5C5C5C]">Price $320</p>
      </div>
      <div className="mb-7 flex gap-3.5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
          <img src="images/daily-deal.png" alt="Daily deal" />
        </div>

        <div className="flex flex-col justify-between py-2 text-xs font-medium">
          <h5 className="text-black">beats new studio blue headset</h5>
          <p className="text-[#5C5C5C]">256 Reviews 1628 orders</p>
        </div>

        <p className="my-auto text-xs font-medium text-[#5C5C5C]">Price $320</p>
      </div>
      <div className="mb-7 flex gap-3.5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
          <img src="images/daily-deal.png" alt="Daily deal" />
        </div>

        <div className="flex flex-col justify-between py-2 text-xs font-medium">
          <h5 className="text-black">beats new studio blue headset</h5>
          <p className="text-[#5C5C5C]">256 Reviews 1628 orders</p>
        </div>

        <p className="my-auto text-xs font-medium text-[#5C5C5C]">Price $320</p>
      </div>
      <div className="mb-7 flex gap-3.5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
          <img src="images/daily-deal.png" alt="Daily deal" />
        </div>

        <div className="flex flex-col justify-between py-2 text-xs font-medium">
          <h5 className="text-black">beats new studio blue headset</h5>
          <p className="text-[#5C5C5C]">256 Reviews 1628 orders</p>
        </div>

        <p className="my-auto text-xs font-medium text-[#5C5C5C]">Price $320</p>
      </div>
      <div className="mb-7 flex gap-3.5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
          <img src="images/daily-deal.png" alt="Daily deal" />
        </div>

        <div className="flex flex-col justify-between py-2 text-xs font-medium">
          <h5 className="text-black">beats new studio blue headset</h5>
          <p className="text-[#5C5C5C]">256 Reviews 1628 orders</p>
        </div>

        <p className="my-auto text-xs font-medium text-[#5C5C5C]">Price $320</p>
      </div>
    </div>
  );
}

export default DailyDeals;
