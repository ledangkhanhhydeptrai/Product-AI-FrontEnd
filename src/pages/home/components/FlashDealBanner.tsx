export default function FlashDealBanner() {
  return (
    <section className="bg-[#1E1B4B] rounded-2xl px-6 py-6 flex items-center justify-between gap-6 flex-wrap">
      <div>
        <div className="inline-flex items-center gap-1.5 bg-yellow-400/12 border border-yellow-400/20 text-yellow-300 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide mb-3">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            />
          </svg>
          Flash deals · ends in 02:47:33
        </div>
        <h2 className="text-white text-[22px] font-medium mb-1.5">
          Up to 60% off today only
        </h2>
        <p className="text-indigo-300/70 text-[13px] leading-relaxed max-w-xs">
          AI-detected deals across your favourite categories.
        </p>
      </div>

      <button className="flex items-center gap-2 bg-yellow-300 hover:bg-yellow-200 text-[#1E1B4B] rounded-xl px-6 py-3 text-[13px] font-medium whitespace-nowrap transition-colors">
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
        Shop flash deals
      </button>
    </section>
  );
}
