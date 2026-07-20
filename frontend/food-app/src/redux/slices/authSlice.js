import React from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";

const AuthButtons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // ✅ Logout Handler - Sabke liye home page
  const handleLogout = () => {
    dispatch(logout()); // Redux state clear

    // LocalStorage clear
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    navigate("/"); // ✅ Home page pe redirect (admin ya customer dono)
  };

  if (!user) {
    return (
      <button onClick={() => navigate("/login")} className="...">
        Login / Signup
      </button>
    );
  }

  return (
    <div className="...">
      <div>
        <span>{user.username}</span>
      </div>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AuthButtons;
