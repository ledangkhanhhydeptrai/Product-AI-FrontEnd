import { useEffect, useState } from "react";
import { AlertCircle, PackageSearch } from "lucide-react";

import ProductCard from "../components/ProductCard";
import ProductSearch from "../components/ProductSearch";
import ProductFilter from "../components/ProductFilter";
import { productRequest } from "../productSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

export default function ProductContainer() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.product);
  const [keyword, setKeyword] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    dispatch(productRequest());
  }, [dispatch]);

  const filtered = [...data]
    .filter((p) => p.name.toLowerCase().includes(keyword.toLowerCase()))
    .sort((a, b) => {
      if (filterValue === "price-asc") return a.price - b.price;
      if (filterValue === "price-desc") return b.price - a.price;
      if (filterValue === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex gap-2.5 items-center flex-wrap">
        <ProductSearch onSearch={setKeyword} />
        <ProductFilter onFilterChange={setFilterValue} />
      </div>

      {/* Skeleton loading */}
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

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2.5 bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-[13px]">
          <AlertCircle size={15} className="shrink-0" />
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <PackageSearch size={36} className="mb-3 opacity-40" />
          <p className="text-[13px]">Không tìm thấy sản phẩm nào.</p>
        </div>
      )}

      {/* Results */}
      {!loading && filtered.length > 0 && (
        <>
          <p className="text-[12px] text-gray-400">
            {filtered.length} sản phẩm
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
