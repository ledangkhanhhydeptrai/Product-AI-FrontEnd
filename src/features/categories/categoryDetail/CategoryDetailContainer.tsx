import React from "react";

import {
  FolderOpen,
  CalendarDays,
  Link as LinkIcon,
  Loader2,
  AlertCircle,
  ShoppingBag,
  Hash,
  TrendingUp,
  Eye,
  Box,
  ArrowLeft
} from "lucide-react";
import { categoryDetailRequest } from "../categorySlice";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import ActivityBar from "./ActivityBar";
import { useAppSelector } from "../../../hooks/useAppSelector";

const ACTIVITY = [28, 42, 35, 55, 38, 62, 48, 70, 44, 58, 80, 65];

const CategoryDetailContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { categories, loading, error } = useAppSelector(
    (state) => state.category
  );

  React.useEffect(() => {
    if (id) dispatch(categoryDetailRequest(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-sm text-gray-400">
        <Loader2 size={16} className="animate-spin" />
        Loading category...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-500">
          <AlertCircle size={16} />
          {error}
        </div>
      </div>
    );
  }

  if (!categories) {
    return (
      <div className="flex justify-center py-20 text-sm text-gray-400">
        Category not found
      </div>
    );
  }

  return (
    <div className="bg-[#F8F7FF]">
      <div className="">
        <div className="bg-white border border-gray-100 overflow-hidden shadow-sm">
          {/* ── Hero ── */}
          <div className="relative bg-[#1E1B4B] px-7 pt-7 pb-0 overflow-hidden">
            {/* Glow spots */}
            <div className="absolute -top-14 -right-14 w-64 h-64 rounded-full bg-violet-500/20 blur-[50px] pointer-events-none" />
            <div className="absolute -bottom-8 -left-5 w-44 h-44 rounded-full bg-indigo-500/15 blur-[35px] pointer-events-none" />
            <div className="absolute top-5 left-1/2 w-32 h-32 rounded-full bg-purple-400/8 blur-[25px] pointer-events-none" />

            {/* Top row */}
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  title="Button back"
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/15 transition-colors"
                >
                  <ArrowLeft size={18} />
                </button>

                <div className="relative">
                  <div className="w-13 h-13 rounded-[14px] bg-white/10 border border-white/20 flex items-center justify-center">
                    <FolderOpen size={24} className="text-white" />
                  </div>

                  <div className="absolute -inset-1 rounded-[18px] border border-indigo-300/20 pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-400/12 border border-emerald-400/30 text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/7 border border-white/10 text-indigo-300/70">
                  {categories.id}
                </span>
              </div>
            </div>

            <h1 className="relative mt-4 text-[28px] font-bold text-white tracking-tight leading-tight">
              {categories.name}
            </h1>
            <p className="relative mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-indigo-500">
              Category · Product Catalog
            </p>

            {/* Separator */}
            <div className="relative mt-5 flex items-center gap-2">
              <div className="flex-1 h-px bg-white/10" />
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full bg-indigo-400/30"
                />
              ))}
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Meta strip */}
            <div className="relative flex">
              {[
                {
                  icon: CalendarDays,
                  val: new Date(categories.created_at).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    }
                  ),
                  lbl: "Created"
                },
                { icon: Box, val: "342", lbl: "Products" },
                { icon: Eye, val: "18.4k", lbl: "Views" },
                { icon: TrendingUp, val: "+12%", lbl: "This month" }
              ].map(({ icon: Icon, val, lbl }, i, arr) => (
                <div
                  key={lbl}
                  className={`flex-1 flex flex-col items-center gap-1 py-3.5 cursor-default hover:bg-white/3 transition-colors ${
                    i < arr.length - 1 ? "border-r border-white/7" : ""
                  }`}
                >
                  <Icon size={13} className="text-indigo-400" />
                  <span className="text-xs font-semibold text-indigo-200">
                    {val}
                  </span>
                  <span className="text-[10px] text-gray-600 font-medium">
                    {lbl}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Wave */}
          <div className="bg-[#1E1B4B]">
            <svg
              viewBox="0 0 680 24"
              preserveAspectRatio="none"
              className="w-full h-6 block"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,0 C120,24 240,0 360,16 C480,32 600,8 680,0 L680,24 L0,24 Z"
                fill="white"
              />
            </svg>
          </div>

          {/* ── Body ── */}
          <div className="px-7 py-5 flex flex-col gap-5">
            {/* Description */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-gray-100">
                Description
              </p>
              <p className="text-[13.5px] text-gray-700 leading-[1.75]">
                {categories.description || "No description available."}
              </p>
            </div>

            {/* Details grid */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-gray-100">
                Details
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="border border-gray-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#EEEDFE] flex items-center justify-center">
                      <LinkIcon size={13} className="text-[#534AB7]" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[.06em]">
                      Slug
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[#534AB7] bg-[#EEEDFE] px-2.5 py-1 rounded-lg">
                    <Hash size={10} />
                    {categories.slug}
                  </span>
                </div>

                <div className="border border-gray-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#E1F5EE] flex items-center justify-center">
                      <CalendarDays size={13} className="text-[#0F6E56]" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[.06em]">
                      Created At
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(categories.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Activity chart */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-gray-100">
                Product activity
              </p>
              <div className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[.06em]">
                    Last 12 months
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
                    <span className="w-2 h-2 rounded-sm bg-[#7F77DD]" />
                    New listings
                  </span>
                </div>
                <ActivityBar values={ACTIVITY} />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1 border-t border-gray-100">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E1B4B] text-white text-sm font-semibold hover:bg-[#2d2a5e] transition-colors">
                <ShoppingBag size={15} />
                View Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailContainer;
