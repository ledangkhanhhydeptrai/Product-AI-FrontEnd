import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  deleteCartRequest,
  getCartRequest,
  updateCartRequest
} from "../CartSlice";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import CartCard from "../components/CartCard";
import { productRequestById } from "../../product/productSlice";

export default function CartContainer() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { data, loading, error } = useAppSelector((state) => state.cart);

  const notification =
    location.state && "notification" in location.state
      ? location.state.notification
      : null;

  const [notificationData] = React.useState(notification);
  const [openSnackbar, setOpenSnackbar] = React.useState(Boolean(notification));
  React.useEffect(() => {
    dispatch(getCartRequest());
  }, [dispatch]);

  React.useEffect(() => {
    if (!data.length) return;

    data.forEach((cart) => {
      cart.cart_items.forEach((item) => {
        dispatch(productRequestById(item.product_id));
      });
    });
  }, [data, dispatch]);

  React.useEffect(() => {
    if (notification) {
      navigate(location.pathname, {
        replace: true,
        state: null
      });
    }
  }, [notification, navigate, location.pathname]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!data.length) return <EmptyState />;
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateCartRequest({ product_id: productId, quantity }));
  };
  const handleRemoveItem = (product_id: string) => {
    dispatch(deleteCartRequest({ product_id: product_id }));
  };
  return (
    <>
      <div className="cart-wrap">
        {data.map((cart) => (
          <CartCard
            key={cart.id}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        ))}
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        {notificationData ? (
          <Alert
            severity={notificationData.severity}
            variant="filled"
            onClose={() => setOpenSnackbar(false)}
          >
            {notificationData.message}
          </Alert>
        ) : (
          <div />
        )}
      </Snackbar>
    </>
  );
}
