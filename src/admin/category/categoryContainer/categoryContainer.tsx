import React from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { categoryRequest } from "../../../features/categories/categorySlice";
import DataTable, { Column } from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import { CategoryProps } from "../../../features/categories/categoryTypes";

import {
  Box,
  Typography,
  Button,
  Paper,
  InputBase,
  Chip,
  Skeleton,
  IconButton
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const CategoryContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.category);

  // ================= LOCAL STATE =================
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [search, setSearch] = React.useState("");

  // ================= FETCH DATA =================
  React.useEffect(() => {
    dispatch(categoryRequest());
  }, [dispatch]);

  // ================= SAFE DATA =================
  const safeData: CategoryProps[] = Array.isArray(data) ? data : [];

  const filteredData = safeData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.slug.toLowerCase().includes(search.toLowerCase())
  );

  // ================= PAGINATION =================
  const totalItems = filteredData.length;
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // ================= COLUMNS =================
  const columns: Column<CategoryProps>[] = [
    {
      id: "id",
      label: "ID",
      align: "left",
      width: 70,
      render: (row) => (
        <Typography sx={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>
          #{row.id}
        </Typography>
      )
    },
    {
      id: "name",
      label: "Name",
      align: "left",
      render: (row) => (
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>
          {row.name}
        </Typography>
      )
    },
    {
      id: "slug",
      label: "Slug",
      align: "left",
      render: (row) => (
        <Chip
          label={row.slug}
          size="small"
          sx={{
            fontSize: 12.5,
            fontWeight: 500,
            bgcolor: "#f4f5f7",
            color: "#475569",
            borderRadius: "6px"
          }}
        />
      )
    },
    {
      id: "description",
      label: "Description",
      align: "left",
      render: (row) => (
        <Typography
          sx={{
            fontSize: 13.5,
            color: row.description ? "#475569" : "#cbd5e1",
            maxWidth: 320,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {row.description || "No description"}
        </Typography>
      )
    },
    {
      id: "created_at",
      label: "Created At",
      align: "left",
      render: (row) => (
        <Typography sx={{ fontSize: 13.5, color: "#64748b" }}>
          {row.created_at
            ? new Date(row.created_at).toLocaleString("vi-VN")
            : "-"}
        </Typography>
      )
    },
    {
      id: "actions",
      label: "",
      align: "right",
      width: 90,
      render: () => (
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
          <IconButton
            size="small"
            sx={{ color: "#64748b", "&:hover": { color: "#6366F1" } }}
          >
            <EditRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ color: "#64748b", "&:hover": { color: "#dc2626" } }}
          >
            <DeleteOutlineRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      )
    }
  ];

  // ================= ERROR STATE =================
  if (error) {
    return (
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #fee2e2",
          borderRadius: "14px",
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
          bgcolor: "#fff7f7"
        }}
      >
        <ErrorOutlineRoundedIcon sx={{ fontSize: 32, color: "#dc2626" }} />
        <Typography sx={{ fontWeight: 600, color: "#991b1b" }}>
          Could not load categories
        </Typography>
        <Typography sx={{ fontSize: 13.5, color: "#b91c1c" }}>
          {String(error)}
        </Typography>
        <Button
          size="small"
          startIcon={<RefreshRoundedIcon />}
          onClick={() => dispatch(categoryRequest())}
          sx={{ mt: 1, textTransform: "none", fontWeight: 600 }}
        >
          Try again
        </Button>
      </Paper>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      {/* PAGE HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
            Categories
          </Typography>
          <Typography sx={{ fontSize: 13.5, color: "#64748b", mt: 0.25 }}>
            {totalItems} {totalItems === 1 ? "category" : "categories"} in total
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "10px",
            bgcolor: "#6366F1",
            boxShadow: "none",
            "&:hover": { bgcolor: "#4f46e5", boxShadow: "none" }
          }}
        >
          Add category
        </Button>
      </Box>

      {/* TOOLBAR */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          height: 42,
          px: 1.75,
          width: { xs: "100%", sm: 320 },
          borderRadius: "10px",
          bgcolor: "#fff",
          border: "1px solid #eef0f3",
          "&:focus-within": {
            borderColor: "#6366F1",
            boxShadow: "0 0 0 3px rgba(99,102,241,0.12)"
          }
        }}
      >
        <SearchRoundedIcon sx={{ fontSize: 19, color: "#94a3b8" }} />
        <InputBase
          placeholder="Search by name or slug..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          sx={{ flex: 1, fontSize: 14 }}
        />
      </Box>

      {/* TABLE */}
      {loading ? (
        <Box
          sx={{
            border: "1px solid #eef0f3",
            borderRadius: "14px",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.25
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={44}
              sx={{ borderRadius: "8px" }}
            />
          ))}
        </Box>
      ) : (
        <DataTable
          columns={columns}
          rows={paginatedData}
          rowKey={(row) => row.id}
          emptyText="No categories found"
          emptyHint={
            search
              ? "Try a different search term."
              : "Create your first category to get started."
          }
        />
      )}

      {/* PAGINATION */}
      {!loading && totalItems > 0 && (
        <Pagination
          page={page}
          pageCount={pageCount}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={[5, 10, 20, 50]}
        />
      )}
    </Box>
  );
};

export default CategoryContainer;
