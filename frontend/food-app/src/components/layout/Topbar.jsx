import React from "react";
import { FaMapMarkerAlt, FaArrowDown } from "react-icons/fa";
import FullShoppingBasket from "../../assets/TopBarImg/FullShoppingBasket.png";

const TopBar = () => {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto bg-[#FAFAFA] border border-gray-200 rounded-b-lg overflow-hidden">

        {/* Desktop */}
        <div className="hidden lg:flex h-[70px] items-center justify-between">

          <div className="h-full border-l border-gray-200 flex items-center pl-5">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>🌟</span>
              <span>
                Get 5% Off your first order,
              </span>
              <span className="text-orange-500 font-semibold">
                Promo: ORDER5
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FaMapMarkerAlt className="w-4 h-4 text-slate-900" />
            <span>Regent Street, A4, A4201, London</span>

            <button className="text-orange-500 font-semibold">
              Change Location
            </button>
          </div>

          <div className="flex h-full">

            <div className="w-px bg-gray-200"></div>

            <div className="w-[378px] h-full bg-[#0B8F4D] rounded-b-lg flex items-center text-white">

              <div className="w-[70px] h-full border-r border-[#18A15C] flex items-center justify-center">
                <img
                  src={FullShoppingBasket}
                  alt=""
                  className="w-9 h-9"
                />
              </div>

              <div className="w-[110px] h-full border-r border-[#18A15C] flex items-center justify-center font-semibold text-sm">
                23 Items
              </div>

              <div className="w-[120px] h-full border-r border-[#18A15C] flex items-center justify-center font-semibold text-sm">
                GBP 79.89
              </div>

              <div className="w-[78px] h-full flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <FaArrowDown className="text-[#0B8F4D] text-[10px]" />
                </div>
              </div>

            </div>

            <div className="w-px bg-gray-200"></div>

          </div>
        </div>

        {/* Mobile & Tablet */}
        <div className="lg:hidden">

          <div className="px-4 py-3 flex items-center justify-center gap-2 text-center text-xs sm:text-sm text-gray-600 border-b">
            <span>🌟</span>
            <span>
              <span className="text-orange-500 font-semibold">
                ORDER5
              </span>{" "}
              First Order Discount
            </span>
          </div>

          <div className="px-4 py-3 flex items-center justify-center gap-2 text-xs sm:text-sm border-b">
            <FaMapMarkerAlt className="text-slate-900" />
            <span className="truncate">
              Regent Street, London
            </span>
          </div>

          <div className="bg-[#0B8F4D] text-white flex items-center justify-between px-4 h-[60px]">

            <div className="flex items-center gap-3">
              <img
                src={FullShoppingBasket}
                alt=""
                className="w-8 h-8"
              />

              <div>
                <p className="font-semibold text-sm">
                  23 Items
                </p>

                <p className="text-xs">
                  GBP 79.89
                </p>
              </div>
            </div>

            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
              <FaArrowDown className="text-[#0B8F4D] text-[10px]" />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TopBar;