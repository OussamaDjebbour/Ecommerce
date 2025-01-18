import { FC } from "react";

interface Props {
  children: React.ReactNode;
  title: string;
  description: string;
}

const SplitContentCard: FC<Props> = ({ title, description, children }) => {
  return (
    <div className="flex w-[21.5625rem] items-center rounded-xl bg-white py-5 pl-8 pr-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex">{children}</div>

      <div className="mx-auto h-[3.75rem] w-0.5 bg-[#5C5C5C]"></div>

      <div className="flex h-[3.75rem] flex-col py-1.5 font-roboto">
        <h4 className="text-sm font-semibold text-[#5C5C5C]">{title}</h4>
        <p className="mt-auto text-xs font-medium text-[#5C5C5C]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SplitContentCard;
