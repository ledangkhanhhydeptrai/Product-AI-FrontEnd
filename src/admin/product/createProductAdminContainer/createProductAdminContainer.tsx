import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { categoryRequest } from "../../../features/categories/categorySlice";
import { getBrandRequest } from "../../../features/brands/brandSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { NotificationProps } from "../../../types/notification";
import { CloseProps } from "../../../features/brands/brandTypes";
import { createProductAdminRequest } from "../../../features/product/productSlice";
import ProductFormAdmin from "../components/productFormAdmin";
import {
  Alert,
  Backdrop,
  CircularProgress,
  Snackbar,
  Stack,
  Typography
} from "@mui/material";

const CreateProductAdminContainer: React.FC<CloseProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const notification =
    location.state && "notification" in location.state
      ? location.state.notification
      : null;
  const [notificationData, setNotificationData] =
    React.useState<NotificationProps | null>(notification);
  const [openSnackbar, setOpenSnackbar] = React.useState(Boolean(notification));
  const { loading, error } = useAppSelector((state) => state.product);
  const { dataCategory } = useAppSelector((state) => state.category);
  const { data } = useAppSelector((state) => state.brand);
  const [name, setName] = React.useState<string>("");
  const [slug, setSlug] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>(0);
  const [stock, setStock] = React.useState<number>(0);
  const [thumbnail, setThumbnail] = React.useState<string>("");
  const [category_id, setCategory_id] = React.useState<string>("");
  const [brand_id, setBrand_id] = React.useState<string>("");
  const [is_active, setIs_active] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    dispatch(categoryRequest());
    dispatch(getBrandRequest());
    if (notification) {
      navigate(location.pathname, {
        replace: true,
        state: null
      });
    }
  }, [dispatch, notification, navigate, location.pathname]);

  const handleClose = () => {
    onClose();
  };

  const snackbarMessage =
    error || (notificationData && notificationData.message);
  const snackbarSeverity = error
    ? "error"
    : notificationData && notificationData.severity;
  const snackbarOpen = Boolean(error) || openSnackbar;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createProductAdminRequest({
        name,
        slug,
        description,
        price,
        stock,
        thumbnail,
        brand_id,
        category_id,
        file,
        is_active,
        onSuccess: () => {
          navigate("/productAdmin", {
            state: {
              notification: {
                severity: "success",
                message: "Product created successfully"
              }
            }
          });
          setOpenSnackbar(true);
          onClose();
        },
        onError: (message: string) => {
          setNotificationData({
            open: true,
            severity: "error",
            message
          });
          setOpenSnackbar(true);
        }
      })
    );
  };

  return (
    <div>
      <ProductFormAdmin
        name={name}
        setName={setName}
        slug={slug}
        setSlug={setSlug}
        description={description}
        setDescription={setDescription}
        price={price}
        setPrice={setPrice}
        stock={stock}
        setStock={setStock}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        category_id={category_id}
        setCategory_id={setCategory_id}
        brand_id={brand_id}
        setBrand_id={setBrand_id}
        is_active={is_active}
        setIs_active={setIs_active}
        file={file}
        setFile={setFile}
        category={dataCategory}
        brand={data}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbarSeverity || "info"}
          variant="filled"
          onClose={() => setOpenSnackbar(false)}
          sx={{
            borderRadius: "14px",
            fontWeight: 500,
            alignItems: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
            minWidth: 280
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Backdrop
        open={loading}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(2px)",
          bgcolor: "rgba(0,0,0,0.4)"
        }}
      >
        <Stack spacing={1.5} sx={{ alignItems: "center" }}>
          <CircularProgress color="inherit" />
          <Typography sx={{ fontSize: "0.85rem", opacity: 0.9 }}>
            Saving product...
          </Typography>
        </Stack>
      </Backdrop>
    </div>
  );
};

export default CreateProductAdminContainer;
