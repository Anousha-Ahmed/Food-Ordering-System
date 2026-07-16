import React from "react";

import customer from "../../assets/RestaurantDetailImg/customer.png";
import StarLogo from "../../assets/RestaurantDetailImg/StarLogo.png";
import ClockLogo from "../../assets/RestaurantDetailImg/ClockLogo.png";
import FBButton from "../../assets/RestaurantDetailImg/FBButton.png";
import Review from "../../assets/RestaurantDetailImg/Review.png";

const reviews = [
  {
    id: 1,
    name: "St Glx",
    location: "South London",
    date: "24th September, 2023",
    review:
      "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard - hot and satisfying.",
  },
  {
    id: 2,
    name: "St Glx",
    location: "South London",
    date: "24th September, 2023",
    review:
      "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard - hot and satisfying.",
  },
  {
    id: 3,
    name: "St Glx",
    location: "South London",
    date: "24th September, 2023",
    review:
      "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard - hot and satisfying.",
  },
];

const CustomerReviews = () => {
  return (
    <section className="w-full bg-[#EAEAEA] mt-20 py-16">

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Heading */}

        <div className="flex justify-between items-center mb-12">

          <h2 className="text-[38px] font-bold text-[#03081F]">
            Customer Reviews
          </h2>

          <div className="flex gap-4">

            {/* Previous */}

            <button className="w-14 h-14 rounded-full bg-[#FC8A06] flex items-center justify-center">

              <img
                src={FBButton}
                alt=""
                className="w-7"
              />

            </button>

            {/* Next */}

            <button className="w-14 h-14 rounded-full bg-[#FC8A06] flex items-center justify-center">

              <img
                src={FBButton}
                alt=""
                className="w-7 rotate-180"
              />

            </button>

          </div>

        </div>

        {/* Review Cards */}

        <div className="grid grid-cols-3 gap-6">

          {reviews.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-md px-7 py-6 h-[250px] shadow-sm"
            >

              {/* Top */}

              <div className="flex justify-between">

                {/* Left */}

                <div className="flex items-center gap-3">

                  <img
                    src={customer}
                    alt=""
                    className="w-14 h-14 rounded-full"
                  />

                  {/* Vertical Orange Line */}

                  <div className="w-[2px] h-12 bg-[#FC8A06]"></div>

                  <div>

                    <h3 className="font-bold text-[22px] leading-none">
                      {item.name}
                    </h3>

                    <p className="text-[#FC8A06] text-[15px] mt-2">
                      {item.location}
                    </p>

                  </div>

                </div>

                {/* Right */}

                <div className="flex flex-col items-end">

                  {/* 5 Stars */}

                  <div className="flex gap-1">

                    {[1, 2, 3, 4, 5].map((star) => (

                      <img
                        key={star}
                        src={StarLogo}
                        alt=""
                        className="w-4 h-4"
                      />

                    ))}

                  </div>

                  {/* Date */}

                  <div className="flex items-center gap-2 mt-3">

                    <img
                      src={ClockLogo}
                      alt=""
                      className="w-4 h-4"
                    />

                    <span className="text-[12px] text-[#555]">
                      {item.date}
                    </span>

                  </div>

                </div>

              </div>

              {/* Review */}

              <p className="mt-5 text-[15px] leading-8 text-[#3B3B3B]">
                {item.review}
              </p>

            </div>

          ))}

        </div>

        {/* Bottom Rating */}

        <div className="absolute left-[550px] top-[390px]">

          <img
            src={Review}
            alt=""
            className="w-[130px] h-[140px] rounded-md"
          />

        </div>

      </div>

    </section>
  );
};

export default CustomerReviews;