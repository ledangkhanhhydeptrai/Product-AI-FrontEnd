import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";

import { getMeRequest } from "./features/profile/profileSlice";

import GlobalSnackbar from "./features/notification/GlobalSnackbar";
import AppRoutes from "./routes";
import ChatBox from "./features/ai-chat/components/ChatBox";


function App() {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector((state) => state.profile.initialized);

  useEffect(() => {
    dispatch(getMeRequest());
  }, [dispatch]);

  if (!initialized) {
    return null;
  }

  return (
    <>
      <AppRoutes />

      <ChatBox />

      <GlobalSnackbar />
    </>
  );
}

export default App;