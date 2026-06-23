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

const UpdateCategoryContainer: React.FC<Props> = ({
  selectedCategory,
  onClose
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { loading, error } = useAppSelector((state) => state.category);
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
    if (!selectedCategory) return;

    dispatch(
      // Use the edited form state (name/description/slug), not the
      // stale selectedCategory values — otherwise edits are silently dropped.
      updateCategoryRequest({
        id: selectedCategory.id,
        name,
        description,
        slug,
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
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-2xl space-y-3">
        {/* ERROR */}
        {error && (
          <div className="flex items-start gap-2.5 p-3.5 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 mt-0.5 shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{String(error)}</span>
          </div>
        )}

        {/* LOADING (skeleton) */}
        {loading && !selectedCategory ? (
          <div className="w-full bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
            <div className="h-22 bg-slate-100" />
            <div className="px-6 py-6 space-y-5">
              <div className="h-11 bg-slate-100 rounded-xl" />
              <div className="h-11 bg-slate-100 rounded-xl" />
              <div className="h-24 bg-slate-100 rounded-xl" />
            </div>
          </div>
        ) : (
          <UpdateCategoryForm
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            slug={slug}
            setSlug={setSlug}
            onSubmit={handleSubmit}
            onClose={onClose}
          />
        )}

        {loading && selectedCategory && (
          <p className="flex items-center gap-2 text-sm text-slate-500 px-1">
            <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 border-t-indigo-500 animate-spin" />
            Saving changes...
          </p>
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
