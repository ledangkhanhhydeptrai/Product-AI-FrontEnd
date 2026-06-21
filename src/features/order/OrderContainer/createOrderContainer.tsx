import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

import { createOrderBuyNowRequest, createOrderRequest } from "../OrderSlice";
import CreateOrderForm from "../components/CreateOrderForm";
import {
  CreateOrderLocationState,
  PaymentMethod
} from "../OrderTypes/OrderProps";
import { productRequest } from "../../product/productSlice";

const CreateOrderContainer: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const state = location.state as CreateOrderLocationState | null;
  const cartItems = state && state.cartItems ? state.cartItems : [];
  console.log("LOCATION STATE =", location.state);
  const products = useAppSelector((state) => state.product.data);
  const { loading, error, order } = useAppSelector((state) => state.order);
  const [quantity, setQuantity] = React.useState(
    state ? state.quantity || 1 : 1
  );
  const [shipping_address, setShipping_address] = React.useState("");
  const [payment_method, setPayment_method] =
    React.useState<PaymentMethod>("PAYOS");
  const buyNow = state ? state.buyNow || false : false;
  const product_id = state ? state.product_id || "" : "";
  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);
  // derive openError from error to avoid setting state synchronously in an effect
  const openError = Boolean(error);
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(productRequest());
  }, [dispatch]);

  React.useEffect(() => {
    if (!order || !order.id) return;

    navigate(`/payment/${order.id}`);
  }, [order, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault(); // 👈 BẮT BUỘC
    if (buyNow && product_id) {
      dispatch(
        createOrderBuyNowRequest({
          product_id,
          quantity,
          shipping_address,
          payment_method
        })
      );
      return;
    }

    dispatch(
      createOrderRequest({
        cart_item_ids: cartItems.map((item) => item.id),
        shipping_address,
        payment_method
      })
    );
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
        buyNow={true}
        product_id={product_id}
        quantity={quantity}
        setQuantity={setQuantity}
      />

      {loading && (
        <p className="mt-2 text-sm text-gray-500">Đang xử lý đơn hàng...</p>
      )}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
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
          horizontal: "right"
        }}
      >
        <Alert severity="error" variant="filled" onClose={() => {}}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateOrderContainer;
