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
    localStorage.removeItem("isLoggedIn");
    
    window.location.href = "/";
  };

  if (!user) {
    return (
      <button
        onClick={() => navigate("/login")}
        className="bg-[#03081F] hover:bg-[#FC8A06] transition-all duration-300 text-white rounded-full h-10 sm:h-11 md:h-12 px-4 sm:px-5 md:px-6 lg:px-8 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base w-full sm:w-auto justify-center"
      >
        <div className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-[#FC8A06] flex items-center justify-center flex-shrink-0">
          <FaUser className="text-white text-[8px] sm:text-[9px] md:text-[10px]" />
        </div>

        <span className="whitespace-nowrap">Login / Signup</span>
      </button>
    );
  }

  // User Login
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#FC8A06] flex items-center justify-center flex-shrink-0">
          <FaUser className="text-white text-xs sm:text-sm" />
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-[#03081F] text-sm sm:text-base truncate max-w-[80px] sm:max-w-[100px] md:max-w-none">
            {user.username}
          </span>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-[#03081F] hover:bg-[#FC8A06] transition-all duration-300 text-white rounded-full h-9 sm:h-10 md:h-12 px-4 sm:px-5 md:px-6 flex items-center justify-center text-xs sm:text-sm md:text-base w-full sm:w-auto"
      >
        Logout
      </button>
    </div>
  );
};

export default AuthButtons;