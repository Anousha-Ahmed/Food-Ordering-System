import React from "react";
import LocationLogo from "../../assets/RestaurantDetailImg/LocationLogo.png";
import ContactLogo from "../../assets/RestaurantDetailImg/ContactLogo.png";
import ClockLogo from "../../assets/RestaurantDetailImg/ClockLogo.png";

const RestaurantInfo = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12 md:my-16">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_35px_rgba(0,0,0,0.12)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Delivery Information */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 border-b md:border-b-0 md:border-r border-gray-100">
            <div className="flex items-center gap-3 mb-4 sm:mb-6 md:mb-8">
              <img
                src={LocationLogo}
                alt=""
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
              />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#03081F]">
                Delivery information
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4 text-sm sm:text-[15px]">
              <p>
                <span className="font-bold">Monday:</span> 12:00 AM – 3:00 AM,
                8:00 AM – 3:00 AM
              </p>
              <p>
                <span className="font-bold">Tuesday:</span> 8:00 AM – 3:00 AM
              </p>
              <p>
                <span className="font-bold">Wednesday:</span> 8:00 AM – 3:00 AM
              </p>
              <p>
                <span className="font-bold">Thursday:</span> 8:00 AM – 3:00 AM
              </p>
              <p>
                <span className="font-bold">Friday:</span> 8:00 AM – 3:00 AM
              </p>
              <p>
                <span className="font-bold">Saturday:</span> 8:00 AM – 12:00 AM
              </p>
              <p>
                <span className="font-bold">Sunday:</span> 8:00 AM – 12:00 AM
              </p>
              <p className="pt-2">
                <span className="font-bold">
                  Estimated time until delivery:
                </span>{" "}
                20 min
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 border-b md:border-b-0 md:border-r border-gray-100">
            <div className="flex items-center gap-3 mb-4 sm:mb-6 md:mb-8">
              <img
                src={ContactLogo}
                alt=""
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
              />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#03081F]">
                Contact information
              </h2>
            </div>

            <p className="text-sm sm:text-[15px] leading-6 sm:leading-8 text-gray-700 mb-6 sm:mb-8">
              If you have allergies or other dietary restrictions, please
              contact the restaurant. The restaurant will provide food-specific
              information upon request.
            </p>

            <div className="space-y-4 sm:space-y-5">
              <div>
                <h3 className="font-bold text-sm sm:text-[16px]">
                  Phone number
                </h3>
                <p className="text-lg sm:text-[22px] mt-1">+934443-43</p>
              </div>

              <div>
                <h3 className="font-bold text-sm sm:text-[16px]">Website</h3>
                <p className="text-lg sm:text-[22px] mt-1 break-all">
                  http://mcdonalds.uk/
                </p>
              </div>
            </div>
          </div>

          {/* Operational Times */}
          <div className="bg-[#03081F] text-white p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-4 sm:mb-6 md:mb-8">
              <img
                src={ClockLogo}
                alt=""
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
              />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Operational Times
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4 text-sm sm:text-[15px]">
              <p>
                <span className="font-bold">Monday:</span> 8:00 AM – 3:00 AM
              </p>

              <p>
                <span className="font-bold">Tuesday:</span> 8:00 AM – 3:00 AM
              </p>

              <p>
                <span className="font-bold">Wednesday:</span> 8:00 AM – 3:00 AM
              </p>
              <p>
                <span className="font-bold">Thursday:</span> 8:00 AM – 3:00 AM
              </p>
              <p>
                <span className="font-bold">Friday:</span> 8:00 AM – 3:00 AM
              </p>
              <p>
                <span className="font-bold">Saturday:</span> 8:00 AM – 3:00 AM
              </p>
              <p>
                <span className="font-bold">Sunday:</span> 8:00 AM – 3:00 AM
              </p>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
};

export default RestaurantInfo;
