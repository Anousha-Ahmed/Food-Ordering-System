import React from "react";
import InfoImg1 from "../../assets/InfoSectImg/InfoImg1.png";
import InfoImg2 from "../../assets/InfoSectImg/InfoImg2.png";
import InfoImg3 from "../../assets/InfoSectImg/InfoImg3.png";

const InfoSection = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto mt-20">

        <div className="bg-[#F5F5F5] rounded-2xl p-10">

          {/* Heading */}

          <div className="flex justify-between items-center mb-10">

            <h2 className="text-[36px] font-bold">
              Know more about us!
            </h2>

            <div className="flex gap-8">

              <button className="border border-[#FC8A06] text-black rounded-full px-6 py-2 font-semibold">
                Frequent Questions
              </button>

              <button>Who we are?</button>

              <button>Partner Program</button>

              <button>Help & Support</button>

            </div>

          </div>

          {/* Main Box */}

          <div className="bg-[#03081F] rounded-2xl p-10 flex">

            {/* Left */}

            <div className="w-[30%] border-r border-gray-700 pr-8">

              <button className="bg-[#FC8A06] text-black font-semibold rounded-full px-8 py-3 mb-8">
                How does Order.UK work?
              </button>

              <div className="space-y-6 text-white font-medium">

                <p>What payment methods are accepted?</p>

                <p>Can I track my order in real-time?</p>

                <p>Are there any special discounts or promotions available?</p>

                <p>Is Order.UK available in my area?</p>

              </div>

            </div>

            {/* Right */}

            <div className="w-[70%] pl-10">

              <div className="grid grid-cols-3 gap-6">

                {/* Card 1 */}

                <div className="bg-[#EEEEEE] rounded-xl p-6 text-center">

                  <h3 className="font-bold mb-4">
                    Place an Order!
                  </h3>

                  <img
                    src={InfoImg1}
                    alt=""
                    className="w-24 mx-auto mb-4"
                  />

                  <p className="text-sm">
                    Place order through our website or Mobile app
                  </p>

                </div>

                {/* Card 2 */}

                <div className="bg-[#EEEEEE] rounded-xl p-6 text-center">

                  <h3 className="font-bold mb-4">
                    Track Progress
                  </h3>

                  <img
                    src={InfoImg2}
                    alt=""
                    className="w-24 mx-auto mb-4"
                  />

                  <p className="text-sm">
                    You can track your order status with delivery time
                  </p>

                </div>

                {/* Card 3 */}

                <div className="bg-[#EEEEEE] rounded-xl p-6 text-center">

                  <h3 className="font-bold mb-4">
                    Get your Order!
                  </h3>

                  <img
                    src={InfoImg3}
                    alt=""
                    className="w-24 mx-auto mb-4"
                  />

                  <p className="text-sm">
                    Receive your order at lightning fast speed.
                  </p>

                </div>

              </div>

              {/* Bottom Text */}

              <p className="text-white text-center mt-8 text-sm leading-7">

                Order.UK simplifies the food ordering process. Browse through our
                diverse menu, select your favourite dishes, and proceed to
                checkout. Your delicious meal will be on its way to your doorstep
                in no time!

              </p>

            </div>

          </div>

          {/* Orange Stats */}

          <div className="bg-[#FC8A06] rounded-xl mt-10 grid grid-cols-4 text-center text-white py-8">

            <div className="border-r border-white">
              <h2 className="text-5xl font-semibold">546+</h2>
              <p className="font-semibold mt-2">Registered Riders</p>
            </div>

            <div className="border-r border-white">
              <h2 className="text-5xl font-semibold">789,900+</h2>
              <p className="font-semibold mt-2">Orders Delivered</p>
            </div>

            <div className="border-r border-white">
              <h2 className="text-5xl font-semibold">690+</h2>
              <p className="font-semibold mt-2">Restaurants Partnered</p>
            </div>

            <div>
              <h2 className="text-5xl font-semibold">17,457+</h2>
              <p className="font-semibold mt-2">Food Items</p>
            </div>

          </div>

        </div>

      </section>
    </>
  );
};

export default InfoSection;