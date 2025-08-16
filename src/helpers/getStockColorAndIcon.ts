const getStockColor = (stock: number) => {
  if (stock <= 5) return "text-red-500";
  if (stock <= 15) return "text-orange-500";
  return "text-green-500";
};

const getStockIcon = (stock: number) => {
  if (stock <= 5) return "🔥";
  if (stock <= 15) return "⚡";
  return "✅";
};

export { getStockColor, getStockIcon };
