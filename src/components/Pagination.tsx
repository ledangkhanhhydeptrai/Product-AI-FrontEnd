import React from "react";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography
} from "@mui/material";
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
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1.5,
        px: 1,
        py: 1.5
      }}
    >
      {/* LEFT SIDE */}
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Typography sx={{ fontSize: 13.5, color: "#64748b" }}>
          Showing{" "}
          <Typography
            component="span"
            sx={{ fontWeight: 700, color: "#1e293b" }}
          >
            {from}
          </Typography>
          –
          <Typography
            component="span"
            sx={{ fontWeight: 700, color: "#1e293b" }}
          >
            {to}
          </Typography>{" "}
          of{" "}
          <Typography
            component="span"
            sx={{ fontWeight: 700, color: "#1e293b" }}
          >
            {totalItems}
          </Typography>
        </Typography>

        {onPageSizeChange && (
          <Select
            size="small"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            sx={{
              fontSize: 13.5,
              height: 34,
              borderRadius: "10px",
              bgcolor: "#f8fafc",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2e8f0" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#cbd5e1"
              }
            }}
          >
            {pageSizeOptions.map((size) => (
              <MenuItem key={size} value={size} sx={{ fontSize: 13.5 }}>
                {size} / page
              </MenuItem>
            ))}
          </Select>
        )}
      </Stack>

      {/* RIGHT SIDE (PAGINATION BUTTONS) */}
      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
        <IconButton
          size="small"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          sx={{
            width: 32,
            height: 32,
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            color: "#475569",
            "&:hover": { bgcolor: "#f1f5f9" },
            "&.Mui-disabled": { color: "#cbd5e1", borderColor: "#f1f5f9" }
          }}
        >
          <ChevronLeftRoundedIcon fontSize="small" />
        </IconButton>

        {pages.map((p, i) =>
          p === "..." ? (
            <Typography
              key={`dots-${i}`}
              sx={{ px: 1, fontSize: 13.5, color: "#94a3b8" }}
            >
              …
            </Typography>
          ) : (
            <Box
              key={p}
              onClick={() => onPageChange(p as number)}
              sx={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                userSelect: "none",
                transition: "all 0.15s ease",
                color: p === page ? "#fff" : "#475569",
                bgcolor: p === page ? "primary.main" : "transparent",
                boxShadow:
                  p === page ? "0 4px 10px rgba(99,102,241,0.35)" : "none",
                "&:hover": {
                  bgcolor: p === page ? "primary.main" : "#f1f5f9"
                }
              }}
            >
              {p}
            </Box>
          )
        )}

        <IconButton
          size="small"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          sx={{
            width: 32,
            height: 32,
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            color: "#475569",
            "&:hover": { bgcolor: "#f1f5f9" },
            "&.Mui-disabled": { color: "#cbd5e1", borderColor: "#f1f5f9" }
          }}
        >
          <ChevronRightRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
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
