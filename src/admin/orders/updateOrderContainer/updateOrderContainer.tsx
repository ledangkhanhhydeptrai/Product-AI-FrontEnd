import React from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

import {
  OrderStatus,
  OrderUpdateProps,
  PaymentMethod,
  PaymentStatus,
} from "../../../features/order/OrderTypes/OrderProps";
import { updateOrderAdminRequest } from "../../../features/order/OrderSlice";
import UpdateOrderFormAdmin from "../components/updateOrderFormAdmin";

// ---- Design tokens (kept consistent across Order pages) ----
const tokens = {
  surface: "#FFFFFF",
  ink: "#14171F",
  muted: "#6B7280",
  border: "#E7E9EE",
};

const UpdateOrderContainer: React.FC<OrderUpdateProps> = ({
  onClose,
  selectedOrder,
}) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.order);

  const [status, setStatus] = React.useState<OrderStatus>("PENDING");
  const [paymentStatus, setPaymentStatus] = React.useState<PaymentStatus>("UNPAID");
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("COD");
  const [shippingAddress, setShippingAddress] = React.useState("");

  // Prefill the form whenever a different order is selected
  

  if (!selectedOrder) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      updateOrderAdminRequest({
        id: selectedOrder.id,
        status,
        payment_status: paymentStatus,
        payment_method: paymentMethod,
        shipping_address: shippingAddress,
      })
    );

    onClose();
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 850,
          borderRadius: "20px",
          border: `1px solid ${tokens.border}`,
          bgcolor: tokens.surface,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {loading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(255,255,255,0.65)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* Header */}
        <Stack
          direction="row"
          sx={{ alignItems: "flex-start", justifyContent: "space-between", px: 4, pt: 4, pb: 3 }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: tokens.ink, letterSpacing: -0.3 }}>
              Update Order
            </Typography>
            <Typography sx={{ fontSize: 13, color: tokens.muted, mt: 0.5 }}>
              Editing order{" "}
              <Typography component="span" sx={{ fontWeight: 700, color: tokens.ink }}>
                #{selectedOrder.id.slice(0, 8)}
              </Typography>{" "}
              for {selectedOrder.user?.full_name}
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: tokens.muted,
              "&:hover": { bgcolor: "#F1F4FE", color: tokens.ink },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Divider sx={{ borderColor: tokens.border }} />

        <Stack spacing={3} sx={{ px: 4, pb: 4, pt: 3 }}>
          {error && (
            <Alert severity="error" sx={{ borderRadius: 1.5 }}>
              {typeof error === "string" ? error : "Something went wrong"}
            </Alert>
          )}

          <UpdateOrderFormAdmin
            status={status}
            setStatus={setStatus}
            payment_status={paymentStatus}
            setPayment_status={setPaymentStatus}
            payment_method={paymentMethod}
            setPayment_method={setPaymentMethod}
            shipping_address={shippingAddress}
            setShipping_address={setShippingAddress}
            onSubmit={handleSubmit}
            onClose={onClose}
          />
        </Stack>
      </Paper>
    </Box>
  );
};

export default UpdateOrderContainer;