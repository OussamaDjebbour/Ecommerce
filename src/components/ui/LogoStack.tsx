import { FC } from "react";

interface LogoStackProps {
  images: { src: string; alt: string }[];
}

const LogoStack: FC<LogoStackProps> = ({ images }) => {
  console.log("LogoStack", images);
  return (
    <>
      {images.map((image, index) => (
        <img
          key={index}
          className={index === 0 ? "ml-0" : "ml-[-0.5rem]"}
          style={{ zIndex: 30 - index * 10 }}
          src={image.src}
          alt={image.alt}
        />
      ))}
    </>
  );
};

export default LogoStack;
