import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";

interface NavbarProps {
  cartCount: number;
  onSearchSubmit: (value: string) => void;
}

const Header: React.FC<NavbarProps> = ({ cartCount, onSearchSubmit }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const userName = user ? user.fullName : "";
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearchSubmit = () => {
    onSearchSubmit(searchValue);
  };

  // initials fallback
  const getInitials = (fullName: string) => {
    if (!fullName) return "U";
    return fullName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-8 h-16 flex items-center justify-between gap-5 sticky top-0 z-50">
      {/* LOGO */}
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

      {/* SEARCH */}
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

        <button
          onClick={handleSearchSubmit}
          className="bg-linear-to-br from-indigo-500 to-violet-500 text-white rounded-full px-3 py-1 text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          ✦ AI
        </button>
      </div>

      {/* ICONS */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* WISHLIST */}
        <button
          onClick={() => navigate("/wishlist")}
          className="bg-white border border-gray-200 rounded-full w-11 h-11 flex items-center justify-center text-lg hover:border-indigo-400 transition-colors"
        >
          ♡
        </button>

        {/* NOTIFICATION */}
        <button
          onClick={() => navigate("/notifications")}
          className="relative bg-white border border-gray-200 rounded-full w-11 h-11 flex items-center justify-center text-lg hover:border-indigo-400 transition-colors"
        >
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* CART */}
        <button
          onClick={() => navigate("/cart")}
          className="relative bg-white border border-gray-200 rounded-full w-11 h-11 flex items-center justify-center text-lg hover:border-indigo-400 transition-colors"
        >
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>

        {/* USER AVATAR */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setIsUserDropdownOpen((prev) => !prev)}
            className="w-9 h-9 bg-linear-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer overflow-hidden"
          >
            {user && user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                className="w-full h-full object-cover"
                title="Input image"
              />
            ) : (
              getInitials(userName)
            )}
          </div>

          {/* DROPDOWN */}
          {isUserDropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 shadow-lg rounded-xl py-2 z-50">
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 hover:bg-gray-50"
              >
                Profile
              </button>

              <button
                onClick={() => navigate("/orders")}
                className="w-full text-left px-4 py-2 hover:bg-gray-50"
              >
                Orders
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
