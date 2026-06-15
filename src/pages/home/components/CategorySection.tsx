import React from "react";
import { ArrowRight } from "lucide-react";
import { CategoryProps } from "../../../features/categories/categoryTypes";
import { useNavigate } from "react-router-dom";

interface Props {
  categories: CategoryProps[];
  onCategoryChange: (categoryId: string) => void;
}

const DOT_COLORS = [
  "#7F77DD", // purple
  "#D4537E", // pink
  "#1D9E75", // teal
  "#D85A30", // coral
  "#BA7517", // amber
  "#378ADD" // blue
];

export default function CategorySection({
  categories,
  onCategoryChange
}: Props) {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const navigate = useNavigate();
  const getDotColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "red":
        return "bg-red-500";
      case "yellow":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };
  const handleSelect = (id: string) => {
    setActiveCategory(id);
    onCategoryChange(id);
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-[15px] font-medium text-gray-900">
          Browse categories
        </h2>

        <button onClick={()=>navigate("/categoriesAll")} className="flex items-center gap-1 text-[12px] font-medium text-[#534AB7] hover:text-[#3C3489] transition-colors">
          View all
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {/* All pill */}
        <button
          onClick={() => handleSelect("all")}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap border transition-all ${
            activeCategory === "all"
              ? "bg-[#1E1B4B] text-indigo-200 border-transparent"
              : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-800"
          }`}
        >
          All
        </button>

        {categories.map((cat, i) => {
          const isActive = activeCategory === cat.id;
          const dotColor = DOT_COLORS[i % DOT_COLORS.length];

          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap border transition-all ${
                isActive
                  ? "bg-[#1E1B4B] text-indigo-200 border-transparent"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  isActive ? "bg-indigo-300" : getDotColor(dotColor)
                }`}
              />
              {cat.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
