import React from "react";

interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode;
  count?: string;
}

interface Props {
  categories: Category[];
  onCategoryChange?: (categoryId: string) => void;
}

export default function CategorySection({
  categories,
  onCategoryChange
}: Props) {
  const [activeCategory, setActiveCategory] = React.useState("all");

  const handleSelect = (id: string) => {
    setActiveCategory(id);
    onCategoryChange?.(id);
  };

  const allCategories = [{ id: "all", name: "All" }, ...categories];

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-medium text-gray-900">
          Browse categories
        </h2>
        <a
          href="#"
          className="flex items-center gap-1 text-[13px] text-indigo-500 hover:text-indigo-700 transition-colors"
        >
          View all
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {allCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-1.75 text-[13px] font-medium whitespace-nowrap border transition-all ${
                isActive
                  ? "bg-[#1E1B4B] text-indigo-100 border-transparent"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              {cat.icon && <span className="text-[14px]">{cat.icon}</span>}
              {cat.name}
              {cat.count && (
                <span
                  className={`text-[11px] ${isActive ? "opacity-50" : "text-gray-400"}`}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
