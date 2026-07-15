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
    {name: "Order", path:"/orders"}
  ];

  return (
    <header className="w-full bg-white">
      <div className="max-w-7xl mx-auto h-[84px] px-4 lg:px-15 flex items-center justify-between mt-5">

        {/* Logo */}
        <img
          src={Logo}
          alt="Logo"
          className="h-[45px] w-auto object-contain"
        />

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-5 py-2 rounded-full text-[16px] font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#FC8A06] text-white"
                    : "text-[#03081F]"
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
          className="lg:hidden text-3xl"
        >
          {open ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white shadow-lg border-t">
          <nav className="flex flex-col">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-left px-6 py-4 transition-all ${
                    isActive
                      ? "bg-[#FC8A06] text-white"
                      : "border-b hover:bg-gray-100"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="p-5">
              <AuthButtons />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;