// import React from "react";
import { ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { getBrandRequest } from "../../../features/brands/brandSlice";

import React from "react";
import BrandContainerAll from "./brandContainerAll";
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
  const { data: brands } = useAppSelector((state) => state.brand);
  const [activeBrand, setActiveBrand] = React.useState("all");

  React.useEffect(() => {
    dispatch(getBrandRequest());
  }, [dispatch]);

  return (
    <div>
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="text-[15px] font-medium text-gray-900">
              Browse brands
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {activeBrand === "all" ? brands.length : 1} brand
              {activeBrand === "all" && brands.length !== 1 ? "s" : ""}{" "}
              available
            </p>
          </div>
          <button
            onClick={() => navigate("/brandAll")}
            className="flex items-center gap-1 text-[12px] font-medium text-[#534AB7] hover:text-[#3C3489] transition-colors"
          >
            View all <ArrowRight size={13} />
          </button>
        </div>

        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveBrand("all")}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium border transition-all ${
              activeBrand === "all"
                ? "bg-[#1E1B4B] text-indigo-200 border-transparent"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            All
          </button>
          {brands.map((brand, i) => {
            const isActive = activeBrand === brand.id;
            const dot = DOT_COLORS[i % DOT_COLORS.length];
            return (
              <button
                key={brand.id}
                onClick={() => setActiveBrand(brand.id)}
                className={`shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium border transition-all ${
                  isActive
                    ? "bg-[#1E1B4B] text-indigo-200 border-transparent"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-800"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 bg-${
                    isActive ? "#A5B4FC" : dot
                  }`}
                />
                {brand.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid được filter theo pill đang active */}
      <BrandContainerAll filterBrandId={activeBrand} />
    </div>
  );
}
