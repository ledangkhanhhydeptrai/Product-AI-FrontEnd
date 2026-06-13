import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AlertCircle, PackageSearch } from "lucide-react";

import type { RootState } from "../../../app/store";
import ProductCard from "../components/ProductCard";
import { productRequest } from "../productSlice";

export default function ProductContainerAll() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(productRequest());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-[14px] border border-gray-100 bg-white overflow-hidden animate-pulse"
            >
              <div className="h-30 bg-gray-100" />
              <div className="p-3.5 space-y-2.5">
                <div className="h-2.5 bg-gray-100 rounded w-3/4" />
                <div className="h-2.5 bg-gray-100 rounded w-2/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2.5 bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-[13px]">
          <AlertCircle size={15} />
          {error}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <PackageSearch size={36} className="mb-3 opacity-40" />
          <p className="text-[13px]">Không có sản phẩm nào.</p>
        </div>
      )}

      {!loading && data.length > 0 && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}