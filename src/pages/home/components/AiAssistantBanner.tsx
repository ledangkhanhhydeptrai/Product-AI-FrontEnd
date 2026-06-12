export default function AiAssistantBanner() {
  return (
    <section className="bg-[#1E1B4B] rounded-2xl px-6 py-5 mb-8 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 w-10 h-10 rounded-xl bg-indigo-400/15 border border-indigo-400/20 flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 text-indigo-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
            />
          </svg>
        </div>
        <div>
          <p className="text-[14px] font-medium text-indigo-100 mb-0.5">
            Your AI shopping assistant
          </p>
          <p className="text-[13px] text-indigo-300/70 leading-relaxed">
            Based on your browsing, you might love these picks.{" "}
            <span className="text-indigo-300 font-medium">
              3 items dropped in price today!
            </span>
          </p>
        </div>
      </div>

      <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors">
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.499-13.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
          />
        </svg>
        See my picks
      </button>
    </section>
  );
}
