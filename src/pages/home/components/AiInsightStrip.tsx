interface AiInsight {
  label: string;
  value: string;
  sub: string;
}

interface Props {
  insights: AiInsight[];
}

export default function AiInsightStrip({ insights }: Props) {
  return (
    <div className="max-w-275 mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10">
      {insights.map((item, index) => (
        <div
          key={index}
          className="border border-white/10 rounded-2xl px-5 py-4 bg-white/5 backdrop-blur-sm"
        >
          <p className="text-slate-400 text-xs font-medium mb-2 tracking-wide uppercase">
            {item.label}
          </p>

          <div className="flex items-baseline gap-1.5">
            <span className="text-indigo-300 text-[28px] font-semibold leading-none">
              {item.value}
            </span>
            <span className="text-slate-500 text-xs">{item.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
