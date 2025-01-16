function ProductQuantity() {
  return (
    <div className="mr-6 flex h-8 w-[5.5rem] items-center justify-around rounded-3xl bg-[#F2F2F2] text-base font-normal text-black">
      <button className="h-6 w-6 rounded-full bg-white">-</button>
      <span>1</span>
      <button className="h-6 w-6 rounded-full bg-white">+</button>
    </div>
  );
}

export default ProductQuantity;
