import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTE_PATHS } from "./paths";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  return children;
}

export default ProtectedRoute;
