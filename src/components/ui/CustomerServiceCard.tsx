function CustomerServiceCard() {
  return (
    <div className="mx-7 flex h-[250px] w-[239px] flex-col items-center justify-between rounded-2xl bg-[#A1D2FF] bg-[url('/images/Mask_group.png')] bg-cover bg-center pb-[1.625rem] pt-4">
      <img
        className="rounded-full border-[0.375rem] border-white bg-[#00E0C6] p-2"
        src="/images/plus_icon.png"
        alt="Icon Plus"
      />
      <button className="rounded-xl bg-[#D9F4FF] px-4 py-2.5 text-xs font-semibold text-[#016170]">
        Customer Service
      </button>
    </div>
  );
}

export default CustomerServiceCard;
