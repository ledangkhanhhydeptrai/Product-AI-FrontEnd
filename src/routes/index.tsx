import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./PublicRoutes";
import { privateRoutes } from "./PrivateRoutes";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {privateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PrivateRoute>{route.element}</PrivateRoute>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
