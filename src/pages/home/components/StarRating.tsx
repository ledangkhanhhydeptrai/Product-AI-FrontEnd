interface Props {
  rating: number;
}

const StarRating: React.FC<Props> = ({ rating }) => {
  const full = Math.floor(rating);
  const empty = 5 - full;

  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-amber-400 text-xs tracking-tight">
        {"★".repeat(full)}
        <span className="text-gray-200">{"★".repeat(empty)}</span>
      </span>
      <span className="text-gray-400 text-xs">{rating.toFixed(1)}</span>
    </span>
  );
};

export default StarRating;
