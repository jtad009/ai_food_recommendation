import React from "react";
import SuggestionCard from "./SuggestionCard";
import { Clock, Sparkles, UtensilsCrossed } from "lucide-react";

const EmptyChat = ({
  onSuggestionClick,
}: {
  onSuggestionClick: (suggestion: string) => void;
}) => {
  const suggestions = [
    {
      Icon: Clock,
      backgroundColor: "bg-secondary-100",
      iconColor: "primary-600",
      iconBackgroundColor: "bg-primary-600/30",
      subTitleTextColor: "text-primary-600/70",
      titleTextColor: "text-primary-700",
      title: "Quick 15-min meals",
      subTitle:
        "Discover fast and delicious recipes perfect for busy weeknights",
    },
    {
      Icon: UtensilsCrossed,
      backgroundColor: "bg-primary-600",
      iconColor: "secondary-100",
      iconBackgroundColor: "bg-secondary-100/30",
      subTitleTextColor: "text-grey-200",
      titleTextColor: "text-grey-100",
      title: "Seasonal ingredients",
      subTitle: "Make the most of fresh, seasonal produce in creative ways",
    },
    {
      Icon: Sparkles,
      backgroundColor: "bg-tertiary-100",
      iconColor: "primary-600",
      iconBackgroundColor: "bg-tertiary-200/50",
      subTitleTextColor: "text-primary-600/70",
      border: "border border-tertiary-200",
      titleTextColor: "text-primary-700",
      title: "Healthy meal prep",
      subTitle: "Plan nutritious meals that keep you energized all week long",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-6 pb-4 min-h-full ">
      <h2 className="text-5xl text-primary-600 font-bold">Hey!</h2>
      <p className="text-xl text-primary-600/70 text-center">
        Ready to create something delicious? Let&apos;s explore the world of flavors
        together.
      </p>
      <div className="flex gap-4 flex-wrap justify-center ">
        {suggestions.map((suggestion, index) => (
          <div
            className="cursor-pointer"
            key={index}
            onClick={() => onSuggestionClick(suggestion.title)}
          >
            <SuggestionCard
              Icon={suggestion.Icon}
              backgroundColor={suggestion.backgroundColor}
              iconColor={suggestion.iconColor}
              iconBackgroundColor={suggestion.iconBackgroundColor}
              titleTextColor={suggestion.titleTextColor}
              subTitleTextColor={suggestion.subTitleTextColor}
              title={suggestion.title}
              subTitle={suggestion.subTitle}
              border={suggestion.border}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmptyChat;
