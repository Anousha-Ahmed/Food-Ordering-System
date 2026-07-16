import React from "react";
import LocationImg from "../../assets/RestaurantDetailImg/LocationImg.png";
import McdonaldaLocation from "../../assets/RestaurantDetailImg/McdonaldsLocation.png";

const RestaurantLocation = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12 md:my-16">
      <div className="relative rounded-2xl overflow-hidden border-gray-100 shadow-[0_8px_35px_rgba(0,0,0,0.12)]">

        {/* Map */}
        <img
          src={LocationImg}
          alt=""
          className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover"
        />

        {/* Left Information Card */}
        <div className="absolute top-[20px] sm:top-[30px] md:top-[40px] lg:top-[55px] left-[15px] sm:left-[40px] md:left-[80px] lg:left-[120px] w-[200px] sm:w-[250px] md:w-[280px] lg:w-[320px] h-auto bg-[#03081F]/95 rounded-2xl px-4 sm:px-6 md:px-7 lg:px-8 py-6 sm:py-8 md:py-9 lg:py-10 text-white">
          <h2 className="text-lg sm:text-xl md:text-[22px] font-bold leading-none mt-2 sm:mt-4 md:mt-6 lg:mt-8">
            McDonald's
          </h2>

          <p className="text-[#FC8A06] text-xs sm:text-sm md:text-[15px] font-semibold mt-1">
            South London
          </p>

          <p className="text-[10px] sm:text-[11px] md:text-[12px] leading-4 sm:leading-5 mt-4 sm:mt-5 md:mt-6 text-gray-200">
            Tooley St, London Bridge,
            London SE1 2TF,
            <br />
            United Kingdom
          </p>

          <div className="mt-3 sm:mt-4">
            <h3 className="font-bold text-xs sm:text-sm md:text-[14px]">Phone number</h3>
            <p className="text-[#FC8A06] text-sm sm:text-base md:text-[18px] font-semibold mt-1">+934443-43</p>
          </div>

          <div className="mt-3 sm:mt-4">
            <h3 className="font-bold text-xs sm:text-sm md:text-[14px]">Website</h3>
            <p className="text-[#FC8A06] text-sm sm:text-base md:text-[20px] font-semibold mt-1 break-all">http://mcdonalds.uk/</p>
          </div>
        </div>

        {/* Right Location Icon */}
        <div className="absolute top-[100px] sm:top-[120px] md:top-[140px] lg:top-[160px] right-[20px] sm:right-[60px] md:right-[100px] lg:right-[150px]">
          {/* White Card */}
          <div className="relative bg-white rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.18)] w-[130px] sm:w-[150px] md:w-[170px] lg:w-[190px] h-[50px] sm:h-[55px] md:h-[60px] lg:h-[65px] flex items-center px-4 sm:px-5 md:px-6 lg:px-8">
            <div>
              <h3 className="text-[10px] sm:text-[11px] md:text-[12px] font-bold text-[#03081F]">
                McDonald's
              </h3>
              <p className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#03081F]">
                South London
              </p>
            </div>

            {/* Dark Circle */}
            <div className="absolute bottom-[10px] sm:bottom-[14px] md:bottom-[16px] lg:bottom-[18px] right-0 translate-x-1/2 w-[40px] sm:w-[45px] md:w-[50px] lg:w-[60px] h-[40px] sm:h-[45px] md:h-[50px] lg:h-[60px] bg-[#03081F] rounded-full flex items-center justify-center shadow-xl">
              <img
                src={McdonaldaLocation}
                alt=""
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RestaurantLocation;