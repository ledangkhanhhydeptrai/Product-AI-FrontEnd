import React from "react";
import { Alert, Dialog, Slide, Snackbar } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Props } from "../../../features/brands/brandTypes";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

import {
  getBrandRequest,
  updateBrandRequest
} from "../../../features/brands/brandSlice";
import UpdateBrandContainerForm from "../components/updateBrandContainerForm";
import { useLocation, useNavigate } from "react-router-dom";
import { NotificationProps } from "../../../types/notification";

// Slide-up transition gives the dialog a slightly more deliberate, less
// "default MUI" entrance than the standard fade/grow.
const DialogTransition = React.forwardRef(function DialogTransition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateBrandContainer: React.FC<Props> = ({ onClose, selectedBrand }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { loading, error } = useAppSelector((state) => state.brand);
  const hasInit = React.useRef<boolean>(false);
  const navigate = useNavigate();
  const notification =
    location.state && "notification" in location.state
      ? location.state.notification
      : null;
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [logo, setLogo] = React.useState<File | null>(null);
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
    if (!selectedBrand || hasInit.current) {
      return;
    }
    setName(selectedBrand.name || "");
    setDescription(selectedBrand.description || "");
    setLogo(null);
    hasInit.current = true;
  }, [dispatch, notification, navigate, location.pathname, selectedBrand]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBrand) return;

    dispatch(
      updateBrandRequest({
        id: selectedBrand.id,
        name,
        description,
        logo,
        meta: {
          onSuccess: () => {
            setNotificationData({
              open: true,
              message: "Cập nhật brand thành công",
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
              message: "Cập nhật brand thất bại",
              severity: "error"
            });
            setOpenSnackbar(true);
          }
        }
      })
    );
  };

  return (
    <>
      <Dialog
        open={Boolean(selectedBrand)}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        slots={{
          transition: DialogTransition
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              overflow: "hidden"
            }
          }
        }}
      >
        <UpdateBrandContainerForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          logo={logo}
          setLogo={setLogo}
          onSubmit={handleSubmit}
          onClose={onClose}
          loading={loading}
          error={error}
        />
      </Dialog>

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
              borderRadius: 3,
              fontWeight: 500,
              alignItems: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.16)"
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

export default UpdateBrandContainer;
