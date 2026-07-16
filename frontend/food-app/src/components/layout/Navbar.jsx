import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

import Logo from "../../assets/NavbarImg/Logo.png";
import AuthButtons from "../common/Button/AuthButtons";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Special Offers", path: "/offers" },
    { name: "Restaurants", path: "/restaurants" },
    { name: "Checkout", path: "/checkout" },
    { name: "Order", path: "/orders" }
  ];

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto h-[70px] sm:h-[76px] md:h-[80px] lg:h-[84px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-15 flex items-center justify-between mt-2 sm:mt-3 md:mt-4 lg:mt-5">

        {/* Logo */}
        <img
          src={Logo}
          alt="Logo"
          className="h-[35px] sm:h-[38px] md:h-[40px] lg:h-[45px] w-auto object-contain flex-shrink-0"
        />

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-10">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-3 xl:px-4 2xl:px-5 py-1.5 xl:py-2 rounded-full text-sm xl:text-[15px] 2xl:text-[16px] font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "bg-[#FC8A06] text-white"
                    : "text-[#03081F] hover:bg-gray-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Login */}
        <div className="hidden lg:block">
          <AuthButtons />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-2xl sm:text-3xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white shadow-lg border-t border-gray-100 animate-slideDown">
          <nav className="flex flex-col">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-left px-4 sm:px-6 py-3.5 sm:py-4 transition-all text-sm sm:text-base ${
                    isActive
                      ? "bg-[#FC8A06] text-white"
                      : "border-b border-gray-100 hover:bg-gray-50 text-[#03081F]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="p-4 sm:p-5">
              <AuthButtons />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;