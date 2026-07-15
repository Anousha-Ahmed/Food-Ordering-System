import React from "react";

import LocationLogo from "../../assets/RestaurantDetailImg/LocationLogo.png";
import ContactLogo from "../../assets/RestaurantDetailImg/ContactLogo.png";
import ClockLogo from "../../assets/RestaurantDetailImg/ClockLogo.png";

const RestaurantInfo = () => {
  return (
    <section className="max-w-7xl mx-auto my-16">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_35px_rgba(0,0,0,0.12)] overflow-hidden">

        <div className="grid grid-cols-3">

          {/* Delivery Information */}

          <div className="p-10">

            <div className="flex items-center gap-3 mb-8">
              <img src={LocationLogo} alt="" className="w-8 h-8" />
              <h2 className="text-3xl font-bold text-[#03081F]">
                Delivery information
              </h2>
            </div>

            <div className="space-y-4 text-[15px]">

              <p><span className="font-bold">Monday:</span> 12:00 AM – 3:00 AM, 8:00 AM – 3:00 AM</p>

              <p><span className="font-bold">Tuesday:</span> 8:00 AM – 3:00 AM</p>

              <p><span className="font-bold">Wednesday:</span> 8:00 AM – 3:00 AM</p>

              <p><span className="font-bold">Thursday:</span> 8:00 AM – 3:00 AM</p>

              <p><span className="font-bold">Friday:</span> 8:00 AM – 3:00 AM</p>

              <p><span className="font-bold">Saturday:</span> 8:00 AM – 12:00 AM</p>

              <p><span className="font-bold">Sunday:</span> 8:00 AM – 12:00 AM</p>

              <p className="pt-2">
                <span className="font-bold">
                  Estimated time until delivery:
                </span>{" "}
                20 min
              </p>

            </div>

          </div>

          {/* Contact Information */}

          <div className="p-10">

            <div className="flex items-center gap-3 mb-8">
              <img src={ContactLogo} alt="" className="w-8 h-8" />
              <h2 className="text-3xl font-bold text-[#03081F]">
                Contact information
              </h2>
            </div>

            <p className="text-[15px] leading-8 text-gray-700 mb-8">
              If you have allergies or other dietary restrictions,
              please contact the restaurant. The restaurant will provide
              food-specific information upon request.
            </p>

            <div className="space-y-5">

              <div>
                <h3 className="font-bold text-[16px]">
                  Phone number
                </h3>
                <p className="text-[22px] mt-1">
                  +934443-43
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[16px]">
                  Website
                </h3>
                <p className="text-[22px] mt-1">
                  http://mcdonalds.uk/
                </p>
              </div>

            </div>

          </div>

          {/* Operational Times */}

          <div className="bg-[#03081F] text-white p-10">

            <div className="flex items-center gap-3 mb-8">
              <img src={ClockLogo} alt="" className="w-8 h-8" />
              <h2 className="text-3xl font-bold">
                Operational Times
              </h2>
            </div>

            <div className="space-y-4 text-[15px]">

              <p><span className="font-bold">Monday:</span> 8:00 AM – 3:00 AM</p>

              <p><span className="font-bold">Tuesday:</span> 8:00 AM – 3:00 AM</p>

              <p><span className="font-bold">Wednesday:</span> 8:00 AM – 3:00 AM</p>

              <p><span className="font-bold">Thursday:</span> 8:00 AM – 3:00 AM</p>

              <p><span className="font-bold">Friday:</span> 8:00 AM – 3:00 AM</p>

              <p><span className="font-bold">Saturday:</span> 8:00 AM – 3:00 AM</p>

              <p><span className="font-bold">Sunday:</span> 8:00 AM – 3:00 AM</p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default RestaurantInfo;