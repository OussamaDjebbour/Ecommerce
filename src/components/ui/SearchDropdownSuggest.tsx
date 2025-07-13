import { getPriceDetails } from "../../helpers/getPriceDetails";
import { Product } from "../../types";

interface SearchDropdownSuggestProps {
  product: Product;
  index: number;
  selectedIndex: number;
  handleDropdownClick: (product: Product) => void;
}

function SearchDropdownSuggest({
  product,
  index,
  selectedIndex,
  handleDropdownClick,
}: SearchDropdownSuggestProps) {
  const { originalPrice, discountedPrice, hasDiscount } =
    getPriceDetails(product);

  return (
    <li
      className={`cursor-pointer p-2 transition-colors duration-150 hover:border-l-2 hover:border-blue-500 hover:bg-blue-100 ${
        index === selectedIndex ? "border-l-2 border-blue-500 bg-blue-50" : ""
      }`}
      onMouseDown={() => handleDropdownClick(product)}
      // onMouseEnter={() => setSelectedIndex(index)}
      // onMouseLeave={() => setSelectedIndex(index)}
      role="option"
      aria-selected={index === selectedIndex}
    >
      <div className="flex items-center gap-3">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-12 w-12 flex-shrink-0 rounded object-cover"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <p title={product.title} className="truncate font-medium">
            {product.title}
          </p>

          <div className="flex items-center gap-2">
            <p className="text-base text-blue-600">${discountedPrice}</p>
            <p
              className={`text-sm text-gray-500 ${hasDiscount && "line-through"} `}
            >
              ${originalPrice}
            </p>
          </div>
          {/* <p className="text-sm text-blue-600">${product.price}</p> */}
        </div>
      </div>
    </li>
  );
}

export default SearchDropdownSuggest;
