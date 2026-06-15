import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Grid3X3, LayoutList, Folder, Box } from "lucide-react";

import type { RootState } from "../../../app/store";
import { categoryRequest } from "../categorySlice";
import { useNavigate } from "react-router-dom";

const ACCENT_COLORS = [
  {
    bar: "#7F77DD",
    icon: "bg-[#EEEDFE] text-[#534AB7]",
    link: "text-[#534AB7]"
  },
  {
    bar: "#1D9E75",
    icon: "bg-[#E1F5EE] text-[#0F6E56]",
    link: "text-[#0F6E56]"
  },
  {
    bar: "#D85A30",
    icon: "bg-[#FAECE7] text-[#993C1D]",
    link: "text-[#993C1D]"
  },
  {
    bar: "#BA7517",
    icon: "bg-[#FAEEDA] text-[#854F0B]",
    link: "text-[#854F0B]"
  },
  {
    bar: "#D4537E",
    icon: "bg-[#FBEAF0] text-[#993556]",
    link: "text-[#993556]"
  },
  {
    bar: "#378ADD",
    icon: "bg-[#E6F1FB] text-[#185FA5]",
    link: "text-[#185FA5]"
  }
];

export default function CategoryContainerAll() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isGrid, setIsGrid] = useState(true);

  const {
    data: categories,
    loading,
    error
  } = useSelector((state: RootState) => state.category);
  const { data } = useSelector((state: RootState) => state.product);

  React.useEffect(() => {
    if (!categories.length) {
      dispatch(categoryRequest());
    }
  }, [dispatch, categories.length]);
  const navigate = useNavigate();
  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center py-16 text-gray-400 text-sm">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-16 text-red-500 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <div className="">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
          <div>
            <p className="text-[10px] font-semibold tracking-[.12em] uppercase text-[#7F77DD] mb-1">
              Browse
            </p>
            <h1 className="text-2xl font-semibold text-gray-900">
              All Categories
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Explore and discover products by category
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories..."
                className="pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white w-52"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsGrid(true)}
              aria-label="Grid view"
              className={`p-2 rounded-lg border text-sm transition-colors ${
                isGrid
                  ? "bg-[#EEEDFE] border-[#AFA9EC] text-[#534AB7]"
                  : "bg-white border-gray-200 text-gray-500"
              }`}
            >
              <Grid3X3 size={15} />
            </button>
            <button
              type="button"
              onClick={() => setIsGrid(false)}
              aria-label="List view"
              className={`p-2 rounded-lg border text-sm transition-colors ${
                !isGrid
                  ? "bg-[#EEEDFE] border-[#AFA9EC] text-[#534AB7]"
                  : "bg-white border-gray-200 text-gray-500"
              }`}
            >
              <LayoutList size={15} />
            </button>
          </div>
        </div>

        {/* Hero banner */}
        <div className="relative rounded-2xl overflow-hidden mb-5 bg-linear-to-br from-[#1E1B4B] via-[#312E81] to-[#3730A3]">
          {/* Glow spot */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(167,139,250,0.18)_0%,transparent_60%)]" />

          <div className="relative flex items-center justify-between gap-4 px-6 py-5 flex-wrap">
            <div>
              <p className="text-[11px] font-medium text-indigo-300 tracking-wide mb-1">
                Available categories
              </p>
              <p className="text-5xl font-bold text-white tracking-tight leading-none">
                {categories.length}
              </p>
              <p className="text-xs text-indigo-400 mt-1.5">
                across {Math.ceil(categories.length / 4)} departments
              </p>
            </div>

            <div className="flex flex-wrap gap-2 max-w-sm justify-end">
              {categories.slice(0, 6).map((cat) => (
                <span
                  key={cat.id}
                  className="px-3 py-1 rounded-full text-xs font-medium text-indigo-200 border border-indigo-400/30 bg-white/[0.07] whitespace-nowrap"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {[
            {
              label: "Total categories",
              value: categories.length,
              Icon: Folder,
              bg: "bg-[#EEEDFE]",
              tc: "text-[#534AB7]"
            },
            {
              label: "Total products",
              value: data.length,
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

        {/* Categories */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-sm text-gray-400">
            No categories match "{search}"
          </div>
        ) : isGrid ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {filtered.map((category, i) => {
              const color = ACCENT_COLORS[i % ACCENT_COLORS.length];

              return (
                <div
                  key={category.id}
                  onClick={() => navigate(`/categories/${category.id}`)}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-[0_2px_12px_rgba(99,91,221,0.08)] transition-all cursor-pointer"
                >
                  <div className={`h-0.5 w-full background:${color.bar}`} />

                  <div className="p-5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${color.icon}`}
                    >
                      <Folder size={17} />
                    </div>

                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed min-h-8">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-400">
                        View details
                      </span>

                      <span className={`text-xs font-semibold ${color.link}`}>
                        Browse →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((category, i) => {
              const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
              return (
                <div
                  onClick={() => navigate(`/categories/${category.id}`)}
                  key={category.id}
                  className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center gap-4 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color.icon}`}
                  >
                    <Folder size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {category.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {category.description}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold shrink-0 ${color.link}`}
                  >
                    Browse →
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
