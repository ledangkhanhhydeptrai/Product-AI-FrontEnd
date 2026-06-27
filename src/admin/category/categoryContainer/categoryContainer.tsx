import React from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  categoryRequest,
  deleteCategoryRequest
} from "../../../features/categories/categorySlice";
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
  IconButton,
  Dialog,
  Tooltip
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import UpdateCategoryContainer from "./updateCategoryContainer";
import CreateCategoryContainer from "./createCategoryContainer";
import { showNotification } from "../../../features/notification/notificationSlice";

const CategoryContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { dataCategory, loading, error } = useAppSelector(
    (state) => state.category
  );
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  // ================= LOCAL STATE =================
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(4);
  const [search, setSearch] = React.useState<string>("");
  const [openUpdate, setOpenUpdate] = React.useState<boolean>(false);
  const [openUpdateCreate, setOpenUpdateCreate] =
    React.useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    React.useState<CategoryProps | null>(null);
  // ================= FETCH DATA =================
  React.useEffect(() => {
    dispatch(categoryRequest());
  }, [dispatch]);

  // ================= SAFE DATA =================
  const safeData: CategoryProps[] = Array.isArray(dataCategory)
    ? dataCategory
    : [];

  const filteredData = safeData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };
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
        <Typography
          sx={{ fontSize: 13, color: "text.disabled", fontWeight: 600 }}
        >
          #{row.id}
        </Typography>
      )
    },
    {
      id: "name",
      label: "Name",
      align: "left",
      render: (row) => (
        <Typography
          sx={{ fontSize: 14, fontWeight: 600, color: "text.primary" }}
        >
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
            fontWeight: 600,
            bgcolor: "primary.50",
            color: "primary.main",
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
            color: row.description ? "text.secondary" : "text.disabled",
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
        <Typography sx={{ fontSize: 13.5, color: "text.secondary" }}>
          {row.created_at
            ? new Date(row.created_at).toLocaleString("vi-VN")
            : "-"}
        </Typography>
      )
    },
    {
      id: "actions",
      label: "Actions",
      align: "right",
      width: 110,
      render: (row) => (
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
          <Tooltip title="Edit category">
            <IconButton
              size="small"
              onClick={() => {
                setSelectedCategory(row);
                setOpenUpdate(true);
              }}
              sx={{
                color: "text.secondary",
                bgcolor: "grey.50",
                "&:hover": { color: "primary.main", bgcolor: "primary.50" }
              }}
            >
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete category">
            <IconButton
              onClick={() => handleDelete(row.id)}
              size="small"
              sx={{
                color: "text.secondary",
                bgcolor: "grey.50",
                "&:hover": { color: "error.main", bgcolor: "error.50" }
              }}
            >
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
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
          border: "1px solid",
          borderColor: "error.light",
          borderRadius: "16px",
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
          background: "linear-gradient(180deg, #fff5f5 0%, #fff 100%)"
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            bgcolor: "error.50",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ErrorOutlineRoundedIcon sx={{ fontSize: 28, color: "error.main" }} />
        </Box>
        <Typography sx={{ fontWeight: 700, color: "error.dark" }}>
          Could not load categories
        </Typography>
        <Typography sx={{ fontSize: 13.5, color: "error.main" }}>
          {String(error)}
        </Typography>
        <Button
          size="small"
          startIcon={<RefreshRoundedIcon />}
          onClick={() => dispatch(categoryRequest())}
          sx={{
            mt: 1,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "8px",
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "error.light",
            color: "error.main",
            "&:hover": { bgcolor: "error.50" }
          }}
        >
          Try again
        </Button>
      </Paper>
    );
  }

  return (
    <>
      <Box
        sx={{
          borderRadius: "18px",
          background: "linear-gradient(180deg, #fdfdff 0%, #f6f7fb 100%)",
          border: "1px solid",
          borderColor: "grey.100",
          p: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: "column",
          gap: 2.5
        }}
      >
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
            <Typography
              sx={{ fontSize: 20, fontWeight: 700, color: "text.primary" }}
            >
              Categories
            </Typography>
            <Typography
              sx={{ fontSize: 13.5, color: "text.secondary", mt: 0.25 }}
            >
              {totalItems} {totalItems === 1 ? "category" : "categories"} in
              total
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => setOpenUpdateCreate(true)}
            startIcon={<AddRoundedIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              boxShadow: "0 6px 16px rgba(99,102,241,0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                boxShadow: "0 6px 16px rgba(99,102,241,0.4)"
              }
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
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "grey.100",
            "&:focus-within": {
              borderColor: "primary.main",
              boxShadow: "0 0 0 3px rgba(99,102,241,0.12)"
            }
          }}
        >
          <SearchRoundedIcon sx={{ fontSize: 19, color: "text.disabled" }} />
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
              border: "1px solid",
              borderColor: "grey.100",
              borderRadius: "14px",
              p: 2,
              bgcolor: "background.paper",
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
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: "12px",
              border: "1px solid",
              borderColor: "grey.100",
              px: 1
            }}
          >
            <Pagination
              page={page}
              pageCount={pageCount}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={handlePageSizeChange}
              pageSizeOptions={[5, 10, 20, 50]}
            />
          </Box>
        )}
      </Box>

      {/* UPDATE DIALOG */}
      <Dialog
        open={openUpdate}
        onClose={() => {
          setOpenUpdate(false);
          setSelectedCategory(null);
        }}
        fullWidth
        maxWidth="sm"
        slotProps={{ paper: { sx: { borderRadius: "16px" } } }}
      >
        {selectedCategory && (
          <UpdateCategoryContainer
            selectedCategory={selectedCategory}
            onClose={() => {
              setOpenUpdate(false);
              setSelectedCategory(null);
            }}
          />
        )}
      </Dialog>

      {/* CONFIRM DELETE DIALOG */}
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        slotProps={{
          paper: { sx: { borderRadius: "16px", p: 1, minWidth: 320 } }
        }}
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              bgcolor: "error.50",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 1.5
            }}
          >
            <DeleteOutlineRoundedIcon sx={{ color: "error.main" }} />
          </Box>

          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
            Delete category?
          </Typography>

          <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 2.5 }}>
            This action cannot be undone.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <Button
              onClick={() => setOpenConfirm(false)}
              variant="outlined"
              color="inherit"
              sx={{ textTransform: "none", borderRadius: "8px" }}
            >
              Cancel
            </Button>

            <Button
              color="error"
              variant="contained"
              sx={{ textTransform: "none", borderRadius: "8px" }}
              onClick={() => {
                if (!deleteId) return;

                dispatch(deleteCategoryRequest(deleteId));

                dispatch(
                  showNotification({
                    message: "Delete category success",
                    severity: "success"
                  })
                );

                setOpenConfirm(false);
                setDeleteId(null);
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* CREATE DIALOG */}
      <Dialog
        open={openUpdateCreate}
        onClose={() => setOpenUpdateCreate(false)}
        fullWidth
        maxWidth="sm"
        slotProps={{ paper: { sx: { borderRadius: "16px" } } }}
      >
        <CreateCategoryContainer onClose={() => setOpenUpdateCreate(false)} />
      </Dialog>
    </>
  );
};

export default CategoryContainer;
