import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./PublicRoutes";
import { privateRoutes } from "./PrivateRoutes";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

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
