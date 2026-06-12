import React from "react";

interface Props {
  onFilterChange: (value: string) => void;
}

const ProductFilter: React.FC<Props> = ({ onFilterChange }) => {
  return (
    <select
      onChange={(e) => onFilterChange(e.target.value)}
      className="appearance-none bg-white border border-gray-200 hover:border-indigo-400 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-[13px] text-gray-700 outline-none cursor-pointer transition-colors pr-9 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-position-[right_12px_center]"
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
