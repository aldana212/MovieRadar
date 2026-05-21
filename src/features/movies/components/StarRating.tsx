interface StarRatingProps {
  score: number;
  size?: "sm" | "md";
}

const StarRating = ({ score, size = "md" }: StarRatingProps) => {
  const pct = (score / 10) * 100;
  const cls = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className={`flex items-center gap-1.5 ${cls}`}>
      <div className="relative inline-block">
        <span className="text-gray-600">★★★★★</span>
        <span
          className="absolute inset-0 overflow-hidden text-amber-400"
          style={{ width: `${pct}%` }}
        >
          ★★★★★
        </span>
      </div>
      <span className="text-gray-400 font-medium">{score.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
