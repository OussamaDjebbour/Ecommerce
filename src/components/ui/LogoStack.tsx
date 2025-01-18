import { FC } from "react";

interface LogoStackProps {
  images: { src: string; alt: string }[];
}

const LogoStack: FC<LogoStackProps> = ({ images }) => {
  return (
    <>
      {images.map((image, index) => (
        <img
          key={index}
          className={`ml-${index === 0 ? "0" : "[-0.5rem]"} z-${30 - index * 10}`}
          src={image.src}
          alt={image.alt}
        />
      ))}
    </>
  );
};

export default LogoStack;
