import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

function RoleProtectedRoute({ allowedRole, children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const role = getUserRole();

  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleProtectedRoute;
