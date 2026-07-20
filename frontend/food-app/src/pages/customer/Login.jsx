import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Logo from "../../assets/NavbarImg/Logo.png";
import { API } from "../../api/endpoints";
import { loginSuccess } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(API.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("accessToken", data.token.access);
        localStorage.setItem("refreshToken", data.token.refresh);
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("isLoggedIn", "true");

        dispatch(loginSuccess(data.data));

        toast.success(data.message || "Login Successful");
        if (data.data.is_admin) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(data.error || data.message || "Invalid Email or Password");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">
        {/* ✅ Left Side - Branding (Logo + Welcome Text) */}
        <div className="hidden lg:flex bg-[#03081F] text-white flex-col justify-center items-center p-12">
          <img src={Logo} alt="Logo" className="h-16 mb-10" />

          <h1 className="text-5xl font-bold text-center leading-tight">
            Welcome
            <br />
            Back 👋
          </h1>

          <p className="text-center text-gray-300 mt-6 leading-7">
            Login to your account and enjoy
            <br />
            fast ordering with Order.uk.
          </p>
        </div>

        {/* ✅ Right Side - Login Form */}
        <div className="p-8 sm:p-12">
          <div className="lg:hidden flex justify-center mb-8">
            <img src={Logo} alt="Logo" className="h-14" />
          </div>

          <h2 className="text-4xl font-bold text-[#03081F]">Login</h2>

          <p className="text-gray-500 mt-2 mb-8">
            Welcome back! Please login to continue.
          </p>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <label className="font-medium">Email Address</label>
            <div className="flex items-center border rounded-xl px-4 h-14 mt-2">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="flex-1 outline-none px-3"
                required
              />
            </div>

            {/* Password */}
            <label className="font-medium block mt-5">Password</label>
            <div className="flex items-center border rounded-xl px-4 h-14 mt-2">
              <FaLock className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="flex-1 outline-none px-3"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex justify-between items-center mt-5 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <button type="button" className="text-[#FC8A06]">
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#FC8A06] hover:bg-orange-600 duration-300 text-white rounded-xl font-semibold text-lg mt-8 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Signup Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#FC8A06] font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
