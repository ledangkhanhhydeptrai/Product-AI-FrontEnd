import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, AlertCircle, BadgeCheck, Search, Box } from "lucide-react";
import { RootState } from "../../../app/store";
import { getBrandRequest } from "../brandSlice";

const ACCENT_COLORS = [
  {
    bar: "#7C3AED",
    bg: "bg-[#EDE9FE]",
    text: "text-[#5B21B6]",
    link: "text-[#5B21B6]"
  },
  {
    bar: "#1D9E75",
    bg: "bg-[#E1F5EE]",
    text: "text-[#0F6E56]",
    link: "text-[#0F6E56]"
  },
  {
    bar: "#D85A30",
    bg: "bg-[#FAECE7]",
    text: "text-[#993C1D]",
    link: "text-[#993C1D]"
  },
  {
    bar: "#BA7517",
    bg: "bg-[#FAEEDA]",
    text: "text-[#854F0B]",
    link: "text-[#854F0B]"
  },
  {
    bar: "#D4537E",
    bg: "bg-[#FBEAF0]",
    text: "text-[#993556]",
    link: "text-[#993556]"
  },
  {
    bar: "#378ADD",
    bg: "bg-[#E6F1FB]",
    text: "text-[#185FA5]",
    link: "text-[#185FA5]"
  }
];

const BrandContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.brand
  );
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    dispatch(getBrandRequest());
  }, [dispatch]);

  const filtered = data.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

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
        {/* Header */}
        <div className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-[.14em] text-violet-600 mb-1">
            Catalog
          </p>
          <h1 className="text-2xl font-semibold text-gray-900">All Brands</h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse available brands in the marketplace
          </p>
        </div>

        {/* Hero banner */}
        <div className="relative rounded-2xl overflow-hidden mb-5 bg-linear-to-br from-[#2E1065] via-[#4C1D95] to-[#5B21B6]">
          <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full bg-violet-400/20 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 left-[10%] w-40 h-40 rounded-full bg-purple-500/15 blur-[30px] pointer-events-none" />
          <div className="relative flex items-center justify-between gap-4 px-6 py-5 flex-wrap">
            <div>
              <p className="text-[11px] font-medium text-violet-300 tracking-wide mb-1">
                Total brands
              </p>
              <p className="text-5xl font-bold text-white tracking-tight leading-none">
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

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {[
            {
              label: "Total brands",
              value: data.length,
              Icon: BadgeCheck,
              bg: "bg-[#EDE9FE]",
              tc: "text-[#5B21B6]"
            },
            {
              label: "Total products",
              value: "—",
              Icon: Box,
              bg: "bg-[#E1F5EE]",
              tc: "text-[#0F6E56]"
            }
          ].map(({ label, value, Icon, bg, tc }) => (
            <div
              key={label}
              className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center gap-3"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${bg}`}
              >
                <Icon size={16} className={tc} />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium">{label}</p>
                <p className="text-lg font-semibold text-gray-900">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brands..."
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-sm text-gray-400">
            No brands match "{search}"
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
                  <div className={`h-0.5 w-full bg-${color.bar}`} />
                  <div className="p-5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-sm font-bold ${color.bg} ${color.text}`}
                    >
                      {initials}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {brand.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed min-h-8">
                      {brand.description || "No description"}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <span className="font-mono text-[10px] text-gray-400">
                        {brand.id}
                      </span>
                      <span className={`text-xs font-semibold ${color.link}`}>
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

export default BrandContainer;
