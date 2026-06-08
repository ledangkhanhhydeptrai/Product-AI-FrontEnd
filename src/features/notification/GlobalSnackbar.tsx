import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../app/store";
import { hideNotification } from "./notificationSlice";
import SlideTransitions from "../../slideTransition/SlideTransition";

export default function GlobalSnackbar() {
  const dispatch = useDispatch();

  const { open, message, severity } = useSelector(
    (state: RootState) => state.notification
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
