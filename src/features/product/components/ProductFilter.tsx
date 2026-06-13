import React, { useState, useRef, useEffect } from "react";

interface Props {
  onFilterChange: (value: string) => void;
}

const options = [
  { value: "", label: "Tất cả sản phẩm", icon: "⊞" },
  { value: "price-asc", label: "Giá: Thấp → Cao", icon: "↑" },
  { value: "price-desc", label: "Giá: Cao → Thấp", icon: "↓" },
  { value: "name", label: "Tên A → Z", icon: "A" }
];

const ProductFilter: React.FC<Props> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: (typeof options)[0]) => {
    setSelected(option);
    onFilterChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Trigger */}
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-label={`Filter: ${selected.label}`}
        title={selected.label}
        onClick={() => setIsOpen(v => !v)}
        onKeyDown={e => e.key === "Enter" && setIsOpen(v => !v)}
        className={`flex items-center gap-2 min-w-50 px-3.5 py-2.5 bg-white rounded-xl border cursor-pointer select-none transition-all duration-150
          ${isOpen
            ? "border-indigo-500 ring-2 ring-indigo-500/10"
            : "border-gray-200 hover:border-indigo-300 hover:ring-2 hover:ring-indigo-500/8"}`}
      >
        {/* Icon badge */}
        <span className="w-6 h-6 flex items-center justify-center bg-indigo-50 text-indigo-500 text-[11px] font-bold rounded-md shrink-0 leading-none">
          {selected.icon}
        </span>

        {/* Label */}
        <span className="flex-1 text-[13px] font-medium text-gray-700">
          {selected.label}
        </span>

        {/* Chevron */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen
            ? "rotate-180"
            : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {/* Dropdown */}
      {isOpen &&
        <div
          role="listbox"
          aria-label="Product filter options"
          className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border border-gray-200 rounded-2xl shadow-lg shadow-black/6 overflow-hidden animate-[fadeDown_0.15s_ease]"
        >
          {options.map((opt, i) => {
            const isActive = selected.value === opt.value;
            return (
              <div
                key={opt.value}
                role="option"
                onClick={() => handleSelect(opt)}
                title={opt.label}
                className={`flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-colors duration-100
                  ${i !== options.length - 1 ? "border-b border-gray-100" : ""}
                  ${isActive ? "bg-indigo-50" : "hover:bg-violet-50/60"}`}
              >
                {/* Option icon */}
                <span
                  className={`w-6.5 h-6.5 flex items-center justify-center rounded-lg text-[11px] font-bold shrink-0 leading-none
                    ${isActive
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-100 text-gray-500"}`}
                >
                  {opt.icon}
                </span>

                {/* Option label */}
                <span
                  className={`flex-1 text-[13px] font-medium
                    ${isActive
                      ? "text-indigo-600 font-semibold"
                      : "text-gray-700"}`}
                >
                  {opt.label}
                </span>

                {/* Check */}
                {isActive &&
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    className="w-4 h-4 text-indigo-500 shrink-0"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>}
              </div>
            );
          })}
        </div>}
    </div>
  );
};

export default ProductFilter;
