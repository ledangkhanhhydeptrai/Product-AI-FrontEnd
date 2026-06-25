import React from "react";
import { Box, Chip, Avatar, Typography, CircularProgress } from "@mui/material";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { productAdminRequest } from "../../../features/product/productSlice";
import DataTable, { Column } from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import { ProductPropsForAdmin } from "../../../features/product/productTypes";
import { categoryRequest } from "../../../features/categories/categorySlice";
import { getBrandRequest } from "../../../features/brands/brandSlice";

const ProductAdminContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const { admin, loading, error } = useAppSelector((state) => state.product);
  const { dataCategory } = useAppSelector((state) => state.category);
  const { data } = useAppSelector((state) => state.brand);
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(4);
  console.log("CategoryArray:", dataCategory);
  React.useEffect(() => {
    dispatch(productAdminRequest());
    dispatch(categoryRequest());
    dispatch(getBrandRequest());
  }, [dispatch]);

  const products: ProductPropsForAdmin[] = Array.isArray(admin) ? admin : [];

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };
  const getCategoryName = (id: string) => {
    const category = dataCategory.find((c) => c.id === id);

    if (!category) {
      return "Unknown";
    }
    return category.name;
  };

  const getBrandName = (id: string) => {
    const brand = data.find((b) => b.id === id);

    if (!brand) {
      return "Unknown";
    }

    return brand.name;
  };
  const columns: Column<ProductPropsForAdmin>[] = [
    {
      id: "image_url",
      label: "Image",
      render: (row) => (
        <Avatar
          src={row.image_url}
          variant="rounded"
          sx={{ width: 42, height: 42 }}
        />
      ),
      width: 80
    },
    {
      id: "name",
      label: "Product Name"
    },
    {
      id: "price",
      label: "Price",
      render: (row) => row.price.toLocaleString("vi-VN") + " ₫"
    },
    {
      id: "stock",
      label: "Stock"
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
      id: "created_at",
      label: "Created",
      render: (row) => new Date(row.created_at).toLocaleDateString("vi-VN")
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
    }
  ];

  const totalItems = products.length;
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedRows = products.slice((page - 1) * pageSize, page * pageSize);

  // ===== LOADING UI =====
  if (loading) {
    return (
      <Box
        sx={{
          p: 4,
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
      <Box sx={{ p: 2 }}>
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
    <Box sx={{ p: 2 }}>
      <DataTable<ProductPropsForAdmin>
        columns={columns}
        rows={paginatedRows}
        rowKey={(row) => row.id}
        emptyText="No products"
        emptyHint="Product list will appear here"
      />

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
    </Box>
  );
};

export default ProductAdminContainer;
