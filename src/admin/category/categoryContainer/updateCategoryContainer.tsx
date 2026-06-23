import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  categoryRequest,
  updateCategoryRequest
} from "../../../features/categories/categorySlice";
import { NotificationProps } from "../../../types/notification";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import UpdateCategoryForm from "../components/updateCategoryForm";
import { Props } from "../../../features/categories/categoryTypes";

const UpdateCategoryContainer: React.FC<Props> = ({ selectedCategory }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { loading, error } = useAppSelector(
    (state) => state.category
  );
  const hasInit = React.useRef(false);

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
    // 1. fetch data
    dispatch(categoryRequest());

    // 2. sync notification -> navigate
    if (notification) {
      navigate(location.pathname, {
        replace: true,
        state: null
      });
    }

    // 3. sync form data
    if (!selectedCategory || hasInit.current) return;

    setName(selectedCategory.name || "");
    setDescription(selectedCategory.description || "");
    setSlug(selectedCategory.slug || "");

    hasInit.current = true;
  }, [dispatch, notification, navigate, location.pathname, selectedCategory]);
  // ================= SUBMIT =================
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCategory) return null;
    dispatch(
      updateCategoryRequest({
        id: selectedCategory.id,
        name: selectedCategory.name,
        description: selectedCategory.description,
        slug: selectedCategory.slug,
        meta: {
          onSuccess: () => {
            setNotificationData({
              open: true,
              message: "Cập nhật category thành công",
              severity: "success"
            });

            setOpenSnackbar(true);
          },
          onError: () => {
            setNotificationData({
              open: true,
              message: "Cập nhật category thất bại",
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
        <UpdateCategoryForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          slug={slug}
          setSlug={setSlug}
          onSubmit={handleSubmit}
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

export default UpdateCategoryContainer;
