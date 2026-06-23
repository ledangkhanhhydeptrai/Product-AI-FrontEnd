import { useNavigate } from "react-router-dom";
import { CreateCategoryPropsChildren } from "../../../features/categories/categoryTypes";

export default function UpdateCategoryForm({
  name,
  setName,
  description,
  setDescription,
  slug,
  setSlug,
  onSubmit
}: CreateCategoryPropsChildren) {
  const navigate = useNavigate();
  const handleAutoSlug = () => {
    if (!slug && name) {
      setSlug(
        name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
      );
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
    >
      {/* HEADER */}
      <div className="px-6 py-5 bg-linear-to-br from-indigo-50 to-violet-50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4.5 h-4.5"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-800">
              Update category
            </h2>
            <p className="text-sm text-slate-500">
              Add a new category to organize your products
            </p>
          </div>
        </div>
      </div>

      {/* FIELDS */}
      <div className="px-6 py-6 space-y-5">
        {/* NAME */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Category name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleAutoSlug}
              placeholder="e.g. Living room furniture"
              required
              className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
            />
          </div>
        </div>

        {/* SLUG */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Slug <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
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
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. living-room-furniture"
              required
              className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
            />
          </div>
          <p className="text-xs text-slate-400">
            Used in the URL. Lowercase, separated by hyphens.
          </p>
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe what belongs in this category..."
            rows={4}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 resize-none transition focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 px-6 py-4 bg-slate-50/60 border-t border-slate-100">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 h-10 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 bg-white transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 h-10 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-indigo-500 to-violet-500 shadow-md shadow-indigo-200 transition hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-200"
        >
          Save category
        </button>
      </div>
    </form>
  );
}
