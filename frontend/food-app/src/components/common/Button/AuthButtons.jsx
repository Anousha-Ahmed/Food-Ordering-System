import React from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";

const AuthButtons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    navigate("/");
  };


  if (!user) {
    return (
      <button
        onClick={() => navigate("/login")}
        className="bg-[#03081F] hover:bg-[#FC8A06] transition-all duration-300 text-white rounded-full h-12 px-8 flex items-center gap-3"
      >
        <div className="w-6 h-6 rounded-full bg-[#FC8A06] flex items-center justify-center">
          <FaUser className="text-white text-[10px]" />
        </div>

        <span>Login / Signup</span>
      </button>
    );
  }

  // User Login
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-[#FC8A06] flex items-center justify-center">
        <FaUser className="text-white" />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="font-semibold text-[#03081F]">{user.username}</span>
        </div>

        <button
          onClick={handleLogout}
          className="bg-[#03081F] hover:bg-[#FC8A06] transition-all duration-300 text-white rounded-full h-12 px-6 flex items-center justify-center"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AuthButtons;
