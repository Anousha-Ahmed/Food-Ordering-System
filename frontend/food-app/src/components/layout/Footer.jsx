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
        <div className="max-w-7xl mx-auto py-14 grid grid-cols-4 gap-12 mr-[19px]">
          {/* Logo */}
          <div>
            <img src={Logo} alt="" className="w-44 mb-5" />

            <div className="flex gap-3 mb-4">
              <img src={AppStore} alt="" className="h-10 cursor-pointer" />
              <img src={GooglePlay} alt="" className="h-10 cursor-pointer" />
            </div>

            <p className="text-sm text-gray-600">
              Company # 490039-445, Registered with
            </p>

            <p className="text-sm text-gray-600">House of companies.</p>
          </div>

          {/* Newsletter */}

          <div>
            <h3 className="font-bold mb-5">
              Get Exclusive Deals in your Inbox
            </h3>

            <div className="w-[365px] h-[56px] bg-slate-300 rounded-full flex items-center overflow-hidden">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                className="flex-1 h-full bg-slate-300 px-6 text-[15px] text-[#665e5e] outline-none"
              />

              <button className="w-[130px] h-full bg-[#FC8A06] text-white text-[16px] font-medium rounded-full">
                Subscribe
              </button>
            </div>

            <p className="text-xs mt-3 text-gray-600">
              we won't spam, read our email policy
            </p>

            <div className="flex gap-5 mt-5 text-2xl">
              <FaFacebookF />

              <FaInstagram />

              <FaTiktok />

              <FaSnapchatGhost />
            </div>
          </div>

          {/* Legal */}

          <div className="ml-[68px]">
            <h3 className="font-bold mb-5">Legal Pages</h3>

            <ul className="space-y-3 text-sm underline">
              <li>Terms and conditions</li>

              <li>Privacy</li>

              <li>Cookies</li>

              <li>Modern Slavery Statement</li>
            </ul>
          </div>

          {/* Links */}

          <div className="ml-[12px]">
            <h3 className="font-bold mb-5">Important Links</h3>

            <ul className="space-y-3 text-sm underline">
              <li>Get help</li>

              <li>Add your restaurant</li>

              <li>Sign up to deliver</li>

              <li>Create a business account</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}

      <div className="bg-[#03081F] text-white">
        <div className="max-w-7xl mx-auto py-5 flex justify-between text-sm">
          <p>Order.uk Copyright 2024, All Rights Reserved.</p>

          <div className="flex gap-8">
            <p>Privacy Policy</p>

            <p>Terms</p>

            <p>Pricing</p>

            <p>Do not sell or share my personal information</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
