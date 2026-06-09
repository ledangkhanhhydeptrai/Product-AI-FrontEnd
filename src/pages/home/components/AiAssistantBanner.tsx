export default function AiAssistantBanner() {
  return (
    <section className="bg-indigo-50 border border-indigo-100 rounded-2xl px-6 py-5 mb-10 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 text-indigo-600"
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
          <p className="text-sm font-semibold text-indigo-800 mb-0.5">
            Your AI Shopping Assistant
          </p>
          <p className="text-sm text-indigo-500 leading-relaxed">
            Based on your browsing, you might love these picks.{" "}
            <span className="font-medium text-indigo-600">
              3 items dropped in price today!
            </span>
          </p>
        </div>
      </div>

      <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2">
        <span className="text-indigo-200">✦</span>
        See My Picks
      </button>
    </section>
  );
}
