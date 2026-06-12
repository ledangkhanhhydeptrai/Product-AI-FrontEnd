interface Props {
  rating: number;
}

export default function StarRating({ rating }: Props) {
  const full = Math.round(rating);
  const empty = 5 - full;

  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-amber-400 text-[13px] tracking-[-1px]">
        {"★".repeat(full)}
        <span className="text-gray-200">{"★".repeat(empty)}</span>
      </span>
      <span className="text-[12px] text-gray-400">{rating.toFixed(1)}</span>
    </span>
  );
}
