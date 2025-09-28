import { LucideProps } from "lucide-react";
import React from "react";

type LucideIconType = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;
interface SuggestionCardProps {
  Icon: LucideIconType;
  iconColor: string;
  iconBackgroundColor: string;
  backgroundColor: string;
  titleTextColor: string;
  subTitleTextColor: string;
  title: string;
  subTitle: string;
  border?: string;
}
const SuggestionCard = ({
  backgroundColor: background,
  Icon,
  iconColor,
  iconBackgroundColor,
  titleTextColor,
  subTitleTextColor,
  title,
  subTitle,
  border,
}: SuggestionCardProps) => {
  return (
    <div
      className={`p-8 rounded-xl ${background} max-w-[260px] gap-6 flex flex-col relative overflow-hidden ${border} group transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 translate-x-8 -translate-y-8">
        <div className={`w-full h-full bg-${iconColor} rounded-3xl`}></div>
      </div>

      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center p-3 ${iconBackgroundColor}`}
      >
        <Icon size={48} className={`text-${iconColor}`} />
      </div>
      <div className={`${titleTextColor} text-xl`}>{title}</div>
      <div className={`${subTitleTextColor} text-sm`}>{subTitle}</div>
      <div
        className={`absolute bottom-4 right-4 w-8 h-8 rounded-full bg-${iconColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      ></div>
    </div>
  );
};

export default SuggestionCard;
