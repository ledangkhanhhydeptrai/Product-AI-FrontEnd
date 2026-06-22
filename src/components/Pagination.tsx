import React from "react";
import { IconButton, Select, MenuItem } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

interface PaginationProps {
  page: number;
  pageCount: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageCount,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50]
}) => {
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  const pages = buildPageList(page, pageCount);

  return (
    <div className="flex items-center justify-between px-2 py-3 flex-wrap gap-3">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-slate-500">
          Showing <b className="text-slate-800 font-semibold">{from}</b>–
          <b className="text-slate-800 font-semibold">{to}</b> of{" "}
          <b className="text-slate-800 font-semibold">{totalItems}</b>
        </p>

        {onPageSizeChange && (
          <Select
            size="small"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="text-sm h-8 rounded-lg bg-slate-50"
          >
            {pageSizeOptions.map((size) => (
              <MenuItem key={size} value={size} className="text-sm">
                {size} / page
              </MenuItem>
            ))}
          </Select>
        )}
      </div>

      {/* RIGHT SIDE (PAGINATION BUTTONS) */}
      <div className="flex items-center gap-1">
        {/* PREV */}
        <IconButton
          size="small"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="
            w-8 h-8 rounded-lg border border-slate-200
            text-slate-600 hover:bg-slate-100
            disabled:text-slate-300 disabled:border-slate-100
          "
        >
          <ChevronLeftRoundedIcon fontSize="small" />
        </IconButton>

        {/* PAGES */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-2 text-sm text-slate-400">
              …
            </span>
          ) : (
            <div
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`
                w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold cursor-pointer
                ${
                  p === page
                    ? "bg-indigo-500 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `}
            >
              {p}
            </div>
          )
        )}

        {/* NEXT */}
        <IconButton
          size="small"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className="
            w-8 h-8 rounded-lg border border-slate-200
            text-slate-600 hover:bg-slate-100
            disabled:text-slate-300 disabled:border-slate-100
          "
        >
          <ChevronRightRoundedIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};

export default Pagination;

/* ================= Helper ================= */

function buildPageList(current: number, count: number): (number | "...")[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(count - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < count - 2) pages.push("...");

  pages.push(count);

  return pages;
}
