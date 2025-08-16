import { Phone } from "lucide-react";

function CustomerServiceCard() {
  return (
    <div className="mx-6 flex h-[180px] w-[172px] flex-col items-center justify-between rounded-2xl bg-[#A1D2FF] bg-[url('/images/Mask_group.png')] bg-cover bg-center pb-4 pt-3 2xl:mx-7 2xl:h-[220px] 2xl:w-[210px] 2xl:pb-[1.625rem] 2xl:pt-4">
      <div className="rounded-full border-2 border-white bg-[#00E0C6] p-1.5 2xl:border-[0.375rem] 2xl:p-2">
        <Phone className="h-4 w-4 text-white 2xl:h-5 2xl:w-5" />
      </div>
      <button className="rounded-xl bg-[#D9F4FF] px-3 py-2 text-xs font-semibold text-[#016170] 2xl:px-4 2xl:py-2.5">
        Customer Service
      </button>
    </div>
  );
}

export default CustomerServiceCard;
