import React from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

import {
  OrderStatus,
  OrderUpdateProps,
  PaymentMethod,
  PaymentStatus
} from "../../../features/order/OrderTypes/OrderProps";
import { updateOrderAdminRequest } from "../../../features/order/OrderSlice";
import UpdateOrderFormAdmin from "../components/updateOrderFormAdmin";

const UpdateOrderContainer: React.FC<OrderUpdateProps> = ({
  onClose,
  selectedOrder
}) => {
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.order);

  const [status, setStatus] = React.useState<OrderStatus>("PENDING");

  const [paymentStatus, setPaymentStatus] =
    React.useState<PaymentStatus>("UNPAID");

  const [paymentMethod, setPaymentMethod] =
    React.useState<PaymentMethod>("COD");

  const [shippingAddress, setShippingAddress] = React.useState("");

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
        shipping_address: shippingAddress
      })
    );

    onClose();
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 850,
          p: 4,
          borderRadius: "20px",
          border: "1px solid #eef0f3",
          position: "relative",
          overflow: "hidden"
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
              zIndex: 10
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <Stack spacing={3}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Update Order
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Update order information and status.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error">
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
          />
        </Stack>
      </Paper>
    </Box>
  );
};

export default UpdateOrderContainer;
