import React from "react";

interface Props {
  onFilterChange: (value: string) => void;
}

const ProductFilter: React.FC<Props> = ({ onFilterChange }) => {
  return (
    <select
      onChange={(e) => onFilterChange(e.target.value)}
      className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 bg-white hover:border-gray-300 transition-colors outline-none cursor-pointer"
      title="Lọc sản phẩm"
    >
      <option value="">Tất cả sản phẩm</option>
      <option value="price-asc">Giá: Thấp → Cao</option>
      <option value="price-desc">Giá: Cao → Thấp</option>
      <option value="name">Tên A → Z</option>
    </select>
  );
};

export default ProductFilter;
