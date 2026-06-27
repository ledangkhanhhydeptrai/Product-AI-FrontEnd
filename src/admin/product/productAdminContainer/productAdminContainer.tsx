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
  DialogActions,
  Stack
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  productAdminRequest
  // 👉 đổi tên 2 action này cho khớp với productSlice thật của bạn
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

const ProductAdminContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { admin, loading, error } = useAppSelector((state) => state.product);
  const { dataCategory } = useAppSelector((state) => state.category);
  const { data } = useAppSelector((state) => state.brand);

  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(4);
  const [search, setSearch] = React.useState<string>("");
  const [openCreate, setOpenCreate] = React.useState(false);
  const [productToDelete, setProductToDelete] =
    React.useState<ProductPropsForAdmin | null>(null);
  const [openUpdate, setOpenUpdate] = React.useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] =
    React.useState<ProductPropsForAdmin | null>(null);

  React.useEffect(() => {
    dispatch(productAdminRequest());
    dispatch(categoryRequest());
    dispatch(getBrandRequest());
  }, [dispatch]);
  React.useEffect(() => {
    console.log("openUpdate =", openUpdate);
    console.log("selectedProduct =", selectedProduct);
  }, [openUpdate, selectedProduct]);
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

  const handleDeleteClick = (row: ProductPropsForAdmin) => {
    setProductToDelete(row);
  };

  const handleConfirmDelete = () => {};

  const handleCancelDelete = () => {
    setProductToDelete(null);
  };

  const columns: Column<ProductPropsForAdmin>[] = [
    {
      id: "image_url",
      label: "Image",
      render: (row) => (
        <Avatar
          src={row.image_url}
          variant="rounded"
          sx={{ width: 44, height: 44, border: "1px solid #eee" }}
        />
      ),
      width: 70
    },
    {
      id: "name",
      label: "Product Name",
      render: (row) => (
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
            {row.name}
          </Typography>
          <Typography sx={{ fontSize: 12 }} color="text.secondary">
            ID: {row.id}
          </Typography>
        </Box>
      )
    },
    {
      id: "price",
      label: "Price",
      render: (row) => (
        <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
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
        />
      )
    },
    {
      id: "category_id",
      label: "Category",
      render: (row) => (
        <Typography sx={{ fontSize: 13 }}>
          {getCategoryName(row.category_id)}
        </Typography>
      )
    },
    {
      id: "brand_id",
      label: "Brand",
      render: (row) => (
        <Typography sx={{ fontSize: 13 }}>
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
      width: 110,
      render: (row) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="View">
            <IconButton
              size="small"
              color="info"
              onClick={() => handleView(row)}
            >
              <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="primary"
              onClick={() => {
                console.log("EDIT CLICK", row);
                setSelectedProduct(row);
                setOpenUpdate(true);
              }}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDeleteClick(row)}
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
          gap: 2
        }}
      >
        <CircularProgress size={22} />
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Loading products...
        </Typography>
      </Box>
    );
  }

  // ===== ERROR UI =====
  if (error) {
    return (
      <Box
        sx={{
          p: 3,
          border: "1px solid #ffcdd2",
          borderRadius: 2,
          bgcolor: "#fff5f5"
        }}
      >
        <Typography color="error" sx={{ fontWeight: 600 }}>
          Failed to load products
        </Typography>
        <Typography sx={{ fontSize: 13 }} color="text.secondary">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        {/* ===== Toolbar ===== */}
        <Stack
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            gap: 2,
            mb: 2
          }}
        >
          <Box>
            <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
              Products
            </Typography>
            <Typography sx={{ fontSize: 13 }} color="text.secondary">
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
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  )
                }
              }}
              sx={{ minWidth: 240 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              sx={{ whiteSpace: "nowrap" }}
            >
              Add Product
            </Button>
          </Stack>
        </Stack>

        {/* ===== Table ===== */}
        <Box
          sx={{
            border: "1px solid #eee",
            borderRadius: 2,
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
        <Box sx={{ mt: 2 }}>
          <Pagination
            page={page}
            pageCount={pageCount}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </Box>
        <Dialog
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Create Product</DialogTitle>

          <DialogContent dividers>
            <CreateProductAdminContainer onClose={() => setOpenCreate(false)} />
          </DialogContent>
        </Dialog>
        {/* ===== Confirm Delete Dialog ===== */}
        <Dialog open={!!productToDelete} onClose={handleCancelDelete}>
          <DialogTitle>Delete product?</DialogTitle>
          <DialogContent>
            <Typography sx={{ fontSize: 14 }}>
              Are you sure you want to delete{" "}
              <strong>{productToDelete?.name}</strong>? This action cannot be
              undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Cancel</Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Dialog
        open={openUpdate}
        onClose={() => {
          setOpenUpdate(false);
          setSelectedProduct(null);
        }}
        fullWidth
        maxWidth="sm"
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
