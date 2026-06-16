import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { getMeRequest } from "./features/profile/profileSlice";

import GlobalSnackbar from "./features/notification/GlobalSnackbar";
import AppRoutes from "./routes";
import { useAppSelector } from "./hooks/useAppSelector";

function App() {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector((state) => state.profile.initialized);

  useEffect(() => {
    console.log("CALL getMeRequest");
    dispatch(getMeRequest());
  }, [dispatch]);
  if (!initialized) {
    return null; // hoặc splash screen
  }
  return (
    <>
      <AppRoutes />
      <GlobalSnackbar />
    </>
  );
}

export default App;
