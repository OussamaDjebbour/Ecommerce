import { Star } from "lucide-react";

export const renderStars = (rating: number, emojiSize: number = 6) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-${emojiSize} w-${emojiSize} ${
        i < Math.floor(rating)
          ? "fill-current text-yellow-400"
          : i < rating
            ? "fill-current text-yellow-400 opacity-50"
            : "text-gray-300"
      }`}
    />
  ));
};
