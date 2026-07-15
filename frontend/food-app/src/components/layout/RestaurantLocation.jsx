import React from "react";

import LocationImg from "../../assets/RestaurantDetailImg/LocationImg.png";
import McdonaldaLocation from "../../assets/RestaurantDetailImg/McdonaldsLocation.png";

const RestaurantLocation = () => {
  return (
    <section className="max-w-7xl mx-auto my-16">

      <div className="relative rounded-2xl overflow-hidden border-gray-100 shadow-[0_8px_35px_rgba(0,0,0,0.12)]">

        {/* Map */}

        <img
          src={LocationImg}
          alt=""
          className="w-full h-[500px] object-cover"
        />

        {/* Left Information Card */}

        <div className="absolute top-[55px] left-[120px] w-[320px] h-[400px] bg-[#03081F]/95 rounded-2xl px-8 py-10 text-white">

          <h2 className="text-[22px] font-bold leading-none mt-8">
            McDonald’s
          </h2>

          <p className="text-[#FC8A06] text-[15px] font-semibold mt-1">
            South London
          </p>

          <p className="text-[12px] leading-5 mt-6 text-gray-200">
            Tooley St, London Bridge,
            London SE1 2TF,
            <br />
            United Kingdom
          </p>

          <div className="mt-4">

            <h3 className="font-bold text-[14px]">
              Phone number
            </h3>

            <p className="text-[#FC8A06] text-[18px] font-semibold mt-1">
              +934443-43
            </p>

          </div>

          <div className="mt-4">

            <h3 className="font-bold text-[14px]">
              Website
            </h3>

            <p className="text-[#FC8A06] text-[20px] font-semibold mt-1 break-all">
              http://mcdonalds.uk/
            </p>

          </div>

        </div>

        {/* Right Location Icon */}

        {/* White Location Popup */}

        <div className="absolute top-[160px] right-[150px]">

        {/* White Card */}
        <div className="relative bg-white rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.18)] w-[190px] h-[65px] flex items-center px-8">

        <div>
            <h3 className="text-[12px] font-bold text-[#03081F] ">
            McDonald's
            </h3>

            <p className="text-[12px] font-semibold text-[#03081F] ">
            South London
            </p>
        </div>

        {/* Dark Circle */}
        <div className="absolute bottom-[18px] right-0 translate-x-1/2 w-[60px] h-[60px] bg-[#03081F] rounded-full flex items-center justify-center shadow-xl">

            <img
            src={McdonaldaLocation}
            alt=""
            className="w-8 h-8"
            />

        </div>

        </div>

        </div>

      </div>

    </section>
  );
};

export default RestaurantLocation;