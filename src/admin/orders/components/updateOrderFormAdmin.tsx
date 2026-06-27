import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { OrderUpdateAdminProps } from "../../../features/order/OrderTypes/OrderProps";

const UpdateOrderFormAdmin: React.FC<OrderUpdateAdminProps> = ({
  payment_method,
  setPayment_method,
  payment_status,
  setPayment_status,
  shipping_address,
  setShipping_address,
  status,
  setStatus,
  onSubmit
}) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        width: "100%",
        maxWidth: 700
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Update Order
        </Typography>

        {/* Order Status */}
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
        >
          <MenuItem value="PENDING">Pending</MenuItem>
          <MenuItem value="PROCESSING">Processing</MenuItem>
          <MenuItem value="SHIPPED">Shipped</MenuItem>
          <MenuItem value="DELIVERED">Delivered</MenuItem>
          <MenuItem value="CANCELLED">Cancelled</MenuItem>
        </TextField>

        {/* Payment Status */}
        <TextField
          select
          label="Payment Status"
          value={payment_status}
          onChange={(e) =>
            setPayment_status(e.target.value as "PAID" | "UNPAID")
          }
          fullWidth
        >
          <MenuItem value="PAID">Paid</MenuItem>
          <MenuItem value="UNPAID">Unpaid</MenuItem>
        </TextField>

        {/* Payment Method */}
        <TextField
          select
          label="Payment Method"
          value={payment_method}
          onChange={(e) => setPayment_method(e.target.value as "PAYOS" | "COD")}
          fullWidth
        >
          <MenuItem value="PAYOS">PayOS</MenuItem>
          <MenuItem value="COD">Cash On Delivery</MenuItem>
        </TextField>

        {/* Shipping Address */}
        <TextField
          label="Shipping Address"
          value={shipping_address}
          onChange={(e) => setShipping_address(e.target.value)}
          multiline
          minRows={3}
          fullWidth
        />

        <Stack direction="row" sx={{ justifyContent: "flex-end" }} spacing={2}>
          <Button type="submit" variant="contained" size="large">
            Update Order
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UpdateOrderFormAdmin;
