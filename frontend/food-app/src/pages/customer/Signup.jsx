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
        console.log(data);
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
        <div className="hidden lg:flex bg-[#FC8A06] text-white flex-col justify-center items-center p-12">
          <img src={Logo} alt="Logo" className="h-16 mb-10" />

          <h1 className="text-5xl font-bold text-center leading-tight">
            Join
            <br />
            Order.uk 🚀
          </h1>

          <p className="text-center text-orange-100 mt-6 leading-7">
            Create your account and enjoy
            <br />
            delicious food delivered to your door.
          </p>
        </div>

        {/* Right Side - Signup Form */}
        <div className="p-8 sm:p-12">
          <div className="lg:hidden flex justify-center mb-8">
            <img src={Logo} alt="Logo" className="h-14" />
          </div>

          <h2 className="text-4xl font-bold text-[#03081F]">Create Account</h2>
          <p className="text-gray-500 mt-2 mb-8">
            Fill in your details to get started.
          </p>

          <form onSubmit={handleSignUp}>
            {/* Username */}
            <label className="font-medium">Full Name</label>
            <div className="flex items-center border rounded-xl px-4 h-14 mt-2">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="John Doe"
                className="flex-1 outline-none px-3"
                required
              />
            </div>

            {/* Email */}
            <label className="font-medium block mt-5">Email Address</label>
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

            {/* Confirm Password */}
            <label className="font-medium block mt-5">Confirm Password</label>
            <div className="flex items-center border rounded-xl px-4 h-14 mt-2">
              <FaLock className="text-gray-400" />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="********"
                className="flex-1 outline-none px-3"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Country */}
            <label className="font-medium block mt-5">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Pakistan"
              className="w-full border rounded-xl h-14 px-4 mt-2 outline-none"
              required
            />

            {/* City */}
            <label className="font-medium block mt-5">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Karachi"
              className="w-full border rounded-xl h-14 px-4 mt-2 outline-none"
              required
            />

            {/* Terms */}
            <label className="flex items-center gap-2 mt-6 text-sm">
              <input type="checkbox" required />I agree to the
              <span className="text-[#FC8A06]">Terms & Conditions</span>
            </label>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#FC8A06] hover:bg-orange-600 text-white rounded-xl font-semibold text-lg mt-8 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#FC8A06] font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
