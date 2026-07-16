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

      <section className="max-w-7xl mx-auto px-8 lg:px-0 py-8">
        <div className="flex justify-between items-center mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold mt-10">
            Special Offers 🎉
          </h2>

          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {filteredDeals.length > 0 ? (
            filteredDeals.map((item) => (
              <Link
                key={item.id}
                to={`/offers/${item.id}`}
                className="rounded-xl overflow-hidden relative group"
              >
                <img
                  src={`${BASE_URL}${item.image}`}
                  alt={item.name}
                  className="w-full h-[250px] object-cover"
                />

                <div className="absolute inset-0 bg-black/40"></div>

                <div className="absolute top-0 right-5 bg-[#03081F] rounded-b-xl px-5 py-4">
                  <p className="text-white font-semibold">
                    £ {item.combo_price}
                  </p>
                </div>

                <div className="absolute bottom-5 left-5">
                  <p className="text-[#FC8A06] text-sm">
                    {
                      item.items?.[0]?.menu_item?.category?.name
                    }
                  </p>

                  <h3 className="text-white text-[28px] font-bold">
                    {item.name}
                  </h3>

                  <p className="text-white text-sm">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 flex justify-center items-center h-52">
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