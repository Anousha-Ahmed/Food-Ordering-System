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
    <section className="w-full bg-[#EAEAEA] mt-10 sm:mt-14 md:mt-16 lg:mt-20 py-8 sm:py-10 md:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-bold text-[#03081F] text-center sm:text-left">
            Customer Reviews
          </h2>

          <div className="flex gap-3 sm:gap-4">
            {/* Previous */}
            <button className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#FC8A06] flex items-center justify-center hover:bg-[#e07a05] transition-colors">
              <img src={FBButton} alt="" className="w-5 sm:w-6 md:w-7" />
            </button>

            {/* Next */}
            <button className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#FC8A06] flex items-center justify-center hover:bg-[#e07a05] transition-colors">
              <img
                src={FBButton}
                alt=""
                className="w-5 sm:w-6 md:w-7 rotate-180"
              />
            </button>
          </div>
        </div>

        {/* Review Cards with Rating Badges Below */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {reviews.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              {/* Card */}
              <div className="bg-white rounded-md px-4 sm:px-5 md:px-6 lg:px-7 py-4 sm:py-5 md:py-6 h-auto sm:h-[230px] md:h-[240px] lg:h-[250px] shadow-sm w-full">
                {/* Top */}
                <div className="flex flex-wrap justify-between items-start gap-2">
                  {/* Left */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img
                      src={customer}
                      alt=""
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full"
                    />

                    <div className="w-[1.5px] h-8 sm:h-10 md:h-12 bg-[#FC8A06]"></div>

                    <div>
                      <h3 className="font-bold text-base sm:text-lg md:text-[22px] leading-none">
                        {item.name}
                      </h3>
                      <p className="text-[#FC8A06] text-xs sm:text-sm md:text-[15px] mt-1 sm:mt-2">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end">
                    {/* 5 Stars */}
                    <div className="flex gap-0.5 sm:gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <img
                          key={star}
                          src={StarLogo}
                          alt=""
                          className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                        />
                      ))}
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-3">
                      <img
                        src={ClockLogo}
                        alt=""
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                      />
                      <span className="text-[10px] sm:text-[11px] md:text-[12px] text-[#555]">
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review */}
                <p className="mt-3 sm:mt-4 md:mt-5 text-xs sm:text-sm md:text-[15px] leading-5 sm:leading-6 md:leading-7 lg:leading-8 text-[#3B3B3B] line-clamp-4 sm:line-clamp-3">
                  {item.review}
                </p>
              </div>

              {/* Rating Badge - Below each card */}
              <div className="lg:block hidden -mt-2">
                <img
                  src={Review}
                  alt=""
                  className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[130px] h-[90px] sm:h-[110px] md:h-[130px] lg:h-[140px] rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;