import { Snackbar, Alert } from "@mui/material";

import { hideNotification } from "./notificationSlice";
import SlideTransitions from "../../slideTransition/SlideTransition";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

export default function GlobalSnackbar() {
  const dispatch = useAppDispatch();

  const { open, message, severity } = useAppSelector(
    (state) => state.notification
  );

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      slots={{
        transition: SlideTransitions
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={handleClose}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
