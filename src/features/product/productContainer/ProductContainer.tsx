import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import type { RootState } from "../../../app/store";

import ProductCard from "../components/ProductCard";
import ProductSearch from "../components/ProductSearch";
import ProductFilter from "../components/ProductFilter";

import { productRequest } from "../productSlice";

export default function ProductContainer() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.product
  );

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
    <div className="space-y-5">
      <div className="flex gap-3 items-center flex-wrap">
        <ProductSearch onSearch={setKeyword} />
        <ProductFilter onFilterChange={setFilterValue} />
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden animate-pulse"
            >
              <div className="h-36 bg-gray-100" />
              <div className="p-4 space-y-3">
                <div className="h-3 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400 text-sm">
          Không tìm thấy sản phẩm nào.
        </div>
      )}

      {!loading && (
        <>
          <p className="text-sm text-gray-400">{filtered.length} sản phẩm</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
