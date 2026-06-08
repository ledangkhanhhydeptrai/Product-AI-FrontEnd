import GlobalSnackbar from "./features/notification/GlobalSnackbar";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <AppRoutes />
      <GlobalSnackbar />
    </>
  );
}

export default App;
