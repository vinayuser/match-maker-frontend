import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import ProtectedRoute from "./ProtectedRoute";
import { publicRoutes, protectedRoutes } from "./routeConfig";
import { ROUTE_PATHS } from "./paths";

function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <AuthenticatedLayout />
          </ProtectedRoute>
        }
      >
        {protectedRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route path="*" element={<Navigate to={ROUTE_PATHS.LANDING} replace />} />
    </Routes>
  );
}

export default AppRouter;
