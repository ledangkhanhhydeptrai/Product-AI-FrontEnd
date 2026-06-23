import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  categoryRequest,
  createCategoryRequest
} from "../../../features/categories/categorySlice";
import CategoryForm from "../components/categoryForm";
import { NotificationProps } from "../../../types/notification";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { CloseProps } from "../../../features/categories/categoryTypes";

const CreateCategoryContainer: React.FC<CloseProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { loading, error } = useAppSelector((state) => state.category);

  const notification =
    location.state && "notification" in location.state
      ? location.state.notification
      : null;
  // ================= STATE =================
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [slug, setSlug] = React.useState<string>("");
  const navigate = useNavigate();
  const [notificationData, setNotificationData] =
    React.useState<NotificationProps | null>(notification);
  const [openSnackbar, setOpenSnackbar] = React.useState(Boolean(notification));
  React.useEffect(() => {
    dispatch(categoryRequest());

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
  // ================= SUBMIT =================
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      createCategoryRequest({
        name,
        description,
        slug,
        meta: {
          onSuccess: () => {
            setNotificationData({
              open: true,
              message: "Tạo category thành công",
              severity: "success"
            });

            setOpenSnackbar(true);
            navigate("/admin/category");
          },
          onError: () => {
            setNotificationData({
              open: true,
              message: "Tạo category thất bại",
              severity: "error"
            });

            setOpenSnackbar(true);
          }
        }
      })
    );

    setName("");
    setDescription("");
    setSlug("");
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full space-y-3">
        {/* ERROR */}
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {String(error)}
          </div>
        )}

        {/* FORM */}
        <CategoryForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          slug={slug}
          setSlug={setSlug}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />

        {/* LOADING */}
        {loading && (
          <p className="text-sm text-slate-500">Creating category...</p>
        )}
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
};

export default CreateCategoryContainer;
