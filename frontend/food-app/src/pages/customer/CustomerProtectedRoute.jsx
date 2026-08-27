import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const CustomerProtectedRoute = () => {
  const  user = useSelector(state => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    if (!user && location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [user, location, navigate]);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default CustomerProtectedRoute;