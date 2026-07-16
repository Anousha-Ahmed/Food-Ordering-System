import React, { useEffect, useState } from "react";
import CategoryFilter from "../../components/menu/CategoryFilter";
import TopBar from "../../components/layout/Topbar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { API, BASE_URL } from "../../api/endpoints";
import { Link } from "react-router-dom";

const SpecialOffer = () => {
  const [deals, setDeals] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch(API.ALL_DEAL)
      .then((res) => res.json())
      .then((data) => {
        setDeals(data.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  // Dynamic Categories
  const categories = [
    "All",
    ...new Set(
      deals
        .map((deal) => deal.items?.[0]?.menu_item?.category?.name)
        .filter(Boolean)
    ),
  ];

  // Filter Deals
  const filteredDeals =
    activeCategory === "All"
      ? deals
      : deals.filter(
          (deal) =>
            deal.items?.[0]?.menu_item?.category?.name === activeCategory
        );

  return (
    <>
      <TopBar />
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header - Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-8 sm:mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold mt-6 sm:mt-8 md:mt-10 text-center sm:text-left">
            Special Offers 🎉
          </h2>

          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        {/* Deals Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {filteredDeals.length > 0 ? (
            filteredDeals.map((item) => (
              <Link
                key={item.id}
                to={`/offers/${item.id}`}
                className="rounded-xl overflow-hidden relative group hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={`${BASE_URL}${item.image}`}
                  alt={item.name}
                  className="w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[250px] object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 bg-[#03081F] rounded-b-xl px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4">
                  <p className="text-white font-semibold text-sm sm:text-base">
                    £ {item.combo_price}
                  </p>
                </div>

                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-5 md:left-5">
                  <p className="text-[#FC8A06] text-xs sm:text-sm">
                    {item.items?.[0]?.menu_item?.category?.name}
                  </p>

                  <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-[28px] font-bold leading-tight">
                    {item.name}
                  </h3>

                  <p className="text-white text-xs sm:text-sm line-clamp-2 max-w-[200px] sm:max-w-[250px]">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center items-center h-40 sm:h-52">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-500">
                No Deals Found
              </h2>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SpecialOffer;