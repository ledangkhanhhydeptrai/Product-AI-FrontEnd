// Mock activity data — thay bằng data thật từ API nếu có
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
export default function ActivityBar({ values }: { values: number[] }) {
  const max = Math.max(...values);
  return (
    <div>
      <svg
        viewBox="0 0 120 44"
        className="w-full h-11 block"
        role="img"
        aria-label="Product activity chart"
      >
        {values.map((v, i) => {
          const barWidth = 8;
          const gap = 2;
          const x = i * (barWidth + gap);
          const height = v / max * 34;
          const y = 38 - height;

          return (
            <g key={i}>
              <rect
                x={x}
                y={4}
                width={barWidth}
                height={34}
                rx={1.5}
                fill="#EEEDFE"
              />
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={height}
                rx={1.5}
                fill="#7F77DD"
              />
            </g>
          );
        })}
      </svg>
      <div className="flex gap-0.5 mt-1">
        {MONTHS.map(m =>
          <div key={m} className="flex-1 text-center text-[9px] text-gray-400">
            {m}
          </div>
        )}
      </div>
    </div>
  );
}