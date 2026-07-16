import React from "react";
import Logo from "../../assets/NavbarImg/Logo.png";
import AppStore from "../../assets/DownloadAppImg/AppStore.png";
import GooglePlay from "../../assets/DownloadAppImg/GooglePlay.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaSnapchatGhost,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-20">
      {/* Top Footer */}
      <div className="bg-[#EAEAEA]">
        <div className="max-w-7xl mx-auto py-8 md:py-14 px-4 sm:px-6 lg:px-8">
          {/* Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Logo Section */}
            <div className="flex flex-col items-start">
              <img src={Logo} alt="Logo" className="w-36 sm:w-40 md:w-44 mb-5" />

              <div className="flex gap-3 mb-4 flex-wrap">
                <img src={AppStore} alt="App Store" className="h-9 sm:h-10 cursor-pointer" />
                <img src={GooglePlay} alt="Google Play" className="h-9 sm:h-10 cursor-pointer" />
              </div>

              <p className="text-sm text-gray-600">
                Company # 490039-445, Registered with
              </p>

              <p className="text-sm text-gray-600">House of companies.</p>
            </div>

            {/* Newsletter Section */}
            <div className="flex flex-col items-start">
              <h3 className="font-bold mb-4 md:mb-5 text-base sm:text-lg">
                Get Exclusive Deals in your Inbox
              </h3>

              <div className="w-full max-w-[365px] h-[50px] sm:h-[56px] bg-slate-300 rounded-full flex items-center overflow-hidden">
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  className="flex-1 h-full bg-slate-300 px-4 sm:px-6 text-sm sm:text-[15px] text-[#665e5e] outline-none min-w-0"
                />

                <button className="w-[100px] sm:w-[130px] h-full bg-[#FC8A06] text-white text-sm sm:text-[16px] font-medium rounded-full flex-shrink-0 hover:bg-[#e07a05] transition-colors">
                  Subscribe
                </button>
              </div>

              <p className="text-xs mt-3 text-gray-600">
                we won't spam, read our email policy
              </p>

              <div className="flex gap-4 sm:gap-5 mt-4 sm:mt-5 text-xl sm:text-2xl">
                <FaFacebookF className="cursor-pointer hover:text-[#FC8A06] transition-colors" />
                <FaInstagram className="cursor-pointer hover:text-[#FC8A06] transition-colors" />
                <FaTiktok className="cursor-pointer hover:text-[#FC8A06] transition-colors" />
                <FaSnapchatGhost className="cursor-pointer hover:text-[#FC8A06] transition-colors" />
              </div>
            </div>

            {/* Legal Pages */}
            <div className="flex flex-col items-start">
              <h3 className="font-bold mb-4 md:mb-5 text-base sm:text-lg">Legal Pages</h3>

              <ul className="space-y-2 sm:space-y-3 text-sm underline">
                <li className="hover:text-[#FC8A06] transition-colors cursor-pointer">Terms and conditions</li>
                <li className="hover:text-[#FC8A06] transition-colors cursor-pointer">Privacy</li>
                <li className="hover:text-[#FC8A06] transition-colors cursor-pointer">Cookies</li>
                <li className="hover:text-[#FC8A06] transition-colors cursor-pointer">Modern Slavery Statement</li>
              </ul>
            </div>

            {/* Important Links */}
            <div className="flex flex-col items-start">
              <h3 className="font-bold mb-4 md:mb-5 text-base sm:text-lg">Important Links</h3>

              <ul className="space-y-2 sm:space-y-3 text-sm underline">
                <li className="hover:text-[#FC8A06] transition-colors cursor-pointer">Get help</li>
                <li className="hover:text-[#FC8A06] transition-colors cursor-pointer">Add your restaurant</li>
                <li className="hover:text-[#FC8A06] transition-colors cursor-pointer">Sign up to deliver</li>
                <li className="hover:text-[#FC8A06] transition-colors cursor-pointer">Create a business account</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#03081F] text-white">
        <div className="max-w-7xl mx-auto py-4 md:py-5 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 text-xs sm:text-sm">
            <p>Order.uk Copyright 2024, All Rights Reserved.</p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8">
              <p className="hover:text-[#FC8A06] transition-colors cursor-pointer">Privacy Policy</p>
              <p className="hover:text-[#FC8A06] transition-colors cursor-pointer">Terms</p>
              <p className="hover:text-[#FC8A06] transition-colors cursor-pointer">Pricing</p>
              <p className="hover:text-[#FC8A06] transition-colors cursor-pointer text-center sm:text-left">
                Do not sell or share my personal information
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;