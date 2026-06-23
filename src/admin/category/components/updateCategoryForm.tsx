import { CreateCategoryPropsChildren } from "../../../features/categories/categoryTypes";

export default function UpdateCategoryForm({
  name,
  setName,
  description,
  setDescription,
  slug,
  setSlug,
  onSubmit,
  onClose
}: CreateCategoryPropsChildren) {

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  const handleAutoSlug = () => {
    if (!slug && name) {
      setSlug(slugify(name));
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full bg-white rounded-2xl shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.12)] border border-slate-100 overflow-hidden"
    >
      {/* HEADER */}
      <div className="relative px-6 py-6 bg-linear-to-br from-indigo-600 via-indigo-500 to-violet-500 overflow-hidden">
        {/* decorative grid pattern, subtle */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          // style={{
          //   backgroundImage:
          //     "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          //   backgroundSize: "22px 22px"
          // }}
        />
        <div className="relative flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-white tracking-tight">
              Update category
            </h2>
            <p className="text-sm text-indigo-100/90">
              Edit the details and save to apply changes
            </p>
          </div>
        </div>
      </div>

      {/* FIELDS */}
      <div className="px-6 py-6 space-y-5">
        {/* NAME */}
        <div className="space-y-1.5">
          <label
            htmlFor="category-name"
            className="text-sm font-medium text-slate-700"
          >
            Category name <span className="text-rose-500">*</span>
          </label>
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M4 7V4h16v3" />
                <path d="M9 20h6" />
                <path d="M12 4v16" />
              </svg>
            </span>
            <input
              id="category-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleAutoSlug}
              placeholder="e.g. Living room furniture"
              required
              className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50/50 transition focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white"
            />
          </div>
        </div>

        {/* SLUG */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="category-slug"
              className="text-sm font-medium text-slate-700"
            >
              Slug <span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => name && setSlug(slugify(name))}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition"
            >
              Generate from name
            </button>
          </div>
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M10 13a5 5 0 0 0 7.07 0l1.93-1.93a5 5 0 0 0-7.07-7.07L10.5 5.5" />
                <path d="M14 11a5 5 0 0 0-7.07 0L4.99 12.93a5 5 0 0 0 7.07 7.07L13.5 18.5" />
              </svg>
            </span>
            <input
              id="category-slug"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="e.g. living-room-furniture"
              required
              className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50/50 font-mono transition focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white"
            />
          </div>
          {slug ? (
            <p className="text-xs text-slate-400 truncate">
              URL preview: <span className="text-slate-500">/categories/</span>
              <span className="text-indigo-600 font-medium">{slug}</span>
            </p>
          ) : (
            <p className="text-xs text-slate-400">
              Lowercase, separated by hyphens.
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="category-description"
              className="text-sm font-medium text-slate-700"
            >
              Description
            </label>
            <span className="text-xs text-slate-400">
              {description.length}/280
            </span>
          </div>
          <textarea
            id="category-description"
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 280))}
            placeholder="Briefly describe what belongs in this category..."
            rows={4}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50/50 resize-none transition focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white"
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 px-6 py-4 bg-slate-50/70 border-t border-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="px-4 h-10 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 bg-white transition hover:bg-slate-50 active:scale-[0.98]"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 h-10 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-indigo-500 to-violet-500 shadow-md shadow-indigo-200 transition hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.98]"
        >
          Save category
        </button>
      </div>
    </form>
  );
}
