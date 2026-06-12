interface AiInsight {
  label: string;
  value: string;
  sub: string;
}

interface Props {
  insights: AiInsight[];
}

const accentColors = [
  {
    dot: "bg-indigo-400 shadow-[0_0_8px_#818cf8]",
    value: "text-indigo-300",
    accent: "bg-indigo-400",
    hover: "hover:border-indigo-400/25"
  },
  {
    dot: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
    value: "text-emerald-300",
    accent: "bg-emerald-400",
    hover: "hover:border-emerald-400/25"
  },
  {
    dot: "bg-pink-400 shadow-[0_0_8px_#f472b6]",
    value: "text-pink-300",
    accent: "bg-pink-400",
    hover: "hover:border-pink-400/25"
  }
];

export default function AiInsightStrip({ insights }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {insights.map((item, index) => {
        const color = accentColors[index % accentColors.length];
        return (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 px-5 py-4.5 backdrop-blur-sm transition-colors duration-200 cursor-default ${color.hover} hover:bg-white/7`}
          >
            {/* Background accent circle */}
            <div
              className={`pointer-events-none absolute -bottom-5 -right-5 h-17.5 w-17.5 rounded-full opacity-6 ${color.accent}`}
            />

            {/* Dot */}
            <div className={`mb-3.5 h-1.5 w-1.5 rounded-full ${color.dot}`} />

            {/* Label */}
            <p className="mb-2.5 text-[11px] font-medium uppercase tracking-widest text-slate-400/70">
              {item.label}
            </p>

            {/* Value */}
            <p
              className={`mb-1 text-[34px] font-medium leading-none ${color.value}`}
            >
              {item.value}
            </p>

            {/* Sub */}
            <p className="text-xs text-slate-500/90">{item.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
