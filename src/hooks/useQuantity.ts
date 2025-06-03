import { useReducer } from "react";

export function useQuantity(
  initialQuantity: number,
  maxQuantity: number,
  onQuantityChange?: (newQuantity: number) => void,
) {
  const [quantity, setQuantity] = useReducer((prev: number, newQty: number) => {
    const clampedQty = Math.max(1, Math.min(newQty, maxQuantity));
    onQuantityChange?.(clampedQty); // Call callback with new quantity
    return clampedQty;
  }, initialQuantity);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity - 1);

  return {
    quantity,
    increment,
    decrement,
    isMin: quantity <= 1,
    isMax: quantity >= maxQuantity,
  };
}
