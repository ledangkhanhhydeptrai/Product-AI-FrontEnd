import { useEffect, useState } from "react";
import { AlertCircle, LayoutGrid, LayoutList, PackageX } from "lucide-react";

import ProductCard from "../components/ProductCard";
import { productRequest } from "../productSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

type ViewType = "grid" | "list";

export default function ProductContainerAll() {
  const dispatch = useAppDispatch();
  const [view, setView] = useState<ViewType>("grid");

  const { data, loading, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(productRequest());
  }, [dispatch]);

  return (
    <div className="py-2">
      {/* Header */}
      <div className="flex items-end justify-between mb-6 gap-3">
        <div>
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Kho hàng
          </div>
          <h1 className="text-[22px] font-medium text-gray-900 m-0 leading-tight">
            Tất cả sản phẩm
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!loading && !error && data.length > 0 && (
            <div className="flex items-center gap-1.5 text-[12px] text-gray-500 border border-gray-200 bg-white px-3 py-1.5 rounded-full">
              <span className="font-medium text-gray-900">{data.length}</span>
              sản phẩm
            </div>
          )}
          <button
            onClick={() => setView((v) => (v === "grid" ? "list" : "grid"))}
            className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors"
          >
            {view === "grid" ? (
              <>
                <LayoutList size={14} />
                Danh sách
              </>
            ) : (
              <>
                <LayoutGrid size={14} />
                Dạng lưới
              </>
            )}
          </button>
        </div>
      </div>

      {/* Accent stripe */}
      <div className="w-10 h-0.75 bg-amber-400 rounded-full mb-6" />

      {/* Loading skeleton */}
      {loading && (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-3 gap-3"
              : "flex flex-col gap-2"
          }
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-100 bg-white overflow-hidden animate-pulse"
            >
              {view === "grid" ? (
                <>
                  <div className="h-[0.75 bg-amber-100" />
                  <div className="h-28 bg-amber-50" />
                  <div className="p-3 space-y-2">
                    <div className="h-2.5 bg-gray-100 rounded-full w-[68%]" />
                    <div className="h-2 bg-gray-100 rounded-full w-[42%]" />
                    <div className="flex justify-between pt-0.5">
                      <div className="h-2.5 bg-gray-100 rounded-full w-[30%]" />
                      <div className="h-2 bg-gray-100 rounded-full w-[22%]" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3 p-3">
                  <div className="w-2 self-stretch bg-amber-100 rounded-sm shrink-0" />
                  <div className="w-10 h-10 rounded-lg bg-amber-50 shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2.5 bg-gray-100 rounded-full w-[50%]" />
                    <div className="h-2 bg-gray-100 rounded-full w-[30%]" />
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full w-[15%]" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2.5 bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-[13px]">
          <AlertCircle size={15} className="shrink-0" />
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4">
            <PackageX size={26} className="text-amber-700" />
          </div>
          <p className="text-[14px] font-medium text-gray-500 m-0 mb-1">
            Chưa có sản phẩm
          </p>
          <p className="text-[12px] text-gray-400 m-0">
            Thêm sản phẩm đầu tiên vào kho hàng
          </p>
        </div>
      )}

      {/* Products */}
      {!loading && !error && data.length > 0 && (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-3 gap-3"
              : "flex flex-col gap-2"
          }
        >
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
