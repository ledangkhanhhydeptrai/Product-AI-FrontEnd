import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBrandIdRequest } from "../brandSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

const BrandDetailContainer: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { brands, loading, error } = useAppSelector((state) => state.brand);

  useEffect(() => {
    if (id) dispatch(getBrandIdRequest(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
          <div className="h-0.5 bg-blue-400 w-full" />
          <div className="flex items-start gap-6 p-8 border-b border-gray-100">
            <div className="w-18 h-18 bg-gray-100 rounded-xl shrink-0 mt-1.5" />
            <div className="flex-1 space-y-3 pt-1">
              <div className="h-6 bg-gray-100 rounded w-36" />
              <div className="flex gap-2">
                <div className="h-5 bg-gray-100 rounded-full w-16" />
                <div className="h-5 bg-gray-100 rounded-full w-16" />
              </div>
              <div className="h-3 bg-gray-100 rounded w-64" />
            </div>
          </div>
          <div className="px-8 py-6 space-y-4">
            <div className="h-3 bg-gray-100 rounded w-24" />
            <div className="h-4 bg-gray-100 rounded w-3/4" />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="h-14 bg-gray-50 rounded-xl" />
              <div className="h-14 bg-gray-50 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-white border border-red-100 rounded-2xl p-8 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">
              Something went wrong
            </p>
            <p className="text-sm text-red-400 mt-0.5">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!brands) {
    return (
      <div className="p-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-500">Brand not found</p>
          <p className="text-xs text-gray-400 mt-1">
            This brand may have been removed or doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-white border border-gray-100 overflow-hidden">
        {/* Top accent */}
        <div className="h-0.5 bg-blue-500 w-full" />
        <button
          onClick={() => navigate(-1)}
          className="text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Quay lại
        </button>
        {/* Header */}
        <div className="flex items-start gap-6 p-8 border-b border-gray-100">
          <div className="w-18 h-18 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden mt-1.5">
            {brands.logo ? (
              <img
                src={brands.logo}
                alt={`${brands.name} logo`}
                className="w-14 h-14 object-contain"
              />
            ) : (
              <svg
                className="w-8 h-8 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              {brands.name}
            </h1>
            <div className="flex items-center gap-2 mb-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-100">
                Brand
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-800 border border-green-100">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block" />
                Active
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono truncate">
              {brands.id}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            Description
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {brands.description}
          </p>

          <hr className="my-5 border-gray-100" />

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-[11px] text-gray-400 mb-1">Brand ID</p>
              <p className="text-[11px] font-mono text-gray-600 truncate">
                {brands.id?.slice(0, 18)}…
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-[11px] text-gray-400 mb-1">Logo</p>
              <p className="text-sm font-medium text-gray-700">
                {brands.logo ? "Uploaded" : "No logo"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-3.5 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-600" />
            <span className="text-xs text-gray-400">Active brand</span>
          </div>
          <button className="text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors flex items-center gap-1.5">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandDetailContainer;
