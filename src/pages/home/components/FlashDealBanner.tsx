export default function FlashDealBanner() {
  return (
    <section className="mt-14 bg-[#1E1B4B] rounded-3xl px-8 py-8 flex items-center justify-between gap-6 flex-wrap">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">⚡</span>
          <span className="bg-yellow-400/15 text-yellow-300 border border-yellow-400/25 rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide">
            Flash Deals · Ends in 02:47:33
          </span>
        </div>

        <h2 className="text-white text-2xl font-bold mb-1.5 leading-snug">
          Up to 60% Off Today Only
        </h2>

        <p className="text-indigo-300/80 text-sm leading-relaxed max-w-sm">
          AI-detected deals hand-picked across your favourite categories.
        </p>
      </div>

      <button className="bg-yellow-300 hover:bg-yellow-200 text-[#1E1B4B] rounded-2xl px-7 py-3.5 text-sm font-bold whitespace-nowrap transition-colors">
        Shop Flash Deals →
      </button>
    </section>
  );
}
