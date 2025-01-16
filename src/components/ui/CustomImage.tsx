import React from "react";
import { ImageProps } from "./SplitContentCard";

const CustomImage: React.FC<ImageProps> = ({ className, src, alt }) => {
  return <img className={className} src={src} alt={alt} />;
};

export default CustomImage;
