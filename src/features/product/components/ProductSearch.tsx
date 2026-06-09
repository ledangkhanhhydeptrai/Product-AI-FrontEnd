import React, { useState } from "react";
import { Search } from "lucide-react";

interface Props {
  onSearch: (keyword: string) => void;
}

const ProductSearch: React.FC<Props> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch(keyword);
  };

  return (
    <div className="flex flex-1 border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tìm sản phẩm..."
        className="flex-1 px-4 py-2.5 text-sm text-gray-700 outline-none bg-white placeholder-gray-400"
      />
      <button
        onClick={() => onSearch(keyword)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-sm transition-colors"
      >
        <Search size={16} />
        Tìm kiếm
      </button>
    </div>
  );
};

export default ProductSearch;
