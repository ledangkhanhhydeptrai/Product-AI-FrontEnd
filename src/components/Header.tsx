import React, { useState } from "react";

interface NavbarProps {
  cartCount: number;
  onSearchSubmit: (value: string) => void;
}

const Header: React.FC<NavbarProps> = ({ cartCount, onSearchSubmit }) => {
  const [searchValue, setSearchValue] = useState("");
  /** TODO: onSubmit → GET /api/products?q={searchValue}&categoryId={activeCategory} */

  const handleSearchSubmit = () => {
    onSearchSubmit?.(searchValue);
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-8 h-16 flex items-center justify-between gap-5 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-8.5 h-8.5 bg-linear-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center text-lg">
          🛍️
        </div>
        <span className="font-playfair font-bold text-xl text-[#1A1A2E] tracking-tight">
          Aura
          <span className="bg-linear-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            AI
          </span>
        </span>
      </div>

      {/* Search — TODO: onSubmit → GET /api/products?q={searchValue}&categoryId={activeCategory} */}
      <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 gap-2.5 flex-1 max-w-130 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
        <span className="text-gray-400 text-base">🔍</span>
        <input
          type="text"
          placeholder="Search products, brands, categories…"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          className="border-none outline-none bg-transparent text-sm h-11.5 flex-1 text-[#1A1A2E] placeholder-gray-400"
        />
        {/* TODO: onClick → trigger AI semantic search API */}
        <button
          onClick={handleSearchSubmit}
          className="bg-linear-to-br from-indigo-500 to-violet-500 text-white rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          ✦ AI
        </button>
      </div>

      {/* Nav icons */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* TODO: onClick → navigate to /wishlist */}
        <button className="bg-white border border-gray-200 rounded-full w-11 h-11 flex items-center justify-center text-lg hover:border-indigo-400 transition-colors">
          ♡
        </button>

        {/* TODO: onClick → open notification drawer — fetch /api/notifications */}
        <button className="relative bg-white border border-gray-200 rounded-full w-11 h-11 flex items-center justify-center text-lg hover:border-indigo-400 transition-colors">
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* TODO: cartCount từ GET /api/cart/count */}
        <button className="relative bg-white border border-gray-200 rounded-full w-11 h-11 flex items-center justify-center text-lg hover:border-indigo-400 transition-colors">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>

        {/* TODO: user avatar — từ GET /api/auth/me → user.avatarUrl / user.initials */}
        <div className="w-9 h-9 bg-linear-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
          A
        </div>
      </div>
    </nav>
  );
};

export default Header;