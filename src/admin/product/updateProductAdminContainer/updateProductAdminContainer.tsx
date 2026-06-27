import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useLocation, useNavigate } from "react-router-dom";
import { NotificationProps } from "../../../types/notification";
import { ProductPropsSelected } from "../../../features/product/productTypes";
import { updateProductAdminRequest } from "../../../features/product/productSlice";
import UpdateProductFormAdmin from "../components/updateProductFormAdmin";
import {
  Alert,
  Snackbar,
  Box,
  Paper,
  Skeleton,
  Stack,
  Avatar,
  Typography,
  Fade,
  LinearProgress
} from "@mui/material";
import { ErrorOutlineRounded } from "@mui/icons-material";

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
        meta: {
          onSuccess: () => {
            setNotificationData({
              open: true,
              message: "Cập nhật product thành công",
              severity: "success"
            });
            setOpenSnackbar(true);

            setTimeout(() => {
              onClose();
            }, 1000);
          },
          onError: () => {
            setNotificationData({
              open: true,
              message: "Cập nhật product thất bại",
              severity: "error"
            });
            setOpenSnackbar(true);
          }
        }
      })
    );
  };

  const isSavingExisting = loading && Boolean(selectedProduct);
  const isInitialLoading = loading && !selectedProduct;

  return (
    <>
      <Box sx={{ position: "relative", maxWidth: 560, mx: "auto" }}>
        {/* Thanh tiến trình khi đang lưu (đè lên trên form, không thay layout) */}
        {isSavingExisting && (
          <LinearProgress
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              borderRadius: "12px 12px 0 0",
              zIndex: 1
            }}
          />
        )}

        {/* FORM hoặc SKELETON */}
        {isInitialLoading ? (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 4 },
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider"
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ mb: 2.5, alignItems: "center" }}
            >
              <Skeleton
                variant="rounded"
                width={48}
                height={48}
                sx={{ borderRadius: 2 }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton width="40%" height={24} />
                <Skeleton width="60%" height={18} />
              </Box>
            </Stack>
            <Stack spacing={2.5}>
              <Skeleton
                variant="rounded"
                height={56}
                sx={{ borderRadius: 1.5 }}
              />
              <Stack direction="row" spacing={2}>
                <Skeleton
                  variant="rounded"
                  height={56}
                  sx={{ borderRadius: 1.5, flex: 1 }}
                />
                <Skeleton
                  variant="rounded"
                  height={56}
                  sx={{ borderRadius: 1.5, flex: 1 }}
                />
              </Stack>
              <Skeleton
                variant="rounded"
                height={110}
                sx={{ borderRadius: 1.5 }}
              />
              <Skeleton
                variant="rounded"
                height={56}
                sx={{ borderRadius: 1.5 }}
              />
            </Stack>
          </Paper>
        ) : (
          <UpdateProductFormAdmin
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            slug={slug}
            setSlug={setSlug}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            onClose={onClose}
            onSubmit={handleSubmit}
          />
        )}

        {/* ERROR ALERT */}
        <Fade in={Boolean(error)} unmountOnExit>
          <Box sx={{ mt: 2 }}>
            <Alert
              severity="error"
              icon={<ErrorOutlineRounded fontSize="small" />}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              {String(error)}
            </Alert>
          </Box>
        </Fade>

        {/* SAVING HINT */}
        <Fade in={isSavingExisting} unmountOnExit>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 1.5, px: 0.5, alignItems: "center" }}
          >
            <Avatar
              sx={{
                width: 16,
                height: 16,
                bgcolor: "transparent"
              }}
            >
              <Box
                sx={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: "grey.300",
                  borderTopColor: "primary.main",
                  animation: "spin 0.8s linear infinite",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" }
                  }
                }}
              />
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              Đang lưu thay đổi...
            </Typography>
          </Stack>
        </Fade>
      </Box>

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
    </>
  );
};

export default UpdateProductAdminContainer;
