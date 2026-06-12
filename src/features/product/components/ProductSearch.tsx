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
    <div className="flex flex-1 border border-gray-200 focus-within:border-indigo-500 rounded-xl overflow-hidden bg-white transition-colors">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tìm sản phẩm..."
        className="flex-1 px-4 py-2.5 text-[13px] text-gray-700 outline-none bg-transparent placeholder-gray-400"
      />
      <button
        onClick={() => onSearch(keyword)}
        className="flex items-center gap-2 bg-[#1E1B4B] hover:bg-indigo-900 text-indigo-100 px-4 py-2.5 text-[13px] font-medium transition-colors"
      >
        <Search size={15} />
        Tìm kiếm
      </button>
    </div>
  );
};

export default ProductSearch;
