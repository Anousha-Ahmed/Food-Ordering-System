import React from "react";
import InfoImg1 from "../../assets/InfoSectImg/InfoImg1.png";
import InfoImg2 from "../../assets/InfoSectImg/InfoImg2.png";
import InfoImg3 from "../../assets/InfoSectImg/InfoImg3.png";

const InfoSection = () => {
  return (
    <section className="max-w-7xl mx-auto mt-10 sm:mt-16 md:mt-20 px-4 sm:px-6 lg:px-8">
      <div className="bg-[#F5F5F5] rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10">
        
        {/* Heading - Responsive */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 md:mb-8 lg:mb-10 gap-4 lg:gap-0">
          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-center lg:text-left">
            Know more about us!
          </h2>

          {/* Navigation Buttons - Horizontal Scroll on Mobile */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-8 w-full lg:w-auto">
            <button className="border border-[#FC8A06] text-black rounded-full px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 font-semibold text-xs sm:text-sm md:text-base hover:bg-[#FC8A06] hover:text-white transition-colors whitespace-nowrap">
              Frequent Questions
            </button>
            <button className="hover:text-[#FC8A06] transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap">
              Who we are?
            </button>
            <button className="hover:text-[#FC8A06] transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap">
              Partner Program
            </button>
            <button className="hover:text-[#FC8A06] transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap">
              Help & Support
            </button>
          </div>
        </div>

        {/* Main Box - Responsive */}
        <div className="bg-[#03081F] rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row">
          
          {/* Left Side - FAQ Section */}
          <div className="w-full lg:w-[30%] border-b lg:border-b-0 lg:border-r border-gray-700 pb-6 lg:pb-0 lg:pr-8 mb-6 lg:mb-0">
            <button className="bg-[#FC8A06] text-black font-semibold rounded-full px-6 sm:px-8 py-2.5 sm:py-3 mb-6 sm:mb-8 text-sm sm:text-base w-full sm:w-auto hover:bg-[#e07a05] transition-colors">
              How does Order.UK work?
            </button>

            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-white font-medium">
              <p className="text-sm sm:text-base hover:text-[#FC8A06] transition-colors cursor-pointer">
                What payment methods are accepted?
              </p>
              <p className="text-sm sm:text-base hover:text-[#FC8A06] transition-colors cursor-pointer">
                Can I track my order in real-time?
              </p>
              <p className="text-sm sm:text-base hover:text-[#FC8A06] transition-colors cursor-pointer">
                Are there any special discounts or promotions available?
              </p>
              <p className="text-sm sm:text-base hover:text-[#FC8A06] transition-colors cursor-pointer">
                Is Order.UK available in my area?
              </p>
            </div>
          </div>

          {/* Right Side - Cards Section */}
          <div className="w-full lg:w-[70%] lg:pl-8 md:pl-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              
              {/* Card 1 */}
              <div className="bg-[#EEEEEE] rounded-xl p-4 sm:p-5 md:p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
                  Place an Order!
                </h3>
                <img
                  src={InfoImg1}
                  alt="Place an Order"
                  className="w-16 sm:w-20 md:w-24 mx-auto mb-3 sm:mb-4"
                />
                <p className="text-xs sm:text-sm">
                  Place order through our website or Mobile app
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#EEEEEE] rounded-xl p-4 sm:p-5 md:p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
                  Track Progress
                </h3>
                <img
                  src={InfoImg2}
                  alt="Track Progress"
                  className="w-16 sm:w-20 md:w-24 mx-auto mb-3 sm:mb-4"
                />
                <p className="text-xs sm:text-sm">
                  You can track your order status with delivery time
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#EEEEEE] rounded-xl p-4 sm:p-5 md:p-6 text-center hover:shadow-lg transition-shadow sm:col-span-2 md:col-span-1">
                <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
                  Get your Order!
                </h3>
                <img
                  src={InfoImg3}
                  alt="Get your Order"
                  className="w-16 sm:w-20 md:w-24 mx-auto mb-3 sm:mb-4"
                />
                <p className="text-xs sm:text-sm">
                  Receive your order at lightning fast speed.
                </p>
              </div>
            </div>

            {/* Bottom Text */}
            <p className="text-white text-center mt-6 sm:mt-7 md:mt-8 text-xs sm:text-sm leading-6 sm:leading-7">
              Order.UK simplifies the food ordering process. Browse through our
              diverse menu, select your favourite dishes, and proceed to
              checkout. Your delicious meal will be on its way to your doorstep
              in no time!
            </p>
          </div>
        </div>

        {/* Orange Stats - Responsive */}
        <div className="bg-[#FC8A06] rounded-xl mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 text-center text-white py-6 sm:py-8">
          
          <div className="border-b sm:border-b-0 sm:border-r border-white/30 pb-4 sm:pb-0 mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">546+</h2>
            <p className="font-semibold mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">Registered Riders</p>
          </div>

          <div className="border-b sm:border-b-0 sm:border-r border-white/30 pb-4 sm:pb-0 mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">789,900+</h2>
            <p className="font-semibold mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">Orders Delivered</p>
          </div>

          <div className="border-b sm:border-b-0 sm:border-r border-white/30 pb-4 sm:pb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">690+</h2>
            <p className="font-semibold mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">Restaurants Partnered</p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">17,457+</h2>
            <p className="font-semibold mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">Food Items</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;