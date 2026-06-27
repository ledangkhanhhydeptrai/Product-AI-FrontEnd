import React from "react";
import {
  Box,
  Chip,
  Stack,
  Typography,
  Avatar,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getAllOrderAdminRequest } from "../../features/order/OrderSlice";
import Pagination from "../../components/Pagination";
import DataTable, { Column } from "../../components/Table";
import { OrderAdmin } from "../../features/order/OrderTypes/OrderProps";
import UpdateOrderContainer from "./updateOrderContainer/updateOrderContainer";

// ---- Design tokens (cool slate surface, indigo accent) ----
const tokens = {
  bg: "#F6F7FB",
  surface: "#FFFFFF",
  ink: "#14171F",
  muted: "#6B7280",
  border: "#E7E9EE",
  accent: "#3454D1"
};

const STATUS_META: Record<
  string,
  { color: string; bg: string; label: string }
> = {
  PENDING: { color: "#B45309", bg: "#FEF3E2", label: "Pending" },
  PROCESSING: { color: "#1D4ED8", bg: "#EAF1FE", label: "Processing" },
  SHIPPED: { color: "#6D28D9", bg: "#F1ECFE", label: "Shipped" },
  DELIVERED: { color: "#15803D", bg: "#EAF8EE", label: "Delivered" },
  CANCELLED: { color: "#B91C1C", bg: "#FDEDED", label: "Cancelled" }
};

const StatusDotChip: React.FC<{ status: string }> = ({ status }) => {
  const meta = STATUS_META[status] ?? {
    color: tokens.muted,
    bg: "#F0F0F2",
    label: status
  };
  return (
    <Stack
      direction="row"
      spacing={0.75}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        px: 1.25,
        py: 0.5,
        borderRadius: 999,
        bgcolor: meta.bg,
        width: "fit-content",
        mx: "auto"
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: meta.color,
          flexShrink: 0
        }}
      />
      <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: meta.color }}>
        {meta.label}
      </Typography>
    </Stack>
  );
};

// ---- Per-row "Update status" action ----

const OrderAdminContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { admin, loading } = useAppSelector((state) => state.order);

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<OrderAdmin | null>(
    null
  );

  const handleOpenUpdate = (order: OrderAdmin) => {
    setSelectedOrder(order);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedOrder(null);
  };
  React.useEffect(() => {
    dispatch(getAllOrderAdminRequest());
  }, [dispatch]);

  const paginatedRows = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return admin.slice(start, start + pageSize);
  }, [admin, page, pageSize]);

  const statusCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    admin.forEach((row) => {
      counts[row.status] = (counts[row.status] ?? 0) + 1;
    });
    return counts;
  }, [admin]);

  const columns: Column<OrderAdmin>[] = [
    {
      id: "id",
      label: "Order ID",
      render: (row) => (
        <Typography sx={{ fontWeight: 600, fontSize: 13, color: tokens.ink }}>
          #{row.id.slice(0, 8)}
        </Typography>
      )
    },
    {
      id: "user",
      label: "Customer",
      render: (row) => (
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Avatar
            src={row.user.avatar}
            sx={{ width: 34, height: 34, border: `1px solid ${tokens.border}` }}
          />
          <Box>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: tokens.ink }}
            >
              {row.user.full_name}
            </Typography>
            <Typography sx={{ color: tokens.muted, fontSize: 12 }}>
              {row.user.email}
            </Typography>
          </Box>
        </Stack>
      )
    },
    {
      id: "total_price",
      label: "Total",
      align: "right",
      render: (row) => (
        <Typography sx={{ fontWeight: 700, color: tokens.ink }}>
          {row.total_price.toLocaleString("vi-VN")} đ
        </Typography>
      )
    },
    {
      id: "payment_method",
      label: "Payment",
      align: "center",
      render: (row) => (
        <Typography sx={{ fontSize: 13, color: tokens.muted }}>
          {row.payment_method}
        </Typography>
      )
    },
    {
      id: "payment_status",
      label: "Payment Status",
      align: "center",
      render: (row) => (
        <Chip
          label={row.payment_status}
          size="small"
          sx={{
            fontWeight: 600,
            fontSize: 12,
            bgcolor: row.payment_status === "PAID" ? "#EAF8EE" : "#FEF3E2",
            color: row.payment_status === "PAID" ? "#15803D" : "#B45309"
          }}
        />
      )
    },
    {
      id: "status",
      label: "Order Status",
      align: "center",
      render: (row) => <StatusDotChip status={row.status} />
    },
    {
      id: "created_at",
      label: "Created",
      render: (row) => (
        <Typography sx={{ fontSize: 13, color: tokens.muted }}>
          {new Date(row.created_at).toLocaleString("vi-VN")}
        </Typography>
      )
    },
    {
      id: "actions",
      label: "Actions",
      align: "center",
      render: (row) => (
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditOutlinedIcon />}
          onClick={() => handleOpenUpdate(row)}
        >
          Update
        </Button>
      )
    }
  ];

  return (
    <Box sx={{ p: 3, bgcolor: tokens.bg, minHeight: "100%" }}>
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: tokens.ink, letterSpacing: -0.3 }}
          >
            Order Management
          </Typography>
          <Typography variant="body2" sx={{ color: tokens.muted, mt: 0.5 }}>
            Manage and track customer orders.
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            p: 2,
            borderRadius: 2,
            border: `1px solid ${tokens.border}`,
            bgcolor: tokens.surface
          }}
        >
          <Stack sx={{ pr: 2, borderRight: `1px solid ${tokens.border}` }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                color: tokens.muted,
                textTransform: "uppercase",
                letterSpacing: 0.5
              }}
            >
              Total orders
            </Typography>
            <Typography
              sx={{ fontSize: 22, fontWeight: 700, color: tokens.accent }}
            >
              {admin.length}
            </Typography>
          </Stack>

          {Object.entries(STATUS_META).map(([key, meta]) => (
            <Stack
              key={key}
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", px: 1.5 }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: meta.color
                }}
              />
              <Box>
                <Typography
                  sx={{ fontSize: 11, color: tokens.muted, lineHeight: 1.2 }}
                >
                  {meta.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: tokens.ink,
                    lineHeight: 1.2
                  }}
                >
                  {statusCounts[key] ?? 0}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Paper>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            border: `1px solid ${tokens.border}`,
            overflow: "hidden",
            "& .MuiTableCell-root": { borderColor: tokens.border },
            "& .MuiTableRow-root:hover": { bgcolor: "#FAFBFD" },
            "& .MuiTableHead-root .MuiTableCell-root": {
              fontSize: 12,
              fontWeight: 700,
              color: tokens.muted,
              textTransform: "uppercase",
              letterSpacing: 0.4,
              bgcolor: "#FBFBFD"
            }
          }}
        >
          <DataTable
            columns={columns}
            rows={paginatedRows}
            rowKey={(row) => row.id}
            loading={loading}
            emptyText="No orders yet"
            emptyHint="Orders will appear here once customers place them."
          />
        </Paper>

        <Pagination
          page={page}
          pageCount={Math.ceil(admin.length / pageSize)}
          totalItems={admin.length}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      </Stack>
      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: 700
          }}
        >
          Update Order
        </DialogTitle>

        <DialogContent dividers>
          {selectedOrder && (
            <UpdateOrderContainer
              selectedOrder={selectedOrder}
              onClose={handleCloseUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OrderAdminContainer;
