import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

import { createOrderRequest } from "../OrderSlice";
import CreateOrderForm from "../components/CreateOrderForm";
import { PaymentMethod } from "../OrderTypes/OrderProps";

import { CartItem } from "../../cart/CartAPI";
import { productRequest } from "../../product/productSlice";

const CreateOrderContainer: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const state = location.state as { cartItems: CartItem[] } | null;
  const cartItems = state && state.cartItems ? state.cartItems : [];

  const products = useAppSelector((state) => state.product.data);
  const { loading, error } = useAppSelector((state) => state.order);

  const [shipping_address, setShipping_address] = React.useState("");
  const [payment_method, setPayment_method] =
    React.useState<PaymentMethod>("PAYOS");

  const [openSuccess, setOpenSuccess] = React.useState(false);
  // derive openError from error to avoid setting state synchronously in an effect
  const openError = Boolean(error);

  React.useEffect(() => {
    dispatch(productRequest());
  }, [dispatch]);

  React.useEffect(() => {
    if (error) {
      // setOpenError(true); // Removed synchronous state update
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      createOrderRequest({
        cart_item_ids: cartItems.map((item) => item.id),
        shipping_address,
        payment_method,
      })
    );

    setOpenSuccess(true);
  };

  return (
    <div className="-mb-10">
      <CreateOrderForm
        cartItems={cartItems}
        shipping_address={shipping_address}
        setShipping_address={setShipping_address}
        payment_method={payment_method}
        setPayment_method={setPayment_method}
        onSubmit={handleSubmit}
        products={products}
      />

      {loading && (
        <p className="mt-2 text-sm text-gray-500">
          Đang xử lý đơn hàng...
        </p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setOpenSuccess(false)}
        >
          Đơn hàng đã được tạo thành công!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={() => {}}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => {}}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateOrderContainer;