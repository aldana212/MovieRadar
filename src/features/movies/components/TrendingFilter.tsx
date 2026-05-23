
type TimeWindow = "day" | "week";

type Props = {
  value: TimeWindow;
  onChange: (value: TimeWindow) => void;
};

const trendingFilters = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
];

const TrendingFilter = ({ value, onChange }: Props) => {
  return (
    <div className="relative max-w-max bg-[#282A2E] border border-[#FFFFFF]/10 p-[4px] flex items-center gap-[12px] rounded-[12px]">
      {trendingFilters.map((item) => {
        const active = value === item.value;

        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value as TimeWindow)}
            className="relative px-[24px] py-[8px] cursor-pointer"
          >
            {/* background */}
            <span
              className={`
                absolute inset-0 bg-white/10 rounded-[10px]
                transition-all duration-200
                ${active ? "opacity-100 scale-100" : "opacity-0 scale-95"}
              `}
            />

            <span
              className={`relative z-10 text-sm font-medium transition-colors duration-200
                ${active ? "text-white" : "text-gray-500"}
              `}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TrendingFilter;
