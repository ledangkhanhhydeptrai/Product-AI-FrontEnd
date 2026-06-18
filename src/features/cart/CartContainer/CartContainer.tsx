import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  deleteCartFailure,
  deleteCartRequest,
  getCartRequest,
  updateCartRequest
} from "../CartSlice";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import CartCard from "../components/CartCard";
import { productRequestById } from "../../product/productSlice";
import { ShoppingBag } from "lucide-react";
import { AxiosError } from "axios";

export default function CartContainer() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const { data, loading, error } = useAppSelector((state) => state.cart);
  const handleToggleItem = (cartItemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(cartItemId)
        ? prev.filter((id) => id !== cartItemId)
        : [...prev, cartItemId]
    );
  };
  const notification =
    location.state && "notification" in location.state
      ? location.state.notification
      : null;

  const [notificationData, setNotificationData] = React.useState<{
    message: string;
    severity: "success" | "error" | "warning" | "info";
  } | null>(notification);

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
  const totalItem = data.reduce((a, b) => a + b.cart_items.length, 0);

  const isEmpty = totalItem === 0;
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateCartRequest({ product_id: productId, quantity }));
    setNotificationData({
      message: "Cập nhật sản phẩm thành công",
      severity: "success"
    });
    setOpenSnackbar(true);
  };
  const handleRemoveItem = (cart_item_id: string) => {
    console.log("DELETE:", cart_item_id);
    try {
      dispatch(deleteCartRequest({ cart_item_id: cart_item_id }));
      setNotificationData({
        message: "Xóa sản phẩm thành công",
        severity: "success"
      });

      setOpenSnackbar(true);
    } catch (error) {
      const errors = error as AxiosError;
      dispatch(deleteCartFailure(errors.message));
      setNotificationData({
        message: "Xóa sản phẩm thất bại",
        severity: "error"
      });

      setOpenSnackbar(true);
    }
  };

  const handleCheckout = (cartItemIds: string[]) => {
    navigate("/order", {
      state: {
        cart_item_ids: cartItemIds
      }
    });
  };
  return (
    <div className="mt-20 ">
      {isEmpty ? (
        <EmptyState />
      ) : data.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:gap-5">
            {data.map((cart) => (
              <CartCard
                key={cart.id}
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                selectedItems={selectedItems}
                onToggleItem={handleToggleItem}
                onCheckout={handleCheckout}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center bg-white border border-gray-100 rounded-3xl">
          <div className="p-4 rounded-2xl bg-linear-to-br from-indigo-50 via-violet-50 to-purple-50 mb-4">
            <ShoppingBag
              className="w-8 h-8 text-indigo-400"
              strokeWidth={1.5}
            />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 mb-1">
            Giỏ hàng của bạn đang trống
          </h3>
          <p className="text-sm text-gray-400 max-w-xs">
            Hiện tại chưa có sản phẩm nào trong giỏ hàng. Mời bạn tìm sản phẩm
            yêu thích để thêm vào giỏ nhé!
          </p>
        </div>
      )}

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
            sx={{
              borderRadius: "12px",
              fontWeight: 500,
              alignItems: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
            }}
          >
            {notificationData.message}
          </Alert>
        ) : (
          <div />
        )}
      </Snackbar>
    </div>
  );
}
