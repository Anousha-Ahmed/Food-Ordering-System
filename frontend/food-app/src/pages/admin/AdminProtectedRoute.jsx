import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!user.is_admin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;