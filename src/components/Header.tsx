import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

export interface NavbarProps {
  cartCount: number;
  onSearchSubmit: (value: string) => void;
}

const Header: React.FC<NavbarProps> = ({ cartCount, onSearchSubmit }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // STATE
  const user = useAppSelector((state) => state.profile.user);
  const loading = useAppSelector((state) => state.profile.loading);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const userName = user?.fullName || "";

  const getInitials = (fullName: string) => {
    if (!fullName) return "U";
    return fullName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // click outside dropdown
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

  // logout
  const handleLogout = () => {
    dispatch(logoutRequest());
    setIsUserDropdownOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-7 h-16 flex items-center justify-between gap-4 sticky top-0 z-50">
      {/* LOGO */}
      <div
        className="flex items-center gap-2.5 shrink-0 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="w-9 h-9 bg-indigo-500 rounded-[10px] flex items-center justify-center text-white text-lg">
          🛍️
        </div>
        <span className="text-[19px] font-semibold text-[#1A1A2E] tracking-tight">
          Aura<span className="text-indigo-500">AI</span>
        </span>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-2.5 flex-1 max-w-115 h-10.5 bg-gray-50 border border-gray-200 rounded-full px-4 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
        <span className="text-gray-400 text-[17px]">🔍</span>
        <input
          type="text"
          placeholder="Search products, brands, categories…"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearchSubmit(searchValue)}
          className="flex-1 outline-none bg-transparent text-sm text-[#1A1A2E] placeholder-gray-400"
        />
        <button
          onClick={() => onSearchSubmit(searchValue)}
          className="flex items-center gap-1.5 bg-indigo-500 hover:opacity-85 text-white rounded-full h-7.5 px-3.5 text-xs font-medium transition-opacity shrink-0"
        >
          ✦ AI
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 shrink-0">
        {/* WISHLIST */}
        <button
          onClick={() => navigate("/wishlist")}
          className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-all text-lg"
        >
          ♡
        </button>

        {/* NOTIFICATIONS */}
        <button
          onClick={() => navigate("/notifications")}
          className="relative w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-all text-lg"
        >
          🔔
        </button>

        {/* CART */}
        <button
          onClick={() => navigate("/cart")}
          className="relative w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-all text-lg"
        >
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 bg-indigo-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center px-1 border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>

        {/* DIVIDER */}
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* AUTH */}
        {isAuthenticated && user ? (
          <div className="relative" ref={dropdownRef}>
            {/* USER PILL */}
            <div
              onClick={() => setIsUserDropdownOpen((p) => !p)}
              className="flex items-center gap-2 pl-1 pr-2.5 py-1 border border-gray-200 rounded-full cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              {/* AVATAR */}
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-medium overflow-hidden">
                {loading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                ) : user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(userName)
                )}
              </div>

              {/* NAME */}
              <span className="text-[13px] font-medium text-[#1A1A2E] whitespace-nowrap max-w-27.5 truncate">
                {userName || "User"}
              </span>

              {/* ARROW */}
              <svg
                className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                  isUserDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* DROPDOWN */}
            {isUserDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-white border border-gray-200 rounded-xl overflow-hidden z-50 shadow-sm">
                <div className="px-3.5 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-[#1A1A2E]">
                    {userName}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
                </div>

                <div className="p-1.5">
                  {[
                    { label: "Profile", icon: "👤", path: "/profile" },
                    { label: "Orders", icon: "📦", path: "/orders" }
                  ].map(({ label, icon, path }) => (
                    <button
                      key={path}
                      onClick={() => {
                        navigate(path);
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span>{icon}</span>
                      {label}
                    </button>
                  ))}

                  <div className="h-px bg-gray-100 my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2.5 text-sm text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <span>🚪</span>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* GUEST */
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/login")}
              className="h-9 px-4 text-sm font-medium text-indigo-500 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              Đăng nhập
            </button>

            <button
              onClick={() => navigate("/register")}
              className="h-9 px-4 text-sm font-medium text-white bg-indigo-500 rounded-full hover:opacity-85 transition-opacity"
            >
              Đăng ký
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
