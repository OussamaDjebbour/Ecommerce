interface ProductCardProps {
  product: {
    name: string;
    price: number;
    rating: number;
    image: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="w-[180px] flex-shrink-0 snap-start">
      <div className="mb-2 rounded-lg bg-gray-50 p-4">
        <img src={product.image} alt={product.name} className="h-auto w-full" />
      </div>
      <h4 className="mb-1 text-sm font-medium">{product.name}</h4>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold">${product.price}</span>
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm">{product.rating}</span>
        </div>
      </div>
    </div>
  );
}
