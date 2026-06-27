import React from "react";
import {
  Box,
  Chip,
  Avatar,
  Typography,
  CircularProgress,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Paper
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  deleteProductRequest,
  productAdminRequest
} from "../../../features/product/productSlice";
import DataTable, { Column } from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import { ProductPropsForAdmin } from "../../../features/product/productTypes";
import { categoryRequest } from "../../../features/categories/categorySlice";
import { getBrandRequest } from "../../../features/brands/brandSlice";
import { useNavigate } from "react-router-dom";
import { BrandProps } from "../../../features/brands/brandTypes";
import { CategoryProps } from "../../../features/categories/categoryTypes";
import CreateProductAdminContainer from "../createProductAdminContainer/createProductAdminContainer";
import UpdateProductAdminContainer from "../updateProductAdminContainer/updateProductAdminContainer";
import { showNotification } from "../../../features/notification/notificationSlice";

const ProductAdminContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { admin, loading, error } = useAppSelector((state) => state.product);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const { dataCategory } = useAppSelector((state) => state.category);
  const { data } = useAppSelector((state) => state.brand);

  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(4);
  const [search, setSearch] = React.useState<string>("");
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] =
    React.useState<ProductPropsForAdmin | null>(null);

  React.useEffect(() => {
    dispatch(productAdminRequest());
    dispatch(categoryRequest());
    dispatch(getBrandRequest());
  }, [dispatch]);

  const handleView = (row: ProductPropsForAdmin) => {
    navigate(`/productAdmin/${row.id}`);
  };

  const filteredProducts = React.useMemo(() => {
    const products = Array.isArray(admin) ? admin : [];

    return products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [admin, search]);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const getCategoryName = (id: string) => {
    const category = dataCategory.find((c: CategoryProps) => c.id === id);
    return category ? category.name : "Unknown";
  };

  const getBrandName = (id: string) => {
    const brand = data.find((b: BrandProps) => b.id === id);
    return brand ? brand.name : "Unknown";
  };

  // ===== Actions =====
  const handleAdd = () => {
    setOpenCreate(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  const columns: Column<ProductPropsForAdmin>[] = [
    {
      id: "image_url",
      label: "Image",
      render: (row) => (
        <Avatar
          src={row.image_url}
          variant="rounded"
          sx={{
            width: 44,
            height: 44,
            border: "1px solid",
            borderColor: "grey.100"
          }}
        />
      ),
      width: 70
    },
    {
      id: "name",
      label: "Product Name",
      render: (row) => (
        <Box>
          <Typography
            sx={{ fontSize: 14, fontWeight: 600, color: "text.primary" }}
          >
            {row.name}
          </Typography>
          <Typography sx={{ fontSize: 12 }} color="text.disabled">
            ID: {row.id}
          </Typography>
        </Box>
      )
    },
    {
      id: "price",
      label: "Price",
      render: (row) => (
        <Typography
          sx={{ fontSize: 14, fontWeight: 600, color: "text.primary" }}
        >
          {row.price.toLocaleString("vi-VN")} ₫
        </Typography>
      )
    },
    {
      id: "stock",
      label: "Stock",
      render: (row) => (
        <Chip
          size="small"
          label={row.stock}
          color={row.stock > 0 ? "info" : "error"}
          variant="outlined"
          sx={{ fontWeight: 600, borderRadius: "6px" }}
        />
      )
    },
    {
      id: "is_active",
      label: "Status",
      render: (row) => (
        <Chip
          size="small"
          label={row.is_active ? "Active" : "Inactive"}
          color={row.is_active ? "success" : "default"}
          sx={{ fontWeight: 600, borderRadius: "6px" }}
        />
      )
    },
    {
      id: "category_id",
      label: "Category",
      render: (row) => (
        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
          {getCategoryName(row.category_id)}
        </Typography>
      )
    },
    {
      id: "brand_id",
      label: "Brand",
      render: (row) => (
        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
          {getBrandName(row.brand_id)}
        </Typography>
      )
    },
    {
      id: "created_at",
      label: "Created",
      render: (row) => (
        <Typography sx={{ fontSize: 13 }} color="text.secondary">
          {new Date(row.created_at).toLocaleDateString("vi-VN")}
        </Typography>
      )
    },
    {
      id: "actions",
      label: "Actions",
      width: 130,
      align: "right",
      render: (row) => (
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ justifyContent: "flex-end" }}
        >
          <Tooltip title="View details">
            <IconButton
              size="small"
              onClick={() => handleView(row)}
              sx={{
                color: "text.secondary",
                bgcolor: "grey.50",
                "&:hover": { color: "info.main", bgcolor: "info.50" }
              }}
            >
              <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit product">
            <IconButton
              size="small"
              onClick={() => {
                setSelectedProduct(row);
                setOpenUpdate(true);
              }}
              sx={{
                color: "text.secondary",
                bgcolor: "grey.50",
                "&:hover": { color: "primary.main", bgcolor: "primary.50" }
              }}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete product">
            <IconButton
              size="small"
              onClick={() => handleDeleteClick(row.id)}
              sx={{
                color: "text.secondary",
                bgcolor: "grey.50",
                "&:hover": { color: "error.main", bgcolor: "error.50" }
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    }
  ];

  const totalItems = filteredProducts.length;
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));
  const paginatedRows = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // ===== LOADING UI =====
  if (loading) {
    return (
      <Box
        sx={{
          p: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1.5
        }}
      >
        <CircularProgress size={20} thickness={4} />
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Loading products...
        </Typography>
      </Box>
    );
  }

  // ===== ERROR UI =====
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
          Failed to load products
        </Typography>
        <Typography sx={{ fontSize: 13.5, color: "error.main" }}>
          {String(error)}
        </Typography>
        <Button
          size="small"
          startIcon={<RefreshRoundedIcon />}
          onClick={() => dispatch(productAdminRequest())}
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
        {/* ===== Toolbar ===== */}
        <Stack
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            gap: 2
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: 20, fontWeight: 700, color: "text.primary" }}
            >
              Products
            </Typography>
            <Typography sx={{ fontSize: 13.5 }} color="text.secondary">
              {totalItems} product{totalItems !== 1 ? "s" : ""} found
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <TextField
              size="small"
              placeholder="Search product name..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        fontSize="small"
                        sx={{ color: "text.disabled" }}
                      />
                    </InputAdornment>
                  )
                }
              }}
              sx={{
                minWidth: 240,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  bgcolor: "background.paper"
                }
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              sx={{
                whiteSpace: "nowrap",
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
              Add Product
            </Button>
          </Stack>
        </Stack>

        {/* ===== Table ===== */}
        <Box
          sx={{
            border: "1px solid",
            borderColor: "grey.100",
            borderRadius: "14px",
            overflow: "hidden",
            bgcolor: "background.paper"
          }}
        >
          <DataTable<ProductPropsForAdmin>
            columns={columns}
            rows={paginatedRows}
            rowKey={(row) => row.id}
            emptyText="No products"
            emptyHint="Product list will appear here"
          />
        </Box>

        {/* ===== Pagination ===== */}
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
          />
        </Box>

        {/* ===== Confirm Delete Dialog ===== */}
        <Dialog
          open={openConfirm}
          onClose={() => setOpenConfirm(false)}
          slotProps={{
            paper: {
              sx: { borderRadius: "16px", p: 1, minWidth: 320 }
            }
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
              <DeleteOutlineIcon sx={{ color: "error.main" }} />
            </Box>

            <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
              Delete product?
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

                  dispatch(deleteProductRequest(deleteId));

                  dispatch(
                    showNotification({
                      message: "Delete product success",
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

        {/* ===== Create Dialog ===== */}
        <Dialog
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          fullWidth
          maxWidth="md"
          slotProps={{ paper: { sx: { borderRadius: "16px" } } }}
        >
          <DialogTitle sx={{ fontWeight: 700 }}>Create Product</DialogTitle>
          <DialogContent dividers>
            <CreateProductAdminContainer onClose={() => setOpenCreate(false)} />
          </DialogContent>
        </Dialog>
      </Box>

      {/* ===== Update Dialog ===== */}
      <Dialog
        open={openUpdate}
        onClose={() => {
          setOpenUpdate(false);
          setSelectedProduct(null);
        }}
        fullWidth
        maxWidth="sm"
        slotProps={{ paper: { sx: { borderRadius: "16px" } } }}
      >
        {selectedProduct && (
          <UpdateProductAdminContainer
            selectedProduct={selectedProduct}
            onClose={() => {
              setOpenUpdate(false);
              setSelectedProduct(null);
            }}
          />
        )}
      </Dialog>
    </>
  );
};

export default ProductAdminContainer;
