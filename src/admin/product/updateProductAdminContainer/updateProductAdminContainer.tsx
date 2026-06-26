import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useLocation, useNavigate } from "react-router-dom";
import { NotificationProps } from "../../../types/notification";
import { ProductPropsSelected } from "../../../features/product/productTypes";
import {
  productAdminRequest,
  updateProductAdminRequest
} from "../../../features/product/productSlice";
import UpdateProductFormAdmin from "../components/updateProductFormAdmin";
import {
  Alert,
  Backdrop,
  CircularProgress,
  Snackbar,
  Box
} from "@mui/material";

const UpdateProductAdminContainer: React.FC<ProductPropsSelected> = ({
  onClose,
  selectedProduct
}) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.product);

  const location = useLocation();
  const navigate = useNavigate();

  const hasInit = React.useRef(false);

  const notification =
    location.state && "notification" in location.state
      ? location.state.notification
      : null;

  const [notificationData, setNotificationData] =
    React.useState<NotificationProps | null>(notification);

  const [openSnackbar, setOpenSnackbar] = React.useState(Boolean(notification));

  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [stock, setStock] = React.useState(0);
  const [thumbnail, setThumbnail] = React.useState("");

  React.useEffect(() => {
    dispatch(productAdminRequest());

    if (notification) {
      navigate(location.pathname, {
        replace: true,
        state: null
      });
    }

    if (!selectedProduct || hasInit.current) return;

    setName(selectedProduct.name || "");
    setDescription(selectedProduct.description || "");
    setSlug(selectedProduct.slug || "");
    setPrice(selectedProduct.price || 0);
    setStock(selectedProduct.stock || 0);
    setThumbnail(selectedProduct.thumbnail || "");

    hasInit.current = true;
  }, [dispatch, notification, navigate, location.pathname, selectedProduct]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct) return;

    dispatch(
      updateProductAdminRequest({
        id: selectedProduct.id,
        name,
        description,
        price,
        slug,
        stock,
        thumbnail,
        onError: (message: string) => {
          setNotificationData({
            open: true,
            severity: "error",
            message
          });
          setOpenSnackbar(true);
        },
        onSuccess: () => {
          navigate("/productAdmin", {
            state: {
              notification: {
                severity: "success",
                message: "Product updated successfully"
              }
            }
          });
          setOpenSnackbar(true);
          onClose();
        }
      })
    );
  };

  return (
    <Box>
      {/* FORM */}
      <UpdateProductFormAdmin
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        price={price}
        setPrice={setPrice}
        slug={slug}
        setSlug={setSlug}
        onClose={onClose}
        onSubmit={handleSubmit}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
      />

      {/* ERROR ALERT (inline nhẹ) */}
      {error && (
        <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* LOADING OVERLAY */}
      <Backdrop
        open={loading}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.modal + 1
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* SNACKBAR */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {notificationData ? (
          <Alert
            severity={notificationData.severity}
            variant="filled"
            onClose={() => setOpenSnackbar(false)}
            sx={{
              borderRadius: "12px",
              fontWeight: 500,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
            }}
          >
            {notificationData.message}
          </Alert>
        ) : (
          <div />
        )}
      </Snackbar>
    </Box>
  );
};

export default UpdateProductAdminContainer;
