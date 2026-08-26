import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = () => {
  const { token, isInitialized } = useAuth();
  const location = useLocation();
  if (!isInitialized)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  if (!token)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
};

export default ProtectedRoute;
