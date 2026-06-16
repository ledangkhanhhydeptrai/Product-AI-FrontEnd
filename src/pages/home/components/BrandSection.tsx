import React from "react";
import { ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { RootState } from "../../../app/store";
import { getBrandRequest } from "../../../features/brands/brandSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

const DOT_COLORS = [
  "#7F77DD",
  "#D4537E",
  "#1D9E75",
  "#D85A30",
  "#BA7517",
  "#378ADD"
];

export default function BrandContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: brands } = useAppSelector((state: RootState) => state.brand);

  const [activeBrand, setActiveBrand] = React.useState("all");

  React.useEffect(
    () => {
      dispatch(getBrandRequest());
    },
    [dispatch]
  );

  const getDotColor = (color: string) => {
    switch (color) {
      case "#378ADD":
        return "bg-blue-500";
      case "#1D9E75":
        return "bg-green-500";
      case "#D4537E":
        return "bg-red-500";
      case "#BA7517":
        return "bg-yellow-500";
      default:
        return "bg-indigo-500";
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <h2 className="text-[15px] font-medium text-gray-900">
            Browse brands
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            {brands.length} brands available
          </p>
        </div>

        <button
          onClick={() => navigate("/brandAll")}
          className="flex items-center gap-1 text-[12px] font-medium text-[#534AB7] hover:text-[#3C3489] transition-colors"
        >
          View all
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveBrand("all")}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap border transition-all ${activeBrand ===
          "all"
            ? "bg-[#1E1B4B] text-indigo-200 border-transparent"
            : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-800"}`}
        >
          All
        </button>

        {brands.map((brand, i) => {
          const isActive = activeBrand === brand.id;
          const dotColor = DOT_COLORS[i % DOT_COLORS.length];

          return (
            <button
              key={brand.id}
              onClick={() => setActiveBrand(brand.id)}
              className={`shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap border transition-all ${isActive
                ? "bg-[#1E1B4B] text-indigo-200 border-transparent"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-800"}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive
                  ? "bg-indigo-300"
                  : getDotColor(dotColor)}`}
              />
              {brand.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
