import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { RootState } from "../../../app/store";
import { getBrandRequest } from "../brandSlice";

const ACCENT_COLORS = [
  { bar: "#7C3AED", bg: "#EDE9FE", text: "#5B21B6" },
  { bar: "#D4537E", bg: "#FBEAF0", text: "#993556" },
  { bar: "#1D9E75", bg: "#E1F5EE", text: "#0F6E56" },
  { bar: "#D85A30", bg: "#FAECE7", text: "#993C1D" },
  { bar: "#BA7517", bg: "#FAEEDA", text: "#854F0B" },
  { bar: "#378ADD", bg: "#E6F1FB", text: "#185FA5" }
];

interface Props {
  filterBrandId?: string;
}

const BrandContainerAll: React.FC<Props> = ({ filterBrandId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.brand
  );

  React.useEffect(() => {
    dispatch(getBrandRequest());
  }, [dispatch]);

  const filtered =
    filterBrandId && filterBrandId !== "all"
      ? data.filter((b) => b.id === filterBrandId)
      : data;

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-sm text-gray-400">
        <Loader2 size={16} className="animate-spin" /> Loading brands...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-500">
          <AlertCircle size={16} /> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F7FF] min-h-screen">
      <div className="p-6">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-700 bg-white border border-violet-200 rounded-xl px-3.5 py-1.5 mb-5 hover:bg-violet-50 transition-colors"
        >
          <ArrowLeft size={14} /> Quay lại
        </button>

        {/* Header */}
        <p className="text-[10px] font-bold uppercase tracking-[.14em] text-violet-600 mb-1">
          Catalog
        </p>
        <h1 className="text-2xl font-semibold text-gray-900">All Brands</h1>
        <p className="text-sm text-gray-500 mt-1 mb-5">
          Browse available brands in the marketplace
        </p>

        {/* Hero banner */}
        <div className="rounded-2xl overflow-hidden mb-5 bg-[#3B0764]">
          <div className="flex items-center justify-between gap-4 px-6 py-5 flex-wrap">
            <div>
              <p className="text-[11px] font-medium text-violet-300 mb-1">
                Total brands
              </p>
              <p className="text-5xl font-bold text-white leading-none">
                {data.length}
              </p>
              <p className="text-xs text-violet-500 mt-1.5">
                across the marketplace
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 max-w-xs justify-end">
              {data.slice(0, 6).map((b) => (
                <span
                  key={b.id}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium text-violet-200 border border-violet-400/25 bg-white/[.07]"
                >
                  {b.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-sm text-gray-400">
            No brands found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {filtered.map((brand, i) => {
              const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
              const initials = brand.name.slice(0, 2).toUpperCase();
              return (
                <div
                  key={brand.id}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-violet-200 hover:shadow-[0_2px_12px_rgba(109,40,217,0.08)] transition-all cursor-pointer"
                >
                  {/* Image / placeholder */}
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-24 object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-24 flex items-center justify-center text-3xl font-bold tracking-wider bg-${color.bar} text-${color.text}`}
                    >
                      {initials}
                    </div>
                  )}
                  <div className={`h-0.5 w-full bg-${color.bar}`} />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {brand.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed min-h-8">
                      {brand.description || "No description"}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100">
                      <span className="font-mono text-[10px] text-gray-400">
                        {brand.id}
                      </span>
                      <span
                        className={`text-xs font-semibold text-${color.text}`}
                      >
                        View →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandContainerAll;
