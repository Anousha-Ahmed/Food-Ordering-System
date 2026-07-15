import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const CustomerProtectedRoute = () => {
  const  user = useSelector(state => state.auth.user);
  console.log(user);

  if(!user){
    return <Navigate to="/login" />
}
return <Outlet />;
}

export default CustomerProtectedRoute;