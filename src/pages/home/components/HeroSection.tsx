interface AiInsight {
  label: string;
  value: string;
  sub: string;
}

interface Props {
  insights: AiInsight[];
}

const valueColors = ["text-indigo-300", "text-emerald-300", "text-pink-300"];

export default function HeroSection({ insights }: Props) {
  return (
    <section className="relative overflow-hidden bg-[#1E1B4B] px-10 py-12 flex items-center justify-between gap-8">
      {/* Decorative rings */}
      <div className="pointer-events-none absolute -top-16 right-20 w-48 h-48 rounded-full border-40 border-indigo-500/10" />
      <div className="pointer-events-none absolute -bottom-8 right-52 w-28 h-28 rounded-full border-24 border-indigo-300/[0.07]" />

      {/* Left: copy */}
      <div className="relative z-10">
        <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-indigo-300/65 mb-3.5">
          <span className="inline-block w-4 h-px rounded bg-indigo-300/40" />
          AI-powered shopping
        </p>
        <h1 className="text-[34px] font-medium text-white leading-tight mb-2.5">
          Discover style
          <br />
          <span className="text-indigo-300">curated for you</span>
        </h1>
        <p className="text-sm text-slate-400/80 leading-relaxed max-w-sm mb-6">
          Real-time AI recommendations based on your taste, budget, and trending
          looks.
        </p>
        <div className="flex gap-2.5 flex-wrap">
          <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-[13px] font-medium transition-colors">
            Explore my picks
          </button>
          <button className="bg-white/7 hover:bg-white/12 text-indigo-200 border border-indigo-300/20 rounded-xl px-5 py-2.5 text-[13px] font-medium transition-colors">
            Browse all
          </button>
        </div>
      </div>

      {/* Right: stat cards */}
      <div className="relative z-10 flex flex-col gap-2.5 shrink-0">
        {insights.map((item, i) => (
          <div
            key={i}
            className="bg-white/6 border border-white/8 rounded-2xl px-4 py-3.5 min-w-37"
          >
            <div className="w-1.5 h-1.5 rounded-full mb-2.5" />
            <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400/60 mb-1.5">
              {item.label}
            </p>
            <p
              className={`text-[26px] font-medium leading-none mb-1 ${valueColors[i]}`}
            >
              {item.value}
            </p>
            <p className="text-[11px] text-slate-500/80">{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
