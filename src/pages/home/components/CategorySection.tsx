import React from "react";

interface Category {
  id: string;
  name: string;
  icon: string;
  count: string;
}

interface Props {
  categories: Category[];
  onCategoryChange?: (categoryId: string) => void;
}

export default function CategorySection({
  categories,
  onCategoryChange
}: Props) {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");

  const handleSelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  const allCategories = [
    { id: "all", name: "All", icon: "", count: "" },
    ...categories
  ];

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[17px] font-semibold text-gray-900">
          Browse Categories
        </h2>
        <button className="text-sm text-indigo-500 hover:text-indigo-700 font-medium transition-colors">
          View all →
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none">
        {allCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all border ${
                isActive
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
              }`}
            >
              {cat.icon && <span className="mr-1.5">{cat.icon}</span>}
              {cat.name}
              {cat.count && (
                <span
                  className={`ml-1.5 text-[11px] ${isActive ? "text-white/50" : "text-gray-400"}`}
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
