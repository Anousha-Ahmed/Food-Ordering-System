import React, { useEffect, useState } from "react";
import CategoryFilter from "../../components/menu/CategoryFilter";
import TopBar from "../../components/layout/Topbar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { API, BASE_URL } from "../../api/endpoints";
import { Link } from "react-router-dom";

const SpecialOffer = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch(API.ALL_DEAL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDeals(data.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <TopBar />
      <Navbar />

      <section className="max-w-7xl mx-auto px-8 lg:px-0 py-8">
        <div className="flex justify-between items-center mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold mt-10 pb-[2px]">
            Special Offers 🎉
          </h2>

          <CategoryFilter />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {deals.map((item) => (
            <Link
              key={item.id} to={`/offers/${item.id}`}
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
                  Featured Deal
                </p>

                <h3 className="text-white text-[28px] font-bold">
                  {item.name}
                </h3>

                <p className="text-white text-sm">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SpecialOffer;