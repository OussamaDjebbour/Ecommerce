const ProductCard = ({
  imgSrc,
  title,
  price,
  rating,
}: {
  imgSrc: string;
  title: string;
  price: string;
  rating: string;
}) => (
  <div className="min-w-48 flex-1 rounded-xl bg-white px-2.5 pb-2.5 pt-2.5 shadow-md">
    <img className="mx-auto mb-4" src={imgSrc} alt={title} />
    <h4 className="mb-1 font-openSans text-sm font-semibold text-black">
      {title}
    </h4>
    <p className="mb-1 text-sm font-semibold text-[#5C5C5C]">Price {price}</p>
    <div className="flex items-center gap-2">
      <img src="images/Rating_Icon_Green.png" alt="Rating" />
      <span className="font-roboto text-sm font-medium text-[#00E0C6]">
        {rating}
      </span>
      <button className="ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#009393] text-white">
        +
      </button>
    </div>
  </div>
);

export default ProductCard;
