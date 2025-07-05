import { Product } from "../../types";

interface ItemProps {
  product: Product;
  index: number;
}

function Item() {
  return (
    <li
      key={product.id}
      className={`group relative cursor-pointer rounded-lg border border-gray-100 p-3 transition-all duration-200 hover:border-teal-200 hover:bg-teal-50 ${
        index === selectedIndex ? "border-teal-200 bg-teal-50" : ""
      }`}
    >
      {/* Remove button */}
      <button
        onClick={() => {
          handleRemoveItem(product.id, product.title, product.image);
        }}
        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-400 opacity-0 shadow-sm transition-all duration-200 hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
        aria-label={`Remove ${product.title} from cart`}
      >
        <X className="h-4 w-4" />
        {/* <svg
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg> */}
      </button>

      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-16 w-16 rounded-lg border border-gray-200 object-cover group-hover:border-teal-200"
          />
        </div>

        {/* Product Details */}
        <div className="min-w-0 flex-1">
          <h4
            title={product.title}
            className="mb-1 line-clamp-2 max-w-[93%] truncate text-sm font-semibold text-gray-900"
          >
            {product.title}
          </h4>
          <p className="mb-3 text-sm font-bold text-teal-600">
            ${product.price.toFixed(2)}
          </p>

          <div className="flex items-center justify-between">
            {/* <div className="flex items-center rounded-full border border-gray-200 bg-white">
                              <button
                                onClick={() =>
                                  handleDecrement(
                                    product.id,
                                    product.quantity,
                                    product.title,
                                    product.image,
                                  )
                                }
                                className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>

                              <span className="w-8 text-center text-sm font-medium">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleIncrement(
                                    product.id,
                                    product.quantity,
                                    product.stock,
                                    product.title,
                                  )
                                }
                                className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                                  product.quantity >= product.stock
                                    ? "cursor-not-allowed border-gray-200 text-gray-400"
                                    : "border-gray-300 hover:bg-gray-100"
                                }`}
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div> */}

            <QuantityControl
              product={product}

              // handleIncrement={handleIncrement}
              // handleDecrement={handleDecrement}
            />

            {/* Item Total */}
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">
                ${(product.price * product.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Item;
