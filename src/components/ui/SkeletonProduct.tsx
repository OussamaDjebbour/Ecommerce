const SkeletonProduct = () => {
  return (
    <div className="mb-7 flex animate-pulse gap-3.5">
      <div className="h-14 w-14 rounded-full bg-gray-300"></div>

      <div className="flex w-full flex-col justify-between py-2 text-xs font-medium">
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>
        <div className="h-3 w-1/2 rounded bg-gray-300"></div>
      </div>

      <div className="my-auto h-4 w-16 rounded bg-gray-300"></div>
    </div>
  );
};

export default SkeletonProduct;
