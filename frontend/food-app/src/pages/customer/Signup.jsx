import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../assets/NavbarImg/Logo.png";
import { toast } from "react-toastify";
import { API } from "../../api/endpoints";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    country: "",
    city: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Signup Successful");
        localStorage.setItem("accessToken", data.token.access);
        localStorage.setItem("refreshToken", data.token.refresh);
        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/login");
      } else {
        toast.error(data.error || data.message || "Signup Failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">
        {/* ✅ Left Side - Branding (Same as Login) */}
        <div className="hidden lg:flex bg-gradient-to-br from-[#FC8A06] to-[#e07a05] text-white flex-col justify-center items-center p-12">
          <img src={Logo} alt="Logo" className="h-16 mb-10" />

          <h1 className="text-5xl font-bold text-center leading-tight">
            Join Order.uk
          </h1>

          <p className="text-center text-orange-100 mt-4 leading-7 max-w-sm">
            Create your account and enjoy delicious food delivered to your door.
          </p>
        </div>

        {/* Right Side - Signup Form */}
        <div className="p-8 sm:p-12">
          <div className="lg:hidden flex justify-center mb-8">
            <img src={Logo} alt="Logo" className="h-14" />
          </div>

          <h2 className="text-3xl font-bold text-[#03081F]">Create Account</h2>
          <p className="text-gray-500 mt-2 mb-8">
            Fill in your details to get started.
          </p>

          <form onSubmit={handleSignUp}>
            <label className="font-medium text-gray-700">Full Name</label>
            <div className="flex items-center border border-gray-300 rounded-xl px-4 h-14 mt-2 focus-within:border-[#FC8A06] focus-within:ring-2 focus-within:ring-[#FC8A06]/20 transition-all">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="John Doe"
                className="flex-1 outline-none px-3 bg-transparent"
                required
              />
            </div>

            <label className="font-medium text-gray-700 block mt-5">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl px-4 h-14 mt-2 focus-within:border-[#FC8A06] focus-within:ring-2 focus-within:ring-[#FC8A06]/20 transition-all">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="flex-1 outline-none px-3 bg-transparent"
                required
              />
            </div>

            <label className="font-medium text-gray-700 block mt-5">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl px-4 h-14 mt-2 focus-within:border-[#FC8A06] focus-within:ring-2 focus-within:ring-[#FC8A06]/20 transition-all">
              <FaLock className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="flex-1 outline-none px-3 bg-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <label className="font-medium text-gray-700 block mt-5">
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl px-4 h-14 mt-2 focus-within:border-[#FC8A06] focus-within:ring-2 focus-within:ring-[#FC8A06]/20 transition-all">
              <FaLock className="text-gray-400" />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="flex-1 outline-none px-3 bg-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <label className="font-medium text-gray-700 block mt-5">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Pakistan"
              className="w-full border border-gray-300 rounded-xl h-14 px-4 mt-2 outline-none focus:border-[#FC8A06] focus:ring-2 focus:ring-[#FC8A06]/20 transition-all"
              required
            />

            <label className="font-medium text-gray-700 block mt-5">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Karachi"
              className="w-full border border-gray-300 rounded-xl h-14 px-4 mt-2 outline-none focus:border-[#FC8A06] focus:ring-2 focus:ring-[#FC8A06]/20 transition-all"
              required
            />

            <label className="flex items-center gap-2 mt-6 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                required
                className="accent-[#FC8A06] w-4 h-4"
              />
              I agree to the
              <span className="text-[#FC8A06] font-medium">
                Terms & Conditions
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#FC8A06] hover:bg-[#e07a05] duration-300 text-white rounded-xl font-semibold text-lg mt-8 disabled:opacity-50 transition-all shadow-md hover:shadow-lg"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#FC8A06] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
