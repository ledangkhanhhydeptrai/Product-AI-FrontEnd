import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { NotificationProps } from "../../../types/notification";
import {
  createBrandRequest,
  getBrandRequest
} from "../../../features/brands/brandSlice";
import { CloseProps } from "../../../features/brands/brandTypes";
import { AxiosError } from "axios";
import BrandContainerForm from "../components/brandContainerForm";
import { Alert, Snackbar } from "@mui/material";

const CreateBrandContainer: React.FC<CloseProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useAppSelector((state) => state.brand);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);

  const notification =
    location.state && "notification" in location.state
      ? location.state.notification
      : null;
  const [openSnackbar, setOpenSnackbar] = React.useState(Boolean(notification));
  const [notificationData, setNotificationData] =
    React.useState<NotificationProps | null>(notification);
  React.useEffect(() => {
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(
        createBrandRequest({
          name,
          description,
          file,
          meta: {
            onSuccess: () => {
              setNotificationData({
                open: true,
                message: "Tạo brand thành công",
                severity: "success"
              });
              setOpenSnackbar(true);
              onClose();
            },
            onError: () => {
              setNotificationData({
                open: true,
                message: "Tạo brand thất bại",
                severity: "error"
              });
              setOpenSnackbar(true);
            }
          }
        })
      );
      setName("");
      setDescription("");
      setFile(null);
    } catch (error) {
      const errors = error as AxiosError;
      console.log("Error:", errors);
    }
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
        <BrandContainerForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          file={file}
          setFile={setFile}
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

export default CreateBrandContainer;
