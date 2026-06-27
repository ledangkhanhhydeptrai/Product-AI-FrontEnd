import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Paper,
  Divider
} from "@mui/material";
import { OrderUpdateAdminProps } from "../../../features/order/OrderTypes/OrderProps";

// ---- Design tokens (đồng bộ với toàn bộ trang Order) ----
const tokens = {
  surface: "#FFFFFF",
  ink: "#14171F",
  muted: "#6B7280",
  border: "#E7E9EE",
  accent: "#3454D1",
  accentSoft: "#F1F4FE"
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

const PAYMENT_STATUS_META: Record<
  string,
  { color: string; bg: string; label: string }
> = {
  PAID: { color: "#15803D", bg: "#EAF8EE", label: "Paid" },
  UNPAID: { color: "#B45309", bg: "#FEF3E2", label: "Unpaid" }
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 1.5,
    bgcolor: "#FBFBFD",
    "& fieldset": { borderColor: tokens.border },
    "&:hover fieldset": { borderColor: tokens.accent },
    "&.Mui-focused fieldset": { borderColor: tokens.accent, borderWidth: 1.5 }
  },
  "& .MuiInputLabel-root": { fontSize: 14 }
};

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({
  children
}) => (
  <Typography
    sx={{
      fontSize: 11,
      fontWeight: 700,
      color: tokens.muted,
      textTransform: "uppercase",
      letterSpacing: 0.6
    }}
  >
    {children}
  </Typography>
);

const InlinePreviewChip: React.FC<{
  meta: { color: string; bg: string; label: string };
}> = ({ meta }) => (
  <Stack
    direction="row"
    spacing={0.75}
    sx={{
      alignItems: "center",
      px: 1.25,
      py: 0.5,
      borderRadius: 999,
      bgcolor: meta.bg,
      width: "fit-content"
    }}
  >
    <Box
      sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: meta.color }}
    />
    <Typography sx={{ fontSize: 12, fontWeight: 600, color: meta.color }}>
      {meta.label}
    </Typography>
  </Stack>
);

const UpdateOrderFormAdmin: React.FC<OrderUpdateAdminProps> = ({
  payment_method,
  setPayment_method,
  payment_status,
  setPayment_status,
  shipping_address,
  setShipping_address,
  status,
  setStatus,
  onSubmit,
  onClose
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 700,
        borderRadius: 2,
        border: `1px solid ${tokens.border}`,
        bgcolor: tokens.surface,
        overflow: "hidden"
      }}
    >
      <Box component="form" onSubmit={onSubmit}>
        {/* Header */}
        <Box sx={{ px: 3.5, pt: 3, pb: 2.5 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: tokens.ink, letterSpacing: -0.2 }}
          >
            Update Order
          </Typography>
          <Typography sx={{ fontSize: 13, color: tokens.muted, mt: 0.25 }}>
            Change the order status, payment details, or shipping address.
          </Typography>
        </Box>

        <Divider sx={{ borderColor: tokens.border }} />

        <Stack spacing={3} sx={{ px: 3.5, py: 3 }}>
          {/* Section: Status */}
          <Stack spacing={1.5}>
            <SectionLabel>Processing status</SectionLabel>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Stack spacing={1} sx={{ flex: 1 }}>
                <TextField
                  select
                  label="Order Status"
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as
                        | "PENDING"
                        | "PROCESSING"
                        | "SHIPPED"
                        | "DELIVERED"
                        | "CANCELLED"
                    )
                  }
                  fullWidth
                  sx={fieldSx}
                >
                  {Object.entries(STATUS_META).map(([key, meta]) => (
                    <MenuItem key={key} value={key}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                      >
                        <Box
                          sx={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            bgcolor: meta.color
                          }}
                        />
                        <span>{meta.label}</span>
                      </Stack>
                    </MenuItem>
                  ))}
                </TextField>
                {status && <InlinePreviewChip meta={STATUS_META[status]} />}
              </Stack>

              <Stack spacing={1} sx={{ flex: 1 }}>
                <TextField
                  select
                  label="Payment Status"
                  value={payment_status}
                  onChange={(e) =>
                    setPayment_status(e.target.value as "PAID" | "UNPAID")
                  }
                  fullWidth
                  sx={fieldSx}
                >
                  {Object.entries(PAYMENT_STATUS_META).map(([key, meta]) => (
                    <MenuItem key={key} value={key}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                      >
                        <Box
                          sx={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            bgcolor: meta.color
                          }}
                        />
                        <span>{meta.label}</span>
                      </Stack>
                    </MenuItem>
                  ))}
                </TextField>
                {payment_status && (
                  <InlinePreviewChip
                    meta={PAYMENT_STATUS_META[payment_status]}
                  />
                )}
              </Stack>
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: tokens.border }} />

          {/* Section: Delivery & payment */}
          <Stack spacing={1.5}>
            <SectionLabel>Delivery & payment</SectionLabel>

            <TextField
              select
              label="Payment Method"
              value={payment_method}
              onChange={(e) =>
                setPayment_method(e.target.value as "PAYOS" | "COD")
              }
              fullWidth
              sx={fieldSx}
            >
              <MenuItem value="PAYOS">PayOS</MenuItem>
              <MenuItem value="COD">Cash On Delivery</MenuItem>
            </TextField>

            <TextField
              label="Shipping Address"
              value={shipping_address}
              onChange={(e) => setShipping_address(e.target.value)}
              multiline
              minRows={3}
              fullWidth
              sx={fieldSx}
            />
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: tokens.border }} />

        {/* Footer actions */}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ justifyContent: "flex-end", px: 3.5, py: 2.5 }}
        >
          <Button
            variant="outlined"
            size="large"
            onClick={onClose}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 1.5,
              borderColor: tokens.border,
              color: tokens.ink,
              "&:hover": {
                borderColor: tokens.accent,
                bgcolor: tokens.accentSoft
              }
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 1.5,
              bgcolor: tokens.accent,
              boxShadow: "none",
              "&:hover": { bgcolor: "#2A45B8", boxShadow: "none" }
            }}
          >
            Update Order
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default UpdateOrderFormAdmin;
