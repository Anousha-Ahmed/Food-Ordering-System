import React, { useState } from "react";
import CategoryFilter from "../../components/menu/CategoryFilter";
import TopBar from "../../components/layout/Topbar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { BASE_URL } from "../../api/endpoints";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import Loader from "../../components/common/Loader";

const SpecialOffer = () => {
  const { deals, dealsLoading } = useData();
  const [activeCategory, setActiveCategory] = useState("All");


  if (dealsLoading) {
    return (
      <>
        <TopBar />
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  const categories = [
    "All",
    ...new Set(
      deals
        .map((deal) => deal.items?.[0]?.menu_item?.category?.name)
        .filter(Boolean)
    ),
  ];

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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold">
            Special Offers 🎉
          </h2>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>
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
                <div className="absolute top-3 right-3 bg-[#03081F] rounded-b-xl px-4 py-3">
                  <p className="text-white font-semibold">
                    £ {item.combo_price}
                  </p>
                </div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-[#FC8A06] text-sm">
                    {item.items?.[0]?.menu_item?.category?.name}
                  </p>
                  <h3 className="text-white text-2xl font-bold">{item.name}</h3>
                  <p className="text-white text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 flex justify-center items-center h-40">
              <h2 className="text-3xl font-bold text-gray-500">
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
